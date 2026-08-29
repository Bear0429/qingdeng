(function () {
  "use strict";

  function compactText(element) {
    return element && element.textContent
      ? element.textContent.replace(/\s+/g, "")
      : "";
  }

  function markTeaRoomIntro() {
    var headings = Array.prototype.slice.call(
      document.querySelectorAll("h1, h2, h3, h4, h5, h6")
    );
    var heading = headings.find(function (element) {
      return compactText(element).indexOf("山门茶寮") !== -1;
    });

    if (!heading) return;

    var current = heading;
    for (var depth = 0; current && current !== document.body && depth < 9; depth += 1) {
      var rect = current.getBoundingClientRect();
      if (rect.width >= 600 && rect.height >= 180 && rect.height <= 600) {
        current.setAttribute("data-tea-room-surface", "intro");
        return;
      }
      current = current.parentElement;
    }

    // Keep a fallback marker if the page's layout uses an unusually tall card.
    var fallback = heading.parentElement && heading.parentElement.parentElement;
    if (fallback) fallback.setAttribute("data-tea-room-surface", "intro");
  }

  function init() {
    if (!document.body) return;
    document.body.classList.add("forum-tea-room-latest");
    markTeaRoomIntro();
    window.setTimeout(markTeaRoomIntro, 200);
    window.setTimeout(markTeaRoomIntro, 800);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
