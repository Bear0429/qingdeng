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
    return (element && element.textContent ? element.textContent : "").replace(/\s+/g, "");
  }

  function visibleBox(element) {
    var rect = element.getBoundingClientRect();
    return rect.width >= 260 && rect.height >= 55;
  }

  function hasCardSignal(element) {
    var tag = element.tagName.toLowerCase();
    var className = typeof element.className === "string" ? element.className : "";
    var style = window.getComputedStyle(element);
    return tag === "article" || tag === "li" || /card|post|topic|thread|item|panel|side|rule|tag/i.test(className) ||
      style.borderTopWidth !== "0px" || style.borderLeftWidth !== "0px" ||
      (style.backgroundColor !== "rgba(0, 0, 0, 0)" && style.backgroundColor !== "transparent");
  }

  function closestCard(element, role) {
    var current = element;
    var fallback = null;
    for (var depth = 0; current && current !== document.body && depth < 8; depth += 1) {
      var text = cleanText(current);
      if (visibleBox(current) && text.length <= 1100) {
        fallback = current;
        if (hasCardSignal(current) && text.length >= 30) {
          current.setAttribute("data-tea-room-role", role);
          return current;
        }
      }
      current = current.parentElement;
    }
    if (fallback) fallback.setAttribute("data-tea-room-role", role);
    return fallback;
  }

  function markAssets() {
    document.body.classList.add("forum-tea-room-final");

    var headings = Array.prototype.slice.call(document.querySelectorAll("body h1, body h2, body h3, body h4, body h5, body h6, body a, body button"));
    headings.forEach(function (element) {
      var value = cleanText(element);
      if (postMarkers.some(function (marker) { return value.indexOf(marker) !== -1; })) {
        var post = closestCard(element, "post");
        if (post) post.classList.add("forum-asset-post");
      }
      if (value.indexOf("木牌三则") !== -1) {
        var rules = closestCard(element, "rules");
        if (rules) rules.classList.add("forum-asset-rules");
      }
      if (value.indexOf("茶牌木签") !== -1 || value.indexOf("板块一览") !== -1) {
        var tags = closestCard(element, "tags");
        if (tags) tags.classList.add("forum-asset-tags");
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
