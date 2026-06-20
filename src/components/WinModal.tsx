import { useEffect, useId } from 'react';
import type { GuessRow } from '../game/types.js';
import { Fireworks } from './Fireworks.js';
import { GuessHistoryMini } from './GuessHistoryMini.js';

interface WinModalProps {
  isOpen: boolean;
  word: string;
  guesses: GuessRow[];
  onNewGame: () => void;
}

export function WinModal({ isOpen, word, guesses, onNewGame }: WinModalProps) {
  const titleId = useId();

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onNewGame();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onNewGame]);

  if (!isOpen) return null;

  return (
    <>
      <Fireworks />
      <div
        className="fixed inset-0 z-50 flex items-center justify-center bg-game-overlay p-4"
        role="presentation"
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          className="bg-game-surface rounded-xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-game-border animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          <h2
            id={titleId}
            className="text-xl sm:text-2xl font-bold mb-5 text-game-accent text-center"
          >
            정답 - {word}!
          </h2>

          <div className="mb-5">
            <GuessHistoryMini guesses={guesses} />
          </div>

          <p className="text-game-text text-center text-lg sm:text-xl font-semibold mb-6">
            해냈어요
          </p>

          <button
            type="button"
            onClick={onNewGame}
            className="interactive-focus w-full min-h-[44px] py-3 rounded-lg bg-game-correct text-white font-bold text-lg active:brightness-90 transition-all duration-150"
          >
            다음 게임
          </button>
        </div>
      </div>
    </>
  );
}
