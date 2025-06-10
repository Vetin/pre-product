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
        <div style={{ ...styles.contentBox, ...propStyles }}>{children}</div>
      </div>
    </div>
  );
};
