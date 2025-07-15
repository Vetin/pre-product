import OpenAI from 'openai';
import { callElevenLabsAPI } from './elevenLabs';

const openAIClient = new OpenAI({
  apiKey: import.meta.env.OPENAI_API_KEY! ?? 'DEBUG',
});

// Types
export interface TranscriptionRequest {
  file?: string;
  link?: string;
  format: 'srt' | 'txt' | 'speaker_separated' | 'ai_summary_transcription';
}

export interface TranscriptionResponse {
  base64: string;
  contentType: string;
  success: boolean;
  fileExtension: string;
}

const systemPrompt = `
You are a helpful assistant that creates concise summaries of transcripts.
Your task is to analyze the transcript and generate a short, clear, and informative summary of the key points and main topics discussed.
Do not include any introductory or closing text — only the summary.
Write the summary in transcription-style language, reflecting the tone and style of the speakers.
The summary should appear under a heading called "## Summary", followed by a line break.
After the summary, include the full original transcript exactly as it was received.
Do not include any other text than the summary.

Output format:

## Summary
[Your concise summary here]

## Full Transcript
[Full original transcript]
`;

// Process speaker-separated transcript from ElevenLabs response
export function processSpeakerSeparated(data: any): string {
  if (!data.words || !Array.isArray(data.words)) {
    return 'No speaker data available';
  }

  let result = '';
  let currentSpeaker = '';
  let currentText = '';

  for (const word of data.words) {
    if (word.type === 'word' && word.speaker_id) {
      const speaker = word.speaker_id.replace('speaker_', 'Speaker ');

      if (speaker !== currentSpeaker) {
        if (currentText.trim()) {
          result += `${currentSpeaker}:\n${currentText.trim()}\n\n`;
        }

        currentSpeaker = speaker;
        currentText = word.text;
      } else {
        currentText += word.text;
      }
    } else if (word.type === 'spacing') {
      currentText += word.text;
    }
  }

  if (currentText.trim()) {
    result += `${currentSpeaker}:\n${currentText.trim()}\n`;
  }

  return result || 'No speech detected';
}

// Generate AI summary using OpenAI API
async function generateAISummary(transcript: string): Promise<string> {
  try {
    const response = await openAIClient.responses.create({
      model: 'gpt-3.5-turbo-0125',
      instructions: systemPrompt,
      input: transcript,
    });

    return response.output_text || 'Summary generation failed.';
  } catch (error) {
    console.error('AI Summary error:', error);
    return 'Summary generation failed. Please check the transcript below.';
  }
}

// Extract full transcript from ElevenLabs response
function extractFullTranscript(data: any): string {
  const additionalFormat = data.additional_formats?.[0];
  if (additionalFormat?.content) {
    return additionalFormat.content;
  }
  if (data.transcript) {
    return data.transcript;
  }

  if (data.text) {
    return data.text;
  }

  return 'No transcript available';
}

// Map custom formats to ElevenLabs supported formats
function mapFormatToElevenLabs(format: string): string {
  switch (format) {
    case 'speaker_separated':
      return 'segmented_json';
    case 'ai_summary_transcription':
      return 'txt';
    default:
      return format;
  }
}

// Create file from base64
async function createFileFromRequest(
  body: TranscriptionRequest,
): Promise<File | undefined> {
  if (!('file' in body) || !body.file) return undefined;

  const match = body.file.match(/^data:([^;]+);base64,(.+)$/);
  if (!match) throw new Error('Invalid file format');

  const fileBuffer = Buffer.from(match[2], 'base64');
  return new File([fileBuffer], 'audio');
}

// Main transcription handler
export async function handleVideoTranscription(
  body: TranscriptionRequest,
): Promise<TranscriptionResponse> {
  try {
    const file = await createFileFromRequest(body);
    const cloudStorageUrl = body.link;

    if (!file && !cloudStorageUrl) {
      throw new Error('No file or link provided');
    }

    const elevenlabsFormat = mapFormatToElevenLabs(body.format);

    const responseData = await callElevenLabsAPI(
      file,
      cloudStorageUrl,
      elevenlabsFormat,
    );

    const {
      additional_formats: [
        { content_type, content, is_base64_encoded, file_extension },
      ],
    } = responseData;

    let base64: string;
    if (is_base64_encoded) {
      base64 = content;
    } else {
      base64 = Buffer.from(content, 'utf8').toString('base64');
    }

    if (body.format === 'speaker_separated') {
      const processedContent = processSpeakerSeparated(responseData);
      base64 = Buffer.from(processedContent, 'utf8').toString('base64');

      return {
        base64,
        contentType: 'text/plain',
        success: true,
        fileExtension: 'txt',
      };
    }

    if (body.format === 'ai_summary_transcription') {
      const fullTranscript = extractFullTranscript(responseData);
      const processedContent = await generateAISummary(fullTranscript);
      base64 = Buffer.from(processedContent, 'utf8').toString('base64');

      return {
        base64,
        contentType: 'text/plain',
        success: true,
        fileExtension: 'txt',
      };
    }

    return {
      base64,
      contentType: content_type,
      success: true,
      fileExtension: file_extension,
    };
  } catch (error) {
    throw new Error(
      `Transcription failed: ${
        error instanceof Error ? error.message : 'Unknown error'
      }`,
    );
  }
}
