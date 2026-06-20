import { useState, useEffect } from 'react';
import { Header } from './components/Header.js';
import { Board } from './components/Board.js';
import { Keyboard } from './components/Keyboard.js';
import { Modal } from './components/Modal.js';
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
  
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({ title: '', message: '', buttonText: '' });
  
  // Show modal when game ends
  useEffect(() => {
    if (state.status === 'won' || state.status === 'lost') {
      if (state.status === 'won') {
        const messages = ['일등!', '완벽!', '훌륭해요!', '대단해요!', '아쉬워요...', '아직 남았어요!'];
        setModalData({
          title: '🎉 정답!',
          message: messages[Math.min(state.guesses.length - 1, 5)],
          buttonText: '다음 게임',
        });
      } else {
        setModalData({
          title: '💨 아깝다...',
          message: `정답: ${state.display}`,
          buttonText: '다시 시도',
        });
      }
      setShowModal(true);
    }
  }, [state.status, state.guesses.length, state.display]);
  
  const handleNewGame = () => {
    setShowModal(false);
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
      <Header title="한글 단어 맞추기" />
      
      {/* Board */}
      <Board state={state} />
      
      {/* Keyboard */}
      <Keyboard
        onKeyPress={pressKey}
        onDelete={deleteKey}
        onEnter={submit}
        colors={colors}
      />
      
      {/* Modal */}
      <Modal
        isOpen={showModal}
        title={modalData.title}
        message={modalData.message}
        buttonText={modalData.buttonText}
        onButtonClick={handleNewGame}
        variant={state.status === 'won' ? 'win' : 'lose'}
      />
    </div>
  );
}

export default App;