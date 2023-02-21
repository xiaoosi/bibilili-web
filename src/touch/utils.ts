import { ContentEle } from "./Ele";

export function isPlay() {
  return !ContentEle.classList.contains("bpx-state-paused");
}
export function isShowDetail() {
  return !ContentEle.classList.contains("bpx-state-no-cursor");
}
export function log(str: string) {
  console.log("bibilili-web: ", str);
}

export function isInVideoPage() {
  return window.location.href.includes("www.bilibili.com/video/");
}
