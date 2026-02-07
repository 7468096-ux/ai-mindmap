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
  // Дальний план - мелкие тусклые
  { stars: generateStars(60, 1), size: 0.8, speed: 140, opacity: 0.3 },
  { stars: generateStars(50, 2), size: 1, speed: 120, opacity: 0.4 },
  { stars: generateStars(45, 3), size: 1.3, speed: 100, opacity: 0.5 },
  // Средний план
  { stars: generateStars(35, 4), size: 1.8, speed: 80, opacity: 0.6 },
  { stars: generateStars(30, 5), size: 2.2, speed: 60, opacity: 0.7 },
  { stars: generateStars(25, 6), size: 2.8, speed: 40, opacity: 0.8 },
  // Передний план - крупные яркие
  { stars: generateStars(15, 7), size: 3.5, speed: 25, opacity: 0.9 },
  { stars: generateStars(10, 8), size: 4.5, speed: 15, opacity: 1 },
  { stars: generateStars(5, 9), size: 6, speed: 8, opacity: 1 },
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

// Ручная расстановка позиций - СЕТКА с подгруппами
function getManualPositions(): Map<string, { x: number; y: number }> {
  const positions = new Map<string, { x: number; y: number }>();
  
  // Сетка - колонки
  const COL0 = 0;       // AI (корень)
  const COL1 = 350;     // Theory (ML, DL, NLP, CV)
  const COL2 = 700;     // Methods
  const COL3 = 1050;    // Algorithms
  const COL4 = 1400;    // Implementations
  const COL5 = 1750;    // Far implementations
  
  // Вертикальные секции для подгрупп
  const ML_Y = 0;           // ML branch top
  const DL_Y = 900;         // DL branch 
  const NLP_Y = 2100;       // NLP branch
  const CV_Y = 2900;        // CV branch
  
  const ROW = 120;          // Шаг между нодами в группе
  
  // === ROOT ===
  positions.set('ai', { x: COL0, y: 1400 });
  
  // === ML BRANCH (верх) ===
  positions.set('ml', { x: COL1, y: ML_Y + 300 });
  
  // ML Methods - вертикальный столбец
  positions.set('supervised', { x: COL2, y: ML_Y + 100 });
  positions.set('unsupervised', { x: COL2, y: ML_Y + 400 });
  positions.set('rl', { x: COL2, y: ML_Y + 700 });
  
  // Supervised algorithms - столбец
  positions.set('linear-reg', { x: COL3, y: ML_Y });
  positions.set('decision-tree', { x: COL3, y: ML_Y + ROW });
  positions.set('svm', { x: COL3, y: ML_Y + ROW * 2 });
  positions.set('random-forest', { x: COL4, y: ML_Y + ROW });
  
  // Unsupervised algorithms
  positions.set('kmeans', { x: COL3, y: ML_Y + 400 });
  positions.set('pca', { x: COL3, y: ML_Y + 400 + ROW });
  
  // RL algorithms
  positions.set('qlearning', { x: COL3, y: ML_Y + 720 });
  
  // === DL BRANCH (центр-верх) ===
  positions.set('dl', { x: COL1, y: DL_Y + 400 });
  
  // DL Architectures - столбец
  positions.set('nn', { x: COL2, y: DL_Y });
  positions.set('cnn', { x: COL2, y: DL_Y + ROW });
  positions.set('rnn', { x: COL2, y: DL_Y + ROW * 2 });
  positions.set('transformer', { x: COL2, y: DL_Y + ROW * 3 });
  positions.set('gan', { x: COL2, y: DL_Y + ROW * 5 });
  positions.set('vae', { x: COL2, y: DL_Y + ROW * 6 });
  positions.set('diffusion', { x: COL2, y: DL_Y + ROW * 7 });
  
  // DL sub-architectures
  positions.set('lstm', { x: COL3, y: DL_Y + ROW * 2 });
  positions.set('attention', { x: COL3, y: DL_Y + ROW * 3 });
  
  // === NLP BRANCH (центр-низ) ===
  positions.set('nlp', { x: COL1, y: NLP_Y + 200 });
  
  // NLP components - столбец
  positions.set('embeddings', { x: COL2, y: NLP_Y });
  positions.set('tokenization', { x: COL2, y: NLP_Y + ROW });
  positions.set('llm', { x: COL2, y: NLP_Y + ROW * 3 });
  
  // NLP implementations
  positions.set('gpt', { x: COL3, y: NLP_Y + ROW * 3 });
  positions.set('bert', { x: COL3, y: NLP_Y + ROW * 4 });
  positions.set('clip', { x: COL4, y: NLP_Y + ROW * 5 });
  
  // === CV BRANCH (низ) ===
  positions.set('cv', { x: COL1, y: CV_Y + 200 });
  
  // CV methods - столбец
  positions.set('img-classification', { x: COL2, y: CV_Y });
  positions.set('obj-detection', { x: COL2, y: CV_Y + ROW });
  positions.set('segmentation', { x: COL2, y: CV_Y + ROW * 2 });
  
  // CV implementations
  positions.set('resnet', { x: COL3, y: CV_Y });
  positions.set('yolo', { x: COL3, y: CV_Y + ROW });
  positions.set('vit', { x: COL3, y: CV_Y + ROW * 3 });
  
  // === NEW NODES ===
  // NLP additions
  positions.set('word2vec', { x: COL3, y: NLP_Y });
  positions.set('rag', { x: COL4, y: NLP_Y + ROW * 3 });
  positions.set('finetuning', { x: COL4, y: NLP_Y + ROW * 5 });
  positions.set('agents', { x: COL5, y: NLP_Y + ROW * 4 });
  
  // DL training techniques - справа от архитектур, не накладываются
  positions.set('dropout', { x: COL4, y: DL_Y + 30 });
  positions.set('batchnorm', { x: COL4, y: DL_Y + ROW + 50 });
  positions.set('adam', { x: COL4, y: DL_Y + ROW * 2 + 70 });
  positions.set('autoencoder', { x: COL2, y: DL_Y + ROW * 8 });
  positions.set('moe', { x: COL3, y: DL_Y + ROW * 5 });
  
  // More ML algorithms
  positions.set('logreg', { x: COL4, y: ML_Y + 240 });
  positions.set('xgboost', { x: COL5, y: ML_Y + 180 });
  
  // CV implementations
  positions.set('unet', { x: COL4, y: CV_Y + ROW * 2 + 30 });
  positions.set('stable-diffusion', { x: COL4, y: DL_Y + ROW * 8 });
  
  // NLP/LLM techniques
  positions.set('prompt-eng', { x: COL3, y: NLP_Y + ROW * 5 + 30 });
  positions.set('cot', { x: COL4, y: NLP_Y + ROW * 6 });
  
  return positions;
}

export default function SpaceMindMap() {
  // English по умолчанию
  const [lang, setLang] = useState<Language>('en');
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
  
  // Ручные позиции для красивого дерева
  const initialPositions = useMemo(() => getManualPositions(), []);
  
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
  const [zoom, setZoom] = useState(0.65);
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

  // Создание падающих звёзд - по всему пространству
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const createShootingStar = () => {
      // Случайная позиция по всему экрану
      const startX = -20 + Math.random() * 140; // От -20% до 120%
      const startY = -20 + Math.random() * 100; // От -20% до 80%
      
      const star: ShootingStar = {
        id: shootingStarId.current++,
        startX,
        startY,
        angle: 30 + Math.random() * 30, // 30-60 градусов
        length: 150 + Math.random() * 200,
        speed: 2 + Math.random() * 1.5,
      };
      setShootingStars(prev => [...prev, star]);
      
      setTimeout(() => {
        setShootingStars(prev => prev.filter(s => s.id !== star.id));
      }, star.speed * 1000 + 500);
      
      // Чаще - каждые 10-30 сек
      const nextDelay = 10000 + Math.random() * 20000;
      timeoutId = setTimeout(createShootingStar, nextDelay);
    };

    const firstDelay = 2000 + Math.random() * 3000;
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

  // Zoom with mouse wheel - плавный
  const targetZoom = useRef(zoom);
  
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.08 : 0.08;
      targetZoom.current = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, targetZoom.current + delta));
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      container?.removeEventListener('wheel', handleWheel);
    };
  }, []);
  
  // Супер-плавная анимация zoom
  useEffect(() => {
    let animationId: number;
    const animateZoom = () => {
      setZoom(prev => {
        const diff = targetZoom.current - prev;
        if (Math.abs(diff) < 0.0005) return targetZoom.current;
        return prev + diff * 0.06; // Супер-плавность
      });
      animationId = requestAnimationFrame(animateZoom);
    };
    animationId = requestAnimationFrame(animateZoom);
    return () => cancelAnimationFrame(animationId);
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
    if (wasDragging) return;
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
      {/* Свечение галактики в правом верхнем углу */}
      <div className="galaxy-glow" />
      <div className="galaxy-core" />
      
      {/* Звёзды - реагируют на zoom */}
      {starLayers.map((layer, i) => {
        // Дальние слои (маленькие звёзды) меньше реагируют на zoom
        const zoomFactor = 1 + (zoom - 0.65) * (0.1 + i * 0.08);
        return (
          <div key={i} className="star-layer" style={{
            transform: `translate(${smoothTilt.x * layer.speed + pan.x * (0.1 + i * 0.05)}px, ${smoothTilt.y * layer.speed + pan.y * (0.1 + i * 0.05)}px) scale(${zoomFactor})`,
            transition: 'transform 0.3s ease-out',
          }}>
            {layer.stars.map((star, j) => (
              <div key={j} className="star" style={{
                left: `${star.x}%`, top: `${star.y}%`,
                width: `${layer.size}px`, height: `${layer.size}px`,
                opacity: layer.opacity,
              }} />
            ))}
          </div>
        );
      })}

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
