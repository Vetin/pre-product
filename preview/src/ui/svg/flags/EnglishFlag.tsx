import React from 'react';
import svgPaths from './svgPaths';

const EnglishFlag = () => {
  return (
    <div className="english-flag-container">
      <div className="english-flag-inner">
        <svg
          style={{ display: 'block', width: 22, height: 16 }}
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

export default EnglishFlag;
