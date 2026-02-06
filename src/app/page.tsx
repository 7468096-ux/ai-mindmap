'use client';

import dynamic from 'next/dynamic';

// Динамический импорт для избежания SSR проблем с React Flow
const MindMap = dynamic(() => import('@/components/MindMap'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-screen bg-gray-950 flex items-center justify-center">
      <div className="text-white text-xl">Загрузка карты...</div>
    </div>
  ),
});

export default function Home() {
  return <MindMap />;
}
