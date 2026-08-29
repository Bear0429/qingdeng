(function () {
  const audioControl = document.querySelector("[data-page-audio-control]");
  if (!audioControl) return;

  const audio = audioControl.querySelector("[data-page-audio]");
  const toggle = audioControl.querySelector("[data-page-audio-toggle]");
  const volume = audioControl.querySelector("[data-page-audio-volume]");

  if (!audio || !toggle || !volume) return;

  let isMuted = false;
  let unlockHandler = null;
  let hasStartedPlaying = false;

  // 检查是否在封面状态
  function isCoverActive() {
    return document.body.classList.contains("is-cover-active");
  }

  // 监听封面状态变化，进入游戏后开始播放
  const coverObserver = new MutationObserver(() => {
    if (!isCoverActive() && !hasStartedPlaying) {
      hasStartedPlaying = true;
      attemptPlay();
    }
    if (isCoverActive()) {
      audio.pause();
    }
  });
  coverObserver.observe(document.body, { attributes: true, attributeFilter: ["class"] });

  // 拖动相关
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let controlStartLeft = 0;
  let controlStartTop = 0;
  let hasMoved = false;

  // 从localStorage恢复位置
  const savedPos = localStorage.getItem("page-audio-position");
  if (savedPos) {
    try {
      const pos = JSON.parse(savedPos);
      if (pos.left !== undefined && pos.top !== undefined) {
        audioControl.style.left = pos.left + "px";
        audioControl.style.top = pos.top + "px";
      }
    } catch (e) {}
  }

  function syncControl() {
    const muted = isMuted || audio.volume === 0;
    audioControl.classList.toggle("is-muted", muted);
    toggle.setAttribute("aria-pressed", String(muted));
    toggle.setAttribute("aria-label", muted ? "播放背景音乐" : "暂停背景音乐");
  }

  function attemptPlay() {
    if (isMuted || isCoverActive()) return;

    const playPromise = audio.play();
    if (!playPromise || typeof playPromise.catch !== "function") return;

    playPromise
      .then(() => {
        if (unlockHandler) {
          document.removeEventListener("pointerdown", unlockHandler);
          unlockHandler = null;
        }
      })
      .catch(() => {
        if (!unlockHandler) {
          unlockHandler = () => {
            unlockHandler = null;
            attemptPlay();
          };
          document.addEventListener("pointerdown", unlockHandler, { once: true });
        }
      });
  }

  // 拖动开始
  audioControl.addEventListener("pointerdown", (e) => {
    if (e.target.closest(".page-audio-volume") || e.target.closest("input")) {
      return;
    }
    isDragging = true;
    hasMoved = false;
    dragStartX = e.clientX;
    dragStartY = e.clientY;
    const rect = audioControl.getBoundingClientRect();
    controlStartLeft = rect.left;
    controlStartTop = rect.top;
    audioControl.setPointerCapture(e.pointerId);
  });

  // 拖动中
  audioControl.addEventListener("pointermove", (e) => {
    if (!isDragging) return;
    const dx = e.clientX - dragStartX;
    const dy = e.clientY - dragStartY;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      hasMoved = true;
    }
    let newLeft = controlStartLeft + dx;
    let newTop = controlStartTop + dy;
    // 限制在视口内
    const maxLeft = window.innerWidth - audioControl.offsetWidth;
    const maxTop = window.innerHeight - audioControl.offsetHeight;
    newLeft = Math.max(0, Math.min(newLeft, maxLeft));
    newTop = Math.max(0, Math.min(newTop, maxTop));
    audioControl.style.left = newLeft + "px";
    audioControl.style.top = newTop + "px";
  });

  // 拖动结束
  audioControl.addEventListener("pointerup", (e) => {
    if (isDragging) {
      isDragging = false;
      audioControl.releasePointerCapture(e.pointerId);
      // 保存位置
      const rect = audioControl.getBoundingClientRect();
      localStorage.setItem("page-audio-position", JSON.stringify({
        left: rect.left,
        top: rect.top
      }));
      // 如果有移动，阻止点击事件
      if (hasMoved) {
        e.preventDefault();
        e.stopPropagation();
      }
    }
  });

  // 播放/暂停按钮（点击时如果有拖动则不触发）
  toggle.addEventListener("click", (e) => {
    if (hasMoved) {
      e.preventDefault();
      e.stopPropagation();
      hasMoved = false;
      return;
    }
    isMuted = !isMuted;
    if (isMuted) {
      audio.pause();
    } else {
      attemptPlay();
    }
    syncControl();
  });

  volume.addEventListener("input", () => {
    audio.volume = Number(volume.value);
    if (audio.volume > 0 && isMuted) {
      isMuted = false;
      attemptPlay();
    } else if (audio.volume === 0) {
      isMuted = true;
      audio.pause();
    }
    syncControl();
  });

  audio.volume = Number(volume.value) || 0.3;
  syncControl();

  // 封面状态下不播放，进入游戏后由 MutationObserver 触发播放
  if (!isCoverActive()) {
    hasStartedPlaying = true;
    attemptPlay();
  }

  window.addEventListener("pagehide", () => {
    if (unlockHandler) {
      document.removeEventListener("pointerdown", unlockHandler);
    }
    audio.pause();
  }, { once: true });
})();
