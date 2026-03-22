import { useLanguage } from '../context/LanguageContext';

export const useTranslate = () => {
  const { language } = useLanguage();

  const isEnglish = language === 'en';
  const isFrench = language === 'fr';

  return { language, isEnglish, isFrench };
};
