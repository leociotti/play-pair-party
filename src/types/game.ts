export interface Card {
  id: string;
  emoji: string;
  isFlipped: boolean;
  isMatched: boolean;
  pairId: string;
}

export interface Player {
  id: string;
  name: string;
  score: number;
  isActive: boolean;
}

export interface GameState {
  cards: Card[];
  players: Player[];
  gameMode: 'single' | 'multiplayer';
  currentPlayer: number;
  moves: number;
  startTime: number;
  endTime: number | null;
  isGameComplete: boolean;
  selectedCards: Card[];
  theme: GameTheme;
  gridSize: GridSize;
}

export type GameTheme = 'animals' | 'fruits' | 'toys' | 'planets' | 'emojis';

export type GridSize = '3x4' | '4x4' | '4x5' | '6x6';

export interface GameConfig {
  theme: GameTheme;
  gridSize: GridSize;
  gameMode: 'single' | 'multiplayer';
  playerNames?: string[];
}

export interface GameStats {
  time: number;
  moves: number;
  score?: number;
}