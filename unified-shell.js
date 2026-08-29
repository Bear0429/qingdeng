(() => {
  if (window.top !== window.self) {
    return;
  }

  const SCENE_QUERY_KEY = "scene";
  const LOCAL_HTML_PATTERN = /\.html$/i;

  const shell = document.createElement("section");
  shell.className = "unified-game-shell";
  shell.setAttribute("aria-label", "青灯未归游戏场景");
  shell.innerHTML = `
    <button class="unified-game-shell__back" type="button" data-unified-shell-home>
      返回宗门首页
    </button>
    <iframe
      class="unified-game-shell__frame"
      data-unified-shell-frame
      title="青灯未归游戏场景"
      src="about:blank"
    ></iframe>
    <p class="unified-game-shell__loading" data-unified-shell-loading>卷宗载入中……</p>
  `;
  document.body.append(shell);

  const frame = shell.querySelector("[data-unified-shell-frame]");
  const homeButton = shell.querySelector("[data-unified-shell-home]");

  function getSceneValue() {
    return new URL(window.location.href).searchParams.get(SCENE_QUERY_KEY) || "";
  }

  function getPageName(url) {
    const parsed = new URL(url, window.location.href);
    return parsed.pathname.split("/").pop() || "";
  }

  function isIndexPage(url) {
    return getPageName(url).toLowerCase() === "index.html";
  }

  function isLocalHtml(url) {
    const parsed = new URL(url, window.location.href);
    return parsed.origin === window.location.origin && LOCAL_HTML_PATTERN.test(parsed.pathname);
  }

  function toSceneValue(url) {
    const parsed = new URL(url, window.location.href);
    return `${parsed.pathname.replace(/^\//, "")}${parsed.search}${parsed.hash}`;
  }

  function setTopScene(sceneValue, mode = "pushState") {
    const nextUrl = new URL(window.location.href);

    if (sceneValue) {
      nextUrl.searchParams.set(SCENE_QUERY_KEY, sceneValue);
    } else {
      nextUrl.searchParams.delete(SCENE_QUERY_KEY);
      nextUrl.hash = "/home";
    }

    window.history[mode]({}, "", nextUrl);
  }

  function showShell() {
    shell.classList.add("is-open");
    document.body.classList.add("has-unified-scene");
  }

  function hideShell() {
    shell.classList.remove("is-open");
    document.body.classList.remove("has-unified-scene");
    frame.classList.remove("is-ready");
    frame.src = "about:blank";
  }

  function closeScene({ updateHistory = true } = {}) {
    if (updateHistory) {
      setTopScene("");
    }
    hideShell();
  }

  function handleSceneAnchorClick(event) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }

    const anchor = event.target.closest?.("a[href]");

    if (!anchor || !isLocalHtml(anchor.href)) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    if (isIndexPage(anchor.href)) {
      closeScene();
      return;
    }

    window.QingdengGameShell.openScene(anchor.href);
  }

  function installFrameBridge() {
    const frameDocument = frame.contentDocument;
    const frameWindow = frame.contentWindow;

    if (!frameDocument || !frameWindow) {
      return;
    }

    frameDocument.addEventListener("click", handleSceneAnchorClick, true);

    frameWindow.open = (url) => {
      if (url && isLocalHtml(url) && !isIndexPage(url)) {
        window.QingdengGameShell.openScene(url);
      }
      return null;
    };
  }

  function handleFrameLoad() {
    frame.classList.add("is-ready");

    let frameUrl;
    try {
      frameUrl = new URL(frame.contentWindow.location.href);
    } catch {
      return;
    }

    if (isIndexPage(frameUrl.href)) {
      closeScene();
      return;
    }

    if (isLocalHtml(frameUrl.href)) {
      const frameSceneValue = toSceneValue(frameUrl.href);
      if (getSceneValue() !== frameSceneValue) {
        setTopScene(frameSceneValue, "replaceState");
      }
    }

    installFrameBridge();
  }

  function loadScene(sceneValue) {
    if (!sceneValue) {
      closeScene({ updateHistory: false });
      return;
    }

    const targetUrl = new URL("/" + sceneValue, window.location.origin);

    if (!isLocalHtml(targetUrl.href) || isIndexPage(targetUrl.href)) {
      closeScene({ updateHistory: false });
      return;
    }

    showShell();
    frame.classList.remove("is-ready");
    frame.src = targetUrl.href;
  }

  function openScene(url, { replace = false } = {}) {
    if (!isLocalHtml(url) || isIndexPage(url)) {
      closeScene();
      return;
    }

    const sceneValue = toSceneValue(url);
    setTopScene(sceneValue, replace ? "replaceState" : "pushState");
    loadScene(sceneValue);
  }

  window.QingdengGameShell = { closeScene, openScene };
  document.addEventListener("click", handleSceneAnchorClick, true);
  frame.addEventListener("load", handleFrameLoad);
  homeButton.addEventListener("click", () => closeScene());
  window.addEventListener("popstate", () => loadScene(getSceneValue()));

  const initialScene = getSceneValue();
  if (initialScene) {
    loadScene(initialScene);
  }
})();
