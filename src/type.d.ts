declare global {
  interface Window {
    player: {
      play: () => void;
      pause: () => void;
      getDuration: () => number;
      getCurrentTime: () => number;
      setVolume: (v: number) => void;
      getVolume: () => number;

    };
  }
}
export {};
