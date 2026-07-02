/**
 * Page "Mot de passe oublié".
 *
 * [Note pédagogique] On affiche TOUJOURS le même message de succès, que l'email
 * existe ou non en base. C'est une protection contre l'énumération de comptes :
 * un attaquant ne doit pas pouvoir deviner quelles adresses sont enregistrées.
 */
import { useId, useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { requestPasswordReset } from '@/api/auth';
import { getApiErrorMessage } from '@/api/errors';

export default function ForgotPasswordPage() {
  const { t } = useTranslation();
  const emailId = useId();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);
    try {
      const detail = await requestPasswordReset(email);
      setMessage(detail);
    } catch (err) {
      setError(getApiErrorMessage(err, t('forgotPassword.sendError')));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">{t('forgotPassword.title')}</h1>
        <p className="text-sm text-slate-500 mb-6">{t('forgotPassword.intro')}</p>

        {message ? (
          <div
            role="status"
            className="mb-4 p-3 bg-emerald-50 border-l-4 border-emerald-500 text-sm text-emerald-900 rounded"
          >
            {message}
            <div className="mt-3">
              <Link to="/login" className="text-indigo-600 hover:underline">
                ← {t('common.backToLogin')}
              </Link>
            </div>
          </div>
        ) : (
          <>
            {error && (
              <div
                role="alert"
                className="mb-4 p-3 bg-rose-50 border-l-4 border-rose-500 text-sm text-rose-900 rounded"
              >
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor={emailId} className="block text-sm font-medium text-slate-700 mb-1">
                  {t('common.email')}
                </label>
                <input
                  id={emailId}
                  type="email"
                  required
                  autoFocus
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                />
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full">
                {loading ? t('forgotPassword.sending') : t('forgotPassword.send')}
              </button>
            </form>

            <p className="text-sm text-slate-500 mt-4 text-center">
              <Link to="/login" className="text-indigo-600 hover:underline">
                ← {t('common.backToLogin')}
              </Link>
            </p>
          </>
        )}
      </div>
    </div>
  );
}
