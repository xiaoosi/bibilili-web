(function () {
  'use strict';

  const BiliPlayerEle = getElementSafe(document, "#bilibili-player");
  const ContentEle = getElementSafe(BiliPlayerEle, ".bpx-player-container");
  const VideoAreaEle = getElementSafe(ContentEle, ".bpx-player-video-area");
  const VideoEle = getElementSafe(VideoAreaEle, ".bpx-player-primary-area video");
  function getElementSafe(parent, query) {
      const out = parent.querySelector(query);
      if (!out) {
          throw new Error("test");
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
  const ContentMouseleave = new MouseEvent("mouseleave");

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
      VideoAreaEle.dispatchEvent(ContentMouseleave);
  }

  function isPlay() {
      return !ContentEle.classList.contains("bpx-state-paused");
  }
  function isShowDetail() {
      return !ContentEle.classList.contains("bpx-state-no-cursor");
  }

  function registerEvent() {
      // 是否有前一次点击
      let hasPreTouch = false;
      VideoEle.addEventListener("touchstart", (e) => {
          // 屏蔽click事件
          e.preventDefault();
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
      });
      VideoEle.addEventListener("touchend", (e) => {
          // 屏蔽click事件
          e.preventDefault();
      });
      VideoEle.addEventListener("touchcancel", (e) => {
          // 屏蔽click事件
          e.preventDefault();
      });
  }
  registerEvent();

})();
