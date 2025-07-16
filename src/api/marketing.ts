import Elysia, { t } from 'elysia';
import { fileTypeFromBuffer } from 'file-type';
import { writeFile, rm, readFile } from 'fs/promises';
import mammoth from 'mammoth';
import pdfParse from 'pdf-parse';
import { franc } from 'franc-min';
import { FileValidationError, TranslationError } from './deepl';

// Widn AI API configuration
const WIDN_API_BASE_URL = process.env.WIDN_API_URL || 'https://api.widn.ai/v1';
const WIDN_API_KEY =
  process.env.WIDN_API_KEY ||
  'k-341824e8-7061-7096-01e9-7c2cbc6d6d1a-s-VRlzPqLtTCWlSmOkaj/wI5yk3ap74Nin';

const iso6393ToIso6391: { [key: string]: string } = {
  eng: 'en',
  spa: 'es',
  fra: 'fr',
  deu: 'de',
  ita: 'it',
  por: 'pt',
  jpn: 'ja',
  kor: 'ko',
  zho: 'zh',
  ara: 'ar',
  rus: 'ru',
  nld: 'nl',
  pol: 'pl',
  tur: 'tr',
  swe: 'sv',
  dan: 'da',
  nor: 'no',
  fin: 'fi',
  ces: 'cs',
  hun: 'hu',
  ell: 'el',
  heb: 'he',
  hin: 'hi',
  tha: 'th',
  vie: 'vi',
  ind: 'id',
  msa: 'ms',
  ukr: 'uk',
  ron: 'ro',
  bul: 'bg',
  hrv: 'hr',
  slk: 'sk',
  slv: 'sl',
  lit: 'lt',
  lav: 'lv',
  est: 'et',
  cat: 'ca',
  eus: 'eu',
  glg: 'gl',
};

class WidnAIClient {
  private apiKey: string;
  private baseUrl: string;

  constructor(apiKey: string, baseUrl: string = WIDN_API_BASE_URL) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  /**
   * Detect the language of the provided text using franc library
   */
  detectLanguage(text: string): string {
    // Use franc to detect language (returns ISO 639-3 code)
    const detectedIso3 = franc(text);

    // Convert ISO 639-3 to ISO 639-1 if possible
    const iso1Code = iso6393ToIso6391[detectedIso3];

    // If we have a mapping, use it; otherwise default to English
    // or return the ISO 639-3 code if no mapping exists
    if (iso1Code) {
      return iso1Code;
    } else if (detectedIso3 === 'und') {
      // 'und' means undetermined - default to English
      return 'en';
    } else {
      // Return the ISO 639-3 code if no ISO 639-1 mapping exists
      console.warn(
        `No ISO 639-1 mapping for detected language: ${detectedIso3}`,
      );
      return detectedIso3;
    }
  }

  /**
   * Detect language using Widn AI API (if supported)
   */
  async detectLanguageWithAPI(text: string): Promise<string> {
    try {
      // First try to use Widn's API by not specifying source language
      // The API might auto-detect it
      const response = await fetch(`${this.baseUrl}/detect`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({ text }),
      });

      if (response.ok) {
        const result = await response.json();
        return (
          result.language ||
          result.detected_language ||
          this.detectLanguage(text)
        );
      }
    } catch (error) {
      console.log(
        'Language detection API not available, falling back to franc',
      );
    }

    // Fallback to franc-based detection
    return this.detectLanguage(text);
  }

  /**
   * Extract text content from different file formats
   */
  async extractTextFromFile(
    filePath: string,
    fileExtension: string,
  ): Promise<{ text: string; sourceLanguage: string }> {
    let text = '';

    switch (fileExtension.toLowerCase()) {
      case 'txt':
        text = await readFile(filePath, 'utf-8');
        break;

      case 'pdf':
        const pdfData = await readFile(filePath);
        const pdfResult = await pdfParse(pdfData);
        text = pdfResult.text;
        break;

      case 'docx':
      case 'doc':
        const docResult = await mammoth.extractRawText({ path: filePath });
        text = docResult.value;
        break;

      default:
        throw new FileValidationError(
          `Unsupported file format: ${fileExtension}`,
        );
    }

    // First try to detect language using Widn API, fallback to franc
    const sourceLanguage = await this.detectLanguageWithAPI(text);
    return { text, sourceLanguage };
  }

  /**
   * Translate text using Widn AI API
   */
  async translateText(
    text: string,
    targetLanguage: string,
    sourceLanguage?: string,
    options?: {
      glossary?: Record<string, string>;
      instructions?: string;
    },
  ): Promise<string> {
    try {
      const response = await fetch(`${this.baseUrl}/translate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: JSON.stringify({
          sourceText: [text],
          config: {
            targetLocale: targetLanguage,
            sourceLocale: sourceLanguage,
            instructions: options?.instructions || SYSTEM_PROMPT,
          },
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log(errorText);
        throw new TranslationError(
          `Widn AI API error: ${response.status} - ${errorText}`,
        );
      }

      const result = await response.json();
      console.log(result);
      return result.targetText.join('\n');
    } catch (error) {
      if (error instanceof TranslationError) throw error;
      throw new TranslationError(`Failed to translate text: ${error.message}`);
    }
  }

  /**
   * Upload a document file to WIDN for translation
   */
  async uploadDocumentForTranslation(filePath: string): Promise<string> {
    const formData = new FormData();
    const fileBuffer = await readFile(filePath);
    const fileName = filePath.split('/').pop() || 'document';

    formData.append('file', new Blob([fileBuffer]), fileName);

    try {
      const response = await fetch(`${this.baseUrl}/translate-file`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new TranslationError(
          `Failed to upload document: ${response.status} - ${errorText}`,
        );
      }

      const result = await response.json();
      return result.fileId || result.id;
    } catch (error) {
      if (error instanceof TranslationError) throw error;
      throw new TranslationError(`Failed to upload document: ${error.message}`);
    }
  }

  /**
   * Start translation of an uploaded document
   */
  async startDocumentTranslation(
    fileId: string,
    targetLanguage: string,
    sourceLanguage?: string,
  ): Promise<void> {
    console.log({
      targetLocale: targetLanguage,
      sourceLocale: sourceLanguage,
      instructions: SYSTEM_PROMPT,
      tone: 'formal',
      model: 'sugarloaf',
    });
    try {
      const response = await fetch(
        `${this.baseUrl}/translate-file/${fileId}/translate`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${this.apiKey}`,
          },
          body: JSON.stringify({
            config: {
              targetLocale: targetLanguage,
              sourceLocale: sourceLanguage,
              instructions: SYSTEM_PROMPT,
              tone: 'formal',
              model: 'sugarloaf',
            },
          }),
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.log(errorText);
        throw new TranslationError(
          `Failed to start translation: ${response.status} - ${errorText}`,
        );
      }
    } catch (error) {
      if (error instanceof TranslationError) throw error;
      throw new TranslationError(
        `Failed to start translation: ${error.message}`,
      );
    }
  }

  /**
   * Check the status of a document translation
   */
  async getDocumentTranslationStatus(fileId: string): Promise<{
    status: string;
    progress?: number;
    sourceLanguage?: string;
    targetLanguage?: string;
  }> {
    try {
      const response = await fetch(`${this.baseUrl}/translate-file/${fileId}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${this.apiKey}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new TranslationError(
          `Failed to get translation status: ${response.status} - ${errorText}`,
        );
      }

      return await response.json();
    } catch (error) {
      if (error instanceof TranslationError) throw error;
      throw new TranslationError(
        `Failed to get translation status: ${error.message}`,
      );
    }
  }

  /**
   * Download the translated document
   */
  async downloadTranslatedDocument(fileId: string): Promise<Buffer> {
    try {
      const response = await fetch(
        `${this.baseUrl}/translate-file/${fileId}/download`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${this.apiKey}`,
          },
        },
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new TranslationError(
          `Failed to download translated document: ${response.status} - ${errorText}`,
        );
      }

      const arrayBuffer = await response.arrayBuffer();
      return Buffer.from(arrayBuffer);
    } catch (error) {
      if (error instanceof TranslationError) throw error;
      throw new TranslationError(
        `Failed to download translated document: ${error.message}`,
      );
    }
  }

  /**
   * Translate a document file using WIDN document translation API
   */
  async translateDocument(
    filePath: string,
    targetLanguage: string,
  ): Promise<Buffer> {
    const fileExtension = filePath.split('.').pop() || 'txt';

    // Extract text and detect language for source language detection
    const { sourceLanguage } = await this.extractTextFromFile(
      filePath,
      fileExtension,
    );

    // Upload the document
    const fileId = await this.uploadDocumentForTranslation(filePath);

    // Start translation
    await this.startDocumentTranslation(fileId, targetLanguage, sourceLanguage);

    // Poll for completion
    let status = 'processing';
    let attempts = 0;
    const maxAttempts = 60; // 5 minutes with 5-second intervals

    while (status !== 'translated' && attempts < maxAttempts) {
      await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 5 seconds

      const statusResponse = await this.getDocumentTranslationStatus(fileId);
      status = statusResponse.status;

      if (status === 'failed' || status === 'error') {
        throw new TranslationError(
          `Document translation failed with status: ${status}`,
        );
      }

      attempts++;
    }

    if (status !== 'translated') {
      throw new TranslationError('Document translation timed out');
    }

    // Download the translated document
    return await this.downloadTranslatedDocument(fileId);
  }

  /**
   * Translate content from a URL
   */
  async translateFromUrl(url: string, targetLanguage: string): Promise<Buffer> {
    try {
      // Fetch content from URL
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to fetch URL: ${response.status}`);
      }

      const contentType = response.headers.get('content-type') || '';
      let text = '';

      if (
        contentType.includes('text/html') ||
        contentType.includes('text/plain')
      ) {
        text = await response.text();
        // Remove HTML tags if present
        text = text
          .replace(/<[^>]*>/g, ' ')
          .replace(/\s+/g, ' ')
          .trim();
      } else {
        throw new FileValidationError(
          `Unsupported content type from URL: ${contentType}`,
        );
      }

      // Detect source language using API first, then fallback to franc
      const sourceLanguage = await this.detectLanguageWithAPI(text);

      // Translate
      const translatedText = await this.translateText(
        text,
        targetLanguage,
        sourceLanguage,
        {
          instructions: SYSTEM_PROMPT,
        },
      );

      return Buffer.from(translatedText, 'utf-8');
    } catch (error) {
      if (
        error instanceof FileValidationError ||
        error instanceof TranslationError
      )
        throw error;
      throw new TranslationError(
        `Failed to translate from URL: ${error.message}`,
      );
    }
  }
}

// Initialize the Widn AI client
export const widnClient = new WidnAIClient(WIDN_API_KEY);

const SYSTEM_PROMPT = `# Sugarloaf AI - Marketing Translation System Prompt

You are Sugarloaf, a specialized AI translation model optimized for marketing communications. Your primary function is to translate text while maintaining the persuasive, engaging, and brand-appropriate tone essential for marketing materials.

## Core Translation Principles

### Marketing-Focused Translation
- **Preserve persuasive intent**: Maintain the original's call-to-action strength and emotional appeal
- **Adapt cultural context**: Ensure marketing messages resonate with target audience cultural norms
- **Maintain brand voice**: Keep consistent tone that aligns with brand personality
- **Optimize for engagement**: Prioritize clarity and impact over literal accuracy when appropriate

### Event Marketing Specialization
When translating event-related content:
- Use action-oriented language that creates urgency and excitement
- Adapt event terminology to local conventions (e.g., "workshop" vs "masterclass")
- Preserve time-sensitive elements while adjusting for local time zones/formats
- Maintain FOMO (Fear of Missing Out) elements in the target language
- Ensure registration/participation calls-to-action are culturally appropriate

### Asset Marketing Focus
For marketing assets (brochures, ads, social media, etc.):
- Prioritize headline impact and memorability
- Adapt taglines to maintain rhythm and catchiness in target language
- Preserve visual text constraints (character limits for buttons, headers)
- Maintain SEO-friendly keywords when possible
- Ensure compliance with local advertising regulations and cultural sensitivities

## Translation Behavior Rules

1. **Just translate** - No additional explanations or context needed
2. **Direct output only** - Provide translated text without commentary
3. **MANDATORY: Add emoji to each logical key point** - Every important statement, benefit, or call-to-action must have a relevant emoji
4. **MANDATORY: Always add 3-7 relevant hashtags** at the end only
5. **REQUIRED: Identify key bullets/points** and assign appropriate emojis to each
6. **REQUIRED: Include hashtags** that match the marketing context and target audience
7. **Maintain formatting** that supports visual design requirements
8. **Preserve metrics and data** exactly as provided
9. **Adapt currency, dates, and units** to target market standards

## CRITICAL OUTPUT FORMATTING REQUIREMENTS
- Provide ONLY the translated text with clean formatting
- MUST add emoji to every logical key point, benefit, feature, or call-to-action
- MUST end with hashtags ONLY at the very end, separated by spaces
- Use proper line breaks and paragraph structure
- NO duplicate hashtags
- NO hashtags mixed within the main text
- Clean, professional presentation

## Emoji Integration Rules - KEY REQUIREMENT
- **MANDATORY: Add emoji to each logical key bullet/point** in the content
- Identify all key statements, benefits, features, deadlines, calls-to-action
- Assign one relevant emoji to each identified key point
- Place emoji directly next to or within each key statement
- Use emojis that align with the target culture and platform norms
- Examples of key points that need emojis:
  - Workshop/Event announcements
  - Limited availability/urgency
  - Registration calls-to-action
  - Deadlines and time-sensitive offers
  - Benefits and transformations
  - Expert credentials
  - Special offers/discounts

## Hashtag Requirements
- Include 3-7 relevant hashtags ONLY at the very end
- Place hashtags after the main text, separated by spaces
- Use hashtags in the target language when appropriate
- NO duplicate hashtags
- Format: #Hashtag1 #Hashtag2 #Hashtag3 (etc.)

## Output Structure Format

[Translated text with emoji for each logical key point] 🎯

[Another key point with emoji] ⏰

[Call-to-action with emoji] 🚀

#Hashtag1 #Hashtag2 #Hashtag3 #Hashtag4 #Hashtag5


**Mission**: Deliver clean, professionally formatted marketing translations with mandatory emoji integration for every logical key point and properly placed hashtags.
`;

const ma = new Elysia();

export { ma as marketingAssets };
