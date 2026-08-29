const OLD_PAVILION_PAGE = "./old-pavilion.html";
const CLAIMED_LOST_ITEMS_STORAGE_KEY = "qingdeng-weigui:claimed-lost-items";
const BRONZE_KEY_ITEM_ID = "bronze-key";
const DOOR_U = 0.27;
const DOOR_V = 0.505;
const MIN_ZOOM = 1.55;
const MAX_ZOOM = 3.1;

const fallback = document.querySelector("#panorama-fallback");
const fallbackDoor = document.querySelector("#fallback-door");

function openOldPavilion() {
  window.location.href = new URL(OLD_PAVILION_PAGE, window.location.href).toString();
}

function hasBronzeKeyInInventory() {
  try {
    const claimedItems = JSON.parse(localStorage.getItem(CLAIMED_LOST_ITEMS_STORAGE_KEY) ?? "[]");
    return Array.isArray(claimedItems) && claimedItems.includes(BRONZE_KEY_ITEM_ID);
  } catch {
    return false;
  }
}

function closeDoorPrompt() {
  document.querySelector("[data-door-prompt]")?.remove();
}

function showDoorPrompt() {
  closeDoorPrompt();
  const hasKey = hasBronzeKeyInInventory();
  const prompt = document.createElement("section");
  prompt.className = "door-prompt-overlay";
  prompt.dataset.doorPrompt = "";
  prompt.innerHTML = `
    <article class="door-prompt" role="dialog" aria-modal="true" aria-labelledby="door-prompt-title">
      <span class="door-prompt-seal" aria-hidden="true">封</span>
      <p class="door-prompt-kicker">藏经阁北墙 · 旧锁</p>
      <h2 id="door-prompt-title">${hasKey ? "是否使用钥匙开门？" : "门已上锁"}</h2>
      <p>${hasKey ? "物品格中的青铜钥与门锁形制相合。" : "锁孔积灰，徒手无法开启。"}</p>
      <div class="door-prompt-actions">
        ${hasKey ? '<button type="button" class="door-prompt-confirm" data-use-bronze-key>使用钥匙</button>' : ""}
        <button type="button" class="door-prompt-cancel" data-close-door-prompt>${hasKey ? "暂不开门" : "知道了"}</button>
      </div>
    </article>`;

  document.body.append(prompt);
  prompt.querySelector("[data-use-bronze-key]")?.addEventListener("click", openOldPavilion);
  prompt.querySelector("[data-close-door-prompt]")?.addEventListener("click", closeDoorPrompt);
  prompt.addEventListener("click", (event) => {
    if (event.target === prompt) closeDoorPrompt();
  });
  prompt.querySelector("button")?.focus();
}

function setupLocalPanorama() {
  if (!fallback || !fallbackDoor) {
    return;
  }

  let zoom = 2.1;
  let panX = 0;
  let panY = 0;
  let pointerStart = null;
  let hasDragged = false;

  function getMetrics() {
    const viewportWidth = Math.max(fallback.clientWidth, 1);
    const viewportHeight = Math.max(fallback.clientHeight, 1);
    const panoramaHeight = viewportHeight * zoom;
    const panoramaWidth = panoramaHeight * 2;

    return { viewportWidth, viewportHeight, panoramaWidth, panoramaHeight };
  }

  function clampVerticalPan(metrics) {
    const lowestY = metrics.viewportHeight - metrics.panoramaHeight;
    panY = Math.min(0, Math.max(lowestY, panY));
  }

  function resetVerticalPan() {
    const metrics = getMetrics();
    panY = (metrics.viewportHeight - metrics.panoramaHeight) / 2;
  }

  function updateView() {
    const metrics = getMetrics();
    clampVerticalPan(metrics);

    const doorX = ((panX + DOOR_U * metrics.panoramaWidth) % metrics.panoramaWidth + metrics.panoramaWidth) % metrics.panoramaWidth;
    const doorY = panY + DOOR_V * metrics.panoramaHeight;

    fallback.style.backgroundSize = `${metrics.panoramaWidth}px ${metrics.panoramaHeight}px`;
    fallback.style.backgroundPosition = `${panX}px ${panY}px`;
    fallbackDoor.style.left = `${doorX}px`;
    fallbackDoor.style.top = `${doorY}px`;
  }

  function beginDrag(event) {
    if (fallbackDoor.contains(event.target)) {
      return;
    }

    event.preventDefault();
    hasDragged = false;
    fallback.setPointerCapture(event.pointerId);
    pointerStart = { x: event.clientX, y: event.clientY, panX, panY };
    fallback.classList.add("is-dragging");
  }

  function dragPanorama(event) {
    if (!pointerStart || !fallback.hasPointerCapture(event.pointerId)) {
      return;
    }

    if (Math.abs(event.clientX - pointerStart.x) > 4 || Math.abs(event.clientY - pointerStart.y) > 4) {
      hasDragged = true;
      event.preventDefault();
      window.getSelection()?.removeAllRanges();
    }

    panX = pointerStart.panX + event.clientX - pointerStart.x;
    panY = pointerStart.panY + event.clientY - pointerStart.y;
    updateView();
  }

  function endDrag() {
    pointerStart = null;
    fallback.classList.remove("is-dragging");
  }

  fallbackDoor.addEventListener("pointerdown", (event) => {
    if (event.pointerType === "mouse" && event.button !== 0) return;
    event.stopPropagation();
  });

  fallbackDoor.addEventListener("pointerup", (event) => {
    event.stopPropagation();
  });

  fallbackDoor.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    showDoorPrompt();
  });
  fallback.addEventListener("pointerdown", beginDrag);
  fallback.addEventListener("pointermove", dragPanorama);
  fallback.addEventListener("pointerup", endDrag);
  fallback.addEventListener("pointercancel", endDrag);
  fallback.addEventListener("wheel", (event) => {
    event.preventDefault();

    const previousZoom = zoom;
    zoom = Math.min(MAX_ZOOM, Math.max(MIN_ZOOM, zoom - event.deltaY * 0.0014));

    if (previousZoom !== zoom) {
      const metrics = getMetrics();
      panY = Math.min(0, Math.max(metrics.viewportHeight - metrics.panoramaHeight, panY));
      updateView();
    }
  }, { passive: false });

  fallback.addEventListener("keydown", (event) => {
    const step = 48;

    if (event.key === "ArrowLeft") panX += step;
    else if (event.key === "ArrowRight") panX -= step;
    else if (event.key === "ArrowUp") panY += step;
    else if (event.key === "ArrowDown") panY -= step;
    else return;

    event.preventDefault();
    updateView();
  });

  window.addEventListener("resize", () => {
    resetVerticalPan();
    updateView();
  });

  resetVerticalPan();
  updateView();
}

setupLocalPanorama();

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeDoorPrompt();
});
