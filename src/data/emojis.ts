export const emojis = [
  '😀', '😍', '🚀', '🌈', '🎮', '🎯', 
  '🎸', '🎭', '🏆', '🍕', '🌺', '🐶', 
  '🦄', '🏄', '🎨', '🧩', '🤖', '🌟'
];

// Function to get a random subset of emojis
export const getRandomEmojis = (count: number): string[] => {
  // Shuffle the array using Fisher-Yates algorithm
  const shuffled = [...emojis];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // Return the first 'count' emojis
  return shuffled.slice(0, count);
};