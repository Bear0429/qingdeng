(function () {
  "use strict";

  var postMarkers = [
    "【新人求问】",
    "【避雷】",
    "【外门日常】",
    "【失物】",
    "【求助】",
    "【藏经阁】",
    "【药堂】",
    "【怪谈】",
    "【匿名】",
    "【已锁帖】",
    "玉牒编号到底怎么写"
  ];

  function textOf(element) {
    return (element && element.textContent ? element.textContent : "").replace(/\s+/g, "");
  }

  function addPostClass(element) {
    var card = element.closest(
      "article, li, .post-card, .post-item, .thread-card, .topic-card, .forum-post, [class*='post'], [class*='thread'], [class*='topic']"
    );
    if (!card) card = element.parentElement;
    if (card) card.classList.add("forum-asset-post");
  }

  function addPanelClass(element, className) {
    if (!element) return;
    var panel = element.closest(
      "aside, article, section, .card, .panel, .sidebar, [class*='side'], [class*='rule'], [class*='tag']"
    );
    if (!panel) panel = element.parentElement;
    if (panel) panel.classList.add(className);
  }

  function markAssets() {
    document.body.classList.add("forum-asset-page");

    var elements = Array.prototype.slice.call(document.querySelectorAll("body *"));
    elements.forEach(function (element) {
      var value = textOf(element);
      if (postMarkers.some(function (marker) { return value.indexOf(marker) !== -1; })) {
        addPostClass(element);
      }
      if (value === "木牌三则") addPanelClass(element, "forum-asset-rules");
      if (value === "茶牌木签") addPanelClass(element, "forum-asset-tags");
    });
  }

  function init() {
    markAssets();
    var observer = new MutationObserver(markAssets);
    observer.observe(document.body, { childList: true, subtree: true });
    window.setTimeout(function () { observer.disconnect(); }, 2000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
