import { Card as CardType } from '@/types/game';
import { cn } from '@/lib/utils';

interface GameCardProps {
  card: CardType;
  onClick: (card: CardType) => void;
  disabled: boolean;
}

export const GameCard = ({ card, onClick, disabled }: GameCardProps) => {
  const handleClick = () => {
    if (!disabled && !card.isFlipped && !card.isMatched) {
      onClick(card);
    }
  };

  return (
    <div
      className={cn(
        "relative w-full aspect-square cursor-pointer group",
        disabled && "cursor-not-allowed"
      )}
      onClick={handleClick}
    >
      <div
        className={cn(
          "absolute inset-0 transition-transform duration-500 preserve-3d",
          card.isFlipped || card.isMatched ? "rotate-y-180" : ""
        )}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Verso da carta */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full backface-hidden rounded-xl",
            "bg-game-card-back shadow-card hover:shadow-card-hover",
            "flex items-center justify-center text-4xl",
            "border-2 border-game-primary/20",
            "group-hover:scale-105 transition-all duration-300"
          )}
        >
          <span className="text-white/80 text-6xl">💭</span>
        </div>

        {/* Frente da carta */}
        <div
          className={cn(
            "absolute inset-0 w-full h-full backface-hidden rounded-xl rotate-y-180",
            "bg-gradient-card shadow-card border-2",
            "flex items-center justify-center text-6xl",
            card.isMatched 
              ? "border-game-success bg-gradient-success animate-pulse-success" 
              : "border-game-primary/30",
            "transition-all duration-300"
          )}
        >
          <span className="drop-shadow-sm">{card.emoji}</span>
        </div>
      </div>
    </div>
  );
};