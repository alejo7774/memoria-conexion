import React from 'react';
import { Team } from '../types';

interface ScorePanelProps {
  teams: Team[];
  currentTeamId: number;
  attempts: number;
  matchedPairs: number;
  totalPairs: number;
  timeLeft: number;
  timerEnabled: boolean;
}

const ScorePanel: React.FC<ScorePanelProps> = ({
  teams,
  currentTeamId,
  attempts,
  matchedPairs,
  totalPairs,
  timeLeft,
  timerEnabled,
}) => {
  const isIndividualMode = teams.length === 1;

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-white/30 backdrop-blur-md p-4 rounded-xl shadow-lg">
      {!isIndividualMode ? (
        <div className="grid grid-cols-2 gap-4">
          {teams.map((team) => (
            <div
              key={team.id}
              className={`p-3 rounded-lg ${
                team.id === currentTeamId
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white'
                  : 'bg-gray-100'
              }`}
            >
              <h3 className="text-lg font-bold mb-1">{team.name}</h3>
              <p className="text-sm mb-2">
                {team.players.length} jugadores
              </p>
              <div className="text-xl font-bold">
                Puntos: {team.score}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-3 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white mb-4">
          <h3 className="text-lg font-bold mb-1">Modo Individual</h3>
          <div className="text-xl font-bold">
            Puntos: {teams[0].score}
          </div>
        </div>
      )}

      <div className={`mt-4 grid ${timerEnabled ? 'grid-cols-4' : 'grid-cols-3'} gap-2 text-center`}>
        <div className="bg-gray-100 p-3 rounded-lg">
          <p className="text-sm text-gray-600">Intentos</p>
          <p className="text-xl font-bold">{attempts}</p>
        </div>
        <div className="bg-gray-100 p-3 rounded-lg">
          <p className="text-sm text-gray-600">Pares</p>
          <p className="text-xl font-bold">
            {matchedPairs}/{totalPairs}
          </p>
        </div>
        {!isIndividualMode && (
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Turno</p>
            <p className="text-xl font-bold">Equipo {currentTeamId + 1}</p>
          </div>
        )}
        {timerEnabled && (
          <div className="bg-gray-100 p-3 rounded-lg">
            <p className="text-sm text-gray-600">Tiempo</p>
            <p className="text-xl font-bold text-red-600">{formatTime(timeLeft)}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScorePanel;