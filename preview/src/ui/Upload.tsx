import { useState, useRef, type ChangeEvent, type DragEvent } from 'react';
import CustomInput from './CustomInput';
import uploadStyles from './styles';

const SUPPORTED_FILE_TYPES = [
  '.pdf',
  '.doc',
  '.docx',
  '.ppt',
  '.pptx',
  '.ai',
  '.txt',
];

const uploadStyles = {
  container: {
    backgroundColor: '#ffffff',
    position: 'relative',
    borderRadius: '30px',
    width: '100%',
    height: '100%',
  } as CSSProperties,
  innerContainer: {
    position: 'relative',
    width: '100%',
    height: '100%',
  } as CSSProperties,
  contentBox: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    overflow: 'clip',
    padding: '40px',
    position: 'relative',
    width: '100%',
    height: '100%',
    borderRadius: '30px',
    border: '1px solid #D0D5DD',
  } as CSSProperties,
  sectionContainer: {
    position: 'relative',
    flexShrink: 0,
    width: '100%',
  } as CSSProperties,
  sectionBox: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 0,
    position: 'relative',
    width: '100%',
  } as CSSProperties,
  sectionTitle: {
    display: 'flex',
    flexDirection: 'column',
    fontFamily: "'Suisse Intl:Regular', sans-serif",
    fontWeight: 'normal',
    justifyContent: 'center',
    lineHeight: 0,
    minWidth: '100%',
    fontStyle: 'normal',
    position: 'relative',
    flexShrink: 0,
    color: '#000000',
    fontSize: '24px',
    textAlign: 'left',
    letterSpacing: '-0.72px',
  } as CSSProperties,
  sectionTitleText: {
    display: 'block',
    lineHeight: 1.3,
    fontFamily: 'Suisse Intl',
    fontSize: '24px',
    margin: 0,
  } as CSSProperties,
  dragDropArea: (dragActive: boolean, invalid: boolean) =>
    ({
      position: 'relative',
      flexShrink: 0,
      width: '100%',
      backgroundColor: dragActive ? '#f5f5ff' : 'transparent',
      height: '200px',
      borderRadius: '16px',
      border: '1px dashed',
      borderColor: invalid ? '#FDA29B' : '#8f8ff3',
    } as CSSProperties),
  dragDropContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    height: '100%',
  } as CSSProperties,
  dragDropBox: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    height: '200px',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '12px',
    position: 'relative',
    width: '100%',
  } as CSSProperties,
  uploadText: {
    fontFamily: "'Suisse Intl:Regular', sans-serif",
    fontWeight: 'normal',
    lineHeight: 0,
    fontStyle: 'normal',
    position: 'relative',
    flexShrink: 0,
    color: '#3d3de9',
    fontSize: '14px',
    textAlign: 'center',
    whiteSpace: 'nowrap',
  } as CSSProperties,
  uploadTextP: {
    display: 'block',
    lineHeight: '22px',
    whiteSpace: 'pre',
    margin: 0,
  } as CSSProperties,
  uploadButton: {
    position: 'relative',
    borderRadius: '16px',
    boxShadow: '0px 1px 2px 0px rgba(20,21,26,0.05)',
    flexShrink: 0,
    backgroundColor: '#0000ff',
    width: '100%',
    maxWidth: 220,
    cursor: 'pointer',
  } as CSSProperties,
  uploadButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'clip',
    position: 'relative',
    width: '100%',
    height: '100%',
  } as CSSProperties,
  uploadButtonBox: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    gap: '4px',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '18px',
    paddingBottom: '18px',
    position: 'relative',
    width: 'fit-content',
  } as CSSProperties,
  uploadButtonText: {
    fontFamily: "'Suisse Intl:Book', sans-serif",
    fontWeight: 450,
    lineHeight: 0,
    fontStyle: 'normal',
    position: 'relative',
    flexShrink: 0,
    color: '#ffffff',
    fontSize: '20px',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    letterSpacing: '-0.02em',
  } as CSSProperties,
  uploadButtonTextP: {
    display: 'block',
    lineHeight: '24px',
    whiteSpace: 'pre',
    margin: 0,
  } as CSSProperties,
  fileTypeText: {
    fontFamily: "'Suisse Intl:Regular', sans-serif",
    fontWeight: 'normal',
    lineHeight: 0,
    fontStyle: 'normal',
    position: 'relative',
    flexShrink: 0,
    color: '#3d3de9',
    fontSize: '14px',
    textAlign: 'center',
    whiteSpace: 'nowrap',
  } as CSSProperties,
  fileTypeTextP: {
    display: 'block',
    lineHeight: '22px',
    whiteSpace: 'pre',
    margin: 0,
  } as CSSProperties,
  linkInput: {
    backgroundColor: '#ffffff',
    height: '54px',
    position: 'relative',
    borderRadius: '12px',
    flexShrink: 0,
    width: '100%',
  } as CSSProperties,
  linkInputContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    overflow: 'clip',
    position: 'relative',
    width: '100%',
    height: '100%',
  } as CSSProperties,
  linkInputBox: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    gap: '8px',
    height: '54px',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: '14px',
    paddingRight: '14px',
    paddingTop: '8px',
    paddingBottom: '8px',
    position: 'relative',
    width: '100%',
  } as CSSProperties,
  linkInputField: {
    flexBasis: 0,
    fontFamily: "'Suisse Intl:Regular', sans-serif",
    fontWeight: 'normal',
    flexGrow: 1,
    lineHeight: 0,
    minHeight: '1px',
    minWidth: '1px',
    fontStyle: 'normal',
    position: 'relative',
    flexShrink: 0,
    fontSize: '16px',
    textAlign: 'left',
    border: 'none',
    outline: 'none',
  } as CSSProperties,
  linkInputBorder: (invalid: boolean) =>
    ({
      position: 'absolute',
      border: '1px solid',
      borderStyle: 'solid',
      inset: 0,
      pointerEvents: 'none',
      borderRadius: '12px',
      borderColor: invalid ? '#FDA29B' : '#d0d5dd',
    } as CSSProperties),
  languageOptionsContainer: {
    position: 'relative',
    flexShrink: 0,
    width: '100%',
  } as CSSProperties,
  languageOptionsBox: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    gap: '4px',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 0,
    position: 'relative',
    width: '100%',
    flexWrap: 'nowrap',
    overflow: 'auto',
    scrollbarWidth: 'none',
  } as CSSProperties,
  languageOption: (isSelected: boolean) =>
    ({
      flexBasis: 0,
      backgroundColor: '#ffffff',
      flexGrow: 1,
      height: '44px',
      minHeight: '1px',
      // minWidth: '1px',
      width: 140,
      position: 'relative',
      borderRadius: '59px',
      flexShrink: 0,
      cursor: 'pointer',
      border: isSelected ? '1px solid  #8F8FF3' : '1px solid #d0d5dd',
    } as CSSProperties),
  languageOptionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    height: '100%',
  } as CSSProperties,
  languageOptionBox: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    gap: '6px',
    height: '44px',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '12px',
    paddingBottom: '12px',
    position: 'relative',
    width: '100%',
  } as CSSProperties,
  languageText: {
    fontFamily: "'Suisse Intl:Regular', sans-serif",
    fontWeight: 'normal',
    lineHeight: 0,
    fontStyle: 'normal',
    position: 'relative',
    flexShrink: 0,
    color: '#101828',
    fontSize: '16px',
    textAlign: 'left',
    whiteSpace: 'nowrap',
    letterSpacing: '-0.5px',
  } as CSSProperties,
  languageTextP: {
    display: 'block',
    lineHeight: '22px',
    whiteSpace: 'pre',
  } as CSSProperties,
  toneSelector: {
    position: 'relative',
    flexShrink: 0,
    width: '100%',
    backgroundColor: '#ffffff',
    height: '44px',
    borderRadius: '59px',
    cursor: 'pointer',
  } as CSSProperties,
  toneSelectorBorder: {
    position: 'absolute',
    border: '1px solid #d0d5dd',
    borderStyle: 'solid',
    inset: 0,
    pointerEvents: 'none',
    borderRadius: '59px',
  } as CSSProperties,
  toneSelectorContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
    width: '100%',
    height: '100%',
  } as CSSProperties,
  toneSelectorBox: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    gap: '6px',
    height: '44px',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '20px',
    paddingRight: '20px',
    paddingTop: '12px',
    paddingBottom: '12px',
    position: 'relative',
    width: '100%',
  } as CSSProperties,
  toneText: {
    fontFamily: "'Suisse Intl:Regular', sans-serif",
    fontWeight: 'normal',
    lineHeight: 0,
    fontStyle: 'normal',
    position: 'relative',
    flexShrink: 0,
    color: '#101828',
    fontSize: '16px',
    textAlign: 'left',
    whiteSpace: 'nowrap',
    letterSpacing: '-0.5px',
  } as CSSProperties,
  toneTextP: {
    display: 'block',
    lineHeight: '22px',
    whiteSpace: 'pre',
  } as CSSProperties,
  iconContainer: {
    position: 'relative',
    flexShrink: 0,
    width: '16px',
    height: '16px',
  } as CSSProperties,
  submitButton: (isDisabled: boolean) =>
    ({
      position: 'relative',
      borderRadius: '16px',
      boxShadow: '0px 1px 2px 0px rgba(20,21,26,0.05)',
      flexShrink: 0,
      width: '100%',
      backgroundColor: isDisabled ? '#d1d1fa' : '#0000ff',
      cursor: isDisabled ? 'default' : 'pointer',
    } as CSSProperties),
  submitButtonContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'clip',
    position: 'relative',
    width: '100%',
    height: '100%',
  } as CSSProperties,
  submitButtonBox: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'row',
    gap: '4px',
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: '16px',
    paddingRight: '16px',
    paddingTop: '18px',
    paddingBottom: '18px',
    position: 'relative',
    width: '100%',
  } as CSSProperties,
  submitButtonText: {
    fontFamily: "'Suisse Intl:Book', sans-serif",
    fontWeight: 450,
    lineHeight: 0,
    fontStyle: 'normal',
    position: 'relative',
    flexShrink: 0,
    color: '#ffffff',
    fontSize: '20px',
    textAlign: 'center',
    whiteSpace: 'nowrap',
    letterSpacing: '-0.4px',
  } as CSSProperties,
  submitButtonTextP: {
    display: 'block',
    lineHeight: '24px',
    whiteSpace: 'pre',
    margin: 0,
  } as CSSProperties,
  flagContainer: {
    position: 'relative',
    flexShrink: 0,
    width: '24px',
    height: '24px',
  } as CSSProperties,
  flagBox: {
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'clip',
    padding: 0,
    position: 'relative',
    width: '24px',
    height: '24px',
  } as CSSProperties,
  flagSize: {
    height: '16px',
    position: 'relative',
    flexShrink: 0,
    width: '22px',
  } as CSSProperties,
  flagSvg: {
    display: 'block',
    width: '100%',
    height: '100%',
  } as CSSProperties,
  englishFlagContainer: {
    overflow: 'clip',
    position: 'relative',
    flexShrink: 0,
    width: '24px',
    height: '24px',
  } as CSSProperties,
  englishFlagInner: {
    position: 'absolute',
    height: '16px',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    width: '22px',
  } as CSSProperties,
  // Uploaded file styles
  uploadedFileContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '16px',
    backgroundColor: '#ffffff',
    border: '1px solid #D0D5DD',
    borderRadius: '16px',
    position: 'relative',
    flexShrink: 0,
    width: '100%',
    boxSizing: 'border-box',
  } as CSSProperties,
  uploadedFileContent: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1,
    overflow: 'hidden',
  } as CSSProperties,
  uploadedFileIcon: {
    width: '40px',
    height: '40px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#ffffff',
    fontSize: '18px',
    fontWeight: 'bold',
    flexShrink: 0,
  } as CSSProperties,
  uploadedFileInfo: {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minWidth: 0,
  } as CSSProperties,
  uploadedFileName: {
    fontFamily: "'Suisse Intl:Regular', sans-serif",

    fontSize: '16px',
    lineHeight: '22px',
    fontWeight: 500,
    color: '#101828',
    margin: 0,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  } as CSSProperties,
  uploadedFileSize: {
    fontFamily: "'Suisse Intl:Regular', sans-serif",
    fontWeight: 'normal',
    fontSize: '14px',
    lineHeight: '20px',
    color: '#667085',
    margin: 0,
  } as CSSProperties,
  uploadedFileRemove: {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    color: '#667085',
    fontSize: '16px',
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '32px',
    height: '32px',
    flexShrink: 0,
    transition: 'background-color 0.15s ease',
  } as CSSProperties,
};

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
      <div style={uploadStyles.sectionContainer}>
        <div style={uploadStyles.sectionBox}>
          <div style={uploadStyles.sectionTitle}>
            <p style={uploadStyles.sectionTitleText}>Upload file</p>
          </div>

          <div style={uploadStyles.uploadedFileContainer}>
            <div style={uploadStyles.uploadedFileContent}>
              <div style={uploadStyles.uploadedFileIcon}>
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
              <div style={uploadStyles.uploadedFileInfo}>
                <p style={uploadStyles.uploadedFileName}>{value.name}</p>
                <p style={uploadStyles.uploadedFileSize}>Uploaded</p>
              </div>
            </div>
            <button
              onClick={handleRemoveFile}
              style={uploadStyles.uploadedFileRemove}
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
    <div style={uploadStyles.sectionContainer}>
      <div style={uploadStyles.sectionBox}>
        <div style={uploadStyles.sectionTitle}>
          <p style={uploadStyles.sectionTitleText}>Upload file</p>
        </div>

        <div style={{ width: '100%' }}>
          <div
            style={uploadStyles.dragDropArea(dragActive, fileError)}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div style={uploadStyles.dragDropContent}>
              <div style={uploadStyles.dragDropBox}>
                <div style={uploadStyles.uploadText}>
                  <p style={uploadStyles.uploadTextP}>
                    Upload a file up to 100MB
                  </p>
                </div>

                <div style={uploadStyles.uploadButton} onClick={openFileDialog}>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    accept=".pdf,.doc,.docx,.ppt,.pptx,.ai,.txt"
                  />
                  <div style={uploadStyles.uploadButtonContainer}>
                    <div style={uploadStyles.uploadButtonBox}>
                      <div style={uploadStyles.uploadButtonText}>
                        <p style={uploadStyles.uploadButtonTextP}>
                          Upload a file
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={uploadStyles.fileTypeText}>
                  <p style={uploadStyles.fileTypeTextP}>
                    PDF, DOC, DOCX, PPT, PPTX, AI.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {fileError && <FormatError />}
        </div>

        <div style={uploadStyles.linkInput}>
          <div style={uploadStyles.linkInputContainer}>
            <div style={uploadStyles.linkInputBox}>
              <CustomInput
                style={uploadStyles.linkInputField}
                placeholder="or Paste a link"
                value={link}
                onChange={onLinkChange}
              />
            </div>
          </div>
          <div style={uploadStyles.linkInputBorder(linkError)} />
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
