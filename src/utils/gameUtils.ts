import { Card, Player, Team, GameSettings, GameState } from '../types';
import { getRandomEmojis } from '../data/emojis';
import { icebreakers } from '../data/questions';

// Function to initialize cards
export const initializeCards = (pairCount = 6): Card[] => {
  const selectedEmojis = getRandomEmojis(pairCount);
  
  // Create pairs of cards
  const cards: Card[] = [];
  selectedEmojis.forEach((emoji, index) => {
    // Create two cards with the same emoji (a pair)
    cards.push({
      id: index * 2,
      emoji,
      isFlipped: false,
      isMatched: false
    });
    
    cards.push({
      id: index * 2 + 1,
      emoji,
      isFlipped: false,
      isMatched: false
    });
  });
  
  // Shuffle the cards
  return shuffleCards(cards);
};

// Function to shuffle cards
export const shuffleCards = (cards: Card[]): Card[] => {
  const shuffled = [...cards];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

// Function to create teams
export const createTeams = (
  settings: GameSettings
): { teams: Team[]; players: Player[] } => {
  const teams: Team[] = [];
  const players: Player[] = [];
  
  if (settings.gameMode === 'individual') {
    // For individual mode, create a single "player" team
    teams.push({
      id: 0,
      name: 'Jugador',
      score: 0,
      players: []
    });
    
    players.push({
      id: 0,
      name: 'Jugador 1',
      teamId: 0
    });
  } else {
    // Create teams for team mode
    for (let i = 0; i < settings.teamCount; i++) {
      teams.push({
        id: i,
        name: `Equipo ${i + 1}`,
        score: 0,
        players: []
      });
    }
    
    // Create players and assign to teams
    for (let i = 0; i < settings.playerCount; i++) {
      const teamId = i % settings.teamCount;
      const player: Player = {
        id: i,
        name: `Jugador ${i + 1}`,
        teamId
      };
      players.push(player);
      teams[teamId].players.push(player);
    }
  }
  
  return { teams, players };
};

// Function to get initial game state
export const getInitialGameState = (settings: GameSettings): GameState => {
  const { teams, players } = createTeams(settings);
  
  return {
    cards: initializeCards(),
    teams,
    players,
    questions: [...icebreakers],
    currentTeamId: 0,
    attempts: 0,
    matchedPairs: 0,
    settings,
    isGameStarted: false,
    isGameOver: false,
    currentQuestion: null,
    showQuestion: false
  };
};

// Default game settings
export const defaultGameSettings: GameSettings = {
  gameMode: 'team',
  playerCount: 10,
  teamCount: 2,
  difficulty: 'medium',
  timerEnabled: false,
  timerDuration: 60
};