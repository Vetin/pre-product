import type { CSSProperties, PropsWithChildren } from 'react';
import { styles } from './styles';

export const Button = ({
  children,
  disabled,
  size = 'large',
  styles: propStyles,
}: PropsWithChildren<{
  disabled?: boolean;
  size?: 'small' | 'large';
  styles?: CSSProperties;
}>) => {
  return (
    <button
      style={{ ...styles.button(Boolean(disabled), size), ...propStyles }}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
