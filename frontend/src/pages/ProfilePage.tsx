import { useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { changePassword, deleteAccount, updateProfile } from '@/api/auth';
import { getApiErrorMessage } from '@/api/errors';
import { getProfileCopy } from '@/content/profileAdminCopy';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function ProfilePage() {
  const { user, refresh } = useAuth();
  const { language } = useLanguage();
  const copy = getProfileCopy(language);
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState(user?.first_name ?? '');
  const [lastName, setLastName] = useState(user?.last_name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [infoMsg, setInfoMsg] = useState<string | null>(null);
  const [infoErr, setInfoErr] = useState<string | null>(null);
  const [infoLoading, setInfoLoading] = useState(false);

  const [oldPwd, setOldPwd] = useState('');
  const [newPwd, setNewPwd] = useState('');
  const [confirmPwd, setConfirmPwd] = useState('');
  const [pwdMsg, setPwdMsg] = useState<string | null>(null);
  const [pwdErr, setPwdErr] = useState<string | null>(null);
  const [pwdLoading, setPwdLoading] = useState(false);

  const [delPwd, setDelPwd] = useState('');
  const [delConfirm, setDelConfirm] = useState(false);
  const [delErr, setDelErr] = useState<string | null>(null);
  const [delLoading, setDelLoading] = useState(false);

  const handleInfo = async (e: FormEvent) => {
    e.preventDefault();
    setInfoMsg(null);
    setInfoErr(null);
    setInfoLoading(true);
    try {
      await updateProfile({ first_name: firstName, last_name: lastName, email });
      await refresh();
      setInfoMsg(copy.info.success);
    } catch (err) {
      setInfoErr(
        getApiErrorMessage(err, {
          fallback: copy.info.error,
          translations: {
            'Cet email est deja utilise par un autre compte.': copy.info.emailTaken,
            'Cet email est déjà utilisé par un autre compte.': copy.info.emailTaken,
          },
        }),
      );
    } finally {
      setInfoLoading(false);
    }
  };

  const handlePassword = async (e: FormEvent) => {
    e.preventDefault();
    setPwdMsg(null);
    setPwdErr(null);
    if (newPwd !== confirmPwd) {
      setPwdErr(copy.password.mismatch);
      return;
    }
    setPwdLoading(true);
    try {
      await changePassword(oldPwd, newPwd);
      setPwdMsg(copy.password.success);
      setOldPwd('');
      setNewPwd('');
      setConfirmPwd('');
    } catch (err) {
      setPwdErr(
        getApiErrorMessage(err, {
          fallback: copy.password.error,
          translations: {
            'Mot de passe actuel incorrect.': copy.password.currentInvalid,
          },
        }),
      );
    } finally {
      setPwdLoading(false);
    }
  };

  const handleDelete = async (e: FormEvent) => {
    e.preventDefault();
    setDelErr(null);
    setDelLoading(true);
    try {
      await deleteAccount(delPwd);
      await refresh();
      navigate('/', { replace: true });
    } catch (err) {
      setDelErr(
        getApiErrorMessage(err, {
          fallback: copy.danger.deleteError,
          translations: {
            'Mot de passe incorrect.': copy.danger.passwordInvalid,
          },
        }),
      );
      setDelLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{copy.title}</h1>

      <section className="card">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          {copy.info.title}
        </h2>
        {infoMsg ? (
          <div
            role="status"
            className="mb-4 p-3 bg-emerald-50 border-l-4 border-emerald-500 text-sm text-emerald-900 rounded"
          >
            {infoMsg}
          </div>
        ) : null}
        {infoErr ? (
          <div
            role="alert"
            className="mb-4 p-3 bg-rose-50 border-l-4 border-rose-500 text-sm text-rose-900 rounded"
          >
            {infoErr}
          </div>
        ) : null}
        <form onSubmit={handleInfo} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                {copy.info.firstName}
              </label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                {copy.info.lastName}
              </label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
              Email{' '}
              {user && !user.email_verified ? (
                <span className="text-amber-600 font-normal">({copy.info.emailUnverified})</span>
              ) : null}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
            />
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">{copy.info.emailHint}</p>
          </div>
          <button type="submit" disabled={infoLoading} className="btn-primary">
            {infoLoading ? copy.info.saving : copy.info.save}
          </button>
        </form>
      </section>

      <section className="card">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          {copy.password.title}
        </h2>
        {pwdMsg ? (
          <div
            role="status"
            className="mb-4 p-3 bg-emerald-50 border-l-4 border-emerald-500 text-sm text-emerald-900 rounded"
          >
            {pwdMsg}
          </div>
        ) : null}
        {pwdErr ? (
          <div
            role="alert"
            className="mb-4 p-3 bg-rose-50 border-l-4 border-rose-500 text-sm text-rose-900 rounded"
          >
            {pwdErr}
          </div>
        ) : null}
        <form onSubmit={handlePassword} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
              {copy.password.current}
            </label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={oldPwd}
              onChange={(e) => setOldPwd(e.target.value)}
              className="input"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                {copy.password.next}
              </label>
              <input
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={newPwd}
                onChange={(e) => setNewPwd(e.target.value)}
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
                {copy.password.confirm}
              </label>
              <input
                type="password"
                required
                minLength={8}
                autoComplete="new-password"
                value={confirmPwd}
                onChange={(e) => setConfirmPwd(e.target.value)}
                className="input"
              />
            </div>
          </div>
          <button type="submit" disabled={pwdLoading} className="btn-primary">
            {pwdLoading ? copy.password.submitting : copy.password.submit}
          </button>
        </form>
      </section>

      <section className="card bg-slate-50 dark:bg-slate-800/40">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
          {copy.data.title}
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">{copy.data.intro}</p>
        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            className="btn-secondary"
            onClick={async () => {
              try {
                const { api } = await import('@/api/client');
                const { data } = await api.get('/accounts/gdpr/export/');
                const blob = new Blob([JSON.stringify(data, null, 2)], {
                  type: 'application/json',
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `edututor-rgpd-export-${new Date().toISOString().slice(0, 10)}.json`;
                a.click();
                URL.revokeObjectURL(url);
              } catch {
                window.alert(copy.data.exportError);
              }
            }}
          >
            {copy.data.exportButton}
          </button>
        </div>
      </section>

      <section className="card border-2 border-rose-200">
        <h2 className="text-lg font-semibold text-rose-700 mb-2">{copy.danger.title}</h2>
        <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">{copy.danger.intro}</p>
        {delErr ? (
          <div
            role="alert"
            className="mb-4 p-3 bg-rose-50 border-l-4 border-rose-500 text-sm text-rose-900 rounded"
          >
            {delErr}
          </div>
        ) : null}
        <form onSubmit={handleDelete} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
              {copy.danger.passwordLabel}
            </label>
            <input
              type="password"
              required
              autoComplete="current-password"
              value={delPwd}
              onChange={(e) => setDelPwd(e.target.value)}
              className="input"
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-200">
            <input
              type="checkbox"
              checked={delConfirm}
              onChange={(e) => setDelConfirm(e.target.checked)}
            />
            {copy.danger.confirmLabel}
          </label>
          <button
            type="submit"
            disabled={delLoading || !delConfirm}
            className="px-4 py-2 rounded bg-rose-600 text-white font-medium hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {delLoading ? copy.danger.submitting : copy.danger.submit}
          </button>
        </form>
      </section>
    </div>
  );
}
