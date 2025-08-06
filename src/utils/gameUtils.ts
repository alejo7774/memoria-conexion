import { GameState, GameSettings, Card, Team, Player } from '../types';
import { icebreakers } from '../data/questions';

// Emojis para las cartas - necesitamos al menos 12 para el modo difícil
const EMOJIS = [
  '🚀', '💡', '🎯', '🎉', '🌟', '🤖', '🧠', '💻',
  '🔥', '🏆', '📈', '🤝', '🌍', '🎨', '🎵', '👨‍💻'
];

export const defaultGameSettings: GameSettings = {
  gameMode: 'individual',
  playerCount: 1,
  teamCount: 2,
  difficulty: 'easy',
  timerEnabled: false,
  timerDuration: 60,
};

const shuffleArray = <T>(array: T[]): T[] => {
  return array.sort(() => Math.random() - 0.5);
};

export const getInitialGameState = (settings: GameSettings): GameState => {
  const { difficulty, gameMode, playerCount, teamCount } = settings;

  let pairCount: number;
  switch (difficulty) {
    case 'medium':
      pairCount = 9; // 18 cartas (6x3)
      break;
    case 'hard':
      pairCount = 12; // 24 cartas (8x3)
      break;
    case 'easy':
    default:
      pairCount = 6; // 12 cartas (4x3)
      break;
  }

  const emojisForGame = EMOJIS.slice(0, pairCount);
  const cardPairs = [...emojisForGame, ...emojisForGame];
  const shuffledCards = shuffleArray(cardPairs);

  const cards: Card[] = shuffledCards.map((emoji, index) => ({
    id: index,
    emoji,
    isFlipped: false,
    isMatched: false,
  }));

  const players: Player[] = Array.from({ length: playerCount }, (_, i) => ({
    id: i,
    name: `Jugador ${i + 1}`,
    teamId: i % teamCount,
  }));

  const teams: Team[] =
    gameMode === 'team'
      ? Array.from({ length: teamCount }, (_, i) => ({
          id: i,
          name: `Equipo ${i + 1}`,
          score: 0,
          players: players.filter(p => p.teamId === i),
        }))
      : [
          {
            id: 0,
            name: 'Individual',
            score: 0,
            players: players,
          },
        ];

  return {
    cards,
    teams,
    players,
    questions: icebreakers,
    currentTeamId: 0,
    attempts: 0,
    matchedPairs: 0,
    settings,
    isGameStarted: false,
    isGameOver: false,
    currentQuestion: null,
    showQuestion: false,
  };
};
