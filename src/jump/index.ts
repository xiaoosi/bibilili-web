// 优化页面跳转,实现单播放实例

import { log } from "../touch/utils";
import { BC, Channel, onMessage } from "./channel";

export function intercept() {
  // 劫持所有跳转到video页的链接

  let newW: Window | null = null;

  // 同步newW
  // setInterval(() => {
  //   BC.postMessage({
  //     newW
  //   });
  // }, 500);

  window.name = window.location.href;

  function openInOneTab(link: string) {
    if (newW && !newW.closed) {
      const bvid = link.split("/").filter((e) => e.startsWith("BV"))?.[0];
      // newW.name = Math.random() + "";
      new Channel(newW).sendMessage(`${bvid}-${window.name}`);
      // // newW.focus();
      window.open("", "aaaa");
      return;
    }
    if (window.location.host === "www.bilibili.com") {
      // 不跨源
      newW = window.open(new URL(link).pathname, "aaaa");
    } else {
      newW = window.open(link, "aaaa");
    }
    setTimeout(() => {
      // @ts-ignore
      newW.SRCWindowName = window.name;
    }, 1000);
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
    const [bvid, SRCWindowName] = msg.split("-");
    log("load bv: " + bvid);
    window.player.reload({ bvid: bvid });
    window.SRCWindowName = SRCWindowName;
  });
  BC.onmessage = (e) => {
    log("???");
    console.log(e);
  };
}
