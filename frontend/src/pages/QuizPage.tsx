import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getQuiz, submitAnswers, type Quiz, type AnswerResult } from '@/api/quizzes';

export default function QuizPage() {
  const { id } = useParams<{ id: string }>();
  const quizId = Number(id);
  const { t } = useTranslation();

  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [result, setResult] = useState<AnswerResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    getQuiz(quizId)
      .then(setQuiz)
      .catch(() => setError(t('quiz.loadError')))
      .finally(() => setLoading(false));
  }, [quizId, t]);

  const handleSelect = (questionIndex: number, optionIndex: number) => {
    if (result) return; // déjà soumis
    setAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const handleSubmit = async () => {
    if (!quiz || Object.keys(answers).length !== 10) return;
    setSubmitting(true);
    try {
      const payload = quiz.questions.map((q) => ({
        index: q.index,
        selected_index: answers[q.index]!,
      }));
      const res = await submitAnswers(quiz.id, payload);
      setResult(res);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch {
      setError(t('quiz.submitError'));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <p className="text-slate-500">{t('common.loading')}</p>;
  if (error) return <p className="text-rose-600">{error}</p>;
  if (!quiz) return null;

  const allAnswered = Object.keys(answers).length === 10;

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* En-tête */}
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{quiz.title}</h1>
        <p className="text-sm text-slate-500">
          {t('quiz.meta', { id: quiz.id, count: quiz.questions.length })}
        </p>
      </div>

      {/* Résultat */}
      {result && (
        <div
          role="status"
          aria-live="polite"
          className={`card border-l-4 ${
            result.score >= 7
              ? 'border-emerald-500 bg-emerald-50'
              : result.score >= 4
                ? 'border-amber-500 bg-amber-50'
                : 'border-rose-500 bg-rose-50'
          }`}
        >
          <h2 className="text-3xl font-bold text-slate-900 mb-2">
            {t('quiz.score', { score: result.score, total: result.total })}
          </h2>
          <p className="text-slate-700">
            {result.score === 10
              ? t('quiz.resultPerfect')
              : result.score >= 7
                ? t('quiz.resultGood')
                : result.score >= 4
                  ? t('quiz.resultAverage')
                  : t('quiz.resultPoor')}
          </p>
          <Link to="/history" className="btn-secondary mt-4 inline-flex">
            {t('quiz.returnHistory')}
          </Link>
        </div>
      )}

      {/* Questions */}
      {quiz.questions.map((q) => {
        const userChoice = answers[q.index];
        const detail = result?.details.find((d) => d.index === q.index);

        return (
          <fieldset key={q.index} className="card">
            <legend className="w-full mb-3">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-sm text-indigo-600">
                  {t('quiz.questionLabel', { index: q.index })}
                </span>
                <span className="font-semibold text-slate-900">{q.prompt}</span>
              </div>
            </legend>
            <p className="sr-only">{t('quiz.radioHint')}</p>
            <div className="space-y-2">
              {q.options.map((opt, optIdx) => {
                const isSelected = userChoice === optIdx;
                const isCorrect = detail && q.correct_index === optIdx;
                const isWrongPick = detail && isSelected && !detail.correct;

                let cls = 'border-slate-200 hover:bg-slate-50';
                if (result) {
                  if (isCorrect) cls = 'border-emerald-500 bg-emerald-50';
                  else if (isWrongPick) cls = 'border-rose-500 bg-rose-50';
                  else cls = 'border-slate-200 opacity-60';
                } else if (isSelected) {
                  cls = 'border-indigo-500 bg-indigo-50';
                }

                return (
                  <label
                    key={optIdx}
                    className={`flex items-start gap-3 w-full p-3 border-2 rounded transition cursor-pointer ${cls} ${
                      result ? 'cursor-default' : ''
                    }`}
                  >
                    <input
                      type="radio"
                      name={`question-${q.index}`}
                      value={optIdx}
                      checked={isSelected}
                      disabled={!!result}
                      onChange={() => handleSelect(q.index, optIdx)}
                      className="mt-1 h-4 w-4 shrink-0 accent-indigo-600"
                      aria-label={t('quiz.choiceLabel', {
                        letter: String.fromCharCode(65 + optIdx),
                      })}
                    />
                    <span className="flex-1">
                      <span className="font-mono mr-2 text-slate-500" aria-hidden="true">
                        {String.fromCharCode(65 + optIdx)}.
                      </span>
                      {opt}
                    </span>
                    {result && isCorrect && (
                      <span className="ml-2 text-emerald-700 font-semibold text-sm">
                        {t('quiz.correctBadge')}
                      </span>
                    )}
                    {result && isWrongPick && (
                      <span className="ml-2 text-rose-700 font-semibold text-sm">
                        {t('quiz.incorrectBadge')}
                      </span>
                    )}
                  </label>
                );
              })}
            </div>
          </fieldset>
        );
      })}

      {/* Soumission */}
      {!result && (
        <button
          onClick={handleSubmit}
          disabled={!allAnswered || submitting}
          className="btn-signature w-full py-3 text-base"
        >
          {submitting
            ? t('quiz.submitting')
            : allAnswered
              ? `🎯 ${t('quiz.submit')}`
              : t('quiz.answerAll', { count: Object.keys(answers).length })}
        </button>
      )}
    </div>
  );
}
