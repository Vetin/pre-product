import { useState } from 'react';
import Form, {
  Button,
  Card,
  LanguageOption,
  Upload,
  uploadStyles,
  EnglishFlag,
  FrenchFlag,
  OTHERS,
  Select,
  SpanishFlag,
  GermanFlag,
  createApi,
} from './Layout.tsx';

export default function MarketingAssetsTranslator() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [link, setLink] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
  const [tone, setTone] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<File | null>(null);

  // Handle form submission
  const handleSubmit = async () => {
    if (!selectedFile && !link) {
      return;
    }

    setIsLoading(true);

    const basePayload = {
      lang: selectedLanguage,
      formality: tone ?? 'default',
    };
    const payload = selectedFile
      ? {
          ...basePayload,
          file: await new Promise(resolve => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(selectedFile);
          }),
        }
      : { ...basePayload, link };

    const response = await api('/marketing-assets', payload);

    setIsLoading(false);

    if (response.status === 'error') {
      setIsLoading(false);
      const method = 'link' in payload ? setLinkError : setFileError;
      method(response.message ?? 'Unknown error');
      return;
    }

    const bytes = Uint8Array.from(atob(response.data), c => c.charCodeAt(0));
    const file = new File([bytes], selectedFile?.name ?? 'output.txt', {
      type: selectedFile?.type ?? 'text/plain',
    });

    setResponse(file);
  };

  const translateAnother = () => {
    setSelectedFile(null);
    setLink('');
    setTone(null);
    setResponse(null);
  };

  const [fileError, setFileError] = useState<boolean | string>(false);
  const [linkError, setLinkError] = useState<boolean | string>(false);

  return (
    <Form
      isLoading={isLoading}
      response={response}
      translateAnother={translateAnother}
      loadingTitle="Translating your document"
      responseTitle="Your document is ready!"
      responseCta="Translate another document"
    >
      <Card>
        <Upload
          accept={ACCEPT}
          onChange={setSelectedFile}
          value={selectedFile}
          link={link}
          setLink={setLink}
          fileError={fileError}
          setFileError={setFileError}
          linkError={linkError}
          setLinkError={setLinkError}
        />

        <div style={uploadStyles.sectionContainer}>
          <div style={uploadStyles.sectionBox}>
            <div style={uploadStyles.sectionTitle}>
              <p className="__section-title">Translate to</p>
            </div>

            <div style={uploadStyles.languageOptionsContainer}>
              <div style={uploadStyles.languageOptionsBox}>
                <LanguageOption
                  language="English"
                  flag={<EnglishFlag />}
                  isSelected={selectedLanguage === 'en'}
                  onClick={() => setSelectedLanguage('en')}
                />

                <LanguageOption
                  language="German"
                  flag={<GermanFlag />}
                  isSelected={selectedLanguage === 'DE'}
                  onClick={() => setSelectedLanguage('DE')}
                />

                <LanguageOption
                  language="French"
                  flag={<FrenchFlag />}
                  isSelected={selectedLanguage === 'FR'}
                  onClick={() => setSelectedLanguage('FR')}
                />

                <LanguageOption
                  language="Spanish"
                  flag={<SpanishFlag />}
                  isSelected={selectedLanguage === 'ES'}
                  onClick={() => setSelectedLanguage('ES')}
                />

                <style>{`
                  @media screen and (max-width: 1024px) {
                    .__others {
                      order: -1;
                    }
                  }
                `}</style>

                <Select
                  className="__others"
                  placeholder="Other"
                  options={OTHERS}
                  value={selectedLanguage}
                  onChange={v => setSelectedLanguage(v!)}
                  style={{ width: 'auto', flex: 1 }}
                />
              </div>
            </div>
          </div>
        </div>

        <Button
          disabled={isLoading || (!selectedFile && !link)}
          size="large"
          onClick={handleSubmit}
        >
          {isLoading ? 'Translating...' : 'Translate'}
        </Button>
      </Card>
    </Form>
  );
}

// const BASE_URL = 'https://pre-product.onrender.com';
const BASE_URL = 'http://localhost:3010';

const api = createApi(BASE_URL);

const ACCEPT = ['.pdf', '.doc', '.docx', '.txt'];
