import { legalContent } from '@/content/legalContent';
import { useLanguage } from '@/contexts/LanguageContext';
import LegalDocument from './LegalDocument';

export default function MentionsLegalesPage() {
  const { language } = useLanguage();
  return <LegalDocument document={legalContent[language].mentions} />;
}
