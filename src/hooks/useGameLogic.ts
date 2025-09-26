import { useState, useCallback, useEffect } from 'react';
import { Card, GameState, GameConfig, Player } from '@/types/game';
import { gameThemes, gridSizes } from '@/data/themes';

const generateCards = (config: GameConfig): Card[] => {
  const { pairs } = gridSizes[config.gridSize];
  const theme = gameThemes[config.theme];
  const selectedEmojis = theme.emojis.slice(0, pairs);
  
  const cards: Card[] = [];
  
  selectedEmojis.forEach((emoji, index) => {
    const pairId = `pair-${index}`;
    
    // Primeira carta do par
    cards.push({
      id: `card-${index}-1`,
      emoji,
      isFlipped: false,
      isMatched: false,
      pairId
    });
    
    // Segunda carta do par
    cards.push({
      id: `card-${index}-2`,
      emoji,
      isFlipped: false,
      isMatched: false,
      pairId
    });
  });
  
  // Embaralhar as cartas
  return cards.sort(() => Math.random() - 0.5);
};

const generatePlayers = (config: GameConfig): Player[] => {
  if (config.gameMode === 'single') {
    return [
      {
        id: 'player-1',
        name: 'Jogador',
        score: 0,
        isActive: true
      }
    ];
  }
  
  return [
    {
      id: 'player-1',
      name: config.playerNames?.[0] || 'Jogador 1',
      score: 0,
      isActive: true
    },
    {
      id: 'player-2',
      name: config.playerNames?.[1] || 'Jogador 2',
      score: 0,
      isActive: false
    }
  ];
};

export const useGameLogic = () => {
  const [gameState, setGameState] = useState<GameState | null>(null);

  const startGame = useCallback((config: GameConfig) => {
    const cards = generateCards(config);
    const players = generatePlayers(config);
    
    setGameState({
      cards,
      players,
      gameMode: config.gameMode,
      currentPlayer: 0,
      moves: 0,
      startTime: Date.now(),
      endTime: null,
      isGameComplete: false,
      selectedCards: [],
      theme: config.theme,
      gridSize: config.gridSize
    });
  }, []);

  const resetGame = useCallback(() => {
    setGameState(null);
  }, []);

  const playAgain = useCallback(() => {
    if (!gameState) return;
    
    const config: GameConfig = {
      theme: gameState.theme,
      gridSize: gameState.gridSize,
      gameMode: gameState.gameMode,
      playerNames: gameState.players.map(p => p.name)
    };
    
    startGame(config);
  }, [gameState, startGame]);

  const handleCardClick = useCallback((clickedCard: Card) => {
    if (!gameState || gameState.isGameComplete) return;
    
    setGameState(prev => {
      if (!prev || prev.selectedCards.length >= 2) return prev;
      
      // Adicionar carta à seleção
      const newSelectedCards = [...prev.selectedCards, clickedCard];
      
      // Virar a carta
      const updatedCards = prev.cards.map(card =>
        card.id === clickedCard.id 
          ? { ...card, isFlipped: true }
          : card
      );
      
      return {
        ...prev,
        cards: updatedCards,
        selectedCards: newSelectedCards
      };
    });
  }, [gameState]);

  // Effect para processar pares
  useEffect(() => {
    if (!gameState || gameState.selectedCards.length !== 2) return;

    const [card1, card2] = gameState.selectedCards;
    const isMatch = card1.pairId === card2.pairId;

    const timer = setTimeout(() => {
      setGameState(prev => {
        if (!prev) return prev;

        let updatedCards = prev.cards.map(card => {
          if (card.id === card1.id || card.id === card2.id) {
            if (isMatch) {
              return { ...card, isMatched: true, isFlipped: true };
            } else {
              return { ...card, isFlipped: false };
            }
          }
          return card;
        });

        // Atualizar pontuação no modo multiplayer
        let updatedPlayers = [...prev.players];
        let nextPlayer = prev.currentPlayer;

        if (prev.gameMode === 'multiplayer') {
          if (isMatch) {
            // Jogador ganha ponto e continua jogando
            updatedPlayers[prev.currentPlayer].score += 1;
          } else {
            // Trocar de jogador
            nextPlayer = (prev.currentPlayer + 1) % prev.players.length;
            updatedPlayers = updatedPlayers.map((player, index) => ({
              ...player,
              isActive: index === nextPlayer
            }));
          }
        }

        // Verificar se o jogo terminou
        const allMatched = updatedCards.every(card => card.isMatched);
        const isGameComplete = allMatched;

        return {
          ...prev,
          cards: updatedCards,
          players: updatedPlayers,
          currentPlayer: nextPlayer,
          moves: prev.moves + 1,
          selectedCards: [],
          isGameComplete,
          endTime: isGameComplete ? Date.now() : null
        };
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [gameState?.selectedCards]);

  return {
    gameState,
    startGame,
    resetGame,
    playAgain,
    handleCardClick
  };
};