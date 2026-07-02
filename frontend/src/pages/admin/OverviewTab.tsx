import { useEffect, useState } from 'react';
import { getAdminStats, type AdminStats } from '@/api/admin';
import { getApiErrorMessage } from '@/api/errors';
import { getAdminCopy } from '@/content/profileAdminCopy';
import { useLanguage } from '@/contexts/LanguageContext';

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="card">
      <div className="text-sm text-slate-500 dark:text-slate-400">{label}</div>
      <div className="text-3xl font-bold text-slate-900 dark:text-white mt-1">{value}</div>
    </div>
  );
}

export default function OverviewTab() {
  const { language } = useLanguage();
  const copy = getAdminCopy(language);
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getAdminStats()
      .then(setStats)
      .catch((err) => setError(getApiErrorMessage(err, copy.loadError)));
  }, [copy.loadError]);

  if (error) return <p className="text-rose-600">{error}</p>;
  if (!stats) return <p className="text-slate-500 dark:text-slate-400">{copy.loading}</p>;

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      <Stat label={copy.overview.users} value={stats.users_total} />
      <Stat label={copy.overview.activeUsers} value={stats.users_active} />
      <Stat label={copy.overview.administrators} value={stats.users_staff} />
      <Stat label={copy.overview.quizzesCreated} value={stats.quizzes_total} />
      <Stat label={copy.overview.quizzesTaken} value={stats.quizzes_taken} />
      <Stat
        label={copy.overview.averageScore}
        value={
          stats.average_score !== null
            ? `${stats.average_score}/10`
            : copy.overview.noScore
        }
      />
      <Stat label={copy.overview.totalQuestions} value={stats.questions_total} />
    </div>
  );
}
