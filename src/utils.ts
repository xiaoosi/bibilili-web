import { ContentEle } from "./Ele";

export function isPlay() {
  return !ContentEle.classList.contains("bpx-state-paused");
}
export function isShowDetail() {
  return !ContentEle.classList.contains("bpx-state-no-cursor");
}