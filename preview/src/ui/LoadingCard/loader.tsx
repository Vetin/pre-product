export const Loader = () => (
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
    <g clipPath="url(#clip0_1934_49750)">
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
        <stop stopColor="#1317FF" />
        <stop offset="1" stopColor="#1317FF" stopOpacity="0" />
      </radialGradient>
      <clipPath id="clip0_1934_49750">
        <rect width="20" height="20" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
