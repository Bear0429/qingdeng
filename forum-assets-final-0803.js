(function () {
  "use strict";

  var postMarkers = [
    "【新人求问】", "【避雷】", "【外门日常】", "【失物】", "【求助】",
    "【藏经阁】", "【药堂】", "【怪谈】", "【匿名】", "【已锁帖】", "玉牒编号到底怎么写"
  ];

  function textOf(node) {
    return (node && node.textContent ? node.textContent : "").replace(/\\s+/g, "");
  }

  function isUsefulCard(node) {
    if (!node || node === document.body) return false;
    var rect = node.getBoundingClientRect();
    if (rect.width < 260 || rect.height < 55) return false;
    var className = typeof node.className === "string" ? node.className : "";
    var tag = node.tagName.toLowerCase();
    return tag === "article" || tag === "li" || /card|post|topic|thread|item|panel|rule|tag/i.test(className);
  }

  function markNearest(node, role) {
    var current = node;
    var fallback = node.parentElement;
    for (var depth = 0; current && current !== document.body && depth < 9; depth += 1) {
      var content = textOf(current);
      if (isUsefulCard(current) && content.length >= 20 && content.length <= 1400) {
        current.setAttribute("data-forum-asset", role);
        return;
      }
      if (current.getBoundingClientRect().width >= 260 && current.getBoundingClientRect().height >= 55) {
        fallback = current;
      }
      current = current.parentElement;
    }
    if (fallback) fallback.setAttribute("data-forum-asset", role);
  }

  function markPage() {
    if (!document.body) return;
    document.body.classList.add("forum-assets-final-0803");
    var nodes = Array.prototype.slice.call(document.querySelectorAll("h1,h2,h3,h4,h5,h6,a,button,[role='button']"));
    nodes.forEach(function (node) {
      var value = textOf(node);
      if (postMarkers.some(function (marker) { return value.indexOf(marker) !== -1; })) {
        markNearest(node, "post");
      }
      if (value.indexOf("木牌三则") !== -1) markNearest(node, "rules");
      if (value.indexOf("茶牌木签") !== -1 || value.indexOf("板块一览") !== -1) markNearest(node, "tags");
    });
  }

  function init() {
    markPage();
    window.setTimeout(markPage, 200);
    window.setTimeout(markPage, 700);
    if (window.MutationObserver) {
      var observer = new MutationObserver(markPage);
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
