import { useEffect, useState, type FormEvent } from 'react';
import { getSiteConfig, type SiteConfig, updateSiteConfig } from '@/api/admin';
import { getApiErrorMessage } from '@/api/errors';
import { getAdminCopy } from '@/content/profileAdminCopy';
import { useLanguage } from '@/contexts/LanguageContext';
import { useSiteConfig } from '@/contexts/SiteConfigContext';

export default function SiteConfigTab() {
  const { language } = useLanguage();
  const copy = getAdminCopy(language);
  const { refresh } = useSiteConfig();
  const [form, setForm] = useState<SiteConfig | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getSiteConfig()
      .then(setForm)
      .catch((err) => setError(getApiErrorMessage(err, copy.loadError)));
  }, [copy.loadError]);

  if (error && !form) return <p className="text-rose-600">{error}</p>;
  if (!form) return <p className="text-slate-500 dark:text-slate-400">{copy.loading}</p>;

  const set = <K extends keyof SiteConfig>(key: K, value: SiteConfig[K]) =>
    setForm({ ...form, [key]: value });

  const save = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);
    try {
      const saved = await updateSiteConfig({
        app_name: form.app_name,
        allow_signups: form.allow_signups,
        require_email_verification: form.require_email_verification,
        banner_enabled: form.banner_enabled,
        banner_message: form.banner_message,
      });
      setForm(saved);
      await refresh();
      setMessage(copy.site.saveSuccess);
    } catch (err) {
      setError(getApiErrorMessage(err, copy.site.saveError));
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={save} className="card space-y-5 max-w-2xl">
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

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
          {copy.site.appName}
        </label>
        <input
          type="text"
          value={form.app_name}
          onChange={(e) => set('app_name', e.target.value)}
          className="input"
        />
      </div>

      <label className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-200">
        <input
          type="checkbox"
          checked={form.allow_signups}
          onChange={(e) => set('allow_signups', e.target.checked)}
          className="mt-1"
        />
        <span>
          <strong>{copy.site.allowSignupsTitle}</strong>
          <span className="block text-slate-500 dark:text-slate-400">{copy.site.allowSignupsHelp}</span>
        </span>
      </label>

      <label className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-200">
        <input
          type="checkbox"
          checked={form.require_email_verification}
          onChange={(e) => set('require_email_verification', e.target.checked)}
          className="mt-1"
        />
        <span>
          <strong>{copy.site.requireEmailTitle}</strong>
          <span className="block text-slate-500 dark:text-slate-400">{copy.site.requireEmailHelp}</span>
        </span>
      </label>

      <label className="flex items-start gap-3 text-sm text-slate-700 dark:text-slate-200">
        <input
          type="checkbox"
          checked={form.banner_enabled}
          onChange={(e) => set('banner_enabled', e.target.checked)}
          className="mt-1"
        />
        <span>
          <strong>{copy.site.bannerTitle}</strong>
          <span className="block text-slate-500 dark:text-slate-400">{copy.site.bannerHelp}</span>
        </span>
      </label>

      <div>
        <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
          {copy.site.bannerMessage}
        </label>
        <textarea
          value={form.banner_message}
          onChange={(e) => set('banner_message', e.target.value)}
          rows={2}
          className="input"
          placeholder={copy.site.bannerPlaceholder}
        />
      </div>

      <button type="submit" disabled={loading} className="btn-primary">
        {loading ? copy.site.saving : copy.site.save}
      </button>
    </form>
  );
}
