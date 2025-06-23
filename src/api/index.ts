import crypto from 'crypto';
import Elysia, { t } from 'elysia';
import {
  DeepLTranslator,
  FileValidationError,
  TranslationError,
} from './deepl';
import cors from '@elysiajs/cors';
import { rm } from 'fs/promises';

import { writeFile } from 'fs/promises';
import { fileTypeFromBuffer } from 'file-type';
import { addSubtitles } from './burn';

const translator = new DeepLTranslator(Bun.env.DEEPL_API_KEY || '');

const ORIGINS = [
  'http://localhost:5174',
  'https://rask.ai',
  'https://www.rask.ai',
  'https://excellent-lifecycle-679985.framer.app',
];
new Elysia()
  .use(
    cors({
      origin: ORIGINS,
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true,
    }),
  )
  .post(
    '/document',
    async ({ body, request }) => {
      console.log('Start processing request');
      console.dir(body, { depth: Infinity });

      const { lang, formality } = body;

      if ('file' in body) {
        const { file } = body;

        const match = file.match(/^data:([^;]+);base64,(.+)$/);

        if (!match)
          return {
            status: 'error',
            message: 'Invalid file',
          };

        const fileBuffer = Buffer.from(match[2], 'base64');
        const fileExtension = await fileTypeFromBuffer(fileBuffer);

        const pathToFile = `./${crypto.randomUUID()}.${
          fileExtension?.ext ?? 'txt'
        }`;

        await writeFile(pathToFile, fileBuffer, {});

        try {
          const translatedBuffer = await translator.translateDocument(
            pathToFile,
            lang,
            formality,
          );

          return {
            status: 'success',
            data: translatedBuffer.toString('base64'),
          };
        } catch (error) {
          switch (true) {
            case error instanceof FileValidationError:
              return {
                status: 'error',
                message: 'File validation error: ' + error.message,
              };
            case error instanceof TranslationError:
              return {
                status: 'error',
                message: 'Translation error: ' + error.message,
              };
            default:
              return {
                status: 'error',
                message: 'Unexpected error: ' + error,
              };
          }
        } finally {
          await rm(pathToFile);
        }
      }

      if ('link' in body) {
        try {
          const { link } = body;

          const translatedBuffer = await translator.translateFromUrl(
            link,
            lang,
            formality,
          );

          return {
            status: 'success',
            data: translatedBuffer.toString('base64'),
          };
        } catch (error) {
          switch (true) {
            case error instanceof FileValidationError:
              return {
                status: 'error',
                message: 'File validation error: ' + error.message,
              };
            case error instanceof TranslationError:
              return {
                status: 'error',
                message: 'Translation error: ' + error.message,
              };
            default:
              return {
                status: 'error',
                message: 'Unexpected error: ' + error,
              };
          }
        }
      }

      return {
        status: 'error',
        message: 'Invalid request',
      };
    },
    {
      body: t.Union([
        t.Object({
          lang: t.String(),
          formality: t.Union([
            t.Literal('prefer_less'),
            t.Literal('prefer_more'),
            t.Literal('default'),
            t.Literal('more'),
            t.Literal('less'),
          ]),
          file: t.String(),
        }),
        t.Object({
          lang: t.String(),
          formality: t.Union([
            t.Literal('prefer_less'),
            t.Literal('prefer_more'),
            t.Literal('default'),
            t.Literal('more'),
            t.Literal('less'),
          ]),
          link: t.String(),
        }),
      ]),
    },
  )
  .post(
    '/subtitle',
    async ({ body }) => {
      try {
        let file: File | undefined;
        let cloudStorageUrl: string | undefined;
        const format = body.format === 'burn' ? 'srt' : body.format;

        if ('file' in body) {
          const match = body.file.match(/^data:([^;]+);base64,(.+)$/);

          if (!match)
            return {
              status: 'error',
              message: 'Invalid file',
            };

          const fileBuffer = Buffer.from(match[2], 'base64');
          const fileExtension = await fileTypeFromBuffer(fileBuffer);

          if (fileExtension?.ext === 'mp3' && body.format === 'burn') {
            return {
              success: false,
              error: 'Burn subtitles is not supported for mp3 files',
            };
          }

          file = new File([fileBuffer], 'audio');
        }
        if ('link' in body) {
          cloudStorageUrl = body.link;
        }

        const formData = new FormData();
        formData.append('model_id', 'scribe_v1');

        if (file) {
          formData.append('file', file);
        }
        if (cloudStorageUrl) {
          formData.append('cloud_storage_url', cloudStorageUrl);
        }
        formData.append(
          'additional_formats',
          JSON.stringify([{ format: format }]),
        );
        formData.append('timestamps_granularity', 'word');
        formData.append('diarize', 'true');

        const response = await fetch(
          'https://api.elevenlabs.io/v1/speech-to-text',
          {
            method: 'POST',
            headers: {
              'Xi-Api-Key':
                'sk_86274ee2d7fb0bd6b90ca325f8d817ff7b48f1d1c8e91971',
              'Api-Key': 'xi-api-key',
            },

            body: formData,
          },
        );

        const {
          additional_formats: [
            { content_type, content, is_base64_encoded, file_extension },
          ],
        } = await response.json();

        let base64;

        if (is_base64_encoded) {
          base64 = content;
        } else {
          base64 = Buffer.from(content, 'utf8').toString('base64');
        }

        if (body.format === 'burn') {
          return await handleBurnSubtitles(body, base64);
        }

        return {
          base64,
          contentType: content_type,
          success: true,
          fileExtension: file_extension,
        };
      } catch (error) {
        return {
          success: false,
          error: error.message,
        };
      }
    },
    {
      body: t.Union([
        t.Object({
          file: t.String(),
          format: t.Union([
            t.Literal('srt'),
            t.Literal('txt'),
            t.Literal('json'),
            t.Literal('burn'),
          ]),
        }),
        t.Object({
          link: t.String(),
          format: t.Union([
            t.Literal('srt'),
            t.Literal('txt'),
            t.Literal('burn'),
            t.Literal('json'),
          ]),
        }),
      ]),
    },
  )
  .onError(({ error }) => {
    console.log(error);
  })
  .listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });

async function handleBurnSubtitles(
  body: { file: string } | { link: string },
  base64: string,
) {
  try {
    let sourceVideoBase64: string;

    if ('file' in body) {
      // Handle file upload case
      const match = body.file.match(/^data:([^;]+);base64,(.+)$/);
      if (!match) {
        return {
          success: false,
          error: 'Invalid file format for burn subtitles',
        };
      }
      sourceVideoBase64 = match[2];
    } else if ('link' in body) {
      // Handle cloud link case
      try {
        const response = await fetch(body.link);
        if (!response.ok) {
          return {
            success: false,
            error: 'Failed to download video from link',
          };
        }

        const contentType = response.headers.get('content-type') || '';
        if (!contentType.startsWith('video/')) {
          return {
            success: false,
            error: 'The provided link does not point to a video file',
          };
        }

        const videoBuffer = await response.arrayBuffer();
        sourceVideoBase64 = Buffer.from(videoBuffer).toString('base64');
      } catch (fetchError) {
        return {
          success: false,
          error: `Failed to download video: ${fetchError.message}`,
        };
      }
    } else {
      return {
        success: false,
        error: 'No file or link provided for burn subtitles',
      };
    }

    const videoBase64 = await addSubtitles(sourceVideoBase64, base64);

    return {
      base64: videoBase64,
      contentType: 'video/mp4',
      success: true,
      fileExtension: 'mp4',
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: error.message,
    };
  }
}
