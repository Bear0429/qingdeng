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

  function cleanText(element) {
    return (element && element.textContent ? element.textContent : "")
      .replace(/\s+/g, "");
  }

  function addClosestPost(element) {
    var card = element.closest(
      "article, li, .post-card, .post-item, .thread-card, .topic-card, .forum-post, [class*='post'], [class*='thread'], [class*='topic']"
    );
    if (!card) {
      var current = element.parentElement;
      for (var i = 0; current && current !== document.body && i < 4; i += 1) {
        if (cleanText(current).length < 900) {
          card = current;
          break;
        }
        current = current.parentElement;
      }
    }
    if (card) card.classList.add("forum-asset-post");
  }

  function addClosestPanel(element, className) {
    var panel = element.closest(
      "aside, article, section, .card, .panel, .sidebar, [class*='side'], [class*='rule'], [class*='tag']"
    );
    if (!panel) panel = element.parentElement;
    if (panel) panel.classList.add(className);
  }

  function markAssets() {
    document.body.classList.add("forum-tea-room-assets");

    var elements = Array.prototype.slice.call(
      document.querySelectorAll("body h1, body h2, body h3, body h4, body h5, body h6, body a, body button")
    );
    elements.forEach(function (element) {
      var value = cleanText(element);
      if (postMarkers.some(function (marker) { return value.indexOf(marker) !== -1; })) {
        addClosestPost(element);
      }
      if (value === "木牌三则") addClosestPanel(element, "forum-asset-rules");
      if (value === "茶牌木签") addClosestPanel(element, "forum-asset-tags");
    });
  }

  function init() {
    markAssets();
    var observer = new MutationObserver(markAssets);
    observer.observe(document.body, { childList: true, subtree: true });
    window.setTimeout(function () { observer.disconnect(); }, 2500);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
