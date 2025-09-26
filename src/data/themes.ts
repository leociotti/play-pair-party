import { GameTheme } from '@/types/game';

export const gameThemes: Record<GameTheme, { name: string; emojis: string[]; color: string }> = {
  animals: {
    name: 'Animais',
    color: 'bg-game-secondary',
    emojis: [
      '🐶', '🐱', '🐭', '🐹', '🐰', '🦊', '🐻', '🐼',
      '🐨', '🐯', '🦁', '🐮', '🐷', '🐸', '🐵', '🐔',
      '🐧', '🐦', '🦋', '🐝', '🐞', '🦄', '🐌', '🐛'
    ]
  },
  fruits: {
    name: 'Frutas',
    color: 'bg-game-accent',
    emojis: [
      '🍎', '🍊', '🍋', '🍌', '🍉', '🍇', '🍓', '🫐',
      '🍈', '🍒', '🍑', '🥝', '🍍', '🥭', '🍯', '🥥',
      '🍅', '🥕', '🌽', '🥦', '🥒', '🥬', '🫒', '🍄'
    ]
  },
  toys: {
    name: 'Brinquedos',
    color: 'bg-game-pink',
    emojis: [
      '🧸', '🚗', '🚕', '🚙', '🚌', '🚎', '🏎️', '🚓',
      '🚑', '🚒', '🚐', '🛻', '🚚', '🚛', '🚜', '🏍️',
      '🛵', '🚲', '🛴', '🛹', '⚽', '🏀', '🏈', '⚾'
    ]
  },
  planets: {
    name: 'Planetas',
    color: 'bg-game-purple',
    emojis: [
      '🌍', '🌎', '🌏', '🌕', '🌖', '🌗', '🌘', '🌑',
      '🌒', '🌓', '🌔', '⭐', '🌟', '✨', '💫', '☄️',
      '🪐', '🌞', '🌛', '🌜', '🌚', '🌝', '🚀', '🛸'
    ]
  },
  emojis: {
    name: 'Emojis',
    color: 'bg-gradient-accent',
    emojis: [
      '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣',
      '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰',
      '😘', '😗', '😙', '😚', '😋', '😛', '😜', '🤪'
    ]
  }
};

export const gridSizes = {
  '3x4': { rows: 3, cols: 4, pairs: 6 },
  '4x4': { rows: 4, cols: 4, pairs: 8 },
  '4x5': { rows: 4, cols: 5, pairs: 10 },
  '6x6': { rows: 6, cols: 6, pairs: 18 }
};