import React from 'react';
import { createPortal } from 'react-dom';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type CSSProperties,
  type DragEvent,
  type PropsWithChildren,
} from 'react';

type Props = {
  isLoading: boolean;
  response: File | null;
  translateAnother: () => void;
  loadingTitle: string;
  responseTitle: string;
  responseCta: string;
};

function FormComponent({
  children,
  isLoading,
  response,
  translateAnother,
  loadingTitle,
  responseTitle,
  responseCta,
}: PropsWithChildren<Props>) {
  if (isLoading) return <LoadingCard title={loadingTitle} />;

  if (response)
    return (
      <ResponseCard
        file={response}
        translateAnother={translateAnother}
        title={responseTitle}
        cta={responseCta}
      />
    );

  return <>{children}</>;
}

export default function Form({ children, ...rest }: PropsWithChildren<Props>) {
  return (
    <div className="__entry">
      <style>
        {`
        .__entry * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
          font-family: "Suisse Intl Regular", "Suisse Intl Regular Placeholder", sans-serif;
        }
        .__button {
          font-family: "Suisse Intl Light", "Suisse Intl Light Placeholder", sans-serif;
        }
        .__button[data-variant="primary"]:not(:disabled):hover {
         background-color: #0B0BCF!important;
        }
         .__button[data-variant="outline"]:hover {
         background-color: #FAFAFF!important;
         }

      `}
      </style>
      <FormComponent {...rest}>{children}</FormComponent>
      <div id="portal"></div>
    </div>
  );
}

const ResponseCard = ({
  file,
  translateAnother,
  title,
  cta,
}: {
  file: File;
  translateAnother: () => void;
  title: string;
  cta: string;
}) => {
  return (
    <Card
      styles={{
        gap: 24,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 32,
        paddingBottom: 0,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          justifyContent: 'center',
        }}
      >
        <p
          style={{
            color: '#000',
            textAlign: 'center',

            fontSize: 24,
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '130%',
            letterSpacing: '-0.72px',
            margin: 0,
          }}
        >
          {title}
        </p>
        <a
          onClick={translateAnother}
          style={{
            margin: 0,
            color: '#00F',
            textAlign: 'center',
            cursor: 'pointer',
            fontSize: 16,
            fontStyle: 'normal',
            fontWeight: 400,
            lineHeight: '20px',
            letterSpacing: '-0.16px',
          }}
        >
          {cta}
        </a>
      </div>
      <Download value={file} />
      <div
        style={{
          maxWidth: 680,
          width: '100%',
          position: 'relative',
          borderRadius: '24px 24px 0px 0px',
          background: 'linear-gradient(84deg, #00F 36.56%, #DDF 125.51%)',
          paddingTop: 50,
          paddingLeft: 30,
          paddingRight: 30,
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-start',
          gap: 20,
          paddingBottom: 50,
        }}
        className="__response-card"
      >
        <style>
          {`
          .__response-card .item {
            width: 50%;
          }
          @media screen and (max-width: 1024px) {
            .__response-card {
              height: 400px;
              flex-direction: column;
              gap: 0!important;
              padding-bottom: 0;
              overflow: hidden;
              padding: 40px 20px;
            }

            .__response-card .item {
              width: 100%;
              align-items: center;
              text-align: center;
            }

            .__response-card .image-wrapper {
              position: relative;
              width: 100%;
            }

            .__response-card .image-editor {

              width: 100%;
              height: 159px;
              bottom: -78px !important;
              left: 0px !important;
              right: 0 !important;
              object-fit: contain;
            }

            .__response-card .image-video {
              width: 136px;
              height: 96px;
              transform: rotate(0deg)!important;
            }
          }
        `}
        </style>
        <div
          className="item"
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
            flex: '1',
          }}
        >
          <p
            style={{
              color: '#FFF',

              fontSize: 28,
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '100%',
              letterSpacing: '-0.84px',
              whiteSpace: 'pre',
            }}
          >
            Translate your videos{'\n'}and audio into any{'\n'}
            language{' '}
            <span
              style={{
                fontStyle: 'italic',
                fontFamily:
                  '"Suisse Works Italic", "Suisse Works Italic Placeholder", sans-serif',
              }}
            >
              with Rask AI
            </span>
          </p>
          <p
            style={{
              color: '#FFF',

              fontSize: 14,
              fontStyle: 'normal',
              fontWeight: 400,
              lineHeight: '100%',
              letterSpacing: '-0.42px',
              opacity: '0.77',
            }}
          >
            Flexible workflows, powerful results — all in one platform
          </p>
          <a
            href="https://app.rask.ai/auth"
            style={{
              display: 'flex',
              width: 130,
              padding: 8,
              justifyContent: 'center',
              alignItems: 'center',
              gap: 4,
              borderRadius: 12,
              background: '#FFF',
              boxShadow: '0px 1px 2px 0px rgba(20, 21, 26, 0.05)',
              marginTop: 16,
              color: '#00F',
              textAlign: 'center',

              fontSize: 14,
              fontStyle: 'normal',
              fontWeight: 450,
              lineHeight: '24px',
              letterSpacing: '-0.28px',
              border: 'none',
              textDecoration: 'none',
            }}
          >
            Try it free
          </a>
        </div>

        <div style={{ flex: '1' }} className="image-wrapper">
          <img
            src="https://framerusercontent.com/images/iQJ4zFZDOVIiLQ8ICCEbV3YAg.png"
            alt="Editor"
            className="image-editor"
            width={292}
            height={166}
            style={{
              position: 'absolute',
              right: 32,
              bottom: 14,
            }}
          />
          <img
            src="https://framerusercontent.com/images/Eneq66uhBMqISZViPpOp60jv1ZY.png"
            alt="Video"
            width={185}
            height={130}
            className="image-video"
            style={{
              position: 'absolute',
              right: 4,
              top: 14,
              transform: 'rotate(-7.635deg)',
            }}
          />
          <img
            src="https://framerusercontent.com/images/SS1jmFtYlXXWWpUlXvksS7fmN4.png"
            alt="Grid"
            width={289}
            height={340}
            style={{
              position: 'absolute',
              right: -32,
              top: -32,
              transform: 'rotate(-7.338deg)',
            }}
          />
        </div>
      </div>
    </Card>
  );
};

const Download = ({ value }: { value: File | null }) => {
  const downloadFile = () => {
    if (!value) return;

    const obj = new Blob([value], { type: value?.type });

    if (typeof window !== 'undefined') {
      const link = document.createElement('a');

      link.href = URL.createObjectURL(obj);
      link.download = value.name;
      link.click();
      link.remove();
    }
  };

  if (!value) return null;

  return (
    <div
      style={{
        ...uploadStyles.sectionContainer,
        cursor: 'pointer',
        maxWidth: 427,
      }}
      onClick={downloadFile}
    >
      <div style={uploadStyles.sectionBox}>
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
                  strokeWidth="1.33"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <div style={uploadStyles.uploadedFileInfo}>
              <p style={uploadStyles.uploadedFileName}>{value.name}</p>
              <p style={uploadStyles.uploadedFileSize}>
                {(() => {
                  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
                  let size = value.size;
                  let unitIndex = 0;

                  while (size >= 1024 && unitIndex < units.length - 1) {
                    size /= 1024;
                    unitIndex++;
                  }

                  return `${Math.round(size * 100) / 100} ${units[unitIndex]}`;
                })()}
              </p>
            </div>
          </div>
          <button style={uploadStyles.uploadedFileRemove}>
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M17.5 17.5H2.5M15 9.16667L10 14.1667M10 14.1667L5 9.16667M10 14.1667V2.5"
                stroke="#667085"
                strokeWidth="1.66667"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export const Button = ({
  children,
  disabled,
  size = 'large',
  styles: propStyles,
  onClick,
  href,
  variant = 'primary',
  tag,
}: PropsWithChildren<{
  disabled?: boolean;
  size?: 'small' | 'large';
  styles?: CSSProperties;
  onClick?: () => void;
  href?: string;
  variant?: 'primary' | 'outline';
  tag?: string;
}>) => {
  const Tag = (tag ?? (href ? 'a' : 'button')) as React.ElementType;

  return (
    <Tag
      href={href}
      style={{
        ...buttonStyles.button(Boolean(disabled), size, variant),
        ...propStyles,
      }}
      disabled={disabled}
      onClick={onClick}
      className="__button"
      data-variant={variant}
    >
      {children}
    </Tag>
  );
};

const buttonStyles = {
  button: (
    isDisabled: boolean,
    size: 'small' | 'large',
    variant: 'primary' | 'outline',
  ) =>
    ({
      textDecoration: 'none',
      position: 'relative',
      borderRadius: '16px',
      boxShadow:
        variant === 'primary' ? '0px 1px 2px 0px rgba(20,21,26,0.05)' : 'none',
      flexShrink: 0,
      width: '100%',
      backgroundColor: isDisabled
        ? '#d1d1fa'
        : variant === 'primary'
        ? '#0000ff'
        : '#ffffff',
      cursor: isDisabled ? 'default' : 'pointer',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'clip',
      height: '100%',
      border: variant === 'outline' ? '1px solid #D0D5DD' : 'none',

      fontWeight: 450,
      lineHeight: '24px',
      color: variant === 'primary' ? '#ffffff' : '#000',
      fontSize: size === 'small' ? '16px' : '20px',
      textAlign: 'center',
      whiteSpace: 'pre',
      letterSpacing: '-0.4px',
      padding: size === 'small' ? '12px 16px' : '18px 16px',
    } as CSSProperties),
};

const loadingCardStyles = {
  title: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  titleText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 400,
    lineHeight: '20px',
    letterSpacing: '-0.16px',
    margin: 0,
  },
  cta: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
    alignItems: 'center',
  },
  ctaTitle: {
    color: '#000',
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 400,
    lineHeight: '130%',
    letterSpacing: '-0.72px',

    maxWidth: 482,
    margin: 0,
  },
  ctaTitleMarked: {
    color: '#00F',
    fontStyle: 'italic',
    fontFamily:
      '"Suisse Works Italic", "Suisse Works Italic Placeholder", sans-serif',
  },
} as const;

const LoadingCard = ({ title }: { title: string }) => {
  return (
    <Card
      styles={{
        gap: 32,
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 0',
      }}
    >
      <div style={loadingCardStyles.title}>
        <Loader />
        <p style={loadingCardStyles.titleText}>{title}</p>
      </div>

      <div style={loadingCardStyles.cta}>
        <p style={loadingCardStyles.ctaTitle}>
          Take your message further — go global with your videos in one click{' '}
          <span style={loadingCardStyles.ctaTitleMarked}>with Rask AI</span>
        </p>
        <Button
          size="small"
          styles={{ width: 'fit-content' }}
          href="https://app.rask.ai/auth"
        >
          Translate 3 videos for free
        </Button>
      </div>

      <Features />
    </Card>
  );
};

const Loader = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="loader-icon"
  >
    <style>
      {`
        .loader-icon {
          animation: rotate 1s linear infinite;
          transform-origin: center;
        }

        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}
    </style>
    <g clip-path="url(#clip0_1934_49750)">
      <path
        opacity="0.4"
        d="M20 10C20 15.5228 15.5228 20 10 20C4.47715 20 0 15.5228 0 10C0 4.47715 4.47715 0 10 0C15.5228 0 20 4.47715 20 10ZM2.48393 10C2.48393 14.151 5.84899 17.5161 10 17.5161C14.151 17.5161 17.5161 14.151 17.5161 10C17.5161 5.84899 14.151 2.48393 10 2.48393C5.84899 2.48393 2.48393 5.84899 2.48393 10Z"
        fill="#D2D2FE"
      />
      <path
        d="M18.7586 10C19.4442 10 20.0079 10.5579 19.9231 11.2382C19.7453 12.6624 19.2624 14.0368 18.5016 15.2652C17.5222 16.8467 16.1209 18.1237 14.4555 18.9526C12.7901 19.7814 10.9265 20.1293 9.07422 19.9571C7.22193 19.7848 5.45441 19.0994 3.97034 17.9777C2.48628 16.856 1.34451 15.3426 0.673404 13.6076C0.00229644 11.8726 -0.171548 9.98477 0.171415 8.15638C0.514378 6.328 1.36055 4.63152 2.61481 3.25768C3.58903 2.19056 4.77946 1.35095 6.10114 0.791363C6.73247 0.524062 7.42301 0.914162 7.61008 1.57373C7.79715 2.2333 7.40769 2.91061 6.78785 3.20357C5.90652 3.62011 5.11092 4.20587 4.44835 4.93161C3.50549 5.96437 2.8694 7.23966 2.61159 8.6141C2.35377 9.98855 2.48445 11.4077 2.98894 12.7119C3.49343 14.0162 4.35173 15.1538 5.46734 15.997C6.58295 16.8402 7.91165 17.3555 9.30406 17.485C10.6965 17.6145 12.0974 17.3529 13.3493 16.7299C14.6013 16.1068 15.6546 15.1469 16.3909 13.958C16.9083 13.1225 17.2548 12.1973 17.415 11.2358C17.5277 10.5595 18.073 10 18.7586 10Z"
        fill="url(#paint0_radial_1934_49750)"
      />
    </g>
    <defs>
      <radialGradient
        id="paint0_radial_1934_49750"
        cx="0"
        cy="0"
        r="1"
        gradientUnits="userSpaceOnUse"
        gradientTransform="translate(6.58537 2.68293) rotate(20.556) scale(20.839)"
      >
        <stop stop-color="#1317FF" />
        <stop offset="1" stop-color="#1317FF" stop-opacity="0" />
      </radialGradient>
      <clipPath id="clip0_1934_49750">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);

export const Card = ({
  children,
  styles: propStyles,
}: {
  children: React.ReactNode;
  styles?: CSSProperties;
}) => {
  return (
    <div style={uploadStyles.container}>
      <div style={uploadStyles.innerContainer}>
        <style>{`
            @media screen and (max-width: 1024px) {
              .__card {
                padding: 32px 16px!important;
              }
            }
          `}</style>
        <div
          style={{ ...uploadStyles.contentBox, ...propStyles }}
          className="__card"
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export const uploadStyles = {
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
    gap: '8px',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    padding: 0,
    position: 'relative',
    width: '100%',
  } as CSSProperties,
  sectionTitle: {
    display: 'flex',
    flexDirection: 'column',

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
    lineHeight: '130%',
    fontSize: '24px',
    letterSpacing: '-0.72px',
    color: '#000',
    margin: 0,
  } as CSSProperties,
  dragDropArea: (dragActive: boolean, invalid: boolean) =>
    ({
      position: 'relative',
      flexShrink: 0,
      width: '100%',
      backgroundColor: '#f5f5ff',
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
    fontWeight: 'normal',
    lineHeight: 0,
    fontStyle: 'normal',
    position: 'relative',
    flexShrink: 0,
    color: '#3d3de9',
    fontSize: '16px',
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
    width: 'fit-content',
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
    fontWeight: 'normal',
    lineHeight: 0,
    fontStyle: 'normal',
    position: 'relative',
    flexShrink: 0,
    color: '#3d3de9',
    fontSize: '16px',
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
  fileError,
  setFileError,
  linkError,
  setLinkError,
  accept,
  fileSizeLimit = 10,
}: {
  onChange: (file: File | null) => void;
  value: File | null;
  link: string;
  setLink: (link: string) => void;
  types?: Array<{ ext: string; label: string; type: string }>;
  fileError: boolean | string;
  setFileError: (error: boolean | string) => void;
  linkError: boolean | string;
  setLinkError: (error: boolean | string) => void;
  accept?: string[];
  fileSizeLimit?: number;
}) => {
  const [dragActive, setDragActive] = useState<boolean>(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const supportedFormats = useMemo(() => {
    return accept?.map(a => a.split('.').pop()?.toUpperCase()).join(', ') ?? '';
  }, [accept]);

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.size > fileSizeLimit * 1024 * 1024)
        return setFileError(`File size exceeds limit of ${fileSizeLimit}MB`);

      onChange(file);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];

      const type = file.name.split('.').pop();

      if (!accept?.includes(`.${type}`)) {
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
  };

  if (value) {
    return (
      <div style={uploadStyles.sectionContainer}>
        <div style={uploadStyles.sectionBox}>
          <div style={uploadStyles.sectionTitle}>
            <style>
              {`
                .__section-title {
                  color: #000;
                  font-size: 24px;
                  font-weight: 400;
                  line-height: 130%;
                  letter-spacing: -0.72px;
                }

                @media screen and (max-width: 1024px) {
                  .__section-title {
                    font-size: 20px;
                    line-height: 24px;
                    letter-spacing: -0.4px;
                  }
                }
              `}
            </style>
            <p className="__section-title">Upload file</p>
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
                    strokeWidth="1.33"
                    strokeLinecap="round"
                    strokeLinejoin="round"
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
                  strokeWidth="1.66667"
                  strokeLinecap="round"
                  strokeLinejoin="round"
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
          <style>
            {`
                .__section-title {
                  color: #000;
                  font-size: 24px;
                  font-weight: 400;
                  line-height: 130%;
                  letter-spacing: -0.72px;
                }

                @media screen and (max-width: 1024px) {
                  .__section-title {
                    font-size: 20px;
                    line-height: 24px;
                    letter-spacing: -0.4px;
                  }
                }
              `}
          </style>
          <p className="__section-title">Upload file</p>
        </div>

        <div style={{ width: '100%' }}>
          <div
            style={uploadStyles.dragDropArea(dragActive, Boolean(fileError))}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div style={uploadStyles.dragDropContent}>
              <div style={uploadStyles.dragDropBox}>
                <div style={uploadStyles.uploadText}>
                  <p style={uploadStyles.uploadTextP}>
                    Upload a file up to {fileSizeLimit}MB
                  </p>
                </div>

                <Button
                  tag="div"
                  size="small"
                  onClick={openFileDialog}
                  styles={{
                    height: 'auto',
                    width: 'fit-content',
                    padding: '12px 32px',
                  }}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    style={{ display: 'none' }}
                    accept={accept?.join(',')}
                  />
                  Upload a file
                </Button>

                <div style={uploadStyles.fileTypeText}>
                  <p style={uploadStyles.fileTypeTextP}>{supportedFormats}</p>
                </div>
              </div>
            </div>
          </div>
          {fileError && (
            <FormatError
              message={fileError}
              supportedFormats={supportedFormats}
            />
          )}
        </div>

        <div style={{ width: '100%' }}>
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
            <div style={uploadStyles.linkInputBorder(Boolean(linkError))} />
          </div>
          {linkError && (
            <FormatError
              message={linkError}
              supportedFormats={supportedFormats}
            />
          )}
        </div>
      </div>
    </div>
  );
};

const FormatError = ({
  message,
  supportedFormats,
}: {
  message: string | boolean;
  supportedFormats: string;
}) => (
  <p
    style={{
      color: '#D92D20',

      fontSize: 14,
      fontStyle: 'normal',
      fontWeight: 400,
      lineHeight: '20px',
    }}
  >
    {typeof message === 'string'
      ? message
      : `File type not supported. Please upload one of the following types: ${supportedFormats}`}
  </p>
);

export const GermanFlag = () => {
  return (
    <div>
      <div>
        <div>
          <svg
            style={{ display: 'block', width: 22, height: 16, borderRadius: 2 }}
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 22 16"
          >
            <g>
              <g clipPath="url(#clip0_1_412)">
                <rect fill="#D80027" height="16" rx="2" width="22" />
                <path
                  clipRule="evenodd"
                  d="M0 11H23V16H0V11Z"
                  fill="#FFDA2C"
                  fillRule="evenodd"
                />
                <path
                  clipRule="evenodd"
                  d="M0 0H23V5H0V0Z"
                  fill="#151515"
                  fillRule="evenodd"
                />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_1_412">
                <rect fill="white" height="16" rx="2" width="22" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export const FrenchFlag = () => {
  return (
    <div className="flag-container">
      <div className="flag-box">
        <div className="flag-size">
          <svg
            style={{ display: 'block', width: 22, height: 16, borderRadius: 2 }}
            fill="none"
            preserveAspectRatio="none"
            viewBox="0 0 22 16"
          >
            <g>
              <g clipPath="url(#clip0_1_397)">
                <rect fill="#F2F4F7" height="16" rx="2" width="22" />
                <path
                  clipRule="evenodd"
                  d="M0 0H7V16H0V0Z"
                  fill="#1A47B8"
                  fillRule="evenodd"
                />
                <path
                  clipRule="evenodd"
                  d="M15 0H22V16H15V0Z"
                  fill="#D80027"
                  fillRule="evenodd"
                />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_1_397">
                <rect fill="white" height="16" rx="2" width="22" />
              </clipPath>
            </defs>
          </svg>
        </div>
      </div>
    </div>
  );
};

export const EnglishFlag = () => {
  return (
    <div className="english-flag-container">
      <div className="english-flag-inner">
        <svg
          style={{ display: 'block', width: 22, height: 16, borderRadius: 2 }}
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 22 16"
        >
          <g>
            <g clipPath="url(#clip0_1_404)">
              <rect fill="#1A47B8" height="16" rx="2" width="22" />
              <path
                clipRule="evenodd"
                d={svgPaths.englishFlag1}
                fill="#F2F4F7"
                fillRule="evenodd"
              />
              <path d={svgPaths.englishFlag2} fill="#D80027" />
              <path
                clipRule="evenodd"
                d={svgPaths.englishFlag3}
                fill="#F2F4F7"
                fillRule="evenodd"
              />
              <path d={svgPaths.englishFlag4} fill="#D80027" />
              <path
                clipRule="evenodd"
                d={svgPaths.englishFlag5}
                fill="#F2F4F7"
                fillRule="evenodd"
              />
              <path
                clipRule="evenodd"
                d={svgPaths.englishFlag6}
                fill="#D80027"
                fillRule="evenodd"
              />
            </g>
          </g>
          <defs>
            <clipPath id="clip0_1_404">
              <rect fill="white" height="16" rx="2" width="22" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export const SpanishFlag = () => {
  return (
    <div className="english-flag-container">
      <div className="english-flag-inner">
        <svg
          style={{ display: 'block', width: 22, height: 16, borderRadius: 2 }}
          fill="none"
          preserveAspectRatio="none"
          viewBox="0 0 22 16"
        >
          <g>
            <path d={svgPaths.spanishFlag1} fill="#D80027" />
            <path
              clipRule="evenodd"
              d={svgPaths.spanishFlag2}
              fill="#FFDA2C"
              fillRule="evenodd"
            />
            <path
              clipRule="evenodd"
              d={svgPaths.spanishFlag3}
              fill="#D4AF2C"
              fillRule="evenodd"
            />
            <path
              clipRule="evenodd"
              d={svgPaths.spanishFlag4}
              fill="#CBCBCB"
              fillRule="evenodd"
            />
            <path
              clipRule="evenodd"
              d={svgPaths.spanishFlag5}
              fill="#1A47B8"
              fillRule="evenodd"
            />
            <path
              clipRule="evenodd"
              d={svgPaths.spanishFlag6}
              fill="#D4AF2C"
              fillRule="evenodd"
            />
            <path
              clipRule="evenodd"
              d={svgPaths.spanishFlag7}
              fill="#AF010D"
              fillRule="evenodd"
            />
            <path
              clipRule="evenodd"
              d={svgPaths.spanishFlag8}
              fill="#AE6A3E"
              fillRule="evenodd"
            />
            <path
              clipRule="evenodd"
              d={svgPaths.spanishFlag9}
              fill="#FFDA2C"
              fillRule="evenodd"
            />
            <path
              clipRule="evenodd"
              d={svgPaths.spanishFlag10}
              fill="#AF010D"
              fillRule="evenodd"
            />
            <path
              clipRule="evenodd"
              d={svgPaths.spanishFlag11}
              fill="#D4AF2C"
              fillRule="evenodd"
            />
          </g>
        </svg>
      </div>
    </div>
  );
};

const svgPaths = {
  downArrow:
    'M7.5286 10.4714C7.78895 10.7318 8.21106 10.7318 8.47141 10.4714L12.4714 6.4714C12.7318 6.21105 12.7318 5.78894 12.4714 5.52859C12.2111 5.26824 11.7889 5.26824 11.5286 5.52859L8 9.05719L4.47141 5.52859C4.21106 5.26824 3.78895 5.26824 3.5286 5.52859C3.26825 5.78894 3.26825 6.21105 3.5286 6.4714L7.5286 10.4714Z',
  englishFlag1: 'M2.34035 0H0V2.66667L19.6469 16L22 16V13.3333L2.34035 0Z',
  englishFlag2: 'M0.780579 0L22 14.4378V16H21.2377L0 1.54726V0H0.780579Z',
  englishFlag3:
    'M19.9048 0H22V2.66667C22 2.66667 8.39122 11.5499 2.09524 16H0V13.3333L19.9048 0Z',
  englishFlag4: 'M22 0H21.2895L0 14.4502V16H0.780579L22 1.55895V0Z',
  englishFlag5:
    'M8.00075 0H14.0176V4.93527H22V11.0615H14.0176V16H8.00075V11.0615H0V4.93527H8.00075V0Z',
  englishFlag6:
    'M9.26316 0H12.7368V6.15385H22V9.84616H12.7368V16H9.26316V9.84616H0V6.15385H9.26316V0Z',
  spanishFlag1:
    'M19.9048 0H2.09524C0.93807 0 0 0.955126 0 2.13333V13.8667C0 15.0449 0.93807 16 2.09524 16H19.9048C21.0619 16 22 15.0449 22 13.8667V2.13333C22 0.955126 21.0619 0 19.9048 0Z',
  spanishFlag2: 'M0 4.26667H22V11.7333H0V4.26667Z',
  spanishFlag3:
    'M9.42857 6.6368V9.3248C9.42857 10.0715 8.72457 10.6688 7.85714 10.6688H5.7619C4.89657 10.6667 4.19048 10.0661 4.19048 9.32267V6.63467C4.19048 6.02453 4.65981 5.51467 5.30514 5.34933C5.5 4.79467 6.09924 5.29173 6.80952 5.29173C7.524 5.29173 8.11905 4.79787 8.3139 5.3504C8.95714 5.52 9.42857 6.03093 9.42857 6.6368Z',
  spanishFlag4:
    'M9.42857 7.46667H10.4762V10.6667H9.42857V7.46667ZM3.14286 7.46667H4.19048V10.6667H3.14286V7.46667Z',
  spanishFlag5:
    'M9.42857 9.6H10.4762V10.6667H9.42857V9.6ZM3.14286 9.6H4.19048V10.6667H3.14286V9.6Z',
  spanishFlag6:
    'M9.42857 6.4H10.4762V7.46667H9.42857V6.4ZM3.14286 6.4H4.19048V7.46667H3.14286V6.4Z',
  spanishFlag7:
    'M5.2381 6.4H6.28571V8H5.2381V6.4ZM7.33333 8.53333H8.38095V10.1333H7.33333V8.53333Z',
  spanishFlag8: 'M7.33333 6.4H8.38095V8H7.33333V6.4Z',
  spanishFlag9: 'M5.2381 8.53333H6.28571V10.1333H5.2381V8.53333Z',
  spanishFlag10: 'M6.28571 6.4L5.2381 5.33333H8.38095L7.33333 6.4H6.28571Z',
  spanishFlag11: 'M6.28571 4.26667H7.33333V5.33333H6.28571V4.26667Z',
};

const LANGS = [
  {
    code: 'SA',
    value: 'AR',
    label: 'Arabic',
  },
  {
    code: 'BG',
    label: 'Bulgarian',
  },
  {
    code: 'CZ',
    label: 'Czech',
    value: 'CS',
  },
  {
    code: 'DE',
    value: 'DA',
    label: 'Danish',
  },
  {
    code: 'GR',
    value: 'EL',
    label: 'Greek',
  },
  {
    code: 'ET',
    label: 'Estonian',
  },
  {
    code: 'FI',
    label: 'Finnish',
  },
  {
    code: 'IL',
    value: 'HE',
    label: 'Hebrew',
  },
  {
    code: 'HU',
    label: 'Hungarian',
  },
  {
    code: 'ID',
    label: 'Indonesian',
  },
  {
    code: 'IT',
    label: 'Italian',
  },
  {
    code: 'JP',
    label: 'Japanese',
  },
  {
    code: 'KR',
    label: 'Korean',
  },
  {
    code: 'LT',
    label: 'Lithuanian',
  },
  {
    code: 'LV',
    label: 'Latvian',
  },
  {
    code: 'NO',
    label: 'Norwegian',
    value: 'NB',
  },
  {
    code: 'NL',
    label: 'Dutch',
  },
  {
    code: 'PL',
    label: 'Polish',
  },
  {
    code: 'BR',
    label: 'Portuguese (Brazilian)',
    value: 'PT-BR',
  },
  {
    code: 'PT',
    value: 'PT-PT',
    label: 'Portuguese',
  },
  {
    code: 'RO',
    label: 'Romanian',
  },
  {
    code: 'RU',
    label: 'Russian',
  },
  {
    code: 'SK',
    label: 'Slovak',
  },
  {
    code: 'SI',
    value: 'SL',
    label: 'Slovenian',
  },
  {
    code: 'SV',
    label: 'Swedish',
  },
  {
    code: 'TH',
    label: 'Thai',
  },
  {
    code: 'TR',
    label: 'Turkish',
  },
  {
    code: 'UA',
    value: 'UK',
    label: 'Ukrainian',
  },
  {
    code: 'VI',
    label: 'Vietnamese',
  },
  {
    code: 'CN',
    value: 'ZH-HANS',
    label: 'Chinese (simplified)',
  },
  {
    code: 'CN',
    value: 'ZH-HANT',
    label: 'Chinese (traditional)',
  },
];

export const OTHERS = LANGS.map(lang => ({
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
        style={{ borderRadius: 2, height: '100%' }}
      />
      <p style={{ margin: 0 }}>{lang.label}</p>
    </div>
  ),
  value: lang.value ?? lang.code,
}));

export const LanguageOption = ({
  language,
  flag,
  isSelected,
  onClick,
}: LanguageOptionProps) => {
  const styles = {
    languageOption: {
      flexBasis: 0,
      flexGrow: 1,
      height: '44px',
      minHeight: '1px',
      // minWidth: '1px',
      position: 'relative',
      borderRadius: '59px',
      flexShrink: 0,
      cursor: 'pointer',
      ...(isSelected
        ? {
            border: '1px solid #8F8FF3',
            background: '#F5F5FF',
          }
        : { background: 'white', border: '1px solid #D0D5DD' }),
    } as React.CSSProperties,
    languageOptionContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      width: '100%',
      height: '100%',
    } as React.CSSProperties,
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
    } as React.CSSProperties,
    languageText: {
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
    } as React.CSSProperties,
    languageTextP: {
      display: 'block',
      lineHeight: '22px',
      whiteSpace: 'pre',
      fontFamily:
        '"Suisse Intl Light", "Suisse Intl Light Placeholder", sans-serif',
    } as React.CSSProperties,
  };

  return (
    <div style={styles.languageOption} onClick={onClick}>
      <div style={styles.languageOptionContainer}>
        <div style={styles.languageOptionBox}>
          {flag}
          <div style={styles.languageText}>
            <p style={styles.languageTextP}>{language}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

interface Option {
  value: string | null;
  label: React.ReactNode;
}

interface SelectProps {
  options: Option[];
  value: string | null;
  onChange: (value: string | null) => void;
  placeholder?: string;
  style?: React.CSSProperties;
  className?: string;
}

export const Select = ({
  options,
  value,
  onChange,
  placeholder = 'Select option',
  style,
  className,
}: SelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredOptionValue, setHoveredOptionValue] = useState<string | null>(
    null,
  );
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    centerX: 0,
  });
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = useMemo(
    () => options.find(option => option.value === value),
    [options, value],
  );

  const calculateDropdownPosition = () => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + 4,
        left: rect.left,
        centerX: rect.left + rect.width / 2,
      });
    }
  };

  const handleToggle = () => {
    if (!isOpen) {
      calculateDropdownPosition();
    }
    setIsOpen(!isOpen);
  };

  const handleOptionSelect = (optionValue: string | null) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        !containerRef.current?.contains(event.target as Node) &&
        !dropdownRef.current?.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleScroll = () => {
      if (isOpen) {
        calculateDropdownPosition();
      }
    };

    const handleResize = () => {
      if (isOpen) {
        calculateDropdownPosition();
      }
    };

    if (typeof window !== 'undefined') {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('scroll', handleScroll, true);
      window.addEventListener('resize', handleResize);
    }

    return () => {
      if (typeof window !== 'undefined') {
        document.removeEventListener('mousedown', handleClickOutside);
        window.removeEventListener('scroll', handleScroll, true);
        window.removeEventListener('resize', handleResize);
      }
    };
  }, [isOpen]);

  const renderDropdown = () => {
    const portalElement =
      typeof window !== 'undefined' ? document.getElementById('portal') : null;
    if (!portalElement || !isOpen) return null;

    return createPortal(
      <div
        ref={dropdownRef}
        style={{
          position: 'fixed',
          top: dropdownPosition.top,
          left: dropdownPosition.centerX,
          transform: 'translateX(-50%)',
          backgroundColor: 'white',
          border: '1px solid var(--Gray-200---stroke, #EAECF0)',
          borderRadius: '16px',
          boxShadow: '0px 4px 6px -2px #10182808, 0px 12px 16px -4px #10182814',
          zIndex: 10000,
          minWidth: 'max-content',
          width: 220,
          maxHeight: 192,
          overflowY: 'auto',
        }}
      >
        {options.map((option, idx, list) => (
          <div
            key={option.value}
            onClick={() => handleOptionSelect(option.value)}
            onMouseEnter={() => setHoveredOptionValue(option.value)}
            onMouseLeave={() => setHoveredOptionValue(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '12px 14px',
              borderRadius:
                idx === list.length - 1
                  ? '0 0 16px 16px'
                  : idx === 0
                  ? '16px 16px 0 0'
                  : '0',
              transition: 'background-color 0.2s',
              backgroundColor:
                hoveredOptionValue === option.value ? '#F5F5FF' : 'transparent',
              cursor: 'pointer',
              whiteSpace: 'nowrap',
            }}
          >
            <span
              style={{
                fontSize: 16,
                fontWeight: 400,
                color: '#101828',
              }}
            >
              {option.label}
            </span>
            {value === option.value && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M4.62861 5.47136C4.88896 5.73171 5.31107 5.73171 5.57142 5.47136L9.57142 1.47136C9.83177 1.21101 9.83177 0.788902 9.57142 0.528552C9.31107 0.268202 8.88896 0.268202 8.62861 0.528552L5.10002 4.05715L1.57142 0.528552C1.31107 0.268202 0.888962 0.268202 0.628612 0.528552C0.368262 0.788902 0.368262 1.21101 0.628612 1.47136L4.62861 5.47136Z"
                  fill="black"
                />
              </svg>
            )}
          </div>
        ))}
      </div>,
      portalElement,
    );
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        width: '100%',
        ...style,
        minWidth: '106px',
      }}
      className={className}
    >
      <button
        onClick={handleToggle}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          padding: '11px',
          borderRadius: '30px',
          gap: 6,
          cursor: 'pointer',
          fontSize: '16px',
          color: '#101828',
          outline: 'none',
          position: 'relative',
          height: '100%',
          ...(selectedOption?.value
            ? {
                border: '1px solid #8F8FF3',
                background: '#F5F5FF',
              }
            : { background: 'white', border: '1px solid #D0D5DD' }),
        }}
      >
        <span>
          {selectedOption?.value ? selectedOption.label : placeholder}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="17"
          height="16"
          viewBox="0 0 17 16"
          fill="none"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'transform 0.2s',
          }}
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M7.62861 10.4714C7.88896 10.7317 8.31107 10.7317 8.57142 10.4714L12.5714 6.47136C12.8318 6.21101 12.8318 5.7889 12.5714 5.52855C12.3111 5.2682 11.889 5.2682 11.6286 5.52855L8.10002 9.05715L4.57142 5.52855C4.31107 5.2682 3.88896 5.2682 3.62861 5.52855C3.36826 5.7889 3.36826 6.21101 3.62861 6.47136L7.62861 10.4714Z"
            fill="black"
          />
        </svg>
      </button>

      {renderDropdown()}
    </div>
  );
};

export const createApi = (BASE_URL: string) => {
  return async (url: string, body: unknown) => {
    const response = await fetch(`${BASE_URL}${url}`, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status !== 200) {
      return {
        status: 'error',
        message: 'Failed to translate',
      };
    }

    return response.json();
  };
};

type Language = 'German' | 'French' | 'English' | 'Spanish' | 'Other';

interface LanguageOptionProps {
  language: Language;
  flag: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}

const featuresStyles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    overflow: 'hidden',
    width: '100%',
    position: 'relative',
  },
  scrollingWrapper: {
    overflow: 'hidden',
    width: '100%',
  },
  scrollingContent: {
    display: 'flex',
    gap: 10,
    animation: 'scroll 20s linear infinite',
    width: 'fit-content',
  },
  featureContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    width: 440,
    height: 240,
    padding: '20px 0',
    borderRadius: 20,
    background: '#F9FAFB',
    flexShrink: 0,
    justifyContent: 'center',
  },
  featureContent: {
    display: 'flex',
    gap: 5,
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
  },
  featureContentText: {
    fontStyle: 'normal',

    fontWeight: 450,
    lineHeight: '95%',
  },
  featureB: {
    borderRadius: '8.357px',
    border: '0.522px solid  #EAECF0',
    background: '#FFF',
    flexDirection: 'column',
    display: 'flex',
  },
  featureBContent: {
    padding: '16px 8px',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
    gap: '8px',
  },
  featureBContentTitle: {
    fontSize: '10.024px',
    fontStyle: 'normal',
    fontWeight: 500,
    lineHeight: '95%',
    letterSpacing: '-0.301px',
    color: '#000',
    margin: 0,
  },
  featureBContentText: {
    fontSize: '8.353px',
    fontStyle: 'normal',
    fontWeight: 400,
    lineHeight: '95%',
    letterSpacing: '-0.418px',
    color: '#000',
    margin: 0,
  },
} satisfies Record<string, CSSProperties>;
const featuresData = [
  {
    content: (
      <ul
        style={{
          listStyle: 'none',
          display: 'flex',
          gap: 10,
          flexDirection: 'column',
          paddingLeft: 0,
          alignItems: 'center',
          margin: 0,
        }}
      >
        <li style={{ ...featuresStyles.featureContent }}>
          <svg
            width="19"
            height="20"
            viewBox="0 0 19 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.5146 1.62695C16.5969 1.62695 18.285 3.3152 18.2852 5.39746V15.1377C18.2852 17.2201 16.597 18.9082 14.5146 18.9082H4.77441C2.69204 18.9082 1.00391 17.2201 1.00391 15.1377V5.39746C1.00404 3.3152 2.69212 1.62695 4.77441 1.62695H14.5146ZM4.77441 3.04102C3.47301 3.04102 2.4181 4.09609 2.41797 5.39746V15.1377C2.41797 16.4392 3.47293 17.4951 4.77441 17.4951H14.5146C15.8161 17.4951 16.8711 16.4392 16.8711 15.1377V5.39746C16.871 4.09609 15.8161 3.04102 14.5146 3.04102H4.77441ZM6.80957 6.96875C7.60561 6.96875 8.28694 7.21268 8.7334 7.6543C9.04166 7.95796 9.23033 8.33548 9.23047 8.61621C9.23047 8.92906 9.0194 9.13167 8.71582 9.13184C8.49489 9.13184 8.33756 9.04472 8.13965 8.80078C7.78987 8.27616 7.40817 8.03613 6.87891 8.03613C5.95384 8.03618 5.43359 8.69955 5.43359 9.85938V10.5723C5.43359 11.7781 5.94464 12.4365 6.87891 12.4365C7.41281 12.4365 7.8317 12.1971 8.16309 11.6816C8.36095 11.4378 8.49925 11.3555 8.71094 11.3555C9.02847 11.3555 9.23535 11.5579 9.23535 11.8662C9.23524 12.1976 9.00093 12.6028 8.63281 12.9111C8.19096 13.2931 7.56897 13.5049 6.80957 13.5049C5.12992 13.5047 4.18659 12.455 4.18652 10.6143V9.80859C4.18652 8.02752 5.14826 6.96892 6.80957 6.96875ZM12.7012 6.96875C13.4973 6.96875 14.1785 7.2126 14.625 7.6543C14.9333 7.95796 15.1219 8.33548 15.1221 8.61621C15.1221 8.92919 14.9102 9.13184 14.6064 9.13184C14.3857 9.13174 14.229 9.04458 14.0312 8.80078C13.6815 8.27613 13.2997 8.03617 12.7705 8.03613C11.8454 8.03613 11.3252 8.69951 11.3252 9.85938V10.5723C11.3252 11.7782 11.8362 12.4365 12.7705 12.4365C13.3043 12.4365 13.7233 12.1971 14.0547 11.6816C14.2525 11.4379 14.3909 11.3555 14.6025 11.3555C14.9199 11.3556 15.127 11.5579 15.127 11.8662C15.1268 12.1975 14.8925 12.6028 14.5244 12.9111C14.0826 13.2932 13.4606 13.5049 12.7012 13.5049C11.0214 13.5048 10.0782 12.4551 10.0781 10.6143V9.80859C10.0781 8.02743 11.0397 6.96882 12.7012 6.96875Z"
              fill="url(#paint0_linear_1934_49324)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1934_49324"
                x1="9.62097"
                y1="1.80965"
                x2="10.581"
                y2="27.5641"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#666666" />
                <stop offset="1" />
              </linearGradient>
            </defs>
          </svg>

          <span
            style={{
              ...featuresStyles.featureContentText,
              background:
                'linear-gradient(178deg, #000 -154.69%, #666 98.18%) text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '13.575px',
              letterSpacing: '-0.679px',
            }}
          >
            AI Subtitles
          </span>
        </li>
        <li style={{ ...featuresStyles.featureContent }}>
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M15.1884 2.29102C15.6735 2.29102 16.0667 2.68425 16.0667 3.16933V18.9474C16.0667 19.4324 15.6735 19.8257 15.1884 19.8257C14.7033 19.8257 14.3101 19.4324 14.3101 18.9474V3.16933C14.3101 2.68425 14.7033 2.29102 15.1884 2.29102ZM11.2439 4.92069C11.729 4.92069 12.1222 5.31392 12.1222 5.799V16.3177C12.1222 16.8028 11.729 17.196 11.2439 17.196C10.7588 17.196 10.3656 16.8028 10.3656 16.3177V5.799C10.3656 5.31392 10.7588 4.92069 11.2439 4.92069ZM3.35487 8.42692C3.83995 8.42692 4.23318 8.82015 4.23318 9.30523V12.8115C4.23318 13.2966 3.83995 13.6898 3.35487 13.6898C2.8698 13.6898 2.47656 13.2966 2.47656 12.8115V9.30523C2.47656 8.82015 2.8698 8.42692 3.35487 8.42692ZM19.1329 8.42692C19.618 8.42692 20.0112 8.82015 20.0112 9.30523V12.8115C20.0112 13.2966 19.618 13.6898 19.1329 13.6898C18.6478 13.6898 18.2546 13.2966 18.2546 12.8115V9.30523C18.2546 8.82015 18.6478 8.42692 19.1329 8.42692ZM7.29938 9.30348C7.78446 9.30348 8.17769 9.69671 8.17769 10.1818V11.9349C8.17769 12.4199 7.78446 12.8132 7.29938 12.8132C6.81431 12.8132 6.42107 12.4199 6.42107 11.9349V10.1818C6.42107 9.69671 6.81431 9.30348 7.29938 9.30348Z"
              fill="black"
            />
          </svg>

          <span
            style={{
              ...featuresStyles.featureContentText,
              color: '#000',
              fontSize: '14.308px',
            }}
          >
            AI Voice Dubbing
          </span>
        </li>
        <li
          style={{
            ...featuresStyles.featureContent,
            borderRadius: 14,
            padding: '10px 14px',
            background: '#FFF',
            boxShadow:
              '0px 1.73px 3.459px -0.865px rgba(16, 24, 40, 0.10), 0px -0.432px 1.73px -0.865px rgba(16, 24, 40, 0.06)',
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="28"
            height="28"
            viewBox="0 0 28 28"
            fill="none"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.44182 3.15604C7.44182 2.54401 7.94309 2.04785 8.56144 2.04785H9.68105C10.2994 2.04785 10.8007 2.54401 10.8007 3.15604C10.8007 3.76808 10.2994 4.26423 9.68105 4.26423H8.56144C7.94309 4.26423 7.44182 3.76808 7.44182 3.15604ZM14.1442 5.37242H2.96336C2.34502 5.37242 1.84375 5.86858 1.84375 6.48061C1.84375 7.09265 2.34502 7.5888 2.96336 7.5888H12.0675L11.0502 9.09917L9.12125 11.0084L7.1139 9.02157C6.67666 8.5888 5.96776 8.5888 5.53052 9.02157C5.09329 9.45435 5.09329 10.156 5.53052 10.5888L7.53787 12.5757L4.41091 15.6707C3.97367 16.1035 3.97367 16.8052 4.41091 17.2379C4.84814 17.6707 5.55704 17.6707 5.99428 17.2379L9.12125 14.1429L11.1286 16.1297C11.5658 16.5625 12.2747 16.5625 12.712 16.1297C13.1492 15.697 13.1492 14.9953 12.712 14.5625L10.7046 12.5757L12.712 10.5888C12.7641 10.5372 12.811 10.4806 12.8519 10.4199L14.7587 7.5888H16.3987C17.0171 7.5888 17.5184 7.09265 17.5184 6.48061C17.5184 5.86858 17.0171 5.37242 16.3987 5.37242H14.1769C14.166 5.37227 14.1551 5.37227 14.1442 5.37242ZM18.4675 11.2548C18.9289 11.0343 19.4667 11.0343 19.9281 11.2548C20.3294 11.4467 20.547 11.7809 20.6551 11.9608C20.7684 12.1492 20.8846 12.3898 20.9987 12.626L26.3657 23.7335C26.6325 24.2857 26.3966 24.9473 25.8387 25.2114C25.2809 25.4755 24.6124 25.2419 24.3456 24.6898L22.5082 20.8871H15.8874L14.0499 24.6898C13.7832 25.2419 13.1147 25.4755 12.5568 25.2114C11.999 24.9473 11.7631 24.2857 12.0299 23.7335L17.3797 12.6616C17.3854 12.6498 17.3911 12.6379 17.3969 12.6261C17.511 12.3898 17.6272 12.1492 17.7404 11.9608C17.8485 11.7809 18.0661 11.4467 18.4675 11.2548ZM16.9583 18.6707H21.4372L19.1978 14.036L16.9583 18.6707Z"
              fill="black"
            />
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M7.44182 3.15604C7.44182 2.54401 7.94309 2.04785 8.56144 2.04785H9.68105C10.2994 2.04785 10.8007 2.54401 10.8007 3.15604C10.8007 3.76808 10.2994 4.26423 9.68105 4.26423H8.56144C7.94309 4.26423 7.44182 3.76808 7.44182 3.15604ZM14.1442 5.37242H2.96336C2.34502 5.37242 1.84375 5.86858 1.84375 6.48061C1.84375 7.09265 2.34502 7.5888 2.96336 7.5888H12.0675L11.0502 9.09917L9.12125 11.0084L7.1139 9.02157C6.67666 8.5888 5.96776 8.5888 5.53052 9.02157C5.09329 9.45435 5.09329 10.156 5.53052 10.5888L7.53787 12.5757L4.41091 15.6707C3.97367 16.1035 3.97367 16.8052 4.41091 17.2379C4.84814 17.6707 5.55704 17.6707 5.99428 17.2379L9.12125 14.1429L11.1286 16.1297C11.5658 16.5625 12.2747 16.5625 12.712 16.1297C13.1492 15.697 13.1492 14.9953 12.712 14.5625L10.7046 12.5757L12.712 10.5888C12.7641 10.5372 12.811 10.4806 12.8519 10.4199L14.7587 7.5888H16.3987C17.0171 7.5888 17.5184 7.09265 17.5184 6.48061C17.5184 5.86858 17.0171 5.37242 16.3987 5.37242H14.1769C14.166 5.37227 14.1551 5.37227 14.1442 5.37242ZM18.4675 11.2548C18.9289 11.0343 19.4667 11.0343 19.9281 11.2548C20.3294 11.4467 20.547 11.7809 20.6551 11.9608C20.7684 12.1492 20.8846 12.3898 20.9987 12.626L26.3657 23.7335C26.6325 24.2857 26.3966 24.9473 25.8387 25.2114C25.2809 25.4755 24.6124 25.2419 24.3456 24.6898L22.5082 20.8871H15.8874L14.0499 24.6898C13.7832 25.2419 13.1147 25.4755 12.5568 25.2114C11.999 24.9473 11.7631 24.2857 12.0299 23.7335L17.3797 12.6616C17.3854 12.6498 17.3911 12.6379 17.3969 12.6261C17.511 12.3898 17.6272 12.1492 17.7404 11.9608C17.8485 11.7809 18.0661 11.4467 18.4675 11.2548ZM16.9583 18.6707H21.4372L19.1978 14.036L16.9583 18.6707Z"
              fill="url(#paint0_linear_1934_49331)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1934_49331"
                x1="1.84375"
                y1="13.684"
                x2="26.4755"
                y2="13.684"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="#0000FF" />
                <stop offset="1" stop-color="#2BB1FF" />
              </linearGradient>
            </defs>
          </svg>
          <span
            style={{
              ...featuresStyles.featureContentText,
              background:
                'linear-gradient(34deg, rgb(0, 0, 255), rgb(43, 177, 255)) text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '20.259px',
              letterSpacing: '-1.013px',
            }}
          >
            AI Translation
          </span>
        </li>
        <li style={{ ...featuresStyles.featureContent }}>
          <svg
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M18.344 4.53302C18.2211 4.54247 18.0519 4.56915 17.7514 4.61792L9.9285 5.88742C9.70419 5.92382 9.58456 5.94382 9.49938 5.96417C9.49634 5.9649 9.49346 5.9656 9.49072 5.96628C9.49048 5.96902 9.49025 5.9719 9.49001 5.97494C9.4834 6.0601 9.48281 6.17828 9.48281 6.3997V16.4789C9.48281 18.3911 7.8908 19.9412 5.92695 19.9412C3.9631 19.9412 2.37109 18.3911 2.37109 16.4789C2.37109 14.5668 3.96311 13.0166 5.92695 13.0166C6.57463 13.0166 7.18186 13.1852 7.70488 13.4798V6.3997C7.70488 6.39149 7.70488 6.38329 7.70488 6.3751C7.70485 6.18804 7.70483 6.00295 7.71714 5.84439C7.73084 5.66804 7.76302 5.46304 7.86063 5.25118C7.99793 4.95319 8.219 4.69909 8.49831 4.51824C8.69688 4.38966 8.89927 4.32506 9.07567 4.28291C9.23427 4.24501 9.42178 4.21461 9.61128 4.18388L17.4901 2.9053C17.7482 2.86339 17.9949 2.82332 18.2041 2.80725C18.4299 2.78989 18.7055 2.79089 18.9915 2.89432C19.3812 3.03525 19.7078 3.30468 19.9147 3.65579C20.0665 3.91346 20.1128 4.17798 20.1323 4.39774C20.1504 4.6013 20.1504 4.84486 20.1504 5.09962L20.1504 14.7478C20.1504 16.6599 18.5584 18.2101 16.5945 18.2101C14.6307 18.2101 13.0387 16.6599 13.0387 14.7478C13.0387 12.8356 14.6307 11.2855 16.5945 11.2855C17.2422 11.2855 17.8494 11.4541 18.3724 11.7487V5.13019C18.3724 4.83356 18.3717 4.66666 18.361 4.54711C18.3606 4.54173 18.3601 4.53667 18.3596 4.53192C18.3547 4.53223 18.3495 4.5326 18.344 4.53302ZM18.3724 14.7478C18.3724 13.7917 17.5764 13.0166 16.5945 13.0166C15.6126 13.0166 14.8166 13.7917 14.8166 14.7478C14.8166 15.7039 15.6126 16.4789 16.5945 16.4789C17.5764 16.4789 18.3724 15.7039 18.3724 14.7478ZM7.70488 16.4789C7.70488 15.5228 6.90887 14.7478 5.92695 14.7478C4.94503 14.7478 4.14902 15.5228 4.14902 16.4789C4.14902 17.435 4.94503 18.2101 5.92695 18.2101C6.90887 18.2101 7.70488 17.435 7.70488 16.4789Z"
              fill="black"
            />
          </svg>

          <span
            style={{
              ...featuresStyles.featureContentText,
              color: '#000',
              fontSize: '14.308px',
              letterSpacing: '-0.715px',
            }}
          >
            AI Audio Mastering
          </span>
        </li>
        <li style={{ ...featuresStyles.featureContent }}>
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M10.2712 3.19484C6.36756 3.19484 3.20308 6.44485 3.20308 10.4539C3.20308 14.463 6.36757 17.7131 10.2712 17.7131C14.1748 17.7131 17.3392 14.463 17.3392 10.4539C17.3392 6.44485 14.1748 3.19484 10.2712 3.19484ZM1.62891 10.4539C1.62891 5.55196 5.49817 1.57812 10.2712 1.57812C15.0442 1.57812 18.9134 5.55197 18.9134 10.4539C18.9134 15.3559 15.0442 19.3298 10.2712 19.3298C5.49817 19.3298 1.62891 15.3559 1.62891 10.4539ZM14.3625 7.46212C14.6699 7.7778 14.6699 8.28963 14.3625 8.60531L9.64944 13.4458C9.34206 13.7614 8.8437 13.7614 8.53633 13.4458L6.17978 11.0255C5.87241 10.7098 5.8724 10.198 6.17978 9.88232C6.48716 9.56664 6.98551 9.56664 7.29289 9.88232L9.09289 11.731L13.2494 7.46211C13.5568 7.14643 14.0552 7.14643 14.3625 7.46212Z"
              fill="url(#paint0_linear_1934_49340)"
            />
            <defs>
              <linearGradient
                id="paint0_linear_1934_49340"
                x1="10.2468"
                y1="-27.254"
                x2="12.0531"
                y2="19.2606"
                gradientUnits="userSpaceOnUse"
              >
                <stop />
                <stop offset="1" stop-color="#666666" />
              </linearGradient>
            </defs>
          </svg>
          <span
            style={{
              ...featuresStyles.featureContentText,
              background:
                'linear-gradient(178deg, #000 -154.69%, #666 98.18%) text',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: '13.575px',
              letterSpacing: '-0.679px',
            }}
          >
            Auto Management
          </span>
        </li>
      </ul>
    ),
  },
  {
    content: (
      <>
        <div style={featuresStyles.featureB}>
          <img
            style={{
              width: '100%',
              borderTopLeftRadius: 'inherit',
              borderTopRightRadius: 'inherit',
            }}
            width="111"
            height="111"
            src="https://framerusercontent.com/images/MKjZIy9P1JSNk16bcfZfpQcNew.png"
          />

          <div style={featuresStyles.featureBContent}>
            <div
              style={{
                display: 'flex',
                gap: 8,
                flexDirection: 'column',
              }}
            >
              <p style={featuresStyles.featureBContentTitle}>Without AI</p>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <p style={featuresStyles.featureBContentText}>
                  ❌ Expensive Localization
                </p>
                <p style={featuresStyles.featureBContentText}>
                  ❌ Manual Coordination
                </p>
                <p style={featuresStyles.featureBContentText}>
                  ❌ Slow turnaround
                </p>
              </div>
            </div>
          </div>
        </div>
        <div style={featuresStyles.featureB}>
          <img
            style={{
              width: '100%',
              borderTopLeftRadius: 'inherit',
              borderTopRightRadius: 'inherit',
            }}
            width="111"
            height="111"
            src="https://framerusercontent.com/images/HOlNNP8xOsBujgPXmD4vLoBWKk.png"
          />
          <div style={featuresStyles.featureBContent}>
            <div
              style={{
                display: 'flex',
                gap: 8,
                flexDirection: 'column',
              }}
            >
              <p style={featuresStyles.featureBContentTitle}>Without AI</p>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <p style={featuresStyles.featureBContentText}>
                  ✅ Low-Cost AI Translation
                </p>
                <p style={featuresStyles.featureBContentText}>
                  ✅ Fully Automated
                </p>
                <p style={featuresStyles.featureBContentText}>
                  ✅ Results in minutes
                </p>
              </div>
            </div>
          </div>
        </div>
      </>
    ),
  },
  {
    content: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 8,
          alignItems: 'center',
          justifyContent: 'center',
          width: 170,
        }}
      >
        <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
          <svg
            width="12"
            height="13"
            viewBox="0 0 12 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              x="0.00585938"
              width="11.9687"
              height="12.5128"
              fill="url(#pattern0_1934_49514)"
            />
            <defs>
              <pattern
                id="pattern0_1934_49514"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use transform="matrix(0.000846522 0 0 0.000809717 -0.00791311 0)" />
              </pattern>
              <image
                id="image0_1934_49514"
                width="1200"
                height="1235"
                preserveAspectRatio="none"
              />
            </defs>
          </svg>
          <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_1934_49509)">
              <path
                d="M6.32577 1.23904C6.42792 0.993442 6.77583 0.993442 6.87798 1.23904L8.11367 4.20998C8.15673 4.31352 8.2541 4.38426 8.36588 4.39322L11.5733 4.65036C11.8384 4.67161 11.9459 5.0025 11.7439 5.17555L9.30022 7.26882C9.21505 7.34177 9.17786 7.45624 9.20388 7.56532L9.95047 10.6952C10.0122 10.9539 9.73071 11.1584 9.50371 11.0198L6.75775 9.34254C6.66205 9.28408 6.5417 9.28408 6.446 9.34254L3.70003 11.0198C3.47303 11.1584 3.19156 10.9539 3.25328 10.6952L3.99987 7.56532C4.02589 7.45624 3.98869 7.34177 3.90353 7.26882L1.45985 5.17555C1.25783 5.0025 1.36535 4.67161 1.63049 4.65036L4.83787 4.39322C4.94965 4.38426 5.04702 4.31352 5.09008 4.20998L6.32577 1.23904Z"
                fill="#F2F4F7"
              />
              <g clip-path="url(#clip1_1934_49509)">
                <path
                  d="M6.32577 1.23904C6.42792 0.993442 6.77583 0.993442 6.87798 1.23904L8.11367 4.20998C8.15673 4.31352 8.2541 4.38426 8.36588 4.39322L11.5733 4.65036C11.8384 4.67161 11.9459 5.0025 11.7439 5.17555L9.30022 7.26882C9.21505 7.34177 9.17786 7.45624 9.20388 7.56532L9.95047 10.6952C10.0122 10.9539 9.73071 11.1584 9.50371 11.0198L6.75775 9.34254C6.66205 9.28408 6.5417 9.28408 6.446 9.34254L3.70003 11.0198C3.47303 11.1584 3.19156 10.9539 3.25328 10.6952L3.99987 7.56532C4.02589 7.45624 3.98869 7.34177 3.90353 7.26882L1.45985 5.17555C1.25783 5.0025 1.36535 4.67161 1.63049 4.65036L4.83787 4.39322C4.94965 4.38426 5.04702 4.31352 5.09008 4.20998L6.32577 1.23904Z"
                  fill="black"
                />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_1934_49509">
                <rect
                  width="11.9616"
                  height="11.9616"
                  fill="white"
                  transform="translate(0.621094 0.276367)"
                />
              </clipPath>
              <clipPath id="clip1_1934_49509">
                <rect
                  width="11.9616"
                  height="11.9616"
                  fill="white"
                  transform="translate(0.621094 0.276367)"
                />
              </clipPath>
            </defs>
          </svg>
          <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_1934_49510)">
              <path
                d="M6.42928 1.23904C6.53143 0.993442 6.87935 0.993442 6.9815 1.23904L8.21718 4.20998C8.26025 4.31352 8.35762 4.38426 8.46939 4.39322L11.6768 4.65036C11.9419 4.67161 12.0494 5.0025 11.8474 5.17555L9.40373 7.26882C9.31857 7.34177 9.28138 7.45624 9.3074 7.56532L10.054 10.6952C10.1157 10.9539 9.83423 11.1584 9.60723 11.0198L6.86127 9.34254C6.76557 9.28408 6.64521 9.28408 6.54951 9.34254L3.80355 11.0198C3.57655 11.1584 3.29508 10.9539 3.3568 10.6952L4.10338 7.56532C4.1294 7.45624 4.09221 7.34177 4.00705 7.26882L1.56336 5.17555C1.36135 5.0025 1.46886 4.67161 1.73401 4.65036L4.94139 4.39322C5.05316 4.38426 5.15053 4.31352 5.1936 4.20998L6.42928 1.23904Z"
                fill="#F2F4F7"
              />
              <g clip-path="url(#clip1_1934_49510)">
                <path
                  d="M6.42928 1.23904C6.53143 0.993442 6.87935 0.993442 6.9815 1.23904L8.21718 4.20998C8.26025 4.31352 8.35762 4.38426 8.46939 4.39322L11.6768 4.65036C11.9419 4.67161 12.0494 5.0025 11.8474 5.17555L9.40373 7.26882C9.31857 7.34177 9.28138 7.45624 9.3074 7.56532L10.054 10.6952C10.1157 10.9539 9.83423 11.1584 9.60723 11.0198L6.86127 9.34254C6.76557 9.28408 6.64521 9.28408 6.54951 9.34254L3.80355 11.0198C3.57655 11.1584 3.29508 10.9539 3.3568 10.6952L4.10338 7.56532C4.1294 7.45624 4.09221 7.34177 4.00705 7.26882L1.56336 5.17555C1.36135 5.0025 1.46886 4.67161 1.73401 4.65036L4.94139 4.39322C5.05316 4.38426 5.15053 4.31352 5.1936 4.20998L6.42928 1.23904Z"
                  fill="black"
                />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_1934_49510">
                <rect
                  width="11.9616"
                  height="11.9616"
                  fill="white"
                  transform="translate(0.724609 0.276367)"
                />
              </clipPath>
              <clipPath id="clip1_1934_49510">
                <rect
                  width="11.9616"
                  height="11.9616"
                  fill="white"
                  transform="translate(0.724609 0.276367)"
                />
              </clipPath>
            </defs>
          </svg>
          <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_1934_49511)">
              <path
                d="M6.5328 1.23904C6.63495 0.993442 6.98286 0.993442 7.08501 1.23904L8.3207 4.20998C8.36376 4.31352 8.46113 4.38426 8.57291 4.39322L11.7803 4.65036C12.0454 4.67161 12.1529 5.0025 11.9509 5.17555L9.50725 7.26882C9.42209 7.34177 9.38489 7.45624 9.41091 7.56532L10.1575 10.6952C10.2192 10.9539 9.93775 11.1584 9.71074 11.0198L6.96478 9.34254C6.86908 9.28408 6.74873 9.28408 6.65303 9.34254L3.90707 11.0198C3.68007 11.1584 3.39859 10.9539 3.46031 10.6952L4.2069 7.56532C4.23292 7.45624 4.19572 7.34177 4.11056 7.26882L1.66688 5.17555C1.46487 5.0025 1.57238 4.67161 1.83752 4.65036L5.0449 4.39322C5.15668 4.38426 5.25405 4.31352 5.29711 4.20998L6.5328 1.23904Z"
                fill="#F2F4F7"
              />
              <g clip-path="url(#clip1_1934_49511)">
                <path
                  d="M6.5328 1.23904C6.63495 0.993442 6.98286 0.993442 7.08501 1.23904L8.3207 4.20998C8.36376 4.31352 8.46113 4.38426 8.57291 4.39322L11.7803 4.65036C12.0454 4.67161 12.1529 5.0025 11.9509 5.17555L9.50725 7.26882C9.42209 7.34177 9.38489 7.45624 9.41091 7.56532L10.1575 10.6952C10.2192 10.9539 9.93775 11.1584 9.71074 11.0198L6.96478 9.34254C6.86908 9.28408 6.74873 9.28408 6.65303 9.34254L3.90707 11.0198C3.68007 11.1584 3.39859 10.9539 3.46031 10.6952L4.2069 7.56532C4.23292 7.45624 4.19572 7.34177 4.11056 7.26882L1.66688 5.17555C1.46487 5.0025 1.57238 4.67161 1.83752 4.65036L5.0449 4.39322C5.15668 4.38426 5.25405 4.31352 5.29711 4.20998L6.5328 1.23904Z"
                  fill="black"
                />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_1934_49511">
                <rect
                  width="11.9616"
                  height="11.9616"
                  fill="white"
                  transform="translate(0.828125 0.276367)"
                />
              </clipPath>
              <clipPath id="clip1_1934_49511">
                <rect
                  width="11.9616"
                  height="11.9616"
                  fill="white"
                  transform="translate(0.828125 0.276367)"
                />
              </clipPath>
            </defs>
          </svg>
          <svg
            width="13"
            height="13"
            viewBox="0 0 13 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_1934_49512)">
              <path
                d="M6.63631 1.23904C6.73846 0.993442 7.08638 0.993442 7.18853 1.23904L8.42421 4.20998C8.46728 4.31352 8.56465 4.38426 8.67643 4.39322L11.8838 4.65036C12.1489 4.67161 12.2565 5.0025 12.0544 5.17555L9.61076 7.26882C9.5256 7.34177 9.48841 7.45624 9.51443 7.56532L10.261 10.6952C10.3227 10.9539 10.0413 11.1584 9.81426 11.0198L7.0683 9.34254C6.9726 9.28408 6.85224 9.28408 6.75655 9.34254L4.01058 11.0198C3.78358 11.1584 3.50211 10.9539 3.56383 10.6952L4.31041 7.56532C4.33643 7.45624 4.29924 7.34177 4.21408 7.26882L1.77039 5.17555C1.56838 5.0025 1.67589 4.67161 1.94104 4.65036L5.14842 4.39322C5.26019 4.38426 5.35756 4.31352 5.40063 4.20998L6.63631 1.23904Z"
                fill="#F2F4F7"
              />
              <g clip-path="url(#clip1_1934_49512)">
                <path
                  d="M6.63631 1.23904C6.73846 0.993442 7.08638 0.993442 7.18853 1.23904L8.42421 4.20998C8.46728 4.31352 8.56465 4.38426 8.67643 4.39322L11.8838 4.65036C12.1489 4.67161 12.2565 5.0025 12.0544 5.17555L9.61076 7.26882C9.5256 7.34177 9.48841 7.45624 9.51443 7.56532L10.261 10.6952C10.3227 10.9539 10.0413 11.1584 9.81426 11.0198L7.0683 9.34254C6.9726 9.28408 6.85224 9.28408 6.75655 9.34254L4.01058 11.0198C3.78358 11.1584 3.50211 10.9539 3.56383 10.6952L4.31041 7.56532C4.33643 7.45624 4.29924 7.34177 4.21408 7.26882L1.77039 5.17555C1.56838 5.0025 1.67589 4.67161 1.94104 4.65036L5.14842 4.39322C5.26019 4.38426 5.35756 4.31352 5.40063 4.20998L6.63631 1.23904Z"
                  fill="black"
                />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_1934_49512">
                <rect
                  width="11.9616"
                  height="11.9616"
                  fill="white"
                  transform="translate(0.931641 0.276367)"
                />
              </clipPath>
              <clipPath id="clip1_1934_49512">
                <rect
                  width="11.9616"
                  height="11.9616"
                  fill="white"
                  transform="translate(0.931641 0.276367)"
                />
              </clipPath>
            </defs>
          </svg>
          <svg
            width="12"
            height="13"
            viewBox="0 0 12 13"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_1934_49513)">
              <path
                d="M5.73787 1.23904C5.84003 0.993442 6.18794 0.993442 6.29009 1.23904L7.52578 4.20998C7.56884 4.31352 7.66621 4.38426 7.77799 4.39322L10.9854 4.65036C11.2505 4.67161 11.358 5.0025 11.156 5.17555L8.71233 7.26882C8.62716 7.34177 8.58997 7.45624 8.61599 7.56532L9.36258 10.6952C9.42429 10.9539 9.14282 11.1584 8.91582 11.0198L6.16986 9.34254C6.07416 9.28408 5.95381 9.28408 5.85811 9.34254L3.11214 11.0198C2.88514 11.1584 2.60367 10.9539 2.66539 10.6952L3.41198 7.56532C3.438 7.45624 3.4008 7.34177 3.31564 7.26882L0.871955 5.17555C0.669943 5.0025 0.777456 4.67161 1.0426 4.65036L4.24998 4.39322C4.36176 4.38426 4.45913 4.31352 4.50219 4.20998L5.73787 1.23904Z"
                fill="#C2C2C2"
              />
              <g clip-path="url(#clip1_1934_49513)">
                <path
                  d="M5.73787 1.23904C5.84003 0.993442 6.18794 0.993442 6.29009 1.23904L7.52578 4.20998C7.56884 4.31352 7.66621 4.38426 7.77799 4.39322L10.9854 4.65036C11.2505 4.67161 11.358 5.0025 11.156 5.17555L8.71233 7.26882C8.62716 7.34177 8.58997 7.45624 8.61599 7.56532L9.36258 10.6952C9.42429 10.9539 9.14282 11.1584 8.91582 11.0198L6.16986 9.34254C6.07416 9.28408 5.95381 9.28408 5.85811 9.34254L3.11214 11.0198C2.88514 11.1584 2.60367 10.9539 2.66539 10.6952L3.41198 7.56532C3.438 7.45624 3.4008 7.34177 3.31564 7.26882L0.871955 5.17555C0.669943 5.0025 0.777456 4.67161 1.0426 4.65036L4.24998 4.39322C4.36176 4.38426 4.45913 4.31352 4.50219 4.20998L5.73787 1.23904Z"
                  fill="black"
                />
              </g>
            </g>
            <defs>
              <clipPath id="clip0_1934_49513">
                <rect
                  width="11.9616"
                  height="11.9616"
                  fill="white"
                  transform="translate(0.0332031 0.276367)"
                />
              </clipPath>
              <clipPath id="clip1_1934_49513">
                <rect
                  width="7.77501"
                  height="11.9616"
                  fill="white"
                  transform="translate(0.0332031 0.276367)"
                />
              </clipPath>
            </defs>
          </svg>
        </div>
        <div>
          <div
            style={{
              borderRadius: '9.955px',
              border: '0.415px solid  rgba(10, 15, 41, 0.08',
              background: '#FFF',
              display: 'flex',
              flexDirection: 'column',
              padding: '14px 16px',
              gap: 12,
            }}
          >
            <div style={{ display: 'flex', gap: 4 }}>
              <svg
                width="9"
                height="10"
                viewBox="0 0 9 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1934_49494)">
                  <path
                    d="M4.03823 2.00183C4.17992 1.66118 4.66249 1.66118 4.80418 2.00183L5.42101 3.48488C5.48074 3.62849 5.6158 3.72661 5.77084 3.73904L7.37191 3.8674C7.73968 3.89688 7.8888 4.35584 7.6086 4.59585L6.38875 5.64079C6.27063 5.74197 6.21904 5.90074 6.25513 6.05203L6.62782 7.61441C6.71342 7.97328 6.32301 8.25693 6.00815 8.06462L4.63741 7.22738C4.50467 7.1463 4.33774 7.1463 4.205 7.22738L2.83426 8.06462C2.5194 8.25693 2.12899 7.97328 2.2146 7.61441L2.58728 6.05203C2.62337 5.90074 2.57178 5.74197 2.45366 5.64079L1.23381 4.59586C0.953612 4.35584 1.10273 3.89688 1.4705 3.8674L3.07157 3.73904C3.22661 3.72661 3.36167 3.62849 3.4214 3.48488L4.03823 2.00183Z"
                    fill="#0A0F29"
                    fill-opacity="0.25"
                  />
                  <g clip-path="url(#clip1_1934_49494)">
                    <path
                      d="M4.03823 2.00183C4.17992 1.66118 4.66249 1.66118 4.80418 2.00183L5.42101 3.48488C5.48074 3.62849 5.6158 3.72661 5.77084 3.73904L7.37191 3.8674C7.73968 3.89688 7.8888 4.35584 7.6086 4.59585L6.38875 5.64079C6.27063 5.74197 6.21904 5.90074 6.25513 6.05203L6.62782 7.61441C6.71342 7.97328 6.32301 8.25693 6.00815 8.06462L4.63741 7.22738C4.50467 7.1463 4.33774 7.1463 4.205 7.22738L2.83426 8.06462C2.5194 8.25693 2.12899 7.97328 2.2146 7.61441L2.58728 6.05203C2.62337 5.90074 2.57178 5.74197 2.45366 5.64079L1.23381 4.59586C0.953612 4.35584 1.10273 3.89688 1.4705 3.8674L3.07157 3.73904C3.22661 3.72661 3.36167 3.62849 3.4214 3.48488L4.03823 2.00183Z"
                      fill="#14151A"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_1934_49494">
                    <rect
                      width="8.29554"
                      height="8.29554"
                      fill="white"
                      transform="translate(0.273438 0.874023)"
                    />
                  </clipPath>
                  <clipPath id="clip1_1934_49494">
                    <rect
                      width="8.29554"
                      height="8.29554"
                      fill="white"
                      transform="translate(0.273438 0.874023)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <svg
                width="9"
                height="10"
                viewBox="0 0 9 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1934_49494)">
                  <path
                    d="M4.03823 2.00183C4.17992 1.66118 4.66249 1.66118 4.80418 2.00183L5.42101 3.48488C5.48074 3.62849 5.6158 3.72661 5.77084 3.73904L7.37191 3.8674C7.73968 3.89688 7.8888 4.35584 7.6086 4.59585L6.38875 5.64079C6.27063 5.74197 6.21904 5.90074 6.25513 6.05203L6.62782 7.61441C6.71342 7.97328 6.32301 8.25693 6.00815 8.06462L4.63741 7.22738C4.50467 7.1463 4.33774 7.1463 4.205 7.22738L2.83426 8.06462C2.5194 8.25693 2.12899 7.97328 2.2146 7.61441L2.58728 6.05203C2.62337 5.90074 2.57178 5.74197 2.45366 5.64079L1.23381 4.59586C0.953612 4.35584 1.10273 3.89688 1.4705 3.8674L3.07157 3.73904C3.22661 3.72661 3.36167 3.62849 3.4214 3.48488L4.03823 2.00183Z"
                    fill="#0A0F29"
                    fill-opacity="0.25"
                  />
                  <g clip-path="url(#clip1_1934_49494)">
                    <path
                      d="M4.03823 2.00183C4.17992 1.66118 4.66249 1.66118 4.80418 2.00183L5.42101 3.48488C5.48074 3.62849 5.6158 3.72661 5.77084 3.73904L7.37191 3.8674C7.73968 3.89688 7.8888 4.35584 7.6086 4.59585L6.38875 5.64079C6.27063 5.74197 6.21904 5.90074 6.25513 6.05203L6.62782 7.61441C6.71342 7.97328 6.32301 8.25693 6.00815 8.06462L4.63741 7.22738C4.50467 7.1463 4.33774 7.1463 4.205 7.22738L2.83426 8.06462C2.5194 8.25693 2.12899 7.97328 2.2146 7.61441L2.58728 6.05203C2.62337 5.90074 2.57178 5.74197 2.45366 5.64079L1.23381 4.59586C0.953612 4.35584 1.10273 3.89688 1.4705 3.8674L3.07157 3.73904C3.22661 3.72661 3.36167 3.62849 3.4214 3.48488L4.03823 2.00183Z"
                      fill="#14151A"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_1934_49494">
                    <rect
                      width="8.29554"
                      height="8.29554"
                      fill="white"
                      transform="translate(0.273438 0.874023)"
                    />
                  </clipPath>
                  <clipPath id="clip1_1934_49494">
                    <rect
                      width="8.29554"
                      height="8.29554"
                      fill="white"
                      transform="translate(0.273438 0.874023)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <svg
                width="9"
                height="10"
                viewBox="0 0 9 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1934_49494)">
                  <path
                    d="M4.03823 2.00183C4.17992 1.66118 4.66249 1.66118 4.80418 2.00183L5.42101 3.48488C5.48074 3.62849 5.6158 3.72661 5.77084 3.73904L7.37191 3.8674C7.73968 3.89688 7.8888 4.35584 7.6086 4.59585L6.38875 5.64079C6.27063 5.74197 6.21904 5.90074 6.25513 6.05203L6.62782 7.61441C6.71342 7.97328 6.32301 8.25693 6.00815 8.06462L4.63741 7.22738C4.50467 7.1463 4.33774 7.1463 4.205 7.22738L2.83426 8.06462C2.5194 8.25693 2.12899 7.97328 2.2146 7.61441L2.58728 6.05203C2.62337 5.90074 2.57178 5.74197 2.45366 5.64079L1.23381 4.59586C0.953612 4.35584 1.10273 3.89688 1.4705 3.8674L3.07157 3.73904C3.22661 3.72661 3.36167 3.62849 3.4214 3.48488L4.03823 2.00183Z"
                    fill="#0A0F29"
                    fill-opacity="0.25"
                  />
                  <g clip-path="url(#clip1_1934_49494)">
                    <path
                      d="M4.03823 2.00183C4.17992 1.66118 4.66249 1.66118 4.80418 2.00183L5.42101 3.48488C5.48074 3.62849 5.6158 3.72661 5.77084 3.73904L7.37191 3.8674C7.73968 3.89688 7.8888 4.35584 7.6086 4.59585L6.38875 5.64079C6.27063 5.74197 6.21904 5.90074 6.25513 6.05203L6.62782 7.61441C6.71342 7.97328 6.32301 8.25693 6.00815 8.06462L4.63741 7.22738C4.50467 7.1463 4.33774 7.1463 4.205 7.22738L2.83426 8.06462C2.5194 8.25693 2.12899 7.97328 2.2146 7.61441L2.58728 6.05203C2.62337 5.90074 2.57178 5.74197 2.45366 5.64079L1.23381 4.59586C0.953612 4.35584 1.10273 3.89688 1.4705 3.8674L3.07157 3.73904C3.22661 3.72661 3.36167 3.62849 3.4214 3.48488L4.03823 2.00183Z"
                      fill="#14151A"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_1934_49494">
                    <rect
                      width="8.29554"
                      height="8.29554"
                      fill="white"
                      transform="translate(0.273438 0.874023)"
                    />
                  </clipPath>
                  <clipPath id="clip1_1934_49494">
                    <rect
                      width="8.29554"
                      height="8.29554"
                      fill="white"
                      transform="translate(0.273438 0.874023)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <svg
                width="9"
                height="10"
                viewBox="0 0 9 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1934_49494)">
                  <path
                    d="M4.03823 2.00183C4.17992 1.66118 4.66249 1.66118 4.80418 2.00183L5.42101 3.48488C5.48074 3.62849 5.6158 3.72661 5.77084 3.73904L7.37191 3.8674C7.73968 3.89688 7.8888 4.35584 7.6086 4.59585L6.38875 5.64079C6.27063 5.74197 6.21904 5.90074 6.25513 6.05203L6.62782 7.61441C6.71342 7.97328 6.32301 8.25693 6.00815 8.06462L4.63741 7.22738C4.50467 7.1463 4.33774 7.1463 4.205 7.22738L2.83426 8.06462C2.5194 8.25693 2.12899 7.97328 2.2146 7.61441L2.58728 6.05203C2.62337 5.90074 2.57178 5.74197 2.45366 5.64079L1.23381 4.59586C0.953612 4.35584 1.10273 3.89688 1.4705 3.8674L3.07157 3.73904C3.22661 3.72661 3.36167 3.62849 3.4214 3.48488L4.03823 2.00183Z"
                    fill="#0A0F29"
                    fill-opacity="0.25"
                  />
                  <g clip-path="url(#clip1_1934_49494)">
                    <path
                      d="M4.03823 2.00183C4.17992 1.66118 4.66249 1.66118 4.80418 2.00183L5.42101 3.48488C5.48074 3.62849 5.6158 3.72661 5.77084 3.73904L7.37191 3.8674C7.73968 3.89688 7.8888 4.35584 7.6086 4.59585L6.38875 5.64079C6.27063 5.74197 6.21904 5.90074 6.25513 6.05203L6.62782 7.61441C6.71342 7.97328 6.32301 8.25693 6.00815 8.06462L4.63741 7.22738C4.50467 7.1463 4.33774 7.1463 4.205 7.22738L2.83426 8.06462C2.5194 8.25693 2.12899 7.97328 2.2146 7.61441L2.58728 6.05203C2.62337 5.90074 2.57178 5.74197 2.45366 5.64079L1.23381 4.59586C0.953612 4.35584 1.10273 3.89688 1.4705 3.8674L3.07157 3.73904C3.22661 3.72661 3.36167 3.62849 3.4214 3.48488L4.03823 2.00183Z"
                      fill="#14151A"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_1934_49494">
                    <rect
                      width="8.29554"
                      height="8.29554"
                      fill="white"
                      transform="translate(0.273438 0.874023)"
                    />
                  </clipPath>
                  <clipPath id="clip1_1934_49494">
                    <rect
                      width="8.29554"
                      height="8.29554"
                      fill="white"
                      transform="translate(0.273438 0.874023)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <svg
                width="9"
                height="10"
                viewBox="0 0 9 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1934_49494)">
                  <path
                    d="M4.03823 2.00183C4.17992 1.66118 4.66249 1.66118 4.80418 2.00183L5.42101 3.48488C5.48074 3.62849 5.6158 3.72661 5.77084 3.73904L7.37191 3.8674C7.73968 3.89688 7.8888 4.35584 7.6086 4.59585L6.38875 5.64079C6.27063 5.74197 6.21904 5.90074 6.25513 6.05203L6.62782 7.61441C6.71342 7.97328 6.32301 8.25693 6.00815 8.06462L4.63741 7.22738C4.50467 7.1463 4.33774 7.1463 4.205 7.22738L2.83426 8.06462C2.5194 8.25693 2.12899 7.97328 2.2146 7.61441L2.58728 6.05203C2.62337 5.90074 2.57178 5.74197 2.45366 5.64079L1.23381 4.59586C0.953612 4.35584 1.10273 3.89688 1.4705 3.8674L3.07157 3.73904C3.22661 3.72661 3.36167 3.62849 3.4214 3.48488L4.03823 2.00183Z"
                    fill="#0A0F29"
                    fill-opacity="0.25"
                  />
                  <g clip-path="url(#clip1_1934_49494)">
                    <path
                      d="M4.03823 2.00183C4.17992 1.66118 4.66249 1.66118 4.80418 2.00183L5.42101 3.48488C5.48074 3.62849 5.6158 3.72661 5.77084 3.73904L7.37191 3.8674C7.73968 3.89688 7.8888 4.35584 7.6086 4.59585L6.38875 5.64079C6.27063 5.74197 6.21904 5.90074 6.25513 6.05203L6.62782 7.61441C6.71342 7.97328 6.32301 8.25693 6.00815 8.06462L4.63741 7.22738C4.50467 7.1463 4.33774 7.1463 4.205 7.22738L2.83426 8.06462C2.5194 8.25693 2.12899 7.97328 2.2146 7.61441L2.58728 6.05203C2.62337 5.90074 2.57178 5.74197 2.45366 5.64079L1.23381 4.59586C0.953612 4.35584 1.10273 3.89688 1.4705 3.8674L3.07157 3.73904C3.22661 3.72661 3.36167 3.62849 3.4214 3.48488L4.03823 2.00183Z"
                      fill="#14151A"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_1934_49494">
                    <rect
                      width="8.29554"
                      height="8.29554"
                      fill="white"
                      transform="translate(0.273438 0.874023)"
                    />
                  </clipPath>
                  <clipPath id="clip1_1934_49494">
                    <rect
                      width="8.29554"
                      height="8.29554"
                      fill="white"
                      transform="translate(0.273438 0.874023)"
                    />
                  </clipPath>
                </defs>
              </svg>
              <svg
                width="9"
                height="10"
                viewBox="0 0 9 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_1934_49494)">
                  <path
                    d="M4.03823 2.00183C4.17992 1.66118 4.66249 1.66118 4.80418 2.00183L5.42101 3.48488C5.48074 3.62849 5.6158 3.72661 5.77084 3.73904L7.37191 3.8674C7.73968 3.89688 7.8888 4.35584 7.6086 4.59585L6.38875 5.64079C6.27063 5.74197 6.21904 5.90074 6.25513 6.05203L6.62782 7.61441C6.71342 7.97328 6.32301 8.25693 6.00815 8.06462L4.63741 7.22738C4.50467 7.1463 4.33774 7.1463 4.205 7.22738L2.83426 8.06462C2.5194 8.25693 2.12899 7.97328 2.2146 7.61441L2.58728 6.05203C2.62337 5.90074 2.57178 5.74197 2.45366 5.64079L1.23381 4.59586C0.953612 4.35584 1.10273 3.89688 1.4705 3.8674L3.07157 3.73904C3.22661 3.72661 3.36167 3.62849 3.4214 3.48488L4.03823 2.00183Z"
                    fill="#0A0F29"
                    fill-opacity="0.25"
                  />
                  <g clip-path="url(#clip1_1934_49494)">
                    <path
                      d="M4.03823 2.00183C4.17992 1.66118 4.66249 1.66118 4.80418 2.00183L5.42101 3.48488C5.48074 3.62849 5.6158 3.72661 5.77084 3.73904L7.37191 3.8674C7.73968 3.89688 7.8888 4.35584 7.6086 4.59585L6.38875 5.64079C6.27063 5.74197 6.21904 5.90074 6.25513 6.05203L6.62782 7.61441C6.71342 7.97328 6.32301 8.25693 6.00815 8.06462L4.63741 7.22738C4.50467 7.1463 4.33774 7.1463 4.205 7.22738L2.83426 8.06462C2.5194 8.25693 2.12899 7.97328 2.2146 7.61441L2.58728 6.05203C2.62337 5.90074 2.57178 5.74197 2.45366 5.64079L1.23381 4.59586C0.953612 4.35584 1.10273 3.89688 1.4705 3.8674L3.07157 3.73904C3.22661 3.72661 3.36167 3.62849 3.4214 3.48488L4.03823 2.00183Z"
                      fill="#14151A"
                    />
                  </g>
                </g>
                <defs>
                  <clipPath id="clip0_1934_49494">
                    <rect
                      width="8.29554"
                      height="8.29554"
                      fill="white"
                      transform="translate(0.273438 0.874023)"
                    />
                  </clipPath>
                  <clipPath id="clip1_1934_49494">
                    <rect
                      width="8.29554"
                      height="8.29554"
                      fill="white"
                      transform="translate(0.273438 0.874023)"
                    />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 4,
              }}
            >
              <p
                style={{
                  color: '#14151A',

                  fontSize: '11.614px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '13.273px',
                  letterSpacing: '-0.232px',
                  margin: 0,
                  whiteSpace: 'pre-wrap',
                }}
              >
                An incredibly cool technology in development
              </p>
              <p
                style={{
                  margin: 0,
                  color: 'rgba(20, 21, 26, 0.70)',

                  fontSize: '6.636px',
                  fontStyle: 'normal',
                  fontWeight: 400,
                  lineHeight: '8.296px',
                  letterSpacing: '-0.133px',
                }}
              >
                The way it transcribes what it hears, translates it into
                multiple languages, and adds subtitles
              </p>
            </div>
            <div
              style={{
                marginTop: 4,
                display: 'flex',
                gap: 6,
                alignItems: 'center',
              }}
            >
              <img
                src="https://framerusercontent.com/images/lSxxsfw6bH3XuLl9Levs0CuFyE.png"
                width={24}
                height={24}
                style={{ borderRadius: 150 }}
              />

              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <p
                  style={{
                    color: '#14151A',

                    fontSize: '6.636px',
                    fontStyle: 'normal',
                    fontWeight: '450',
                    lineHeight: '9.955px',
                    letterSpacing: '-0.066px',
                    margin: 0,
                  }}
                >
                  Ale G.
                </p>
                <p
                  style={{
                    color: 'rgba(15, 19, 36, 0.60)',

                    fontSize: '5.807px',
                    fontStyle: 'normal',
                    fontWeight: '400',
                    lineHeight: '8.926px',
                    margin: 0,
                  }}
                >
                  Small-Business
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    ),
  },
];

const Features = () => {
  return (
    <div style={featuresStyles.container} className="feature-container">
      <style>
        {`
          @keyframes scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }


        `}
      </style>
      <div style={featuresStyles.scrollingWrapper}>
        <div style={featuresStyles.scrollingContent}>
          {featuresData.map((feature, index) => (
            <div
              key={`first-${index}`}
              style={{
                ...featuresStyles.featureContainer,
              }}
            >
              {feature.content}
            </div>
          ))}

          {featuresData.map((feature, index) => (
            <div
              key={`second-${index}`}
              style={{
                ...featuresStyles.featureContainer,
              }}
            >
              {feature.content}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

interface CustomInputProps {
  style?: CSSProperties;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const CustomInput = ({
  style,
  placeholder,
  value,
  onChange,
}: CustomInputProps) => (
  <input
    type="text"
    style={style}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);
