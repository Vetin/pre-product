import axios, { AxiosResponse, isAxiosError } from 'axios';
import FormData from 'form-data';
import fs from 'fs';
import path, { extname, resolve } from 'path';
import JSZip from 'jszip';
import { downloadValidatedFile } from './download-file';

// Types and interfaces
interface SupportedFormats {
  [key: string]: boolean;
}

interface FileSizeLimits {
  [key: string]: number;
}

interface UploadResponse {
  document_id: string;
  document_key: string;
}

interface StatusResponse {
  document_id: string;
  status: 'queued' | 'translating' | 'done' | 'error';
  seconds_remaining?: number;
  error_message?: string;
}

type Formality = 'default' | 'more' | 'less' | 'prefer_more' | 'prefer_less';
type TargetLanguage = 'DE' | 'EL' | string; // Add more language codes as needed

const FILE_SIZE_LIMITS: FileSizeLimits = {
  docx: 50 * 1024 * 1024, // 50MB
  doc: 50 * 1024 * 1024,
  pdf: 50 * 1024 * 1024,
  txt: 50 * 1024 * 1024,
  pptx: 50 * 1024 * 1024,
  html: 50 * 1024 * 1024,
  htm: 50 * 1024 * 1024,
  xlsx: 50 * 1024 * 1024,
  epub: 50 * 1024 * 1024, // 50MB
};

// Custom error classes
export class FileValidationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FileValidationError';
  }
}

export class TranslationError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TranslationError';
  }
}

// Main translator class
export class DeepLTranslator {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.baseUrl = 'https://api.deepl.com/v2';
  }

  private validateFile(filePath: string): void {
    const stats = fs.statSync(filePath);
    if (stats.size > 10 * 1024 * 1024) {
      throw new FileValidationError(`File size exceeds limit of ${10}MB`);
    }
  }

  private async uploadDocument(
    filePath: string,
    targetLang: TargetLanguage,
    formality: Formality,
  ): Promise<UploadResponse> {
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));
    form.append('target_lang', targetLang);
    form.append('formality', formality);

    try {
      const response: AxiosResponse<UploadResponse> = await axios.post(
        `${this.baseUrl}/document`,
        form,
        {
          headers: {
            ...form.getHeaders(),
            Authorization: `DeepL-Auth-Key ${this.apiKey}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      console.log(error);
      throw new TranslationError(`Upload failed: ${error.message}`);
    }
  }

  private async checkStatus(
    documentId: string,
    documentKey: string,
  ): Promise<StatusResponse> {
    try {
      const response: AxiosResponse<StatusResponse> = await axios.post(
        `${this.baseUrl}/document/${documentId}`,
        { document_key: documentKey },
        {
          headers: {
            Authorization: `DeepL-Auth-Key ${this.apiKey}`,
          },
        },
      );
      return response.data;
    } catch (error) {
      throw new TranslationError(`Status check failed: ${error.message}`);
    }
  }

  private async downloadDocument(
    documentId: string,
    documentKey: string,
  ): Promise<Buffer> {
    try {
      const response: AxiosResponse<Buffer> = await axios.post(
        `${this.baseUrl}/document/${documentId}/result`,
        { document_key: documentKey },
        {
          headers: {
            Authorization: `DeepL-Auth-Key ${this.apiKey}`,
          },
          responseType: 'arraybuffer',
        },
      );
      return response.data;
    } catch (error) {
      throw new TranslationError(`Download failed: ${error.message}`);
    }
  }

  async translateDocument(
    filePath: string,
    targetLang: TargetLanguage,
    formality: Formality = 'default',
  ): Promise<Buffer> {
    try {
      this.validateFile(filePath);

      // Check if this is an EPUB file and use specialized translation
      const fileExtension = path.extname(filePath).toLowerCase();
      if (fileExtension === '.epub') {
        return await this.translateEpub(filePath, targetLang, formality);
      }

      const uploadResult = await this.uploadDocument(
        filePath,
        targetLang,
        formality,
      );

      let status: StatusResponse;

      do {
        status = await this.checkStatus(
          uploadResult.document_id,
          uploadResult.document_key,
        );

        if (status.status === 'error') {
          throw new TranslationError(
            status.error_message || 'Unknown error during translation',
          );
        }
        if (status.status !== 'done') {
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      } while (status.status !== 'done');

      return await this.downloadDocument(
        uploadResult.document_id,
        uploadResult.document_key,
      );
    } catch (error) {
      if (
        error instanceof FileValidationError ||
        error instanceof TranslationError
      ) {
        throw error;
      }
      throw new TranslationError(`Translation failed: ${error.message}`);
    }
  }

  async translateFromUrl(
    url: string,
    targetLang: TargetLanguage,
    formality: Formality = 'default',
  ) {
    try {
      const response = await downloadValidatedFile(url, {
        maxLength: Math.max(...Object.values(FILE_SIZE_LIMITS)),
        contentTypes: [],
      });

      const tempPath = `temp_file${path.extname(url)}`;
      fs.writeFileSync(tempPath, response.data);

      try {
        return await this.translateDocument(tempPath, targetLang, formality);
      } finally {
        if (fs.existsSync(tempPath)) {
          fs.unlinkSync(tempPath);
        }
      }
    } catch (error) {
      if (
        error instanceof FileValidationError ||
        error instanceof TranslationError
      ) {
        throw error;
      }
      throw new TranslationError(`URL translation failed: ${error.message}`);
    }
  }

  async translateEpub(
    filePath: string,
    targetLang: TargetLanguage,
    formality: Formality = 'default',
  ): Promise<Buffer> {
    try {
      this.validateFile(filePath);

      // Read and extract EPUB
      const epubBuffer = fs.readFileSync(filePath);
      const zip = await JSZip.loadAsync(epubBuffer);

      // Files to translate
      const filesToTranslate: Array<{
        path: string;
        content: string;
        type: '.xhtml' | '.html' | '.opf' | '.ncx';
      }> = [];

      // Find translatable files
      for (const [filePath, file] of Object.entries(zip.files)) {
        if (!file.dir) {
          const ext = extname(filePath);
          if (
            ext === '.xhtml' ||
            ext === '.html' ||
            ext === '.opf' ||
            ext === '.ncx'
          ) {
            const content = await file.async('text');
            filesToTranslate.push({ path: filePath, content, type: ext });
          }
        }
      }

      // Translate each file
      for (const file of filesToTranslate) {
        const { content, path } = file;

        if (content.trim()) {
          const tempHtmlPath = resolve(`temp_${Date.now()}.html`);

          fs.writeFileSync(tempHtmlPath, content, { encoding: 'utf-8' });

          try {
            console.log('here', tempHtmlPath);
            // Translate via DeepL (use direct upload/download to avoid recursion)
            const uploadResult = await this.translateDocument(
              tempHtmlPath,
              targetLang,
              formality,
            ).catch(error => {
              console.error(`Failed ${tempHtmlPath}`);
              if (isAxiosError(error)) console.log(error.response.data);
            });

            if (!uploadResult) continue;

            const translatedContent = uploadResult.toString('utf-8');

            // Update the file in the ZIP with translated content
            zip.file(path, translatedContent);

            await new Promise(resolve => setTimeout(resolve, 1000));
          } finally {
            // Clean up temp file
            if (fs.existsSync(tempHtmlPath)) {
              // fs.unlinkSync(tempHtmlPath);
            }
          }
        }
      }

      // Generate new EPUB
      return Buffer.from(await zip.generateAsync({ type: 'arraybuffer' }));
    } catch (error) {
      if (
        error instanceof FileValidationError ||
        error instanceof TranslationError
      ) {
        throw error;
      }
      throw new TranslationError(`EPUB translation failed: ${error.message}`);
    }
  }

  async translateEpubFromUrl(
    url: string,
    targetLang: TargetLanguage,
    formality: Formality = 'default',
  ) {
    try {
      const response = await downloadValidatedFile(url, {
        maxLength: Math.max(...Object.values(FILE_SIZE_LIMITS)),
        contentTypes: ['application/epub+zip'],
      });

      const tempPath = `temp_epub_${Date.now()}.epub`;
      fs.writeFileSync(tempPath, response.data);

      try {
        return await this.translateEpub(tempPath, targetLang, formality);
      } finally {
        if (fs.existsSync(tempPath)) {
          fs.unlinkSync(tempPath);
        }
      }
    } catch (error) {
      if (
        error instanceof FileValidationError ||
        error instanceof TranslationError
      ) {
        throw error;
      }
      throw new TranslationError(
        `EPUB URL translation failed: ${error.message}`,
      );
    }
  }
}

// Usage example
