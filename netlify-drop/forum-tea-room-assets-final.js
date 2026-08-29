(function () {
  "use strict";

  var postMarkers = [
    "【新人求问】", "【避雷】", "【外门日常】", "【失物】", "【求助】",
    "【藏经阁】", "【药堂】", "【怪谈】", "【匿名】", "【已锁帖】", "玉牒编号到底怎么写"
  ];

  function normalizedText(element) {
    return (element && element.textContent ? element.textContent : "").replace(/\s+/g, "");
  }

  function isUsefulCard(element) {
    if (!element || element === document.body) return false;
    var rect = element.getBoundingClientRect();
    if (rect.width < 260 || rect.height < 55) return false;
    var text = normalizedText(element);
    if (text.length < 18 || text.length > 1200) return false;
    var name = element.tagName + " " + (typeof element.className === "string" ? element.className : "");
    return /ARTICLE|LI|CARD|POST|TOPIC|THREAD|ITEM|PANEL|SIDE|RULE|TAG/i.test(name) ||
      getComputedStyle(element).borderTopWidth !== "0px" ||
      getComputedStyle(element).borderLeftWidth !== "0px";
  }

  function markNearest(element, role) {
    var current = element;
    var fallback = null;
    for (var depth = 0; current && current !== document.body && depth < 9; depth += 1) {
      if (isUsefulCard(current)) {
        fallback = current;
        var name = current.tagName + " " + (typeof current.className === "string" ? current.className : "");
        if (/ARTICLE|LI|CARD|POST|TOPIC|THREAD|ITEM/i.test(name)) break;
      }
      current = current.parentElement;
    }
    if (fallback) fallback.setAttribute("data-tea-asset", role);
  }

  function markAssets() {
    if (!document.body) return;
    document.body.classList.add("forum-tea-room-assets-final");

    var elements = Array.prototype.slice.call(document.querySelectorAll("body *"));
    elements.forEach(function (element) {
      var text = normalizedText(element);
      if (!text || text.length > 180) return;

      if (postMarkers.some(function (marker) { return text.indexOf(marker) !== -1; })) {
        markNearest(element, "post");
      }
      if (text.indexOf("木牌三则") !== -1) {
        markNearest(element, "rules");
      }
      if (text.indexOf("茶牌木签") !== -1 || text.indexOf("板块一览") !== -1) {
        markNearest(element, "tags");
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
      window.setTimeout(function () { observer.disconnect(); }, 3500);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
