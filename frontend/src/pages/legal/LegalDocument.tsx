import { Link } from 'react-router-dom';
import type { LegalDocumentData } from '@/content/legalContent';

export default function LegalDocument({ document }: { document: LegalDocumentData }) {
  return (
    <article className="max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">{document.title}</h1>

      {document.subtitle ? (
        <p className="text-slate-600 dark:text-slate-400 mb-6">{document.subtitle}</p>
      ) : null}

      {document.meta?.map((line, index) => (
        <p
          key={`${line}-${index}`}
          className={
            index === 0
              ? 'text-slate-600 dark:text-slate-400 mb-1'
              : 'text-slate-500 dark:text-slate-500 text-sm mb-6'
          }
        >
          {line}
        </p>
      ))}

      {document.intro ? (
        <p className="text-slate-700 dark:text-slate-300 mb-6">{document.intro}</p>
      ) : null}

      <div className="space-y-6 text-slate-700 dark:text-slate-300">
        {document.sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
              {section.title}
            </h2>

            {section.paragraphs?.map((paragraph, index) => (
              <p key={`${section.title}-p-${index}`} className={index > 0 ? 'mt-2' : undefined}>
                {paragraph}
              </p>
            ))}

            {section.link ? (
              <p>
                {section.link.textBefore}
                <Link to={section.link.to} className="text-indigo-600 underline hover:no-underline">
                  {section.link.label}
                </Link>
                {section.link.textAfter ?? ''}
              </p>
            ) : null}

            {section.bullets ? (
              <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
                {section.bullets.map((item, index) => (
                  <li key={`${section.title}-li-${index}`}>{item}</li>
                ))}
              </ul>
            ) : null}

            {section.table ? (
              <div className="mt-3 overflow-x-auto">
                <table className="w-full text-sm border border-slate-200 dark:border-slate-700">
                  <thead className="bg-slate-50 dark:bg-slate-800">
                    <tr>
                      {section.table.headers.map((header) => (
                        <th
                          key={`${section.title}-${header}`}
                          className="text-left p-2 border-b border-slate-200 dark:border-slate-700"
                        >
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {section.table.rows.map((row, rowIndex) => (
                      <tr key={`${section.title}-row-${rowIndex}`}>
                        {row.map((cell, cellIndex) => {
                          const isLastRow = rowIndex === section.table!.rows.length - 1;
                          const className =
                            cellIndex === 0
                              ? `p-2 font-mono text-xs${
                                  !isLastRow ? ' border-b border-slate-200 dark:border-slate-700' : ''
                                }`
                              : `p-2${
                                  !isLastRow ? ' border-b border-slate-200 dark:border-slate-700' : ''
                                }`;
                          return (
                            <td key={`${section.title}-cell-${rowIndex}-${cellIndex}`} className={className}>
                              {cell}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}

            {section.warning ? (
              <p className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded text-sm text-amber-800 dark:text-amber-200">
                {section.warning}
              </p>
            ) : null}
          </section>
        ))}
      </div>

      <p className="text-xs text-slate-400 mt-10 pt-4 border-t border-slate-200 dark:border-slate-700">
        {document.footer}
      </p>
    </article>
  );
}
