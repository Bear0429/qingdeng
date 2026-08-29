const stage = document.querySelector("[data-cabinet-stage]");
const toast = document.querySelector("[data-cabinet-toast]");
const diaryModal = document.querySelector("[data-diary-modal]");
const diaryPickupButton = document.querySelector("[data-pickup-pharmacy-diary]");

const JADE_LOGIN_KEYS = ["hasLoggedWenZhaoYe", "hasLoggedLuXingzhou"];
const JADE_ACTIVE_ACCOUNT_KEY = "qingdeng-weigui:jade-active-account";
const JADE_MESSAGE_VIEWED_KEY = "qingdeng-weigui:jade-message-viewed";
const PHARMACY_DIARY_CLAIMED_KEY = "qingdeng-weigui:pharmacy-diary-claimed";

function isJadeLoggedIn() {
  const activeAccount = localStorage.getItem(JADE_ACTIVE_ACCOUNT_KEY);
  if (activeAccount === "wzy") {
    return localStorage.getItem(JADE_LOGIN_KEYS[0]) === "true";
  }
  if (activeAccount === "lxz") {
    return localStorage.getItem(JADE_LOGIN_KEYS[1]) === "true";
  }
  return JADE_LOGIN_KEYS.some((key) => localStorage.getItem(key) === "true");
}

function hasViewedJadeMessages() {
  return localStorage.getItem(JADE_MESSAGE_VIEWED_KEY) === "true";
}

function showCabinetResult(message) {
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(showCabinetResult.timer);
  showCabinetResult.timer = window.setTimeout(() => toast.classList.remove("is-visible"), 1800);
}

function openPharmacyDiary() {
  if (diaryModal) diaryModal.hidden = false;
  if (diaryPickupButton) {
    diaryPickupButton.hidden = localStorage.getItem(PHARMACY_DIARY_CLAIMED_KEY) === "true";
  }
}

stage?.querySelectorAll("[data-cabinet-item]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!isJadeLoggedIn() || !hasViewedJadeMessages()) {
      showCabinetResult("无");
      return;
    }

    const isFuling = button.dataset.cabinetHerbal === "fuling" || button.classList.contains("cabinet-hotspot--top-j") || button.classList.contains("cabinet-hotspot--drawer-9");
    if (!isFuling) {
      showCabinetResult("无");
      return;
    }

    showCabinetResult("此柜留有药堂日记。");
    openPharmacyDiary();
  });
});

diaryPickupButton?.addEventListener("click", () => {
  if (!isJadeLoggedIn() || !hasViewedJadeMessages()) {
    showCabinetResult("无");
    return;
  }

  localStorage.setItem(PHARMACY_DIARY_CLAIMED_KEY, "true");
  diaryPickupButton.hidden = true;
  showCabinetResult("已拾取，药堂日记已存入弟子玉牒。");
});

document.querySelectorAll("[data-close-diary]").forEach((button) => {
  button.addEventListener("click", () => {
    if (diaryModal) diaryModal.hidden = true;
  });
});
