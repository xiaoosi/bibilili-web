import { registerTouchEnv } from "./touch/index";
import { isInVideoPage, log } from "./touch/utils";
log("load script~");

if (isInVideoPage()) {
  // 视频播放页加载触屏优化
  registerTouchEnv();
}else{
  // 其他页劫持页面跳转链接
}

log("已装载");
