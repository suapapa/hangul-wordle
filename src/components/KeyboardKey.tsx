interface KeyboardKeyProps {
  label: string;
  color: string;
  onClick: () => void;
  large?: boolean;
  expand?: boolean;
  action?: boolean;
  tall?: boolean;
  grid?: boolean;
  ariaLabel?: string;
  className?: string;
  style?: import('react').CSSProperties;
}

export function KeyboardKey({
  label,
  color,
  onClick,
  large = false,
  expand = false,
  action = false,
  tall = false,
  grid = false,
  ariaLabel,
  className = '',
  style,
}: KeyboardKeyProps) {
  let bgClass = 'bg-game-key';
  let textColor = 'text-game-bg';
  
  switch (color) {
    case 'correct':
      bgClass = 'bg-game-correct';
      textColor = 'text-white';
      break;
    case 'present':
      bgClass = 'bg-game-present';
      textColor = 'text-white';
      break;
    case 'absent':
      bgClass = 'bg-game-absent';
      textColor = 'text-game-muted';
      break;
    default:
      bgClass = 'bg-game-key';
      textColor = 'text-game-bg';
  }
  
  const sizeClass = action
    ? tall
      ? 'h-full w-full min-h-[44px] py-3.5 sm:py-4 text-2xl sm:text-3xl leading-none'
      : 'flex-1 min-w-0 min-h-[44px] sm:min-h-[48px] py-3.5 sm:py-4 text-2xl sm:text-3xl leading-none'
    : grid
      ? 'w-full min-h-[44px] sm:min-h-[48px] py-3.5 sm:py-4 text-base sm:text-lg'
      : large
        ? 'min-h-[44px] min-w-[56px] px-4 sm:px-5 py-3 sm:py-3.5 text-sm sm:text-base'
        : expand
          ? 'flex-1 min-w-0 min-h-[44px] sm:min-h-[48px] py-3.5 sm:py-4 text-base sm:text-lg'
          : 'px-2 sm:px-3 py-3 sm:py-3.5 text-sm sm:text-base';

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      style={style}
      className={`
        interactive-focus
        ${sizeClass}
        rounded font-semibold
        transition-all duration-150
        ${bgClass} ${textColor}
        active:scale-95 active:brightness-90
        select-none
        ${className}
      `}
    >
      {label}
    </button>
  );
}
