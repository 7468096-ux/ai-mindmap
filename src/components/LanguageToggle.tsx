'use client';

import { Language } from '@/data/nodes';

interface LanguageToggleProps {
  lang: Language;
  onChange: (lang: Language) => void;
}

export default function LanguageToggle({ lang, onChange }: LanguageToggleProps) {
  return (
    <div className="flex bg-gray-800 rounded-lg p-1 gap-1">
      <button
        onClick={() => onChange('ru')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          lang === 'ru' 
            ? 'bg-indigo-600 text-white' 
            : 'text-gray-400 hover:text-white'
        }`}
      >
        🇷🇺 RU
      </button>
      <button
        onClick={() => onChange('en')}
        className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
          lang === 'en' 
            ? 'bg-indigo-600 text-white' 
            : 'text-gray-400 hover:text-white'
        }`}
      >
        🇬🇧 EN
      </button>
    </div>
  );
}
