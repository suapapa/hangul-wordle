import { useReducer, useCallback, useEffect, useRef } from 'react';
import type { GameState, Evaluation, GuessRow, Seed } from '../game/types.js';
import { evaluate } from '../game/engine.js';
import { expandJamos, isKeyboardKey } from '../game/jamo.js';
import { getRandomWord } from '../game/dictionary.js';

// Animation timing (ms)
const FLIP_DURATION = 500;

function describeGuess(row: GuessRow): string {
  const correct = row.results.filter((r) => r === 'correct').length;
  const present = row.results.filter((r) => r === 'present').length;
  return `${correct}개 정답, ${present}개 위치 틀림`;
}

function revealAnnouncement(state: GameState): string {
  const last = state.guesses[state.guesses.length - 1];
  if (state.status === 'won') {
    return `정답입니다! ${state.display}`;
  }
  if (state.status === 'lost') {
    return `아깝습니다. 정답은 ${state.display}입니다.`;
  }
  return describeGuess(last);
}

/**
 * Game state reducer
 */
type GameAction =
  | { type: 'PRESS_KEY'; key: string }
  | { type: 'DELETE_KEY' }
  | { type: 'SUBMIT' }
  | { type: 'NEW_GAME'; seed: Seed; display: string }
  | { type: 'REVEAL_ROW' }
  | { type: 'SET_ANIMATING'; value: boolean }
  | { type: 'SHAKE_END' };

function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'PRESS_KEY': {
      if (state.status !== 'playing' || state.animating) return state;
      if (!isKeyboardKey(action.key)) return state;
      if (state.currentInput.length >= 5) {
        return { ...state, shaking: true, announcement: '5글자를 모두 입력해주세요.' };
      }
      
      const newInput = [...state.currentInput, action.key];
      const newSlot = newInput.length - 1;
      
      return {
        ...state,
        currentInput: newInput,
        currentSlot: newSlot,
      };
    }
    
    case 'DELETE_KEY': {
      if (state.status !== 'playing' || state.animating) return state;
      if (state.currentInput.length === 0) {
        return { ...state, shaking: true, announcement: '입력할 수 없습니다.' };
      }
      
      const newInput = state.currentInput.slice(0, -1);
      return {
        ...state,
        currentInput: newInput,
        currentSlot: newInput.length - 1,
      };
    }
    
    case 'SUBMIT': {
      if (state.status !== 'playing' || state.animating) return state;
      if (state.currentInput.length < 5) {
        return { ...state, shaking: true, announcement: '5글자를 모두 입력해주세요.' };
      }
      
      const guessSlots = [...state.currentInput];
      const results = evaluate(guessSlots, state.seed);
      const newRow: GuessRow = { slots: guessSlots, results };
      
      const newGuesses = [...state.guesses, newRow];
      const newStatus = results.every(r => r === 'correct')
        ? 'won' as const
        : newGuesses.length >= 5
          ? 'lost' as const
          : 'playing' as const;
      
      // Calculate animation delays for staggered flip
      const animationDelays = Array.from({ length: 5 }, (_, i) => i * 300);
      
      return {
        ...state,
        guesses: newGuesses,
        currentRow: state.currentRow + 1,
        currentSlot: 0,
        currentInput: [],
        status: newStatus,
        animating: true,
        animationDelays,
      };
    }
    
    case 'REVEAL_ROW':
      return {
        ...state,
        animating: false,
        announcement: revealAnnouncement(state),
      };
    
    case 'SET_ANIMATING':
      return {
        ...state,
        animating: action.value,
      };
    
    case 'SHAKE_END':
      return {
        ...state,
        shaking: false,
      };

    case 'NEW_GAME':
      return {
        seed: action.seed,
        display: action.display,
        guesses: [],
        currentRow: 0,
        currentSlot: 0,
        currentInput: [],
        status: 'playing' as const,
        animating: false,
        shaking: false,
        animationDelays: [],
        lastUsedKey: null,
        lastKeyEvaluation: null,
        announcement: '',
      };
    
    default:
      return state;
  }
}

/**
 * Custom hook that encapsulates all game logic.
 */
export function useGame() {
  const [state, dispatch] = useReducer(gameReducer, {
    seed: [] as Seed,
    display: '',
    guesses: [] as GuessRow[],
    currentRow: 0,
    currentSlot: 0,
    currentInput: [] as string[],
    status: 'playing' as const,
    animating: false,
    shaking: false,
    animationDelays: [] as number[],
    lastUsedKey: null,
    lastKeyEvaluation: null,
    announcement: '',
  });
  
  const animationTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  
  // Initialize game with a random word
  useEffect(() => {
    const word = getRandomWord();
    dispatch({ type: 'NEW_GAME', seed: expandJamos(word.jamos), display: word.hangul });
  }, []);
  
  // Clean up animation timeout on unmount
  useEffect(() => {
    return () => {
      if (animationTimeoutRef.current) {
        clearTimeout(animationTimeoutRef.current);
      }
    };
  }, []);
  
  // Animate row reveal after submit
  useEffect(() => {
    if (state.animating) {
      animationTimeoutRef.current = setTimeout(() => {
        dispatch({ type: 'REVEAL_ROW' });
      }, FLIP_DURATION + 300);
    }
  }, [state.animating]);

  useEffect(() => {
    if (!state.shaking) return;

    const timeout = setTimeout(() => {
      dispatch({ type: 'SHAKE_END' });
    }, 500);

    return () => clearTimeout(timeout);
  }, [state.shaking]);
  
  const pressKey = useCallback((key: string) => {
    dispatch({ type: 'PRESS_KEY', key });
  }, []);
  
  const deleteKey = useCallback(() => {
    dispatch({ type: 'DELETE_KEY' });
  }, []);
  
  const submit = useCallback(() => {
    dispatch({ type: 'SUBMIT' });
  }, []);
  
  const newGame = useCallback(() => {
    const word = getRandomWord();
    dispatch({ type: 'NEW_GAME', seed: expandJamos(word.jamos), display: word.hangul });
  }, []);
  
  // Get keyboard colors from game state
  const keyboardColors = useCallback(() => {
    const colors: Record<string, Evaluation | 'unknown'> = {};
    
    // Process all previous guesses to set colors
    for (const guess of state.guesses) {
      for (let i = 0; i < 5; i++) {
        const key = guess.slots[i];
        const evaluation = guess.results[i];
        if (!key) continue;
        
        const current = colors[key];
        
        // Priority: correct > present > absent
        if (evaluation === 'correct' || 
            (evaluation === 'present' && current !== 'correct') || 
            (evaluation === 'absent' && current !== 'correct' && current !== 'present')) {
          colors[key] = evaluation;
        }
      }
    }
    
    return colors;
  }, [state.guesses]);
  
  return {
    state,
    pressKey,
    deleteKey,
    submit,
    keyboardColors,
    newGame,
  };
}