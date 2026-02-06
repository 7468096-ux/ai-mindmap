'use client';

import { useState } from 'react';

interface Props { lang?: 'ru' | 'en'; }

interface Sample {
  age: number;
  income: number;
  label: string;
}

const SAMPLES: Sample[] = [
  { age: 25, income: 30, label: '❌' },
  { age: 35, income: 40, label: '❌' },
  { age: 45, income: 60, label: '✅' },
  { age: 30, income: 80, label: '✅' },
  { age: 55, income: 50, label: '✅' },
  { age: 22, income: 25, label: '❌' },
  { age: 40, income: 70, label: '✅' },
  { age: 28, income: 35, label: '❌' },
];

export default function DecisionTreeDemo({ lang = 'ru' }: Props) {
  const [age, setAge] = useState(35);
  const [income, setIncome] = useState(50);
  
  // Simple decision tree logic
  const step1 = age > 30;
  const step2 = step1 ? income > 45 : income > 60;
  const result = step2;
  
  const explanation = lang === 'ru' ? {
    title: '🎯 Что здесь происходит?',
    text: 'Дерево решений — это цепочка вопросов Да/Нет. На каждом узле проверяем условие и идём налево или направо. Дошли до листа — получили ответ.',
    hint: 'Меняй возраст и доход — смотри как меняется путь',
  } : {
    title: '🎯 What\'s happening?',
    text: 'Decision tree is a chain of Yes/No questions. At each node check condition and go left or right. Reached leaf — got answer.',
    hint: 'Change age and income — see how path changes',
  };
  
  const labels = lang === 'ru' 
    ? { age: 'Возраст', income: 'Доход', approve: 'Одобрить кредит', deny: 'Отказать' }
    : { age: 'Age', income: 'Income', approve: 'Approve loan', deny: 'Deny' };
  
  return (
    <div className="bg-gray-800 rounded-lg p-3">
      <div className="mb-3 p-2 bg-gray-700/50 rounded text-xs">
        <div className="text-amber-400 font-medium mb-1">{explanation.title}</div>
        <div className="text-gray-300 leading-relaxed">{explanation.text}</div>
        <div className="text-gray-500 mt-1 italic">{explanation.hint}</div>
      </div>
      
      {/* Tree visualization */}
      <div className="relative h-32 mb-3">
        <svg width="280" height="120" className="absolute inset-0">
          {/* Lines */}
          <line x1="140" y1="20" x2="70" y2="55" stroke={step1 ? '#374151' : '#10b981'} strokeWidth="2" />
          <line x1="140" y1="20" x2="210" y2="55" stroke={step1 ? '#10b981' : '#374151'} strokeWidth="2" />
          <line x1="70" y1="65" x2="35" y2="100" stroke={!step1 && !step2 ? '#ef4444' : '#374151'} strokeWidth="2" />
          <line x1="70" y1="65" x2="105" y2="100" stroke={!step1 && step2 ? '#10b981' : '#374151'} strokeWidth="2" />
          <line x1="210" y1="65" x2="175" y2="100" stroke={step1 && !step2 ? '#ef4444' : '#374151'} strokeWidth="2" />
          <line x1="210" y1="65" x2="245" y2="100" stroke={step1 && step2 ? '#10b981' : '#374151'} strokeWidth="2" />
        </svg>
        
        {/* Root node */}
        <div className={`absolute left-1/2 top-0 -translate-x-1/2 px-2 py-1 rounded text-xs font-medium ${
          true ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-400'
        }`}>
          {labels.age} &gt; 30?
        </div>
        
        {/* Level 2 nodes */}
        <div className={`absolute left-[15%] top-12 px-2 py-1 rounded text-xs ${
          !step1 ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-400'
        }`}>
          {labels.income} &gt; 60?
        </div>
        <div className={`absolute right-[15%] top-12 px-2 py-1 rounded text-xs ${
          step1 ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-400'
        }`}>
          {labels.income} &gt; 45?
        </div>
        
        {/* Leaf nodes */}
        <div className={`absolute left-[5%] top-24 px-2 py-1 rounded text-xs ${
          !step1 && !step2 ? 'bg-red-600 text-white ring-2 ring-red-400' : 'bg-gray-700 text-gray-400'
        }`}>
          ❌
        </div>
        <div className={`absolute left-[28%] top-24 px-2 py-1 rounded text-xs ${
          !step1 && step2 ? 'bg-green-600 text-white ring-2 ring-green-400' : 'bg-gray-700 text-gray-400'
        }`}>
          ✅
        </div>
        <div className={`absolute right-[28%] top-24 px-2 py-1 rounded text-xs ${
          step1 && !step2 ? 'bg-red-600 text-white ring-2 ring-red-400' : 'bg-gray-700 text-gray-400'
        }`}>
          ❌
        </div>
        <div className={`absolute right-[5%] top-24 px-2 py-1 rounded text-xs ${
          step1 && step2 ? 'bg-green-600 text-white ring-2 ring-green-400' : 'bg-gray-700 text-gray-400'
        }`}>
          ✅
        </div>
      </div>
      
      {/* Controls */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-xs w-16">{labels.age}:</span>
          <input type="range" min="20" max="60" value={age} onChange={(e) => setAge(parseInt(e.target.value))}
            className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
          <span className="text-white text-xs w-8 text-right">{age}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-gray-400 text-xs w-16">{labels.income}:</span>
          <input type="range" min="20" max="100" value={income} onChange={(e) => setIncome(parseInt(e.target.value))}
            className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-amber-500" />
          <span className="text-white text-xs w-8 text-right">{income}k</span>
        </div>
      </div>
      
      {/* Result */}
      <div className={`mt-3 text-center py-2 rounded text-sm font-medium ${
        result ? 'bg-green-900/50 text-green-400' : 'bg-red-900/50 text-red-400'
      }`}>
        {result ? `✅ ${labels.approve}` : `❌ ${labels.deny}`}
      </div>
    </div>
  );
}
