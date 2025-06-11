import { useState, useRef, type ChangeEvent, type DragEvent } from 'react';
import CustomInput from './CustomInput';
import styles from './styles';

const SUPPORTED_FILE_TYPES = [
  '.pdf',
  '.doc',
  '.docx',
  '.ppt',
  '.pptx',
  '.ai',
  '.txt',
];

export const Upload = ({
  onChange,
  value,
  link,
  setLink,
}: {
  onChange: (file: File | null) => void;
  value: File | null;
  link: string;
  setLink: (link: string) => void;
  types?: Array<{ ext: string; label: string; type: string }>;
}) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [fileError, setFileError] = useState<boolean>(false);
  const [linkError, setLinkError] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      onChange(file);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];

      const type = file.type.split('/')?.[1] ?? '';

      if (
        type !== 'plain' &&
        !SUPPORTED_FILE_TYPES.includes(`.${file.type.split('/')?.[1] ?? ''}`)
      ) {
        setFileError(true);
        return;
      }

      onChange(file);
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

  const handleRemoveFile = () => {
    setFileError(false);
    onChange(null);
  };

  const onLinkChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLinkError(false);
    setLink(e.target.value);

    const ext = e.target.value.split('.').pop();

    if (!ext) return;

    if (!SUPPORTED_FILE_TYPES.includes(ext)) {
      setLinkError(true);
    }
  };

  if (value) {
    return (
      <div style={styles.sectionContainer}>
        <div style={styles.sectionBox}>
          <div style={styles.sectionTitle}>
            <p style={styles.sectionTitleText}>Upload file</p>
          </div>

          <div style={styles.uploadedFileContainer}>
            <div style={styles.uploadedFileContent}>
              <div style={styles.uploadedFileIcon}>
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 36 36"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="18" cy="18" r="18" fill="#F5F5FF" />
                  <circle cx="18" cy="18" r="14" fill="#E7E7FC" />
                  <path
                    d="M19.3337 11.5126V14.2663C19.3337 14.6397 19.3337 14.8264 19.4063 14.969C19.4702 15.0944 19.5722 15.1964 19.6977 15.2603C19.8403 15.333 20.027 15.333 20.4003 15.333H23.154M23.3337 16.6585V21.4663C23.3337 22.5864 23.3337 23.1465 23.1157 23.5743C22.9239 23.9506 22.618 24.2566 22.2416 24.4484C21.8138 24.6663 21.2538 24.6663 20.1337 24.6663H15.867C14.7469 24.6663 14.1868 24.6663 13.759 24.4484C13.3827 24.2566 13.0767 23.9506 12.885 23.5743C12.667 23.1465 12.667 22.5864 12.667 21.4663V14.533C12.667 13.4129 12.667 12.8529 12.885 12.425C13.0767 12.0487 13.3827 11.7427 13.759 11.551C14.1868 11.333 14.7469 11.333 15.867 11.333H18.0082C18.4974 11.333 18.7419 11.333 18.9721 11.3883C19.1762 11.4373 19.3713 11.5181 19.5502 11.6277C19.7521 11.7514 19.925 11.9244 20.2709 12.2703L22.3964 14.3957C22.7423 14.7417 22.9153 14.9146 23.0389 15.1164C23.1486 15.2954 23.2294 15.4905 23.2784 15.6945C23.3337 15.9247 23.3337 16.1693 23.3337 16.6585Z"
                    stroke="#0B0BCF"
                    stroke-width="1.33"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </div>
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

        <div style={{ width: '100%' }}>
          <div
            style={styles.dragDropArea(dragActive, fileError)}
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
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.ai,.txt"
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
          {fileError && <FormatError />}
        </div>

        <div style={styles.linkInput}>
          <div style={styles.linkInputContainer}>
            <div style={styles.linkInputBox}>
              <CustomInput
                style={styles.linkInputField}
                placeholder="or Paste a link"
                value={link}
                onChange={onLinkChange}
              />
            </div>
          </div>
          <div style={styles.linkInputBorder(linkError)} />
          {linkError && <FormatError />}
        </div>
      </div>
    </div>
  );
};

const FormatError = () => (
  <p
    style={{
      color: '#D92D20',
      fontFamily: 'Suisse Intl',
      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '20px',
    }}
  >
    File type not supported. Please upload one of the following types: PDF, DOC,
    DOCX, PPT, PPTX, AI.
  </p>
);
