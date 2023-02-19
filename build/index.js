(function () {
  'use strict';

  const BiliPlayerEle = getElementSafe(document, "#bilibili-player");
  const ContentEle = getElementSafe(BiliPlayerEle, ".bpx-player-container");
  const VideoAreaEle = getElementSafe(ContentEle, ".bpx-player-video-area");
  const VideoEle = getElementSafe(VideoAreaEle, ".bpx-player-primary-area video");
  function getElementSafe(parent, query) {
      const out = parent.querySelector(query);
      if (!out) {
          throw new Error("get element error: " + query);
      }
      return out;
  }

  // 空格事件
  const spaceDownEnv = new KeyboardEvent("keydown", {
      keyCode: 32,
      bubbles: true,
  });
  const spaceUpEnv = new KeyboardEvent("keyup", {
      keyCode: 32,
      bubbles: true,
  });
  const keyDDownEnv = new KeyboardEvent("keydown", {
      keyCode: 68,
      bubbles: true,
  });
  const keyDUpEnv = new KeyboardEvent("keyup", {
      keyCode: 68,
      bubbles: true,
  });
  const keyFDownEnv = new KeyboardEvent("keydown", {
      keyCode: 70,
      bubbles: true,
  });
  const keyFUpEnv = new KeyboardEvent("keyup", {
      keyCode: 70,
      bubbles: true,
  });
  // 鼠标移动事件，可以显示视频信息
  const moveMouseOnVideo = () => {
      const position = VideoEle.getBoundingClientRect();
      const x = Math.round(position.x + 2);
      const y = Math.round(position.y + 2);
      VideoEle.dispatchEvent(new MouseEvent("mousemove", {
          clientX: x,
          clientY: y,
          bubbles: true,
          cancelable: true,
          view: window,
          composed: true,
      }));
  };
  // 鼠标移出，detail隐藏
  const leaveMouseFromVidee = () => {
      VideoAreaEle.dispatchEvent(new MouseEvent("mouseleave"));
  };

  // 播放
  function play() {
      // if (isPlay()) return;
      // 获取到空格按钮绑定的播放事件
      document.dispatchEvent(spaceDownEnv);
      document.dispatchEvent(spaceUpEnv);
  }
  // 暂停
  function pause() {
      // if (!isPlay()) return;
      // 获取到空格按钮绑定的播放事件
      document.dispatchEvent(spaceDownEnv);
      document.dispatchEvent(spaceUpEnv);
  }
  // 显示状态
  function showDetailMoment() {
      moveMouseOnVideo();
  }
  // 隐藏状态
  function hideDetail() {
      leaveMouseFromVidee();
  }
  function showHideBullet() {
      document.dispatchEvent(keyDDownEnv);
      document.dispatchEvent(keyDUpEnv);
  }
  function fullScreen() {
      document.dispatchEvent(keyFDownEnv);
      document.dispatchEvent(keyFUpEnv);
  }

  function isPlay() {
      return !ContentEle.classList.contains("bpx-state-paused");
  }
  function isShowDetail() {
      return !ContentEle.classList.contains("bpx-state-no-cursor");
  }
  function log(str) {
      console.log("bibilili-web: ", str);
  }

  function registerEvent() {
      log("load script~");
      // 是否有前一次点击
      let hasPreTouch = false;
      VideoEle.addEventListener("touchstart", (e) => {
          // 屏蔽click事件
          e.preventDefault();
          const touchE = e;
          if (touchE.targetTouches.length === 1) {
              if (hasPreTouch) {
                  // 双击
                  hasPreTouch = false;
                  isPlay() ? pause() : play();
                  return;
              }
              // 单击
              hasPreTouch = true;
              setTimeout(() => {
                  if (hasPreTouch) {
                      hasPreTouch = false;
                      // 显示/隐藏详情
                      isShowDetail() ? hideDetail() : showDetailMoment();
                  }
              }, 200);
          }
          else if (touchE.targetTouches.length === 2) {
              // 双指
              showHideBullet();
          }
          else if (touchE.targetTouches.length === 3) {
              // 三指
              fullScreen();
          }
      });
      VideoEle.addEventListener("touchend", (e) => {
          // 屏蔽click事件
          e.preventDefault();
          const touchE = e;
          if (touchE.targetTouches.length === 1) ;
          else if (touchE.targetTouches.length === 2) ;
          else if (touchE.targetTouches.length === 3) ;
      });
      VideoEle.addEventListener("touchcancel", (e) => {
          // 屏蔽click事件
          e.preventDefault();
          const touchE = e;
          if (touchE.targetTouches.length === 1) ;
          else if (touchE.targetTouches.length === 2) ;
          else if (touchE.targetTouches.length === 3) ;
      });
      log("已装载");
  }
  registerEvent();

})();
