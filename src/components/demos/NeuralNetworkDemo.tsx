'use client';

import { useState, useMemo } from 'react';

interface Props { lang?: 'ru' | 'en'; }

const relu = (x: number) => Math.max(0, x);
const sigmoid = (x: number) => 1 / (1 + Math.exp(-x));

export default function NeuralNetworkDemo({ lang = 'ru' }: Props) {
  const [input1, setInput1] = useState(0.5);
  const [input2, setInput2] = useState(0.8);
  
  // Fixed weights (pretrained for XOR-like pattern)
  const w1 = [[0.8, -0.5], [-0.6, 0.9], [0.4, 0.7]]; // 3 hidden neurons, 2 inputs each
  const b1 = [-0.2, 0.1, -0.3];
  const w2 = [0.9, -0.7, 0.5]; // 1 output, 3 hidden inputs
  const b2 = -0.1;
  
  // Forward pass
  const hidden = useMemo(() => {
    return w1.map((weights, i) => 
      relu(weights[0] * input1 + weights[1] * input2 + b1[i])
    );
  }, [input1, input2]);
  
  const output = useMemo(() => {
    const sum = hidden.reduce((acc, h, i) => acc + h * w2[i], 0) + b2;
    return sigmoid(sum);
  }, [hidden]);
  
  const width = 280, height = 160;
  
  // Node positions
  const inputNodes = [{ x: 40, y: 50 }, { x: 40, y: 110 }];
  const hiddenNodes = [{ x: 140, y: 30 }, { x: 140, y: 80 }, { x: 140, y: 130 }];
  const outputNode = { x: 240, y: 80 };
  
  const explanation = lang === 'ru' ? {
    title: '🎯 Что здесь происходит?',
    text: 'Данные идут слева направо. Каждая связь умножает значение на вес. В нейроне всё складывается и проходит через ReLU (отрицательное → 0). Выход через Sigmoid даёт вероятность 0-1.',
    hint: 'Меняй входы — смотри как "загораются" нейроны',
  } : {
    title: '🎯 What\'s happening?',
    text: 'Data flows left to right. Each connection multiplies value by weight. In neuron everything sums up and goes through ReLU (negative → 0). Output via Sigmoid gives probability 0-1.',
    hint: 'Change inputs — see how neurons "light up"',
  };
  
  const getColor = (value: number, max: number = 1) => {
    const intensity = Math.min(1, value / max);
    return `rgba(16, 185, 129, ${0.2 + intensity * 0.8})`;
  };
  
  return (
    <div className="bg-gray-800 rounded-lg p-3">
      <div className="mb-3 p-2 bg-gray-700/50 rounded text-xs">
        <div className="text-amber-400 font-medium mb-1">{explanation.title}</div>
        <div className="text-gray-300 leading-relaxed">{explanation.text}</div>
        <div className="text-gray-500 mt-1 italic">{explanation.hint}</div>
      </div>
      
      <svg width={width} height={height} className="bg-gray-900 rounded">
        {/* Connections: Input → Hidden */}
        {inputNodes.map((inp, i) => 
          hiddenNodes.map((hid, j) => (
            <line key={`ih-${i}-${j}`}
              x1={inp.x + 15} y1={inp.y}
              x2={hid.x - 15} y2={hid.y}
              stroke="#6366f1"
              strokeWidth={Math.abs(w1[j][i]) * 2}
              opacity={0.4 + Math.abs(w1[j][i]) * 0.4}
            />
          ))
        )}
        
        {/* Connections: Hidden → Output */}
        {hiddenNodes.map((hid, i) => (
          <line key={`ho-${i}`}
            x1={hid.x + 15} y1={hid.y}
            x2={outputNode.x - 15} y2={outputNode.y}
            stroke="#6366f1"
            strokeWidth={Math.abs(w2[i]) * 2}
            opacity={0.4 + hidden[i] * 0.5}
          />
        ))}
        
        {/* Input nodes */}
        {inputNodes.map((pos, i) => (
          <g key={`in-${i}`}>
            <circle cx={pos.x} cy={pos.y} r="15"
              fill={getColor(i === 0 ? input1 : input2)} stroke="#10b981" strokeWidth="2" />
            <text x={pos.x} y={pos.y + 4} fill="#fff" fontSize="10" textAnchor="middle">
              {(i === 0 ? input1 : input2).toFixed(1)}
            </text>
          </g>
        ))}
        
        {/* Hidden nodes */}
        {hiddenNodes.map((pos, i) => (
          <g key={`hid-${i}`}>
            <circle cx={pos.x} cy={pos.y} r="15"
              fill={getColor(hidden[i], 1.5)} stroke="#6366f1" strokeWidth="2" />
            <text x={pos.x} y={pos.y + 4} fill="#fff" fontSize="10" textAnchor="middle">
              {hidden[i].toFixed(1)}
            </text>
          </g>
        ))}
        
        {/* Output node */}
        <circle cx={outputNode.x} cy={outputNode.y} r="15"
          fill={getColor(output)} stroke="#f59e0b" strokeWidth="2" />
        <text x={outputNode.x} y={outputNode.y + 4} fill="#fff" fontSize="10" textAnchor="middle">
          {output.toFixed(2)}
        </text>
        
        {/* Labels */}
        <text x={40} y={145} fill="#9ca3af" fontSize="9" textAnchor="middle">Input</text>
        <text x={140} y={155} fill="#9ca3af" fontSize="9" textAnchor="middle">Hidden (ReLU)</text>
        <text x={240} y={145} fill="#9ca3af" fontSize="9" textAnchor="middle">Output</text>
      </svg>
      
      {/* Controls */}
      <div className="mt-3 space-y-2">
        <div className="flex items-center gap-2">
          <span className="text-green-400 text-xs">x₁:</span>
          <input type="range" min="0" max="1" step="0.1" value={input1}
            onChange={(e) => setInput1(parseFloat(e.target.value))}
            className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500" />
          <span className="text-white text-xs w-6">{input1.toFixed(1)}</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-green-400 text-xs">x₂:</span>
          <input type="range" min="0" max="1" step="0.1" value={input2}
            onChange={(e) => setInput2(parseFloat(e.target.value))}
            className="flex-1 h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500" />
          <span className="text-white text-xs w-6">{input2.toFixed(1)}</span>
        </div>
      </div>
      
      {/* Output interpretation */}
      <div className={`mt-2 text-center text-xs py-1 rounded ${
        output > 0.5 ? 'bg-green-900/50 text-green-400' : 'bg-gray-700 text-gray-400'
      }`}>
        {lang === 'ru' 
          ? `Выход: ${(output * 100).toFixed(0)}% ${output > 0.5 ? '→ Да' : '→ Нет'}`
          : `Output: ${(output * 100).toFixed(0)}% ${output > 0.5 ? '→ Yes' : '→ No'}`
        }
      </div>
    </div>
  );
}
