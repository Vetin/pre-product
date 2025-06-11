import type { CSSProperties } from 'react';
import uploadStyles from '../styles';

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
