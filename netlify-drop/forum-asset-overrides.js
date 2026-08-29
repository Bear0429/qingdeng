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

  function compactText(element) {
    return (element && element.textContent ? element.textContent : "").replace(/\s+/g, "");
  }

  function closestCard(element) {
    if (!element) return null;
    return element.closest(
      "article, li, .post-card, .post-item, .thread-card, .topic-card, .card, [class*='post'], [class*='thread'], [class*='topic']"
    ) || element.parentElement;
  }

  function markForumAssets() {
    var elements = Array.prototype.slice.call(document.querySelectorAll("body *"));
    var description = elements.find(function (element) {
      return compactText(element).indexOf("青岚宗外门弟子与入宗候选人交流区") !== -1;
    });
    var pagePanel = description && description.closest("main, section, .forum-page, .forum-shell, .page-shell, .content");

    document.body.classList.add("forum-asset-page");
    if (pagePanel) pagePanel.classList.add("forum-asset-page");

    var rulesHeading = elements.find(function (element) {
      return compactText(element) === "木牌三则";
    });
    var tagsHeading = elements.find(function (element) {
      return compactText(element) === "茶牌木签";
    });
    var rulesPanel = rulesHeading && (rulesHeading.closest("aside, section, article, .card, [class*='side'], [class*='rule']") || rulesHeading.parentElement);
    var tagsPanel = tagsHeading && (tagsHeading.closest("aside, section, article, .card, [class*='side'], [class*='tag']") || tagsHeading.parentElement);

    if (rulesPanel) rulesPanel.classList.add("forum-asset-rules");
    if (tagsPanel) tagsPanel.classList.add("forum-asset-tags");

    var candidates = Array.prototype.slice.call(document.querySelectorAll(
      "article, li, .post-card, .post-item, .thread-card, .topic-card, [class*='post'], [class*='thread'], [class*='topic']"
    ));
    var marked = false;

    candidates.forEach(function (element) {
      if (postMarkers.some(function (marker) { return compactText(element).indexOf(marker) !== -1; })) {
        element.classList.add("forum-asset-post");
        marked = true;
      }
    });

    if (!marked) {
      elements.forEach(function (element) {
        if (postMarkers.some(function (marker) { return compactText(element).indexOf(marker) !== -1; })) {
          var card = closestCard(element);
          if (card) card.classList.add("forum-asset-post");
        }
      });
    }
  }

  function init() {
    markForumAssets();
    var observer = new MutationObserver(function () {
      markForumAssets();
    });
    observer.observe(document.body, { childList: true, subtree: true });
    window.setTimeout(function () { observer.disconnect(); }, 1800);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
