import { GameCard } from './GameCard';
import { Card, GameState } from '@/types/game';
import { gridSizes } from '@/data/themes';
import { cn } from '@/lib/utils';

interface GameBoardProps {
  gameState: GameState;
  onCardClick: (card: Card) => void;
}

export const GameBoard = ({ gameState, onCardClick }: GameBoardProps) => {
  const { rows, cols } = gridSizes[gameState.gridSize];
  const isCardSelectionDisabled = gameState.selectedCards.length >= 2;

  return (
    <div className="flex flex-col items-center space-y-6 p-4">
      {/* Grid de cartas */}
      <div 
        className={cn(
          "grid gap-3 max-w-4xl w-full",
          `grid-cols-${cols} grid-rows-${rows}`,
        )}
        style={{
          gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`
        }}
      >
        {gameState.cards.map((card) => (
          <GameCard
            key={card.id}
            card={card}
            onClick={onCardClick}
            disabled={isCardSelectionDisabled}
          />
        ))}
      </div>
    </div>
  );
};