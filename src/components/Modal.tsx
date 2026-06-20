import type { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  title: string;
  message: ReactNode;
  buttonText: string;
  onButtonClick: () => void;
  variant?: 'win' | 'lose' | 'info';
}

export function Modal({ isOpen, title, message, buttonText, onButtonClick, variant = 'info' }: ModalProps) {
  if (!isOpen) return null;
  
  let titleColor = 'text-game-text';
  let bgColor = 'bg-game-bg';
  
  if (variant === 'win') {
    titleColor = 'text-game-accent';
    bgColor = 'bg-game-correct';
  } else if (variant === 'lose') {
    titleColor = 'text-game-muted';
  }
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-game-overlay p-4">
      <div className={`${bgColor} rounded-xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-game-border`}>
        <h2 className={`text-2xl sm:text-3xl font-bold mb-3 ${titleColor} text-center`}>
          {title}
        </h2>
        <div className="text-game-text text-left mb-6 text-base sm:text-lg leading-relaxed">
          {message}
        </div>
        <button
          onClick={onButtonClick}
          className="w-full py-3 rounded-lg bg-game-correct text-white font-bold text-lg hover:bg-opacity-90 transition-colors"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}