import { GameState } from '@/types/game';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useEffect, useState } from 'react';

interface GameVictoryProps {
  gameState: GameState;
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

export const GameVictory = ({ gameState, onPlayAgain, onBackToMenu }: GameVictoryProps) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getPerformanceLevel = (moves: number, time: number) => {
    const totalCards = gameState.cards.length;
    const perfectMoves = totalCards / 2;
    const efficiency = perfectMoves / moves;
    
    if (efficiency >= 0.8 && time < 60000) return { level: '🥇', text: 'PERFEITO!', color: 'text-yellow-500' };
    if (efficiency >= 0.6 && time < 120000) return { level: '🥈', text: 'EXCELENTE!', color: 'text-gray-400' };
    if (efficiency >= 0.4) return { level: '🥉', text: 'MUITO BOM!', color: 'text-orange-500' };
    return { level: '🏆', text: 'PARABÉNS!', color: 'text-game-primary' };
  };

  const renderSinglePlayerResults = () => {
    const totalTime = gameState.endTime! - gameState.startTime;
    const performance = getPerformanceLevel(gameState.moves, totalTime);

    return (
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <div className="text-6xl">{performance.level}</div>
          <h2 className={`text-3xl font-bold ${performance.color}`}>
            {performance.text}
          </h2>
          <p className="text-game-text-dark/80">Você completou o jogo!</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 bg-gradient-card">
            <div className="text-center">
              <div className="text-3xl font-bold text-game-primary">
                ⏱️ {formatTime(totalTime)}
              </div>
              <div className="text-sm text-game-text-dark/70">Tempo Total</div>
            </div>
          </Card>
          
          <Card className="p-4 bg-gradient-card">
            <div className="text-center">
              <div className="text-3xl font-bold text-game-secondary">
                🎯 {gameState.moves}
              </div>
              <div className="text-sm text-game-text-dark/70">Tentativas</div>
            </div>
          </Card>
        </div>

        <div className="space-y-2">
          <Badge className="text-lg px-4 py-2 bg-game-accent">
            ✨ Eficiência: {Math.round((gameState.cards.length / 2 / gameState.moves) * 100)}%
          </Badge>
        </div>
      </div>
    );
  };

  const renderMultiplayerResults = () => {
    const winner = gameState.players.reduce((prev, current) => 
      current.score > prev.score ? current : prev
    );
    
    const isATie = gameState.players.every(player => player.score === winner.score);

    return (
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <div className="text-6xl">
            {isATie ? '🤝' : '🏆'}
          </div>
          <h2 className="text-3xl font-bold text-game-primary">
            {isATie ? 'EMPATE!' : `${winner.name} VENCEU!`}
          </h2>
          <p className="text-game-text-dark/80">
            {isATie ? 'Que jogo incrível!' : 'Parabéns pelo ótimo jogo!'}
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-game-text-dark">Placar Final</h3>
          <div className="space-y-3">
            {gameState.players
              .sort((a, b) => b.score - a.score)
              .map((player, index) => (
                <Card 
                  key={player.id} 
                  className={`p-4 ${
                    index === 0 && !isATie 
                      ? 'bg-gradient-success border-game-success' 
                      : 'bg-gradient-card'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">
                        {index === 0 && !isATie ? '🥇' : index === 1 ? '🥈' : '👤'}
                      </span>
                      <span className="font-bold text-game-text-dark">
                        {player.name}
                      </span>
                    </div>
                    <div className="text-2xl font-bold text-game-primary">
                      {player.score} pontos
                    </div>
                  </div>
                </Card>
              ))}
          </div>
        </div>

        <Card className="p-4 bg-gradient-card">
          <div className="text-center">
            <div className="text-2xl font-bold text-game-secondary">
              🎯 {gameState.moves}
            </div>
            <div className="text-sm text-game-text-dark/70">Total de Tentativas</div>
          </div>
        </Card>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Confetti Animation */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="confetti-piece absolute w-3 h-3 rounded-full"
              style={{
                backgroundColor: `hsl(${Math.random() * 360}, 70%, 70%)`,
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      )}

      <Card className="w-full max-w-md p-8 bg-gradient-card shadow-card-hover border-0 bounce-in">
        {gameState.gameMode === 'single' 
          ? renderSinglePlayerResults() 
          : renderMultiplayerResults()
        }

        <div className="flex flex-col space-y-4 mt-8">
          <Button
            onClick={onPlayAgain}
            className="w-full h-12 text-lg font-bold bg-gradient-primary hover:scale-105 transition-transform shadow-button"
          >
            🎮 Jogar Novamente
          </Button>
          
          <Button
            onClick={onBackToMenu}
            variant="outline"
            className="w-full h-12 text-lg font-medium hover:bg-game-accent/20 border-game-accent"
          >
            🏠 Voltar ao Menu
          </Button>
        </div>
      </Card>
    </div>
  );
};