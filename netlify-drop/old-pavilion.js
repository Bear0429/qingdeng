const backButton = document.querySelector("#old-pavilion-back");
const pavilionPage = document.querySelector(".old-pavilion-page");
const CORNER_CLICK_WINDOW_MS = 900;
let cornerClickCount = 0;
let lastCornerClickAt = 0;

function closePoemPreview() {
  document.querySelector("[data-poem-preview]")?.remove();
  document.body.classList.remove("has-poem-preview");
}

function openPoemPreview() {
  closePoemPreview();

  const preview = document.createElement("section");
  preview.className = "poem-preview";
  preview.dataset.poemPreview = "";
  preview.setAttribute("role", "dialog");
  preview.setAttribute("aria-modal", "true");
  preview.setAttribute("aria-label", "旧阁藏诗");
  preview.tabIndex = -1;
  preview.innerHTML = `
    <img src="./assets/clues/old-pavilion-poem.png" alt="旧阁藏诗：双儿背坐，东方欲晓；水边七子，枯木作舟；三魂相叠，三阶在下；鸡鸣卯时，莫要回头。" />
  `;

  document.body.appendChild(preview);
  document.body.classList.add("has-poem-preview");
  preview.addEventListener("click", (event) => {
    if (event.target === preview) closePoemPreview();
  });
  preview.focus();
}

function handleHiddenCornerClick(event) {
  if (event.target.closest("#old-pavilion-back") || document.querySelector("[data-poem-preview]")) return;

  const bounds = pavilionPage.getBoundingClientRect();
  const relativeX = (event.clientX - bounds.left) / bounds.width;
  const relativeY = (event.clientY - bounds.top) / bounds.height;

  if (relativeX < 0.72 || relativeY < 0.7) {
    cornerClickCount = 0;
    return;
  }

  const now = performance.now();
  cornerClickCount = now - lastCornerClickAt <= CORNER_CLICK_WINDOW_MS ? cornerClickCount + 1 : 1;
  lastCornerClickAt = now;

  if (cornerClickCount >= 3) {
    cornerClickCount = 0;
    openPoemPreview();
  }
}

pavilionPage?.addEventListener("click", handleHiddenCornerClick);

backButton?.addEventListener("click", () => {
  if (window.opener && !window.opener.closed) {
    window.close();
    return;
  }

  window.location.href = "./library-panorama.html";
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closePoemPreview();
});
