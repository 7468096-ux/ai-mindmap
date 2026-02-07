'use client';

import { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import InfoPanel from './InfoPanel';
import LanguageToggle from './LanguageToggle';
import { initialNodes as dataNodes, initialEdges, AINode, Language, levelColors, levelLabels, AbstractionLevel } from '@/data/nodes';

interface SpaceNode {
  id: string;
  name: string;
  emoji: string;
  level: AbstractionLevel;
  x: number;
  y: number;
  data: AINode['data'];
}

interface Connection {
  from: string;
  to: string;
  dashed?: boolean;
}

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

interface ShootingStar {
  id: number;
  startX: number;
  startY: number;
  angle: number;
  length: number;
  speed: number;
}

const spaceColors: Record<AbstractionLevel, string> = {
  field: '#6366f1',
  theory: '#8b5cf6',
  method: '#06b6d4',
  algorithm: '#10b981',
  implementation: '#f59e0b',
};

// Автоматический расчёт позиций для горизонтального дерева
function calculateTreeLayout(
  edges: Connection[],
  nodeIds: string[]
): Map<string, { x: number; y: number }> {
  const positions = new Map<string, { x: number; y: number }>();
  
  // Построим дерево
  const children = new Map<string, string[]>();
  const parents = new Map<string, string>();
  
  edges.forEach(edge => {
    if (!edge.dashed) { // Только основные связи для layout
      if (!children.has(edge.from)) children.set(edge.from, []);
      children.get(edge.from)!.push(edge.to);
      parents.set(edge.to, edge.from);
    }
  });
  
  // Найти корень (ai)
  const root = 'ai';
  
  // BFS для определения уровней (columns)
  const levels = new Map<string, number>();
  const queue: string[] = [root];
  levels.set(root, 0);
  
  while (queue.length > 0) {
    const node = queue.shift()!;
    const level = levels.get(node)!;
    const nodeChildren = children.get(node) || [];
    nodeChildren.forEach(child => {
      if (!levels.has(child)) {
        levels.set(child, level + 1);
        queue.push(child);
      }
    });
  }
  
  // Добавить ноды без связей
  nodeIds.forEach(id => {
    if (!levels.has(id)) {
      levels.set(id, 5); // Ставим справа
    }
  });
  
  // Группируем по уровням
  const nodesByLevel = new Map<number, string[]>();
  levels.forEach((level, nodeId) => {
    if (!nodesByLevel.has(level)) nodesByLevel.set(level, []);
    nodesByLevel.get(level)!.push(nodeId);
  });
  
  // Расстановка
  const LEVEL_WIDTH = 250; // Расстояние между колонками
  const NODE_HEIGHT = 100; // Расстояние между нодами в колонке
  const START_X = 100;
  const CENTER_Y = 400;
  
  nodesByLevel.forEach((nodes, level) => {
    const x = START_X + level * LEVEL_WIDTH;
    const totalHeight = (nodes.length - 1) * NODE_HEIGHT;
    const startY = CENTER_Y - totalHeight / 2;
    
    nodes.forEach((nodeId, index) => {
      positions.set(nodeId, {
        x,
        y: startY + index * NODE_HEIGHT,
      });
    });
  });
  
  return positions;
}

export default function SpaceMindMap() {
  const [lang, setLang] = useState<Language>('ru');
  const [selectedNode, setSelectedNode] = useState<AINode | null>(null);
  const [smoothTilt, setSmoothTilt] = useState({ x: 0, y: 0 });
  const targetTilt = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number>();
  
  const connections = useMemo<Connection[]>(() => 
    initialEdges.map(edge => ({
      from: edge.source,
      to: edge.target,
      dashed: edge.style?.strokeDasharray !== undefined,
    })),
    []
  );
  
  // Рассчитываем начальные позиции
  const initialPositions = useMemo(() => {
    const nodeIds = dataNodes.map(n => n.id);
    return calculateTreeLayout(connections, nodeIds);
  }, [connections]);
  
  // Состояние позиций нод (для drag)
  const [nodePositions, setNodePositions] = useState<Map<string, { x: number; y: number }>>(initialPositions);
  
  // Ноды с актуальными позициями
  const nodes = useMemo<SpaceNode[]>(() => 
    dataNodes.map(node => {
      const pos = nodePositions.get(node.id) || { x: 0, y: 0 };
      return {
        id: node.id,
        name: node.data[lang]?.label || node.id,
        emoji: node.data.emoji || '📦',
        level: node.data.level,
        x: pos.x,
        y: pos.y,
        data: node.data,
      };
    }),
    [lang, nodePositions]
  );

  const nodeRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [nodeSizes, setNodeSizes] = useState<Map<string, { width: number; height: number }>>(new Map());
  
  // Pan state
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const panStart = useRef({ x: 0, y: 0 });
  const panOffset = useRef({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Zoom state
  const [zoom, setZoom] = useState(0.7);
  const MIN_ZOOM = 0.2;
  const MAX_ZOOM = 2;
  
  // Node drag state
  const [draggingNodeId, setDraggingNodeId] = useState<string | null>(null);
  const dragStart = useRef({ x: 0, y: 0 });
  const nodeStartPos = useRef({ x: 0, y: 0 });

  // Shooting stars
  const [shootingStars, setShootingStars] = useState<ShootingStar[]>([]);
  const shootingStarId = useRef(0);

  // Измерение размеров нод
  useEffect(() => {
    const timer = setTimeout(() => {
      const sizes = new Map<string, { width: number; height: number }>();
      nodeRefs.current.forEach((el, id) => {
        if (el) {
          const rect = el.getBoundingClientRect();
          sizes.set(id, { width: rect.width / zoom, height: rect.height / zoom });
        }
      });
      setNodeSizes(sizes);
    }, 100);
    return () => clearTimeout(timer);
  }, [nodes, zoom]);

  // Создание падающих звёзд
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const createShootingStar = () => {
      const fromTop = Math.random() > 0.5;
      const star: ShootingStar = {
        id: shootingStarId.current++,
        startX: fromTop ? (20 + Math.random() * 80) : (90 + Math.random() * 15),
        startY: fromTop ? (-5 + Math.random() * 10) : (Math.random() * 60),
        angle: 35 + Math.random() * 20,
        length: 200 + Math.random() * 150,
        speed: 1.8 + Math.random() * 1.2,
      };
      setShootingStars(prev => [...prev, star]);
      
      setTimeout(() => {
        setShootingStars(prev => prev.filter(s => s.id !== star.id));
      }, star.speed * 1000 + 500);
      
      const nextDelay = 20000 + Math.random() * 40000;
      timeoutId = setTimeout(createShootingStar, nextDelay);
    };

    const firstDelay = 3000 + Math.random() * 5000;
    timeoutId = setTimeout(createShootingStar, firstDelay);

    return () => clearTimeout(timeoutId);
  }, []);

  // Node drag handlers
  const handleNodeDragStart = useCallback((nodeId: string, clientX: number, clientY: number) => {
    const pos = nodePositions.get(nodeId);
    if (!pos) return;
    setDraggingNodeId(nodeId);
    dragStart.current = { x: clientX, y: clientY };
    nodeStartPos.current = { x: pos.x, y: pos.y };
  }, [nodePositions]);

  const handleNodeDragMove = useCallback((clientX: number, clientY: number) => {
    if (draggingNodeId === null) return;
    const dx = (clientX - dragStart.current.x) / zoom;
    const dy = (clientY - dragStart.current.y) / zoom;
    setNodePositions(prev => {
      const next = new Map(prev);
      next.set(draggingNodeId, {
        x: nodeStartPos.current.x + dx,
        y: nodeStartPos.current.y + dy,
      });
      return next;
    });
  }, [draggingNodeId, zoom]);

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

  // Mouse events
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest('.space-node')) return;
      handlePanStart(e.clientX, e.clientY);
    };
    const handleMouseMove = (e: MouseEvent) => {
      if (draggingNodeId !== null) {
        handleNodeDragMove(e.clientX, e.clientY);
      } else if (isPanning) {
        handlePanMove(e.clientX, e.clientY);
      }
    };
    const handleMouseUp = () => { 
      handlePanEnd(); 
      handleNodeDragEnd(); 
    };

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

  // Zoom with mouse wheel
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
      setZoom(prev => Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, prev + delta)));
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      container?.removeEventListener('wheel', handleWheel);
    };
  }, []);

  // Touch events
  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      if ((e.target as HTMLElement).closest('.space-node')) return;
      if (e.touches.length === 1) handlePanStart(e.touches[0].clientX, e.touches[0].clientY);
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 1) {
        if (draggingNodeId !== null) {
          handleNodeDragMove(e.touches[0].clientX, e.touches[0].clientY);
        } else if (isPanning) {
          handlePanMove(e.touches[0].clientX, e.touches[0].clientY);
        }
      }
    };
    const handleTouchEnd = () => { 
      handlePanEnd(); 
      handleNodeDragEnd(); 
    };

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
      if (isPanning || draggingNodeId) return;
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
  }, [isPanning, draggingNodeId]);

  const getNodeById = (id: string) => nodes.find(n => n.id === id);
  const getNodeSize = (id: string) => nodeSizes.get(id) || { width: 130, height: 70 };
  
  const getPathToRoot = useCallback((nodeId: string | null): string[] => {
    if (!nodeId) return [];
    const path: string[] = [nodeId];
    let current = nodeId;
    
    while (current !== 'ai') {
      const parentConn = connections.find(c => c.to === current && !c.dashed);
      if (!parentConn) break;
      path.push(parentConn.from);
      current = parentConn.from;
    }
    return path;
  }, [connections]);
  
  const isConnectionActive = useCallback((conn: Connection) => {
    if (!selectedNode) return false;
    const pathToRoot = getPathToRoot(selectedNode.id);
    const fromIndex = pathToRoot.indexOf(conn.from);
    const toIndex = pathToRoot.indexOf(conn.to);
    return fromIndex !== -1 && toIndex !== -1 && Math.abs(fromIndex - toIndex) === 1;
  }, [selectedNode, getPathToRoot]);

  const handleNodeClick = (node: SpaceNode, wasDragging: boolean) => {
    if (wasDragging) return; // Не открывать панель после drag
    const aiNode: AINode = {
      id: node.id,
      position: { x: node.x, y: node.y },
      type: 'custom',
      data: node.data,
    };
    setSelectedNode(selectedNode?.id === node.id ? null : aiNode);
  };

  return (
    <div ref={containerRef} className={`space-container ${isPanning ? 'panning' : ''}`}>
      {/* Звёзды */}
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
      <div className="absolute top-4 left-4 z-50 flex items-start gap-4">
        <div className="text-white">
          <h1 className="text-2xl font-bold flex items-center gap-2">
            🧠 AI Mindmap
          </h1>
          <p className="text-gray-400 text-sm">
            {lang === 'ru' ? 'Перетаскивай ноды • Кликни для описания' : 'Drag nodes • Click for details'}
          </p>
        </div>
        <LanguageToggle lang={lang} onChange={setLang} />
      </div>

      {/* Pan layer */}
      <div className="pan-layer" style={{ 
        transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`, 
        transformOrigin: 'center center' 
      }}>
        {/* SVG для связей */}
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
                  strokeDasharray={conn.dashed ? '5,5' : undefined}
                  fill="none"
                  filter="url(#glow)"
                  className={`connection-line ${isActive ? 'active' : ''}`}
                />
                {isActive && (() => {
                  const baseOffset = (i * 1.7) % 5;
                  const glow = 'drop-shadow(0 0 4px #fff) drop-shadow(0 0 8px #a855f7) drop-shadow(0 0 15px #a855f7) drop-shadow(0 0 25px #8b5cf6)';
                  return (
                    <>
                      <circle r="2.5" fill="white" style={{ filter: glow }}>
                        <animateMotion dur="5s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear" begin={`${baseOffset}s`}>
                          <mpath href={`#${pathId}`} />
                        </animateMotion>
                      </circle>
                      <circle r="2.5" fill="white" style={{ filter: glow }}>
                        <animateMotion dur="5s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear" begin={`${baseOffset + 1.6}s`}>
                          <mpath href={`#${pathId}`} />
                        </animateMotion>
                      </circle>
                      <circle r="2.5" fill="white" style={{ filter: glow }}>
                        <animateMotion dur="5s" repeatCount="indefinite" keyPoints="1;0" keyTimes="0;1" calcMode="linear" begin={`${baseOffset + 3.3}s`}>
                          <mpath href={`#${pathId}`} />
                        </animateMotion>
                      </circle>
                    </>
                  );
                })()}
              </g>
            );
          })}
        </svg>

        {/* Ноды */}
        {nodes.map((node) => {
          const isDragging = draggingNodeId === node.id;
          return (
            <div
              key={node.id}
              ref={(el) => { if (el) nodeRefs.current.set(node.id, el); }}
              className={`space-node ${selectedNode?.id === node.id ? 'selected' : ''} ${isDragging ? 'dragging' : ''}`}
              style={{ 
                left: `${node.x}px`, 
                top: `${node.y}px`,
                '--level-color': spaceColors[node.level],
              } as React.CSSProperties}
              onMouseDown={(e) => { 
                e.stopPropagation(); 
                handleNodeDragStart(node.id, e.clientX, e.clientY); 
              }}
              onTouchStart={(e) => { 
                e.stopPropagation(); 
                if (e.touches.length === 1) {
                  handleNodeDragStart(node.id, e.touches[0].clientX, e.touches[0].clientY); 
                }
              }}
              onClick={(e) => { 
                e.stopPropagation(); 
                // Проверяем был ли drag (если мышь сдвинулась больше 5px)
                const wasDragging = Math.abs(e.clientX - dragStart.current.x) > 5 || 
                                   Math.abs(e.clientY - dragStart.current.y) > 5;
                handleNodeClick(node, wasDragging); 
              }}
            >
              <div className="node-glow"></div>
              <div className="node-content">
                <span className="node-icon">{node.emoji}</span>
                <span className="node-name">{node.name}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Легенда */}
      <div className="absolute bottom-4 left-4 bg-gray-900/90 rounded-lg p-3 text-xs backdrop-blur z-50">
        <div className="text-gray-400 mb-2 uppercase tracking-wide">
          {lang === 'ru' ? 'Уровень абстракции' : 'Abstraction Level'}
        </div>
        <div className="flex flex-wrap gap-2 mb-3">
          {(Object.keys(levelColors) as Array<AbstractionLevel>).map((level) => (
            <span key={level} className="flex items-center gap-1.5 text-gray-300">
              <span 
                className="w-3 h-3 rounded"
                style={{ backgroundColor: levelColors[level] }}
              />
              {levelLabels[lang][level]}
            </span>
          ))}
        </div>
      </div>

      {/* Индикатор zoom/pan */}
      <div className="pan-indicator">
        📍 {Math.round(pan.x)}, {Math.round(pan.y)} | 🔍 {Math.round(zoom * 100)}%
      </div>

      <InfoPanel node={selectedNode} lang={lang} onClose={() => setSelectedNode(null)} />
    </div>
  );
}
