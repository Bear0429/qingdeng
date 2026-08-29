(function () {
  "use strict";

  var postMarkers = [
    "【新人求问】", "【避雷】", "【外门日常】", "【失物】", "【求助】",
    "【藏经阁】", "【药堂】", "【怪谈】", "【匿名】", "【已锁帖】",
    "玉牒编号到底怎么写"
  ];
  function textOf(node) {
    return (node && node.textContent ? node.textContent : "").replace(/\s+/g, "");
  }

  function isCard(node) {
    if (!node || node === document.body || node === document.documentElement) return false;
    var rect = node.getBoundingClientRect();
    var className = typeof node.className === "string" ? node.className : "";
    var tag = node.tagName.toLowerCase();
    return rect.width >= 240 && rect.height >= 55 &&
      (tag === "article" || tag === "li" ||
        /card|post|topic|thread|item|panel|rule|tag|sidebar/i.test(className));
  }

  function mark(node, role) {
    var current = node;
    var fallback = null;
    for (var depth = 0; current && current !== document.body && depth < 10; depth += 1) {
      var value = textOf(current);
      if (isCard(current) && value.length >= 12 && value.length <= 1600) {
        current.setAttribute("data-forum-asset", role);
        return;
      }
      if (current.getBoundingClientRect().width >= 240 && current.getBoundingClientRect().height >= 55) {
        fallback = current;
      }
      current = current.parentElement;
    }
    if (fallback) {
      fallback.setAttribute("data-forum-asset", role);
    }
  }

  function markMatching(predicate, role) {
    Array.prototype.slice.call(document.querySelectorAll("body *")).forEach(function (node) {
      if (predicate(textOf(node), node)) mark(node, role);
    });
  }

  function applyAssets() {
    if (!document.body) return;
    document.body.classList.add("forum-assets-live-20260803");
    document.body.style.setProperty(
      "background-image",
      "url('./assets/tea-room/shanmen-tearoom-base.png?v=20260810')",
      "important"
    );

    markMatching(function (value) {
      return postMarkers.some(function (marker) { return value.indexOf(marker) !== -1; });
    }, "post");

    markMatching(function (value) {
      return value.indexOf("木牌三则") !== -1;
    }, "rules");

    markMatching(function (value) {
      return value.indexOf("茶牌木签") !== -1 ||
        value.indexOf("板块一览") !== -1 ||
        value.indexOf("当前分栏") !== -1;
    }, "tags");
  }

  function init() {
    applyAssets();
    window.setTimeout(applyAssets, 200);
    window.setTimeout(applyAssets, 700);
    if (window.MutationObserver) {
      var observer = new MutationObserver(applyAssets);
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
