'use client';

import { useState } from 'react';
import { Language } from '@/data/nodes';

interface Model {
  name: string;
  emoji: string;
  type: { en: string; ru: string };
  year: number;
  params: string;
  task: { en: string; ru: string };
  speed: number; // 1-5
  accuracy: number; // 1-5
  cost: number; // 1-5 (1=cheap)
}

const models: Model[] = [
  { name: 'Linear Reg', emoji: '📈', type: { en: 'Classic ML', ru: 'Классический ML' }, year: 1805, params: '~10', task: { en: 'Regression', ru: 'Регрессия' }, speed: 5, accuracy: 2, cost: 1 },
  { name: 'Decision Tree', emoji: '🌳', type: { en: 'Classic ML', ru: 'Классический ML' }, year: 1986, params: '~100', task: { en: 'Classification', ru: 'Классификация' }, speed: 5, accuracy: 3, cost: 1 },
  { name: 'XGBoost', emoji: '🚀', type: { en: 'Ensemble', ru: 'Ансамбль' }, year: 2014, params: '~10K', task: { en: 'Tabular data', ru: 'Табличные данные' }, speed: 4, accuracy: 4, cost: 1 },
  { name: 'CNN (ResNet)', emoji: '👁️', type: { en: 'Deep Learning', ru: 'Deep Learning' }, year: 2015, params: '25M', task: { en: 'Images', ru: 'Изображения' }, speed: 3, accuracy: 4, cost: 2 },
  { name: 'LSTM', emoji: '🧠', type: { en: 'Deep Learning', ru: 'Deep Learning' }, year: 1997, params: '~1M', task: { en: 'Sequences', ru: 'Последовательности' }, speed: 3, accuracy: 3, cost: 2 },
  { name: 'BERT', emoji: '🔤', type: { en: 'Transformer', ru: 'Transformer' }, year: 2018, params: '340M', task: { en: 'NLU', ru: 'Понимание текста' }, speed: 3, accuracy: 4, cost: 3 },
  { name: 'GPT-4', emoji: '💬', type: { en: 'LLM', ru: 'LLM' }, year: 2023, params: '~1.7T', task: { en: 'Everything', ru: 'Всё' }, speed: 2, accuracy: 5, cost: 5 },
  { name: 'Claude', emoji: '🤖', type: { en: 'LLM', ru: 'LLM' }, year: 2023, params: '~1T', task: { en: 'Reasoning', ru: 'Reasoning' }, speed: 2, accuracy: 5, cost: 5 },
  { name: 'CLIP', emoji: '🔗', type: { en: 'Multimodal', ru: 'Мультимодальный' }, year: 2021, params: '400M', task: { en: 'Image+Text', ru: 'Изображения+Текст' }, speed: 3, accuracy: 4, cost: 3 },
  { name: 'Stable Diff', emoji: '🎨', type: { en: 'Diffusion', ru: 'Диффузия' }, year: 2022, params: '860M', task: { en: 'Image gen', ru: 'Генерация изобр.' }, speed: 2, accuracy: 4, cost: 4 },
  { name: 'YOLO v8', emoji: '⚡', type: { en: 'Detection', ru: 'Детекция' }, year: 2023, params: '~25M', task: { en: 'Object detect', ru: 'Детекция объектов' }, speed: 5, accuracy: 4, cost: 2 },
  { name: 'ViT', emoji: '🔲', type: { en: 'Vision Transformer', ru: 'Vision Transformer' }, year: 2020, params: '86M', task: { en: 'Image classif.', ru: 'Классиф. изобр.' }, speed: 3, accuracy: 5, cost: 3 },
];

const dots = (n: number, color: string) => (
  <div className="flex gap-0.5">
    {[1,2,3,4,5].map(i => (
      <div key={i} className={`w-2 h-2 rounded-full ${i <= n ? color : 'bg-gray-700'}`} />
    ))}
  </div>
);

interface Props {
  lang: Language;
  isOpen: boolean;
  onClose: () => void;
}

export default function ModelComparisonPanel({ lang, isOpen, onClose }: Props) {
  const [sortBy, setSortBy] = useState<'name' | 'year' | 'accuracy' | 'speed'>('year');

  if (!isOpen) return null;

  const sorted = [...models].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'year') return b.year - a.year;
    if (sortBy === 'accuracy') return b.accuracy - a.accuracy;
    if (sortBy === 'speed') return b.speed - a.speed;
    return 0;
  });

  const t = {
    en: { title: 'Model Comparison', subtitle: 'Compare AI models at a glance', sortBy: 'Sort', name: 'Name', year: 'Year', accuracy: 'Accuracy', speed: 'Speed', cost: 'Cost', params: 'Params', task: 'Task' },
    ru: { title: 'Сравнение моделей', subtitle: 'Модели AI на одном экране', sortBy: 'Сортировка', name: 'Имя', year: 'Год', accuracy: 'Точность', speed: 'Скорость', cost: 'Стоимость', params: 'Параметры', task: 'Задача' },
  }[lang];

  return (
    <>
      <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
      <div className="fixed inset-x-2 bottom-2 md:inset-x-auto md:bottom-auto md:right-4 md:top-16 md:w-[480px] z-50 max-h-[80vh] md:max-h-[85vh] overflow-hidden bg-gray-900/95 backdrop-blur rounded-2xl shadow-2xl border border-gray-700 flex flex-col"
        onMouseDown={e => e.stopPropagation()} onTouchStart={e => e.stopPropagation()}>
        <div className="p-4 border-b border-gray-700 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-white font-bold text-lg">📊 {t.title}</h2>
              <p className="text-gray-400 text-xs">{t.subtitle}</p>
            </div>
            <button onClick={onClose} className="text-white/60 hover:text-white text-xl w-8 h-8 flex items-center justify-center bg-black/20 rounded-full">×</button>
          </div>
          <div className="flex gap-1 mt-3">
            {(['year', 'accuracy', 'speed', 'name'] as const).map(s => (
              <button key={s} onClick={() => setSortBy(s)}
                className={`px-2 py-1 rounded text-xs ${sortBy === s ? 'bg-purple-600 text-white' : 'bg-gray-800 text-gray-400'}`}>
                {t[s]}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {sorted.map((m, i) => (
            <div key={i} className="flex items-center gap-3 px-4 py-3 border-b border-gray-800/50 hover:bg-gray-800/30">
              <span className="text-xl">{m.emoji}</span>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-white text-sm font-semibold">{m.name}</span>
                  <span className="text-gray-500 text-[10px] font-mono">{m.year}</span>
                </div>
                <div className="text-gray-500 text-[10px]">{m.type[lang]} • {m.params} {t.params} • {m.task[lang]}</div>
                <div className="flex gap-4 mt-1">
                  <div className="flex items-center gap-1">
                    <span className="text-[9px] text-gray-500">{t.speed}</span>
                    {dots(m.speed, 'bg-green-500')}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[9px] text-gray-500">{t.accuracy}</span>
                    {dots(m.accuracy, 'bg-purple-500')}
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-[9px] text-gray-500">{t.cost}</span>
                    {dots(m.cost, 'bg-amber-500')}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
