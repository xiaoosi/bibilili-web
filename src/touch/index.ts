import {
  fullScreen,
  hideDetail,
  pause,
  play,
  showDetailMoment,
  showHideBullet,
} from "./Actions";
import { getEle } from "./Ele";
import { registerTapEvent, registerTouchMoveEvent } from "./Events";
import { isPlay, isShowDetail } from "./utils";

/*  点击出现进度条
 *  双击暂停
 *  双指单击显示弹幕
 *  双指双击全屏/退出全屏
 *  上下滑动调节音量
 *  左右滑动调节进度
 *  长按快进
 */

export function registerTouchEnv() {
  registerTapEvent(getEle().VideoEle, {
    onTap1() {
      isShowDetail() ? hideDetail() : showDetailMoment();
    },
    onDoubleTap1() {
      isPlay() ? pause() : play();
    },
    onTap2() {
      showHideBullet();
    },
    onDoubleTap2() {
      fullScreen();
    },
  });
  registerTouchMoveEvent(getEle().VideoEle);
}
