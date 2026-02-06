'use client';

import { useState, useEffect, useRef } from 'react';
import './space.css';

// Тестовые ноды
const testNodes = [
  { id: 1, name: 'Input Layer', type: 'input', x: 15, y: 30 },
  { id: 2, name: 'Hidden Layer 1', type: 'hidden', x: 40, y: 20 },
  { id: 3, name: 'Hidden Layer 2', type: 'hidden', x: 40, y: 50 },
  { id: 4, name: 'Attention', type: 'hidden', x: 65, y: 35 },
  { id: 5, name: 'Output', type: 'output', x: 85, y: 35 },
];

// Генерируем случайные звёзды для каждого слоя
function generateStars(count: number, seed: number) {
  const stars = [];
  for (let i = 0; i < count; i++) {
    const rand = (seed * (i + 1) * 9301 + 49297) % 233280;
    const rand2 = (seed * (i + 2) * 9301 + 49297) % 233280;
    stars.push({
      x: (rand / 233280) * 120 - 10, // -10% to 110%
      y: (rand2 / 233280) * 120 - 10,
    });
  }
  return stars;
}

const starLayers = [
  { stars: generateStars(50, 1), size: 1, speed: 40, opacity: 0.4 },
  { stars: generateStars(40, 2), size: 1.5, speed: 32, opacity: 0.5 },
  { stars: generateStars(30, 3), size: 2, speed: 24, opacity: 0.6 },
  { stars: generateStars(25, 4), size: 2.5, speed: 18, opacity: 0.7 },
  { stars: generateStars(20, 5), size: 3, speed: 12, opacity: 0.8 },
  { stars: generateStars(10, 6), size: 4, speed: 6, opacity: 1 },
];

export default function Playground() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [smoothTilt, setSmoothTilt] = useState({ x: 0, y: 0 });
  const targetTilt = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    // Плавное сглаживание (lerp)
    const smoothing = () => {
      setSmoothTilt(prev => ({
        x: prev.x + (targetTilt.current.x - prev.x) * 0.08,
        y: prev.y + (targetTilt.current.y - prev.y) * 0.08,
      }));
      animationRef.current = requestAnimationFrame(smoothing);
    };
    animationRef.current = requestAnimationFrame(smoothing);

    // Обработчик гироскопа
    const handleOrientation = (event: DeviceOrientationEvent) => {
      const x = event.gamma || 0;
      const y = event.beta || 0;
      
      const normalizedX = Math.max(-25, Math.min(25, x)) / 25;
      const normalizedY = Math.max(-25, Math.min(25, y - 45)) / 25;
      
      targetTilt.current = { x: normalizedX, y: normalizedY };
    };

    // Для iOS 13+ нужно запросить разрешение
    const requestPermission = async () => {
      if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
        try {
          const permission = await (DeviceOrientationEvent as any).requestPermission();
          if (permission === 'granted') {
            setPermissionGranted(true);
            window.addEventListener('deviceorientation', handleOrientation);
          }
        } catch (error) {
          console.log('Gyro permission denied');
        }
      } else {
        setPermissionGranted(true);
        window.addEventListener('deviceorientation', handleOrientation);
      }
    };

    // Fallback: движение мышью на десктопе
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      targetTilt.current = { x, y };
    };

    if (window.DeviceOrientationEvent) {
      requestPermission();
    }
    
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const requestGyroPermission = async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      const permission = await (DeviceOrientationEvent as any).requestPermission();
      if (permission === 'granted') {
        setPermissionGranted(true);
        window.location.reload();
      }
    }
  };

  return (
    <div className="space-container">
      {/* Слои звёзд с параллаксом */}
      {starLayers.map((layer, layerIndex) => (
        <div
          key={layerIndex}
          className="star-layer"
          style={{
            transform: `translate(${smoothTilt.x * layer.speed}px, ${smoothTilt.y * layer.speed}px)`,
          }}
        >
          {layer.stars.map((star, starIndex) => (
            <div
              key={starIndex}
              className="star"
              style={{
                left: `${star.x}%`,
                top: `${star.y}%`,
                width: `${layer.size}px`,
                height: `${layer.size}px`,
                opacity: layer.opacity,
              }}
            />
          ))}
        </div>
      ))}

      {/* Заголовок */}
      <h1 className="space-title">🌌 Neural Explorer - Space Design</h1>
      <p className="space-subtitle">
        Кликни на ноду • Поверни телефон — звёзды двигаются
      </p>
      
      {/* Кнопка разрешения для iOS */}
      {!permissionGranted && typeof window !== 'undefined' && 'DeviceOrientationEvent' in window && (
        <button className="gyro-button" onClick={requestGyroPermission}>
          🎯 Включить гироскоп
        </button>
      )}

      {/* Ноды */}
      {testNodes.map((node) => (
        <div
          key={node.id}
          className={`space-node node-${node.type} ${selectedId === node.id ? 'selected' : ''}`}
          style={{ left: `${node.x}%`, top: `${node.y}%` }}
          onClick={() => setSelectedId(selectedId === node.id ? null : node.id)}
        >
          <div className="node-glow"></div>
          <div className="node-content">
            <span className="node-icon">
              {node.type === 'input' ? '📥' : node.type === 'output' ? '📤' : '🧠'}
            </span>
            <span className="node-name">{node.name}</span>
          </div>
        </div>
      ))}

      {/* Линии связей */}
      <svg className="connections">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0.3" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#10b981" stopOpacity="0.3" />
          </linearGradient>
        </defs>
        <line x1="18%" y1="32%" x2="38%" y2="22%" stroke="url(#lineGradient)" strokeWidth="2" />
        <line x1="18%" y1="32%" x2="38%" y2="52%" stroke="url(#lineGradient)" strokeWidth="2" />
        <line x1="43%" y1="22%" x2="63%" y2="37%" stroke="url(#lineGradient)" strokeWidth="2" />
        <line x1="43%" y1="52%" x2="63%" y2="37%" stroke="url(#lineGradient)" strokeWidth="2" />
        <line x1="68%" y1="37%" x2="83%" y2="37%" stroke="url(#lineGradient)" strokeWidth="2" />
      </svg>
    </div>
  );
}
