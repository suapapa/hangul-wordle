import { Cell } from './Cell.js';
import type { GuessRow, Evaluation } from '../game/types.js';

interface RowProps {
  row: GuessRow;
  rowIndex: number;
  isCurrent: boolean;
  isAnimating: boolean;
  isShaking: boolean;
  animationDelays: number[];
}

export function Row({
  row,
  rowIndex,
  isCurrent,
  isAnimating,
  isShaking,
  animationDelays,
}: RowProps) {
  const shouldAnimate = isCurrent ? false : isAnimating || row.results.some((r) => r !== undefined);

  return (
    <div
      role="row"
      aria-rowindex={rowIndex + 1}
      className={`flex gap-[6px] sm:gap-[7px] justify-center ${isShaking ? 'animate-shake' : ''}`}
    >
      {row.slots.map((slot, index) => {
        const evaluation = row.results[index] as Evaluation | undefined;
        const value = slot || (isCurrent ? '' : '');
        const filledCount = row.slots.filter((s) => s !== '').length;
        const isActive = isCurrent && index === filledCount && filledCount < 5;

        return (
          <Cell
            key={index}
            value={value}
            evaluation={evaluation}
            animate={shouldAnimate}
            delay={shouldAnimate ? animationDelays[index] : 0}
            isActive={isActive}
            colIndex={index}
          />
        );
      })}
    </div>
  );
}
