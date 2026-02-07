'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import './space.css';

// Структура дерева как в исходном проекте
const initialNodes = [
  // Корень
  { id: 'ai', name: 'AI', emoji: '🤖', level: 0, x: 400, y: 300 },
  // Уровень 1
  { id: 'ml', name: 'Machine Learning', emoji: '📊', level: 1, x: 700, y: 150 },
  { id: 'acl', name: 'Acting', emoji: '🎬', level: 1, x: 700, y: 300 },
  { id: 'rsn', name: 'Reasoning', emoji: '🧩', level: 1, x: 700, y: 450 },
  // Уровень 2 (под ML)
  { id: 'sup', name: 'Supervised', emoji: '🎯', level: 2, x: 1000, y: 80 },
  { id: 'unsup', name: 'Unsupervised', emoji: '🔍', level: 2, x: 1000, y: 180 },
  { id: 'rl', name: 'Reinfortic', emoji: '🎮', level: 2, x: 1000, y: 280 },
  // Уровень 2 (под Acting)  
  { id: 'nlp', name: 'NLP', emoji: '💬', level: 2, x: 1000, y: 380 },
  { id: 'cv', name: 'Vision', emoji: '👁️', level: 2, x: 1000, y: 480 },
];

// Связи между нодами
const connections = [
  { from: 'ai', to: 'ml' },
  { from: 'ai', to: 'acl' },
  { from: 'ai', to: 'rsn' },
  { from: 'ml', to: 'sup' },
  { from: 'ml', to: 'unsup' },
  { from: 'ml', to: 'rl' },
  { from: 'acl', to: 'nlp' },
  { from: 'acl', to: 'cv' },
];

// Цвета по уровню
const levelColors: Record<number, string> = {
  0: '#6366f1', // indigo - корень
  1: '#8b5cf6', // purple
  2: '#06b6d4', // cyan
  3: '#10b981', // green
};

// Генерация звёзд
function generateStars(count: number, seed: number) {
  const stars = [];
  let s = seed;
  const random = () => {
    s = (s * 1103515245 + 12345) & 0x7fffffff;
    return s / 0x7fffffff;
  };
  for (let i = 0; i < 10; i++) random();
  for (let i = 0; i < count; i++) {
    stars.push({ x: random() * 200 - 50, y: random() * 200 - 50 });
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

// Падающая звезда
interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  angle: number;
  length: number;
  speed: number;
  delay: number;
}

export default function Playground() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [smoothTilt, setSmoothTilt] = useState({ x: 0, y: 0 });
  const targetTilt = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  
  // Nodes state
  const [nodes, setNodes] = useState(initialNodes);
  const nodeRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [nodeSizes, setNodeSizes] = useState<Map<string, { width: number; height: number }>>(new Map());
  
  // Pan state
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0 });
  const panOffset = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Node drag state
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const nodeStartPos = useRef({ x: 0, y: 0 });

  // Shooting stars
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const shootingStarId = useRef(0);

  // Измерение размеров нод после рендера
  useEffect(() => {
    const sizes = new Map<string, { width: number; height: number }>();
    nodeRefs.current.forEach((el, id) => {
      if (el) {
        const rect = el.getBoundingClientRect();
        sizes.set(id, { width: rect.width, height: rect.height });
      }
    });
    setNodeSizes(sizes);
  }, [nodes]);

  // Создание падающих звёзд с рандомным интервалом 20-60 сек
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const createShootingStar = () => {
      const star: ShootingStar = {
        id: shootingStarId.current++,
        startX: 70 + Math.random() * 30, // правая часть экрана (70-100%)
        startY: Math.random() * 25,       // верхняя часть (0-25%)
        angle: 35 + Math.random() * 20,   // угол 35-55° (вниз-влево)
        length: 180 + Math.random() * 120, // длиннее: 180-300px
        speed: 1.5 + Math.random() * 1,    // 1.5-2.5s
        delay: 0,
      };
      setShootingStars(prev => [...prev, star]);
      
      // Удаляем через время анимации
      setTimeout(() => {
        setShootingStars(prev => prev.filter(s => s.id !== star.id));
      }, star.speed * 1000 + 500);
      
      // Следующая звезда через 20-60 секунд
      const nextDelay = 20000 + Math.random() * 40000;
      timeoutId = setTimeout(createShootingStar, nextDelay);
    };

    // Первая звезда через 5-15 секунд
    const firstDelay = 5000 + Math.random() * 10000;
    timeoutId = setTimeout(createShootingStar, firstDelay);

    return () => clearTimeout(timeoutId);
  }, []);
  
  // Node drag handlers
  const handleNodeDragStart = useCallback((nodeId: string, clientX: number, clientY: number) => {
    const node = nodes.find(n => n.id === nodeId);
    if (!node) return;
    setDraggingNodeId(nodeId);
    dragStart.current = { x: clientX, y: clientY };
    nodeStartPos.current = { x: node.x, y: node.y };
  }, [nodes]);
  
  const handleNodeDragMove = useCallback((clientX: number, clientY: number) => {
    if (draggingNodeId === null) return;
    const dx = clientX - dragStart.current.x;
    const dy = clientY - dragStart.current.y;
    setNodes(prev => prev.map(node => 
      node.id === draggingNodeId 
        ? { ...node, x: nodeStartPos.current.x + dx, y: nodeStartPos.current.y + dy }
        : node
    ));
  }, [draggingNodeId]);
  
  const handleNodeDragEnd = useCallback(() => {
    setDraggingNodeId(null);
  }, []);

  // Pan handlers
  const handlePanStart = useCallback((clientX: number, clientY: number) => {
    setIsPanning(true);
    panStart.current = { x: clientX, y: clientY };
    panOffset.current = { ...pan };
  }, [pan]);

  const handlePanMove = useCallback((clientX: number, clientY: number) => {
    if (!isPanning) return;
    setPan({
      x: panOffset.current.x + (clientX - panStart.current.x),
      y: panOffset.current.y + (clientY - panStart.current.y),
    });
  }, [isPanning]);

  const handlePanEnd = useCallback(() => {
    setIsPanning(false);
  }, []);

  // Mouse/touch events
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('.space-node')) return;
      handlePanStart(e.clientX, e.clientY);
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (draggingNodeId !== null) handleNodeDragMove(e.clientX, e.clientY);
      else if (isPanning) handlePanMove(e.clientX, e.clientY);
    };
    const handleMouseUp = () => { handlePanEnd(); handleNodeDragEnd(); };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      container?.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isPanning, draggingNodeId, handlePanStart, handlePanMove, handlePanEnd, handleNodeDragMove, handleNodeDragEnd]);

  // Touch events
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if ((e.target as HTMLElement).closest('.space-node')) return;
      if (e.touches.length === 1) handlePanStart(e.touches[0].clientX, e.touches[0].clientY);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        if (draggingNodeId !== null) handleNodeDragMove(e.touches[0].clientX, e.touches[0].clientY);
        else if (isPanning) handlePanMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    };
    const handleTouchEnd = () => { handlePanEnd(); handleNodeDragEnd(); };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: true });
      container.addEventListener('touchmove', handleTouchMove, { passive: true });
      container.addEventListener('touchend', handleTouchEnd);
    }
    return () => {
      container?.removeEventListener('touchstart', handleTouchStart);
      container?.removeEventListener('touchmove', handleTouchMove);
      container?.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isPanning, draggingNodeId, handlePanStart, handlePanMove, handlePanEnd, handleNodeDragMove, handleNodeDragEnd]);

  // Parallax effect
  useEffect(() => {
    const smoothing = () => {
      setSmoothTilt(prev => ({
        x: prev.x + (targetTilt.current.x - prev.x) * 0.08,
        y: prev.y + (targetTilt.current.y - prev.y) * 0.08,
      }));
      animationRef.current = requestAnimationFrame(smoothing);
    };
    animationRef.current = requestAnimationFrame(smoothing);

    const handleMouseMove = (event: MouseEvent) => {
      if (isPanning) return;
      targetTilt.current = {
        x: (event.clientX / window.innerWidth - 0.5) * 2,
        y: (event.clientY / window.innerHeight - 0.5) * 2,
      };
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [isPanning]);

  const getNodeById = (id: string) => nodes.find(n => n.id === id);
  const getNodeSize = (id: string) => nodeSizes.get(id) || { width: 100, height: 50 };
  
  // Найти путь от выбранной ноды к корню (AI)
  const getPathToRoot = useCallback((nodeId: string | null): string[] => {
    if (!nodeId) return [];
    const path: string[] = [nodeId];
    let current = nodeId;
    
    while (current !== 'ai') {
      // Найти родительскую связь (connection где to === current)
      const parentConn = connections.find(c => c.to === current);
      if (!parentConn) break;
      path.push(parentConn.from);
      current = parentConn.from;
    }
    return path;
  }, []);
  
  // Проверить, является ли связь частью пути к выбранной ноде
  const isConnectionActive = useCallback((conn: { from: string; to: string }) => {
    if (!selectedId) return false;
    const pathToRoot = getPathToRoot(selectedId);
    // Связь активна если both from и to в пути
    const fromIndex = pathToRoot.indexOf(conn.from);
    const toIndex = pathToRoot.indexOf(conn.to);
    return fromIndex !== -1 && toIndex !== -1 && Math.abs(fromIndex - toIndex) === 1;
  }, [selectedId, getPathToRoot]);

  return (
    <div ref={containerRef} className={`space-container ${isPanning ? 'panning' : ''}`}>
      {/* Звёзды - двигаются с параллаксом И с паном */}
      {starLayers.map((layer, i) => (
        <div key={i} className="star-layer" style={{
          transform: `translate(${smoothTilt.x * layer.speed + pan.x * (0.1 + i * 0.05)}px, ${smoothTilt.y * layer.speed + pan.y * (0.1 + i * 0.05)}px)`,
        }}>
          {layer.stars.map((star, j) => (
            <div key={j} className="star" style={{
              left: `${star.x}%`, top: `${star.y}%`,
              width: `${layer.size}px`, height: `${layer.size}px`,
              opacity: layer.opacity,
            }} />
          ))}
        </div>
      ))}

      {/* Падающие звёзды */}
      {shootingStars.map(star => (
        <div
          key={star.id}
          className="shooting-star"
          style={{
            left: `${star.startX}%`,
            top: `${star.startY}%`,
            '--angle': `${star.angle}deg`,
            '--length': `${star.length}px`,
            '--speed': `${star.speed}s`,
          } as React.CSSProperties}
        />
      ))}

      {/* Заголовок */}
      <h1 className="space-title">🌌 Neural Explorer</h1>
      <p className="space-subtitle">Перетаскивай ноды • Двигай поле • Смотри на звёзды</p>

      {/* Pan layer */}
      <div className="pan-layer" style={{ transform: `translate(${pan.x}px, ${pan.y}px)` }}>
        {/* SVG для связей - большой размер */}
        <svg className="connections" style={{
          position: 'absolute',
          left: '-2000px',
          top: '-2000px',
          width: '6000px',
          height: '6000px',
          overflow: 'visible',
        }}>
          <defs>
            <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.5" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {connections.map((conn, i) => {
            const from = getNodeById(conn.from);
            const to = getNodeById(conn.to);
            if (!from || !to) return null;
            
            const fromSize = getNodeSize(from.id);
            const toSize = getNodeSize(to.id);
            
            // +2000 для компенсации отрицательного offset SVG
            const startX = from.x + fromSize.width + 2000;
            const startY = from.y + fromSize.height / 2 + 2000;
            const endX = to.x + 2000;
            const endY = to.y + toSize.height / 2 + 2000;
            
            const dx = Math.abs(endX - startX);
            const tension = Math.max(dx * 0.4, 50);
            const pathD = `M ${startX} ${startY} C ${startX + tension} ${startY}, ${endX - tension} ${endY}, ${endX} ${endY}`;
            const pathId = `path-${i}`;
            const isActive = isConnectionActive(conn);
            
            return (
              <g key={i}>
                <path
                  id={pathId}
                  d={pathD}
                  stroke={isActive ? '#a855f7' : 'url(#lineGradient)'}
                  strokeWidth={isActive ? 2.5 : 2}
                  fill="none"
                  filter="url(#glow)"
                  className={`connection-line ${isActive ? 'active' : ''}`}
                />
                {/* Импульсы-точки - разные скорости и задержки для рандома */}
                {isActive && (
                  <>
                    <circle r="2" fill="white" style={{ filter: 'drop-shadow(0 0 3px #a855f7) drop-shadow(0 0 6px #a855f7)' }}>
                      <animateMotion dur="4.5s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear" begin="0s">
                        <mpath href={`#${pathId}`} />
                      </animateMotion>
                    </circle>
                    <circle r="2.5" fill="white" style={{ filter: 'drop-shadow(0 0 3px #a855f7) drop-shadow(0 0 6px #a855f7)' }}>
                      <animateMotion dur="5.2s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear" begin="0.8s">
                        <mpath href={`#${pathId}`} />
                      </animateMotion>
                    </circle>
                    <circle r="2" fill="white" style={{ filter: 'drop-shadow(0 0 3px #a855f7) drop-shadow(0 0 6px #a855f7)' }}>
                      <animateMotion dur="6s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear" begin="2.3s">
                        <mpath href={`#${pathId}`} />
                      </animateMotion>
                    </circle>
                  </>
                )}
              </g>
            );
          })}
        </svg>

        {/* Ноды */}
        {nodes.map((node) => (
          <div
            key={node.id}
            ref={(el) => { if (el) nodeRefs.current.set(node.id, el); }}
            className={`space-node level-${node.level} ${selectedId === node.id ? 'selected' : ''} ${draggingNodeId === node.id ? 'dragging' : ''}`}
            style={{ 
              left: `${node.x}px`, 
              top: `${node.y}px`,
              '--level-color': levelColors[node.level] || '#6366f1',
            } as React.CSSProperties}
            onMouseDown={(e) => { e.stopPropagation(); handleNodeDragStart(node.id, e.clientX, e.clientY); }}
            onTouchStart={(e) => { e.stopPropagation(); if (e.touches.length === 1) handleNodeDragStart(node.id, e.touches[0].clientX, e.touches[0].clientY); }}
            onClick={(e) => { e.stopPropagation(); if (!draggingNodeId) setSelectedId(selectedId === node.id ? null : node.id); }}
          >
            <div className="node-glow"></div>
            <div className="node-content">
              <span className="node-icon">{node.emoji}</span>
              <span className="node-name">{node.name}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="pan-indicator">📍 {Math.round(pan.x)}, {Math.round(pan.y)}</div>
    </div>
  );
}
