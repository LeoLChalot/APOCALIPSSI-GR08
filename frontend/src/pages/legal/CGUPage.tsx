import { legalContent } from '@/content/legalContent';
import { useLanguage } from '@/contexts/LanguageContext';
import LegalDocument from './LegalDocument';

export default function CGUPage() {
  const { language } = useLanguage();
  return <LegalDocument document={legalContent[language].terms} />;
}
