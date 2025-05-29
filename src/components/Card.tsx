import React from 'react';
import { Card as CardType } from '../types';

interface CardProps {
  card: CardType;
  onClick: (card: CardType) => void;
  disabled: boolean;
}

const Card: React.FC<CardProps> = ({ card, onClick, disabled }) => {
  const handleClick = () => {
    if (!disabled && !card.isFlipped && !card.isMatched) {
      onClick(card);
    }
  };

  return (
    <div
      className={`relative w-24 h-24 md:w-32 md:h-32 cursor-pointer transform transition-transform duration-300 ${
        !disabled && !card.isFlipped && !card.isMatched ? 'hover:scale-105' : ''
      }`}
      onClick={handleClick}
    >
      <div
        className={`w-full h-full rounded-lg transform transition-all duration-500 preserve-3d ${
          card.isFlipped || card.isMatched ? 'rotate-y-180' : ''
        }`}
      >
        {/* Card Front (Back face) */}
        <div
          className={`absolute w-full h-full rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white backface-hidden shadow-md
                    ${card.isMatched ? 'bg-green-500' : ''}`}
        >
          <div className="text-2xl font-bold">?</div>
        </div>

        {/* Card Back (Front face with emoji) */}
        <div
          className="absolute w-full h-full rounded-lg bg-white flex items-center justify-center rotate-y-180 backface-hidden shadow-md"
        >
          <div className="text-5xl">{card.emoji}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;