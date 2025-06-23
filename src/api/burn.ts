import ffmpeg from 'fluent-ffmpeg';
import ffmpegStatic from 'ffmpeg-static';
import { mkdtemp, rm } from 'fs/promises';
import { join } from 'path';
import { tmpdir } from 'os';

ffmpeg.setFfmpegPath(ffmpegStatic!);

export async function addSubtitles(
  videoBase64: string,
  srtBase64: string,
): Promise<string> {
  const temp = await mkdtemp(join(tmpdir(), 'subs-'));
  const input = join(temp, 'input.mp4');
  const srt = join(temp, 'subtitles.srt');
  const output = join(temp, 'output.mp4');

  try {
    // Write video file
    const videoBuffer = Buffer.from(videoBase64, 'base64');
    await Bun.write(input, videoBuffer);
    console.log(`📹 Video: ${videoBuffer.length} bytes`);

    // Decode base64 SRT and convert to proper format
    const srtContent = Buffer.from(srtBase64, 'base64').toString('utf-8');
    const properSRT = convertToProperSRT(srtContent);
    await Bun.write(srt, properSRT);
    console.log('📝 SRT decoded and converted');

    // Process video
    await processVideo(input, srt, output);

    // Return result
    const result = await Bun.file(output).arrayBuffer();
    return Buffer.from(result).toString('base64');
  } finally {
    await rm(temp, { recursive: true, force: true }).catch(() => {});
  }
}

/**
 * Convert your SRT format to proper standard SRT
 */
function convertToProperSRT(srtContent: string): string {
  console.log('🔧 Converting SRT format...');

  // Split into blocks
  const blocks = srtContent
    .trim()
    .split(/\n\s*\n/)
    .filter(block => block.trim());

  const properBlocks = blocks
    .map((block, index) => {
      const lines = block.trim().split('\n');

      // Find timing line (first line with -->)
      const timingLineIndex = lines.findIndex(line => line.includes('-->'));
      if (timingLineIndex === -1) return null;

      // Extract timing and text
      let timingLine = lines[timingLineIndex];
      const textLines = lines.slice(timingLineIndex + 1);

      // Clean timing line - remove speaker tags
      timingLine = timingLine.replace(/\s*\[speaker_\d+\].*$/, '').trim();

      // Clean text lines - remove speaker tags if any
      const cleanTextLines = textLines
        .map(line => line.replace(/^\[speaker_\d+\]\s*/, '').trim())
        .filter(line => line);

      // Build proper SRT block with sequence number
      return [
        (index + 1).toString(), // Sequence number
        timingLine, // Clean timing
        ...cleanTextLines, // Text content
      ].join('\n');
    })
    .filter(Boolean);

  const result = properBlocks.join('\n\n');

  console.log(`✅ Converted ${properBlocks.length} subtitles`);
  return result;
}

/**
 * Process video with Cyrillic text support
 */
async function processVideo(
  inputPath: string,
  srtPath: string,
  outputPath: string,
): Promise<void> {
  return new Promise((resolve, reject) => {
    // Cross-platform path escaping
    const escapedSrtPath = srtPath.replace(/\\/g, '/');

    // Subtitle filter with proper UTF-8 and Cyrillic support
    const subtitleFilter = `subtitles='${escapedSrtPath}':force_style='FontName=Arial,FontSize=18,PrimaryColour=&Hffffff,OutlineColour=&H000000,Outline=2,Shadow=1'`;

    ffmpeg(inputPath)
      .videoFilters(subtitleFilter)
      .audioCodec('copy')
      .outputOptions([
        '-preset',
        'veryfast',
        '-crf',
        '23',
        '-pix_fmt',
        'yuv420p',
      ])
      .output(outputPath)
      .on('start', () => {
        console.log('🎬 FFmpeg processing...');
      })
      .on('progress', progress => {
        console.log(`⚡ ${Math.round(progress.percent || 0)}%`);
      })
      .on('error', err => {
        console.error('❌ FFmpeg error:', err.message);
        reject(err);
      })
      .on('end', () => {
        console.log('✅ Processing completed');
        resolve();
      })
      .run();
  });
}

/**
 * Debug function to test base64 SRT decoding
 */
export function debugSRTBase64(srtBase64: string): any {
  try {
    const decoded = Buffer.from(srtBase64, 'base64').toString('utf-8');
    const converted = convertToProperSRT(decoded);

    return {
      success: true,
      original: decoded,
      converted: converted,
      subtitleCount: converted.split('\n\n').length,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}
