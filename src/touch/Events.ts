import { ProgressEleLazy } from "../Ele";
import { ArrowRightDown, ArrowRightUp } from "./SourceEvent";

export interface OnEventMap {
  onTap1?: () => any;
  onDoubleTap1?: () => any;
  onTap2?: () => any;
  onDoubleTap2?: () => any;
}

// 触发事件
export function registerTapEvent(target: Element, em: OnEventMap) {
  enum stateMap {
    none,
    ready, // 准备态
    Tap1, // 单指单机
    DoubleTap1, // 单指双击
    Tap2,
    Tap2Temp,
    DoubleTap2,
  }

  let state = stateMap.none;
  let noneSt = 0;
  let doubeTap2St = 0;
  target.addEventListener("touchstart", (e) => {
    // 屏蔽click事件
    e.preventDefault();
    const touchE: TouchEvent = e as any;

    if (state === stateMap.none) {
      state = stateMap.ready;
      noneSt = setTimeout(() => {
        state = stateMap.Tap1;
        // 触发单击事件
        em.onTap1?.();
        state = stateMap.none;
      }, 200);
    } else if (state === stateMap.ready) {
      clearTimeout(noneSt);
      if (touchE.targetTouches.length === 1) {
        state = stateMap.DoubleTap1;
        // 触发单指双击事件
        em.onDoubleTap1?.();
        state = stateMap.none;
      } else if (touchE.targetTouches.length === 2) {
        state = stateMap.Tap2Temp;
        doubeTap2St = setTimeout(() => {
          state = stateMap.Tap2;
          // 触发双指单击事件
          em.onTap2?.();
          state = stateMap.none;
        }, 200);
      }
    } else if (state === stateMap.Tap2Temp) {
      if (touchE.targetTouches.length === 2) {
        clearTimeout(doubeTap2St);
        state = stateMap.DoubleTap2;
        // 触发双指双击击事件
        em.onDoubleTap2?.();
        state = stateMap.none;
      }
    } else {
      state = stateMap.none;
    }
  });
  target.addEventListener("touchend", (e) => {
    // 屏蔽click事件
    e.preventDefault();
    const touchE: TouchEvent = e as any;
  });
  target.addEventListener("touchcancel", (e) => {
    // 屏蔽click事件
    e.preventDefault();
    const touchE: TouchEvent = e as any;
  });
}

export function registerTouchMoveEvent(target: Element) {
  let state: "none" | "Xdrag" | "Ydrag" | "situ" = "none";
  const startTouchPosition = {
    x: 0,
    y: 0,
  };
  let startX = 0;
  let startY = 0;

  let targetX = 0;
  let targetY = 0;
  let lastY = 0;

  function startProcessChange() {
    const progressPosition = ProgressEleLazy().getBoundingClientRect();
    const cur = window.player.getCurrentTime();
    const dur = window.player.getDuration();
    startX = (cur / dur) * progressPosition.width + progressPosition.left;
    ProgressEleLazy().dispatchEvent(
      new MouseEvent("mouseenter", {
        clientX: Math.round(startX),
        clientY: Math.round(progressPosition.y),
      })
    );
    ProgressEleLazy().dispatchEvent(
      new MouseEvent("mousedown", {
        clientX: Math.round(startX),
        clientY: Math.round(progressPosition.y),
      })
    );
    ProgressEleLazy().dispatchEvent(
      new MouseEvent("mousemove", {
        clientX: Math.round(startX),
        clientY: Math.round(progressPosition.y),
        bubbles: true,
      })
    );
  }
  function duringProcessChange(xmove: number) {
    targetX = xmove * 1.5 + startX;
    const progressPosition = ProgressEleLazy().getBoundingClientRect();
    ProgressEleLazy().dispatchEvent(
      new MouseEvent("mousemove", {
        clientX: Math.round(targetX),
        clientY: Math.round(progressPosition.y),
        bubbles: true,
      })
    );
  }

  function endProcessChange() {
    const progressPosition = ProgressEleLazy().getBoundingClientRect();
    ProgressEleLazy().dispatchEvent(
      new MouseEvent("mouseup", {
        clientX: Math.round(targetX || startX),
        clientY: Math.round(progressPosition.y),
        bubbles: true,
      })
    );
  }

  function startFastFor() {
    document.dispatchEvent(ArrowRightDown);
  }
  function endFastFor() {
    document.dispatchEvent(ArrowRightUp);
  }

  let st = 0;
  const onTouchStart = (e: TouchEvent) => {
    state = "none";
    if (e.targetTouches.length !== 1) return;
    startTouchPosition.x = Math.round(e.targetTouches[0].clientX);
    startTouchPosition.y = Math.round(e.targetTouches[0].clientY);
    startX = 0;
    startY = 0;
    targetX = 0;
    targetY = 0;
    lastY = startTouchPosition.y;
    st = setTimeout(() => {
      if (state === "none") {
        state = "situ";
        startFastFor();
      }
    }, 500);
  };
  const onTouchMove = (e: TouchEvent) => {
    if (e.targetTouches.length !== 1) return;
    const curTouchPosition = {
      x: Math.round(e.targetTouches[0].clientX),
      y: Math.round(e.targetTouches[0].clientY),
    };
    const xmove = curTouchPosition.x - startTouchPosition.x;
    const ymove = curTouchPosition.y - startTouchPosition.y;

    if (state == "none") {
      if (Math.abs(xmove) > 20 && Math.abs(xmove) > Math.abs(ymove)) {
        state = "Xdrag";
        startProcessChange();
        return;
      }
      if (Math.abs(ymove) > 20 && Math.abs(ymove) > Math.abs(xmove)) {
        state = "Ydrag";
        return;
      }
      return;
    } else if (state === "Xdrag") {
      duringProcessChange(xmove);
    } else if (state === "Ydrag") {
      const v = window.player.getVolume();
      if (curTouchPosition.y - lastY < 0) {
        window.player.setVolume(v + 0.05);
      } else {
        window.player.setVolume(v - 0.05);
      }
    }
    lastY = curTouchPosition.y;
  };
  const onTouchEnd = (e: TouchEvent) => {
    if (e.targetTouches.length !== 0) return;
    if (state === "Xdrag") {
      endProcessChange();
    } else if (state == "Ydrag") {
    } else if (state == "situ") {
      endFastFor();
    }
    clearTimeout(st);
    state = "none";
  };

  target.addEventListener("touchstart", onTouchStart as any);
  target.addEventListener("touchmove", onTouchMove as any);
  target.addEventListener("touchend", onTouchEnd as any);
  target.addEventListener("touchcancel", onTouchEnd as any);
}
