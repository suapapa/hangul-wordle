import type { Evaluation, Seed } from './types.js';

/**
 * Evaluate a guess against the seed word.
 * Returns an array of Evaluation for each slot.
 * 
 * Rules:
 * 1. First pass: mark correct positions (green)
 * 2. Second pass: mark present but wrong position (yellow)
 * 3. Handle duplicate letters correctly
 */
export function evaluate(guess: Seed, seed: Seed): Evaluation[] {
  const results: Evaluation[] = Array(5).fill('absent' as const);
  
  // Count occurrences in seed (excluding already-correct positions)
  const seedCount = new Map<string, number>();
  for (let i = 0; i < 5; i++) {
    if (guess[i] !== seed[i]) {
      seedCount.set(seed[i], (seedCount.get(seed[i]) || 0) + 1);
    }
  }
  
  // First pass: correct positions
  for (let i = 0; i < 5; i++) {
    if (guess[i] === seed[i]) {
      results[i] = 'correct';
    }
  }
  
  // Second pass: present but wrong position
  for (let i = 0; i < 5; i++) {
    if (results[i] !== 'correct' && seedCount.get(guess[i]) !== undefined && seedCount.get(guess[i])! > 0) {
      results[i] = 'present';
      seedCount.set(guess[i], seedCount.get(guess[i])! - 1);
    }
  }
  
  return results;
}