/** Vowel keys shown on the keyboard */
export const KEYBOARD_VOWELS = ['ㅏ', 'ㅑ', 'ㅓ', 'ㅕ', 'ㅗ', 'ㅛ', 'ㅜ', 'ㅣ'] as const;

/** Consonant keys shown on the keyboard */
export const KEYBOARD_CONSONANTS = [
  'ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅅ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
] as const;

/** Compound vowels decomposed into basic vowel key presses */
const VOWEL_DECOMPOSITION: Record<string, readonly string[]> = {
  'ㅐ': ['ㅏ', 'ㅣ'],
  'ㅒ': ['ㅑ', 'ㅣ'],
  'ㅔ': ['ㅓ', 'ㅣ'],
  'ㅖ': ['ㅕ', 'ㅣ'],
  'ㅘ': ['ㅗ', 'ㅏ'],
  'ㅙ': ['ㅗ', 'ㅏ', 'ㅣ'],
  'ㅚ': ['ㅗ', 'ㅣ'],
  'ㅝ': ['ㅜ', 'ㅓ'],
  'ㅞ': ['ㅜ', 'ㅓ', 'ㅣ'],
  'ㅟ': ['ㅜ', 'ㅣ'],
  'ㅢ': ['ㅡ', 'ㅣ'],
  'ㅠ': ['ㅣ', 'ㅜ'],
};

const KEYBOARD_VOWEL_SET = new Set<string>(KEYBOARD_VOWELS);
const KEYBOARD_CONSONANT_SET = new Set<string>(KEYBOARD_CONSONANTS);

/** Expand a single jamo into basic keyboard jamo units */
export function expandJamo(jamo: string): string[] {
  return [...(VOWEL_DECOMPOSITION[jamo] ?? [jamo])];
}

/** Expand a jamo sequence into basic keyboard jamo units */
export function expandJamos(jamos: string[]): string[] {
  return jamos.flatMap(expandJamo);
}

/** Whether a key can be pressed on the on-screen or physical keyboard */
export function isKeyboardKey(key: string): boolean {
  return KEYBOARD_CONSONANT_SET.has(key) || KEYBOARD_VOWEL_SET.has(key);
}

/** Whether a word fits the 5-slot board under vowel decomposition rules */
export function isPlayableWord(jamos: string[]): boolean {
  const expanded = expandJamos(jamos);
  if (expanded.length !== 5) return false;

  return expanded.every(
    (jamo) => KEYBOARD_CONSONANT_SET.has(jamo) || KEYBOARD_VOWEL_SET.has(jamo),
  );
}
