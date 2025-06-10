import React from 'react';

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

export default SpanishFlag;
