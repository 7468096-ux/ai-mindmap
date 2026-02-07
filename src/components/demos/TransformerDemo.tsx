'use client';

import { useState, useEffect } from 'react';

type Language = 'ru' | 'en';

interface Props {
  lang?: Language;
}

export default function TransformerDemo({ lang = 'en' }: Props) {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const tokens = ['The', 'cat', 'sat', 'on', 'mat'];
  const [attentionWeights, setAttentionWeights] = useState<number[][]>([]);
  
  const texts = {
    ru: {
      title: '⚡ Transformer — Архитектура внимания',
      desc: 'Смотри как self-attention связывает все токены между собой',
      play: 'Запустить',
      pause: 'Пауза',
      reset: 'Сброс',
      step: 'Шаг',
      input: 'Вход',
      output: 'Выход',
      attention: 'Self-Attention',
      stages: [
        'Токенизация: текст → токены',
        'Positional Encoding: добавляем позиции',
        'Query, Key, Value: проекции',
        'Self-Attention: каждый видит всех',
        'Feed-Forward: обработка',
        'Выход трансформера готов'
      ],
      hint: 'Каждый токен "видит" все остальные токены через механизм внимания',
    },
    en: {
      title: '⚡ Transformer — Attention Architecture',
      desc: 'Watch how self-attention connects all tokens to each other',
      play: 'Play',
      pause: 'Pause',
      reset: 'Reset',
      step: 'Step',
      input: 'Input',
      output: 'Output',
      attention: 'Self-Attention',
      stages: [
        'Tokenization: text → tokens',
        'Positional Encoding: add positions',
        'Query, Key, Value: projections',
        'Self-Attention: each sees all',
        'Feed-Forward: processing',
        'Transformer output ready'
      ],
      hint: 'Each token "sees" all other tokens through the attention mechanism',
    },
  };
  const t = texts[lang];

  // Generate attention weights
  useEffect(() => {
    const weights: number[][] = [];
    for (let i = 0; i < tokens.length; i++) {
      const row: number[] = [];
      for (let j = 0; j < tokens.length; j++) {
        // Create somewhat realistic attention patterns
        if (i === j) {
          row.push(0.3 + Math.random() * 0.2); // Self-attention
        } else if (Math.abs(i - j) === 1) {
          row.push(0.2 + Math.random() * 0.15); // Adjacent tokens
        } else {
          row.push(0.05 + Math.random() * 0.1); // Distant tokens
        }
      }
      // Normalize
      const sum = row.reduce((a, b) => a + b, 0);
      weights.push(row.map(w => w / sum));
    }
    setAttentionWeights(weights);
  }, []);

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
  };

  return (
    <div style={{ padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 8px 0', color: '#f59e0b' }}>{t.title}</h3>
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
        background: 'rgba(245, 158, 11, 0.2)',
        borderRadius: '8px',
        marginBottom: '16px',
        textAlign: 'center',
        color: '#f59e0b',
        fontWeight: 'bold',
      }}>
        {t.stages[step]}
      </div>

      <div style={{
        background: '#0a0a1a',
        borderRadius: '12px',
        padding: '20px',
      }}>
        {/* Input tokens */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>{t.input}</div>
          <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
            {tokens.map((token, i) => (
              <div
                key={i}
                style={{
                  padding: '8px 16px',
                  background: step >= 1 ? 'rgba(245, 158, 11, 0.3)' : 'rgba(255,255,255,0.1)',
                  border: `2px solid ${step >= 1 ? '#f59e0b' : '#333'}`,
                  borderRadius: '8px',
                  color: step >= 1 ? '#fff' : '#888',
                  fontWeight: 'bold',
                  transition: 'all 0.3s',
                  position: 'relative',
                }}
              >
                {token}
                {step >= 1 && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-16px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    fontSize: '10px',
                    color: '#f59e0b',
                  }}>
                    +pos{i}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Attention matrix (step 3-4) */}
        {step >= 3 && attentionWeights.length > 0 && (
          <div style={{
            marginTop: '30px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}>
            <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>
              {t.attention} Matrix
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: `30px repeat(${tokens.length}, 50px)`,
              gap: '2px',
              fontSize: '10px',
            }}>
              {/* Header row */}
              <div />
              {tokens.map((token, i) => (
                <div key={i} style={{ textAlign: 'center', color: '#888', padding: '4px' }}>
                  {token}
                </div>
              ))}
              
              {/* Attention rows */}
              {tokens.map((token, i) => (
                <>
                  <div key={`label-${i}`} style={{ color: '#888', padding: '4px', textAlign: 'right' }}>
                    {token}
                  </div>
                  {attentionWeights[i]?.map((weight, j) => (
                    <div
                      key={`${i}-${j}`}
                      style={{
                        padding: '8px',
                        background: `rgba(245, 158, 11, ${weight})`,
                        borderRadius: '4px',
                        textAlign: 'center',
                        color: weight > 0.2 ? '#fff' : '#888',
                        fontWeight: weight > 0.2 ? 'bold' : 'normal',
                        transition: 'all 0.3s',
                      }}
                    >
                      {(weight * 100).toFixed(0)}
                    </div>
                  ))}
                </>
              ))}
            </div>
          </div>
        )}

        {/* Output (step 5) */}
        {step >= 5 && (
          <div style={{
            marginTop: '30px',
            textAlign: 'center',
            padding: '16px',
            background: 'rgba(34, 197, 94, 0.2)',
            borderRadius: '8px',
          }}>
            <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>{t.output}</div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              {tokens.map((token, i) => (
                <div
                  key={i}
                  style={{
                    padding: '8px 16px',
                    background: 'rgba(34, 197, 94, 0.4)',
                    borderRadius: '8px',
                    color: '#22c55e',
                    fontWeight: 'bold',
                  }}
                >
                  {token}
                </div>
              ))}
            </div>
            <div style={{ fontSize: '11px', color: '#666', marginTop: '8px' }}>
              ✅ {lang === 'ru' ? 'Контекстуализированные эмбеддинги' : 'Contextualized embeddings'}
            </div>
          </div>
        )}
      </div>

      <p style={{ margin: '12px 0 0', fontSize: '12px', color: '#666', fontStyle: 'italic' }}>
        💡 {t.hint}
      </p>
    </div>
  );
}
