import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { GameConfig, GameTheme, GridSize } from '@/types/game';
import { gameThemes, gridSizes } from '@/data/themes';

interface GameSetupProps {
  onStartGame: (config: GameConfig) => void;
}

export const GameSetup = ({ onStartGame }: GameSetupProps) => {
  const [gameMode, setGameMode] = useState<'single' | 'multiplayer'>('single');
  const [theme, setTheme] = useState<GameTheme>('animals');
  const [gridSize, setGridSize] = useState<GridSize>('4x4');
  const [playerNames, setPlayerNames] = useState(['Jogador 1', 'Jogador 2']);

  const handleStartGame = () => {
    const config: GameConfig = {
      theme,
      gridSize,
      gameMode,
      playerNames: gameMode === 'multiplayer' ? playerNames : undefined
    };
    onStartGame(config);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 bg-gradient-card shadow-card border-0">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold rainbow-text mb-2">
            🧠 Jogo da Memória
          </h1>
          <p className="text-game-text-dark/80">Configure seu jogo e divirta-se!</p>
        </div>

        {/* Modo de Jogo */}
        <div className="space-y-4 mb-6">
          <Label className="text-lg font-semibold text-game-text-dark">Modo de Jogo</Label>
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant={gameMode === 'single' ? 'default' : 'outline'}
              onClick={() => setGameMode('single')}
              className="h-12 text-sm font-medium bg-game-primary hover:bg-game-primary-dark"
            >
              🎯 1 Jogador
            </Button>
            <Button
              variant={gameMode === 'multiplayer' ? 'default' : 'outline'}
              onClick={() => setGameMode('multiplayer')}
              className="h-12 text-sm font-medium bg-game-secondary hover:bg-game-secondary/80"
            >
              👥 2 Jogadores
            </Button>
          </div>
        </div>

        {/* Nomes dos Jogadores (apenas para multiplayer) */}
        {gameMode === 'multiplayer' && (
          <div className="space-y-4 mb-6">
            <Label className="text-lg font-semibold text-game-text-dark">Nomes dos Jogadores</Label>
            <div className="space-y-3">
              <Input
                placeholder="Nome do Jogador 1"
                value={playerNames[0]}
                onChange={(e) => setPlayerNames([e.target.value, playerNames[1]])}
                className="h-12 bg-game-text-light border-game-primary/30"
              />
              <Input
                placeholder="Nome do Jogador 2"
                value={playerNames[1]}
                onChange={(e) => setPlayerNames([playerNames[0], e.target.value])}
                className="h-12 bg-game-text-light border-game-primary/30"
              />
            </div>
          </div>
        )}

        {/* Tema */}
        <div className="space-y-4 mb-6">
          <Label className="text-lg font-semibold text-game-text-dark">Tema</Label>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(gameThemes).map(([key, themeData]) => (
              <Button
                key={key}
                variant={theme === key ? 'default' : 'outline'}
                onClick={() => setTheme(key as GameTheme)}
                className={`h-12 text-sm font-medium ${
                  theme === key 
                    ? 'bg-game-accent hover:bg-game-accent/80' 
                    : 'hover:bg-game-accent/20'
                }`}
              >
                {themeData.emojis[0]} {themeData.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Tamanho do Grid */}
        <div className="space-y-4 mb-8">
          <Label className="text-lg font-semibold text-game-text-dark">Tamanho do Jogo</Label>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(gridSizes).map(([size, data]) => (
              <Button
                key={size}
                variant={gridSize === size ? 'default' : 'outline'}
                onClick={() => setGridSize(size as GridSize)}
                className={`h-12 text-sm font-medium ${
                  gridSize === size 
                    ? 'bg-game-pink hover:bg-game-pink/80' 
                    : 'hover:bg-game-pink/20'
                }`}
              >
                📱 {size}
                <br />
                <span className="text-xs opacity-75">({data.pairs} pares)</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Botão Iniciar */}
        <Button
          onClick={handleStartGame}
          className="w-full h-14 text-lg font-bold bg-gradient-primary hover:scale-105 transition-transform shadow-button"
        >
          🚀 Começar a Jogar!
        </Button>
      </Card>
    </div>
  );
};