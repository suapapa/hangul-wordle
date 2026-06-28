// === Game Domain Types ===

/** Evaluation result for each slot: green (correct), yellow (present), gray (absent) */
export type Evaluation = 'correct' | 'present' | 'absent';

/** A single row of guesses (5 jamo) */
export interface GuessRow {
  /** The 5 jamo characters guessed */
  slots: string[];
  /** Per-slot evaluation result */
  results: Evaluation[];
}

/** Complete game state */
export interface GameState {
  /** The target word (5 jamo) */
  seed: Seed;
  /** Display word (Korean) */
  display: string;
  /** All completed guesses */
  guesses: GuessRow[];
  /** Current row index (0-based, 0-4) */
  currentRow: number;
  /** Current slot index within the row (0-based, 0-4) */
  currentSlot: number;
  /** Input slots being built for the current row */
  currentInput: string[];
  /** Game status */
  status: GameStatus;
  /** Whether a flip animation is active */
  animating: boolean;
  /** Whether the current row is shaking (invalid/incomplete submit) */
  shaking: boolean;
  /** Animation delays for staggered flip effect */
  animationDelays: number[];
  /** Last used key (for keyboard highlighting) */
  lastUsedKey: string | null;
  /** Last used key evaluation */
  lastKeyEvaluation: Evaluation | null;
  /** Screen reader announcement for game events */
  announcement: string;
}

export type Seed = string[];

export type GameStatus = 'playing' | 'won' | 'lost';

/** A word entry in the dictionary */
export interface WordEntry {
  /** Jamo sequence (e.g., ["ㅂ", "ㅜ", "ㅂ", "ㅜ", "ㄴ"]) */
  jamos: Seed;
  /** Korean display word */
  hangul: string;
  /** Optional meaning/definition */
  meaning?: string;
}