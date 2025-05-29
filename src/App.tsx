import React, { useState, useEffect, useCallback } from 'react';
import { Card as CardType, Question, GameState, GameSettings } from './types';
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
  
  // Function to start a new game
  const startGame = useCallback(() => {
    setGameState(prevState => {
      const newState = getInitialGameState(prevState.settings);
      return {
        ...newState,
        isGameStarted: true
      };
    });
    setFlippedCards([]);
    setDisableCards(false);
    setShowSettings(false);
  }, []);
  
  // Function to handle card click
  const handleCardClick = (clickedCard: CardType) => {
    if (disableCards || clickedCard.isFlipped || clickedCard.isMatched) return;
    
    const updatedCards = gameState.cards.map(card => 
      card.id === clickedCard.id ? { ...card, isFlipped: true } : card
    );
    
    setGameState(prev => ({ ...prev, cards: updatedCards }));
    setFlippedCards(prev => [...prev, clickedCard]);
    
    if (flippedCards.length === 1) {
      setDisableCards(true);
      const [firstCard] = flippedCards;
      const isMatch = firstCard.emoji === clickedCard.emoji;
      
      setTimeout(() => {
        const newCards = gameState.cards.map(card => {
          if (card.id === firstCard.id || card.id === clickedCard.id) {
            return {
              ...card,
              isFlipped: isMatch,
              isMatched: isMatch
            };
          }
          return card;
        });
        
        const updatedTeams = [...gameState.teams];
        const currentTeam = updatedTeams[gameState.currentTeamId];
        
        setGameState(prev => {
          const newState = {
            ...prev,
            cards: newCards,
            attempts: prev.attempts + 1,
            currentTeamId: isMatch ? prev.currentTeamId : (prev.currentTeamId + 1) % prev.teams.length
          };
          
          if (isMatch) {
            updatedTeams[gameState.currentTeamId] = {
              ...currentTeam,
              score: currentTeam.score + 1
            };
            
            const randomQuestion = getRandomQuestionFromData();
            
            return {
              ...newState,
              teams: updatedTeams,
              matchedPairs: prev.matchedPairs + 1,
              currentQuestion: randomQuestion,
              showQuestion: true,
              isGameOver: prev.matchedPairs + 1 === 6
            };
          }
          
          return newState;
        });
        
        setFlippedCards([]);
        setDisableCards(false);
      }, 1000);
    }
  };
  
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
      <header className="bg-white/20 backdrop-blur-md p-4 shadow-md">
        <div className="container mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Memoria & Conexión
          </h1>
          <p className="text-white/90 text-lg md:text-xl font-medium">
            Encuentra parejas y conoce mejor a tu equipo
          </p>
          
          <div className="flex space-x-2 mt-4">
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
      </header>
      
      {/* Main content */}
      <main className="flex-1 container mx-auto p-4 flex flex-col md:flex-row gap-6 items-start">
        <div className="w-full md:w-2/3">
          <GameBoard 
            cards={gameState.cards}
            onCardClick={handleCardClick}
            disableCards={disableCards}
          />
        </div>
        
        <div className="w-full md:w-1/3 sticky top-4">
          <ScorePanel 
            teams={gameState.teams}
            currentTeamId={gameState.currentTeamId}
            attempts={gameState.attempts}
            matchedPairs={gameState.matchedPairs}
            totalPairs={6}
          />
        </div>
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
  <p className="mt-2">Desarrollado con 💡 y ☕ por <strong>@JavierMosquera</strong></p>
</footer>

    </div>
  );
}

export default App;