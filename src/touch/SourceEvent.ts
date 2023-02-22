import { getEle } from "../Ele";

// 空格事件
export const spaceDownEnv = new KeyboardEvent("keydown", {
  keyCode: 32,
  bubbles: true,
});
export const spaceUpEnv = new KeyboardEvent("keyup", {
  keyCode: 32,
  bubbles: true,
});

export const keyDDownEnv = new KeyboardEvent("keydown", {
  keyCode: 68,
  bubbles: true,
});
export const keyDUpEnv = new KeyboardEvent("keyup", {
  keyCode: 68,
  bubbles: true,
});

export const keyFDownEnv = new KeyboardEvent("keydown", {
  keyCode: 70,
  bubbles: true,
});
export const keyFUpEnv = new KeyboardEvent("keyup", {
  keyCode: 70,
  bubbles: true,
});

export const ArrowRightDown = new KeyboardEvent("keydown", {
  keyCode: 39,
  bubbles: true,
});
export const ArrowRightUp = new KeyboardEvent("keyup", {
  keyCode: 39,
  bubbles: true,
});

// 鼠标移动事件，可以显示视频信息
export const moveMouseOnVideo = () => {
  const position = getEle().VideoEle.getBoundingClientRect();
  const x = Math.round(position.x + 2);
  const y = Math.round(position.y + 2);
  getEle().VideoEle.dispatchEvent(
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
export const leaveMouseFromVidee = () => {
  getEle().VideoAreaEle.dispatchEvent(new MouseEvent("mouseleave"));
};
