import { ContentEle, VideoAreaEle } from "./Ele";
import {
  keyDDownEnv,
  keyDUpEnv,
  keyFDownEnv,
  keyFUpEnv,
  leaveMouseFromVidee,
  moveMouseOnVideo,
  spaceDownEnv,
  spaceUpEnv,
} from "./SourceEvent";

// 播放
export function play() {
  // if (isPlay()) return;
  // 获取到空格按钮绑定的播放事件
  document.dispatchEvent(spaceDownEnv);
  document.dispatchEvent(spaceUpEnv);
}

// 暂停
export function pause() {
  // if (!isPlay()) return;
  // 获取到空格按钮绑定的播放事件
  document.dispatchEvent(spaceDownEnv);
  document.dispatchEvent(spaceUpEnv);
}

// 显示状态
export function showDetailMoment() {
  moveMouseOnVideo();
}
// 隐藏状态
export function hideDetail() {
  leaveMouseFromVidee();
}

export function showHideBullet() {
  document.dispatchEvent(keyDDownEnv);
  document.dispatchEvent(keyDUpEnv);
}

export function fullScreen() {
  document.dispatchEvent(keyFDownEnv);
  document.dispatchEvent(keyFUpEnv);
}
