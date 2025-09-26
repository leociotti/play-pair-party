import { GameSetup } from './GameSetup';
import { GameBoard } from './GameBoard';
import { GameStats } from './GameStats';
import { GameVictory } from './GameVictory';
import { Button } from '@/components/ui/button';
import { useGameLogic } from '@/hooks/useGameLogic';

export const MemoryGame = () => {
  const { gameState, startGame, resetGame, playAgain, handleCardClick } = useGameLogic();

  if (!gameState) {
    return <GameSetup onStartGame={startGame} />;
  }

  if (gameState.isGameComplete) {
    return (
      <GameVictory
        gameState={gameState}
        onPlayAgain={playAgain}
        onBackToMenu={resetGame}
      />
    );
  }

  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold rainbow-text">
            🧠 Jogo da Memória
          </h1>
          <Button
            onClick={resetGame}
            variant="outline"
            className="hover:bg-game-danger/20 border-game-danger/50"
          >
            🏠 Sair do Jogo
          </Button>
        </div>

        {/* Estatísticas */}
        <GameStats gameState={gameState} />

        {/* Tabuleiro */}
        <GameBoard gameState={gameState} onCardClick={handleCardClick} />

        {/* Instrução para modo multiplayer */}
        {gameState.gameMode === 'multiplayer' && (
          <div className="text-center mt-6">
            <p className="text-game-text-dark/70">
              🎯 Encontre os pares para ganhar pontos! Acerte para continuar jogando.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};