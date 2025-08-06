import React from 'react';
import { Card as CardType, GameSettings } from '../types';
import Card from './Card';

interface GameBoardProps {
  cards: CardType[];
  onCardClick: (card: CardType) => void;
  disableCards: boolean;
  difficulty: GameSettings['difficulty'];
}

const GameBoard: React.FC<GameBoardProps> = ({ cards, onCardClick, disableCards, difficulty }) => {
  const getGridConfig = () => {
    switch (difficulty) {
      case 'medium':
        // 6 columnas, ancho máximo ~768px
        return { cols: 'grid-cols-6', maxWidth: 'max-w-3xl' };
      case 'hard':
        // 8 columnas, ancho máximo ~1024px
        return { cols: 'grid-cols-8', maxWidth: 'max-w-5xl' };
      case 'easy':
      default:
        // 4 columnas, ancho máximo ~512px
        return { cols: 'grid-cols-4', maxWidth: 'max-w-lg' };
    }
  };

  const { cols, maxWidth } = getGridConfig();

  return (
    <div className={`grid w-full ${maxWidth} mx-auto ${cols} justify-center gap-2 p-2 md:gap-3`}>
      {cards.map((card) => (
        <Card
          key={card.id}
          card={card}
          onClick={onCardClick}
          disabled={disableCards}
        />
      ))}
    </div>
  );
};

export default GameBoard;
