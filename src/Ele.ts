export const BiliPlayerEle = getElementSafe(document, "#bilibili-player");
export const ContentEle = getElementSafe(
  BiliPlayerEle,
  ".bpx-player-container"
);
export const VideoAreaEle = getElementSafe(
  ContentEle,
  ".bpx-player-video-area"
);
export const VideoEle = getElementSafe(VideoAreaEle, [
  ".bpx-player-primary-area video",
  ".bpx-player-primary-area bwp-video",
]);

export const ProgressEle = getElementSafe(
  BiliPlayerEle,
  ".bpx-player-progress-wrap"
);

function getElementSafe(parent: Element | Document, query: string | string[]) {
  let queryList: string[] = [];
  if (typeof query === "string") {
    queryList = [query];
  } else {
    queryList = query;
  }
  for (const q of queryList) {
    const out = parent.querySelector(q);
    if (out) return out;
  }
  throw new Error("get element error: " + JSON.stringify(queryList));
}
