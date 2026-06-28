import type { Evaluation } from '../game/types.js';

interface CellProps {
  value: string;
  evaluation?: Evaluation;
  animate: boolean;
  delay: number;
  isActive: boolean;
  colIndex: number;
}

export function Cell({ value, evaluation, animate, delay, isActive, colIndex }: CellProps) {
  let bgClass = '';
  let textClass = 'text-game-text';
  let borderClass = 'border-game-border';

  if (evaluation === 'correct') {
    bgClass = 'bg-game-correct';
    textClass = 'text-white';
    borderClass = 'border-transparent';
  } else if (evaluation === 'present') {
    bgClass = 'bg-game-present';
    textClass = 'text-white';
    borderClass = 'border-transparent';
  } else if (evaluation === 'absent') {
    bgClass = 'bg-game-absent';
    textClass = 'text-white';
    borderClass = 'border-transparent';
  } else if (value) {
    bgClass = 'bg-game-surface';
    textClass = 'text-game-text';
    borderClass = 'border-game-text';
  }

  const animClass = animate ? 'animate-flip' : '';
  const popClass = animate && evaluation ? 'animate-pop-cell' : '';
  const scaleClass = !value && !evaluation ? 'animate-scale-in' : '';
  const activeClass = isActive ? 'ring-2 ring-game-accent border-game-accent' : '';

  const label = value
    ? evaluation
      ? `${value}, ${evaluation === 'correct' ? '정답' : evaluation === 'present' ? '위치 틀림' : '없음'}`
      : value
    : '빈 칸';

  return (
    <div
      role="gridcell"
      aria-colindex={colIndex + 1}
      aria-label={label}
      className={`
        flex items-center justify-center
        w-[52px] h-[52px] sm:w-[56px] sm:h-[56px]
        border-2 rounded
        text-2xl sm:text-3xl font-bold
        transition-colors duration-200
        ${bgClass} ${textClass} ${borderClass} ${activeClass}
        ${animClass} ${popClass} ${scaleClass}
      `}
      style={{
        animationDelay: animate ? `${delay}ms` : '0ms',
      }}
    >
      {value}
    </div>
  );
}
