interface HeaderProps {
  title: string;
  onInfoClick?: () => void;
}

function InfoIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-5 h-5"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 16v-4" />
      <path d="M12 8h.01" />
    </svg>
  );
}

export function Header({ title, onInfoClick }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3 pt-[max(0.75rem,env(safe-area-inset-top))] border-b border-game-border bg-game-bg">
      <h1 className="text-xl sm:text-2xl font-bold tracking-wide">
        {title}
      </h1>
      <button
        type="button"
        onClick={onInfoClick}
        className="interactive-focus min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-game-surface text-game-text active:bg-game-border active:scale-95 transition-all duration-150"
        aria-label="게임 방법 보기"
      >
        <InfoIcon />
      </button>
    </header>
  );
}
