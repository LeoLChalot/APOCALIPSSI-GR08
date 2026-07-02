import { useId, useState, type FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { generateQuiz } from '@/api/llm';
import { getApiErrorMessage } from '@/api/errors';
import { useLanguage } from '@/contexts/LanguageContext';

export default function UploadPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { language } = useLanguage();
  const titleId = useId();
  const sourceTextId = useId();
  const sourceTextHintId = useId();
  const pdfId = useId();
  const [title, setTitle] = useState('');
  const [mode, setMode] = useState<'pdf' | 'text'>('text');
  const [pdf, setPdf] = useState<File | null>(null);
  const [sourceText, setSourceText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const quiz = await generateQuiz({
        title,
        pdf: mode === 'pdf' ? (pdf ?? undefined) : undefined,
        source_text: mode === 'text' ? sourceText : undefined,
        lang: language,
      });
      navigate(`/quiz/${quiz.id}`);
    } catch (err) {
      setError(getApiErrorMessage(err, t('upload.generationError')));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">{t('upload.title')}</h1>
      <p className="text-slate-600 mb-2">{t('upload.intro')}</p>
      <p className="text-sm text-slate-500 mb-6">{t('upload.languageUsed')}</p>

      {error && (
        <div
          role="alert"
          className="mb-4 p-3 bg-rose-50 border-l-4 border-rose-500 text-sm text-rose-900 rounded"
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="card space-y-4">
        <div>
          <label htmlFor={titleId} className="block text-sm font-medium text-slate-700 mb-1">
            {t('upload.titleLabel')}
          </label>
          <input
            id={titleId}
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder={t('upload.titlePlaceholder')}
            className="input"
          />
        </div>

        <fieldset>
          <legend className="block text-sm font-medium text-slate-700 mb-2">
            {t('upload.inputModeLabel')}
          </legend>
          <div className="flex gap-2 mb-3" role="group" aria-label={t('upload.inputModeLabel')}>
            <button
              type="button"
              onClick={() => setMode('text')}
              aria-pressed={mode === 'text'}
              className={`px-3 py-1 rounded text-sm font-medium ${
                mode === 'text'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              📝 {t('upload.modeText')}
            </button>
            <button
              type="button"
              onClick={() => setMode('pdf')}
              aria-pressed={mode === 'pdf'}
              className={`px-3 py-1 rounded text-sm font-medium ${
                mode === 'pdf'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              📄 {t('upload.modePdf')}
            </button>
          </div>

          {mode === 'text' ? (
            <>
              <label htmlFor={sourceTextId} className="sr-only">
                {t('upload.modeText')}
              </label>
              <textarea
                id={sourceTextId}
                required
                rows={10}
                minLength={200}
                value={sourceText}
                onChange={(e) => setSourceText(e.target.value)}
                placeholder={t('upload.textPlaceholder')}
                aria-describedby={sourceTextHintId}
                className="input"
              />
            </>
          ) : (
            <>
              <label htmlFor={pdfId} className="sr-only">
                {t('upload.modePdf')}
              </label>
              <input
                id={pdfId}
                type="file"
                accept=".pdf,application/pdf"
                required
                onChange={(e) => setPdf(e.target.files?.[0] ?? null)}
                className="input"
              />
            </>
          )}
          {mode === 'text' && (
            <p id={sourceTextHintId} className="text-xs text-slate-500 mt-1">
              {t('upload.textHint', { count: sourceText.length })}
            </p>
          )}
        </fieldset>

        <button type="submit" disabled={loading} className="btn-primary w-full">
          {loading ? (
            <>
              <span className="animate-spin" aria-hidden="true">
                ⏳
              </span>{' '}
              {t('upload.submitting')}
            </>
          ) : (
            <>🚀 {t('upload.submit')}</>
          )}
        </button>

        <p className="text-xs text-slate-500 text-center">{t('upload.durationHint')}</p>
      </form>
    </div>
  );
}
