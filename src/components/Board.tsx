import { Row } from './Row.js';
import type { GameState } from '../game/types.js';

interface BoardProps {
  state: GameState;
}

export function Board({ state }: BoardProps) {
  // Build rows array (5 total)
  const rows = [];
  for (let i = 0; i < 5; i++) {
    if (i < state.guesses.length) {
      rows.push(state.guesses[i]);
    } else if (i === state.currentRow) {
      // Current row - empty with input
      rows.push({
        slots: [...state.currentInput, ...Array(5 - state.currentInput.length).fill('')],
        results: Array(5).fill(undefined) as any,
      });
    } else {
      // Empty future row
      rows.push({
        slots: Array(5).fill(''),
        results: Array(5).fill(undefined) as any,
      });
    }
  }
  
  return (
    <div className="flex flex-col items-center justify-center flex-1 gap-1.5 sm:gap-2 p-4">
      {rows.map((row, rowIndex) => (
        <Row
          key={rowIndex}
          row={row}
          isCurrent={rowIndex === state.currentRow}
          isAnimating={state.animating && rowIndex < state.guesses.length}
          animationDelays={state.animationDelays}
        />
      ))}
    </div>
  );
}