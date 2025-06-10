import React from 'react';
import type { LanguageOptionProps } from './types';

const LanguageOption = ({
  language,
  flag,
  isSelected,
  onClick,
}: LanguageOptionProps) => {
  const styles = {
    languageOption: {
      flexBasis: 0,
      flexGrow: 1,
      height: '44px',
      minHeight: '1px',
      minWidth: '1px',
      position: 'relative',
      borderRadius: '59px',
      flexShrink: 0,
      cursor: 'pointer',
      ...(isSelected
        ? {
            border: '1px solid #8F8FF3',
            background: '#F5F5FF',
          }
        : { background: 'white', border: '1px solid #D0D5DD' }),
    } as React.CSSProperties,
    languageOptionContainer: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      width: '100%',
      height: '100%',
    } as React.CSSProperties,
    languageOptionBox: {
      boxSizing: 'border-box',
      display: 'flex',
      flexDirection: 'row',
      gap: '6px',
      height: '44px',
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: '20px',
      paddingRight: '20px',
      paddingTop: '12px',
      paddingBottom: '12px',
      position: 'relative',
      width: '100%',
    } as React.CSSProperties,
    languageText: {
      fontFamily: "'Suisse Intl:Regular', sans-serif",
      fontWeight: 'normal',
      lineHeight: 0,
      fontStyle: 'normal',
      position: 'relative',
      flexShrink: 0,
      color: '#101828',
      fontSize: '16px',
      textAlign: 'left',
      whiteSpace: 'nowrap',
      letterSpacing: '-0.5px',
    } as React.CSSProperties,
    languageTextP: {
      display: 'block',
      lineHeight: '22px',
      whiteSpace: 'pre',
    } as React.CSSProperties,
  };

  return (
    <div style={styles.languageOption} onClick={onClick}>
      <div style={styles.languageOptionContainer}>
        <div style={styles.languageOptionBox}>
          {flag}
          <div style={styles.languageText}>
            <p style={styles.languageTextP}>{language}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageOption;
