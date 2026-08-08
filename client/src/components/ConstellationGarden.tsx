import { EmotionPixel } from '@/hooks/useProtocol';
import { useRef, useEffect } from 'react';

interface ConstellationGardenProps {
  pixels: EmotionPixel[];
  isRunning: boolean;
  step: number;
  onClickGarden: (x: number, y: number) => void;
}

export function ConstellationGarden({
  pixels,
  isRunning,
  step,
  onClickGarden,
}: ConstellationGardenProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.fillStyle = 'rgba(7, 5, 16, 0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw constellation lines during protocol run
    if (isRunning && step > 5) {
      ctx.strokeStyle = `rgba(255, 213, 79, ${0.3 + (step / 30) * 0.4})`;
      ctx.lineWidth = 1.5;

      for (let i = 0; i < pixels.length; i++) {
        for (let j = i + 1; j < pixels.length; j++) {
          const p1 = pixels[i];
          const p2 = pixels[j];
          const x1 = (p1.x / 100) * canvas.width;
          const y1 = (p1.y / 100) * canvas.height;
          const x2 = (p2.x / 100) * canvas.width;
          const y2 = (p2.y / 100) * canvas.height;

          ctx.beginPath();
          ctx.moveTo(x1, y1);
          ctx.lineTo(x2, y2);
          ctx.stroke();
        }
      }
    }

    // Draw pixels
    pixels.forEach((pixel) => {
      const x = (pixel.x / 100) * canvas.width;
      const y = (pixel.y / 100) * canvas.height;

      // Glow effect
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, 20);
      const color = pixel.source === 'human' ? '#FF6B8A' : '#FFD54F';
      gradient.addColorStop(0, color + '80');
      gradient.addColorStop(1, color + '00');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, 20, 0, Math.PI * 2);
      ctx.fill();

      // Core
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
    });
  }, [pixels, isRunning, step]);

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    onClickGarden(x, y);
  };

  return (
    <div className="relative w-full h-[400px] md:h-[520px] rounded-[24px] border border-[#FFD54F]/20 bg-gradient-to-br from-[#1a1033]/60 to-transparent overflow-hidden cursor-crosshair group">
      <canvas
        ref={canvasRef}
        width={500}
        height={520}
        onClick={handleCanvasClick}
        className="absolute inset-0 w-full h-full"
      />

      {/* Central character */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 pointer-events-none">
        <div className="text-6xl">🌻</div>
      </div>

      {/* Pixel labels */}
      <div className="absolute inset-0 pointer-events-none">
        {pixels.map((pixel) => (
          <div
            key={pixel.id}
            className="absolute text-[11px] font-[600] px-2 py-1 rounded-full whitespace-nowrap pointer-events-none"
            style={{
              left: `${pixel.x}%`,
              top: `${pixel.y}%`,
              transform: 'translate(-50%, -50%)',
              backgroundColor: pixel.source === 'human' ? 'rgba(255, 107, 138, 0.4)' : 'rgba(255, 213, 79, 0.2)',
              color: pixel.source === 'human' ? '#FF6B8A' : '#FFD54F',
              border: `1px solid ${pixel.source === 'human' ? '#FF6B8A' : '#FFD54F'}`,
            }}
          >
            • {pixel.emotion} {pixel.source === 'human' ? 'h' : 'ai'}
          </div>
        ))}
      </div>

      {/* Hover hint */}
      <div className="absolute bottom-4 left-4 text-[12px] text-white/50 pointer-events-none group-hover:text-white/70 transition-colors">
        click anywhere to plant an emotion pixel
      </div>
    </div>
  );
}
