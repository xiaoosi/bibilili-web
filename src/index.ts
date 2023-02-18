import { hideDetail, pause, play, showDetailMoment } from "./Actions";
import { VideoEle } from "./Ele";
import { isPlay, isShowDetail } from "./utils";

function registerEvent() {
  /* 1. 点击出现进度条
   * 2. 双击暂停
   * 3. 上下滑动调节音量
   * 4. 左右滑动调节进度
   * 3. 长按快进
   */
  // 状态机
  // 一次点击 + 200ms内无点击事件 显示播放信息
  // 一次点击 + 一次点击 = 暂停、播放
  //
  // 是否处于touch状态
  let isTouch = false;
  // 是否有前一次点击
  let hasPreTouch = false;
  VideoEle.addEventListener("touchstart", (e) => {
    // 屏蔽click事件
    e.preventDefault();
    isTouch = true;
    if (hasPreTouch) {
      // 双击
      hasPreTouch = false;
      isPlay() ? pause() : play();
      return;
    }
    // 单击
    hasPreTouch = true;
    setTimeout(() => {
      if (hasPreTouch) {
        hasPreTouch = false;
        // 显示/隐藏详情
        isShowDetail() ? hideDetail() : showDetailMoment();
      }
    }, 200);
  });
  VideoEle.addEventListener("touchend", (e) => {
    // 屏蔽click事件
    e.preventDefault();
    isTouch = false;
  });
  VideoEle.addEventListener("touchcancel", (e) => {
    // 屏蔽click事件
    e.preventDefault();
    isTouch = false;
  });
}
registerEvent();
