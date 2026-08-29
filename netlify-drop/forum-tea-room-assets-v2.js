(function () {
  "use strict";

  var postMarkers = [
    "【新人求问】", "【避雷】", "【外门日常】", "【失物】", "【求助】",
    "【藏经阁】", "【药堂】", "【怪谈】", "【匿名】", "【已锁帖】",
    "玉牒编号到底怎么写"
  ];

  function textOf(element) {
    return (element && element.textContent ? element.textContent : "").replace(/\s+/g, "");
  }

  function addRole(element, role) {
    if (!element) return;
    var card = element.closest(
      "article, li, .post-card, .post-item, .thread-card, .topic-card, .forum-post, .thread, .topic"
    );
    if (!card) {
      card = element.parentElement;
      for (var i = 0; card && card !== document.body && i < 7; i += 1) {
        var rect = card.getBoundingClientRect();
        if (rect.width >= 260 && rect.height >= 55) break;
        card = card.parentElement;
      }
    }
    if (card && card !== document.body) card.setAttribute("data-tea-room-role", role);
  }

  function markAssets() {
    document.body.classList.add("forum-tea-room-assets-v2");
    var candidates = document.querySelectorAll("h1, h2, h3, h4, h5, h6, a, button");
    Array.prototype.forEach.call(candidates, function (element) {
      var text = textOf(element);
      if (postMarkers.some(function (marker) { return text.indexOf(marker) !== -1; })) {
        addRole(element, "post");
      }
      if (text.indexOf("木牌三则") !== -1) addRole(element, "rules");
      if (text.indexOf("茶牌木签") !== -1 || text.indexOf("板块一览") !== -1) {
        addRole(element, "tags");
      }
    });
  }

  function init() {
    markAssets();
    window.setTimeout(markAssets, 250);
    window.setTimeout(markAssets, 800);
    if (window.MutationObserver) {
      var observer = new MutationObserver(markAssets);
      observer.observe(document.body, { childList: true, subtree: true });
      window.setTimeout(function () { observer.disconnect(); }, 3000);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
