export function injectAddBTN() {
  const btn = document.createElement("button");
  btn.innerText = "返回";
  btn.style.setProperty("position", "fixed");
  btn.style.setProperty("top", "0");
  btn.style.setProperty("bottom", "0");
  btn.addEventListener("click", () => {
    window.open("", window.SRCWindowName);
    window.player.pause();
  });
  document.body.appendChild(btn);
}
