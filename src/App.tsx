import { useState, useEffect } from 'react';
import { Header } from './components/Header.js';
import { Board } from './components/Board.js';
import { Keyboard } from './components/Keyboard.js';
import { GuessHistoryMini } from './components/GuessHistoryMini.js';
import { Modal } from './components/Modal.js';
import { WinModal } from './components/WinModal.js';
import { useGame } from './hooks/useGame.js';
import { isKeyboardKey } from './game/jamo.js';
import './styles/globals.css';

function App() {
  const {
    state,
    pressKey,
    deleteKey,
    submit,
    keyboardColors,
    newGame,
  } = useGame();
  
  const [showRulesModal, setShowRulesModal] = useState(false);

  const handleNewGame = () => {
    newGame();
  };
  
  // Keyboard event handler
  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // Only handle letters (Korean jamo)
      const key = e.key;
      
      if (key === 'Enter') {
        submit();
        return;
      }
      
      if (key === 'Backspace') {
        deleteKey();
        return;
      }
      
      if (isKeyboardKey(key)) {
        pressKey(key);
      }
    }
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pressKey, deleteKey, submit]);
  
  const colors = keyboardColors();
  
  return (
    <div className="flex flex-col h-full min-h-[100dvh] bg-game-bg">
      {/* Header */}
      <Header
        title="한글 단어 맞추기"
        onInfoClick={() => setShowRulesModal(true)}
      />
      
      {/* Board */}
      <Board state={state} />
      
      {/* Keyboard */}
      <Keyboard
        onKeyPress={pressKey}
        onDelete={deleteKey}
        onEnter={submit}
        colors={colors}
      />
      
      <WinModal
        isOpen={state.status === 'won'}
        word={state.display}
        guesses={state.guesses}
        onNewGame={handleNewGame}
      />

      {/* Game end modal (lose) */}
      <Modal
        isOpen={state.status === 'lost'}
        title="아깝다..."
        message={
          <div className="space-y-5">
            <GuessHistoryMini guesses={state.guesses} />
            <p className="text-center font-semibold">{`정답: ${state.display}`}</p>
          </div>
        }
        buttonText="다시 시도"
        onButtonClick={handleNewGame}
        variant="lose"
      />

      {/* Rules modal */}
      <Modal
        isOpen={showRulesModal}
        title="게임 방법"
        message={
          <div className="space-y-4">
            <p>2음절 한글 단어를 5번 안에 맞히세요. 한 줄에 자모 5개를 입력합니다.</p>
            <ul className="list-disc list-inside space-y-1 text-sm sm:text-base">
              <li>키보드나 화면 자판으로 자모를 입력합니다.</li>
              <li>복합모음(ㅘ, ㅐ, ㅚ 등)은 기본 모음 조합으로 입력됩니다.</li>
              <li>입력이 끝나면 Enter(↵)를 눌러 제출합니다.</li>
            </ul>
            <div className="space-y-2 text-sm sm:text-base">
              <p className="font-semibold">색상 안내</p>
              <div className="flex items-center gap-2">
                <span className="inline-block w-8 h-8 rounded bg-game-correct shrink-0" aria-hidden="true" />
                <span>초록 — 위치와 자모 모두 정답</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-8 h-8 rounded bg-game-present shrink-0" aria-hidden="true" />
                <span>노랑 — 자모는 맞지만 위치가 다름</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-8 h-8 rounded bg-game-absent shrink-0" aria-hidden="true" />
                <span>회색 — 정답에 없는 자모</span>
              </div>
            </div>
          </div>
        }
        buttonText="닫기"
        onButtonClick={() => setShowRulesModal(false)}
        onDismiss={() => setShowRulesModal(false)}
        variant="info"
      />
    </div>
  );
}

export default App;