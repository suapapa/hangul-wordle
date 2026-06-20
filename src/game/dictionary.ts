import type { WordEntry } from "./types.js";
import { expandJamos, isPlayableWord } from "./jamo.js";

// Korean words; filtered below to those that fit 5 basic jamo slots
const allWords: WordEntry[] = [
  // CV-CGV words (2 syllable, 5 jamo total)
  {
    jamos: ["ㅂ", "ㅜ", "ㅂ", "ㅜ", "ㄴ"],
    hangul: "부분",
    meaning: "part, portion",
  },
  {
    jamos: ["ㄱ", "ㅏ", "ㅍ", "ㅏ", "ㄴ"],
    hangul: "간판",
    meaning: "signboard",
  },
  { jamos: ["ㅂ", "ㅏ", "ㄱ", "ㅁ", "ㅜ"], hangul: "방문", meaning: "visit" },
  {
    jamos: ["ㅂ", "ㅏ", "ㄱ", "ㅜ", "ㄹ"],
    hangul: "방울",
    meaning: "bell, drop",
  },
  {
    jamos: ["ㅂ", "ㅏ", "ㄱ", "ㅂ", "ㅜ"],
    hangul: "방구",
    meaning: "vent, toilet",
  },
  {
    jamos: ["ㅂ", "ㅏ", "ㄱ", "ㅍ", "ㅏ"],
    hangul: "방과",
    meaning: "subject, class",
  },
  {
    jamos: ["ㄱ", "ㅏ", "ㄴ", "ㅈ", "ㅏ"],
    hangul: "간장",
    meaning: "soy sauce",
  },
  { jamos: ["ㅂ", "ㅏ", "ㄴ", "ㅈ", "ㅣ"], hangul: "반지", meaning: "ring" },
  {
    jamos: ["ㅈ", "ㅏ", "ㄴ", "ㅊ", "ㅣ"],
    hangul: "잔치",
    meaning: "party, celebration",
  },
  {
    jamos: ["ㅊ", "ㅏ", "ㅈ", "ㅏ", "ㄱ"],
    hangul: "찬장",
    meaning: "pantry, cupboard",
  },
  {
    jamos: ["ㅎ", "ㅏ", "ㅈ", "ㅏ", "ㄴ"],
    hangul: "한잔",
    meaning: "one cup/glass",
  },
  {
    jamos: ["ㅅ", "ㅏ", "ㄴ", "ㅁ", "ㅗ"],
    hangul: "산모",
    meaning: "new mother",
  },
  { jamos: ["ㅁ", "ㅜ", "ㄴ", "ㅓ", "ㄱ"], hangul: "문어", meaning: "octopus" },
  { jamos: ["ㄱ", "ㅏ", "ㄴ", "ㅅ", "ㅣ"], hangul: "간식", meaning: "snack" },
  {
    jamos: ["ㄱ", "ㅏ", "ㄴ", "ㅋ", "ㅗ"],
    hangul: "간호",
    meaning: "nurse, care",
  },
  { jamos: ["ㄷ", "ㅏ", "ㄴ", "ㅅ", "ㅣ"], hangul: "단식", meaning: "fasting" },
  {
    jamos: ["ㄷ", "ㅏ", "ㄴ", "ㅋ", "ㅗ"],
    hangul: "단호",
    meaning: "resolute",
  },
  { jamos: ["ㄷ", "ㅏ", "ㄴ", "ㅊ", "ㅗ"], hangul: "단초", meaning: "clue" },
  {
    jamos: ["ㄷ", "ㅏ", "ㄴ", "ㅈ", "ㅗ"],
    hangul: "단조",
    meaning: "minor key",
  },
  {
    jamos: ["ㄷ", "ㅏ", "ㄴ", "ㅅ", "ㅗ"],
    hangul: "단소",
    meaning: "single-string instrument",
  },
  { jamos: ["ㄷ", "ㅏ", "ㄴ", "ㅗ"], hangul: "단오", meaning: "Dano festival" },
  {
    jamos: ["ㅎ", "ㅏ", "ㄴ", "ㅅ", "ㅣ"],
    hangul: "한식",
    meaning: "Korean food",
  },
  {
    jamos: ["ㅎ", "ㅏ", "ㄴ", "ㄷ", "ㅗ"],
    hangul: "한두",
    meaning: "a couple of",
  },
  { jamos: ["ㅎ", "ㅏ", "ㄴ", "ㅜ"], hangul: "한우", meaning: "Korean beef" },
  {
    jamos: ["ㅅ", "ㅏ", "ㄴ", "ㅎ", "ㅏ"],
    hangul: "산하",
    meaning: "under a mountain",
  },
  { jamos: ["ㅅ", "ㅏ", "ㄴ", "ㅅ", "ㅗ"], hangul: "산소", meaning: "grave" },
  {
    jamos: ["ㅅ", "ㅏ", "ㄴ", "ㅈ", "ㅗ"],
    hangul: "산조",
    meaning: "sanjo (music)",
  },
  {
    jamos: ["ㅅ", "ㅏ", "ㄴ", "ㅊ", "ㅗ"],
    hangul: "산초",
    meaning: "schinus (tree)",
  },
  { jamos: ["ㅅ", "ㅏ", "ㄴ", "ㅋ", "ㅗ"], hangul: "산호", meaning: "coral" },
  {
    jamos: ["ㅁ", "ㅏ", "ㄴ", "ㄷ", "ㅗ"],
    hangul: "만두",
    meaning: "dumpling",
  },
  {
    jamos: ["ㅂ", "ㅏ", "ㄴ", "ㅅ", "ㅣ"],
    hangul: "반식",
    meaning: "half-time",
  },
  // CVG-CV words (3 jamo + 2 jamo = 5 jamo total)
  {
    jamos: ["ㄱ", "ㅏ", "ㄱ", "ㄱ", "ㅏ"],
    hangul: "강가",
    meaning: "riverbank",
  },
  {
    jamos: ["ㅂ", "ㅏ", "ㄱ", "ㅂ", "ㅏ"],
    hangul: "방방",
    meaning: "suddenly",
  },
  {
    jamos: ["ㄱ", "ㅏ", "ㄱ", "ㅈ", "ㅗ"],
    hangul: "강조",
    meaning: "emphasis, stress",
  },
  {
    jamos: ["ㄱ", "ㅏ", "ㄱ", "ㅋ", "ㅗ"],
    hangul: "강호",
    meaning: "martial arts world",
  },
  {
    jamos: ["ㄱ", "ㅏ", "ㄱ", "ㅌ", "ㅗ"],
    hangul: "강토",
    meaning: "territory",
  },
  { jamos: ["ㄱ", "ㅏ", "ㄱ", "ㅜ"], hangul: "강우", meaning: "rain" },
  { jamos: ["ㅎ", "ㅏ", "ㄱ", "ㅅ", "ㅗ"], hangul: "항소", meaning: "appeal" },
  {
    jamos: ["ㅎ", "ㅏ", "ㄱ", "ㅈ", "ㅗ"],
    hangul: "항조",
    meaning: "Hyeongjo (king's era)",
  },
  {
    jamos: ["ㅊ", "ㅏ", "ㄱ", "ㅈ", "ㅗ"],
    hangul: "참조",
    meaning: "reference",
  },
];

/** Words that fit exactly 5 keyboard jamo slots after vowel decomposition */
export const words = allWords.filter((word) => isPlayableWord(word.jamos));

/** Select a random word from the dictionary */
export function getRandomWord(): WordEntry {
  const index = Math.floor(Math.random() * words.length);
  return words[index];
}

/** Validate that a basic jamo sequence forms a valid word */
export function isValidWord(jamos: string[]): boolean {
  const input = jamos.join("");
  return words.some((word) => expandJamos(word.jamos).join("") === input);
}
