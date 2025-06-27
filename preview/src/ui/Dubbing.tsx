import { useState } from 'react';
import Form, {
  Button,
  Card,
  LanguageOption,
  Upload,
  uploadStyles,
  EnglishFlag,
  FrenchFlag,
  Select,
  SpanishFlag,
  GermanFlag,
  createApi,
} from './Layout.tsx';

export default function Dubbing() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [link, setLink] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('en');
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

    const response = await api('/dubbing', payload);

    setIsLoading(false);

    if (response.status === 'error') {
      setIsLoading(false);
      const method = 'link' in payload ? setLinkError : setFileError;
      method(response.message ?? 'Unknown error');
      return;
    }

    const bytes = Uint8Array.from(atob(response.base64), c => c.charCodeAt(0));
    const file = new File(
      [bytes],
      `dubbed${response.fileExtension ? '.' + response.fileExtension : ''}`,
      {
        type: response.contentType,
      },
    );

    setResponse(file);
  };

  const translateAnother = () => {
    setSelectedFile(null);
    setLink('');
    setResponse(null);
  };

  const [fileError, setFileError] = useState<boolean | string>(false);
  const [linkError, setLinkError] = useState<boolean | string>(false);

  return (
    <Form
      isLoading={isLoading}
      response={response}
      translateAnother={translateAnother}
      loadingTitle="Dubbing your video"
      responseTitle="Your video is ready!"
      responseCta="Dub another video"
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
          fileSizeLimit={30}
        />

        <div style={uploadStyles.sectionContainer}>
          <div style={uploadStyles.sectionBox}>
            <div style={uploadStyles.sectionTitle}>
              <p style={uploadStyles.sectionTitleText}>Translate to</p>
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
                  isSelected={selectedLanguage === 'de'}
                  onClick={() => setSelectedLanguage('de')}
                />

                <LanguageOption
                  language="French"
                  flag={<FrenchFlag />}
                  isSelected={selectedLanguage === 'fr'}
                  onClick={() => setSelectedLanguage('fr')}
                />

                <LanguageOption
                  language="Spanish"
                  flag={<SpanishFlag />}
                  isSelected={selectedLanguage === 'es'}
                  onClick={() => setSelectedLanguage('es')}
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
          disabled={!selectedFile && !link}
          size="large"
          onClick={handleSubmit}
        >
          Dub video
        </Button>
      </Card>
    </Form>
  );
}

const BASE_URL = 'https://pre-product.onrender.com';
// const BASE_URL = "http://localhost:3000"

const api = createApi(BASE_URL);

const ACCEPT = ['.mp4', '.mov', '.webm', '.mkv', '.mp3', '.wav'];

const LANGUAGES = [
  { label: 'Hindi', value: 'hi', code: 'in' },
  { label: 'Portuguese', value: 'pt', code: 'pt' },
  { label: 'Chinese', value: 'zh', code: 'CN' },
  { label: 'Japanese', value: 'ja', code: 'jp' },
  { label: 'Arabic', value: 'ar', code: 'sa' },
  { label: 'Russian', value: 'ru', code: 'ru' },
  { label: 'Korean', value: 'ko', code: 'kr' },
  { label: 'Indonesian', value: 'id', code: 'id' },
  { label: 'Italian', value: 'it', code: 'it' },
  { label: 'Dutch', value: 'nl', code: 'nl' },
  { label: 'Turkish', value: 'tr', code: 'tr' },
  { label: 'Polish', value: 'pl', code: 'pl' },
  { label: 'Swedish', value: 'sv', code: 'sv' },
  { label: 'Filipino', value: 'fil', code: 'ph' },
  { label: 'Malay', value: 'ms', code: 'ms' },
  { label: 'Romanian', value: 'ro', code: 'ro' },
  { label: 'Ukrainian', value: 'uk', code: 'ua' },
  { label: 'Greek', value: 'el', code: 'gr' },
  { label: 'Czech', value: 'cs', code: 'cz' },
  { label: 'Danish', value: 'da', code: 'dk' },
  { label: 'Finnish', value: 'fi', code: 'fi' },
  { label: 'Bulgarian', value: 'bg', code: 'bg' },
  { label: 'Croatian', value: 'hr', code: 'hr' },
  { label: 'Slovak', value: 'sk', code: 'sk' },
  { label: 'Tamil', value: 'ta', code: 'in' },
];

const OTHERS = LANGUAGES.map(lang => ({
  label: (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <img
        src={`https://flagcdn.com/${lang.code?.toLowerCase()}.svg`}
        alt={lang.label}
        width={22}
        height={16}
        style={{ borderRadius: 2 }}
      />
      <p style={{ margin: 0 }}>{lang.label}</p>
    </div>
  ),
  value: lang.value ?? lang.code,
}));
