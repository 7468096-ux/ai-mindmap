'use client';

import { useState, useEffect } from 'react';

type Language = 'ru' | 'en';

interface Props {
  lang?: Language;
}

interface Layer {
  id: number;
  input: number;
  output: number;
  hasSkip: boolean;
  active: boolean;
}

export default function ResNetDemo({ lang = 'en' }: Props) {
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showGradient, setShowGradient] = useState(false);
  const [layers, setLayers] = useState<Layer[]>([]);
  
  const texts = {
    ru: {
      title: '🔗 ResNet — Остаточные связи',
      desc: 'Смотри как skip connections решают проблему затухания градиентов',
      play: 'Запустить',
      pause: 'Пауза',
      reset: 'Сброс',
      forward: 'Прямой проход',
      backward: 'Обратный проход',
      showGradient: 'Показать градиенты',
      skip: 'Skip Connection',
      withoutSkip: 'Без skip: градиент затухает',
      withSkip: 'С skip: градиент сохраняется',
      hint: 'Skip connections позволяют градиенту течь напрямую, решая проблему vanishing gradient',
      layer: 'Слой',
      gradient: 'Градиент',
    },
    en: {
      title: '🔗 ResNet — Residual Connections',
      desc: 'Watch how skip connections solve the vanishing gradient problem',
      play: 'Play',
      pause: 'Pause',
      reset: 'Reset',
      forward: 'Forward Pass',
      backward: 'Backward Pass',
      showGradient: 'Show gradients',
      skip: 'Skip Connection',
      withoutSkip: 'Without skip: gradient vanishes',
      withSkip: 'With skip: gradient preserved',
      hint: 'Skip connections allow gradient to flow directly, solving vanishing gradient problem',
      layer: 'Layer',
      gradient: 'Gradient',
    },
  };
  const t = texts[lang];

  // Initialize layers
  useEffect(() => {
    const initLayers: Layer[] = [];
    for (let i = 0; i < 6; i++) {
      initLayers.push({
        id: i,
        input: 1,
        output: 0,
        hasSkip: i % 2 === 1, // Every other layer has skip
        active: false,
      });
    }
    setLayers(initLayers);
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setStep(s => {
        const maxSteps = showGradient ? 11 : 5;
        if (s >= maxSteps) {
          setIsPlaying(false);
          return s;
        }
        return s + 1;
      });
    }, 800);
    
    return () => clearInterval(timer);
  }, [isPlaying, showGradient]);

  // Update layers based on step
  useEffect(() => {
    setLayers(prev => prev.map((layer, i) => {
      if (!showGradient) {
        // Forward pass
        return {
          ...layer,
          active: i <= step,
          output: i <= step ? (layer.hasSkip ? 0.95 : 0.9 - i * 0.05) : 0,
        };
      } else {
        // Backward pass after step 5
        const backStep = step - 6;
        const reversedI = 5 - i;
        return {
          ...layer,
          active: step <= 5 ? i <= step : reversedI <= backStep,
          output: step <= 5 
            ? (i <= step ? 1 : 0)
            : (reversedI <= backStep ? (layer.hasSkip ? 0.9 : 0.3 ** (backStep - reversedI + 1)) : 0),
        };
      }
    }));
  }, [step, showGradient]);

  const handleReset = () => {
    setStep(0);
    setIsPlaying(false);
    setLayers(prev => prev.map(l => ({ ...l, active: false, output: 0 })));
  };

  return (
    <div style={{ padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 8px 0', color: '#ef4444' }}>{t.title}</h3>
      <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#aaa' }}>{t.desc}</p>
      
      {/* Controls */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap', alignItems: 'center' }}>
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
        <label style={{ fontSize: '12px', color: '#888', cursor: 'pointer', marginLeft: '8px' }}>
          <input
            type="checkbox"
            checked={showGradient}
            onChange={(e) => { setShowGradient(e.target.checked); handleReset(); }}
            style={{ marginRight: '4px' }}
          />
          {t.showGradient}
        </label>
      </div>

      {/* Phase indicator */}
      <div style={{
        padding: '8px 16px',
        background: step <= 5 ? 'rgba(59, 130, 246, 0.2)' : 'rgba(239, 68, 68, 0.2)',
        borderRadius: '6px',
        marginBottom: '16px',
        textAlign: 'center',
        color: step <= 5 ? '#3b82f6' : '#ef4444',
        fontWeight: 'bold',
        fontSize: '14px',
      }}>
        {step <= 5 ? `→ ${t.forward}` : `← ${t.backward}`}
      </div>

      {/* Network visualization */}
      <div style={{
        background: '#0a0a1a',
        borderRadius: '12px',
        padding: '20px',
        position: 'relative',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          {/* Input */}
          <div style={{
            padding: '12px',
            background: 'rgba(59, 130, 246, 0.3)',
            borderRadius: '8px',
            textAlign: 'center',
            fontSize: '12px',
            color: '#3b82f6',
          }}>
            📥<br/>Input
          </div>
          
          <div style={{ color: '#666' }}>→</div>
          
          {/* Layers */}
          {layers.map((layer, i) => (
            <div key={layer.id} style={{ position: 'relative' }}>
              {/* Skip connection arc */}
              {layer.hasSkip && i > 0 && (
                <svg
                  style={{
                    position: 'absolute',
                    top: '-25px',
                    left: '-40px',
                    width: '80px',
                    height: '30px',
                    overflow: 'visible',
                  }}
                >
                  <path
                    d="M 0 25 Q 40 0 80 25"
                    fill="none"
                    stroke={layer.active ? '#22c55e' : '#333'}
                    strokeWidth="2"
                    strokeDasharray={layer.active ? "none" : "4,4"}
                  />
                  {layer.active && (
                    <circle r="4" fill="#22c55e">
                      <animateMotion dur="0.5s" repeatCount="indefinite" path="M 0 25 Q 40 0 80 25" />
                    </circle>
                  )}
                </svg>
              )}
              
              {/* Layer box */}
              <div style={{
                width: '40px',
                height: '60px',
                background: layer.active 
                  ? (showGradient && step > 5 
                    ? `rgba(239, 68, 68, ${layer.output})` 
                    : `rgba(59, 130, 246, ${layer.output})`)
                  : 'rgba(255,255,255,0.1)',
                border: `2px solid ${layer.active ? (showGradient && step > 5 ? '#ef4444' : '#3b82f6') : '#333'}`,
                borderRadius: '6px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.3s',
              }}>
                <div style={{ fontSize: '10px', color: layer.active ? '#fff' : '#666' }}>
                  {layer.hasSkip ? '🔗' : ''}
                </div>
                <div style={{ fontSize: '10px', color: '#888' }}>L{i + 1}</div>
              </div>
              
              {/* Gradient value */}
              {showGradient && step > 5 && layer.active && (
                <div style={{
                  position: 'absolute',
                  bottom: '-20px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  fontSize: '10px',
                  color: layer.output > 0.5 ? '#22c55e' : '#ef4444',
                  whiteSpace: 'nowrap',
                }}>
                  {layer.output.toFixed(2)}
                </div>
              )}
              
              {i < layers.length - 1 && (
                <div style={{
                  position: 'absolute',
                  right: '-12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#666',
                  fontSize: '12px',
                }}>
                  →
                </div>
              )}
            </div>
          ))}
          
          <div style={{ color: '#666' }}>→</div>
          
          {/* Output */}
          <div style={{
            padding: '12px',
            background: step >= 5 ? 'rgba(34, 197, 94, 0.3)' : 'rgba(255,255,255,0.1)',
            borderRadius: '8px',
            textAlign: 'center',
            fontSize: '12px',
            color: step >= 5 ? '#22c55e' : '#888',
            transition: 'all 0.3s',
          }}>
            📤<br/>Output
          </div>
        </div>

        {/* Legend */}
        <div style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          marginTop: '30px',
          fontSize: '11px',
        }}>
          <div style={{ color: '#22c55e' }}>
            🔗 = {t.skip}
          </div>
          {showGradient && (
            <>
              <div style={{ color: '#ef4444' }}>
                {t.withoutSkip}
              </div>
              <div style={{ color: '#22c55e' }}>
                {t.withSkip}
              </div>
            </>
          )}
        </div>
      </div>

      <p style={{ margin: '12px 0 0', fontSize: '12px', color: '#666', fontStyle: 'italic' }}>
        💡 {t.hint}
      </p>
    </div>
  );
}
