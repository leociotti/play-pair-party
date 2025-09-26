import { GameState } from '@/types/game';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface GameStatsProps {
  gameState: GameState;
}

export const GameStats = ({ gameState }: GameStatsProps) => {
  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const currentTime = gameState.endTime 
    ? gameState.endTime - gameState.startTime 
    : Date.now() - gameState.startTime;

  const matchedPairs = gameState.cards.filter(card => card.isMatched).length / 2;
  const totalPairs = gameState.cards.length / 2;

  if (gameState.gameMode === 'single') {
    return (
      <div className="flex justify-center space-x-4 mb-6">
        <Card className="px-4 py-2 bg-gradient-card shadow-card">
          <div className="text-center">
            <div className="text-2xl font-bold text-game-primary">
              ⏱️ {formatTime(currentTime)}
            </div>
            <div className="text-sm text-game-text-dark/70">Tempo</div>
          </div>
        </Card>
        
        <Card className="px-4 py-2 bg-gradient-card shadow-card">
          <div className="text-center">
            <div className="text-2xl font-bold text-game-secondary">
              🎯 {gameState.moves}
            </div>
            <div className="text-sm text-game-text-dark/70">Tentativas</div>
          </div>
        </Card>

        <Card className="px-4 py-2 bg-gradient-card shadow-card">
          <div className="text-center">
            <div className="text-2xl font-bold text-game-accent">
              🏆 {matchedPairs}/{totalPairs}
            </div>
            <div className="text-sm text-game-text-dark/70">Pares</div>
          </div>
        </Card>
      </div>
    );
  }

  // Modo multiplayer
  return (
    <div className="flex justify-center space-x-6 mb-6">
      {gameState.players.map((player, index) => (
        <Card 
          key={player.id} 
          className={`px-6 py-4 transition-all duration-300 ${
            player.isActive 
              ? 'bg-gradient-primary shadow-button scale-105 border-2 border-game-primary' 
              : 'bg-gradient-card shadow-card'
          }`}
        >
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <span className="text-lg">{index === 0 ? '👤' : '👥'}</span>
              <span className="font-bold text-game-text-dark">
                {player.name}
              </span>
              {player.isActive && (
                <Badge className="bg-game-accent text-game-text-dark animate-bounce">
                  Sua vez!
                </Badge>
              )}
            </div>
            <div className="text-3xl font-bold text-game-primary">
              🏆 {player.score}
            </div>
            <div className="text-sm text-game-text-dark/70">pontos</div>
          </div>
        </Card>
      ))}
      
      <Card className="px-4 py-2 bg-gradient-card shadow-card">
        <div className="text-center">
          <div className="text-2xl font-bold text-game-secondary">
            🎯 {gameState.moves}
          </div>
          <div className="text-sm text-game-text-dark/70">Tentativas</div>
        </div>
      </Card>
    </div>
  );
};