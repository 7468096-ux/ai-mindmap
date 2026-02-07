'use client';

import { useState, useEffect, useRef } from 'react';

type Language = 'ru' | 'en';

interface Props {
  lang?: Language;
}

interface Point {
  x: number;
  y: number;
  label: 1 | -1;
}

export default function SVMDemo({ lang = 'en' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [points, setPoints] = useState<Point[]>([]);
  const [kernel, setKernel] = useState<'linear' | 'rbf'>('linear');
  const [C, setC] = useState(1);
  const [showMargin, setShowMargin] = useState(true);
  
  const texts = {
    ru: {
      title: '⚔️ SVM — Метод опорных векторов',
      desc: 'Кликай чтобы добавить точки (ЛКМ = синие, ПКМ = красные)',
      kernel: 'Ядро',
      linear: 'Линейное',
      rbf: 'RBF',
      margin: 'Показать отступ',
      clear: 'Очистить',
      cParam: 'Параметр C',
      soft: 'мягкий',
      hard: 'жёсткий',
      hint: 'SVM находит линию (гиперплоскость) с максимальным отступом от ближайших точек обоих классов',
    },
    en: {
      title: '⚔️ SVM — Support Vector Machine',
      desc: 'Click to add points (LMB = blue, RMB = red)',
      kernel: 'Kernel',
      linear: 'Linear',
      rbf: 'RBF',
      margin: 'Show margin',
      clear: 'Clear',
      cParam: 'C parameter',
      soft: 'soft',
      hard: 'hard',
      hint: 'SVM finds a line (hyperplane) with maximum margin from nearest points of both classes',
    },
  };
  const t = texts[lang];

  // Generate initial demo points
  useEffect(() => {
    const initial: Point[] = [];
    // Blue class (top-left cluster)
    for (let i = 0; i < 8; i++) {
      initial.push({
        x: 80 + Math.random() * 100,
        y: 60 + Math.random() * 80,
        label: 1,
      });
    }
    // Red class (bottom-right cluster)
    for (let i = 0; i < 8; i++) {
      initial.push({
        x: 220 + Math.random() * 100,
        y: 160 + Math.random() * 80,
        label: -1,
      });
    }
    setPoints(initial);
  }, []);

  // Simple linear SVM approximation (for visualization)
  const computeSVM = (pts: Point[]) => {
    if (pts.length < 2) return null;
    
    const class1 = pts.filter(p => p.label === 1);
    const class2 = pts.filter(p => p.label === -1);
    
    if (class1.length === 0 || class2.length === 0) return null;
    
    // Find centroids
    const c1 = {
      x: class1.reduce((s, p) => s + p.x, 0) / class1.length,
      y: class1.reduce((s, p) => s + p.y, 0) / class1.length,
    };
    const c2 = {
      x: class2.reduce((s, p) => s + p.x, 0) / class2.length,
      y: class2.reduce((s, p) => s + p.y, 0) / class2.length,
    };
    
    // Direction vector between centroids
    const dx = c2.x - c1.x;
    const dy = c2.y - c1.y;
    const len = Math.sqrt(dx * dx + dy * dy);
    
    if (len === 0) return null;
    
    // Normal to the separating line
    const nx = dx / len;
    const ny = dy / len;
    
    // Midpoint
    const mid = { x: (c1.x + c2.x) / 2, y: (c1.y + c2.y) / 2 };
    
    // Find support vectors (closest points to the line)
    let minDist1 = Infinity, minDist2 = Infinity;
    let sv1: Point | null = null, sv2: Point | null = null;
    
    for (const p of class1) {
      const dist = Math.abs((p.x - mid.x) * nx + (p.y - mid.y) * ny);
      if (dist < minDist1) {
        minDist1 = dist;
        sv1 = p;
      }
    }
    for (const p of class2) {
      const dist = Math.abs((p.x - mid.x) * nx + (p.y - mid.y) * ny);
      if (dist < minDist2) {
        minDist2 = dist;
        sv2 = p;
      }
    }
    
    const margin = (minDist1 + minDist2) / 2;
    
    return { mid, nx, ny, margin, sv1, sv2, perpX: -ny, perpY: nx };
  };

  // Draw
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;

    // Clear
    ctx.fillStyle = '#0a0a1a';
    ctx.fillRect(0, 0, width, height);

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.05)';
    ctx.lineWidth = 1;
    for (let x = 0; x < width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += 40) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    const svm = computeSVM(points);

    if (svm && kernel === 'linear') {
      const { mid, perpX, perpY, margin, sv1, sv2, nx, ny } = svm;
      
      // Draw margin area
      if (showMargin) {
        ctx.fillStyle = 'rgba(139, 92, 246, 0.15)';
        ctx.beginPath();
        const lineLen = 400;
        const m = margin;
        ctx.moveTo(mid.x + perpX * lineLen + nx * m, mid.y + perpY * lineLen + ny * m);
        ctx.lineTo(mid.x - perpX * lineLen + nx * m, mid.y - perpY * lineLen + ny * m);
        ctx.lineTo(mid.x - perpX * lineLen - nx * m, mid.y - perpY * lineLen - ny * m);
        ctx.lineTo(mid.x + perpX * lineLen - nx * m, mid.y + perpY * lineLen - ny * m);
        ctx.closePath();
        ctx.fill();
      }
      
      // Draw hyperplane
      ctx.strokeStyle = '#a855f7';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(mid.x + perpX * 300, mid.y + perpY * 300);
      ctx.lineTo(mid.x - perpX * 300, mid.y - perpY * 300);
      ctx.stroke();
      
      // Draw margin lines
      if (showMargin) {
        ctx.strokeStyle = 'rgba(168, 85, 247, 0.5)';
        ctx.setLineDash([5, 5]);
        ctx.beginPath();
        ctx.moveTo(mid.x + perpX * 300 + nx * margin, mid.y + perpY * 300 + ny * margin);
        ctx.lineTo(mid.x - perpX * 300 + nx * margin, mid.y - perpY * 300 + ny * margin);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(mid.x + perpX * 300 - nx * margin, mid.y + perpY * 300 - ny * margin);
        ctx.lineTo(mid.x - perpX * 300 - nx * margin, mid.y - perpY * 300 - ny * margin);
        ctx.stroke();
        ctx.setLineDash([]);
      }
      
      // Highlight support vectors
      if (sv1) {
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(sv1.x, sv1.y, 14, 0, Math.PI * 2);
        ctx.stroke();
      }
      if (sv2) {
        ctx.strokeStyle = '#fff';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(sv2.x, sv2.y, 14, 0, Math.PI * 2);
        ctx.stroke();
      }
    }

    // RBF kernel visualization (simplified - show decision regions)
    if (kernel === 'rbf' && points.length > 0) {
      const gamma = 0.01 * C;
      for (let px = 0; px < width; px += 8) {
        for (let py = 0; py < height; py += 8) {
          let sum = 0;
          for (const p of points) {
            const dist = (px - p.x) ** 2 + (py - p.y) ** 2;
            sum += p.label * Math.exp(-gamma * dist);
          }
          if (Math.abs(sum) < 0.3) {
            ctx.fillStyle = 'rgba(139, 92, 246, 0.3)';
            ctx.fillRect(px, py, 8, 8);
          }
        }
      }
    }

    // Draw points
    for (const p of points) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, 8, 0, Math.PI * 2);
      ctx.fillStyle = p.label === 1 ? '#3b82f6' : '#ef4444';
      ctx.fill();
      ctx.strokeStyle = 'rgba(255,255,255,0.5)';
      ctx.lineWidth = 1;
      ctx.stroke();
    }

  }, [points, kernel, C, showMargin]);

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const label = e.button === 2 ? -1 : 1;
    setPoints([...points, { x, y, label: label as 1 | -1 }]);
  };

  const handleContextMenu = (e: React.MouseEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    handleClick(e);
  };

  return (
    <div style={{ padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 8px 0', color: '#a855f7' }}>{t.title}</h3>
      <p style={{ margin: '0 0 12px 0', fontSize: '14px', color: '#aaa' }}>{t.desc}</p>
      
      <canvas
        ref={canvasRef}
        width={400}
        height={280}
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        style={{ borderRadius: '8px', cursor: 'crosshair', display: 'block', marginBottom: '12px' }}
      />
      
      <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '12px' }}>
        <div>
          <label style={{ fontSize: '12px', color: '#888' }}>{t.kernel}: </label>
          <select
            value={kernel}
            onChange={(e) => setKernel(e.target.value as 'linear' | 'rbf')}
            style={{ background: '#1a1a2e', color: '#fff', border: '1px solid #333', borderRadius: '4px', padding: '4px' }}
          >
            <option value="linear">{t.linear}</option>
            <option value="rbf">{t.rbf}</option>
          </select>
        </div>
        
        <div>
          <label style={{ fontSize: '12px', color: '#888' }}>{t.cParam}: </label>
          <input
            type="range"
            min="0.1"
            max="10"
            step="0.1"
            value={C}
            onChange={(e) => setC(parseFloat(e.target.value))}
            style={{ width: '80px', verticalAlign: 'middle' }}
          />
          <span style={{ fontSize: '12px', color: '#666', marginLeft: '4px' }}>
            {C.toFixed(1)} ({C < 1 ? t.soft : t.hard})
          </span>
        </div>
        
        <label style={{ fontSize: '12px', color: '#888', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={showMargin}
            onChange={(e) => setShowMargin(e.target.checked)}
            style={{ marginRight: '4px' }}
          />
          {t.margin}
        </label>
        
        <button
          onClick={() => setPoints([])}
          style={{ background: '#333', color: '#fff', border: 'none', borderRadius: '4px', padding: '4px 12px', cursor: 'pointer' }}
        >
          {t.clear}
        </button>
      </div>
      
      <p style={{ margin: 0, fontSize: '12px', color: '#666', fontStyle: 'italic' }}>
        💡 {t.hint}
      </p>
    </div>
  );
}
