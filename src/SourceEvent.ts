import { ContentEle, VideoEle } from "./Ele";

// 空格事件
export const spaceDownEnv = new KeyboardEvent("keydown", {
  keyCode: 32,
  bubbles: true,
});
export const spaceUpEnv = new KeyboardEvent("keyup", {
  keyCode: 32,
  bubbles: true,
});

// 鼠标移动事件，可以显示视频信息
export const moveMouseOnVideo = () => {
  const position = VideoEle.getBoundingClientRect();
  const x = Math.round(position.x + 2);
  const y = Math.round(position.y + 2);
  VideoEle.dispatchEvent(
    new MouseEvent("mousemove", {
      clientX: x,
      clientY: y,
      bubbles: true,
      cancelable: true,
      view: window,
      composed: true,
    })
  );
};

// 鼠标移出，detail隐藏
export const ContentMouseleave = new MouseEvent("mouseleave");
