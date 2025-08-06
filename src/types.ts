export interface Card {
  id: number;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
}

export interface Player {
  id: number;
  name: string;
  teamId: number;
}

export interface Team {
  id: number;
  name: string;
  score: number;
  players: Player[];
}

export interface Question {
  id: number;
  text: string;
}

export interface GameSettings {
  gameMode: 'individual' | 'team';
  playerCount: number;
  teamCount: number;
  difficulty: 'easy' | 'medium' | 'hard';
  timerEnabled: boolean;
  timerDuration: number;
}

export interface GameState {
  cards: Card[];
  teams: Team[];
  players: Player[];
  questions: Question[];
  currentTeamId: number;
  attempts: number;
  matchedPairs: number;
  settings: GameSettings;
  isGameStarted: boolean;
  isGameOver: boolean;
  currentQuestion: Question | null;
  showQuestion: boolean;
}