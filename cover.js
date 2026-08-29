(() => {
  const COVER_SESSION_KEY = "qingdeng-weigui:cover-entered";
  const VISITED_STORAGE_KEY = "qingdeng-weigui:visited-pages";
  const CLUE_STORAGE_KEY = "qingdeng-weigui:viewed-clues";
  const SEARCHED_KEYWORDS_STORAGE_KEY = "qingdeng-weigui:searched-keywords";
  const BGM_SETTING_KEY = "qingdeng-weigui:settings:bgm";
  const BGM_VOLUME_SETTING_KEY = "qingdeng-weigui:settings:bgm-volume";
  const HORROR_SFX_SETTING_KEY = "qingdeng-weigui:settings:horror-sfx";
  const PROLOGUE_PENDING_KEY = "qingdeng-weigui:prologue-pending";
  const COVER_BGM_SRC = "./assets/audio/山钟回响.mp3";
  const COVER_BGM_FALLBACK_SRC = "./assets/audio/qingdeng-cover-loop.wav";
  const RESET_KEYS = [
    VISITED_STORAGE_KEY,
    CLUE_STORAGE_KEY,
    SEARCHED_KEYWORDS_STORAGE_KEY,
    "qingdeng-weigui:jade-active-account",
    "qingdeng-weigui:claimed-lost-items",
    "qingdeng-weigui:soul-lantern-gate-unlocked",
    "qingdeng-weigui:teahouse-interactions:session:v1",
    "hasLoggedWenZhaoYe",
    "hasLoggedLuXingzhou",
    "qingdeng-weigui:xz000-wen-message-viewed",
    "qingdeng-weigui:kcy49-black-memory-stone",
    "qingdeng-weigui:kcy49-nine-turn-remnant-one",
    "qingdeng-weigui:player-name",
    "qingdeng-weigui:san-juan-claimed",
    "qingdeng-weigui:si-juan-claimed",
    "qingdeng-weigui:pharmacy-diary-claimed",
    "qingdeng-weigui:luqichen-script-triggered",
    "qingdeng-weigui:luqichen-zhenjuan-triggered",
    "qingdeng-weigui:xuanzhuo-script-triggered",
    "qingdeng-weigui:baiheng-zhenjuan-triggered",
    "qingdeng-weigui:baiheng-jiang-triggered",
    "qingdeng-weigui:baiheng-zhenjuan-after-jiang-triggered",
    "qingdeng-weigui:elder-wen-chat-played",
    "qingdeng-weigui:jade-message-viewed",
    "qingdeng-weigui:remnant-puzzle-completed",
  ];

  const focusableSelector = [
    "a[href]",
    "button:not([disabled]):not([hidden])",
    "input:not([disabled])",
    "select:not([disabled])",
    "textarea:not([disabled])",
    "[tabindex]:not([tabindex='-1'])",
  ].join(",");

  let root = null;
  let activeModal = null;
  let lastFocusedElement = null;
  let isEntering = false;
  let ambientAudio = null;
  let ambientAutoplayTimer = null;
  let prologueRoot = null;

  function readArrayStorage(key) {
    try {
      const value = JSON.parse(localStorage.getItem(key) ?? "[]");
      return Array.isArray(value) ? value : [];
    } catch {
      return [];
    }
  }

  function hasExistingSave() {
    return readArrayStorage(VISITED_STORAGE_KEY).length > 0 || readArrayStorage(CLUE_STORAGE_KEY).length > 0;
  }

  function isBgmEnabled() {
    return localStorage.getItem(BGM_SETTING_KEY) !== "off";
  }

  function getBgmVolume() {
    const storedVolume = Number(localStorage.getItem(BGM_VOLUME_SETTING_KEY));

    if (!Number.isFinite(storedVolume)) {
      return 0.46;
    }

    return Math.min(1, Math.max(0, storedVolume));
  }

  function setBgmVolume(volume) {
    const safeVolume = Math.min(1, Math.max(0, volume));
    localStorage.setItem(BGM_VOLUME_SETTING_KEY, String(safeVolume));

    if (ambientAudio) {
      ambientAudio.volume = safeVolume;
    }

    return safeVolume;
  }

  function isHorrorSfxEnabled() {
    return localStorage.getItem(HORROR_SFX_SETTING_KEY) !== "off";
  }

  function ensureHorrorSetting() {
    if (!localStorage.getItem(HORROR_SFX_SETTING_KEY)) {
      localStorage.setItem(HORROR_SFX_SETTING_KEY, "on");
    }
  }

  function createCover() {
    ensureHorrorSetting();

    root = document.createElement("section");
    root.id = "game-cover";
    root.className = "game-cover";
    root.setAttribute("aria-label", "青灯未归封面");
    root.innerHTML = `
      <div class="cover-bg" aria-hidden="true"></div>
      <div class="cover-figure-flow" aria-hidden="true"></div>
      <div class="cover-particles" aria-hidden="true">
        <span style="--x: 18%; --y: 28%; --s: 2px; --d: 16s; --delay: -2s;"></span>
        <span style="--x: 24%; --y: 66%; --s: 3px; --d: 20s; --delay: -12s;"></span>
        <span style="--x: 34%; --y: 48%; --s: 2px; --d: 18s; --delay: -6s;"></span>
        <span style="--x: 47%; --y: 34%; --s: 2px; --d: 22s; --delay: -16s;"></span>
        <span style="--x: 52%; --y: 72%; --s: 3px; --d: 19s; --delay: -9s;"></span>
        <span style="--x: 59%; --y: 42%; --s: 2px; --d: 17s; --delay: -4s;"></span>
        <span style="--x: 63%; --y: 58%; --s: 2px; --d: 21s; --delay: -14s;"></span>
        <span style="--x: 68%; --y: 26%; --s: 3px; --d: 23s; --delay: -7s;"></span>
        <span style="--x: 74%; --y: 64%; --s: 2px; --d: 18s; --delay: -11s;"></span>
        <span style="--x: 82%; --y: 39%; --s: 2px; --d: 24s; --delay: -18s;"></span>
        <span style="--x: 88%; --y: 76%; --s: 3px; --d: 20s; --delay: -5s;"></span>
        <span style="--x: 92%; --y: 53%; --s: 2px; --d: 17s; --delay: -13s;"></span>
      </div>
      <div class="cover-flicker" aria-hidden="true"></div>
      <div class="cover-shadow-flash" aria-hidden="true"></div>

      <button type="button" class="cover-fullscreen" data-cover-fullscreen aria-label="切换全屏">
        <span aria-hidden="true">⛶</span>
      </button>

      <div class="cover-content">
        <p class="cover-subtitle">[欢迎加入青岚宗]</p>
        <p class="cover-tagline">首次进入建议先阅读宗卷</p>

        <nav class="cover-menu" aria-label="封面主菜单">
          <button type="button" class="cover-menu-button menu-button is-primary" data-cover-enter aria-label="进入宗门，开始调查">
            <span class="menu-button__text">进入宗门</span>
          </button>
          <button type="button" class="cover-menu-button menu-button" data-cover-modal="dossier" aria-label="查看游玩须知（必看）">
            <span class="menu-button__text">游玩须知（<span style="color:#a52d27;">必看</span>）</span>
          </button>
          <button type="button" class="cover-menu-button menu-button" data-cover-modal="settings" aria-label="打开系统设置">
            <span class="menu-button__text">系统设置</span>
          </button>
          <button type="button" class="cover-menu-button menu-button" data-cover-modal="help" aria-label="查看帮助">
            <span class="menu-button__text">查看帮助</span>
          </button>
        </nav>
      </div>

      <div class="cover-modal-slot" data-cover-modal-slot></div>
    `;

    document.body.prepend(root);
    document.body.classList.add("is-cover-active");
    bindCoverEvents();
    updateFullscreenButton();

    if (isBgmEnabled()) {
      startAmbientAudio();
    }

    openCoverModal("dossier");
  }

  function bindCoverEvents() {
    root.querySelector("[data-cover-enter]")?.addEventListener("click", () => {
      if (isEntering) {
        return;
      }

      if (hasExistingSave()) {
        openCoverModal("resume");
        return;
      }

      enterGame();
    });

    root.querySelectorAll("[data-cover-modal]").forEach((button) => {
      button.addEventListener("click", () => {
        openCoverModal(button.getAttribute("data-cover-modal"));
      });
    });

    root.querySelector("[data-cover-fullscreen]")?.addEventListener("click", () => {
      toggleFullscreen();
    });

    if (canUseCoverMotion()) {
      root.addEventListener("mousemove", handleCoverParallax);
    }
  }

  function canUseCoverMotion() {
    return (
      window.matchMedia("(pointer: fine)").matches &&
      window.matchMedia("(min-width: 761px)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }

  function handleCoverParallax(event) {
    const rect = root.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 8;

    root.style.setProperty("--cover-shift-x", `${x.toFixed(2)}px`);
    root.style.setProperty("--cover-shift-y", `${y.toFixed(2)}px`);
  }

  function updateFullscreenButton() {
    const button = root?.querySelector("[data-cover-fullscreen]");

    if (!button) {
      return;
    }

    if (!document.fullscreenEnabled) {
      button.hidden = true;
      return;
    }

    button.hidden = false;
    button.setAttribute("aria-pressed", document.fullscreenElement ? "true" : "false");
  }

  function toggleFullscreen() {
    if (!document.fullscreenEnabled) {
      return;
    }

    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
      return;
    }

    document.documentElement.requestFullscreen().catch(() => {});
  }

  function getModalContent(type) {
    if (type === "dossier") {
      return {
        title: "游玩须知（<span style=\"color:#a52d27;\">必看</span>）",
        body: `
          <ol class="cover-dossier-list">
            <li><strong style="color:#a52d27;">本游戏内容纯属虚构，里面有恐怖跳脸情节，适合有游玩经验或者心理承受能力强的人玩。试玩年龄建议16+以上，心理承受能力低者和未成年人请在监护人陪护下游玩。</strong></li>
            <li>本游戏属于<strong>wig</strong>网页搜索解谜游戏，主要通过浏览论坛中的帖子，通过搜索框查找关键内容，获得重要线索。游戏没有任何涉及到网页代码的谜题，请玩家专注游戏内。</li>
            <li>游戏内容以恐怖修仙相关内容为主，包含恐怖元素。游戏目标是查找出真相，有多个结局，其中只有一个真结局。</li>
            <li>本游戏通过浏览器保存数据，用户可以通过开始页面的继续游戏读取游玩数据。</li>
            <li>为获得最佳游戏体验，推荐用电脑游玩，并保持所有网页都在同一浏览器内开启。游戏窗口较多，同一页面尽量不要多开。</li>
            <li>声明：本游戏内容纯属虚构，不涉及任何现实中的团体或个人。</li>
          </ol>
        `,
      };
    }

    if (type === "settings") {
      return {
        title: "系统设置",
        body: `
          <div class="cover-setting-row">
            <span>
              <strong>背景音乐</strong>
              <small>40 秒古风诡异封面曲，开启后循环播放。</small>
            </span>
            <label class="cover-switch">
              <input type="checkbox" data-cover-bgm ${isBgmEnabled() ? "checked" : ""} />
              <span>开关</span>
            </label>
          </div>
          <div class="cover-setting-row cover-volume-row">
            <span>
              <strong>背景音乐音量</strong>
              <small>调节封面循环音乐的音量大小。</small>
            </span>
            <label class="cover-volume-control">
              <input
                type="range"
                min="0"
                max="100"
                step="1"
                value="${Math.round(getBgmVolume() * 100)}"
                data-cover-volume
                aria-label="背景音乐音量"
              />
              <span data-cover-volume-value>${Math.round(getBgmVolume() * 100)}%</span>
            </label>
          </div>
          <div class="cover-setting-row">
            <span>
              <strong>恐怖音效</strong>
              <small>影响人魂灯等异常检索音效。</small>
            </span>
            <label class="cover-switch">
              <input type="checkbox" data-cover-horror ${isHorrorSfxEnabled() ? "checked" : ""} />
              <span>开关</span>
            </label>
          </div>
        `,
      };
    }

    if (type === "resume") {
      return {
        title: "检测到未完成的游戏记录",
        body: `
          <p>检测到未完成的游戏记录，是否继续？</p>
          <div class="cover-modal-actions">
            <button type="button" class="cover-dialog-button is-primary" data-cover-continue>继续游戏</button>
            <button type="button" class="cover-dialog-button" data-cover-modal="restart">重新开始</button>
          </div>
        `,
      };
    }

    if (type === "restart") {
      return {
        title: "确认重新开始",
        body: `
          <p>重新开始会清除当前已发现页面、调查线索和玉牒登录记录。此操作不可撤回。</p>
          <div class="cover-modal-actions">
            <button type="button" class="cover-dialog-button is-danger" data-cover-reset>确认清除并重开</button>
            <button type="button" class="cover-dialog-button" data-cover-modal="resume">返回</button>
          </div>
        `,
      };
    }

    return {
      title: "查看帮助",
      body: `
        <section class="cover-modal-section">
          <h3>调查方式</h3>
          <p>进入宗门后，通过公告、分册、茶寮、玉牒与搜索框逐步查阅隐藏卷宗。关键词不必严格线性，但主线线索会互相指引。</p>
        </section>
        <section class="cover-modal-section">
          <h3>建议</h3>
          <p>先读首页公告，再从出现过的词开始搜索；遇到可点击栏目时，也请打开比对。存档会保存在本机浏览器中。</p>
        </section>
      `,
    };
  }

  function openCoverModal(type) {
    closeCoverModal(true);
    activeModal = type;
    lastFocusedElement = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const content = getModalContent(type);
    const slot = root.querySelector("[data-cover-modal-slot]");
    const isMandatory = type === "dossier";

    slot.innerHTML = `
      <div class="cover-modal-backdrop" data-cover-modal-backdrop>
        <article class="cover-modal ${isMandatory ? "is-mandatory" : ""}" role="dialog" aria-modal="true" aria-labelledby="cover-modal-title">
          ${isMandatory ? "" : '<button type="button" class="cover-modal-close" data-cover-close aria-label="关闭弹窗">×</button>'}
          <h2 id="cover-modal-title">${content.title}</h2>
          <div class="cover-modal-body">${content.body}</div>
          ${isMandatory ? '<div class="cover-modal-actions"><button type="button" class="cover-dialog-button is-primary" data-cover-acknowledge>我已知晓</button></div>' : ""}
        </article>
      </div>
    `;

    bindModalEvents(slot);

    if (isMandatory) {
      slot.querySelector("[data-cover-acknowledge]")?.focus();
    } else {
      slot.querySelector("[data-cover-close]")?.focus();
    }
  }

  function closeCoverModal(immediate = false) {
    const slot = root?.querySelector("[data-cover-modal-slot]");
    const backdrop = slot?.querySelector(".cover-modal-backdrop");

    if (!slot || !backdrop) {
      activeModal = null;
      return;
    }

    const finish = () => {
      slot.innerHTML = "";
      activeModal = null;
      lastFocusedElement?.focus?.();
    };

    if (immediate) {
      finish();
      return;
    }

    backdrop.classList.add("is-closing");
    window.setTimeout(finish, 160);
  }

  function bindModalEvents(slot) {
    slot.querySelector("[data-cover-modal-backdrop]")?.addEventListener("click", (event) => {
      if (event.target === event.currentTarget && activeModal !== "dossier") {
        closeCoverModal();
      }
    });

    slot.querySelector("[data-cover-close]")?.addEventListener("click", () => closeCoverModal());
    slot.querySelector("[data-cover-acknowledge]")?.addEventListener("click", () => closeCoverModal());
    slot.querySelector("[data-cover-continue]")?.addEventListener("click", () =>
      enterGame({ showPrologue: false }),
    );
    slot.querySelector("[data-cover-reset]")?.addEventListener("click", () => resetAndEnterGame());

    slot.querySelectorAll("[data-cover-modal]").forEach((button) => {
      button.addEventListener("click", () => openCoverModal(button.getAttribute("data-cover-modal")));
    });

    slot.querySelector("[data-cover-bgm]")?.addEventListener("change", (event) => {
      const enabled = event.target.checked;
      localStorage.setItem(BGM_SETTING_KEY, enabled ? "on" : "off");

      if (enabled) {
        startAmbientAudio();
        scheduleAmbientAutoplay();
      } else {
        stopAmbientAudio();
      }
    });

    slot.querySelector("[data-cover-volume]")?.addEventListener("input", (event) => {
      const volume = setBgmVolume(Number(event.target.value) / 100);
      const valueLabel = slot.querySelector("[data-cover-volume-value]");

      if (valueLabel) {
        valueLabel.textContent = `${Math.round(volume * 100)}%`;
      }
    });

    slot.querySelector("[data-cover-horror]")?.addEventListener("change", (event) => {
      localStorage.setItem(HORROR_SFX_SETTING_KEY, event.target.checked ? "on" : "off");
    });
  }

  function startAmbientAudio() {
    if (ambientAudio) {
      ambientAudio.volume = getBgmVolume();
      ambientAudio.play().catch(() => {});
      return;
    }

    const audio = document.createElement("audio");
    audio.src = COVER_BGM_SRC;
    audio.loop = true;
    audio.autoplay = true;
    audio.playsInline = true;
    audio.preload = "auto";
    audio.setAttribute("autoplay", "");
    audio.setAttribute("loop", "");
    audio.setAttribute("playsinline", "");
    audio.volume = getBgmVolume();
    audio.addEventListener(
      "error",
      () => {
        if (audio.src.includes("qingdeng-cover-loop.wav")) {
          return;
        }

        audio.src = COVER_BGM_FALLBACK_SRC;
        audio.play().catch(() => {});
      },
      { once: true },
    );
    ambientAudio = audio;
    root?.append(audio);
    audio.play().catch(() => {});
    scheduleAmbientAutoplay();
  }

  function clearAmbientAutoplayTimer() {
    if (!ambientAutoplayTimer) {
      return;
    }

    window.clearInterval(ambientAutoplayTimer);
    ambientAutoplayTimer = null;
  }

  function scheduleAmbientAutoplay() {
    clearAmbientAutoplayTimer();

    if (!ambientAudio || !isBgmEnabled()) {
      return;
    }

    let attempts = 0;
    const tryPlay = () => {
      if (!root || !ambientAudio || !isBgmEnabled()) {
        clearAmbientAutoplayTimer();
        return;
      }

      if (!ambientAudio.paused && !ambientAudio.ended) {
        clearAmbientAutoplayTimer();
        return;
      }

      attempts += 1;
      ambientAudio.play().catch(() => {});

      if (attempts >= 16) {
        clearAmbientAutoplayTimer();
      }
    };

    tryPlay();
    ambientAutoplayTimer = window.setInterval(tryPlay, 500);
  }

  function stopAmbientAudio() {
    if (!ambientAudio) {
      return;
    }

    clearAmbientAutoplayTimer();
    ambientAudio.pause();
    ambientAudio.currentTime = 0;
    ambientAudio.remove();
    ambientAudio = null;
  }

  function pauseAmbientAudio() {
    if (!ambientAudio) {
      return;
    }

    clearAmbientAutoplayTimer();
    ambientAudio.pause();
    ambientAudio.remove();
    ambientAudio = null;
  }

  function createPrologue() {
    if (prologueRoot) {
      return;
    }

    sessionStorage.setItem(PROLOGUE_PENDING_KEY, "true");
    prologueRoot = document.createElement("section");
    prologueRoot.className = "story-prologue";
    prologueRoot.setAttribute("role", "dialog");
    prologueRoot.setAttribute("aria-modal", "true");
    prologueRoot.setAttribute("aria-label", "入门见习档案");
    prologueRoot.tabIndex = -1;
    prologueRoot.innerHTML = `
      <div class="story-prologue__background" aria-hidden="true"></div>
      <div class="story-prologue__shade" aria-hidden="true"></div>
      <p class="story-prologue__prompt">点击画面，启封见习档案</p>
      <article class="story-prologue__content" aria-live="polite">
        <p>你是青岚宗新入门的外门弟子。因修为尚浅，被暂时调入外门事务处做见习帮办，负责整理卷宗、誊抄公告、归档失物与值守记录。</p>
        <p>原本你只想安稳修行，攒够灵石，不惹是非。<br />直到某日，你在整理旧档时发现：一名叫<strong>温照夜</strong>的弟子，明明已被宗门除名，她的玉牒、签到与卷宗却仍未彻底失效。</p>
        <p>从那之后，有意无意的调查，你开始意识到，这座看似平静的仙门，藏着某种不该被人知道的东西。</p>
        <button type="button" class="story-prologue__start" data-prologue-start>开始游戏</button>
      </article>
    `;

    document.body.prepend(prologueRoot);
    document.body.classList.add("is-prologue-active");

    const revealStory = (event) => {
      if (event.target.closest("[data-prologue-start]") || prologueRoot.classList.contains("is-revealed")) {
        return;
      }

      prologueRoot.classList.add("is-revealed");
      window.setTimeout(() => prologueRoot?.querySelector("[data-prologue-start]")?.focus(), 720);
    };

    prologueRoot.addEventListener("click", revealStory);
    prologueRoot.addEventListener("keydown", (event) => {
      if ((event.key === "Enter" || event.key === " ") && !prologueRoot.classList.contains("is-revealed")) {
        event.preventDefault();
        prologueRoot.classList.add("is-revealed");
        window.setTimeout(() => prologueRoot?.querySelector("[data-prologue-start]")?.focus(), 720);
      }
    });
    prologueRoot.querySelector("[data-prologue-start]")?.addEventListener("click", (event) => {
      event.stopPropagation();
      prologueRoot.classList.add("is-leaving");
      sessionStorage.removeItem(PROLOGUE_PENDING_KEY);

      window.setTimeout(() => {
        prologueRoot?.remove();
        prologueRoot = null;
        document.body.classList.remove("is-prologue-active");
      }, 620);
    });
    prologueRoot.focus();
  }

  function enterGame({ showPrologue = true } = {}) {
    if (isEntering) {
      return;
    }

    isEntering = true;
    closeCoverModal(true);

    if (showPrologue) {
      createPrologue();
    } else {
      sessionStorage.removeItem(PROLOGUE_PENDING_KEY);
    }

    root.classList.add("is-leaving");
    pauseAmbientAudio();

    window.setTimeout(() => {
      sessionStorage.setItem(COVER_SESSION_KEY, "true");

      if (showPrologue) {
        sessionStorage.setItem(PROLOGUE_PENDING_KEY, "true");
      } else {
        sessionStorage.removeItem(PROLOGUE_PENDING_KEY);
      }

      root.remove();
      root = null;
      document.body.classList.remove("is-cover-active");

      if (!window.location.hash || window.location.hash === "#/cover") {
        window.location.hash = "/home";
      }

    }, 1600);
  }

  function resetAndEnterGame() {
    RESET_KEYS.forEach((key) => localStorage.removeItem(key));
    pauseAmbientAudio();
    sessionStorage.setItem(COVER_SESSION_KEY, "true");
    sessionStorage.setItem(PROLOGUE_PENDING_KEY, "true");
    window.location.hash = "/home";
    window.location.reload();
  }

  function trapModalFocus(event) {
    if (!activeModal || event.key !== "Tab") {
      return;
    }

    const modal = root?.querySelector(".cover-modal");
    const focusable = [...(modal?.querySelectorAll(focusableSelector) ?? [])].filter(
      (element) => element instanceof HTMLElement && !element.hasAttribute("hidden"),
    );

    if (!focusable.length) {
      return;
    }

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
      return;
    }

    if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  document.addEventListener("keydown", (event) => {
    if (!root) {
      return;
    }

    if (event.key === "Escape" && activeModal && activeModal !== "dossier") {
      event.preventDefault();
      closeCoverModal();
      return;
    }

    trapModalFocus(event);
  });

  document.addEventListener("fullscreenchange", updateFullscreenButton);

  if (sessionStorage.getItem(COVER_SESSION_KEY) !== "true") {
    createCover();
  } else if (sessionStorage.getItem(PROLOGUE_PENDING_KEY) === "true") {
    createPrologue();
  }
})();
