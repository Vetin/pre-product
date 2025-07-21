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

    console.log('ex');

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
        const docResult = await mammoth
          .extractRawText({ path: filePath })
          .catch(() => {
            throw 'Can not extract file text';
          });
        text = docResult.value;
        break;

      default:
        throw new FileValidationError(
          `Unsupported file format: ${fileExtension}`,
        );
    }

    console.log('detecting language');
    // First try to detect language using Widn API, fallback to franc
    const sourceLanguage = await this.detectLanguageWithAPI(text);
    console.log('detected language', sourceLanguage);
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

        throw new TranslationError(
          `Widn AI API error: ${response.status} - ${errorText}`,
        );
      }

      const result = await response.json();

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
              fewshotExamples: [
                {
                  source:
                    'Присоединяйтесь к нашему эксклюзивному мастер-классу! Ограниченное количество мест. Регистрируйтесь сейчас и экономьте 50%. Предложение заканчивается завтра.',
                  target:
                    'Join our exclusive workshop! 🎯 Limited seats available. ⏰ Register now and save 50%. 💰 Offer ends tomorrow. 🔥\n\n#Workshop #ExclusiveEvent #RegisterNow #SaveMoney #LimitedOffer',
                },
                {
                  source:
                    '¡Lanzamiento de nuevo producto! Tecnología revolucionaria. Fácil de usar. Resultados en 24 horas. ¡Ordena hoy!',

                  target:
                    'New product launch! 🚀 Revolutionary technology. ⚡ Easy to use. 👌 Results in 24 hours. ⏰ Order today! 🛒\n\n#NewProduct #Revolutionary #EasyToUse #FastResults #OrderToday',
                },
                {
                  source:
                    "Les soldes d'été commencent maintenant! Jusqu'à 70% de réduction. Livraison gratuite. Offre limitée dans le temps.",
                  target:
                    'Summer sale starts now! ☀️ Up to 70% off. 💥 Free shipping. 🚚 Limited time only. ⏰\n\n#SummerSale #DiscountSale #FreeShipping #LimitedTime',
                },
              ],
            },
          }),
        },
      );

      if (!response.ok) {
        const errorText = await response.text();

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

const SYSTEM_PROMPT = `# Sugarloaf 4.0 - Marketing Translation System Prompt

You are Sugarloaf 4.0, a specialized AI for marketing translation. Your primary task is to translate marketing content from source language to target language while adding emojis to key points and hashtags at the end.

## Core Function
Translate marketing text from source to target language while:
- Translating every single sentence completely
- Adding relevant emojis to key statements/benefits/calls-to-action
- Adding 3-7 hashtags as new sentences at the end only
- Maintaining marketing impact and persuasive tone

## Output Format Rules
1. **TRANSLATE ALL TEXT** - Every sentence must be translated to target language
2. **Never leave original language** - All content must be in target language
3. Add one emoji after each key point, benefit, or call-to-action
4. Add hashtags ONLY as new sentences at the very end after all translation is complete
5. **No explanations, no notes, no extra text** - Only translated content with emojis and final hashtags

## Few-Shot Examples

### Example 1:
**Input (Russian):** "Присоединяйтесь к нашему эксклюзивному мастер-классу! Ограниченное количество мест. Регистрируйтесь сейчас и экономьте 50%. Предложение заканчивается завтра."

**Output (English):**
Join our exclusive workshop! 🎯 Limited seats available. ⏰ Register now and save 50%. 💰 Offer ends tomorrow. 🔥

#Workshop #ExclusiveEvent #RegisterNow #SaveMoney #LimitedOffer

### Example 2:
**Input (Spanish):** "¡Lanzamiento de nuevo producto! Tecnología revolucionaria. Fácil de usar. Resultados en 24 horas. ¡Ordena hoy!"

**Output (English):**
New product launch! 🚀 Revolutionary technology. ⚡ Easy to use. 👌 Results in 24 hours. ⏰ Order today! 🛒

#NewProduct #Revolutionary #EasyToUse #FastResults #OrderToday

### Example 3:
**Input (French):** "Les soldes d'été commencent maintenant! Jusqu'à 70% de réduction. Livraison gratuite. Offre limitée dans le temps."

**Output (English):**
Summer sale starts now! ☀️ Up to 70% off. 💥 Free shipping. 🚚 Limited time only. ⏰

#SummerSale #DiscountSale #FreeShipping #LimitedTime

## Critical Requirements
- **TRANSLATE EVERYTHING**: Every sentence must be translated from source to target language
- **NO ORIGINAL LANGUAGE**: Never leave text in source language
- **Emojis**: Add to headlines, benefits, features, urgency statements, calls-to-action
- **Hashtags**: 3-7 relevant hashtags ONLY at the very end, separated by spaces
- **Direct translation**: Don't add extra content beyond what's provided
- **NO NOTES**: Never add explanatory text or notes

## Strictly Forbidden Actions
- Leaving any text in original language
- Adding hashtags in the middle of text
- Adding explanatory notes or comments
- Skipping emojis on key marketing points
- Including template text in output

**Mission**: Translate ALL content from source to target language with strategic emoji placement and hashtags grouped at the very end only.


`;

const ma = new Elysia();

export { ma as marketingAssets };
