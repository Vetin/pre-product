import { useState, useRef, type ChangeEvent, type DragEvent } from 'react';
import {
  validateFileType,
  validateFileSize,
} from '../../../src/utils/fileUtils';
import CustomInput from './CustomInput';
import styles from './styles';

export const Upload = ({
  onChange,
  value,
  link,
  setLink,
  types,
  size,
}: {
  onChange: (file: File | null) => void;
  value: File | null;
  link: string;
  setLink: (link: string) => void;
  types: Array<{ ext: string; label: string; type: string }>;
  size: number;
}) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (validateFileType(file) && validateFileSize(file)) {
        onChange(file);
      } else {
        setError(
          'File type not supported. Please upload one of the following types: PDF, DOC, DOCX, PPT, PPTX, AI.',
        );
      }
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      if (validateFileType(file) && validateFileSize(file)) {
        onChange(file);
      } else {
        setError(
          'Please upload a valid file (PDF, DOC, DOCX, PPT, PPTX, AI) under 100MB',
        );
      }
    }
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleRemoveFile = () => onChange(null);

  if (value) {
    return (
      <div style={styles.sectionContainer}>
        <div style={styles.sectionBox}>
          <div style={styles.sectionTitle}>
            <p style={styles.sectionTitleText}>Upload file</p>
          </div>

          <div style={styles.uploadedFileContainer}>
            <div style={styles.uploadedFileContent}>
              <div style={styles.uploadedFileIcon}>📄</div>
              <div style={styles.uploadedFileInfo}>
                <p style={styles.uploadedFileName}>{value.name}</p>
                <p style={styles.uploadedFileSize}>Uploaded</p>
              </div>
            </div>
            <button
              onClick={handleRemoveFile}
              style={styles.uploadedFileRemove}
              title="Remove file"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M13.3333 5.00033V4.33366C13.3333 3.40024 13.3333 2.93353 13.1517 2.57701C12.9919 2.2634 12.7369 2.00844 12.4233 1.84865C12.0668 1.66699 11.6001 1.66699 10.6667 1.66699H9.33333C8.39991 1.66699 7.9332 1.66699 7.57668 1.84865C7.26308 2.00844 7.00811 2.2634 6.84832 2.57701C6.66667 2.93353 6.66667 3.40024 6.66667 4.33366V5.00033M8.33333 9.58366V13.7503M11.6667 9.58366V13.7503M2.5 5.00033H17.5M15.8333 5.00033V14.3337C15.8333 15.7338 15.8333 16.4339 15.5608 16.9686C15.3212 17.439 14.9387 17.8215 14.4683 18.0612C13.9335 18.3337 13.2335 18.3337 11.8333 18.3337H8.16667C6.76654 18.3337 6.06647 18.3337 5.53169 18.0612C5.06129 17.8215 4.67883 17.439 4.43915 16.9686C4.16667 16.4339 4.16667 15.7338 4.16667 14.3337V5.00033"
                  stroke="#667085"
                  stroke-width="1.66667"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.sectionContainer}>
      <div style={styles.sectionBox}>
        <div style={styles.sectionTitle}>
          <p style={styles.sectionTitleText}>Upload file</p>
        </div>

        <div
          style={styles.dragDropArea(dragActive)}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <div style={styles.dragDropContent}>
            <div style={styles.dragDropBox}>
              <div style={styles.uploadText}>
                <p style={styles.uploadTextP}>Upload a file up to 100MB</p>
              </div>

              <div style={styles.uploadButton} onClick={openFileDialog}>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                  accept=".pdf,.doc,.docx,.ppt,.pptx,.ai"
                />
                <div style={styles.uploadButtonContainer}>
                  <div style={styles.uploadButtonBox}>
                    <div style={styles.uploadButtonText}>
                      <p style={styles.uploadButtonTextP}>Upload a file</p>
                    </div>
                  </div>
                </div>
              </div>

              <div style={styles.fileTypeText}>
                <p style={styles.fileTypeTextP}>
                  PDF, DOC, DOCX, PPT, PPTX, AI.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.linkInput}>
          <div style={styles.linkInputContainer}>
            <div style={styles.linkInputBox}>
              <CustomInput
                style={styles.linkInputField}
                placeholder="or Paste a link"
                value={link}
                onChange={e => setLink(e.target.value)}
              />
            </div>
          </div>
          <div style={styles.linkInputBorder} />
        </div>
      </div>
    </div>
  );
};
