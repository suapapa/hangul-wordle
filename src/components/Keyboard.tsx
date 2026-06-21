import { KeyboardKey } from './KeyboardKey.js';
import { KEYBOARD_CONSONANTS, KEYBOARD_VOWEL_ROWS } from '../game/jamo.js';
import type { Evaluation } from '../game/types.js';

interface KeyboardProps {
  onKeyPress: (key: string) => void;
  onDelete: () => void;
  onEnter: () => void;
  colors: Record<string, Evaluation | 'unknown'>;
}

const CONSONANT_ROW_1 = KEYBOARD_CONSONANTS.slice(0, 7);
const CONSONANT_ROW_2 = KEYBOARD_CONSONANTS.slice(7);
const [VOWEL_ROW_1, VOWEL_ROW_2] = KEYBOARD_VOWEL_ROWS;

export function Keyboard({ onKeyPress, onDelete, onEnter, colors }: KeyboardProps) {
  return (
    <div className="w-full max-w-lg mx-auto px-2 pt-2 pb-[max(1rem,env(safe-area-inset-bottom))]">
      <div className="grid grid-cols-7 gap-2">
        {CONSONANT_ROW_1.map((key, index) => (
          <KeyboardKey
            key={key}
            label={key}
            color={colors[key] || 'unknown'}
            grid
            style={{ gridColumn: index + 1, gridRow: 1 }}
            onClick={() => onKeyPress(key)}
          />
        ))}

        {CONSONANT_ROW_2.map((key, index) => (
          <KeyboardKey
            key={key}
            label={key}
            color={colors[key] || 'unknown'}
            grid
            style={{ gridColumn: index + 1, gridRow: 2 }}
            onClick={() => onKeyPress(key)}
          />
        ))}

        <KeyboardKey
          label="↵"
          color="unknown"
          action
          tall
          ariaLabel="제출"
          style={{ gridColumn: 1, gridRow: '3 / span 2' }}
          onClick={onEnter}
        />

        {VOWEL_ROW_1.map((key, index) => (
          <KeyboardKey
            key={key}
            label={key}
            color={colors[key] || 'unknown'}
            grid
            style={{ gridColumn: index + 2, gridRow: 3 }}
            onClick={() => onKeyPress(key)}
          />
        ))}

        <KeyboardKey
          label="⌫"
          color="unknown"
          action
          tall
          ariaLabel="지우기"
          style={{ gridColumn: 7, gridRow: '3 / span 2' }}
          onClick={onDelete}
        />

        {VOWEL_ROW_2.map((key, index) => (
          <KeyboardKey
            key={key}
            label={key}
            color={colors[key] || 'unknown'}
            grid
            style={{ gridColumn: index + 2, gridRow: 4 }}
            onClick={() => onKeyPress(key)}
          />
        ))}
      </div>
    </div>
  );
}
