declare global {
  interface Window {
    player: {
      play: () => void;
      pause: () => void;
    };
  }
}
export {}
