import { injectAddBTN } from "./jump/back-btn";
import { intercept, listen } from "./jump/index";
import { registerTouchEnv } from "./touch/index";
import { isInVideoPage, log } from "./touch/utils";
log("load script~");

if (isInVideoPage()) {
  // 视频播放页加载触屏优化
  registerTouchEnv();
  listen();
  injectAddBTN();
} else {
  // 其他页劫持页面跳转链接
  intercept();
}

log("已装载");
