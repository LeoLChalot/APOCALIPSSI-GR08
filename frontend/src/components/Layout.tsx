import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage, type AppLanguage } from '@/contexts/LanguageContext';
import { useTheme } from '@/contexts/ThemeContext';
import { useSiteConfig } from '@/contexts/SiteConfigContext';
import VerifyEmailBanner from '@/components/VerifyEmailBanner';

export default function Layout() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const { config } = useSiteConfig();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/login');
  };

  // Nom de l'app dynamique (admin) : le dernier mot est accentué en ambre.
  const nameWords = config.app_name.trim().split(' ');
  const nameHead = nameWords.slice(0, -1).join(' ');
  const nameTail = nameWords[nameWords.length - 1];

  return (
    <div className="min-h-screen flex flex-col">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-white focus:px-3 focus:py-2 focus:rounded-md focus:shadow"
      >
        {t('layout.skipToContent')}
      </a>

      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10 backdrop-blur">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 text-slate-900 font-bold text-lg">
            <span className="w-8 h-8 grid place-items-center bg-indigo-600 text-white rounded font-mono">
              A
            </span>
            <span>
              {nameHead && <>{nameHead} </>}
              <span className="text-amber-500">{nameTail}</span>
            </span>
          </Link>

          <nav className="flex items-center gap-4 text-sm">
            {user ? (
              <>
                <Link to="/upload" className="text-slate-700 hover:text-indigo-600">
                  {t('layout.newQuiz')}
                </Link>
                <Link
                  to="/dashboard"
                  className="text-slate-700 hover:text-indigo-600 hidden sm:inline"
                >
                  {t('layout.dashboard')}
                </Link>
                <Link
                  to="/review"
                  className="text-slate-700 hover:text-indigo-600 hidden sm:inline"
                >
                  {t('layout.review')}
                </Link>
                <Link to="/history" className="text-slate-700 hover:text-indigo-600">
                  {t('layout.history')}
                </Link>
                {user.is_staff && (
                  <Link to="/admin" className="text-amber-600 font-medium hover:text-amber-700">
                    {t('layout.admin')}
                  </Link>
                )}
                <span className="text-slate-500">|</span>
                <Link
                  to="/profile"
                  className="text-slate-600 hover:text-indigo-600 hidden sm:inline"
                  title={t('layout.profile')}
                >
                  {user.first_name || user.email}
                </Link>
                <LanguageSelect language={language} onChange={setLanguage} />
                <ThemeToggle theme={theme} onToggle={toggleTheme} />
                <button onClick={handleLogout} className="btn-secondary">
                  {t('layout.logout')}
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-slate-700 hover:text-indigo-600">
                  {t('layout.login')}
                </Link>
                <Link to="/signup" className="btn-primary">
                  {t('layout.signup')}
                </Link>
                <LanguageSelect language={language} onChange={setLanguage} />
                <ThemeToggle theme={theme} onToggle={toggleTheme} />
              </>
            )}
          </nav>
        </div>
      </header>

      {/* Bannière globale configurable par l'admin (Lot 8) */}
      {config.banner_enabled && config.banner_message && (
        <div className="bg-indigo-600 text-white text-sm">
          <div className="max-w-6xl mx-auto px-4 py-2 text-center">{config.banner_message}</div>
        </div>
      )}

      {/* Bandeau d'invitation à confirmer l'email (validation "soft") */}
      <VerifyEmailBanner />

      <main id="main-content" className="flex-1 max-w-6xl mx-auto w-full px-4 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-slate-200 mt-12">
        <div className="max-w-6xl mx-auto px-4 py-6 space-y-3 text-sm text-slate-500">
          {/* Liens légaux (pages à compléter par les étudiants) */}
          <nav className="flex flex-wrap gap-x-4 gap-y-1">
            <Link to="/legal/mentions-legales" className="hover:text-indigo-600">
              {t('layout.legalNotice')}
            </Link>
            <Link to="/legal/confidentialite" className="hover:text-indigo-600">
              {t('layout.privacy')}
            </Link>
            <Link to="/legal/cgu" className="hover:text-indigo-600">
              {t('layout.terms')}
            </Link>
            <Link to="/legal/cookies" className="hover:text-indigo-600">
              {t('layout.cookies')}
            </Link>
          </nav>

          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              {config.app_name} — APOCAL'IPSSI 2026 ·
              <a
                href="https://mohamedelafrit.com/teaching/Master_Classe_Agile/cours.html"
                target="_blank"
                  rel="noopener noreferrer"
                  className="ml-1 text-indigo-600 hover:underline"
                >
                  {t('layout.courseLink')}
                </a>
              </div>
              <div className="font-mono text-xs">CC BY-NC-SA 4.0</div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/** Petit bouton de bascule clair/sombre (MVP2 — Lot 6). */
function ThemeToggle({ theme, onToggle }: { theme: 'light' | 'dark'; onToggle: () => void }) {
  const isDark = theme === 'dark';
  const { t } = useTranslation();
  return (
    <button
      onClick={onToggle}
      className="w-9 h-9 grid place-items-center rounded-md border border-slate-300 text-slate-600 hover:bg-slate-50"
      title={isDark ? t('layout.themeLight') : t('layout.themeDark')}
      aria-label={t('layout.themeToggle')}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}

function LanguageSelect({
  language,
  onChange,
}: {
  language: AppLanguage;
  onChange: (language: AppLanguage) => void;
}) {
  const { t } = useTranslation();
  return (
    <div>
      <label htmlFor="language-select" className="sr-only">
        {t('language.label')}
      </label>
      <select
        id="language-select"
        value={language}
        onChange={(e) => onChange(e.target.value as AppLanguage)}
        className="select-input w-auto min-w-24 text-sm"
      >
        <option value="fr">{t('language.fr')}</option>
        <option value="en">{t('language.en')}</option>
      </select>
    </div>
  );
}
