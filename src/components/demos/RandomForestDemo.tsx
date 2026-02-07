'use client';

import { useState, useEffect, useRef } from 'react';

type Language = 'ru' | 'en';

interface Props {
  lang?: Language;
}

interface Tree {
  id: number;
  prediction: 0 | 1;
  confidence: number;
}

export default function RandomForestDemo({ lang = 'en' }: Props) {
  const [numTrees, setNumTrees] = useState(5);
  const [trees, setTrees] = useState<Tree[]>([]);
  const [isVoting, setIsVoting] = useState(false);
  const [finalPrediction, setFinalPrediction] = useState<number | null>(null);
  
  const texts = {
    ru: {
      title: '🌲 Random Forest — Случайный лес',
      desc: 'Много деревьев голосуют за итоговый результат',
      numTrees: 'Количество деревьев',
      predict: 'Предсказать',
      voting: 'Голосование...',
      result: 'Результат',
      tree: 'Дерево',
      votes: 'Голоса',
      class0: 'Класс 0',
      class1: 'Класс 1',
      hint: 'Каждое дерево обучается на случайной выборке данных, итоговый ответ — голосование большинства',
    },
    en: {
      title: '🌲 Random Forest',
      desc: 'Multiple trees vote for the final result',
      numTrees: 'Number of trees',
      predict: 'Predict',
      voting: 'Voting...',
      result: 'Result',
      tree: 'Tree',
      votes: 'Votes',
      class0: 'Class 0',
      class1: 'Class 1',
      hint: 'Each tree is trained on random data subset, final answer is majority vote',
    },
  };
  const t = texts[lang];

  const generateTrees = () => {
    setIsVoting(true);
    setFinalPrediction(null);
    setTrees([]);
    
    // Generate trees one by one for animation
    const newTrees: Tree[] = [];
    for (let i = 0; i < numTrees; i++) {
      setTimeout(() => {
        const prediction = Math.random() > 0.45 ? 1 : 0;
        const confidence = 0.6 + Math.random() * 0.35;
        newTrees.push({ id: i, prediction: prediction as 0 | 1, confidence });
        setTrees([...newTrees]);
        
        if (i === numTrees - 1) {
          // All trees done, calculate final
          setTimeout(() => {
            const votes1 = newTrees.filter(tree => tree.prediction === 1).length;
            const votes0 = newTrees.length - votes1;
            setFinalPrediction(votes1 > votes0 ? 1 : 0);
            setIsVoting(false);
          }, 500);
        }
      }, i * 200);
    }
  };

  const votes0 = trees.filter(tree => tree.prediction === 0).length;
  const votes1 = trees.filter(tree => tree.prediction === 1).length;

  return (
    <div style={{ padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 8px 0', color: '#22c55e' }}>{t.title}</h3>
      <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#aaa' }}>{t.desc}</p>
      
      {/* Controls */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px', alignItems: 'center', flexWrap: 'wrap' }}>
        <div>
          <label style={{ fontSize: '12px', color: '#888' }}>{t.numTrees}: </label>
          <input
            type="range"
            min="3"
            max="15"
            value={numTrees}
            onChange={(e) => setNumTrees(parseInt(e.target.value))}
            disabled={isVoting}
            style={{ width: '100px', verticalAlign: 'middle' }}
          />
          <span style={{ marginLeft: '8px', color: '#22c55e', fontWeight: 'bold' }}>{numTrees}</span>
        </div>
        
        <button
          onClick={generateTrees}
          disabled={isVoting}
          style={{
            background: isVoting ? '#666' : '#22c55e',
            color: '#fff',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 20px',
            cursor: isVoting ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
          }}
        >
          {isVoting ? t.voting : t.predict}
        </button>
      </div>

      {/* Forest visualization */}
      <div style={{
        background: '#0a0a1a',
        borderRadius: '12px',
        padding: '20px',
        minHeight: '200px',
      }}>
        {/* Trees */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '12px',
          justifyContent: 'center',
          marginBottom: '20px',
        }}>
          {trees.map((tree, i) => (
            <div
              key={tree.id}
              style={{
                width: '60px',
                textAlign: 'center',
                animation: 'fadeIn 0.3s ease-out',
              }}
            >
              <div style={{
                fontSize: '32px',
                filter: tree.prediction === 1 ? 'hue-rotate(0deg)' : 'hue-rotate(180deg)',
              }}>
                🌳
              </div>
              <div style={{
                marginTop: '4px',
                padding: '4px 8px',
                background: tree.prediction === 1 ? 'rgba(34, 197, 94, 0.3)' : 'rgba(239, 68, 68, 0.3)',
                borderRadius: '4px',
                fontSize: '11px',
                color: tree.prediction === 1 ? '#22c55e' : '#ef4444',
                fontWeight: 'bold',
              }}>
                {tree.prediction}
              </div>
              <div style={{ fontSize: '10px', color: '#666', marginTop: '2px' }}>
                {(tree.confidence * 100).toFixed(0)}%
              </div>
            </div>
          ))}
          
          {trees.length === 0 && !isVoting && (
            <div style={{ color: '#666', padding: '40px' }}>
              👆 {lang === 'ru' ? 'Нажми "Предсказать"' : 'Click "Predict"'}
            </div>
          )}
        </div>

        {/* Voting bar */}
        {trees.length > 0 && (
          <div style={{ marginTop: '20px' }}>
            <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px', textAlign: 'center' }}>
              {t.votes}
            </div>
            <div style={{
              display: 'flex',
              height: '40px',
              borderRadius: '8px',
              overflow: 'hidden',
              background: '#1a1a2e',
            }}>
              <div style={{
                width: `${(votes0 / trees.length) * 100}%`,
                background: '#ef4444',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 'bold',
                transition: 'width 0.3s',
              }}>
                {votes0 > 0 && `${t.class0}: ${votes0}`}
              </div>
              <div style={{
                width: `${(votes1 / trees.length) * 100}%`,
                background: '#22c55e',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontWeight: 'bold',
                transition: 'width 0.3s',
              }}>
                {votes1 > 0 && `${t.class1}: ${votes1}`}
              </div>
            </div>
          </div>
        )}

        {/* Final prediction */}
        {finalPrediction !== null && (
          <div style={{
            marginTop: '20px',
            textAlign: 'center',
            padding: '16px',
            background: finalPrediction === 1 ? 'rgba(34, 197, 94, 0.2)' : 'rgba(239, 68, 68, 0.2)',
            borderRadius: '8px',
            animation: 'fadeIn 0.5s ease-out',
          }}>
            <div style={{ fontSize: '12px', color: '#888' }}>{t.result}</div>
            <div style={{
              fontSize: '32px',
              fontWeight: 'bold',
              color: finalPrediction === 1 ? '#22c55e' : '#ef4444',
            }}>
              {finalPrediction === 1 ? t.class1 : t.class0}
            </div>
            <div style={{ fontSize: '12px', color: '#888', marginTop: '4px' }}>
              {Math.max(votes0, votes1)}/{trees.length} ({((Math.max(votes0, votes1) / trees.length) * 100).toFixed(0)}%)
            </div>
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
