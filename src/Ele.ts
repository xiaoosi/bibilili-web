export function getEle() {
  const BiliPlayerEle = getElementSafe(document, "#bilibili-player");
  const ContentEle = getElementSafe(BiliPlayerEle, ".bpx-player-container");
  const VideoAreaEle = getElementSafe(ContentEle, ".bpx-player-video-area");
  const VideoEle = getElementSafe(VideoAreaEle, [
    ".bpx-player-primary-area video",
    ".bpx-player-primary-area bwp-video",
  ]);
  return {
    BiliPlayerEle,
    ContentEle,
    VideoAreaEle,
    VideoEle,
  };
}

export const ProgressEleLazy = () =>
  getElementSafe(getEle().BiliPlayerEle, ".bpx-player-progress-wrap");

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

export const baseVideoSectionsV1Lazy = () =>
  getElementSafe(document, ".base-video-sections-v1");

export const videoboxReportLazy = () =>
  getElementSafe(document, ".viewbox_report");

export const descLazy = () => getElementSafe(document, "#v_desc");
export const tagLazy = () => getElementSafe(document, "#v_tag");
export const commentLazy = () => getElementSafe(document, "#comment");

export const videoboxLazy = () => getElementSafe(document, ".player-wrap");
export const bilibiliHeaderLazy = ()=>getElementSafe(document, "#biliMainHeader")

export const appLazy = ()=>getElementSafe(document, "#app");