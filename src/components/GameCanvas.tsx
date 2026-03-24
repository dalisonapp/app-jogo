import React, { useEffect, useRef } from 'react';
import { GameEngine } from '../lib/game/engine';
import { CANVAS_WIDTH, CANVAS_HEIGHT, BUBBLE_RADIUS, BUBBLE_DIAMETER, ROW_HEIGHT } from '../lib/game/constants';

interface Props {
  engine: GameEngine;
}

export function GameCanvas({ engine }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let lastTime = performance.now();

    const render = (time: number) => {
      const dt = time - lastTime;
      lastTime = time;

      engine.update(dt);

      // Clear
      ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Draw ceiling
      ctx.fillStyle = '#1e293b'; // slate-800
      ctx.fillRect(0, 0, CANVAS_WIDTH, engine.ceilingOffset * ROW_HEIGHT);

      // Draw grid bubbles
      engine.grid.forEach(b => {
        drawBubble(ctx, b.x, b.y, b.color, BUBBLE_RADIUS);
      });

      // Draw falling bubbles
      engine.fallingBubbles.forEach(b => {
        drawBubble(ctx, b.x, b.y, b.color, BUBBLE_RADIUS);
      });

      // Draw popping bubbles
      engine.poppingBubbles.forEach(b => {
        ctx.globalAlpha = Math.max(0, b.alpha);
        drawBubble(ctx, b.x, b.y, b.color, b.radius);
        ctx.globalAlpha = 1.0;
      });

      // Draw shooter
      const startX = CANVAS_WIDTH / 2;
      const startY = CANVAS_HEIGHT - BUBBLE_RADIUS;
      
      // Draw trajectory line
      if (engine.status === 'playing' && !engine.flyingBubble) {
        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(engine.mouseX, engine.mouseY);
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        ctx.setLineDash([5, 5]);
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // Draw flying bubble
      if (engine.flyingBubble) {
        drawBubble(ctx, engine.flyingBubble.x, engine.flyingBubble.y, engine.flyingBubble.color, BUBBLE_RADIUS);
      } else if (engine.status === 'playing') {
        // Draw current bubble in shooter
        drawBubble(ctx, startX, startY, engine.currentBubbleColor, BUBBLE_RADIUS);
      }

      // Draw bottom limit line
      ctx.beginPath();
      ctx.moveTo(0, CANVAS_HEIGHT - BUBBLE_DIAMETER * 2);
      ctx.lineTo(CANVAS_WIDTH, CANVAS_HEIGHT - BUBBLE_DIAMETER * 2);
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.5)'; // red-500
      ctx.lineWidth = 2;
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [engine]);

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) {
      const scaleX = CANVAS_WIDTH / rect.width;
      const scaleY = CANVAS_HEIGHT / rect.height;
      engine.setMousePos((e.clientX - rect.left) * scaleX, (e.clientY - rect.top) * scaleY);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect && e.touches.length > 0) {
      const scaleX = CANVAS_WIDTH / rect.width;
      const scaleY = CANVAS_HEIGHT / rect.height;
      engine.setMousePos((e.touches[0].clientX - rect.left) * scaleX, (e.touches[0].clientY - rect.top) * scaleY);
    }
  };

  const handleClick = () => {
    engine.shoot();
  };

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_WIDTH}
      height={CANVAS_HEIGHT}
      className="w-full h-full object-contain bg-slate-900 rounded-lg shadow-2xl cursor-crosshair touch-none"
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onClick={handleClick}
      onTouchEnd={handleClick}
    />
  );
}

function drawBubble(ctx: CanvasRenderingContext2D, x: number, y: number, color: string, radius: number) {
  ctx.beginPath();
  ctx.arc(x, y, radius, 0, Math.PI * 2);
  ctx.fillStyle = color;
  ctx.fill();
  
  // Highlight
  ctx.beginPath();
  ctx.arc(x - radius * 0.3, y - radius * 0.3, radius * 0.3, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
  ctx.fill();
  
  ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
  ctx.lineWidth = 2;
  ctx.stroke();
}
