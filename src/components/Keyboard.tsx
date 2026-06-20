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
  [...KEYBOARD_CONSONANTS],
  [...KEYBOARD_VOWELS],
];

export function Keyboard({ onKeyPress, onDelete, onEnter, colors }: KeyboardProps) {
  return (
    <div className="w-full max-w-lg mx-auto px-2 pb-4 pt-2">
      {/* Keyboard rows */}
      {keyboardLayout.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center gap-[3px] sm:gap-[4px] mb-[3px]">
          {row.map((key) => {
            const color = colors[key] || 'unknown';
            return (
              <KeyboardKey
                key={key}
                label={key}
                color={color}
                onClick={() => onKeyPress(key)}
              />
            );
          })}
        </div>
      ))}
      
      {/* Action row */}
      <div className="flex justify-center gap-[3px] sm:gap-[4px] mt-1">
        <KeyboardKey
          label="↵"
          color="unknown"
          onClick={onEnter}
          large
        />
        <div className="flex-1" />
        <KeyboardKey
          label="⌫"
          color="unknown"
          onClick={onDelete}
          large
        />
      </div>
    </div>
  );
}