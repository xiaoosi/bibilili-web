import {
  appLazy,
  bilibiliHeaderLazy,
  commentLazy,
  descLazy,
  getEle,
  tagLazy,
  videoboxLazy,
  videoboxReportLazy,
} from "../Ele";

export function setStyles(ele: any, styles: Record<string, string>) {
  Object.keys(styles).forEach((k) => {
    ele?.style?.setProperty(k, styles[k]);
  });
}
export function addStyles(style: string) {
  const styleForBody = document.createElement("style");
  styleForBody.textContent = style;
  document.head.appendChild(styleForBody);
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
}
#comment{
  margin: 0 !important;
  padding: 10px;
  height: 100vh;
  bottom: 0;
}
.comment{
  height: 100% !important;
}
.bili-comment{
  height: 100% !important;
}
.comment-container{
  height: 100% !important;
  overflow-y: scroll;
}
.comment-container .reply-header{
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 110;
}
.comment-container .main-reply-box{
  position: fixed;
    background-color: white;
    bottom: 20px;
    right: 0;
    z-index: 110;
    padding: 10px;
}
`;
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
    bottom: "0",
    "z-index": "1001",
  });

  // 请求全屏
  //   window.addEventListener("pointerdown", (e) => {
  //     if (!document.fullscreenElement) {
  //       document.documentElement.requestFullscreen();
  //     }
  //   });
  // 右侧显示弹幕
  const resizeComment = () => {
    const { width, height } = getEle().BiliPlayerEle.getBoundingClientRect();
    const commentEle = commentLazy();
    setStyles(commentEle, {
      width: `calc(100vw - ${width}px)`,
      position: "fixed",
      left: width + "px",
      top: "0",
    });
    setStyles(document.querySelector(".main-reply-box"), {
      width: `calc(100vw - ${width}px)`,
    });
    setStyles(document.querySelector(".video-container-v1"), {
      top: `${height}px`,
      height: `calc(100vh - ${height}px)`,
    });
  };
  window.addEventListener("resize", resizeComment);
  const videoPositon = getEle().BiliPlayerEle.getBoundingClientRect();
  addStyles(`.main-reply-box{
    width: calc(100vw - ${videoPositon.width}px);
  }
  .video-container-v1{
    position: fixed !important;
    top: ${videoPositon.height}px;
    height: calc(100vh - ${videoPositon.height}px);
  }
  `);
  // const reportPositon = videoboxReportLazy()?.getBoundingClientRect();

  resizeComment();
}
