// 优化页面跳转,实现单播放实例

import { log } from "../touch/utils";
import { Channel, onMessage } from "./channel";

export function intercept() {
  // 劫持所有跳转到video页的链接

  let newW: Window | null = null;

  function openInOneTab(link: string) {
    if (newW && !newW.closed) {
      const bvid = link.split("/").filter((e) => e.startsWith("BV"))?.[0];
      newW.name = Math.random() + "";
      new Channel(newW).sendMessage(
        JSON.stringify({
          bvid,
          WindowName: newW.name,
        })
      );
      newW.focus();
      return;
    }
    newW = window.open(link, "a");
  }

  const linkMapVisited = new Map<Element, boolean>();
  setInterval(() => {
    const linkList = document.querySelectorAll(`a[href*="bilibili.com/video"]`);
    linkList.forEach((l) => {
      if (!linkMapVisited.has(l)) {
        l.addEventListener(
          "click",
          (e) => {
            e.preventDefault();
            e.stopImmediatePropagation();
            const link = (l as any).href;
            openInOneTab(link);
          },
          true
        );
        linkMapVisited.set(l, true);
      }
    });
  }, 500);
}

export function listen() {
  onMessage((msg) => {
    const { bvid, WindowName } = JSON.parse(msg);
    log("load bv: " + bvid);
    window.player.reload({ bvid: bvid });
  });
}
