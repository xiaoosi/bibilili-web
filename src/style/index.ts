import { appLazy, bilibiliHeaderLazy, getEle, videoboxLazy } from "../Ele";

export function setStyles(ele: any, styles: Record<string, string>) {
  Object.keys(styles).forEach((k) => {
    ele.style.setProperty(k, styles[k]);
  });
}

function hidden(query: string) {
  const e = document.querySelector(query);
  if (e) {
    setStyles(e, {
      display: "none",
      top: "100vh",
    });
  }
}

export function resetStyle() {
  // 隐藏顶导
  (bilibiliHeaderLazy() as HTMLElement).style.setProperty("display", "none");

  setStyles(appLazy(), {
    "z-index": "101",
    "margin-top": "100vh",
    position: "absolute",
  });
  const styleForBody = document.createElement("style");
  styleForBody.textContent = `body, html {
    width: 100%;
    height: 100%;
    overflow: hidden;
}`;
  document.head.appendChild(styleForBody);
  hidden(".float-nav-exp");
  hidden(".fixed-nav");

  // 添加白屏遮罩
  const background = document.createElement("div");
  setStyles(background, {
    width: "100vw",
    height: "100vw",
    "background-color": "#fff",
    position: "fixed",
    "z-index": "100",
    left: "0",
    top: "0",
  });
  document.body.appendChild(background);
  const videoboxEle = videoboxLazy() as HTMLElement;
  setStyles(videoboxEle, {
    position: "fixed",
    left: "0",
    top: "0",
    "z-index": "1001",
  });

  // 请求全屏
//   window.addEventListener("pointerdown", (e) => {
//     if (!document.fullscreenElement) {
//       document.documentElement.requestFullscreen();
//     }
//   });
}
