import { useEffect, useId, useRef, type ReactNode } from 'react';
import { useFocusTrap } from '../hooks/useFocusTrap.js';

interface ModalProps {
  isOpen: boolean;
  title: string;
  message: ReactNode;
  buttonText: string;
  onButtonClick: () => void;
  onDismiss?: () => void;
  variant?: 'win' | 'lose' | 'info';
}

export function Modal({
  isOpen,
  title,
  message,
  buttonText,
  onButtonClick,
  onDismiss,
  variant = 'info',
}: ModalProps) {
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);

  useFocusTrap(isOpen, dialogRef);

  useEffect(() => {
    if (!isOpen || !onDismiss) return;

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onDismiss?.();
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onDismiss]);

  if (!isOpen) return null;

  let titleColor = 'text-game-text';
  if (variant === 'win') {
    titleColor = 'text-game-accent';
  } else if (variant === 'lose') {
    titleColor = 'text-game-muted';
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-game-overlay p-4"
      onClick={onDismiss}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="bg-game-surface rounded-xl p-6 sm:p-8 max-w-sm w-full border border-game-border"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id={titleId} className={`text-2xl sm:text-3xl font-bold mb-3 ${titleColor} text-center`}>
          {title}
        </h2>
        <div className="text-game-text text-left mb-6 text-base sm:text-lg leading-relaxed">
          {message}
        </div>
        <button
          type="button"
          onClick={onButtonClick}
          className="interactive-focus w-full min-h-[44px] py-3 rounded-lg bg-game-correct text-white font-bold text-lg active:brightness-90 transition-all duration-150"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
}
