import { useState } from 'react';
import Form, {
  Button,
  Card,
  Upload,
  uploadStyles,
  createApi,
} from './Layout.tsx';

export default function Subtitle() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [link, setLink] = useState<string>('');
  const [format, setFormat] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<File | null>(null);

  // Handle form submission
  const handleSubmit = async () => {
    if (!selectedFile && !link) {
      return;
    }

    setIsLoading(true);

    const basePayload = {
      format,
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

    const response = await api('/subtitle', payload);

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
    setFormat(null);
    setResponse(null);
  };

  const [fileError, setFileError] = useState<boolean | string>(false);
  const [linkError, setLinkError] = useState<boolean | string>(false);

  return (
    <Form
      isLoading={isLoading}
      response={response}
      translateAnother={translateAnother}
    >
      <Card>
        <Upload
          onChange={setSelectedFile}
          value={selectedFile}
          link={link}
          setLink={setLink}
          fileError={fileError}
          setFileError={setFileError}
          linkError={linkError}
          setLinkError={setLinkError}
          accept={ACCEPT}
        />

        <div style={uploadStyles.sectionContainer}>
          <div style={uploadStyles.sectionBox}>
            <div style={uploadStyles.sectionTitle}>
              <p style={uploadStyles.sectionTitleText}>Choose output format</p>
            </div>
            <div
              style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
                width: '100%',
              }}
            >
              {FORMATS.map(f => (
                <Button
                  styles={{
                    minWidth: 316,
                    flex: 1,
                    maxWidth: 632,
                    ...(f.value === format
                      ? {
                          border: '1px solid #8F8FF3',
                          backgroundColor: '#F5F5FF',
                        }
                      : {}),
                  }}
                  key={f.value}
                  variant="outline"
                  size="small"
                  onClick={() => setFormat(f.value)}
                >
                  {f.label}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <Button
          disabled={isLoading || (!selectedFile && !link) || !format}
          size="large"
          onClick={handleSubmit}
        >
          Generate subtitles
        </Button>
      </Card>
    </Form>
  );
}

// const BASE_URL = 'https://pre-product.onrender.com';
const BASE_URL = 'http://localhost:3000';

const api = createApi(BASE_URL);

const FORMATS = [
  { value: 'srt', label: 'SRT (universal subtitle format)' },
  { value: 'txt', label: 'TXT (plain text with timestamps)' },
  // { value: 'vtt', label: 'VTT (WebVTT)' },
  // { value: 'json', label: 'JSON (JSON format)' },
];

const ACCEPT = ['.mp4', '.mov', '.webm', '.mkv', '.mp3', '.wav'];
