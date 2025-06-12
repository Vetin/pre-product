import uploadStyles from './styles';

export const Download = ({ value }: { value: File | null }) => {
  const downloadFile = () => {
    if (!value) return;

    const obj = new Blob([value], { type: value?.type });

    const link = document.createElement('a');

    link.href = URL.createObjectURL(obj);
    link.download = value.name;
    link.click();
    link.remove();
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
