import crypto from 'crypto';
import Elysia, { t } from 'elysia';
import {
  DeepLTranslator,
  FileValidationError,
  TranslationError,
} from './deepl';
import cors from '@elysiajs/cors';
import { rm } from 'fs/promises';
import { write } from 'fs';
import { writeFile } from 'fs/promises';
import { fileTypeFromBuffer } from 'file-type';

const translator = new DeepLTranslator(Bun.env.DEEPL_API_KEY);

const ORIGINS = [
  'http://localhost:5174',
  'https://rask.ai',
  'https://excellent-lifecycle-679985.framer.app/',
];
new Elysia()
  .use(
    cors({
      origin: ORIGINS,
    }),
  )
  .post(
    '/document',
    async ({ body, request }) => {
      if (!ORIGINS.includes(request.headers.get('origin') ?? '')) {
        return {
          status: 'error',
          message: 'Invalid origin',
        };
      }

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

      if (link) {
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
  .listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
  });
