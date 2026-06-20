interface HeaderProps {
  title: string;
  onInfoClick?: () => void;
}

export function Header({ title, onInfoClick }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3 border-b border-game-border bg-game-bg">
      <h1 className="text-xl sm:text-2xl font-bold tracking-wide">
        {title}
      </h1>
      <button
        onClick={onInfoClick}
        className="w-8 h-8 flex items-center justify-center rounded-full bg-game-surface text-game-text hover:bg-game-border transition-colors"
        aria-label="정보"
      >
        ?
      </button>
    </header>
  );
}