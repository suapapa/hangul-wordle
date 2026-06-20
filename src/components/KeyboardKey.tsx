interface KeyboardKeyProps {
  label: string;
  color: string;
  onClick: () => void;
  large?: boolean;
}

export function KeyboardKey({ label, color, onClick, large = false }: KeyboardKeyProps) {
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
  
  return (
    <button
      onClick={onClick}
      className={`
        ${large ? 'px-3 sm:px-4' : 'px-2 sm:px-3'} py-3 sm:py-3.5
        rounded font-semibold text-sm sm:text-base
        transition-all duration-150
        ${bgClass} ${textColor}
        active:scale-95
        select-none
      `}
    >
      {label}
    </button>
  );
}