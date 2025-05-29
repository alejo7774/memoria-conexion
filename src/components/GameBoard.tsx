import React, { useState, useEffect } from 'react';
import { Card as CardType } from '../types';
import Card from './Card';

interface GameBoardProps {
  cards: CardType[];
  onCardClick: (card: CardType) => void;
  disableCards: boolean;
}

const GameBoard: React.FC<GameBoardProps> = ({ cards, onCardClick, disableCards }) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-4 md:gap-6 p-4 md:p-6 bg-white/30 backdrop-blur-md rounded-xl shadow-lg">
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