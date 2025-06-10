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

export default function Form() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [link, setLink] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('English');
  const [tone, setTone] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [requestSent, setRequestSent] = useState<boolean>(false);

  // Handle form submission
  const handleSubmit = async () => {
    if (!selectedFile && !link) {
      alert('Please upload a file or provide a link');
      return;
    }

    setIsLoading(true);

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

  if (isLoading) return <LoadingCard />;

  if (true) return <ResponseCard />;

  return (
    <Card>
      {/* File Upload Section */}
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
                isSelected={selectedLanguage === 'German'}
                onClick={() => setSelectedLanguage('German')}
              />

              <LanguageOption
                language="French"
                flag={<FrenchFlag />}
                isSelected={selectedLanguage === 'French'}
                onClick={() => setSelectedLanguage('French')}
              />

              <LanguageOption
                language="English"
                flag={<EnglishFlag />}
                isSelected={selectedLanguage === 'English'}
                onClick={() => setSelectedLanguage('English')}
              />

              <LanguageOption
                language="Spanish"
                flag={<SpanishFlag />}
                isSelected={selectedLanguage === 'Spanish'}
                onClick={() => setSelectedLanguage('Spanish')}
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
              { label: 'Informal', value: 'informal' },
              { label: 'Formal', value: 'formal' },
            ]}
            placeholder="Select tone"
            value={tone}
          />
        </div>
      </div>

      <Button disabled={isLoading || (!selectedFile && !link)} size="large">
        {isLoading ? 'Translating...' : 'Translate'}
      </Button>
      <div id="portal"></div>
    </Card>
  );
}
