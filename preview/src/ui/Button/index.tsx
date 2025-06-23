import type { CSSProperties, PropsWithChildren } from 'react';
import { buttonStyles } from './styles';

export const Button = ({
  children,
  disabled,
  size = 'large',
  styles: propStyles,
  onClick,
}: PropsWithChildren<{
  disabled?: boolean;
  size?: 'small' | 'large';
  styles?: CSSProperties;
  onClick?: () => void;
}>) => {
  return (
    <button
      style={{ ...buttonStyles.button(Boolean(disabled), size), ...propStyles }}
      disabled={disabled}
      onClick={onClick}
      className="__button"
    >
      {children}
    </button>
  );
};
