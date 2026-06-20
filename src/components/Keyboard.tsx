import { KeyboardKey } from './KeyboardKey.js';
import { KEYBOARD_CONSONANTS, KEYBOARD_VOWELS } from '../game/jamo.js';
import type { Evaluation } from '../game/types.js';

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  colors: Record<string, Evaluation | 'unknown'>;
}

const keyboardLayout = [
  KEYBOARD_CONSONANTS.slice(0, 7),
  KEYBOARD_CONSONANTS.slice(7),
  [...KEYBOARD_VOWELS],
];

export function Keyboard({ onKeyPress, onDelete, onEnter, colors }: KeyboardProps) {
  return (
    <div className="w-full max-w-lg mx-auto px-2 pt-2 pb-[max(1rem,env(safe-area-inset-bottom))]">
      {keyboardLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="flex w-full justify-center gap-2 mb-2">
          {row.map((key) => {
            const color = colors[key] || 'unknown';
            return (
              <KeyboardKey
                key={key}
                label={key}
                color={color}
                expand
                onClick={() => onKeyPress(key)}
              />
            );
          })}
        </div>
      ))}

      <div className="flex justify-center gap-2 mt-1">
        <KeyboardKey
          label="↵"
          color="unknown"
          onClick={onEnter}
          large
          ariaLabel="제출"
        />
        <div className="flex-1" />
        <KeyboardKey
          label="⌫"
          color="unknown"
          onClick={onDelete}
          large
          ariaLabel="지우기"
        />
      </div>
    </div>
  );
}
