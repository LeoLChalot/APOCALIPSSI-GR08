import type { ReactNode } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

export const REGLEMENTATION_URL =
  'https://mohamedelafrit.com/teaching/Reglementation_des_Donnees';

export type LegalSection = {
  title: string;
  hint: string;
};

type Props = {
  title: string;
  intro: string;
  sections: LegalSection[];
  children?: ReactNode;
};

export default function LegalScaffold({ title, intro, sections, children }: Props) {
  const { language } = useLanguage();

  const copy =
    language === 'fr'
      ? {
          badge: 'Page a completer par votre equipe',
          bodyStart: 'Ce document est un',
          bodyStrong: 'modele vierge',
          bodyEnd:
            "Remplacez chaque indication en italique par le contenu reel de votre projet. Besoin d'aide ?",
          link: 'Consultez le cours "Reglementation des donnees"',
          hintPrefix: 'A completer -',
          footer:
            "Derniere mise a jour : a completer. Document redige dans le cadre pedagogique APOCAL'IPSSI 2026.",
        }
      : {
          badge: 'Page to complete with your team',
          bodyStart: 'This document is a',
          bodyStrong: 'blank template',
          bodyEnd:
            'Replace each italic hint with the actual content of your project. Need help?',
          link: 'See the "Data regulation" course',
          hintPrefix: 'To complete -',
          footer:
            "Last updated: to be completed. Document prepared within the APOCAL'IPSSI 2026 teaching framework.",
        };

  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{title}</h1>
      <p className="text-slate-600 dark:text-slate-400 mb-6">{intro}</p>

      <div className="mb-8 p-4 bg-amber-50 border-l-4 border-amber-400 rounded text-sm text-amber-900">
        <p className="font-semibold mb-1">{copy.badge}</p>
        <p>
          {copy.bodyStart} <strong>{copy.bodyStrong}</strong>. {copy.bodyEnd}{' '}
          <a
            href={REGLEMENTATION_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-indigo-700 underline hover:no-underline font-medium"
          >
            {copy.link}
          </a>
          .
        </p>
      </div>

      <div className="space-y-6">
        {sections.map((section, index) => (
          <section key={section.title}>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
              {index + 1}. {section.title}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 italic">
              {copy.hintPrefix} {section.hint}
            </p>
          </section>
        ))}
      </div>

      {children}

      <p className="text-xs text-slate-400 mt-10 pt-4 border-t border-slate-200 dark:border-slate-700">
        {copy.footer}
      </p>
    </article>
  );
}
