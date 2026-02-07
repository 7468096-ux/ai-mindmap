'use client';

import { useState, useEffect } from 'react';

type Language = 'ru' | 'en';

interface Props {
  lang?: Language;
}

export default function ViTDemo({ lang = 'en' }: Props) {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPatch, setSelectedPatch] = useState<number | null>(null);
  
  const texts = {
    ru: {
      title: '👁️ ViT — Vision Transformer',
      desc: 'Смотри как изображение обрабатывается трансформером',
      play: 'Запустить',
      pause: 'Пауза',
      reset: 'Сброс',
      step: 'Шаг',
      stages: [
        'Исходное изображение',
        'Разбиение на патчи 16×16',
        'Линейная проекция патчей',
        'Добавление CLS токена + позиции',
        'Self-Attention между всеми патчами',
        'Классификация по CLS токену',
      ],
      patch: 'Патч',
      cls: 'CLS токен',
      position: 'Позиция',
      classification: 'Класс: 🐱 Кот',
      hint: 'ViT разбивает изображение на патчи и обрабатывает их как последовательность токенов',
    },
    en: {
      title: '👁️ ViT — Vision Transformer',
      desc: 'Watch how an image is processed by a transformer',
      play: 'Play',
      pause: 'Pause',
      reset: 'Reset',
      step: 'Step',
      stages: [
        'Original image',
        'Split into 16×16 patches',
        'Linear projection of patches',
        'Add CLS token + positions',
        'Self-Attention between all patches',
        'Classification via CLS token',
      ],
      patch: 'Patch',
      cls: 'CLS token',
      position: 'Position',
      classification: 'Class: 🐱 Cat',
      hint: 'ViT splits the image into patches and processes them as a sequence of tokens',
    },
  };
  const t = texts[lang];

  // Generate a simple cat-like pattern
  const patchColors = [
    '#4a4a4a', '#3a3a3a', '#3a3a3a', '#4a4a4a',
    '#3a3a3a', '#f59e0b', '#f59e0b', '#3a3a3a',
    '#3a3a3a', '#f59e0b', '#f59e0b', '#3a3a3a',
    '#4a4a4a', '#3a3a3a', '#3a3a3a', '#4a4a4a',
  ];

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setStep(s => {
        if (s >= 5) {
          setIsPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, 1500);
    return () => clearInterval(timer);
  }, [isPlaying]);

  const handleReset = () => {
    setStep(0);
    setIsPlaying(false);
    setSelectedPatch(null);
  };

  // Attention weights for visualization
  const getAttentionOpacity = (patchIdx: number) => {
    if (step < 4 || selectedPatch === null) return 0;
    if (patchIdx === selectedPatch) return 1;
    // Nearby patches get more attention
    const row1 = Math.floor(selectedPatch / 4);
    const col1 = selectedPatch % 4;
    const row2 = Math.floor(patchIdx / 4);
    const col2 = patchIdx % 4;
    const dist = Math.abs(row1 - row2) + Math.abs(col1 - col2);
    return Math.max(0.2, 1 - dist * 0.2);
  };

  return (
    <div style={{ padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 8px 0', color: '#8b5cf6' }}>{t.title}</h3>
      <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#aaa' }}>{t.desc}</p>
      
      {/* Controls */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          disabled={step >= 5 && !isPlaying}
          style={{
            background: isPlaying ? '#ef4444' : '#22c55e',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 16px',
            cursor: step >= 5 && !isPlaying ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            opacity: step >= 5 && !isPlaying ? 0.5 : 1,
          }}
        >
          {isPlaying ? t.pause : t.play}
        </button>
        <button
          onClick={handleReset}
          style={{
            background: '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 16px',
            cursor: 'pointer',
          }}
        >
          {t.reset}
        </button>
        <span style={{ color: '#888', alignSelf: 'center', marginLeft: '8px' }}>
          {t.step}: {step + 1}/6
        </span>
      </div>

      {/* Stage indicator */}
      <div style={{
        padding: '12px',
        background: 'rgba(139, 92, 246, 0.2)',
        borderRadius: '8px',
        marginBottom: '16px',
        textAlign: 'center',
        color: '#a855f7',
        fontWeight: 'bold',
      }}>
        {t.stages[step]}
      </div>

      <div style={{
        background: '#0a0a1a',
        borderRadius: '12px',
        padding: '20px',
      }}>
        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start' }}>
          {/* Image / Patches */}
          <div>
            <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px', textAlign: 'center' }}>
              {step === 0 ? 'Image' : 'Patches'}
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 40px)',
              gap: step >= 1 ? '4px' : '0px',
              transition: 'gap 0.5s',
            }}>
              {patchColors.map((color, i) => (
                <div
                  key={i}
                  onClick={() => step >= 4 && setSelectedPatch(i === selectedPatch ? null : i)}
                  style={{
                    width: '40px',
                    height: '40px',
                    background: color,
                    borderRadius: step >= 1 ? '4px' : '0px',
                    transition: 'all 0.3s',
                    cursor: step >= 4 ? 'pointer' : 'default',
                    border: selectedPatch === i ? '2px solid #a855f7' : '2px solid transparent',
                    boxShadow: step >= 4 ? `0 0 ${getAttentionOpacity(i) * 15}px rgba(168, 85, 247, ${getAttentionOpacity(i)})` : 'none',
                    position: 'relative',
                  }}
                >
                  {step >= 3 && (
                    <div style={{
                      position: 'absolute',
                      bottom: '2px',
                      right: '2px',
                      fontSize: '8px',
                      color: 'rgba(255,255,255,0.6)',
                    }}>
                      {i}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {step >= 4 && (
              <div style={{ fontSize: '10px', color: '#666', marginTop: '8px', textAlign: 'center' }}>
                {lang === 'ru' ? 'Кликни на патч' : 'Click a patch'}
              </div>
            )}
          </div>

          {/* Token sequence */}
          {step >= 2 && (
            <div>
              <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px', textAlign: 'center' }}>
                Token Sequence
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {/* CLS token */}
                {step >= 3 && (
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '6px 10px',
                    background: 'rgba(239, 68, 68, 0.3)',
                    borderRadius: '4px',
                    animation: 'fadeIn 0.3s',
                  }}>
                    <span style={{ fontSize: '12px', fontWeight: 'bold', color: '#ef4444' }}>[CLS]</span>
                    <span style={{ fontSize: '10px', color: '#888' }}>+pos0</span>
                  </div>
                )}
                
                {/* Patch tokens */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: '4px',
                }}>
                  {Array(16).fill(0).map((_, i) => (
                    <div
                      key={i}
                      style={{
                        padding: '4px 6px',
                        background: selectedPatch === i ? 'rgba(168, 85, 247, 0.4)' : 'rgba(139, 92, 246, 0.2)',
                        borderRadius: '3px',
                        fontSize: '10px',
                        color: '#a855f7',
                        textAlign: 'center',
                      }}
                    >
                      P{i}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Output */}
          {step >= 5 && (
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>
                Output
              </div>
              <div style={{
                padding: '20px',
                background: 'rgba(34, 197, 94, 0.2)',
                borderRadius: '8px',
                animation: 'fadeIn 0.5s',
              }}>
                <div style={{ fontSize: '32px', marginBottom: '8px' }}>🐱</div>
                <div style={{ color: '#22c55e', fontWeight: 'bold' }}>
                  {t.classification}
                </div>
                <div style={{ fontSize: '11px', color: '#888', marginTop: '4px' }}>
                  95.7% confidence
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Architecture flow */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '8px',
          marginTop: '20px',
          flexWrap: 'wrap',
        }}>
          {['Patches', 'Linear Proj', 'Pos Embed', 'Transformer', 'MLP Head'].map((stage, i) => (
            <div key={stage} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                padding: '6px 12px',
                background: i <= step ? 'rgba(139, 92, 246, 0.3)' : 'rgba(255,255,255,0.05)',
                borderRadius: '4px',
                fontSize: '11px',
                color: i <= step ? '#a855f7' : '#666',
                transition: 'all 0.3s',
              }}>
                {stage}
              </div>
              {i < 4 && <span style={{ color: '#666' }}>→</span>}
            </div>
          ))}
        </div>
      </div>

      <p style={{ margin: '12px 0 0', fontSize: '12px', color: '#666', fontStyle: 'italic' }}>
        💡 {t.hint}
      </p>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
