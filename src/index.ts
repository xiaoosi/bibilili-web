import {
  fullScreen,
  hideDetail,
  pause,
  play,
  showDetailMoment,
  showHideBullet,
} from "./Actions";
import { VideoEle } from "./Ele";
import { registerEvent } from "./EventBus";
import { isPlay, isShowDetail, log } from "./utils";
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
registerEvent(VideoEle, {
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
    fullScreen;
  },
});

log("已装载");
