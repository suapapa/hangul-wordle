import type { Evaluation, GuessRow } from '../game/types.js';

interface GuessHistoryMiniProps {
  guesses: GuessRow[];
}

function evaluationColor(evaluation: Evaluation): string {
  switch (evaluation) {
    case 'correct':
      return 'bg-game-correct';
    case 'present':
      return 'bg-game-present';
    case 'absent':
      return 'bg-game-absent';
  }
}

export function GuessHistoryMini({ guesses }: GuessHistoryMiniProps) {
  return (
    <div
      className="flex flex-col items-center gap-1.5"
      aria-label="맞춘 시도 기록"
    >
      {guesses.map((guess, rowIndex) => (
        <div key={rowIndex} className="flex gap-1.5">
          {guess.results.map((evaluation, colIndex) => (
            <div
              key={colIndex}
              className={`w-8 h-8 sm:w-9 sm:h-9 rounded ${evaluationColor(evaluation)}`}
              aria-hidden="true"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
