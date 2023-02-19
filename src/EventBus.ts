export interface OnEventMap {
  onTap1?: () => any;
  onDoubleTap1?: () => any;
  onTap2?: () => any;
  onDoubleTap2?: () => any;
}

// 触发事件
export function registerEvent(target: Element, em: OnEventMap) {
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

export {};
