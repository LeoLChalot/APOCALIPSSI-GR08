import { useEffect, useState, type FormEvent } from 'react';
import { getLLMConfig, type LLMConfig, type ProviderInfo, updateLLMConfig } from '@/api/admin';
import { getApiErrorMessage } from '@/api/errors';
import { getAdminCopy, getProviderCopy } from '@/content/profileAdminCopy';
import { useLanguage } from '@/contexts/LanguageContext';

export default function LLMConfigTab() {
  const { language } = useLanguage();
  const copy = getAdminCopy(language);
  const [cfg, setCfg] = useState<LLMConfig | null>(null);
  const [backend, setBackend] = useState('');
  const [model, setModel] = useState('');
  const [ollamaHost, setOllamaHost] = useState('');
  const [timeout, setTimeoutVal] = useState<string>('');
  const [keyInput, setKeyInput] = useState('');
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const apply = (next: LLMConfig) => {
    setCfg(next);
    setBackend(next.backend || next.effective.backend || 'ollama');
    setModel(next.model);
    setOllamaHost(next.ollama_host);
    setTimeoutVal(next.timeout !== null ? String(next.timeout) : '');
    setKeyInput('');
  };

  useEffect(() => {
    getLLMConfig()
      .then(apply)
      .catch((err) => setError(getApiErrorMessage(err, copy.loadError)));
  }, [copy.loadError]);

  if (error && !cfg) return <p className="text-rose-600">{error}</p>;
  if (!cfg) return <p className="text-slate-500 dark:text-slate-400">{copy.loading}</p>;

  const provider = cfg.providers.find((item) => item.key === backend);
  const providerText = provider
    ? getProviderCopy(language, provider.key, { label: provider.label, help: provider.help })
    : undefined;
  const keyAlreadySet = cfg.api_keys_set[backend];

  const getEffectiveProviderLabel = () => {
    const effective = cfg.providers.find((item) => item.key === cfg.effective.backend);
    if (!effective) return cfg.effective.backend;
    return getProviderCopy(language, effective.key, {
      label: effective.label,
      help: effective.help,
    }).label;
  };

  const save = async (e: FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setError(null);
    setLoading(true);
    try {
      const patch: Parameters<typeof updateLLMConfig>[0] = {
        backend,
        model,
        timeout: timeout ? Number(timeout) : null,
      };
      if (backend === 'ollama') patch.ollama_host = ollamaHost;
      if (keyInput) patch.api_keys = { [backend]: keyInput };
      apply(await updateLLMConfig(patch));
      setMessage(copy.llm.saveSuccess);
    } catch (err) {
      setError(getApiErrorMessage(err, copy.llm.saveError));
    } finally {
      setLoading(false);
    }
  };

  const clearKey = async () => {
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      apply(await updateLLMConfig({ api_keys: { [backend]: '' } }));
      setMessage(copy.llm.clearKeySuccess);
    } catch (err) {
      setError(getApiErrorMessage(err, copy.llm.clearKeyError));
    } finally {
      setLoading(false);
    }
  };

  const renderProviderOptionLabel = (item: ProviderInfo) => {
    const translated = getProviderCopy(language, item.key, { label: item.label, help: item.help });
    const suffix = item.paid ? copy.llm.paid : item.cloud ? 'Cloud' : copy.llm.localFree;
    return `${translated.label} - ${suffix}`;
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="card bg-slate-50 dark:bg-slate-800/40">
        <div className="text-sm text-slate-500 dark:text-slate-400">{copy.llm.activeConfig}</div>
        <div className="mt-1 font-mono text-sm text-slate-900 dark:text-white">
          {getEffectiveProviderLabel()} · {cfg.effective.model || copy.llm.effectiveFallback}
        </div>
        <p className="text-xs text-slate-400 mt-1">{copy.llm.effectiveHint}</p>
      </div>

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

      <form onSubmit={save} className="card space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
            {copy.llm.provider}
          </label>
          <select value={backend} onChange={(e) => setBackend(e.target.value)} className="input">
            {cfg.providers.map((item) => (
              <option key={item.key} value={item.key}>
                {renderProviderOptionLabel(item)}
              </option>
            ))}
          </select>
        </div>

        {provider && providerText ? (
          <div className="p-3 bg-indigo-50 dark:bg-indigo-900/20 border-l-4 border-indigo-400 rounded text-sm text-indigo-900 dark:text-indigo-200 space-y-1">
            <div className="flex flex-wrap gap-2">
              {provider.cloud ? (
                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-xs">
                  {copy.llm.cloud}
                </span>
              ) : null}
              {provider.paid ? (
                <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-xs">
                  {copy.llm.paid}
                </span>
              ) : null}
              {!provider.cloud ? (
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-xs">
                  {copy.llm.localFree}
                </span>
              ) : null}
            </div>
            <p>{providerText.help}</p>
            {provider.keys_url ? (
              <a
                href={provider.keys_url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline font-medium"
              >
                {copy.llm.getApiKey}
              </a>
            ) : null}
          </div>
        ) : null}

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
            {copy.llm.model} <span className="text-slate-400 font-normal">{copy.llm.modelHint}</span>
          </label>
          <input
            type="text"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            placeholder={provider?.default_model}
            className="input font-mono"
          />
        </div>

        {backend === 'ollama' ? (
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
              {copy.llm.ollamaHost}{' '}
              <span className="text-slate-400 font-normal">{copy.llm.ollamaHint}</span>
            </label>
            <input
              type="text"
              value={ollamaHost}
              onChange={(e) => setOllamaHost(e.target.value)}
              placeholder="http://ollama:11434"
              className="input font-mono"
            />
          </div>
        ) : null}

        {provider?.needs_key ? (
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
              {copy.llm.apiKey}
              {keyAlreadySet ? (
                <span className="text-emerald-600 font-normal"> {copy.llm.apiKeyAlreadySet}</span>
              ) : null}
            </label>
            <input
              type="password"
              value={keyInput}
              onChange={(e) => setKeyInput(e.target.value)}
              placeholder={keyAlreadySet ? copy.llm.apiKeyPlaceholderSet : copy.llm.apiKeyPlaceholderEmpty}
              className="input font-mono"
              autoComplete="off"
            />
            {keyAlreadySet ? (
              <button
                type="button"
                onClick={clearKey}
                disabled={loading}
                className="text-xs text-rose-600 hover:underline mt-1"
              >
                {copy.llm.clearStoredKey}
              </button>
            ) : null}
          </div>
        ) : null}

        <div>
          <label className="block text-sm font-medium text-slate-700 dark:text-slate-200 mb-1">
            {copy.llm.timeout} <span className="text-slate-400 font-normal">{copy.llm.timeoutHint}</span>
          </label>
          <input
            type="number"
            min={0}
            value={timeout}
            onChange={(e) => setTimeoutVal(e.target.value)}
            className="input w-32"
          />
        </div>

        <button type="submit" disabled={loading} className="btn-primary">
          {loading ? copy.llm.saving : copy.llm.save}
        </button>
      </form>

      <div className="p-3 bg-amber-50 dark:bg-amber-900/20 border-l-4 border-amber-400 rounded text-xs text-amber-900 dark:text-amber-200">
        <strong>{copy.llm.securityTitle}</strong> : {copy.llm.securityBody}
      </div>
    </div>
  );
}
