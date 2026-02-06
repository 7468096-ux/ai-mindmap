'use client';

import { useState, useEffect } from 'react';
import './space.css';

// Тестовые ноды
const testNodes = [
  { id: 1, name: 'Input Layer', type: 'input', x: 15, y: 30 },
  { id: 2, name: 'Hidden Layer 1', type: 'hidden', x: 40, y: 20 },
  { id: 3, name: 'Hidden Layer 2', type: 'hidden', x: 40, y: 50 },
  { id: 4, name: 'Attention', type: 'hidden', x: 65, y: 35 },
  { id: 5, name: 'Output', type: 'output', x: 85, y: 35 },
];

export default function Playground() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [permissionGranted, setPermissionGranted] = useState(false);

  useEffect(() => {
    // Обработчик гироскопа
    const handleOrientation = (event: DeviceOrientationEvent) => {
      const x = event.gamma || 0; // Наклон влево/вправо (-90 to 90)
      const y = event.beta || 0;  // Наклон вперёд/назад (-180 to 180)
      
      // Ограничиваем и нормализуем значения
      const normalizedX = Math.max(-30, Math.min(30, x)) / 30;
      const normalizedY = Math.max(-30, Math.min(30, y - 45)) / 30; // -45 для естественного угла держания
      
      setTilt({ x: normalizedX, y: normalizedY });
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
        // Не iOS или старая версия — просто слушаем
        setPermissionGranted(true);
        window.addEventListener('deviceorientation', handleOrientation);
      }
    };

    // Fallback: движение мышью на десктопе
    const handleMouseMove = (event: MouseEvent) => {
      const x = (event.clientX / window.innerWidth - 0.5) * 2;
      const y = (event.clientY / window.innerHeight - 0.5) * 2;
      setTilt({ x, y });
    };

    // Проверяем поддержку гироскопа
    if (window.DeviceOrientationEvent) {
      requestPermission();
    }
    
    // Мышь как fallback для десктопа
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Функция для запроса разрешения по тапу (iOS)
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
      {/* Звёзды с параллаксом */}
      <div 
        className="stars stars-small"
        style={{
          transform: `translate(${tilt.x * 30}px, ${tilt.y * 30}px)`
        }}
      ></div>
      <div 
        className="stars stars-medium"
        style={{
          transform: `translate(${tilt.x * 20}px, ${tilt.y * 20}px)`
        }}
      ></div>
      <div 
        className="stars stars-large"
        style={{
          transform: `translate(${tilt.x * 10}px, ${tilt.y * 10}px)`
        }}
      ></div>

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
