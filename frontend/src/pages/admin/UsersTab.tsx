import { useEffect, useState } from 'react';
import {
  deleteAdminUser,
  listAdminUsers,
  resendUserVerification,
  type AdminUser,
  updateAdminUser,
} from '@/api/admin';
import { getApiErrorMessage } from '@/api/errors';
import { getAdminCopy } from '@/content/profileAdminCopy';
import { useLanguage } from '@/contexts/LanguageContext';

export default function UsersTab() {
  const { language } = useLanguage();
  const copy = getAdminCopy(language);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [q, setQ] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const actionTranslations = {
    'Vous ne pouvez pas modifier/supprimer votre propre compte ici.':
      copy.users.ownAccountBlocked,
    'Action interdite sur un super-administrateur.': copy.users.superuserBlocked,
  };

  const load = (query = '') => {
    setLoading(true);
    setError(null);
    listAdminUsers(query)
      .then(setUsers)
      .catch((err) => setError(getApiErrorMessage(err, copy.loadError)))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    const timer = setTimeout(() => load(q), 300);
    return () => clearTimeout(timer);
  }, [q, copy.loadError]);

  const patch = async (user: AdminUser, change: Parameters<typeof updateAdminUser>[1]) => {
    setMessage(null);
    setError(null);
    try {
      const updated = await updateAdminUser(user.id, change);
      setUsers((list) => list.map((item) => (item.id === user.id ? updated : item)));
    } catch (err) {
      setError(
        getApiErrorMessage(err, {
          fallback: copy.users.actionError,
          translations: actionTranslations,
        }),
      );
    }
  };

  const remove = async (user: AdminUser) => {
    const confirmMessage = copy.users.confirmDelete.replace('{{email}}', user.email);
    if (!window.confirm(confirmMessage)) return;
    setMessage(null);
    setError(null);
    try {
      await deleteAdminUser(user.id);
      setUsers((list) => list.filter((item) => item.id !== user.id));
    } catch (err) {
      setError(
        getApiErrorMessage(err, {
          fallback: copy.users.deleteError,
          translations: actionTranslations,
        }),
      );
    }
  };

  const resend = async (user: AdminUser) => {
    setMessage(null);
    setError(null);
    try {
      await resendUserVerification(user.id);
      setMessage(copy.users.resendSuccess.replace('{{email}}', user.email));
    } catch (err) {
      setError(getApiErrorMessage(err, copy.users.resendError));
    }
  };

  return (
    <div className="space-y-4">
      <input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder={copy.users.searchPlaceholder}
        className="input max-w-sm"
      />

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

      {loading ? (
        <p className="text-slate-500 dark:text-slate-400">{copy.loading}</p>
      ) : (
        <div className="card overflow-x-auto p-0">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 text-left">
              <tr>
                <th className="px-3 py-2">{copy.users.headers.email}</th>
                <th className="px-3 py-2">{copy.users.headers.name}</th>
                <th className="px-3 py-2">{copy.users.headers.quizzes}</th>
                <th className="px-3 py-2">{copy.users.headers.emailVerified}</th>
                <th className="px-3 py-2">{copy.users.headers.status}</th>
                <th className="px-3 py-2">{copy.users.headers.role}</th>
                <th className="px-3 py-2">{copy.users.headers.actions}</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t border-slate-200 dark:border-slate-700">
                  <td className="px-3 py-2 font-mono text-xs">
                    {user.email}
                    {user.is_superuser ? (
                      <span className="ml-1 px-1 rounded bg-indigo-100 text-indigo-700 text-[10px]">
                        {copy.users.superBadge}
                      </span>
                    ) : null}
                  </td>
                  <td className="px-3 py-2">
                    {[user.first_name, user.last_name].filter(Boolean).join(' ') || copy.users.emptyName}
                  </td>
                  <td className="px-3 py-2">{user.quiz_count}</td>
                  <td className="px-3 py-2">
                    {user.email_verified ? (
                      <span className="text-emerald-600">✓ {copy.users.yes}</span>
                    ) : (
                      <span className="text-slate-400">{copy.users.no}</span>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    {user.is_active ? (
                      <span className="text-emerald-600">{copy.users.active}</span>
                    ) : (
                      <span className="text-rose-600">{copy.users.disabled}</span>
                    )}
                  </td>
                  <td className="px-3 py-2">
                    {user.is_staff ? copy.users.adminRole : copy.users.memberRole}
                  </td>
                  <td className="px-3 py-2">
                    <div className="flex flex-wrap gap-2 text-xs">
                      <button
                        onClick={() => patch(user, { is_active: !user.is_active })}
                        className="text-indigo-600 hover:underline"
                      >
                        {user.is_active ? copy.users.deactivate : copy.users.activate}
                      </button>
                      <button
                        onClick={() => patch(user, { is_staff: !user.is_staff })}
                        className="text-indigo-600 hover:underline"
                      >
                        {user.is_staff ? copy.users.removeAdmin : copy.users.makeAdmin}
                      </button>
                      {!user.email_verified ? (
                        <>
                          <button
                            onClick={() => patch(user, { email_verified: true })}
                            className="text-indigo-600 hover:underline"
                          >
                            {copy.users.forceVerification}
                          </button>
                          <button
                            onClick={() => resend(user)}
                            className="text-indigo-600 hover:underline"
                          >
                            {copy.users.resendEmail}
                          </button>
                        </>
                      ) : null}
                      <button onClick={() => remove(user)} className="text-rose-600 hover:underline">
                        {copy.users.delete}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {users.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-3 py-6 text-center text-slate-400">
                    {copy.users.empty}
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
