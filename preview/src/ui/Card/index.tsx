import type { CSSProperties } from 'react';
import styles from '../styles';

export const Card = ({
  children,
  styles: propStyles,
}: {
  children: React.ReactNode;
  styles?: CSSProperties;
}) => {
  return (
    <div style={styles.container}>
      <div style={styles.innerContainer}>
        <style>{`
            @media screen and (max-width: 1024px) {
              .__card {
                padding: 32px 16px!important;
              }
            }
          `}</style>
        <div style={{ ...styles.contentBox, ...propStyles }} className="__card">
          {children}
        </div>
      </div>
    </div>
  );
};
