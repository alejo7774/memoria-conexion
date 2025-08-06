import React from 'react';
import { Team } from '../types';

interface GameOverProps {
  teams: Team[];
  attempts: number;
  onRestartGame: () => void;
}

const GameOver: React.FC<GameOverProps> = ({ teams, attempts, onRestartGame }) => {
  // Find winner team(s)
  const highestScore = Math.max(...teams.map(team => team.score));
  const winningTeams = teams.filter(team => team.score === highestScore);
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-scale-in">
        <h2 className="text-2xl font-bold text-center mb-6">¡Juego Terminado! 🎮</h2>
        
        <div className="bg-gradient-to-r from-indigo-100 to-purple-100 p-4 rounded-lg mb-6">
          {winningTeams.length === 1 ? (
            <p className="text-lg font-medium text-center">
              ¡{winningTeams[0].name} ha ganado con {winningTeams[0].score} puntos!
            </p>
          ) : (
            <p className="text-lg font-medium text-center">
              ¡Empate! {winningTeams.map(t => t.name).join(' y ')} 
              con {highestScore} puntos.
            </p>
          )}
          
          <p className="text-center mt-2">
            Total de intentos: {attempts}
          </p>
        </div>
        
        <h3 className="font-bold text-lg mb-2">Puntuaciones finales:</h3>
        <div className="mb-6">
          {teams.sort((a, b) => b.score - a.score).map(team => (
            <div key={team.id} className="flex justify-between py-2 border-b">
              <span>{team.name}</span>
              <span className="font-bold">{team.score} puntos</span>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center">
          <button
            onClick={onRestartGame}
            className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Jugar de nuevo
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOver;