import React from 'react';
import { GameSettings } from '../types';

interface SettingsPanelProps {
  settings: GameSettings;
  onSettingsChange: (settings: GameSettings) => void;
  onStartGame: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  onSettingsChange,
  onStartGame,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { name, value, type } = e.target;

    let finalValue: string | number | boolean;

    if (type === 'checkbox') {
      finalValue = (e.target as HTMLInputElement).checked;
    } else if (type === 'number') {
      finalValue = parseInt(value, 10) || 0;
    } else {
      finalValue = value;
    }

    onSettingsChange({
      ...settings,
      [name]: finalValue,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 animate-scale-in">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Ajustes del Juego</h2>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Modo de Juego</label>
            <select
              name="gameMode"
              value={settings.gameMode}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="individual">Individual</option>
              <option value="team">Equipos</option>
            </select>
          </div>

          {settings.gameMode === 'team' && (
            <>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Número de Jugadores</label>
                <input
                  type="number"
                  name="playerCount"
                  value={settings.playerCount}
                  onChange={handleChange}
                  min="2"
                  max="20"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Número de Equipos</label>
                <input
                  type="number"
                  name="teamCount"
                  value={settings.teamCount}
                  onChange={handleChange}
                  min="2"
                  max="5"
                  className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </>
          )}
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Dificultad</label>
            <select
              name="difficulty"
              value={settings.difficulty}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="easy">Fácil</option>
              <option value="medium">Medio</option>
              <option value="hard">Difícil</option>
            </select>
          </div>
          
          <div className="flex items-center">
            <input
              type="checkbox"
              id="timerEnabled"
              name="timerEnabled"
              checked={settings.timerEnabled}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <label htmlFor="timerEnabled" className="ml-2 block text-sm text-gray-700">
              Habilitar temporizador
            </label>
          </div>
          
          {settings.timerEnabled && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Duración (segundos)</label>
              <input
                type="number"
                name="timerDuration"
                value={settings.timerDuration}
                onChange={handleChange}
                min="30"
                max="300"
                step="10"
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
          >
            Cancelar
          </button>
          <button
            onClick={onStartGame}
            className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            Iniciar Juego
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;