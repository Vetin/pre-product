import { DeepLTranslator } from './deepl';

async function example(): Promise<void> {
  const translator = new DeepLTranslator(
    '6ae621ad-ccc1-44b3-9be9-b85c575b3e08',
  );

  try {
    const translatedBuffer = await translator.translateDocument(
      'text.txt',
      'DE',
      'more',
    );
    fs.writeFileSync('translated_document.txt', translatedBuffer);

    // Translate from URL
    // await translator.translateFromUrl(
    //   'https://example.com/document.pdf',
    //   'translated_document.pdf',
    //   'DE',
    //   'more',
    // );
  } catch (error) {
    if (error instanceof FileValidationError) {
      console.error('File validation error:', error.message);
    } else if (error instanceof TranslationError) {
      console.error('Translation error:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
}

await example();
