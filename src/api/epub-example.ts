import { DeepLTranslator } from './deepl';

// Simple example of how to translate an EPUB file
async function translateEpubExample() {
  const apiKey = '6ae621ad-ccc1-44b3-9be9-b85c575b3e08';
  const translator = new DeepLTranslator(apiKey);

  try {
    // Method 1: Translate local EPUB file
    const epubPath = __dirname + '/georgia-pls-ssml.epub';
    const translatedBuffer = await translator.translateEpub(
      epubPath,
      'IT', // Target language: German
      'default', // Formality level
    );

    // Save the translated EPUB
    require('fs').writeFileSync('./my-book-german.epub', translatedBuffer);
    console.log('EPUB translated successfully!');

    // // Method 2: Translate EPUB from URL
    // const epubUrl = 'https://example.com/book.epub';
    // const translatedFromUrl = await translator.translateEpubFromUrl(
    //   epubUrl,
    //   'FR', // Target language: French
    //   'default',
    // );

    // require('fs').writeFileSync('./book-french.epub', translatedFromUrl);
    // console.log('EPUB from URL translated successfully!');

    // // Method 3: Use the general translateDocument method (automatically detects EPUB)
    // const autoTranslated = await translator.translateDocument(
    //   './another-book.epub',
    //   'ES', // Target language: Spanish
    //   'default',
    // );

    // require('fs').writeFileSync('./another-book-spanish.epub', autoTranslated);
    // console.log('Auto-detected EPUB translated successfully!');
  } catch (error) {
    console.error('Translation failed:', error.message);
  }
}

export { translateEpubExample };

translateEpubExample();
