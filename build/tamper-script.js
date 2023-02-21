// ==UserScript==
// @name         bibilili-web
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       xiaoosi
// @match        *://*.bilibili.com/*
// @icon         <$ICON$>
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  function getEle() {
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
  const ProgressEleLazy = () => getElementSafe(getEle().BiliPlayerEle, ".bpx-player-progress-wrap");
  function getElementSafe(parent, query) {
      let queryList = [];
      if (typeof query === "string") {
          queryList = [query];
      }
      else {
          queryList = query;
      }
      for (const q of queryList) {
          const out = parent.querySelector(q);
          if (out)
              return out;
      }
      throw new Error("get element error: " + JSON.stringify(queryList));
  }

  function isPlay() {
      return !getEle().ContentEle.classList.contains("bpx-state-paused");
  }
  function isShowDetail() {
      return !getEle().ContentEle.classList.contains("bpx-state-no-cursor");
  }
  function log(str) {
      console.log("%cbibilili-web:", "color: #fff; border-radius: 5px; padding: 0 5px; background-color: #c0341d;", str);
  }
  function isInVideoPage() {
      return window.location.href.includes("www.bilibili.com/video/");
  }

  class Channel {
      constructor(w) {
          this.window = w;
      }
      sendMessage(msg) {
          this.window.location.hash = msg;
      }
  }
  function onMessage(f) {
      window.addEventListener("hashchange", (e) => {
          f(location.hash.slice(1));
      });
  }

  // 优化页面跳转,实现单播放实例
  function intercept() {
      // 劫持所有跳转到video页的链接
      let newW = null;
      function openInOneTab(link) {
          var _a;
          if (newW && !newW.closed) {
              const bvid = (_a = link.split("/").filter((e) => e.startsWith("BV"))) === null || _a === void 0 ? void 0 : _a[0];
              new Channel(newW).sendMessage(bvid);
              newW.focus();
              return;
          }
          newW = window.open(link, "a");
      }
      const linkMapVisited = new Map();
      setInterval(() => {
          const linkList = document.querySelectorAll(`a[href*="bilibili.com/video"]`);
          linkList.forEach((l) => {
              if (!linkMapVisited.has(l)) {
                  l.addEventListener("click", (e) => {
                      e.preventDefault();
                      e.stopImmediatePropagation();
                      const link = l.href;
                      openInOneTab(link);
                  }, true);
                  linkMapVisited.set(l, true);
              }
          });
      }, 500);
  }
  function listen() {
      onMessage((msg) => {
          log("load bv: " + msg);
          window.player.reload({ bvid: msg });
      });
  }

  // 空格事件
  new KeyboardEvent("keydown", {
      keyCode: 32,
      bubbles: true,
  });
  new KeyboardEvent("keyup", {
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
  const ArrowRightDown = new KeyboardEvent("keydown", {
      keyCode: 39,
      bubbles: true,
  });
  const ArrowRightUp = new KeyboardEvent("keyup", {
      keyCode: 39,
      bubbles: true,
  });
  // 鼠标移动事件，可以显示视频信息
  const moveMouseOnVideo = () => {
      const position = getEle().VideoEle.getBoundingClientRect();
      const x = Math.round(position.x + 2);
      const y = Math.round(position.y + 2);
      getEle().VideoEle.dispatchEvent(new MouseEvent("mousemove", {
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
      getEle().VideoAreaEle.dispatchEvent(new MouseEvent("mouseleave"));
  };

  // 播放
  function play() {
      // if (isPlay()) return;
      // 获取到空格按钮绑定的播放事件
      // document.dispatchEvent(spaceDownEnv);
      // document.dispatchEvent(spaceUpEnv);
      window.player.play();
  }
  // 暂停
  function pause() {
      // if (!isPlay()) return;
      // 获取到空格按钮绑定的播放事件
      // document.dispatchEvent(spaceDownEnv);
      // document.dispatchEvent(spaceUpEnv);
      window.player.pause();
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

  // 触发事件
  function registerTapEvent(target, em) {
      let stateMap;
      (function (stateMap) {
          stateMap[stateMap["none"] = 0] = "none";
          stateMap[stateMap["ready"] = 1] = "ready";
          stateMap[stateMap["Tap1"] = 2] = "Tap1";
          stateMap[stateMap["DoubleTap1"] = 3] = "DoubleTap1";
          stateMap[stateMap["Tap2"] = 4] = "Tap2";
          stateMap[stateMap["Tap2Temp"] = 5] = "Tap2Temp";
          stateMap[stateMap["DoubleTap2"] = 6] = "DoubleTap2";
      })(stateMap || (stateMap = {}));
      let state = stateMap.none;
      let noneSt = 0;
      let doubeTap2St = 0;
      target.addEventListener("touchstart", (e) => {
          var _a, _b;
          // 屏蔽click事件
          e.preventDefault();
          const touchE = e;
          if (state === stateMap.none) {
              state = stateMap.ready;
              noneSt = setTimeout(() => {
                  var _a;
                  state = stateMap.Tap1;
                  // 触发单击事件
                  (_a = em.onTap1) === null || _a === void 0 ? void 0 : _a.call(em);
                  state = stateMap.none;
              }, 200);
          }
          else if (state === stateMap.ready) {
              clearTimeout(noneSt);
              if (touchE.targetTouches.length === 1) {
                  state = stateMap.DoubleTap1;
                  // 触发单指双击事件
                  (_a = em.onDoubleTap1) === null || _a === void 0 ? void 0 : _a.call(em);
                  state = stateMap.none;
              }
              else if (touchE.targetTouches.length === 2) {
                  state = stateMap.Tap2Temp;
                  doubeTap2St = setTimeout(() => {
                      var _a;
                      state = stateMap.Tap2;
                      // 触发双指单击事件
                      (_a = em.onTap2) === null || _a === void 0 ? void 0 : _a.call(em);
                      state = stateMap.none;
                  }, 200);
              }
          }
          else if (state === stateMap.Tap2Temp) {
              if (touchE.targetTouches.length === 2) {
                  clearTimeout(doubeTap2St);
                  state = stateMap.DoubleTap2;
                  // 触发双指双击击事件
                  (_b = em.onDoubleTap2) === null || _b === void 0 ? void 0 : _b.call(em);
                  state = stateMap.none;
              }
          }
          else {
              state = stateMap.none;
          }
      });
      target.addEventListener("touchend", (e) => {
          // 屏蔽click事件
          e.preventDefault();
      });
      target.addEventListener("touchcancel", (e) => {
          // 屏蔽click事件
          e.preventDefault();
      });
  }
  function registerTouchMoveEvent(target) {
      let state = "none";
      const startTouchPosition = {
          x: 0,
          y: 0,
      };
      let startX = 0;
      let targetX = 0;
      let lastY = 0;
      function startProcessChange() {
          const progressPosition = ProgressEleLazy().getBoundingClientRect();
          const cur = window.player.getCurrentTime();
          const dur = window.player.getDuration();
          startX = (cur / dur) * progressPosition.width + progressPosition.left;
          ProgressEleLazy().dispatchEvent(new MouseEvent("mouseenter", {
              clientX: Math.round(startX),
              clientY: Math.round(progressPosition.y),
          }));
          ProgressEleLazy().dispatchEvent(new MouseEvent("mousedown", {
              clientX: Math.round(startX),
              clientY: Math.round(progressPosition.y),
          }));
          ProgressEleLazy().dispatchEvent(new MouseEvent("mousemove", {
              clientX: Math.round(startX),
              clientY: Math.round(progressPosition.y),
              bubbles: true,
          }));
      }
      function duringProcessChange(xmove) {
          targetX = xmove * 1.5 + startX;
          const progressPosition = ProgressEleLazy().getBoundingClientRect();
          ProgressEleLazy().dispatchEvent(new MouseEvent("mousemove", {
              clientX: Math.round(targetX),
              clientY: Math.round(progressPosition.y),
              bubbles: true,
          }));
      }
      function endProcessChange() {
          const progressPosition = ProgressEleLazy().getBoundingClientRect();
          ProgressEleLazy().dispatchEvent(new MouseEvent("mouseup", {
              clientX: Math.round(targetX || startX),
              clientY: Math.round(progressPosition.y),
              bubbles: true,
          }));
      }
      function startFastFor() {
          document.dispatchEvent(ArrowRightDown);
      }
      function endFastFor() {
          document.dispatchEvent(ArrowRightUp);
      }
      let st = 0;
      const onTouchStart = (e) => {
          state = "none";
          if (e.targetTouches.length !== 1)
              return;
          startTouchPosition.x = Math.round(e.targetTouches[0].clientX);
          startTouchPosition.y = Math.round(e.targetTouches[0].clientY);
          startX = 0;
          targetX = 0;
          lastY = startTouchPosition.y;
          st = setTimeout(() => {
              if (state === "none") {
                  state = "situ";
                  startFastFor();
              }
          }, 500);
      };
      const onTouchMove = (e) => {
          if (e.targetTouches.length !== 1)
              return;
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
          }
          else if (state === "Xdrag") {
              duringProcessChange(xmove);
          }
          else if (state === "Ydrag") {
              const v = window.player.getVolume();
              if (curTouchPosition.y - lastY < 0) {
                  window.player.setVolume(v + 0.05);
              }
              else {
                  window.player.setVolume(v - 0.05);
              }
          }
          lastY = curTouchPosition.y;
      };
      const onTouchEnd = (e) => {
          if (e.targetTouches.length !== 0)
              return;
          if (state === "Xdrag") {
              endProcessChange();
          }
          else if (state == "Ydrag") ;
          else if (state == "situ") {
              endFastFor();
          }
          clearTimeout(st);
          state = "none";
      };
      target.addEventListener("touchstart", onTouchStart);
      target.addEventListener("touchmove", onTouchMove);
      target.addEventListener("touchend", onTouchEnd);
      target.addEventListener("touchcancel", onTouchEnd);
  }

  /*  点击出现进度条
   *  双击暂停
   *  双指单击显示弹幕
   *  双指双击全屏/退出全屏
   *  上下滑动调节音量
   *  左右滑动调节进度
   *  长按快进
   */
  function registerTouchEnv() {
      registerTapEvent(getEle().VideoEle, {
          onTap1() {
              isShowDetail() ? hideDetail() : showDetailMoment();
          },
          onDoubleTap1() {
              isPlay() ? pause() : play();
          },
          onTap2() {
              showHideBullet();
          },
          onDoubleTap2() {
              fullScreen();
          },
      });
      registerTouchMoveEvent(getEle().VideoEle);
  }

  log("load script~");
  if (isInVideoPage()) {
      // 视频播放页加载触屏优化
      registerTouchEnv();
      listen();
  }
  else {
      // 其他页劫持页面跳转链接
      intercept();
  }
  log("已装载");

})();
