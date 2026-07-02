import { useId, useState, type FormEvent } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '@/contexts/AuthContext';
import { getApiErrorMessage } from '@/api/errors';

export default function LoginPage() {
  const { login } = useAuth();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? '/upload';
  const emailId = useId();
  const passwordId = useId();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(
        getApiErrorMessage(err, {
          fallback: t('login.invalidCredentials'),
          networkMessage: t('common.serverUnreachable'),
          translations: {
            'Email ou mot de passe invalide.': t('login.invalidCredentials'),
            'Ce compte est désactivé.': t('login.accountDisabled'),
          },
        }),
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="card">
        <h1 className="text-2xl font-bold text-slate-900 mb-2">{t('login.title')}</h1>
        <p className="text-sm text-slate-500 mb-6">
          {t('login.noAccount')}{' '}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            {t('login.signupLink')}
          </Link>
        </p>

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

          <div>
            <div className="flex items-center justify-between mb-1">
              <label htmlFor={passwordId} className="block text-sm font-medium text-slate-700">
                {t('common.password')}
              </label>
              <Link to="/forgot-password" className="text-xs text-indigo-600 hover:underline">
                {t('login.passwordForgotten')}
              </Link>
            </div>
            <input
              id={passwordId}
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
            />
          </div>

          <button type="submit" disabled={loading} className="btn-primary w-full">
            {loading ? t('login.submitting') : t('login.submit')}
          </button>
        </form>
      </div>
    </div>
  );
}
