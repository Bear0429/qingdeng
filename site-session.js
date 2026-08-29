(() => {
  const COVER_SESSION_KEY = "qingdeng-weigui:cover-entered";

  try {
    sessionStorage.setItem(COVER_SESSION_KEY, "true");
  } catch {
    // Session storage may be unavailable in restrictive browser modes.
  }
})();
