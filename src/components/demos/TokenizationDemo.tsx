'use client';

import { useState, useMemo } from 'react';

interface Props { lang?: 'ru' | 'en'; }

// Simple BPE-like tokenization simulation
const VOCAB: Record<string, string[]> = {
  'Hello world!': ['Hello', ' world', '!'],
  'Machine learning is fun': ['Machine', ' learn', 'ing', ' is', ' fun'],
  'I love artificial intelligence': ['I', ' love', ' art', 'ificial', ' intelligence'],
  'Tokenization splits text': ['Token', 'ization', ' splits', ' text'],
  'GPT uses BPE tokens': ['G', 'PT', ' uses', ' B', 'PE', ' tokens'],
  'Привет мир': ['При', 'вет', ' мир'],
  'Машинное обучение': ['Маш', 'ин', 'ное', ' об', 'учение'],
  'Нейронные сети': ['Ней', 'рон', 'ные', ' сети'],
  'The quick brown fox': ['The', ' quick', ' brown', ' fox'],
  'Deep neural networks': ['Deep', ' neural', ' networks'],
};

const EXAMPLES = Object.keys(VOCAB);

const COLORS = [
  'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
  'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-cyan-500',
  'bg-orange-500', 'bg-teal-500'
];

export default function TokenizationDemo({ lang = 'ru' }: Props) {
  const [exampleIdx, setExampleIdx] = useState(0);
  const [customText, setCustomText] = useState('');
  const [useCustom, setUseCustom] = useState(false);
  
  const text = useCustom ? customText : EXAMPLES[exampleIdx];
  
  const tokens = useMemo(() => {
    if (VOCAB[text]) return VOCAB[text];
    // Simple fallback tokenization for custom text
    return text.split(/(\s+)/).filter(t => t.length > 0).flatMap(word => {
      if (word.trim() === '') return [word];
      if (word.length <= 4) return [word];
      // Split longer words
      const parts = [];
      for (let i = 0; i < word.length; i += 3) {
        parts.push(word.slice(i, i + 3));
      }
      return parts;
    });
  }, [text]);
  
  const explanation = lang === 'ru' ? {
    title: '🎯 Что здесь происходит?',
    text: 'Модель не понимает буквы — она работает с токенами (кусочками слов). Частые слова = 1 токен. Редкие разбиваются на части. Каждый токен → число → вектор.',
    hint: 'Русский текст обычно занимает больше токенов чем английский',
  } : {
    title: '🎯 What\'s happening?',
    text: 'Model doesn\'t understand letters — it works with tokens (word pieces). Common words = 1 token. Rare ones split into parts. Each token → number → vector.',
    hint: 'Non-English text usually takes more tokens',
  };
  
  return (
    <div className="bg-gray-800 rounded-lg p-3">
      <div className="mb-3 p-2 bg-gray-700/50 rounded text-xs">
        <div className="text-amber-400 font-medium mb-1">{explanation.title}</div>
        <div className="text-gray-300 leading-relaxed">{explanation.text}</div>
        <div className="text-gray-500 mt-1 italic">{explanation.hint}</div>
      </div>
      
      {/* Input text */}
      <div className="mb-3">
        <div className="text-gray-400 text-xs mb-1">{lang === 'ru' ? 'Текст:' : 'Text:'}</div>
        <div className="bg-gray-900 rounded p-2 text-sm text-white font-mono">
          {text || (lang === 'ru' ? 'Введите текст...' : 'Enter text...')}
        </div>
      </div>
      
      {/* Tokens visualization */}
      <div className="mb-3">
        <div className="text-gray-400 text-xs mb-1">
          {lang === 'ru' ? `Токены (${tokens.length}):` : `Tokens (${tokens.length}):`}
        </div>
        <div className="flex flex-wrap gap-1">
          {tokens.map((token, i) => (
            <span 
              key={i}
              className={`${COLORS[i % COLORS.length]} text-white text-xs px-2 py-1 rounded font-mono`}
            >
              {token.replace(/ /g, '␣')}
            </span>
          ))}
        </div>
      </div>
      
      {/* Token IDs */}
      <div className="mb-3">
        <div className="text-gray-400 text-xs mb-1">
          {lang === 'ru' ? 'ID токенов:' : 'Token IDs:'}
        </div>
        <div className="flex flex-wrap gap-1">
          {tokens.map((_, i) => (
            <span key={i} className="bg-gray-700 text-gray-300 text-xs px-2 py-1 rounded font-mono">
              {1000 + i * 127 + Math.floor(Math.random() * 50)}
            </span>
          ))}
        </div>
      </div>
      
      {/* Example selector */}
      <div className="flex flex-wrap justify-center gap-1 mb-2">
        {EXAMPLES.slice(0, 10).map((_, i) => (
          <button
            key={i}
            onClick={() => { setExampleIdx(i); setUseCustom(false); }}
            className={`w-6 h-6 text-xs rounded ${
              !useCustom && exampleIdx === i ? 'bg-indigo-600 text-white' : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
            }`}
          >
            {i + 1}
          </button>
        ))}
      </div>
      
      {/* Custom input */}
      <input
        type="text"
        placeholder={lang === 'ru' ? 'Или введи свой текст...' : 'Or type your own...'}
        value={customText}
        onChange={(e) => { setCustomText(e.target.value); setUseCustom(true); }}
        className="w-full bg-gray-900 text-white text-xs px-2 py-1 rounded border border-gray-700 focus:border-indigo-500 outline-none"
      />
    </div>
  );
}
