'use client';

import { useState, useEffect, useRef } from 'react';

type Language = 'ru' | 'en';

interface Props {
  lang?: Language;
}

export default function VAEDemo({ lang = 'en' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [latentX, setLatentX] = useState(0);
  const [latentY, setLatentY] = useState(0);
  const [isEncoding, setIsEncoding] = useState(false);
  const [currentDigit, setCurrentDigit] = useState(5);
  
  const texts = {
    ru: {
      title: '🎲 VAE — Вариационный автоэнкодер',
      desc: 'Двигай точку в латентном пространстве чтобы генерировать новые образы',
      encode: 'Закодировать',
      latentSpace: 'Латентное пространство',
      decoded: 'Декодированный выход',
      mu: 'μ (среднее)',
      sigma: 'σ (дисперсия)',
      hint: 'VAE учит сжатое представление данных и может генерировать новые примеры',
      sample: 'Случайный сэмпл',
    },
    en: {
      title: '🎲 VAE — Variational Autoencoder',
      desc: 'Move the point in latent space to generate new images',
      encode: 'Encode',
      latentSpace: 'Latent Space',
      decoded: 'Decoded Output',
      mu: 'μ (mean)',
      sigma: 'σ (variance)',
      hint: 'VAE learns compressed representation and can generate new samples',
      sample: 'Random sample',
    },
  };
  const t = texts[lang];

  // Simple digit-like pattern generation based on latent coords
  const generatePattern = (x: number, y: number): number[][] => {
    const pattern: number[][] = [];
    for (let i = 0; i < 8; i++) {
      const row: number[] = [];
      for (let j = 0; j < 8; j++) {
        // Create patterns based on latent position
        const cx = 3.5, cy = 3.5;
        const dist = Math.sqrt((i - cy) ** 2 + (j - cx) ** 2);
        
        let val = 0;
        // Different patterns based on latent space position
        if (x < -0.5) {
          // Vertical line
          val = Math.abs(j - 4) < 1.5 ? 1 - dist * 0.1 : 0;
        } else if (x > 0.5) {
          // Circle
          val = Math.abs(dist - 2.5) < 1 ? 1 : 0;
        } else if (y < -0.5) {
          // Horizontal line
          val = Math.abs(i - 4) < 1.5 ? 1 - dist * 0.1 : 0;
        } else if (y > 0.5) {
          // Cross
          val = (Math.abs(j - 4) < 1 || Math.abs(i - 4) < 1) ? 0.9 : 0;
        } else {
          // Blob
          val = dist < 2.5 ? 1 - dist * 0.25 : 0;
        }
        
        // Add some noise based on coords
        val += (Math.sin(i * x * 2) + Math.cos(j * y * 2)) * 0.1;
        row.push(Math.max(0, Math.min(1, val)));
      }
      pattern.push(row);
    }
    return pattern;
  };

  // Draw latent space
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    
    // Background with gradient
    const grad = ctx.createRadialGradient(size/2, size/2, 0, size/2, size/2, size/2);
    grad.addColorStop(0, 'rgba(139, 92, 246, 0.2)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0.9)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, size, size);

    // Grid
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const pos = (i / 4) * size;
      ctx.beginPath();
      ctx.moveTo(pos, 0);
      ctx.lineTo(pos, size);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, pos);
      ctx.lineTo(size, pos);
      ctx.stroke();
    }

    // Axes
    ctx.strokeStyle = 'rgba(255,255,255,0.3)';
    ctx.beginPath();
    ctx.moveTo(size/2, 0);
    ctx.lineTo(size/2, size);
    ctx.moveTo(0, size/2);
    ctx.lineTo(size, size/2);
    ctx.stroke();

    // Labels
    ctx.fillStyle = '#888';
    ctx.font = '10px monospace';
    ctx.fillText('z₁', size - 15, size/2 - 5);
    ctx.fillText('z₂', size/2 + 5, 12);

    // Current point
    const px = (latentX + 1) / 2 * size;
    const py = (1 - (latentY + 1) / 2) * size;
    
    // Glow
    const pointGrad = ctx.createRadialGradient(px, py, 0, px, py, 20);
    pointGrad.addColorStop(0, 'rgba(139, 92, 246, 0.8)');
    pointGrad.addColorStop(1, 'transparent');
    ctx.fillStyle = pointGrad;
    ctx.beginPath();
    ctx.arc(px, py, 20, 0, Math.PI * 2);
    ctx.fill();

    // Point
    ctx.fillStyle = '#a855f7';
    ctx.beginPath();
    ctx.arc(px, py, 8, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = '#fff';
    ctx.lineWidth = 2;
    ctx.stroke();

  }, [latentX, latentY]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = 1 - ((e.clientY - rect.top) / rect.height) * 2;
    setLatentX(Math.max(-1, Math.min(1, x)));
    setLatentY(Math.max(-1, Math.min(1, y)));
  };

  const handleRandomSample = () => {
    // Sample from standard normal (box-muller)
    const u1 = Math.random();
    const u2 = Math.random();
    const z1 = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
    const z2 = Math.sqrt(-2 * Math.log(u1)) * Math.sin(2 * Math.PI * u2);
    setLatentX(Math.max(-1, Math.min(1, z1 * 0.4)));
    setLatentY(Math.max(-1, Math.min(1, z2 * 0.4)));
  };

  const pattern = generatePattern(latentX, latentY);

  return (
    <div style={{ padding: '16px', background: 'rgba(0,0,0,0.3)', borderRadius: '12px' }}>
      <h3 style={{ margin: '0 0 8px 0', color: '#a855f7' }}>{t.title}</h3>
      <p style={{ margin: '0 0 16px 0', fontSize: '14px', color: '#aaa' }}>{t.desc}</p>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
        {/* Latent space */}
        <div>
          <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>{t.latentSpace}</div>
          <canvas
            ref={canvasRef}
            width={180}
            height={180}
            onClick={handleCanvasClick}
            style={{ borderRadius: '8px', cursor: 'crosshair' }}
          />
          <div style={{ marginTop: '8px' }}>
            <button
              onClick={handleRandomSample}
              style={{
                background: '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '4px',
                padding: '6px 12px',
                cursor: 'pointer',
                fontSize: '12px',
                width: '100%',
              }}
            >
              🎲 {t.sample}
            </button>
          </div>
          <div style={{ fontSize: '11px', color: '#666', marginTop: '8px' }}>
            z = [{latentX.toFixed(2)}, {latentY.toFixed(2)}]
          </div>
        </div>

        {/* Decoder output */}
        <div>
          <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>{t.decoded}</div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 20px)',
            gap: '2px',
            padding: '10px',
            background: '#0a0a1a',
            borderRadius: '8px',
          }}>
            {pattern.map((row, i) =>
              row.map((val, j) => (
                <div
                  key={`${i}-${j}`}
                  style={{
                    width: '20px',
                    height: '20px',
                    background: `rgba(168, 85, 247, ${val})`,
                    borderRadius: '2px',
                  }}
                />
              ))
            )}
          </div>
          
          {/* Distribution params */}
          <div style={{ marginTop: '12px', fontSize: '11px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#888' }}>
              <span>{t.mu}:</span>
              <span style={{ color: '#a855f7' }}>[{latentX.toFixed(2)}, {latentY.toFixed(2)}]</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', color: '#888', marginTop: '4px' }}>
              <span>{t.sigma}:</span>
              <span style={{ color: '#a855f7' }}>[0.10, 0.10]</span>
            </div>
          </div>
        </div>

        {/* Architecture diagram */}
        <div style={{ flex: 1, minWidth: '150px' }}>
          <div style={{ fontSize: '12px', color: '#888', marginBottom: '8px' }}>Pipeline</div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            padding: '12px',
            background: '#0a0a1a',
            borderRadius: '8px',
          }}>
            <div style={{ padding: '8px', background: 'rgba(59, 130, 246, 0.2)', borderRadius: '4px', textAlign: 'center', fontSize: '11px' }}>
              📥 Input
            </div>
            <div style={{ textAlign: 'center', color: '#666' }}>↓</div>
            <div style={{ padding: '8px', background: 'rgba(139, 92, 246, 0.2)', borderRadius: '4px', textAlign: 'center', fontSize: '11px' }}>
              🔒 Encoder → μ, σ
            </div>
            <div style={{ textAlign: 'center', color: '#666' }}>↓</div>
            <div style={{ padding: '8px', background: 'rgba(245, 158, 11, 0.2)', borderRadius: '4px', textAlign: 'center', fontSize: '11px' }}>
              🎲 z = μ + σ·ε
            </div>
            <div style={{ textAlign: 'center', color: '#666' }}>↓</div>
            <div style={{ padding: '8px', background: 'rgba(34, 197, 94, 0.2)', borderRadius: '4px', textAlign: 'center', fontSize: '11px' }}>
              🔓 Decoder
            </div>
            <div style={{ textAlign: 'center', color: '#666' }}>↓</div>
            <div style={{ padding: '8px', background: 'rgba(59, 130, 246, 0.2)', borderRadius: '4px', textAlign: 'center', fontSize: '11px' }}>
              📤 Output
            </div>
          </div>
        </div>
      </div>

      <p style={{ margin: '12px 0 0', fontSize: '12px', color: '#666', fontStyle: 'italic' }}>
        💡 {t.hint}
      </p>
    </div>
  );
}
