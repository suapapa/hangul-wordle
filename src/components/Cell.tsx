import type { Evaluation } from '../game/types.js';

interface CellProps {
  value: string;
  evaluation?: Evaluation;
  animate: boolean;
  delay: number;
  isActive: boolean;
}

export function Cell({ value, evaluation, animate, delay, isActive }: CellProps) {
  // Determine CSS classes based on evaluation
  let bgColor = '';
  let textColor = '';
  let borderColor = 'var(--color-game-border)';
  let scale = 'scale-90';
  
  if (evaluation === 'correct') {
    bgColor = 'bg-game-correct';
    textColor = 'text-white';
    borderColor = 'transparent';
    scale = 'scale-100';
  } else if (evaluation === 'present') {
    bgColor = 'bg-game-present';
    textColor = 'text-white';
    borderColor = 'transparent';
    scale = 'scale-100';
  } else if (evaluation === 'absent') {
    bgColor = 'bg-game-absent';
    textColor = 'text-white';
    borderColor = 'transparent';
    scale = 'scale-100';
  } else if (value) {
    bgColor = 'bg-game-surface';
    textColor = 'text-game-text';
    borderColor = value ? 'var(--color-game-text)' : 'var(--color-game-border)';
    scale = 'scale-100';
  }
  
  // Animation classes
  const animClass = animate
    ? `animate-flip`
    : '';
  
  const bounceClass = animate && evaluation
    ? `animate-bounce-cell`
    : '';
  
  const scaleClass = !value && !evaluation
    ? 'animate-scale-in'
    : '';
  
  // Render
  return (
    <div
      className={`
        flex items-center justify-center
        w-[52px] h-[52px] sm:w-[56px] sm:h-[56px]
        border-2 rounded
        text-2xl sm:text-3xl font-bold
        transition-colors duration-200
        ${bgColor} ${textColor} ${borderColor} ${scale}
        ${animClass} ${bounceClass} ${scaleClass}
        ${value ? 'border-t-2 border-l-2 border-b-2 border-r-2' : ''}
      `}
      style={{
        animationDelay: animate ? `${delay}ms` : '0ms',
      }}
    >
      {value}
    </div>
  );
}