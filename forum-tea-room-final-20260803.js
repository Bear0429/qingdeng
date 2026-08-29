(function () {
  "use strict";

  function compactText(element) {
    return element && element.textContent
      ? element.textContent.replace(/\s+/g, "")
      : "";
  }

  function findTeaRoomTitle() {
    var candidates = Array.prototype.slice.call(
      document.querySelectorAll("h1, h2, h3, h4, h5, h6, [class*='title'], [class*='hero'], section, article")
    );

    return candidates.find(function (element) {
      var value = compactText(element);
      return value === "山门茶寮" || value.indexOf("山门茶寮") !== -1;
    });
  }

  function markTeaRoomIntro() {
    var heading = findTeaRoomTitle();
    if (!heading) return;

    var current = heading;
    var best = heading.parentElement;
    for (var depth = 0; current && current !== document.body && depth < 10; depth += 1) {
      var rect = current.getBoundingClientRect();
      var value = compactText(current);
      var looksLikeIntro =
        value.indexOf("青岚宗外门弟子与入宗候选人交流区") !== -1 ||
        value.indexOf("茶帖存档") !== -1 ||
        value.indexOf("当前分栏") !== -1;

      if (looksLikeIntro || (rect.width >= 600 && rect.height >= 150 && rect.height <= 520)) {
        best = current;
      }

      if (rect.width >= window.innerWidth * 0.72 && rect.height >= 150 && rect.height <= 420) {
        best = current;
        break;
      }

      current = current.parentElement;
    }

    if (best) {
      best.setAttribute("data-tea-room-surface", "intro");
      best.style.backgroundColor = "rgba(250, 246, 235, 0.78)";
      best.style.backgroundImage = "url('./assets/tea-room/tea-room-background-latest.png?v=20260803')";
      best.style.backgroundPosition = "center";
      best.style.backgroundRepeat = "no-repeat";
      best.style.backgroundSize = "cover";
    }
  }

  function init() {
    if (!document.body) return;
    document.body.classList.add("forum-tea-room-final");
    document.documentElement.style.backgroundColor = "#eee5d4";
    document.body.style.backgroundColor = "#eee5d4";
    document.body.style.backgroundImage = "url('./assets/tea-room/shanmen-tearoom-base.png?v=20260810')";
    document.body.style.backgroundPosition = "center top";
    document.body.style.backgroundRepeat = "no-repeat";
    document.body.style.backgroundSize = "cover";
    markTeaRoomIntro();
    window.setTimeout(markTeaRoomIntro, 150);
    window.setTimeout(markTeaRoomIntro, 600);
    window.setTimeout(markTeaRoomIntro, 1200);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }
})();
