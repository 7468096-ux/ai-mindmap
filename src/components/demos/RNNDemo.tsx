'use client';

import { useState, useEffect } from 'react';

type Language = 'ru' | 'en';

interface Props {
  lang?: Language;
}

export default function RNNDemo({ lang = 'en' }: Props) {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [sequence] = useState(['H', 'e', 'l', 'l', 'o']);
  const [hiddenStates, setHiddenStates] = useState<number[]>([]);
  const [prediction, setPrediction] = useState('');
  
  const texts = {
    ru: {
      title: '🔁 RNN — Рекуррентная сеть',
      desc: 'Смотри как RNN обрабатывает последовательность посимвольно',
      play: 'Запустить',
      pause: 'Пауза',
      reset: 'Сброс',
      input: 'Вход',
      hidden: 'Скрытое состояние',
      output: 'Предсказание',
      step: 'Шаг',
      hint: 'На каждом шаге RNN комбинирует новый вход с предыдущим скрытым состоянием',
      processing: 'Обработка',
      waiting: 'Ожидание...',
    },
    en: {
      title: '🔁 RNN — Recurrent Neural Network',
      desc: 'Watch how RNN processes sequence character by character',
      play: 'Play',
      pause: 'Pause',
      reset: 'Reset',
      input: 'Input',
      hidden: 'Hidden State',
      output: 'Prediction',
      step: 'Step',
      hint: 'At each step, RNN combines new input with previous hidden state',
      processing: 'Processing',
      waiting: 'Waiting...',
    },
  };
  const t = texts[lang];

  const predictions = ['e', 'l', 'l', 'o', '!'];

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setStep(s => {
        if (s >= sequence.length - 1) {
          setIsPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, 1200);
    return () => clearInterval(timer);
  }, [isPlaying, sequence.length]);

  useEffect(() => {
    // Update hidden states based on step
    const newStates = [];
    for (let i = 0; i <= step; i++) {
      newStates.push(0.3 + (i + 1) * 0.12 + Math.sin(i) * 0.1);
    }
    setHiddenStates(newStates);
    setPrediction(predictions[step]);
  }, [step]);

  const handleReset = () => {
    setStep(0);
    setIsPlaying(false);
    setHiddenStates([]);
    setPrediction('');
  };

  return (
    <div style={{ padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 8px 0', color: '#06b6d4' }}>{t.title}</h3>
      <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#aaa' }}>{t.desc}</p>
      
      {/* Controls */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          disabled={step >= sequence.length - 1}
          style={{
            background: isPlaying ? '#ef4444' : '#22c55e',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 16px',
            cursor: step >= sequence.length - 1 ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            opacity: step >= sequence.length - 1 ? 0.5 : 1,
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
          {t.step}: {step + 1}/{sequence.length}
        </span>
      </div>

      {/* Sequence visualization */}
      <div style={{
        background: '#0a0a1a',
        borderRadius: '12px',
        padding: '20px',
      }}>
        {/* Input sequence */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>{t.input}</div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {sequence.map((char, i) => (
              <div
                key={i}
                style={{
                  width: '50px',
                  height: '50px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: i === step ? '#06b6d4' : i < step ? 'rgba(6, 182, 212, 0.3)' : 'rgba(255,255,255,0.1)',
                  borderRadius: '8px',
                  fontSize: '24px',
                  fontWeight: 'bold',
                  color: i <= step ? '#fff' : '#666',
                  transition: 'all 0.3s',
                  transform: i === step ? 'scale(1.1)' : 'scale(1)',
                  boxShadow: i === step ? '0 0 20px rgba(6, 182, 212, 0.5)' : 'none',
                }}
              >
                {char}
              </div>
            ))}
          </div>
        </div>

        {/* RNN Cell */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          margin: '20px 0',
        }}>
          {/* Previous hidden state */}
          <div style={{
            padding: '10px 20px',
            background: step > 0 ? 'rgba(139, 92, 246, 0.3)' : 'rgba(255,255,255,0.05)',
            borderRadius: '8px',
            textAlign: 'center',
          }}>
            <div style={{ fontSize: '11px', color: '#888' }}>h(t-1)</div>
            <div style={{ fontSize: '16px', color: '#a855f7', fontWeight: 'bold' }}>
              {step > 0 ? hiddenStates[step - 1]?.toFixed(2) : '0.00'}
            </div>
          </div>

          {/* Arrow */}
          <div style={{ color: '#666', fontSize: '20px' }}>→</div>

          {/* RNN Cell */}
          <div style={{
            padding: '20px',
            background: 'rgba(6, 182, 212, 0.2)',
            border: '2px solid #06b6d4',
            borderRadius: '12px',
            textAlign: 'center',
            minWidth: '100px',
          }}>
            <div style={{ fontSize: '24px', marginBottom: '4px' }}>🔁</div>
            <div style={{ fontSize: '12px', color: '#06b6d4', fontWeight: 'bold' }}>RNN Cell</div>
            <div style={{ fontSize: '10px', color: '#888', marginTop: '4px' }}>
              tanh(W·h + U·x)
            </div>
          </div>

          {/* Arrow */}
          <div style={{ color: '#666', fontSize: '20px' }}>→</div>

          {/* Current hidden state */}
          <div style={{
            padding: '10px 20px',
            background: 'rgba(139, 92, 246, 0.3)',
            borderRadius: '8px',
            textAlign: 'center',
            boxShadow: '0 0 15px rgba(139, 92, 246, 0.3)',
          }}>
            <div style={{ fontSize: '11px', color: '#888' }}>h(t)</div>
            <div style={{ fontSize: '16px', color: '#a855f7', fontWeight: 'bold' }}>
              {hiddenStates[step]?.toFixed(2) || '...'}
            </div>
          </div>
        </div>

        {/* Output prediction */}
        <div style={{ textAlign: 'center', marginTop: '20px' }}>
          <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>{t.output}</div>
          <div style={{
            display: 'inline-block',
            padding: '12px 24px',
            background: prediction ? 'rgba(34, 197, 94, 0.3)' : 'rgba(255,255,255,0.05)',
            borderRadius: '8px',
            fontSize: '24px',
            fontWeight: 'bold',
            color: prediction ? '#22c55e' : '#666',
            minWidth: '60px',
            transition: 'all 0.3s',
          }}>
            {prediction || '?'}
          </div>
          <div style={{ fontSize: '11px', color: '#666', marginTop: '4px' }}>
            {sequence.slice(0, step + 1).join('')} → {prediction || '?'}
          </div>
        </div>

        {/* Hidden state history */}
        <div style={{ marginTop: '20px' }}>
          <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>{t.hidden}</div>
          <div style={{ display: 'flex', gap: '4px', height: '60px', alignItems: 'flex-end' }}>
            {hiddenStates.map((h, i) => (
              <div
                key={i}
                style={{
                  width: '40px',
                  height: `${h * 80}%`,
                  background: `linear-gradient(to top, #8b5cf6, #a855f7)`,
                  borderRadius: '4px 4px 0 0',
                  transition: 'height 0.3s',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      <p style={{ margin: '12px 0 0', fontSize: '12px', color: '#666', fontStyle: 'italic' }}>
        💡 {t.hint}
      </p>
    </div>
  );
}
