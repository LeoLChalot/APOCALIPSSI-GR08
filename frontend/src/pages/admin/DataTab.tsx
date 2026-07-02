import { useState, type FormEvent } from 'react';
import { resetData, seedData } from '@/api/admin';
import { getApiErrorMessage } from '@/api/errors';
import { getAdminCopy } from '@/content/profileAdminCopy';
import { useLanguage } from '@/contexts/LanguageContext';

export default function DataTab() {
  const { language } = useLanguage();
  const copy = getAdminCopy(language);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [seeding, setSeeding] = useState(false);
  const [confirmText, setConfirmText] = useState('');
  const [password, setPassword] = useState('');
  const [includeUsers, setIncludeUsers] = useState(false);
  const [resetting, setResetting] = useState(false);

  const doSeed = async () => {
    setMessage(null);
    setError(null);
    setSeeding(true);
    try {
      await seedData();
      setMessage(copy.data.seedSuccess);
    } catch (err) {
      setError(getApiErrorMessage(err, copy.data.seedError));
    } finally {
      setSeeding(false);
    }
  };

  const doReset = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setResetting(true);
    try {
      const result = await resetData(password, includeUsers);
      setMessage(
        copy.data.resetSuccess
          .replace('{{quizzes}}', String(result.deleted_quizzes))
          .replace('{{users}}', String(result.deleted_users)),
      );
      setConfirmText('');
      setPassword('');
      setIncludeUsers(false);
    } catch (err) {
      setError(
        getApiErrorMessage(err, {
          fallback: copy.data.resetError,
          translations: {
            'Mot de passe administrateur incorrect.': copy.data.resetPasswordInvalid,
          },
        }),
      );
    } finally {
      setResetting(false);
    }
  };

  return (
    <div className="space-y-6 max-w-2xl">
      {message ? (
        <div
          role="status"
          className="p-3 bg-emerald-50 border-l-4 border-emerald-500 text-sm text-emerald-900 rounded"
        >
          {message}
        </div>
      ) : null}
      {error ? (
        <div
          role="alert"
          className="p-3 bg-rose-50 border-l-4 border-rose-500 text-sm text-rose-900 rounded"
        >
          {error}
        </div>
      ) : null}

      <section className="card">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          {copy.data.seedTitle}
        </h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">{copy.data.seedIntro}</p>
        <button onClick={doSeed} disabled={seeding} className="btn-secondary">
          {seeding ? copy.data.seeding : copy.data.seed}
        </button>
      </section>

      <section className="card border-2 border-rose-200">
        <h2 className="text-lg font-semibold text-rose-700 mb-2">{copy.data.resetTitle}</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">{copy.data.resetIntro}</p>
        <form onSubmit={doReset} className="space-y-4">
          <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
            <input
              type="checkbox"
              checked={includeUsers}
              onChange={(e) => setIncludeUsers(e.target.checked)}
            />
            {copy.data.includeUsers}
          </label>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
              {copy.data.confirmReset}
            </label>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="input font-mono"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
              {copy.data.adminPassword}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              className="input"
            />
          </div>
          <button
            type="submit"
            disabled={resetting || confirmText !== 'RESET' || !password}
            className="px-4 py-2 rounded bg-rose-600 text-white font-medium hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {resetting ? copy.data.resetting : copy.data.reset}
          </button>
        </form>
      </section>
    </div>
  );
}
