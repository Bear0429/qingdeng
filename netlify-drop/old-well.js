const courtyardImage = "./assets/locations/old-well-courtyard.png";
const depthImage = "./assets/locations/old-well-depth.png";
const confrontationImage = "./assets/locations/old-well-confrontation.png";
const redFigureImage = "./assets/locations/old-well-red-figure-v2.png";
const shadowFigureImage = "./assets/locations/old-well-shadow-figure.png";
const shadowApproachImage = "./assets/locations/old-well-shadow-approach.png";
const wenConfrontsShadowImage = "./assets/locations/old-well-wen-confronts-shadow.png";
const farewellImage = "./assets/locations/old-well-farewell.png";
const unconsciousImage = "./assets/locations/old-well-unconscious.png";
const shenRestoredImage = "./assets/locations/shen-zhaowei-restored.png";
const deathImage = "./assets/locations/old-well-death.png";
const xuanzhuoOldWellImage = "./assets/locations/xuanzhuo-old-well.png";
const wuxiangImage = "./assets/locations/wuxiang-old-well.png";
const remnantTwoStorageKey = "qingdeng-weigui:remnant-two-oldwell-claimed";
const elderLoginStorageKey = "hasLoggedLuXingzhou";
const activeAccountStorageKey = "qingdeng-weigui:jade-active-account";
const elderWenMessageViewedStorageKey = "qingdeng-weigui:xz000-wen-message-viewed";
const kcyBlackMemoryStoneStorageKey = "qingdeng-weigui:kcy49-black-memory-stone";
const kcyNineTurnRemnantOneStorageKey = "qingdeng-weigui:kcy49-nine-turn-remnant-one";
const playerNameStorageKey = "qingdeng-weigui:player-name";
const searchedKeywordsStorageKey = "qingdeng-weigui:searched-keywords";

const hasOldWellAccess =
  (
    localStorage.getItem(elderLoginStorageKey) === "true" &&
    localStorage.getItem(activeAccountStorageKey) === "lxz" &&
    localStorage.getItem(elderWenMessageViewedStorageKey) === "true"
  ) || localStorage.getItem("qingdeng-weigui:map-two-unlocked") === "true";

if (!hasOldWellAccess) {
  window.location.replace("./map.html?old-well=locked");
} else {
  if (
    localStorage.getItem(elderLoginStorageKey) === "true" &&
    localStorage.getItem(activeAccountStorageKey) === "lxz" &&
    localStorage.getItem(elderWenMessageViewedStorageKey) === "true"
  ) {
    localStorage.setItem("qingdeng-weigui:map-two-unlocked", "true");
  }
  document.body.classList.remove("is-access-pending");
}

const sceneImage = document.querySelector("[data-old-well-image]");
const wellMouth = document.querySelector("[data-old-well-mouth]");
const pickupModal = document.querySelector("[data-old-well-pickup]");
const pickupTake = document.querySelector("[data-pickup-take]");
const storyModal = document.querySelector("[data-old-well-story]");
const storyDialog = document.querySelector("[data-story-dialog]");
const storySpeaker = document.querySelector("[data-story-speaker]");
const storyLine = document.querySelector("[data-story-line]");
const storyContinue = document.querySelector("[data-story-continue]");
const storyChoices = document.querySelector("[data-story-choices]");
const shadowChoices = document.querySelector("[data-shadow-choices]");
const shadowOfferChoices = document.querySelector("[data-shadow-offer-choices]");
const redFigureChoices = document.querySelector("[data-red-figure-choices]");
const endingThreeChoice = document.querySelector("[data-ending-three-choice]");
const endingFourChoice = document.querySelector("[data-ending-four-choice]");
const endingSixChoice = document.querySelector("[data-ending-six-choice]");
const shadowPlayerName = document.querySelector("[data-shadow-player-name]");
const nameEntry = document.querySelector("[data-name-entry]");
const nameForm = document.querySelector("[data-name-form]");
const nameInput = document.querySelector("[data-name-input]");
const nameError = document.querySelector("[data-name-error]");
const realNameEntry = document.querySelector("[data-real-name-entry]");
const realNameForm = document.querySelector("[data-real-name-form]");
const realNameInput = document.querySelector("[data-real-name-input]");
const realNameError = document.querySelector("[data-real-name-error]");
const spellEntry = document.querySelector("[data-spell-entry]");
const spellForm = document.querySelector("[data-spell-form]");
const spellInput = document.querySelector("[data-spell-input]");
const spellError = document.querySelector("[data-spell-error]");
const scrollModal = document.querySelector("[data-old-well-scroll]");
const scrollTake = document.querySelector("[data-scroll-take]");
const remnantTwoModal = document.querySelector("[data-old-well-remnant-two]");
const remnantTwoTake = document.querySelector("[data-remnant-two-take]");
const flashOverlay = document.querySelector("[data-old-well-flash]");
const qteModal = document.querySelector("[data-old-well-qte]");
const qteForm = document.querySelector("[data-qte-form]");
const qteInput = document.querySelector("[data-qte-input]");
const qteProgress = document.querySelector("[data-qte-progress]");
const oldWellAudioControl = document.querySelector("[data-old-well-audio-control]");
const oldWellAudio = document.querySelector("[data-old-well-audio]");
const oldWellAudioToggle = document.querySelector("[data-old-well-audio-toggle]");
const oldWellVolume = document.querySelector("[data-old-well-volume]");
let lastFocusedElement = null;
let hasResolvedPickup = hasTakenBlackStone();
let storyStep = 0;
let isBarrierImpacting = false;
let qteSuccessCount = 0;
let qteIsComposing = false;
let qteTimer = null;
let oldWellAudioMuted = false;
let oldWellAudioUnlockHandler = null;

function syncOldWellAudioControl() {
  if (!oldWellAudioControl || !oldWellAudioToggle || !oldWellAudio) {
    return;
  }

  const isMuted = oldWellAudioMuted || oldWellAudio.volume === 0;
  oldWellAudioControl.classList.toggle("is-muted", isMuted);
  oldWellAudioToggle.setAttribute("aria-pressed", String(isMuted));
  oldWellAudioToggle.setAttribute("aria-label", isMuted ? "播放山钟回响" : "暂停山钟回响");
}

function attemptOldWellAudioPlayback() {
  if (!hasOldWellAccess || !oldWellAudio || oldWellAudioMuted) {
    return;
  }

  const playPromise = oldWellAudio.play();
  if (!playPromise || typeof playPromise.catch !== "function") {
    return;
  }

  playPromise
    .then(() => {
      if (oldWellAudioUnlockHandler) {
        document.removeEventListener("pointerdown", oldWellAudioUnlockHandler);
        oldWellAudioUnlockHandler = null;
      }
    })
    .catch(() => {
      if (!oldWellAudioUnlockHandler) {
        oldWellAudioUnlockHandler = () => {
          oldWellAudioUnlockHandler = null;
          attemptOldWellAudioPlayback();
        };
        document.addEventListener("pointerdown", oldWellAudioUnlockHandler, { once: true });
      }
    });
}

function stopOldWellAudio() {
  if (oldWellAudioUnlockHandler) {
    document.removeEventListener("pointerdown", oldWellAudioUnlockHandler);
    oldWellAudioUnlockHandler = null;
  }

  if (oldWellAudio) {
    oldWellAudio.pause();
    oldWellAudio.currentTime = 0;
  }
}

if (oldWellAudio && oldWellVolume && hasOldWellAccess) {
  const hasCompleteFormation = localStorage.getItem("qingdeng-weigui:remnant-puzzle-completed") === "true";
  if (hasCompleteFormation) {
    oldWellAudio.src = "./assets/audio/guiling.mp3";
    oldWellAudio.load();
  }
  oldWellAudio.volume = Number(oldWellVolume.value);
  syncOldWellAudioControl();
  attemptOldWellAudioPlayback();

  oldWellAudioToggle?.addEventListener("click", () => {
    oldWellAudioMuted = !oldWellAudioMuted;
    if (oldWellAudioMuted) {
      oldWellAudio.pause();
    } else {
      attemptOldWellAudioPlayback();
    }
    syncOldWellAudioControl();
  });

  oldWellVolume.addEventListener("input", () => {
    oldWellAudio.volume = Number(oldWellVolume.value);
    if (oldWellAudio.volume > 0 && oldWellAudioMuted) {
      oldWellAudioMuted = false;
      attemptOldWellAudioPlayback();
    } else if (oldWellAudio.volume === 0) {
      oldWellAudioMuted = true;
      oldWellAudio.pause();
    }
    syncOldWellAudioControl();
  });

  window.addEventListener("pagehide", stopOldWellAudio, { once: true });
  window.addEventListener("beforeunload", stopOldWellAudio, { once: true });
}

const depthPreload = new Image();
depthPreload.src = depthImage;
const confrontationPreload = new Image();
confrontationPreload.src = confrontationImage;
const redFigurePreload = new Image();
redFigurePreload.src = redFigureImage;
const shadowFigurePreload = new Image();
shadowFigurePreload.src = shadowFigureImage;
const shadowApproachPreload = new Image();
shadowApproachPreload.src = shadowApproachImage;
const wenConfrontsShadowPreload = new Image();
wenConfrontsShadowPreload.src = wenConfrontsShadowImage;
const farewellPreload = new Image();
farewellPreload.src = farewellImage;
const unconsciousPreload = new Image();
unconsciousPreload.src = unconsciousImage;

function isDepthScene() {
  return sceneImage?.getAttribute("src") === depthImage;
}

function hasTakenBlackStone() {
  return localStorage.getItem(kcyBlackMemoryStoneStorageKey) === "true";
}

function hasTakenNineTurnRemnant() {
  return localStorage.getItem(kcyNineTurnRemnantOneStorageKey) === "true";
}

function hasSearchedJiangYunxiu() {
  try {
    const keywords = JSON.parse(localStorage.getItem(searchedKeywordsStorageKey) || "[]");
    return Array.isArray(keywords) && keywords.some((keyword) => String(keyword).trim() === "姜云岫");
  } catch {
    return false;
  }
}

function openPickupModal() {
  if (!pickupModal || !isDepthScene() || hasTakenBlackStone()) {
    return;
  }

  lastFocusedElement = document.activeElement;
  pickupModal.hidden = false;
  document.body.classList.add("is-pickup-open");
  pickupTake?.focus();
}

function closePickupModal() {
  if (!pickupModal || pickupModal.hidden) {
    return;
  }

  pickupModal.hidden = true;
  document.body.classList.remove("is-pickup-open");
  if (lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus({ preventScroll: true });
  }
}

function getPlayerName() {
  return localStorage.getItem(playerNameStorageKey)?.trim() || "道友";
}

function replacePlayerNameTokens(text) {
  return text.replaceAll("xxx", getPlayerName());
}

window.qingdengDialogue = {
  getPlayerName,
  replacePlayerNameTokens,
};

function renderStoryLine(text) {
  if (storyLine) {
    storyLine.textContent = replacePlayerNameTokens(text);
  }
}

function setStorySpeaker(name) {
  if (storySpeaker) {
    storySpeaker.textContent = name;
  }
}

function renderFinalThreat() {
  if (!storyLine) {
    return;
  }

  storyLine.replaceChildren(document.createTextNode("不...你们不是行舟，"));
  ["去死", "去死", "去死！"].forEach((text, index) => {
    const danger = document.createElement("span");
    danger.className = "is-danger";
    danger.textContent = `${index === 0 ? "" : "，"}${text}`;
    storyLine.append(danger);
  });
}

function setStoryChoicesVisible(isVisible) {
  if (storyChoices) {
    storyChoices.hidden = !isVisible;
  }
  if (storyContinue) {
    storyContinue.hidden = isVisible;
  }
}

function setShadowChoicesVisible(isVisible) {
  if (shadowChoices) {
    shadowChoices.hidden = !isVisible;
  }
  if (shadowPlayerName) {
    shadowPlayerName.textContent = getPlayerName();
  }
  if (storyContinue && isVisible) {
    storyContinue.hidden = true;
  }
}

function setShadowOfferChoicesVisible(isVisible) {
  if (shadowOfferChoices) {
    shadowOfferChoices.hidden = !isVisible;
  }
  if (storyContinue && isVisible) {
    storyContinue.hidden = true;
  }
}

function setRedFigureChoicesVisible(isVisible) {
  if (redFigureChoices) {
    redFigureChoices.hidden = !isVisible;
  }
  if (storyContinue && isVisible) {
    storyContinue.hidden = true;
  }
}

function setEndingThreeChoiceVisible(isVisible) {
  if (endingThreeChoice) {
    endingThreeChoice.hidden = !isVisible;
  }
  if (storyContinue && isVisible) {
    storyContinue.hidden = true;
  }
}

function setEndingFourChoiceVisible(isVisible) {
  if (endingFourChoice) {
    endingFourChoice.hidden = !isVisible;
  }
  if (storyContinue && isVisible) {
    storyContinue.hidden = true;
  }
}

function setEndingSixChoiceVisible(isVisible) {
  if (endingSixChoice) {
    endingSixChoice.hidden = !isVisible;
  }
  if (storyContinue && isVisible) {
    storyContinue.hidden = true;
  }
}

function openStoryModal() {
  if (!storyModal || !isDepthScene() || !hasResolvedPickup) {
    return;
  }

  lastFocusedElement = document.activeElement;
  storyStep = 1;
  setStorySpeaker("温照夜");
  renderStoryLine("没想到你真来到了这里，这位道友，请问你的名字是？");
  storyModal.hidden = false;
  nameEntry.hidden = true;
  setStoryChoicesVisible(false);
  setShadowChoicesVisible(false);
  setShadowOfferChoicesVisible(false);
  setEndingThreeChoiceVisible(false);
  setEndingFourChoiceVisible(false);
  if (storyContinue) {
    storyContinue.hidden = false;
  }
  document.body.classList.add("is-story-open");
  storyDialog?.focus({ preventScroll: true });
}

function suspendStoryModal() {
  if (!storyModal) {
    return;
  }

  storyModal.hidden = true;
  document.body.classList.remove("is-story-open");
}

function resumeStoryModal() {
  if (!storyModal) {
    return;
  }

  storyModal.hidden = false;
  nameEntry.hidden = true;
  setStoryChoicesVisible(false);
  setShadowChoicesVisible(false);
  setShadowOfferChoicesVisible(false);
  setEndingThreeChoiceVisible(false);
  setEndingFourChoiceVisible(false);
  if (storyContinue) {
    storyContinue.hidden = false;
  }
  document.body.classList.add("is-story-open");
  storyDialog?.focus({ preventScroll: true });
}

function openScrollPickup() {
  if (!scrollModal) {
    return;
  }

  suspendStoryModal();
  scrollModal.hidden = false;
  scrollTake?.focus({ preventScroll: true });
}

function completeScrollPickup() {
  localStorage.setItem(kcyNineTurnRemnantOneStorageKey, "true");
  if (scrollModal) {
    scrollModal.hidden = true;
  }

  storyStep = 7;
  setStorySpeaker("温照夜");
  renderStoryLine("走吧，xxx道友，看看镇压邪祟的地方在哪儿。");
  resumeStoryModal();
}

function showConfrontationScene() {
  if (!sceneImage) {
    return;
  }

  storyStep = 9;
  suspendStoryModal();
  sceneImage.src = confrontationImage;
  sceneImage.alt = "旧井深处被镇压的红衣女子";
  sceneImage.classList.add("is-depth");
}

function startConfrontationDialogue() {
  storyStep = 10;
  setStorySpeaker("？？？");
  renderStoryLine("行舟...行舟...");
  resumeStoryModal();
}

function triggerFinalFlash() {
  suspendStoryModal();
  storyStep = 20;
  if (sceneImage) {
    sceneImage.src = redFigureImage;
    sceneImage.alt = "血色井道中的沈照微";
  }
  if (!flashOverlay) {
    return;
  }

  flashOverlay.hidden = false;
  flashOverlay.classList.remove("is-active");
  void flashOverlay.offsetWidth;
  flashOverlay.classList.add("is-active");
  window.setTimeout(() => {
    flashOverlay.classList.remove("is-active");
    flashOverlay.hidden = true;
  }, 450);
}

function startRedFigureDialogue() {
  storyStep = 20;
  setStorySpeaker("温照夜");
  renderStoryLine("不好，xxx道友你先走，交给我，我有对付魂魄的法子！");
  resumeStoryModal();
  setRedFigureChoicesVisible(true);
}

function startQTETimer() {
  clearQTETimer();
  qteTimer = window.setTimeout(() => {
    handleQTEFailure();
  }, 3000);
}

function clearQTETimer() {
  if (qteTimer !== null) {
    window.clearTimeout(qteTimer);
    qteTimer = null;
  }
}

function openQTE() {
  qteSuccessCount = 0;
  qteIsComposing = false;
  if (qteProgress) {
    qteProgress.textContent = "0 / 3";
  }
  if (qteInput) {
    qteInput.value = "";
  }
  if (qteModal) {
    qteModal.hidden = false;
  }
  window.setTimeout(() => {
    qteInput?.focus();
  }, 50);
  startQTETimer();
}

function closeQTE() {
  clearQTETimer();
  if (qteModal) {
    qteModal.hidden = true;
  }
}

function handleQTESuccess() {
  closeQTE();
  storyStep = 202;
  if (sceneImage) {
    sceneImage.src = shenRestoredImage;
    sceneImage.alt = "沈照微恢复神情";
  }
}

function handleQTEFailure() {
  closeQTE();
  if (flashOverlay) {
    flashOverlay.hidden = false;
    flashOverlay.classList.remove("is-active");
    void flashOverlay.offsetWidth;
    flashOverlay.classList.add("is-active");
    window.setTimeout(() => {
      flashOverlay.classList.remove("is-active");
      flashOverlay.hidden = true;
    }, 450);
  }
  if (sceneImage) {
    sceneImage.src = deathImage;
    sceneImage.alt = "阵亡";
  }
  storyStep = 203;
  setStorySpeaker("");
  renderStoryLine("沈照微直接冲破了符咒禁制，一只手捅穿了你的肚子，你眼里只有猩红一片...");
  resumeStoryModal();
}

function openRemnantTwoPickup() {
  if (remnantTwoModal) {
    remnantTwoModal.hidden = false;
  }
}

function closeRemnantTwoPickup() {
  if (remnantTwoModal) {
    remnantTwoModal.hidden = true;
  }
}

function completeRemnantTwoPickup() {
  localStorage.setItem("qingdeng-weigui:remnant-two-oldwell-claimed", "true");
  closeRemnantTwoPickup();
  storyStep = 208;
  setStorySpeaker("沈照微");
  renderStoryLine("再次感谢两位，我把剩下的魂力都传给你们，这样我也解脱了");
  resumeStoryModal();
}

function playGlassShatter() {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext;
  if (!AudioContextClass) {
    return;
  }

  const audioContext = new AudioContextClass();
  const duration = 0.78;
  const sampleCount = Math.floor(audioContext.sampleRate * duration);
  const buffer = audioContext.createBuffer(1, sampleCount, audioContext.sampleRate);
  const samples = buffer.getChannelData(0);

  for (let index = 0; index < sampleCount; index += 1) {
    const progress = index / sampleCount;
    const decay = Math.pow(1 - progress, 3.4);
    samples[index] = (Math.random() * 2 - 1) * decay;
  }

  const source = audioContext.createBufferSource();
  const highpass = audioContext.createBiquadFilter();
  const gain = audioContext.createGain();
  source.buffer = buffer;
  highpass.type = "highpass";
  highpass.frequency.value = 1700;
  gain.gain.setValueAtTime(0.36, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
  source.connect(highpass).connect(gain).connect(audioContext.destination);
  source.start();
  source.addEventListener("ended", () => audioContext.close(), { once: true });
}

function triggerBarrierImpact(intensity, withShatter = false) {
  if (isBarrierImpacting) {
    return;
  }

  isBarrierImpacting = true;
  const impactClass = `is-impact-${intensity}`;
  sceneImage?.classList.add(impactClass);

  if (flashOverlay) {
    flashOverlay.hidden = false;
    flashOverlay.classList.remove("is-active", "is-impact-1", "is-impact-2", "is-impact-3");
    void flashOverlay.offsetWidth;
    flashOverlay.classList.add(impactClass);
  }

  if (withShatter) {
    playGlassShatter();
  }

  window.setTimeout(() => {
    sceneImage?.classList.remove(impactClass);
    if (flashOverlay) {
      flashOverlay.classList.remove(impactClass);
      flashOverlay.hidden = true;
    }
    isBarrierImpacting = false;
  }, intensity === 3 ? 620 : 460);
}

function showShadowApproachScene() {
  if (!sceneImage) {
    return;
  }

  storyStep = 37;
  suspendStoryModal();
  sceneImage.src = shadowApproachImage;
  sceneImage.alt = "破阵后沿井道逼近的奇怪黑影";
  sceneImage.classList.add("is-depth");
}

function startShadowApproachDialogue() {
  storyStep = 37;
  setStorySpeaker("奇怪黑影");
  renderStoryLine("刚不是还这么嚣张，现在怎么不说话了？");
  resumeStoryModal();
}

function showWenConfrontsShadowScene() {
  if (!sceneImage) {
    return;
  }

  storyStep = 42;
  suspendStoryModal();
  sceneImage.src = wenConfrontsShadowImage;
  sceneImage.alt = "温照夜在井道中面对奇怪黑影";
  sceneImage.classList.add("is-depth");
}

function startWenConfrontsShadowDialogue() {
  storyStep = 42;
  setStorySpeaker("");
  renderStoryLine("一张符咒飞向黑影，缠绕在你脖颈上的黑雾瞬间散开");
  resumeStoryModal();
}

function showShadowScene() {
  if (!sceneImage) {
    return;
  }

  storyStep = 21;
  suspendStoryModal();
  sceneImage.src = shadowFigureImage;
  sceneImage.alt = "井底法阵中被锁链束缚的奇怪黑影";
  sceneImage.classList.add("is-depth");
}

function startShadowDialogue() {
  storyStep = 22;
  setStorySpeaker("奇怪黑影");
  renderStoryLine("桀桀桀，这又是哪个无辜小儿下来送死了？");
  resumeStoryModal();
}

function closeStoryModal() {
  if (!storyModal || storyModal.hidden) {
    return;
  }

  storyModal.hidden = true;
  nameEntry.hidden = true;
  realNameEntry.hidden = true;
  spellEntry.hidden = true;
  setStoryChoicesVisible(false);
  setShadowChoicesVisible(false);
  setShadowOfferChoicesVisible(false);
  setEndingThreeChoiceVisible(false);
  setEndingFourChoiceVisible(false);
  setEndingSixChoiceVisible(false);
  document.body.classList.remove("is-story-open");
  storyStep = 0;
  if (lastFocusedElement instanceof HTMLElement) {
    lastFocusedElement.focus({ preventScroll: true });
  }
}

function openNameEntry() {
  if (!nameEntry || storyStep !== 1) {
    return;
  }

  storyStep = 2;
  nameEntry.hidden = false;
  if (storyContinue) {
    storyContinue.hidden = true;
  }
  if (nameInput) {
    nameInput.value = localStorage.getItem(playerNameStorageKey) || "";
    nameInput.focus({ preventScroll: true });
    nameInput.select();
  }
}

wellMouth?.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();

  if (!hasOldWellAccess) {
    return;
  }

  if (!sceneImage || sceneImage.getAttribute("src") !== courtyardImage) {
    return;
  }

  sceneImage.src = depthImage;
  sceneImage.alt = "从井口向下望去的旧井深处";
  sceneImage.classList.add("is-depth");
  wellMouth.hidden = true;
});

sceneImage?.addEventListener("click", () => {
  if (storyStep === 9 && sceneImage.getAttribute("src") === confrontationImage) {
    startConfrontationDialogue();
    return;
  }

  if (storyStep === 20 && sceneImage.getAttribute("src") === redFigureImage) {
    startRedFigureDialogue();
    return;
  }

  if (storyStep === 202 && sceneImage.getAttribute("src") === shenRestoredImage) {
    setStorySpeaker("");
    renderStoryLine("阵法已成，你看着沈照微面目狰狞的表情逐渐变得平静。");
    resumeStoryModal();
    return;
  }

  if (storyStep === 21 && sceneImage.getAttribute("src") === shadowFigureImage) {
    startShadowDialogue();
    return;
  }

  if (storyStep === 37 && sceneImage.getAttribute("src") === shadowApproachImage) {
    startShadowApproachDialogue();
    return;
  }

  if (storyStep === 42 && sceneImage.getAttribute("src") === wenConfrontsShadowImage) {
    startWenConfrontsShadowDialogue();
    return;
  }

  if (storyStep === 59 && sceneImage.getAttribute("src") === farewellImage) {
    storyStep = 60;
    setStorySpeaker("");
    renderStoryLine("你眼里最后的画面，是温照夜被黑影慢慢包裹吞噬");
    resumeStoryModal();
    return;
  }

  if (storyStep === 67 && sceneImage.getAttribute("src") === unconsciousImage) {
    storyStep = 68;
    setStorySpeaker("");
    renderStoryLine("井口旁边躺着一个昏迷的女子，你把她抱起朝着白蘅的药堂走去...");
    resumeStoryModal();
    return;
  }

  if (storyStep === 109 && sceneImage.getAttribute("src") === xuanzhuoOldWellImage) {
    storyStep = 110;
    setStorySpeaker("玄濯真人");
    renderStoryLine("......你们二人为何在此?");
    resumeStoryModal();
    return;
  }

  if (storyStep === 118 && sceneImage.getAttribute("src") === wuxiangImage) {
    storyStep = 119;
    setStorySpeaker("？？？");
    renderStoryLine("一起成为我们的养料吧！");
    resumeStoryModal();
    return;
  }

  if (storyStep >= 10 || !isDepthScene() || (pickupModal && !pickupModal.hidden) || (storyModal && !storyModal.hidden)) {
    return;
  }

  if (!hasResolvedPickup) {
    openPickupModal();
    return;
  }

  openStoryModal();
});

scrollTake?.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  completeScrollPickup();
});

remnantTwoTake?.addEventListener("click", (event) => {
  event.preventDefault();
  event.stopPropagation();
  completeRemnantTwoPickup();
});

pickupModal?.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  if (target.closest("[data-pickup-take]")) {
    event.preventDefault();
    localStorage.setItem(kcyBlackMemoryStoneStorageKey, "true");
    hasResolvedPickup = true;
    closePickupModal();
    return;
  }

  if (target.closest("[data-pickup-leave]")) {
    event.preventDefault();
    hasResolvedPickup = true;
    closePickupModal();
  }
});

storyDialog?.addEventListener("click", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) {
    return;
  }

  if (target.closest("[data-story-close]")) {
    event.preventDefault();
    event.stopPropagation();
    closeStoryModal();
    return;
  }

  if (isBarrierImpacting) {
    event.preventDefault();
    return;
  }

  const storyChoice = target.closest("[data-story-choice]");
  if (storyChoice) {
    event.preventDefault();
    event.stopPropagation();
    setStoryChoicesVisible(false);

    if (storyChoice.dataset.storyChoice === "help") {
      storyStep = 4;
      renderStoryLine("据我查阅的资料，沈照微早已被青雾同化了。");
      return;
    }

    storyStep = 8;
    renderStoryLine("罢了，我以为你能来这里已经做好了准备。这张符能直接送你出宗，xxx道友，后会无期。");
    return;
  }

  const shadowChoice = target.closest("[data-shadow-choice]");
  if (shadowChoice) {
    event.preventDefault();
    event.stopPropagation();
    setShadowChoicesVisible(false);
    if (storyContinue) {
      storyContinue.hidden = false;
    }
    storyStep = 23;
    setStorySpeaker("奇怪黑影");
    renderStoryLine("真该说不知者无罪呢，几万年了已经没人认识我们了...");
    return;
  }

  const shadowOfferChoice = target.closest("[data-shadow-offer-choice]");
  if (shadowOfferChoice) {
    event.preventDefault();
    event.stopPropagation();
    setShadowOfferChoicesVisible(false);

    if (shadowOfferChoice.dataset.shadowOfferChoice === "join") {
      window.location.href = "./ending-two.html";
      return;
    }

    if (storyContinue) {
      storyContinue.hidden = false;
    }
    storyStep = 26;
    setStorySpeaker("奇怪黑影");
    renderStoryLine("敬酒不吃吃罚酒...不，怎么可能！");
    return;
  }

  const redFigureChoice = target.closest("[data-red-figure-choice]");
  if (redFigureChoice) {
    event.preventDefault();
    event.stopPropagation();
    setRedFigureChoicesVisible(false);
    if (storyContinue) {
      storyContinue.hidden = false;
    }

    if (redFigureChoice.dataset.redFigureChoice === "leave") {
      storyStep = 20;
      showShadowScene();
      return;
    }

    if (redFigureChoice.dataset.redFigureChoice === "stay") {
      storyStep = 201;
      setStorySpeaker("温照夜");
      renderStoryLine("好！我手里有3张镇魂符，我每次施咒贴一张符需要你呼唤她的名字");
      return;
    }
  }

  if (target.closest("[data-ending-three]")) {
    event.preventDefault();
    event.stopPropagation();
    window.location.href = "./ending-three.html";
    return;
  }

  if (target.closest("[data-ending-four]")) {
    event.preventDefault();
    event.stopPropagation();
    window.location.href = "./ending-four.html";
    return;
  }

  if (storyStep === 1) {
    openNameEntry();
    return;
  }

  if (storyStep === 100) {
    storyStep = 101;
    setStorySpeaker("");
    renderStoryLine("她眉梢一挑，看向你的目光闪过一丝惊讶。");
    return;
  }

  if (storyStep === 101) {
    storyStep = 102;
    setStorySpeaker("");
    renderStoryLine("在看过留影石和手里的阵法图之后，温照夜朝你拱手一拜。");
    return;
  }

  if (storyStep === 102) {
    storyStep = 103;
    setStorySpeaker("温照夜");
    renderStoryLine("xxx道友，帮大忙了。");
    return;
  }

  if (storyStep === 103) {
    storyStep = 104;
    setStorySpeaker("温照夜");
    renderStoryLine("看来玄濯真人被这邪祟夺舍了。");
    return;
  }

  if (storyStep === 104) {
    storyStep = 105;
    setStorySpeaker("温照夜");
    renderStoryLine("不过为何你会有我手里的残卷？难道这是道友的法术吗？");
    return;
  }

  if (storyStep === 105) {
    storyStep = 106;
    setStorySpeaker("温照夜");
    renderStoryLine("罢了左右都是为了守护宗门。");
    return;
  }

  if (storyStep === 106) {
    storyStep = 107;
    setStorySpeaker("温照夜");
    renderStoryLine("刚好我手里有引魂符，用我手里的残卷为引把邪祟传送过来。");
    return;
  }

  if (storyStep === 107) {
    storyStep = 108;
    setStorySpeaker("");
    renderStoryLine("只见温照夜双手结印，残卷瞬间被烧成灰烬，被代替的是逐渐凝出身形的玄濯。");
    return;
  }

  if (storyStep === 108) {
    storyStep = 109;
    suspendStoryModal();
    if (sceneImage) {
      sceneImage.src = xuanzhuoOldWellImage;
      sceneImage.alt = "玄濯现身";
    }
    return;
  }

  if (storyStep === 110) {
    storyStep = 111;
    setStorySpeaker("玄濯真人");
    renderStoryLine("......你们二人为何在此?");
    return;
  }

  if (storyStep === 111) {
    storyStep = 112;
    setStorySpeaker("温照夜");
    renderStoryLine("别装了，我们早已知道你已经不是玄濯真人。");
    return;
  }

  if (storyStep === 112) {
    storyStep = 113;
    setStorySpeaker("玄濯真人");
    renderStoryLine("还是被发现了吗？那又如何。");
    return;
  }

  if (storyStep === 113) {
    storyStep = 114;
    setStorySpeaker("玄濯真人");
    renderStoryLine("一群蜉蝣如何撼动大树！");
    return;
  }

  if (storyStep === 114) {
    storyStep = 115;
    setStorySpeaker("");
    renderStoryLine("只见“玄濯”身后的黑影冲破阵法的限制。");
    return;
  }

  if (storyStep === 115) {
    storyStep = 116;
    setStorySpeaker("");
    renderStoryLine("“玄濯”的皮肤一寸寸裂开，和黑雾融为一体。");
    return;
  }

  if (storyStep === 116) {
    storyStep = 117;
    setStorySpeaker("");
    renderStoryLine("一张张陌生而扭曲的脸庞布满黑雾全身。");
    return;
  }

  if (storyStep === 117) {
    storyStep = 118;
    suspendStoryModal();
    if (sceneImage) {
      sceneImage.src = wuxiangImage;
      sceneImage.alt = "无相邪祟";
    }
    return;
  }

  if (storyStep === 119) {
    storyStep = 120;
    setStorySpeaker("");
    renderStoryLine("在黑雾扑向你们之时，怀里的阵法图自行飞出，挡住了黑雾的攻击。");
    return;
  }

  if (storyStep === 120) {
    storyStep = 121;
    setStorySpeaker("？？？");
    renderStoryLine("不...怎么可能？");
    return;
  }

  if (storyStep === 121) {
    storyStep = 122;
    setStorySpeaker("？？？");
    renderStoryLine("你们哪里来的阵法？明明几千年前早就被我吞噬毁灭掉了！");
    return;
  }

  if (storyStep === 122) {
    storyStep = 123;
    setStorySpeaker("温照夜");
    renderStoryLine("哼，让你喜欢装。");
    return;
  }

  if (storyStep === 123) {
    storyStep = 124;
    setStorySpeaker("？？？");
    renderStoryLine("那九人我只遗留了两人没杀，难道你们是他们的后人？");
    return;
  }

  if (storyStep === 124) {
    storyStep = 125;
    setStorySpeaker("？？？");
    renderStoryLine("哼，不知道我的真名，没有封印咒语，如何杀死我。");
    return;
  }

  if (storyStep === 125) {
    storyStep = 126;
    setStorySpeaker("？？？");
    renderStoryLine("镇压得住我一时，待我恢复九转阵法一成，所有人都会成为我的养分！");
    return;
  }

  if (storyStep === 126) {
    storyStep = 127;
    setStorySpeaker("温照夜");
    renderStoryLine("xxx道友，封印咒语白蘅和陆栖尘告诉过我，但是真名我着实不知，不知你可否有线索？");
    return;
  }

  if (storyStep === 127) {
    storyStep = 128;
    if (storyContinue) {
      storyContinue.hidden = true;
    }
    if (realNameEntry) {
      realNameEntry.hidden = false;
    }
    if (realNameInput) {
      realNameInput.value = "";
      realNameInput.focus({ preventScroll: true });
    }
    return;
  }

  if (storyStep === 129) {
    storyStep = 130;
    setStorySpeaker("温照夜");
    renderStoryLine("谁说——我们不知道了？");
    return;
  }

  if (storyStep === 130) {
    storyStep = 131;
    setStorySpeaker("");
    renderStoryLine("你和温照夜同时双手结印，嘴里同时念出咒语");
    return;
  }

  if (storyStep === 131) {
    storyStep = 132;
    if (storyContinue) {
      storyContinue.hidden = true;
    }
    if (spellEntry) {
      spellEntry.hidden = false;
    }
    if (spellInput) {
      spellInput.value = "";
      spellInput.focus({ preventScroll: true });
    }
    return;
  }

  if (storyStep === 134) {
    storyStep = 135;
    setStorySpeaker("无相祟");
    renderStoryLine("不，不，不可能，放我回去——");
    return;
  }

  if (storyStep === 135) {
    storyStep = 136;
    setStorySpeaker("");
    renderStoryLine("所谓九转：");
    return;
  }

  if (storyStep === 136) {
    storyStep = 138;
    setStorySpeaker("");
    renderStoryLine("一转山河定。");
    return;
  }

  if (storyStep === 138) {
    storyStep = 139;
    setStorySpeaker("");
    renderStoryLine("二转万灵归。");
    return;
  }

  if (storyStep === 139) {
    storyStep = 140;
    setStorySpeaker("");
    renderStoryLine("三转天门闭。");
    return;
  }

  if (storyStep === 140) {
    storyStep = 141;
    setStorySpeaker("");
    renderStoryLine("四转神魂寂。");
    return;
  }

  if (storyStep === 141) {
    storyStep = 142;
    setStorySpeaker("");
    renderStoryLine("五转其名灭。");
    return;
  }

  if (storyStep === 142) {
    storyStep = 143;
    setStorySpeaker("");
    renderStoryLine("六转因果断。");
    return;
  }

  if (storyStep === 143) {
    storyStep = 144;
    setStorySpeaker("");
    renderStoryLine("七转岁月止。");
    return;
  }

  if (storyStep === 144) {
    storyStep = 145;
    setStorySpeaker("");
    renderStoryLine("八转天地隔。");
    return;
  }

  if (storyStep === 145) {
    storyStep = 146;
    setStorySpeaker("");
    renderStoryLine("九转，补天缺。");
    return;
  }

  if (storyStep === 146) {
    storyStep = 147;
    setStorySpeaker("");
    renderStoryLine("上古邪祟并非这个世界的生灵。它来自“天外”。当年它降临之时，在天地之间撕开了一道无法愈合的裂隙。");
    return;
  }

  if (storyStep === 147) {
    storyStep = 148;
    setStorySpeaker("");
    renderStoryLine("所以第一代修士发现：杀死邪祟没有意义。只要那道裂隙还存在，它就会一次又一次归来。");
    return;
  }

  if (storyStep === 148) {
    storyStep = 149;
    setStorySpeaker("");
    renderStoryLine("因此九转补天阵真正要封印的其实有两个东西：其一，上古邪祟。其二，邪祟降临这个世界的“天缺”。");
    return;
  }

  if (storyStep === 149) {
    storyStep = 150;
    setStorySpeaker("");
    renderStoryLine("黑雾在金光之后化作灰烟，消散在空中");
    return;
  }

  if (storyStep === 150) {
    setEndingSixChoiceVisible(true);
    endingSixChoice?.querySelector("button")?.focus({ preventScroll: true });
    return;
  }

  if (storyStep === 3) {
    setStoryChoicesVisible(true);
    storyChoices?.querySelector("button")?.focus({ preventScroll: true });
    return;
  }

  if (storyStep === 4) {
    storyStep = 5;
    renderStoryLine("魂力圆满的人只是成为下面邪祟的营养罢了，它吃饱了就会进入休眠期。");
    return;
  }

  if (storyStep === 5) {
    storyStep = 6;
    renderStoryLine("玄濯被白师姐下了药暂时醒不过来，我从玄濯那里偷来了这张残卷。");
    return;
  }

  if (storyStep === 6) {
    if (hasTakenNineTurnRemnant()) {
      storyStep = 7;
      renderStoryLine("走吧，xxx道友，看看镇压邪祟的地方在哪儿。");
      return;
    }

    openScrollPickup();
    return;
  }

  if (storyStep === 7) {
    showConfrontationScene();
    return;
  }

  if (storyStep === 10) {
    storyStep = 11;
    setStorySpeaker("温照夜");
    renderStoryLine("难道这是，沈照微？");
    return;
  }

  if (storyStep === 11) {
    storyStep = 12;
    setStorySpeaker("沈照微");
    renderStoryLine("行舟是你吗？我好想你");
    return;
  }

  if (storyStep === 12) {
    storyStep = 13;
    setStorySpeaker("温照夜");
    renderStoryLine("xxx道友，如果突发变故，就交给你了，我先把法子告诉你。");
    return;
  }

  if (storyStep === 13) {
    storyStep = 14;
    renderStoryLine("想要破除大阵，需要献祭魂力，我学了一门法子可以提取魂力。");
    return;
  }

  if (storyStep === 14) {
    storyStep = 15;
    renderStoryLine("我把所有愿意帮助我的人的魂力凝聚在了我的魂灯里，包括我自己。");
    return;
  }

  if (storyStep === 15) {
    storyStep = 16;
    renderStoryLine("所以我现在只是个有点拳脚功夫的普通人，身上几乎没有魂力。");
    return;
  }

  if (storyStep === 16) {
    storyStep = 17;
    renderStoryLine("好在你来了，大阵驱动还是魂力充足的人来做最好。");
    return;
  }

  if (storyStep === 17) {
    storyStep = 18;
    renderStoryLine("到了阵法前，无论听到何人说什么都别信，直接把魂灯捏碎即可。");
    return;
  }

  if (storyStep === 18) {
    storyStep = 19;
    setStorySpeaker("沈照微");
    renderFinalThreat();
    return;
  }

  if (storyStep === 19) {
    triggerFinalFlash();
    return;
  }

  if (storyStep === 20) {
    if (redFigureChoices && !redFigureChoices.hidden) {
      return;
    }
    showShadowScene();
    return;
  }

  if (storyStep === 201) {
    suspendStoryModal();
    openQTE();
    return;
  }

  if (storyStep === 202) {
    storyStep = 204;
    setStorySpeaker("沈照微");
    renderStoryLine("多谢两位侠士，让我恢复了短暂的神情");
    return;
  }

  if (storyStep === 204) {
    storyStep = 205;
    setStorySpeaker("温照夜");
    renderStoryLine("沈师姐，我们准备消除这个邪祟，你有什么有用的信息能和我们说说吗？");
    return;
  }

  if (storyStep === 205) {
    storyStep = 206;
    setStorySpeaker("沈照微");
    renderStoryLine("每次被他吸食魂力，我都会遗忘部分记忆。");
    return;
  }

  if (storyStep === 206) {
    storyStep = 207;
    setStorySpeaker("沈照微");
    renderStoryLine("但是我记得这个东西很重要，是行舟之前偷偷塞给我的");
    return;
  }

  if (storyStep === 207) {
    if (localStorage.getItem("qingdeng-weigui:remnant-two-oldwell-claimed") === "true") {
      storyStep = 208;
      setStorySpeaker("沈照微");
      renderStoryLine("再次感谢两位，我把剩下的魂力都传给你们，这样我也解脱了");
      return;
    }
    suspendStoryModal();
    openRemnantTwoPickup();
    return;
  }

  if (storyStep === 208) {
    storyStep = 209;
    setStorySpeaker("沈照微");
    renderStoryLine("不要相信邪祟的任何一句话，他有可能不是一个个体。");
    return;
  }

  if (storyStep === 209) {
    storyStep = 210;
    setStorySpeaker("");
    renderStoryLine("沈照微化为星星光点飞入你和温照夜的身体里");
    return;
  }

  if (storyStep === 210) {
    storyStep = 211;
    setStorySpeaker("沈照微");
    renderStoryLine("如果能遇到陆行舟，帮我跟他说一句对不起......");
    return;
  }

  if (storyStep === 211) {
    storyStep = 212;
    setStorySpeaker("温照夜");
    renderStoryLine("xxx道友，你先走一步，我稍后跟上。");
    return;
  }

  if (storyStep === 212) {
    storyStep = 213;
    setStorySpeaker("温照夜");
    renderStoryLine("我感应到我姐姐的位置了，我用符咒把她先送上井口");
    return;
  }

  if (storyStep === 213) {
    storyStep = 20;
    showShadowScene();
    return;
  }

  if (storyStep === 203) {
    window.location.href = "./ending-five.html";
    return;
  }

  if (storyStep === 22) {
    setShadowChoicesVisible(true);
    shadowChoices?.querySelector("button")?.focus({ preventScroll: true });
    return;
  }

  if (storyStep === 23) {
    storyStep = 24;
    renderStoryLine("给你个机会，要不要加入我们？");
    return;
  }

  if (storyStep === 24) {
    storyStep = 25;
    renderStoryLine("永生永世，不老不死！");
    return;
  }

  if (storyStep === 25) {
    setShadowOfferChoicesVisible(true);
    shadowOfferChoices?.querySelector("button")?.focus({ preventScroll: true });
    return;
  }

  if (storyStep === 26) {
    storyStep = 27;
    renderStoryLine("你哪里来的这么多魂力？怎么还有魂力圆满之人？你是谁？");
    return;
  }

  if (storyStep === 27) {
    storyStep = 28;
    renderStoryLine("啊啊啊啊啊快停下，这么多魂力快把我撑破了！");
    return;
  }

  if (storyStep === 28) {
    storyStep = 29;
    setStorySpeaker("");
    renderStoryLine("你看着黑影在阵法中痛苦，顿时放下心来......");
    return;
  }

  if (storyStep === 29) {
    storyStep = 30;
    setStorySpeaker("奇怪黑影");
    renderStoryLine("哈哈哈哈哈哈，杀了我吧！");
    return;
  }

  if (storyStep === 30) {
    storyStep = 31;
    renderStoryLine("我们的大业不会就此停歇！");
    return;
  }

  if (storyStep === 31) {
    storyStep = 32;
    setStorySpeaker("");
    renderStoryLine("你看见黑影开始疯狂冲击阵法。");
    return;
  }

  if (storyStep === 32) {
    storyStep = 33;
    renderStoryLine("一次");
    return;
  }

  if (storyStep === 33) {
    triggerBarrierImpact(1);
    storyStep = 34;
    renderStoryLine("二次");
    return;
  }

  if (storyStep === 34) {
    triggerBarrierImpact(2);
    storyStep = 35;
    renderStoryLine("三次");
    return;
  }

  if (storyStep === 35) {
    triggerBarrierImpact(3, true);
    storyStep = 36;
    renderStoryLine("阵法一层层碎开，黑影从阵法中慢慢朝你靠近。");
    return;
  }

  if (storyStep === 36) {
    showShadowApproachScene();
    return;
  }

  if (storyStep === 37) {
    storyStep = 38;
    setStorySpeaker("");
    renderStoryLine("黑影一把掐住了你的脖子，你开始感觉呼吸困难");
    return;
  }

  if (storyStep === 38) {
    storyStep = 39;
    setStorySpeaker("奇怪黑影");
    renderStoryLine("就算我死，拉一个垫背的也是没有问题！");
    return;
  }

  if (storyStep === 39) {
    storyStep = 40;
    setStorySpeaker("");
    renderStoryLine("就在黑雾即将把你吞噬之时...你听到了一个声音从你身后传来");
    return;
  }

  if (storyStep === 40) {
    storyStep = 41;
    setStorySpeaker("温照夜");
    renderStoryLine("住手！");
    return;
  }

  if (storyStep === 41) {
    showWenConfrontsShadowScene();
    return;
  }

  if (storyStep === 42) {
    storyStep = 43;
    setStorySpeaker("温照夜");
    renderStoryLine("抱歉，xxx道友，我来晚了");
    return;
  }

  if (storyStep === 43) {
    storyStep = 44;
    setStorySpeaker("奇怪黑影");
    renderStoryLine("你是那玄濯的弟子？这家伙还舍得把这么珍贵的镇魂符给你？");
    return;
  }

  if (storyStep === 44) {
    storyStep = 45;
    setStorySpeaker("温照夜");
    renderStoryLine("不好意思，我偷的，这里还有一大把");
    return;
  }

  if (storyStep === 45) {
    storyStep = 46;
    setStorySpeaker("");
    renderStoryLine("说完，温照夜丢了四五张符箓在黑影身上");
    return;
  }

  if (storyStep === 46) {
    storyStep = 47;
    renderStoryLine("黑影一边大叫一边退向角落");
    return;
  }

  if (storyStep === 47) {
    storyStep = 48;
    setStorySpeaker("温照夜");
    renderStoryLine("xxx道友，干的漂亮，现在我送你出去吧，他已经是强弩之末，无需担心");
    return;
  }

  if (storyStep === 48) {
    storyStep = hasSearchedJiangYunxiu() ? 49 : 61;
    setStorySpeaker("");
    renderStoryLine("温照夜刚准备起手送你出去，黑影突然在一旁大笑");
    return;
  }

  if (storyStep === 49) {
    storyStep = 50;
    setStorySpeaker("奇怪黑影");
    renderStoryLine("温照夜...不，我应该叫你姜云岫？");
    return;
  }

  if (storyStep === 50) {
    storyStep = 51;
    setStorySpeaker("");
    renderStoryLine("你看见温照夜身形一震");
    return;
  }

  if (storyStep === 51) {
    storyStep = 52;
    setStorySpeaker("奇怪黑影");
    renderStoryLine("我说怎么这么耳熟，原来你是姜云蘅的妹妹。");
    return;
  }

  if (storyStep === 52) {
    storyStep = 53;
    renderStoryLine("可惜了明明你的姐姐马上就能得救了，被我吸食魂力知道真名的人");
    return;
  }

  if (storyStep === 53) {
    storyStep = 54;
    renderStoryLine("永远都跑不掉！哈哈哈哈哈哈！");
    return;
  }

  if (storyStep === 54) {
    storyStep = 55;
    setStorySpeaker("");
    renderStoryLine("黑雾弥漫在温照夜脚下，你拼命拉她却纹丝不动");
    return;
  }

  if (storyStep === 55) {
    storyStep = 56;
    renderStoryLine("轰隆隆，黑影整出的动静让旧井下面的隧道快要坍塌下来");
    return;
  }

  if (storyStep === 56) {
    storyStep = 57;
    setStorySpeaker("姜云岫");
    renderStoryLine("xxx道友，谢谢你愿意来帮我，以及后会无期。");
    return;
  }

  if (storyStep === 57) {
    storyStep = 58;
    setStorySpeaker("");
    renderStoryLine("一张符箓贴在你的身上，你顿时天旋地转，缓过来已经到了青岚宗大门外。");
    return;
  }

  if (storyStep === 58) {
    storyStep = 59;
    suspendStoryModal();
    sceneImage.src = farewellImage;
    sceneImage.alt = "黑雾逐渐包裹姜云岫的诀别一幕";
    sceneImage.classList.add("is-depth");
    return;
  }

  if (storyStep === 60) {
    setEndingThreeChoiceVisible(true);
    endingThreeChoice?.querySelector("button")?.focus({ preventScroll: true });
    return;
  }

  if (storyStep === 61) {
    storyStep = 62;
    setStorySpeaker("奇怪黑影");
    renderStoryLine("你以为消灭了我就能结束吗？不可能的！");
    return;
  }

  if (storyStep === 62) {
    storyStep = 63;
    setStorySpeaker("温照夜");
    renderStoryLine("管你这么多，赶紧死吧，xxx道友拿好这张符，你先传送去井口，把我姐姐送去白蘅的药堂。");
    return;
  }

  if (storyStep === 63) {
    storyStep = 64;
    setStorySpeaker("奇怪黑影");
    renderStoryLine("...你难道就不好奇吗！");
    return;
  }

  if (storyStep === 64) {
    storyStep = 65;
    setStorySpeaker("温照夜");
    renderStoryLine("xxx道友别听他蛊惑人心了，快走吧。");
    return;
  }

  if (storyStep === 65) {
    storyStep = 66;
    setStorySpeaker("");
    renderStoryLine("温照夜把符咒贴你身上，你顿时天旋地转，缓过神已经来到了井口");
    return;
  }

  if (storyStep === 66) {
    storyStep = 67;
    suspendStoryModal();
    sceneImage.src = unconsciousImage;
    sceneImage.alt = "旧井旁躺着一名昏迷的女子";
    sceneImage.classList.add("is-depth");
    return;
  }

  if (storyStep === 68) {
    setEndingFourChoiceVisible(true);
    endingFourChoice?.querySelector("button")?.focus({ preventScroll: true });
    return;
  }

  if (storyStep === 8) {
    window.location.href = "./ending-one.html";
  }
});

nameForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  event.stopPropagation();

  const submittedName = nameInput?.value.trim() || "";
  if (!submittedName) {
    if (nameError) {
      nameError.textContent = "请留下姓名。";
    }
    nameInput?.focus({ preventScroll: true });
    return;
  }

  localStorage.setItem(playerNameStorageKey, submittedName);
  if (nameError) {
    nameError.textContent = "";
  }
  nameEntry.hidden = true;
  const hasCompleteFormation = localStorage.getItem("qingdeng-weigui:remnant-puzzle-completed") === "true";
  if (hasCompleteFormation) {
    storyStep = 100;
    setStorySpeaker("");
    renderStoryLine("你把黑色留影石和这个阵法图交给了温照夜。");
  } else {
    storyStep = 3;
    renderStoryLine("xxx道友，看来你已经知道事件的真相了吧，那么，你的选择是什么？");
  }
  if (storyContinue) {
    storyContinue.hidden = false;
  }
  storyDialog?.focus({ preventScroll: true });
});

realNameForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  event.stopPropagation();

  const submittedName = realNameInput?.value.trim() || "";
  if (!submittedName) {
    if (realNameError) {
      realNameError.textContent = "请输入真名。";
    }
    realNameInput?.focus({ preventScroll: true });
    return;
  }

  if (submittedName !== "无相祟") {
    if (realNameError) {
      realNameError.textContent = "真名不对，再想想。";
    }
    realNameInput?.focus({ preventScroll: true });
    realNameInput?.select();
    return;
  }

  if (realNameError) {
    realNameError.textContent = "";
  }
  realNameEntry.hidden = true;
  storyStep = 129;
  setStorySpeaker("");
  renderStoryLine("你和温照夜对视一笑。");
  if (storyContinue) {
    storyContinue.hidden = false;
  }
  storyDialog?.focus({ preventScroll: true });
});

spellForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  event.stopPropagation();

  const submittedSpell = spellInput?.value.trim() || "";
  if (!submittedSpell) {
    if (spellError) {
      spellError.textContent = "请输入咒印。";
    }
    spellInput?.focus({ preventScroll: true });
    return;
  }

  if (submittedSpell !== "天罡镇邪地煞封魂") {
    if (spellError) {
      spellError.textContent = "咒印不对，再想想。";
    }
    spellInput?.focus({ preventScroll: true });
    spellInput?.select();
    return;
  }

  if (spellError) {
    spellError.textContent = "";
  }
  spellEntry.hidden = true;
  storyStep = 134;
  setStorySpeaker("");
  renderStoryLine("咒语说完那一瞬，金光大盛");
  if (storyContinue) {
    storyContinue.hidden = false;
  }
  storyDialog?.focus({ preventScroll: true });
});

document.querySelector("[data-ending-six]")?.addEventListener("click", () => {
  window.location.href = "./ending-six.html";
});

qteInput?.addEventListener("compositionstart", () => {
  qteIsComposing = true;
});

qteInput?.addEventListener("compositionend", () => {
  qteIsComposing = false;
});

qteForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  event.stopPropagation();

  if (qteIsComposing) {
    return;
  }

  const value = qteInput?.value.trim() || "";
  if (!value) {
    return;
  }

  if (value === "沈照微") {
    qteSuccessCount += 1;
    if (qteProgress) {
      qteProgress.textContent = `${qteSuccessCount} / 3`;
    }
    if (qteInput) {
      qteInput.value = "";
    }
    if (qteSuccessCount >= 3) {
      handleQTESuccess();
    } else {
      startQTETimer();
    }
    return;
  }

  handleQTEFailure();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && pickupModal && !pickupModal.hidden) {
    event.preventDefault();
    closePickupModal();
    return;
  }

  if (event.key === "Escape" && storyModal && !storyModal.hidden) {
    event.preventDefault();
    closeStoryModal();
  }
});
