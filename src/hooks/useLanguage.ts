import { useState } from 'react';
import type { Language } from '../i18n';

export function useLanguage() {
  const [language, setLanguage] = useState<Language>('zh');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'zh' ? 'en' : 'zh'));
  };

  return {
    language,
    setLanguage,
    toggleLanguage,
  };
}
