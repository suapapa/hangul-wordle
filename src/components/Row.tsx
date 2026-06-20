import { Cell } from './Cell.js';
import type { GuessRow, Evaluation } from '../game/types.js';

interface RowProps {
  row: GuessRow;
  isCurrent: boolean;
  isAnimating: boolean;
  animationDelays: number[];
}

export function Row({ row, isCurrent, isAnimating, animationDelays }: RowProps) {
  // Determine animation flag for each cell
  const shouldAnimate = isCurrent ? false : isAnimating || row.results.some(r => r !== undefined);
  
  return (
    <div className="flex gap-[6px] sm:gap-[7px] justify-center">
      {row.slots.map((slot, index) => {
        const evaluation = row.results[index] as Evaluation | undefined;
        const value = slot || (isCurrent ? '' : '');
        
        // In current row, show empty cells as inactive
        const isActive = isCurrent && index < row.slots.length;
        
        return (
          <Cell
            key={index}
            value={value}
            evaluation={evaluation}
            animate={shouldAnimate}
            delay={shouldAnimate ? animationDelays[index] : 0}
            isActive={isActive}
          />
        );
      })}
    </div>
  );
}