const GermanFlag = () => {
  return (
    <div>
      <div>
        <div>
          <svg
            style={{ display: 'block', width: 22, height: 16 }}
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

const FrenchFlag = () => {
  return (
    <div className="flag-container">
      <div className="flag-box">
        <div className="flag-size">
          <svg
            style={{ display: 'block', width: 22, height: 16 }}
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

const SpanishFlag = () => {
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

export const GreekFlag = () => {
  return (
    <div className="greek-flag-container">
      <div className="greek-flag-inner">
        <svg
          width="22"
          height="16"
          viewBox="0 0 22 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="22" height="16" rx="2" fill="#F2F4F7" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 0H4.19048V4.26667H0V0ZM6.28571 0H10.4762V4.26667H6.28571V0ZM0 6.4H4.19048V10.6667H0V6.4ZM6.28571 6.4H10.4762V10.6667H6.28571V6.4ZM10.4762 0H22V2.13333H10.4762V0ZM10.4762 4.26667H22V6.4H10.4762V4.26667Z"
            fill="#1A47B8"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 8.5332H22V10.6665H0V8.5332ZM4.19048 8.5332H6.28571V10.6665H4.19048V8.5332ZM0 12.7999H22V14.9332H0V12.7999Z"
            fill="#1A47B8"
          />
        </svg>
      </div>
    </div>
  );
};

export const IsralianFlag = () => {
  return (
    <div className="isralian-flag-container">
      <div className="isralian-flag-inner">
        <svg
          width="22"
          height="16"
          viewBox="0 0 22 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="22" height="16" rx="2" fill="#F2F4F7" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 11.7338H22V13.8671H0V11.7338ZM0 2.13379H22V4.26712H0V2.13379ZM10.3452 9.60046H8.38095L9.36362 8.00046L8.38095 6.40046H10.3452L11 5.33379L11.6548 6.40046H13.619L12.6364 8.00046L13.619 9.60046H11.6548L11 10.6671L10.3452 9.60046ZM9.95238 8.00046L11 6.93379L12.0476 8.00046L11 9.06712L9.95238 8.00046Z"
            fill="#1A47B8"
          />
        </svg>
      </div>
    </div>
  );
};

export const NorwegianFlag = () => {
  return (
    <div className="norwegian-flag-container">
      <div className="norwegian-flag-inner">
        <svg
          width="22"
          height="16"
          viewBox="0 0 22 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_2132_5583)">
            <rect width="22" height="16" rx="2" fill="#AF010D" />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M6.28571 9.6H0V6.4H6.28571V0H9.42857V6.4H22V9.6H9.42857V16H6.28571V9.6Z"
              fill="#F2F4F7"
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M7.33333 8.53333H0V7.46667H7.33333V0H8.38095V7.46667H22V8.53333H8.38095V16H7.33333V8.53333Z"
              fill="#1A47B8"
            />
          </g>
          <defs>
            <clipPath id="clip0_2132_5583">
              <rect width="22" height="16" rx="2" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
    </div>
  );
};

export const TurkishFlag = () => {
  return (
    <div className="turkish-flag-container">
      <div className="turkish-flag-inner">
        <svg
          width="22"
          height="16"
          viewBox="0 0 22 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="22" height="16" rx="2" fill="#D80027" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M14.6687 9.22916L13.4514 9.87983L13.684 8.50063L12.6992 7.5225L14.0611 7.31983L14.6687 6.06543L15.2764 7.3209L16.6383 7.52356L15.6535 8.49956L15.8861 9.87876"
            fill="#F2F4F7"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M9.95182 11.7333C11.9769 11.7333 13.6185 10.0618 13.6185 7.99994C13.6185 5.93807 11.9769 4.2666 9.95182 4.2666C7.92678 4.2666 6.28516 5.93807 6.28516 7.99994C6.28516 10.0618 7.92678 11.7333 9.95182 11.7333ZM10.9994 10.6666C12.4452 10.6666 13.6185 9.47194 13.6185 7.99994C13.6185 6.52794 12.4452 5.33327 10.9994 5.33327C9.55373 5.33327 8.38039 6.52794 8.38039 7.99994C8.38039 9.47194 9.55373 10.6666 10.9994 10.6666Z"
            fill="#F2F4F7"
          />
        </svg>
      </div>
    </div>
  );
};

export { GermanFlag, FrenchFlag, EnglishFlag, SpanishFlag };
