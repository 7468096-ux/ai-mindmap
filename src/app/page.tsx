'use client';

import dynamic from 'next/dynamic';
import './space.css';

// Динамический импорт для избежания SSR проблем
const SpaceMindMap = dynamic(() => import('@/components/SpaceMindMap'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-white text-xl animate-pulse">🌌 Загрузка...</div>
    </div>
  ),
});

export default function Home() {
  return <SpaceMindMap />;
}
