(() => {
  if (window.__qingDengTeaRoomSkinLoaded) return;
  window.__qingDengTeaRoomSkinLoaded = true;

  const compact = (value) => (value || "").replace(/\s+/g, "");
  const postMarkers = [
    "【新人求问】",
    "【避雷】",
    "【外门日常】",
    "【失物】",
    "【求助】魂灯房修缮",
    "【藏经阁】",
    "【药堂】",
    "【怪谈】",
    "【匿名】",
    "【已锁帖】",
    "玉牒编号到底怎么写",
    "后山青雾里有人喊“行舟”"
  ];

  const isVisible = (element) => {
    if (!element) return false;

    const rect = element.getBoundingClientRect();
    const style = window.getComputedStyle(element);
    return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0 && rect.height > 0;
  };

  const hasVisibleText = (text) => {
    const wanted = compact(text);
    return [...document.body.querySelectorAll("*")].some(
      (element) => isVisible(element) && compact(element.textContent).includes(wanted)
    );
  };

  const findSmallestTextNode = (text) => {
    const wanted = compact(text);

    return [...document.body.querySelectorAll("*")]
      .filter(isVisible)
      .filter((element) => compact(element.textContent).includes(wanted))
      .filter((element) => ![...element.children].some((child) => compact(child.textContent).includes(wanted)))
      .sort((firstElement, secondElement) => {
        const first = firstElement.getBoundingClientRect();
        const second = secondElement.getBoundingClientRect();
        return first.width * first.height - second.width * second.height;
      })[0] || null;
  };

  const findSurface = (node, minimumHeight) => {
    let fallback = null;

    for (let current = node; current && current !== document.body; current = current.parentElement) {
      const rect = current.getBoundingClientRect();
      const className = typeof current.className === "string" ? current.className : "";
      const likelySurface =
        /forum|tea|post|thread|topic|article|card|panel|board|section|side|rule|tag/i.test(className) ||
        current.matches("article, li, section, button");

      if (isVisible(current) && rect.width > 220 && rect.height > minimumHeight && rect.width < window.innerWidth * 0.98) {
        fallback ||= current;

        if (likelySurface) return current;
      }
    }

    return fallback;
  };

  const decorate = (text, className, minimumHeight) => {
    const node = findSmallestTextNode(text);
    const surface = findSurface(node, minimumHeight);
    surface?.classList.add(className);
  };

  const clearTeaRoomSkin = () => {
    document.documentElement.classList.remove("tea-room-skin-page");
    document.querySelectorAll(".tea-room-skin-intro, .tea-room-skin-post, .tea-room-skin-rules, .tea-room-skin-tags")
      .forEach((element) => element.classList.remove(
        "tea-room-skin-intro",
        "tea-room-skin-post",
        "tea-room-skin-rules",
        "tea-room-skin-tags"
      ));
  };

  const applyTeaRoomSkin = () => {
    const isTeaRoom =
      hasVisibleText("山门茶寮") &&
      (hasVisibleText("木牌三则") || hasVisibleText("茶牌木签") || hasVisibleText("帖子列表"));

    if (!isTeaRoom) {
      clearTeaRoomSkin();
      return;
    }

    document.documentElement.classList.add("tea-room-skin-page");
    decorate("青岚宗外门弟子与入宗候选人交流区", "tea-room-skin-intro", 120);
    decorate("木牌三则", "tea-room-skin-rules", 180);
    decorate("茶牌木签", "tea-room-skin-tags", 160);
    postMarkers.forEach((marker) => decorate(marker, "tea-room-skin-post", 80));
  };

  let scheduled = false;
  const schedule = () => {
    if (scheduled) return;

    scheduled = true;
    requestAnimationFrame(() => {
      scheduled = false;
      applyTeaRoomSkin();
    });
  };

  window.addEventListener("DOMContentLoaded", schedule);
  window.addEventListener("hashchange", schedule);
  window.addEventListener("popstate", schedule);

  new MutationObserver(schedule).observe(document.documentElement, {
    childList: true,
    subtree: true
  });

  schedule();
})();
