export const BiliPlayerEle = getElementSafe(document, "#bilibili-player");
export const ContentEle = getElementSafe(
  BiliPlayerEle,
  ".bpx-player-container"
);
export const VideoAreaEle = getElementSafe(
  ContentEle,
  ".bpx-player-video-area"
);
export const VideoEle = getElementSafe(
  VideoAreaEle,
  ".bpx-player-primary-area video"
);
function getElementSafe(parent: Element | Document, query: string) {
  const out = parent.querySelector(query);
  if (!out) {
    throw new Error("get element error: " + query);
  }
  return out;
}
