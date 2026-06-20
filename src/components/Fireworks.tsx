import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  hue: number;
  size: number;
}

interface Rocket {
  x: number;
  y: number;
  vy: number;
  hue: number;
  exploded: boolean;
}

const FIREWORK_HUES = [120, 45, 200, 330, 180, 60];

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

function createBurst(x: number, y: number, hue: number, particles: Particle[]): void {
  const count = 28 + Math.floor(Math.random() * 12);
  for (let i = 0; i < count; i++) {
    const angle = (Math.PI * 2 * i) / count + randomBetween(-0.15, 0.15);
    const speed = randomBetween(1.5, 4.5);
    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0,
      maxLife: randomBetween(50, 90),
      hue: hue + randomBetween(-15, 15),
      size: randomBetween(1.5, 3),
    });
  }
}

export function Fireworks() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId = 0;
    let frame = 0;
    const rockets: Rocket[] = [];
    const particles: Particle[] = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    const spawnRocket = () => {
      rockets.push({
        x: randomBetween(canvas.width * 0.15, canvas.width * 0.85),
        y: canvas.height,
        vy: randomBetween(-7, -10),
        hue: FIREWORK_HUES[Math.floor(Math.random() * FIREWORK_HUES.length)],
        exploded: false,
      });
    };

    for (let i = 0; i < 3; i++) {
      spawnRocket();
    }

    const tick = () => {
      frame += 1;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (frame % 18 === 0 && rockets.length < 6) {
        spawnRocket();
      }

      for (let i = rockets.length - 1; i >= 0; i--) {
        const rocket = rockets[i];
        rocket.y += rocket.vy;
        rocket.vy += 0.12;

        ctx.beginPath();
        ctx.arc(rocket.x, rocket.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `hsl(${rocket.hue}, 100%, 70%)`;
        ctx.fill();

        if (rocket.vy >= -1 || rocket.y < canvas.height * 0.25) {
          createBurst(rocket.x, rocket.y, rocket.hue, particles);
          rockets.splice(i, 1);
        }
      }

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.04;
        p.vx *= 0.985;
        p.life += 1;

        const alpha = 1 - p.life / p.maxLife;
        if (alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue}, 100%, 65%, ${alpha})`;
        ctx.fill();
      }

      animationId = window.requestAnimationFrame(tick);
    };

    animationId = window.requestAnimationFrame(tick);

    return () => {
      window.cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-40"
      aria-hidden="true"
    />
  );
}
