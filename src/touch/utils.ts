import { getEle } from "../Ele";

export function isPlay() {
  return !getEle().ContentEle.classList.contains("bpx-state-paused");
}
export function isShowDetail() {
  return !getEle().ContentEle.classList.contains("bpx-state-no-cursor");
}
export function log(str: string) {
  console.log(
    "%cbibilili-web:",
    "color: #fff; border-radius: 5px; padding: 0 5px; background-color: #c0341d;",
    str
  );
}

export function isInVideoPage() {
  return window.location.href.includes("www.bilibili.com/video/");
}
