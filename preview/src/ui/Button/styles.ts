import type { CSSProperties } from 'react';

export const buttonStyles = {
  button: (isDisabled: boolean, size: 'small' | 'large') =>
    ({
      position: 'relative',
      borderRadius: '16px',
      boxShadow: '0px 1px 2px 0px rgba(20,21,26,0.05)',
      flexShrink: 0,
      width: '100%',
      backgroundColor: isDisabled ? '#d1d1fa' : '#0000ff',
      cursor: isDisabled ? 'default' : 'pointer',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'clip',
      height: '100%',
      fontFamily: "'Suisse Intl', sans-serif",
      fontWeight: 450,
      lineHeight: '24px',
      color: '#ffffff',
      fontSize: size === 'small' ? '16px' : '20px',
      textAlign: 'center',
      whiteSpace: 'pre',
      letterSpacing: '-0.4px',
      padding: size === 'small' ? '12px 16px' : '18px 16px',
      border: 'none',
    } as CSSProperties),
};
