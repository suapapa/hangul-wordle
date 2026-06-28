import { Row } from './Row.js';
import type { GameState } from '../game/types.js';

interface BoardProps {
  state: GameState;
}

export function Board({ state }: BoardProps) {
  const rows = [];
  for (let i = 0; i < 5; i++) {
    if (i < state.guesses.length) {
      rows.push(state.guesses[i]);
    } else if (i === state.currentRow) {
      rows.push({
        slots: [
          ...state.currentInput.slice(0, 5),
          ...Array(Math.max(0, 5 - state.currentInput.length)).fill(''),
        ],
        results: Array(5).fill(undefined) as never[],
      });
    } else {
      rows.push({
        slots: Array(5).fill(''),
        results: Array(5).fill(undefined) as never[],
      });
    }
  }

  return (
    <div
      role="grid"
      aria-label="추측 보드"
      aria-rowcount={5}
      aria-colcount={5}
      className="flex flex-col items-center justify-center flex-1 gap-1.5 sm:gap-2 p-4"
    >
      {rows.map((row, rowIndex) => (
        <Row
          key={rowIndex}
          row={row}
          rowIndex={rowIndex}
          isCurrent={rowIndex === state.currentRow}
          isAnimating={state.animating && rowIndex < state.guesses.length}
          isShaking={state.shaking && rowIndex === state.currentRow}
          animationDelays={state.animationDelays}
        />
      ))}
    </div>
  );
}
