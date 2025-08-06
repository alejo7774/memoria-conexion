import { useState, useEffect, useCallback } from 'react';
import type { Card as CardType, Question, GameState, GameSettings } from './types';
import { defaultGameSettings, getInitialGameState } from './utils/gameUtils';
import { getRandomQuestion as getRandomQuestionFromData } from './data/questions';


// Components
import GameBoard from './components/GameBoard';
import ScorePanel from './components/ScorePanel';
import QuestionModal from './components/QuestionModal';
import SettingsPanel from './components/SettingsPanel';
import GameOver from './components/GameOver';

// Icons
import { Settings, RotateCcw } from 'lucide-react';

function App() {
  const [gameState, setGameState] = useState<GameState>(() => 
    getInitialGameState(defaultGameSettings)
  );
  const [flippedCards, setFlippedCards] = useState<CardType[]>([]);
  const [disableCards, setDisableCards] = useState(false);
  const [showSettings, setShowSettings] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  
  // Function to start a new game
  const startGame = useCallback(() => {
    setGameState(prevState => {
      const newState = getInitialGameState(prevState.settings);
      if (prevState.settings.timerEnabled) {
        setTimeLeft(prevState.settings.timerDuration);
      } else {
        setTimeLeft(0);
      }
      return {
        ...newState,
        isGameStarted: true,
      };
    });
    setFlippedCards([]);
    setDisableCards(false);
    setShowSettings(false);
  }, []);
  
  // Function to handle card click
  const handleCardClick = useCallback((clickedCard: CardType) => {
    if (disableCards || clickedCard.isFlipped || clickedCard.isMatched || flippedCards.length >= 2) return;

    const newFlippedCards = [...flippedCards, clickedCard];

    // Visually flip the card immediately
    setGameState(prev => ({
      ...prev,
      cards: prev.cards.map(card =>
        card.id === clickedCard.id ? { ...card, isFlipped: true } : card
      ),
    }));

    setFlippedCards(newFlippedCards);

    if (newFlippedCards.length === 2) {
      setDisableCards(true);
      const [firstCard, secondCard] = newFlippedCards;
      const isMatch = firstCard.emoji === secondCard.emoji;

      setTimeout(() => {
        setGameState(prev => {
          const totalPairs = prev.cards.length / 2;

          if (isMatch) {
            const newMatchedPairs = prev.matchedPairs + 1;
            const randomQuestion = getRandomQuestionFromData();

            return {
              ...prev,
              attempts: prev.attempts + 1,
              matchedPairs: newMatchedPairs,
              cards: prev.cards.map(card =>
                card.emoji === firstCard.emoji ? { ...card, isFlipped: true, isMatched: true } : card
              ),
              teams: prev.teams.map(team =>
                team.id === prev.currentTeamId ? { ...team, score: team.score + 1 } : team
              ),
              currentQuestion: randomQuestion,
              showQuestion: true,
              isGameOver: newMatchedPairs === totalPairs,
            };
          }

          // No match
          return {
            ...prev,
            attempts: prev.attempts + 1,
            currentTeamId: (prev.currentTeamId + 1) % prev.teams.length,
            cards: prev.cards.map(card => {
              if (card.id === firstCard.id || card.id === secondCard.id) {
                return { ...card, isFlipped: false };
              }
              return card;
            }),
          };
        });

        setFlippedCards([]);
        setDisableCards(false);
      }, 1000);
    }
  }, [disableCards, flippedCards]);
  
  // Timer effect
  useEffect(() => {
    if (!gameState.isGameStarted || !gameState.settings.timerEnabled || gameState.isGameOver) {
      return;
    }

    if (timeLeft <= 0) {
      setGameState(prev => ({ ...prev, isGameOver: true }));
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft(prevTime => prevTime - 1);
    }, 1000);

    return () => clearInterval(timerId);
  }, [gameState.isGameStarted, gameState.settings.timerEnabled, gameState.isGameOver, timeLeft]);

  // Handle settings change
  const handleSettingsChange = (newSettings: GameSettings) => {
    setGameState(prev => ({
      ...prev,
      settings: newSettings
    }));
  };
  
  // Close question modal
  const handleCloseQuestion = () => {
    setGameState(prev => ({
      ...prev,
      showQuestion: false
    }));
  };
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex flex-col">
      {/* Header */}
      <header className="bg-white/20 backdrop-blur-md p-4 shadow-md sticky top-0 z-10">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Left side: Title and controls */}
          <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Memoria & Conexión
            </h1>
            <p className="text-white/90 text-lg md:text-xl font-medium">
              Encuentra parejas y conoce mejor a tu equipo
            </p>
            <div className="flex space-x-2 mt-4 justify-center md:justify-start">
              <button
                onClick={() => setShowSettings(true)}
                className="p-2 bg-white/30 hover:bg-white/40 rounded-full transition-colors"
                aria-label="Ajustes"
              >
                <Settings className="w-6 h-6 text-white" />
              </button>
              <button
                onClick={startGame}
                className="p-2 bg-white/30 hover:bg-white/40 rounded-full transition-colors"
                aria-label="Reiniciar juego"
              >
                <RotateCcw className="w-6 h-6 text-white" />
              </button>
            </div>
          </div>

          {/* Right side: Score Panel */}
          <div className="w-full md:w-auto md:min-w-[350px]">
          <ScorePanel 
            teams={gameState.teams}
            currentTeamId={gameState.currentTeamId}
            attempts={gameState.attempts}
            matchedPairs={gameState.matchedPairs}
            totalPairs={gameState.cards.length / 2}
            timeLeft={timeLeft}
            timerEnabled={gameState.settings.timerEnabled}
          />
        </div>
        </div>
      </header>
      
      {/* Main content */}
      <main className="flex-1 p-4 flex justify-center items-start">
        <GameBoard
          cards={gameState.cards}
          onCardClick={handleCardClick}
          disableCards={disableCards}
          difficulty={gameState.settings.difficulty}
        />
      </main>
      
      {/* Modals */}
      <SettingsPanel 
        settings={gameState.settings}
        onSettingsChange={handleSettingsChange}
        onStartGame={startGame}
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
      
      <QuestionModal 
        question={gameState.currentQuestion}
        isOpen={gameState.showQuestion}
        onClose={handleCloseQuestion}
      />
      
      {gameState.isGameOver && (
        <GameOver 
          teams={gameState.teams}
          attempts={gameState.attempts}
          onRestartGame={startGame}
        />
      )}
      <footer className="text-center text-sm text-white py-6">
  <p>🎯 Este juego está diseñado para romper el hielo y fortalecer la conexión entre los miembros de un equipo durante reuniones o sesiones de integración.</p>
  <p className="mt-2">Desarrollado con ❤️ y ☕ por <strong>@JavierMosquera</strong></p>
</footer>

    </div>
  );
}

export default App;