'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import './space.css';

// Размеры ноды (должны совпадать с CSS)
const NODE_WIDTH = 130;  // примерная ширина ноды
const NODE_HEIGHT = 54;  // примерная высота ноды

// Тестовые ноды (теперь в пикселях для точного позиционирования)
const testNodes = [
  { id: 1, name: 'Input Layer', type: 'input', x: 150, y: 300 },
  { id: 2, name: 'Hidden Layer 1', type: 'hidden', x: 400, y: 200 },
  { id: 3, name: 'Hidden Layer 2', type: 'hidden', x: 400, y: 450 },
  { id: 4, name: 'Attention', type: 'hidden', x: 650, y: 325 },
  { id: 5, name: 'Output', type: 'output', x: 850, y: 325 },
];

// Генерируем случайные звёзды для каждого слоя (улучшенный PRNG)
function generateStars(count: number, seed: number) {
  const stars = [];
  let s = seed;
  
  const random = () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
  
  // Прогреваем генератор
  for (let i = 0; i < 10; i++) random();
  
  for (let i = 0; i < count; i++) {
    stars.push({
      x: random() * 200 - 50, // -50% to 150% (больше поле для движения)
      y: random() * 200 - 50,
    });
  }
  return stars;
}

const starLayers = [
  { stars: generateStars(50, 1), size: 1, speed: 120, opacity: 0.4 },
  { stars: generateStars(40, 2), size: 1.5, speed: 100, opacity: 0.5 },
  { stars: generateStars(30, 3), size: 2, speed: 80, opacity: 0.6 },
  { stars: generateStars(25, 4), size: 2.5, speed: 60, opacity: 0.7 },
  { stars: generateStars(20, 5), size: 3, speed: 40, opacity: 0.8 },
  { stars: generateStars(10, 6), size: 4, speed: 20, opacity: 1 },
];

export default function Playground() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [smoothTilt, setSmoothTilt] = useState({ x: 0, y: 0 });
  const targetTilt = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  const [permissionGranted, setPermissionGranted] = useState(false);
  
  // Pan state
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0 });
  const panOffset = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Pan handlers
  const handlePanStart = useCallback((clientX: number, clientY: number) => {
    setIsPanning(true);
    panStart.current = { x: clientX, y: clientY };
    panOffset.current = { ...pan };
  }, [pan]);

  const handlePanMove = useCallback((clientX: number, clientY: number) => {
    if (!isPanning) return;
    const dx = clientX - panStart.current.x;
    const dy = clientY - panStart.current.y;
    setPan({
      x: panOffset.current.x + dx,
      y: panOffset.current.y + dy,
    });
  }, [isPanning]);

  const handlePanEnd = useCallback(() => {
    setIsPanning(false);
  }, []);

  // Mouse events for panning
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      // Only pan on background, not on nodes
      if ((e.target as HTMLElement).closest('.space-node')) return;
      handlePanStart(e.clientX, e.clientY);
    };
    
    const handleMouseMove = (e: MouseEvent) => {
      if (isPanning) {
        handlePanMove(e.clientX, e.clientY);
      }
    };
    
    const handleMouseUp = () => handlePanEnd();

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      if (container) {
        container.removeEventListener('mousedown', handleMouseDown);
      }
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isPanning, handlePanStart, handlePanMove, handlePanEnd]);

  // Touch events for panning
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if ((e.target as HTMLElement).closest('.space-node')) return;
      if (e.touches.length === 1) {
        handlePanStart(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (isPanning && e.touches.length === 1) {
        handlePanMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    
    const handleTouchEnd = () => handlePanEnd();

    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchmove', handleTouchMove, { passive: true });
      container.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (container) {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      }
    };
  }, [isPanning, handlePanStart, handlePanMove, handlePanEnd]);

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

    // Обработчик гироскопа (расширенный угол)
    const handleOrientation = (event: DeviceOrientationEvent) => {
      const x = event.gamma || 0;
      const y = event.beta || 0;
      
      // Расширенный диапазон: ±60 градусов
      const normalizedX = Math.max(-60, Math.min(60, x)) / 60;
      const normalizedY = Math.max(-60, Math.min(60, y - 30)) / 60;
      
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

    // Fallback: движение мышью на десктопе (только если не панорамируем)
    const handleMouseMove = (event: MouseEvent) => {
      if (isPanning) return; // Не двигаем звёзды во время pan
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
  }, [isPanning]);

  const requestGyroPermission = async () => {
    if (typeof (DeviceOrientationEvent as any).requestPermission === 'function') {
      const permission = await (DeviceOrientationEvent as any).requestPermission();
      if (permission === 'granted') {
        setPermissionGranted(true);
        window.location.reload();
      }
    }
  };

  // Связи между нодами (для SVG)
  const connections = [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 3, to: 4 },
    { from: 4, to: 5 },
  ];

  const getNodeById = (id: number) => testNodes.find(n => n.id === id);

  return (
    <div 
      ref={containerRef}
      className={`space-container ${isPanning ? 'panning' : ''}`}
    >
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

      {/* Заголовок (фиксированный) */}
      <h1 className="space-title">🌌 Neural Explorer</h1>
      <p className="space-subtitle">
        Перетаскивай поле • Кликай на ноды • Поверни телефон
      </p>
      
      {/* Кнопка разрешения для iOS */}
      {!permissionGranted && typeof window !== 'undefined' && 'DeviceOrientationEvent' in window && (
        <button className="gyro-button" onClick={requestGyroPermission}>
          🎯 Включить гироскоп
        </button>
      )}

      {/* Панорамируемый слой с нодами и связями */}
      <div 
        className="pan-layer"
        style={{ 
          transform: `translate(${pan.x}px, ${pan.y}px)`,
        }}
      >
        {/* SVG для связей */}
        <svg className="connections" width="2000" height="2000" style={{ position: 'absolute', top: 0, left: 0 }}>
          <defs>
            {/* Основной градиент - плавный переход */}
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.6" />
            </linearGradient>
            {/* Glow эффект */}
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            {/* Градиент для точек соединения */}
            <radialGradient id="dotGradient">
              <stop offset="0%" stopColor="#a855f7" stopOpacity="1" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.6" />
            </radialGradient>
          </defs>
          
          {/* Точки соединения на нодах */}
          {testNodes.map((node) => (
            <g key={`dots-${node.id}`}>
              {/* Правая точка (выход) */}
              <circle
                cx={node.x + NODE_WIDTH}
                cy={node.y + NODE_HEIGHT / 2}
                r="4"
                fill="url(#dotGradient)"
                filter="url(#glow)"
                className="connection-dot"
              />
              {/* Левая точка (вход) */}
              <circle
                cx={node.x}
                cy={node.y + NODE_HEIGHT / 2}
                r="4"
                fill="url(#dotGradient)"
                filter="url(#glow)"
                className="connection-dot"
              />
            </g>
          ))}
          {connections.map((conn, i) => {
            const from = getNodeById(conn.from);
            const to = getNodeById(conn.to);
            if (!from || !to) return null;
            
            // Точки выхода/входа (центр правой/левой стороны ноды)
            const startX = from.x + NODE_WIDTH;      // правый край ноды
            const startY = from.y + NODE_HEIGHT / 2; // середина по высоте
            const endX = to.x;                        // левый край ноды  
            const endY = to.y + NODE_HEIGHT / 2;     // середина по высоте
            
            // Расстояние для контрольных точек (чем дальше ноды - тем плавнее изгиб)
            const dx = Math.abs(endX - startX);
            const tension = Math.max(dx * 0.4, 60); // 40% расстояния, минимум 60px
            
            // Cubic Bezier: горизонтальный выход, плавный вход
            const c1x = startX + tension;
            const c1y = startY;
            const c2x = endX - tension;
            const c2y = endY;
            
            return (
              <path
                key={i}
                d={`M ${startX} ${startY} C ${c1x} ${c1y}, ${c2x} ${c2y}, ${endX} ${endY}`}
                stroke="url(#lineGradient)"
                strokeWidth="2"
                fill="none"
                filter="url(#glow)"
                className="connection-line"
              />
            );
          })}
        </svg>

        {/* Ноды */}
        {testNodes.map((node) => (
          <div
            key={node.id}
            className={`space-node node-${node.type} ${selectedId === node.id ? 'selected' : ''}`}
            style={{ 
              left: `${node.x}px`, 
              top: `${node.y}px`,
            }}
            onClick={(e) => {
              e.stopPropagation();
              setSelectedId(selectedId === node.id ? null : node.id);
            }}
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
      </div>

      {/* Индикатор pan offset */}
      <div className="pan-indicator">
        📍 {Math.round(pan.x)}, {Math.round(pan.y)}
      </div>
    </div>
  );
}
