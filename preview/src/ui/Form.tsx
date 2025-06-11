import { useState } from 'react';
import LanguageOption from './LanguageOption';
import { GermanFlag, FrenchFlag, EnglishFlag, SpanishFlag } from './svg/flags';

import styles from './styles';
import { Select } from './Select';
import { Upload } from './Upload';
import { OTHERS } from './lib/others';
import { Card } from './Card';
import { LoadingCard } from './LoadingCard';
import { Button } from './Button';
import { ResponseCard } from './ResponseCard';
import { api } from './api';

function FormComponent() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [link, setLink] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('EN-GB');
  const [tone, setTone] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [response, setResponse] = useState<File | null>(null);

  // Handle form submission
  const handleSubmit = async () => {
    if (!selectedFile && !link) {
      return;
    }

    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 5000));

    setIsLoading(false);
    setResponse(selectedFile);

    // setIsLoading(true);

    // const basePayload = {
    //   lang: selectedLanguage,
    //   formality: tone ?? 'default',
    // };
    // const payload = selectedFile
    //   ? {
    //       ...basePayload,
    //       file: await new Promise(resolve => {
    //         const reader = new FileReader();
    //         reader.onloadend = () => resolve(reader.result);
    //         reader.readAsDataURL(selectedFile);
    //       }),
    //     }
    //   : { ...basePayload, link };

    // const response = await api('/document', payload);

    // setIsLoading(false);

    // if (response.status === 'error') return;

    // setResponse(new File([response.data], selectedFile?.name ?? ''));

    // Simulate API call
    // setTimeout(() => {
    //   console.log('File:', selectedFile);
    //   console.log('Link:', link);
    //   console.log('Language:', selectedLanguage);
    //   console.log('Tone:', tone);
    //   setIsLoading(false);
    //   alert('Translation request submitted successfully!');
    //   // Reset form
    //   setSelectedFile(null);
    //   setLink('');
    // }, 2000);
  };

  const translateAnother = () => {
    setSelectedFile(null);
    setLink('');
    setTone(null);
    setResponse(null);
  };

  if (isLoading) return <LoadingCard />;

  if (response)
    return <ResponseCard file={response} translateAnother={translateAnother} />;

  return (
    <Card>
      <Upload
        onChange={setSelectedFile}
        value={selectedFile}
        link={link}
        setLink={setLink}
      />

      <div style={styles.sectionContainer}>
        <div style={styles.sectionBox}>
          <div style={styles.sectionTitle}>
            <p style={styles.sectionTitleText}>Translate to</p>
          </div>

          <div style={styles.languageOptionsContainer}>
            <div style={styles.languageOptionsBox}>
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
                language="English"
                flag={<EnglishFlag />}
                isSelected={selectedLanguage === 'EN-GB'}
                onClick={() => setSelectedLanguage('EN-GB')}
              />

              <LanguageOption
                language="Spanish"
                flag={<SpanishFlag />}
                isSelected={selectedLanguage === 'ES'}
                onClick={() => setSelectedLanguage('ES')}
              />

              <Select
                placeholder="Other"
                options={OTHERS}
                value={selectedLanguage}
                onChange={v => setSelectedLanguage(v!)}
                style={{ width: 'auto', flex: 1 }}
              />
            </div>
          </div>

          <Select
            onChange={setTone}
            options={[
              { label: 'Not specified', value: null },
              { label: 'Informal', value: 'prefer_less' },
              { label: 'Formal', value: 'prefer_more' },
            ]}
            placeholder="Select tone"
            value={tone}
          />
        </div>
      </div>

      <Button
        disabled={isLoading || (!selectedFile && !link)}
        size="large"
        onClick={handleSubmit}
      >
        {isLoading ? 'Translating...' : 'Translate'}
      </Button>
      <div id="portal"></div>
    </Card>
  );
}

export default function Form() {
  return (
    <div className="__entry">
      <style>
        {`
        .__entry * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: 'Suisse Intl';
        }
      `}
      </style>
      <FormComponent />
    </div>
  );
}
