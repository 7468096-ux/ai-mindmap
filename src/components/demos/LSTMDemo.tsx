'use client';

import { useState, useEffect } from 'react';

type Language = 'ru' | 'en';

interface Props {
  lang?: Language;
}

export default function LSTMDemo({ lang = 'en' }: Props) {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [cellState, setCellState] = useState(0.5);
  const [hiddenState, setHiddenState] = useState(0.3);
  
  const texts = {
    ru: {
      title: '🧠 LSTM — Долгая краткосрочная память',
      desc: 'Смотри как информация течёт через ворота LSTM',
      play: 'Запустить',
      pause: 'Пауза',
      reset: 'Сброс',
      step: 'Шаг',
      cellState: 'Cell State (долгосрочная память)',
      hiddenState: 'Hidden State (выход)',
      forgetGate: '🚪 Forget Gate',
      forgetDesc: 'Решает что забыть из памяти',
      inputGate: '🚪 Input Gate', 
      inputDesc: 'Решает что добавить в память',
      outputGate: '🚪 Output Gate',
      outputDesc: 'Решает что выводить',
      stages: [
        'Входные данные поступают',
        'Forget Gate: забываем неважное',
        'Input Gate: добавляем новое',
        'Cell State обновлён',
        'Output Gate: формируем выход',
        'Hidden State готов → следующий шаг'
      ],
    },
    en: {
      title: '🧠 LSTM — Long Short-Term Memory',
      desc: 'Watch how information flows through LSTM gates',
      play: 'Play',
      pause: 'Pause',
      reset: 'Reset',
      step: 'Step',
      cellState: 'Cell State (long-term memory)',
      hiddenState: 'Hidden State (output)',
      forgetGate: '🚪 Forget Gate',
      forgetDesc: 'Decides what to forget',
      inputGate: '🚪 Input Gate',
      inputDesc: 'Decides what to add',
      outputGate: '🚪 Output Gate',
      outputDesc: 'Decides what to output',
      stages: [
        'Input data arrives',
        'Forget Gate: forget irrelevant',
        'Input Gate: add new info',
        'Cell State updated',
        'Output Gate: form output',
        'Hidden State ready → next step'
      ],
    },
  };
  const t = texts[lang];

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setInterval(() => {
      setStep(s => {
        if (s >= 5) {
          // Reset and simulate new values
          setCellState(0.3 + Math.random() * 0.5);
          setHiddenState(0.2 + Math.random() * 0.4);
          return 0;
        }
        return s + 1;
      });
    }, 1500);
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Gate values based on step
  const forgetValue = step >= 1 ? 0.7 : 0;
  const inputValue = step >= 2 ? 0.8 : 0;
  const outputValue = step >= 4 ? 0.6 : 0;

  const GateBox = ({ name, desc, value, active, color }: { name: string; desc: string; value: number; active: boolean; color: string }) => (
    <div style={{
      padding: '12px',
      background: active ? `${color}30` : 'rgba(255,255,255,0.05)',
      border: `2px solid ${active ? color : '#333'}`,
      borderRadius: '8px',
      textAlign: 'center',
      transition: 'all 0.5s',
      transform: active ? 'scale(1.05)' : 'scale(1)',
    }}>
      <div style={{ fontWeight: 'bold', color: active ? color : '#888' }}>{name}</div>
      <div style={{ fontSize: '12px', color: '#666', marginTop: '4px' }}>{desc}</div>
      <div style={{
        marginTop: '8px',
        height: '8px',
        background: '#1a1a2e',
        borderRadius: '4px',
        overflow: 'hidden',
      }}>
        <div style={{
          width: `${value * 100}%`,
          height: '100%',
          background: color,
          transition: 'width 0.5s',
        }} />
      </div>
      <div style={{ fontSize: '11px', color: '#666', marginTop: '2px' }}>
        σ = {value.toFixed(2)}
      </div>
    </div>
  );

  return (
    <div style={{ padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 8px 0', color: '#8b5cf6' }}>{t.title}</h3>
      <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#aaa' }}>{t.desc}</p>
      
      {/* Controls */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          style={{
            background: isPlaying ? '#ef4444' : '#22c55e',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 16px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}
        >
          {isPlaying ? t.pause : t.play}
        </button>
        <button
          onClick={() => { setStep(0); setIsPlaying(false); }}
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

      {/* LSTM Cell visualization */}
      <div style={{
        background: '#0a0a1a',
        borderRadius: '12px',
        padding: '20px',
        position: 'relative',
      }}>
        {/* Cell State bar at top */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>
            {t.cellState}
          </div>
          <div style={{
            height: '24px',
            background: '#1a1a2e',
            borderRadius: '12px',
            overflow: 'hidden',
            position: 'relative',
          }}>
            <div style={{
              width: `${cellState * 100}%`,
              height: '100%',
              background: `linear-gradient(90deg, #3b82f6, #8b5cf6)`,
              transition: 'width 0.5s',
              boxShadow: step >= 3 ? '0 0 15px rgba(139, 92, 246, 0.5)' : 'none',
            }} />
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#fff',
              fontSize: '12px',
              fontWeight: 'bold',
            }}>
              C = {cellState.toFixed(2)}
            </div>
          </div>
        </div>

        {/* Gates */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
          <GateBox
            name={t.forgetGate}
            desc={t.forgetDesc}
            value={forgetValue}
            active={step === 1}
            color="#ef4444"
          />
          <GateBox
            name={t.inputGate}
            desc={t.inputDesc}
            value={inputValue}
            active={step === 2 || step === 3}
            color="#22c55e"
          />
          <GateBox
            name={t.outputGate}
            desc={t.outputDesc}
            value={outputValue}
            active={step === 4}
            color="#3b82f6"
          />
        </div>

        {/* Hidden State bar at bottom */}
        <div>
          <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>
            {t.hiddenState}
          </div>
          <div style={{
            height: '24px',
            background: '#1a1a2e',
            borderRadius: '12px',
            overflow: 'hidden',
            position: 'relative',
          }}>
            <div style={{
              width: step >= 5 ? `${hiddenState * 100}%` : '0%',
              height: '100%',
              background: `linear-gradient(90deg, #22c55e, #10b981)`,
              transition: 'width 0.5s',
              boxShadow: step >= 5 ? '0 0 15px rgba(34, 197, 94, 0.5)' : 'none',
            }} />
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              color: '#fff',
              fontSize: '12px',
              fontWeight: 'bold',
            }}>
              h = {step >= 5 ? hiddenState.toFixed(2) : '...'}
            </div>
          </div>
        </div>
      </div>

      <p style={{ margin: '12px 0 0', fontSize: '12px', color: '#666', fontStyle: 'italic' }}>
        💡 LSTM решает проблему vanishing gradient через механизм ворот
      </p>
    </div>
  );
}
