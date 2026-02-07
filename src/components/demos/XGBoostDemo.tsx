'use client';

import { useState, useEffect } from 'react';

type Language = 'ru' | 'en';

interface Props {
  lang?: Language;
}

interface Tree {
  id: number;
  prediction: number;
  residual: number;
}

export default function XGBoostDemo({ lang = 'en' }: Props) {
  const [trees, setTrees] = useState<Tree[]>([]);
  const [isTraining, setIsTraining] = useState(false);
  const [targetValue] = useState(0.85);
  const [learningRate, setLearningRate] = useState(0.3);
  
  const texts = {
    ru: {
      title: '🚀 XGBoost — Градиентный бустинг',
      desc: 'Смотри как деревья последовательно уменьшают ошибку',
      train: 'Обучить',
      training: 'Обучение...',
      reset: 'Сброс',
      target: 'Целевое значение',
      prediction: 'Предсказание',
      residual: 'Остаток (ошибка)',
      tree: 'Дерево',
      learningRate: 'Learning Rate',
      iteration: 'Итерация',
      hint: 'Каждое новое дерево учится на ошибках предыдущих, постепенно приближаясь к цели',
    },
    en: {
      title: '🚀 XGBoost — Gradient Boosting',
      desc: 'Watch how trees sequentially reduce the error',
      train: 'Train',
      training: 'Training...',
      reset: 'Reset',
      target: 'Target value',
      prediction: 'Prediction',
      residual: 'Residual (error)',
      tree: 'Tree',
      learningRate: 'Learning Rate',
      iteration: 'Iteration',
      hint: 'Each new tree learns from previous errors, gradually approaching the target',
    },
  };
  const t = texts[lang];

  const getCurrentPrediction = () => {
    return trees.reduce((sum, tree) => sum + tree.prediction * learningRate, 0);
  };

  const getCurrentResidual = () => {
    return targetValue - getCurrentPrediction();
  };

  const trainStep = () => {
    const residual = getCurrentResidual();
    const newTree: Tree = {
      id: trees.length,
      prediction: residual * (0.8 + Math.random() * 0.4), // Tree approximates residual
      residual: Math.abs(residual),
    };
    setTrees([...trees, newTree]);
  };

  const startTraining = () => {
    setIsTraining(true);
    setTrees([]);
  };

  useEffect(() => {
    if (!isTraining) return;
    
    if (trees.length >= 8 || Math.abs(getCurrentResidual()) < 0.01) {
      setIsTraining(false);
      return;
    }
    
    const timer = setTimeout(() => {
      trainStep();
    }, 600);
    
    return () => clearTimeout(timer);
  }, [isTraining, trees]);

  const handleReset = () => {
    setTrees([]);
    setIsTraining(false);
  };

  const prediction = getCurrentPrediction();
  const error = Math.abs(targetValue - prediction);
  const accuracy = Math.max(0, (1 - error / targetValue) * 100);

  return (
    <div style={{ padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 8px 0', color: '#f59e0b' }}>{t.title}</h3>
      <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#aaa' }}>{t.desc}</p>
      
      {/* Controls */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
        <button
          onClick={startTraining}
          disabled={isTraining}
          style={{
            background: isTraining ? '#666' : '#f59e0b',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 20px',
            cursor: isTraining ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
          }}
        >
          {isTraining ? t.training : t.train}
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
        
        <div>
          <label style={{ fontSize: '12px', color: '#888' }}>{t.learningRate}: </label>
          <input
            type="range"
            min="0.1"
            max="0.5"
            step="0.1"
            value={learningRate}
            onChange={(e) => { setLearningRate(parseFloat(e.target.value)); handleReset(); }}
            disabled={isTraining}
            style={{ width: '80px', verticalAlign: 'middle' }}
          />
          <span style={{ marginLeft: '8px', color: '#f59e0b', fontWeight: 'bold' }}>{learningRate}</span>
        </div>
      </div>

      <div style={{
        background: '#0a0a1a',
        borderRadius: '12px',
        padding: '20px',
      }}>
        {/* Target and prediction bars */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ display: 'flex', gap: '20px', marginBottom: '12px' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>
                {t.target}: {targetValue.toFixed(2)}
              </div>
              <div style={{
                height: '30px',
                background: '#1a1a2e',
                borderRadius: '6px',
                overflow: 'hidden',
                position: 'relative',
              }}>
                <div style={{
                  width: `${targetValue * 100}%`,
                  height: '100%',
                  background: 'rgba(34, 197, 94, 0.5)',
                  borderRight: '3px solid #22c55e',
                }} />
              </div>
            </div>
          </div>
          
          <div>
            <div style={{ fontSize: '12px', color: '#888', marginBottom: '4px' }}>
              {t.prediction}: {prediction.toFixed(3)} ({accuracy.toFixed(1)}%)
            </div>
            <div style={{
              height: '30px',
              background: '#1a1a2e',
              borderRadius: '6px',
              overflow: 'hidden',
              position: 'relative',
            }}>
              <div style={{
                width: `${Math.min(prediction * 100, 100)}%`,
                height: '100%',
                background: `linear-gradient(90deg, #f59e0b, ${accuracy > 95 ? '#22c55e' : '#f59e0b'})`,
                transition: 'all 0.3s',
              }} />
              {/* Target marker */}
              <div style={{
                position: 'absolute',
                left: `${targetValue * 100}%`,
                top: 0,
                bottom: 0,
                width: '2px',
                background: '#22c55e',
              }} />
            </div>
          </div>
        </div>

        {/* Trees visualization */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>
            {t.iteration}: {trees.length}/8
          </div>
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
            {trees.map((tree, i) => (
              <div
                key={tree.id}
                style={{
                  textAlign: 'center',
                  animation: 'fadeIn 0.3s ease-out',
                }}
              >
                <div style={{
                  width: '50px',
                  height: '60px',
                  background: 'rgba(245, 158, 11, 0.2)',
                  border: '2px solid #f59e0b',
                  borderRadius: '8px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <div style={{ fontSize: '20px' }}>🌳</div>
                  <div style={{ fontSize: '10px', color: '#f59e0b' }}>
                    +{(tree.prediction * learningRate).toFixed(2)}
                  </div>
                </div>
                <div style={{ fontSize: '10px', color: '#666', marginTop: '4px' }}>
                  T{i + 1}
                </div>
              </div>
            ))}
            
            {trees.length === 0 && !isTraining && (
              <div style={{ color: '#666', padding: '20px' }}>
                👆 {lang === 'ru' ? 'Нажми "Обучить"' : 'Click "Train"'}
              </div>
            )}
          </div>
        </div>

        {/* Residual chart */}
        {trees.length > 0 && (
          <div>
            <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>
              {t.residual}
            </div>
            <div style={{ display: 'flex', gap: '4px', height: '60px', alignItems: 'flex-end' }}>
              {trees.map((tree, i) => (
                <div
                  key={i}
                  style={{
                    width: '40px',
                    height: `${Math.min(tree.residual * 100, 100)}%`,
                    background: `linear-gradient(to top, ${tree.residual < 0.1 ? '#22c55e' : '#ef4444'}, ${tree.residual < 0.1 ? '#10b981' : '#f87171'})`,
                    borderRadius: '4px 4px 0 0',
                    transition: 'height 0.3s',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'center',
                    paddingBottom: '4px',
                  }}
                >
                  <span style={{ fontSize: '9px', color: '#fff' }}>
                    {tree.residual.toFixed(2)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Final result */}
        {trees.length > 0 && !isTraining && (
          <div style={{
            marginTop: '20px',
            padding: '12px',
            background: accuracy > 95 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(245, 158, 11, 0.2)',
            borderRadius: '8px',
            textAlign: 'center',
          }}>
            <span style={{ color: accuracy > 95 ? '#22c55e' : '#f59e0b', fontWeight: 'bold' }}>
              {accuracy > 95 ? '✅' : '📈'} {accuracy.toFixed(1)}% {lang === 'ru' ? 'точность' : 'accuracy'}
            </span>
            <span style={{ color: '#888', marginLeft: '8px', fontSize: '12px' }}>
              ({trees.length} {lang === 'ru' ? 'деревьев' : 'trees'})
            </span>
          </div>
        )}
      </div>

      <p style={{ margin: '12px 0 0', fontSize: '12px', color: '#666', fontStyle: 'italic' }}>
        💡 {t.hint}
      </p>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: scale(0.8); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
