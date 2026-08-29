(function () {
  "use strict";

  var postMarkers = [
    "【新人求问】", "【避雷】", "【外门日常】", "【失物】", "【求助】",
    "【藏经阁】", "【药堂】", "【怪谈】", "【匿名】", "【已锁帖】", "玉牒编号到底怎么写"
  ];

  function textOf(element) {
    return (element && element.textContent ? element.textContent : "").replace(/\s+/g, "");
  }

  function markClosest(element, role) {
    var current = element;
    for (var depth = 0; current && current !== document.body && depth < 8; depth += 1) {
      var rect = current.getBoundingClientRect();
      var name = current.tagName + " " + (typeof current.className === "string" ? current.className : "");
      if (rect.width > 260 && rect.height > 50 && /ARTICLE|LI|CARD|POST|TOPIC|THREAD|ITEM/i.test(name)) {
        current.setAttribute("data-forum-direct", role);
        return;
      }
      current = current.parentElement;
    }
    if (element.parentElement) element.parentElement.setAttribute("data-forum-direct", role);
  }

  function markAssets() {
    if (!document.body) return;
    document.body.classList.add("forum-assets-direct-0803");
    Array.prototype.slice.call(document.querySelectorAll("h1,h2,h3,h4,h5,h6,a,button,[role='button']")).forEach(function (element) {
      var value = textOf(element);
      if (postMarkers.some(function (marker) { return value.indexOf(marker) !== -1; })) markClosest(element, "post");
      if (value.indexOf("木牌三则") !== -1) markClosest(element, "rules");
      if (value.indexOf("茶牌木签") !== -1 || value.indexOf("板块一览") !== -1) markClosest(element, "tags");
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

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", init, { once: true });
  else init();
})();
