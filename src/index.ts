import { fullScreen, hideDetail, pause, play, showDetailMoment, showHideBullet } from "./Actions";
import { VideoEle } from "./Ele";
import { isPlay, isShowDetail, log } from "./utils";

function registerEvent() {
  log("load script~");
  /*  点击出现进度条
   *  双击暂停
   *  双指点击显示弹幕
   *  三指单机全屏/退出全屏
   *  上下滑动调节音量
   *  左右滑动调节进度
   *  长按快进
   *
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

    const touchE: TouchEvent = e as any;
    if (touchE.targetTouches.length === 1) {
      // 单指
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
    } else if (touchE.targetTouches.length === 2) {
      // 双指
      showHideBullet();
    } else if (touchE.targetTouches.length === 3) {
      // 三指
      fullScreen();
    }
  });
  VideoEle.addEventListener("touchend", (e) => {
    // 屏蔽click事件
    e.preventDefault();
    const touchE: TouchEvent = e as any;
    if (touchE.targetTouches.length === 1) {
      // 单指
      isTouch = false;
    } else if (touchE.targetTouches.length === 2) {
      // 双指
    } else if (touchE.targetTouches.length === 3) {
      // 三指
    }
  });
  VideoEle.addEventListener("touchcancel", (e) => {
    // 屏蔽click事件
    e.preventDefault();
    const touchE: TouchEvent = e as any;
    if (touchE.targetTouches.length === 1) {
      // 单指
      isTouch = false;
    } else if (touchE.targetTouches.length === 2) {
      // 双指
    } else if (touchE.targetTouches.length === 3) {
      // 三指
    }
  });
  log("已装载");
}
registerEvent();
