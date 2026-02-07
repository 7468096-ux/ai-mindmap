'use client';

import { Comparison } from '@/data/comparisons';
import { Language } from '@/data/nodes';

interface Props {
  comparison: Comparison;
  currentNodeId: string;
  lang: Language;
}

export default function ComparisonTable({ comparison, currentNodeId, lang }: Props) {
  const scoreColors = {
    good: 'text-green-400 bg-green-400/10',
    medium: 'text-yellow-400 bg-yellow-400/10',
    bad: 'text-red-400 bg-red-400/10',
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-gray-700">
            <th className="text-left p-2 text-gray-500 font-normal">
              {lang === 'ru' ? 'Критерий' : 'Criteria'}
            </th>
            {comparison.algorithms.map(alg => (
              <th 
                key={alg} 
                className={`p-2 text-center font-medium ${
                  alg === currentNodeId ? 'text-purple-400' : 'text-gray-400'
                }`}
              >
                {comparison.algorithmLabels[alg]}
                {alg === currentNodeId && ' ◀'}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {comparison.rows.map((row, i) => (
            <tr key={i} className="border-b border-gray-800/50">
              <td className="p-2 text-gray-400">
                {row.criterion[lang]}
              </td>
              {comparison.algorithms.map(alg => {
                const value = row.values[alg];
                return (
                  <td 
                    key={alg} 
                    className={`p-2 text-center ${scoreColors[value.score]} ${
                      alg === currentNodeId ? 'font-medium' : ''
                    }`}
                  >
                    {value.text}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
