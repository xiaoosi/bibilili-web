import { getEle } from "../Ele";

export function injectAddBTN() {
  //   添加返回按钮
  const back = document.createElement("div");
  back.innerHTML = `<svg height="50px" width="50px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 495 495" xml:space="preserve" fill="#000000" stroke="#000000" stroke-width="0.00495" transform="matrix(1, 0, 0, 1, 0, 0)"><g id="SVGRepo_iconCarrier"> <g>    <polygon style="fill:#ffffff;" points="247.5,334.58 291.894,379.119 320.224,350.881 247.5,277.92 217.179,247.5 247.5,217.08 320.224,144.119 291.894,115.881 247.5,160.419 160.703,247.5 "></polygon> </g> </g></svg>`;
  back.classList.add("back-btn")
  back.addEventListener("click", (e) => {
    e.preventDefault()
    window.open("", window.SRCWindowName);
    window.player.pause();
  });

  const style = document.createElement("style")
  style.textContent = `.back-btn{
    top: calc(50% - 25px);
    left: 0;
    transition: all .2s ease-in-out;
    z-index: 100;
    position: absolute;
    width: 50px;
    height: 50px;
    cursor: pointer;
  }
  .bpx-state-no-cursor .back-btn{
    display: none;
  }
  `
  document.head.appendChild(style)
  getEle().VideoAreaEle.appendChild(back);
}
