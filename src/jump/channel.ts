export class Channel {
  window: Window;
  constructor(w: Window) {
    this.window = w;
  }
  sendMessage(msg: string) {
    this.window.location.hash = msg;
  }
}
export function onMessage(f: (msg: string) => any) {
  window.addEventListener("hashchange", (e) => {
    f(location.hash.slice(1));
  });
}

const BC_NAME = "bibilili-web";
export const BC = new BroadcastChannel(BC_NAME);
