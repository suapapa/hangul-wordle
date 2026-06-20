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
    jamos: ["ㅂ", "ㅏ", "ㅇ", "ㄱ", "ㅜ"],
    hangul: "방구",
    meaning: "vent, toilet",
  },
  { jamos: ["ㅂ", "ㅏ", "ㄴ", "ㅈ", "ㅣ"], hangul: "반지", meaning: "ring" },
  {
    jamos: ["ㅈ", "ㅏ", "ㄴ", "ㅊ", "ㅣ"],
    hangul: "잔치",
    meaning: "party, celebration",
  },
  {
    jamos: ["ㅅ", "ㅏ", "ㄴ", "ㅁ", "ㅗ"],
    hangul: "산모",
    meaning: "new mother",
  },
  { jamos: ["ㅁ", "ㅜ", "ㄴ", "ㅇ", "ㅓ"], hangul: "문어", meaning: "octopus" },
  {
    jamos: ["ㄱ", "ㅏ", "ㄴ", "ㅎ", "ㅗ"],
    hangul: "간호",
    meaning: "nurse, care",
  },
  {
    jamos: ["ㄷ", "ㅏ", "ㄴ", "ㅎ", "ㅗ"],
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
  { jamos: ["ㄷ", "ㅏ", "ㄴ", "ㅇ", "ㅗ"], hangul: "단오", meaning: "Dano festival" },
  {
    jamos: ["ㅎ", "ㅏ", "ㄴ", "ㄷ", "ㅜ"],
    hangul: "한두",
    meaning: "a couple of",
  },
  { jamos: ["ㅎ", "ㅏ", "ㄴ", "ㅇ", "ㅜ"], hangul: "한우", meaning: "Korean beef" },
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
  { jamos: ["ㅅ", "ㅏ", "ㄴ", "ㅎ", "ㅗ"], hangul: "산호", meaning: "coral" },
  {
    jamos: ["ㅁ", "ㅏ", "ㄴ", "ㄷ", "ㅜ"],
    hangul: "만두",
    meaning: "dumpling",
  },
  { jamos: ["ㅎ", "ㅏ", "ㄴ", "ㅡ", "ㄹ"], hangul: "하늘", meaning: "sky" },
  { jamos: ["ㄱ", "ㅜ", "ㄹ", "ㅡ", "ㅁ"], hangul: "구름", meaning: "cloud" },
  { jamos: ["ㅅ", "ㅣ", "ㄱ", "ㅏ", "ㄴ"], hangul: "시간", meaning: "time" },
  { jamos: ["ㄱ", "ㅛ", "ㅅ", "ㅣ", "ㄹ"], hangul: "교실", meaning: "classroom" },
  { jamos: ["ㅈ", "ㅣ", "ㄱ", "ㅏ", "ㅂ"], hangul: "지갑", meaning: "wallet" },
  { jamos: ["ㅇ", "ㅜ", "ㅅ", "ㅏ", "ㄴ"], hangul: "우산", meaning: "umbrella" },
  { jamos: ["ㄱ", "ㅏ", "ㅂ", "ㅏ", "ㅇ"], hangul: "가방", meaning: "bag" },
  { jamos: ["ㅈ", "ㅜ", "ㅂ", "ㅏ", "ㅇ"], hangul: "주방", meaning: "kitchen" },
  { jamos: ["ㄱ", "ㅓ", "ㅅ", "ㅣ", "ㄹ"], hangul: "거실", meaning: "living room" },
  { jamos: ["ㅁ", "ㅏ", "ㄷ", "ㅏ", "ㅇ"], hangul: "마당", meaning: "yard" },
  { jamos: ["ㅅ", "ㅜ", "ㅇ", "ㅕ", "ㅇ"], hangul: "수영", meaning: "swimming" },
  { jamos: ["ㄴ", "ㅗ", "ㄹ", "ㅏ", "ㅇ"], hangul: "노랑", meaning: "yellow" },
  { jamos: ["ㅍ", "ㅏ", "ㄹ", "ㅏ", "ㅇ"], hangul: "파랑", meaning: "blue" },
  { jamos: ["ㅊ", "ㅗ", "ㄹ", "ㅗ", "ㄱ"], hangul: "초록", meaning: "green" },
  { jamos: ["ㅅ", "ㅏ", "ㅈ", "ㅣ", "ㄴ"], hangul: "사진", meaning: "photo" },
  { jamos: ["ㅅ", "ㅗ", "ㄱ", "ㅡ", "ㅁ"], hangul: "소금", meaning: "salt" },
  { jamos: ["ㄱ", "ㅡ", "ㄹ", "ㅣ", "ㅁ"], hangul: "그림", meaning: "picture" },
  { jamos: ["ㄱ", "ㅣ", "ㄹ", "ㅡ", "ㅁ"], hangul: "기름", meaning: "oil" },
  { jamos: ["ㅇ", "ㅕ", "ㄹ", "ㅡ", "ㅁ"], hangul: "여름", meaning: "summer" },
  { jamos: ["ㄱ", "ㅏ", "ㅇ", "ㅡ", "ㄹ"], hangul: "가을", meaning: "autumn" },
  { jamos: ["ㄱ", "ㅕ", "ㅇ", "ㅜ", "ㄹ"], hangul: "겨울", meaning: "winter" },
  { jamos: ["ㄱ", "ㅣ", "ㅇ", "ㅗ", "ㄴ"], hangul: "기온", meaning: "temperature" },
  { jamos: ["ㅂ", "ㅏ", "ㄹ", "ㅏ", "ㅁ"], hangul: "바람", meaning: "wind" },
  { jamos: ["ㅈ", "ㅓ", "ㄴ", "ㅕ", "ㄱ"], hangul: "저녁", meaning: "evening" },
  { jamos: ["ㅇ", "ㅑ", "ㅅ", "ㅣ", "ㄱ"], hangul: "야식", meaning: "late-night snack" },
  { jamos: ["ㄹ", "ㅏ", "ㅁ", "ㅕ", "ㄴ"], hangul: "라면", meaning: "ramen" },
  { jamos: ["ㅇ", "ㅜ", "ㄷ", "ㅗ", "ㅇ"], hangul: "우동", meaning: "udon" },
  { jamos: ["ㄴ", "ㅏ", "ㅁ", "ㅜ", "ㄹ"], hangul: "나물", meaning: "seasoned vegetables" },
  { jamos: ["ㅅ", "ㅣ", "ㅎ", "ㅓ", "ㅁ"], hangul: "시험", meaning: "exam" },
  { jamos: ["ㅇ", "ㅗ", "ㄷ", "ㅏ", "ㅂ"], hangul: "오답", meaning: "wrong answer" },
  { jamos: ["ㅅ", "ㅜ", "ㅇ", "ㅓ", "ㅂ"], hangul: "수업", meaning: "class, lesson" },
  { jamos: ["ㅅ", "ㅓ", "ㄹ", "ㅏ", "ㅂ"], hangul: "서랍", meaning: "drawer" },
  { jamos: ["ㅇ", "ㅣ", "ㅂ", "ㅜ", "ㄹ"], hangul: "이불", meaning: "blanket" },
  { jamos: ["ㅋ", "ㅓ", "ㅌ", "ㅡ", "ㄴ"], hangul: "커튼", meaning: "curtain" },
  { jamos: ["ㅂ", "ㅏ", "ㄷ", "ㅏ", "ㄱ"], hangul: "바닥", meaning: "floor" },
  { jamos: ["ㅈ", "ㅗ", "ㅁ", "ㅕ", "ㅇ"], hangul: "조명", meaning: "lighting" },
  { jamos: ["ㄱ", "ㅏ", "ㅁ", "ㅜ", "ㅁ"], hangul: "가뭄", meaning: "drought" },
  { jamos: ["ㄱ", "ㅏ", "ㅅ", "ㅡ", "ㅁ"], hangul: "가슴", meaning: "chest" },
  { jamos: ["ㄱ", "ㅓ", "ㅇ", "ㅜ", "ㄹ"], hangul: "거울", meaning: "mirror" },
  { jamos: ["ㄱ", "ㅛ", "ㅌ", "ㅗ", "ㅇ"], hangul: "교통", meaning: "traffic" },
  { jamos: ["ㄱ", "ㅣ", "ㄹ", "ㅣ", "ㄴ"], hangul: "기린", meaning: "giraffe" },
  { jamos: ["ㅁ", "ㅜ", "ㄹ", "ㅡ", "ㅍ"], hangul: "무릎", meaning: "knee" },
  { jamos: ["ㅅ", "ㅏ", "ㄱ", "ㅓ", "ㄴ"], hangul: "사건", meaning: "incident" },
  { jamos: ["ㅅ", "ㅜ", "ㅅ", "ㅜ", "ㄹ"], hangul: "수술", meaning: "surgery" },
  { jamos: ["ㅇ", "ㅛ", "ㅌ", "ㅗ", "ㅇ"], hangul: "요통", meaning: "back pain" },
  { jamos: ["ㅈ", "ㅣ", "ㅈ", "ㅣ", "ㄴ"], hangul: "지진", meaning: "earthquake" },
  { jamos: ["ㅊ", "ㅓ", "ㅂ", "ㅏ", "ㅇ"], hangul: "처방", meaning: "prescription" },
  { jamos: ["ㅊ", "ㅣ", "ㅌ", "ㅗ", "ㅇ"], hangul: "치통", meaning: "toothache" },
  { jamos: ["ㅇ", "ㅏ", "ㅊ", "ㅣ", "ㅁ"], hangul: "아침", meaning: "morning" },
  { jamos: ["ㄷ", "ㅜ", "ㅌ", "ㅗ", "ㅇ"], hangul: "두통", meaning: "headache" },
  // CVG-CV words (3 jamo + 2 jamo = 5 jamo total)
  {
    jamos: ["ㄱ", "ㅏ", "ㅇ", "ㄱ", "ㅏ"],
    hangul: "강가",
    meaning: "riverbank",
  },
  {
    jamos: ["ㄱ", "ㅏ", "ㅇ", "ㅈ", "ㅗ"],
    hangul: "강조",
    meaning: "emphasis, stress",
  },
  {
    jamos: ["ㄱ", "ㅏ", "ㅇ", "ㅎ", "ㅗ"],
    hangul: "강호",
    meaning: "martial arts world",
  },
  {
    jamos: ["ㄱ", "ㅏ", "ㅇ", "ㅌ", "ㅗ"],
    hangul: "강토",
    meaning: "territory",
  },
  { jamos: ["ㄱ", "ㅏ", "ㅇ", "ㅇ", "ㅜ"], hangul: "강우", meaning: "rain" },
  { jamos: ["ㅎ", "ㅏ", "ㅇ", "ㅅ", "ㅗ"], hangul: "항소", meaning: "appeal" },
  {
    jamos: ["ㅎ", "ㅏ", "ㅇ", "ㅈ", "ㅗ"],
    hangul: "항조",
    meaning: "Hyeongjo (king's era)",
  },
  {
    jamos: ["ㅊ", "ㅏ", "ㅁ", "ㅈ", "ㅗ"],
    hangul: "참조",
    meaning: "reference",
  },
  { jamos: ["ㅎ", "ㅏ", "ㄱ", "ㄱ", "ㅛ"], hangul: "학교", meaning: "school" },
  { jamos: ["ㅊ", "ㅣ", "ㄴ", "ㄱ", "ㅜ"], hangul: "친구", meaning: "friend" },
  { jamos: ["ㄱ", "ㅗ", "ㅇ", "ㅂ", "ㅜ"], hangul: "공부", meaning: "study" },
  { jamos: ["ㅊ", "ㅜ", "ㄱ", "ㄱ", "ㅜ"], hangul: "축구", meaning: "soccer" },
  { jamos: ["ㄴ", "ㅗ", "ㅇ", "ㄱ", "ㅜ"], hangul: "농구", meaning: "basketball" },
  { jamos: ["ㄱ", "ㅗ", "ㄹ", "ㅍ", "ㅡ"], hangul: "골프", meaning: "golf" },
  { jamos: ["ㄷ", "ㅗ", "ㄱ", "ㅅ", "ㅓ"], hangul: "독서", meaning: "reading" },
  { jamos: ["ㅅ", "ㅣ", "ㄱ", "ㅊ", "ㅗ"], hangul: "식초", meaning: "vinegar" },
  { jamos: ["ㄴ", "ㅏ", "ㄱ", "ㅈ", "ㅣ"], hangul: "낙지", meaning: "octopus" },
  { jamos: ["ㅁ", "ㅕ", "ㄹ", "ㅊ", "ㅣ"], hangul: "멸치", meaning: "anchovy" },
  { jamos: ["ㅊ", "ㅏ", "ㅁ", "ㅊ", "ㅣ"], hangul: "참치", meaning: "tuna" },
  { jamos: ["ㅇ", "ㅕ", "ㄴ", "ㅇ", "ㅓ"], hangul: "연어", meaning: "salmon" },
  { jamos: ["ㅅ", "ㅏ", "ㅁ", "ㅊ", "ㅣ"], hangul: "삼치", meaning: "Spanish mackerel" },
  { jamos: ["ㄱ", "ㅏ", "ㄹ", "ㅊ", "ㅣ"], hangul: "갈치", meaning: "cutlassfish" },
  { jamos: ["ㅈ", "ㅏ", "ㅇ", "ㅇ", "ㅓ"], hangul: "장어", meaning: "eel" },
  { jamos: ["ㅂ", "ㅜ", "ㅇ", "ㅇ", "ㅓ"], hangul: "붕어", meaning: "crucian carp" },
  { jamos: ["ㅇ", "ㅣ", "ㅇ", "ㅇ", "ㅓ"], hangul: "잉어", meaning: "carp" },
  { jamos: ["ㄱ", "ㅜ", "ㄱ", "ㅅ", "ㅜ"], hangul: "국수", meaning: "noodles" },
  { jamos: ["ㄱ", "ㅣ", "ㅁ", "ㅊ", "ㅣ"], hangul: "김치", meaning: "kimchi" },
  { jamos: ["ㅅ", "ㅡ", "ㅂ", "ㄷ", "ㅗ"], hangul: "습도", meaning: "humidity" },
  { jamos: ["ㅈ", "ㅏ", "ㅇ", "ㅁ", "ㅏ"], hangul: "장마", meaning: "rainy season" },
  { jamos: ["ㅍ", "ㅗ", "ㄱ", "ㅇ", "ㅜ"], hangul: "폭우", meaning: "heavy rain" },
  { jamos: ["ㅎ", "ㅏ", "ㄴ", "ㅍ", "ㅏ"], hangul: "한파", meaning: "cold wave" },
  { jamos: ["ㅎ", "ㅗ", "ㅇ", "ㅅ", "ㅜ"], hangul: "홍수", meaning: "flood" },
  { jamos: ["ㄱ", "ㅏ", "ㅁ", "ㄱ", "ㅣ"], hangul: "감기", meaning: "cold (illness)" },
  { jamos: ["ㄱ", "ㅓ", "ㅁ", "ㅅ", "ㅏ"], hangul: "검사", meaning: "examination" },
  { jamos: ["ㅈ", "ㅣ", "ㄴ", "ㄹ", "ㅛ"], hangul: "진료", meaning: "medical treatment" },
  { jamos: ["ㅍ", "ㅣ", "ㄹ", "ㄱ", "ㅣ"], hangul: "필기", meaning: "note-taking" },
  { jamos: ["ㄷ", "ㅏ", "ㅁ", "ㅇ", "ㅛ"], hangul: "담요", meaning: "blanket" },
  { jamos: ["ㅂ", "ㅕ", "ㄱ", "ㅈ", "ㅣ"], hangul: "벽지", meaning: "wallpaper" },
  { jamos: ["ㅂ", "ㅏ", "ㄹ", "ㅊ", "ㅣ"], hangul: "발치", meaning: "tooth extraction" },
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
