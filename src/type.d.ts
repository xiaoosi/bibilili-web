declare global {
  interface Window {
    player: {
      play: () => void;
      pause: () => void;
      getDuration: () => number;
      getCurrentTime: () => number;
      setVolume: (v: number) => void;
      getVolume: () => number;
      reload: (option: { bvid: string; p?: number }) => any;
    };
    SRCWindowName: string;
  }
}
export {};
