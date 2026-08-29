(function () {
  "use strict";

  var postMarkers = [
    "【新人求问】", "【避雷】", "【外门日常】", "【失物】", "【求助】",
    "【藏经阁】", "【药堂】", "【怪谈】", "【匿名】", "【已锁帖】", "玉牒编号到底怎么写"
  ];

  function textOf(node) {
    return (node && node.textContent ? node.textContent : "").replace(/\s+/g, "");
  }

  function pickCard(node, role) {
    var current = node;
    var fallback = null;
    for (var depth = 0; current && current !== document.body && depth < 10; depth += 1) {
      var rect = current.getBoundingClientRect();
      var text = textOf(current);
      var className = typeof current.className === "string" ? current.className : "";
      if (rect.width > 260 && rect.height > 70 && text.length < 1300) {
        fallback = current;
        if (/article|card|post|topic|thread|item|panel|rule|tag/i.test(className) || current.tagName === "ARTICLE" || current.tagName === "LI") {
          current.setAttribute("data-tea-art", role);
          return;
        }
      }
      current = current.parentElement;
    }
    if (fallback) fallback.setAttribute("data-tea-art", role);
  }

  function mark() {
    if (!document.body) return;
    document.body.classList.add("tea-room-assets-ready");

    var candidates = Array.prototype.slice.call(document.querySelectorAll("body h1, body h2, body h3, body h4, body h5, body h6, body a, body button, body li, body article"));
    candidates.forEach(function (node) {
      var value = textOf(node);
      if (postMarkers.some(function (marker) { return value.indexOf(marker) !== -1; })) {
        pickCard(node, "post");
      }
      if (value.indexOf("木牌三则") !== -1) pickCard(node, "rules");
      if (value.indexOf("茶牌木签") !== -1 || value.indexOf("板块一览") !== -1) pickCard(node, "tags");
    });
  }

  function init() {
    mark();
    window.setTimeout(mark, 250);
    window.setTimeout(mark, 800);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
