import React from 'react';

export type Language = 'German' | 'French' | 'English' | 'Spanish' | 'Other';

export interface LanguageOptionProps {
  language: Language;
  flag: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
}
