import { useState } from 'react';
import { getAdminCopy } from '@/content/profileAdminCopy';
import { useLanguage } from '@/contexts/LanguageContext';
import DataTab from './DataTab';
import LLMConfigTab from './LLMConfigTab';
import OverviewTab from './OverviewTab';
import SiteConfigTab from './SiteConfigTab';
import UsersTab from './UsersTab';

type TabKey = 'overview' | 'llm' | 'site' | 'users' | 'data';

export default function AdminPage() {
  const [tab, setTab] = useState<TabKey>('overview');
  const { language } = useLanguage();
  const copy = getAdminCopy(language);

  const tabs: { key: TabKey; label: string }[] = [
    { key: 'overview', label: copy.tabs.overview },
    { key: 'llm', label: copy.tabs.llm },
    { key: 'site', label: copy.tabs.site },
    { key: 'users', label: copy.tabs.users },
    { key: 'data', label: copy.tabs.data },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">{copy.title}</h1>
        <p className="text-slate-500 dark:text-slate-400 text-sm">{copy.intro}</p>
      </div>

      <div className="border-b border-slate-200 dark:border-slate-700 flex flex-wrap gap-1">
        {tabs.map((item) => (
          <button
            key={item.key}
            onClick={() => setTab(item.key)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition ${
              tab === item.key
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {tab === 'overview' ? <OverviewTab /> : null}
      {tab === 'llm' ? <LLMConfigTab /> : null}
      {tab === 'site' ? <SiteConfigTab /> : null}
      {tab === 'users' ? <UsersTab /> : null}
      {tab === 'data' ? <DataTab /> : null}
    </div>
  );
}
