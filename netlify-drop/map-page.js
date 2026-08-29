const CLUE_STORAGE_KEY = "qingdeng-weigui:viewed-clues";
const ELDER_LOGIN_STORAGE_KEY = "hasLoggedLuXingzhou";
const ACTIVE_JADE_ACCOUNT_STORAGE_KEY = "qingdeng-weigui:jade-active-account";
const ELDER_WEN_MESSAGE_VIEWED_STORAGE_KEY = "qingdeng-weigui:xz000-wen-message-viewed";
const MAP_TWO_PERMANENT_UNLOCK_KEY = "qingdeng-weigui:map-two-unlocked";

const MOUNTAIN_MAP_IMAGES = {
  base: "./assets/maps/地图1.png?v=20260727b",
  revealed: "./assets/maps/地图2.png?v=20260727b",
};

function loadSet(key) {
  try {
    const raw = localStorage.getItem(key);

    if (!raw) {
      return new Set();
    }

    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      return new Set();
    }

    return new Set(parsed.filter((item) => typeof item === "string"));
  } catch {
    return new Set();
  }
}

function saveSet(key, setValue) {
  try {
    localStorage.setItem(key, JSON.stringify([...setValue]));
  } catch {
    // Ignore storage failures for standalone map page.
  }
}

function hasOldWellAccess() {
  const conditionsMet =
    localStorage.getItem(ELDER_LOGIN_STORAGE_KEY) === "true" &&
    localStorage.getItem(ACTIVE_JADE_ACCOUNT_STORAGE_KEY) === "lxz" &&
    localStorage.getItem(ELDER_WEN_MESSAGE_VIEWED_STORAGE_KEY) === "true";

  if (conditionsMet) {
    localStorage.setItem(MAP_TWO_PERMANENT_UNLOCK_KEY, "true");
  }

  return localStorage.getItem(MAP_TWO_PERMANENT_UNLOCK_KEY) === "true";
}

function renderMapPage() {
  const viewedClues = loadSet(CLUE_STORAGE_KEY);
  const oldWellUnlocked = hasOldWellAccess();
  const mapSrc = oldWellUnlocked ? MOUNTAIN_MAP_IMAGES.revealed : MOUNTAIN_MAP_IMAGES.base;
  const app = document.querySelector("#map-app");

  app.innerHTML = `
    <section class="page-grid">
      <article class="paper-panel hero-panel">
        <p class="hero-overline">旧图查验 · 山门暗点</p>
        <h1>山门地图</h1>
        <p class="hero-copy">
          此页为独立调阅页面，不与宗门首页混排。旧图若有显隐，以已查得线索为准。
        </p>
        <div class="hero-meta">
          <span class="meta-pill">当前图册：${oldWellUnlocked ? "地图二" : "地图一"}</span>
        </div>
      </article>

      <article class="paper-panel map-panel">
        <div class="panel-heading">
          <p class="panel-kicker">旧图残注</p>
          <h2>山门总图对照</h2>
        </div>
        <div class="map-layout">
          <figure class="map-figure">
            <img src="${mapSrc}" alt="青岚宗山门地图" loading="lazy" />
    <a
      class="map-hotspot map-hotspot--sutra-vault"
      href="./library-panorama.html"
      target="_blank"
      rel="noopener"
      aria-label="进入藏经阁全景查看"
      title="进入藏经阁全景查看"
    >
      <span class="sr-only">进入藏经阁全景查看</span>
    </a>
    <a
      class="map-hotspot map-hotspot--empty-courtyard"
      href="./empty-courtyard.html"
      target="_blank"
      rel="noopener"
      aria-label="进入空翠院查看"
      title="进入空翠院查看"
    >
      <span class="sr-only">进入空翠院查看</span>
    </a>
    <a
      class="map-hotspot map-hotspot--soul-lantern"
      href="./soul-lantern-sealed.html"
      target="_blank"
      rel="noopener"
      aria-label="进入魂灯房查看"
      title="进入魂灯房查看"
    >
      <span class="sr-only">进入魂灯房查看</span>
    </a>
    <a
      class="map-hotspot map-hotspot--pharmacy"
      href="./pharmacy.html"
      target="_blank"
      rel="noopener"
      aria-label="进入药堂查看"
      title="进入药堂查看"
    >
      <span class="sr-only">进入药堂查看</span>
    </a>
    ${
      oldWellUnlocked
        ? `<a
      class="map-hotspot map-hotspot--old-well"
      href="./old-well.html"
      target="_blank"
      rel="noopener"
      aria-label="进入旧井查看"
      title="进入旧井查看"
    >
      <span class="sr-only">进入旧井查看</span>
    </a>`
        : ""
    }
            ${oldWellUnlocked ? "<figcaption>地图二已显出旧井点位。</figcaption>" : ""}
          </figure>

          ${
            oldWellUnlocked
              ? `
                <div class="map-side">
                  <div class="map-note">
                    <p>旧井点位已显现，查看残注与封存卷宗。</p>
                    <p class="detail-note">旧图残注：此处旧名归墟井。</p>
                    <div class="detail-actions">
                      <button type="button" class="dossier-button" data-open-dossier>“归墟井”隐藏卷宗</button>
                    </div>
                  </div>
                  <div class="dossier-card" id="map-dossier" hidden>
                    <div class="dossier-head">
                      <p class="detail-code">卷宗编号：HT-031</p>
                      <h3>卷宗名称：归墟井</h3>
                    </div>
                    <dl class="dossier-meta">
                      <div>
                        <dt>卷宗来源</dt>
                        <dd>后山旧图、魂灯房残档、藏经阁禁卷合参</dd>
                      </div>
                      <div>
                        <dt>封存等级</dt>
                        <dd><span class="text-alert">禁阅</span></dd>
                      </div>
                      <div>
                        <dt>开启条件</dt>
                        <dd>旧井点位已显现</dd>
                      </div>
                    </dl>
                    <div class="dossier-body">
                      <p>归墟井，旧称“回魂井”。据最早记载，此井用来封印了一只被九位大能联手镇压的邪祟。青岚宗必须时刻留意井口异动，一旦异动必须献祭一名魂力圆满者进行镇压。</p>
                      <p>为寻魂力圆满者，建立魂灯房进行查看。</p>
                      <p>井口常年不见日光，霜降前后有青雾自井中上涌。久而久之弥漫进问心岭。初代宗主曾命人以镇石封井，并立禁令：</p>
                      <p>凡外门弟子，不得近井。</p>
                      <p>凡夜间闻井中呼名者，<span class="text-alert">不得应</span>。</p>
                      <p>后因山道改修，归墟井自地图中抹去，改记为“旧井”。近二十年来，宗门公开卷宗中再无此名。</p>
                    </div>
                  </div>
                </div>
              `
              : `
                <div class="map-side map-side--locked">
                </div>
              `
          }
        </div>
      </article>
    </section>
  `;

  document.querySelector("[data-open-dossier]")?.addEventListener("click", () => {
    viewedClues.add("map:old-well");
    saveSet(CLUE_STORAGE_KEY, viewedClues);
    const dossier = document.querySelector("#map-dossier");

    if (dossier) {
      dossier.hidden = false;
      dossier.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });

}

document.querySelectorAll("[data-back-home]").forEach((button) => {
  button.addEventListener("click", () => {
    window.location.href = "./index.html#/home";
  });
});

renderMapPage();

window.addEventListener("pageshow", (event) => {
  if (event.persisted) {
    renderMapPage();
  }
});

document.addEventListener("visibilitychange", () => {
  if (!document.hidden) {
    renderMapPage();
  }
});

window.addEventListener("storage", (event) => {
  if (
    event.key === ELDER_LOGIN_STORAGE_KEY ||
    event.key === ACTIVE_JADE_ACCOUNT_STORAGE_KEY ||
    event.key === ELDER_WEN_MESSAGE_VIEWED_STORAGE_KEY
  ) {
    renderMapPage();
  }
});
