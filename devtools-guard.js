(() => {
  "use strict";

  const gatePath = "ww.html";
  const storageKey = "sofi-devtools-trigger";
  const storageReasonKey = "sofi-devtools-reason";
  const triggerKeys = new Set(["i", "j", "c", "k", "e"]);
  const sourceUrl = document.currentScript?.src || window.location.href;
  let redirecting = false;

  function isGatePage() {
    const path = window.location.pathname.toLowerCase();
    return path.endsWith("/ww.html") || path.endsWith("/ww") || path.endsWith("/secret-room");
  }

  function gateUrl(reason) {
    const url = new URL(gatePath, sourceUrl);
    url.searchParams.set("trigger", "devtools");
    url.searchParams.set("reason", reason);
    url.searchParams.set("r", Date.now().toString(36));
    return url.href;
  }

  function markTriggered(reason) {
    try {
      sessionStorage.setItem(storageKey, "1");
      sessionStorage.setItem(storageReasonKey, reason);
    } catch (_) {
      // Session storage may be unavailable in private or restricted contexts.
    }
  }

  function redirectToGate(reason = "devtools") {
    if (redirecting || isGatePage()) return;
    redirecting = true;
    markTriggered(reason);
    window.location.replace(gateUrl(reason));
  }

  function isDevtoolsShortcut(event) {
    const key = String(event.key || "").toLowerCase();
    const ctrlOrCmd = event.ctrlKey || event.metaKey;
    return (
      event.key === "F12" ||
      (ctrlOrCmd && event.shiftKey && triggerKeys.has(key)) ||
      (event.metaKey && event.altKey && triggerKeys.has(key)) ||
      (ctrlOrCmd && ["u", "s", "p"].includes(key))
    );
  }

  document.addEventListener("keydown", (event) => {
    if (!isDevtoolsShortcut(event)) return;
    event.preventDefault();
    event.stopImmediatePropagation();
    redirectToGate();
  }, true);

  function hasDevtoolsViewportGap() {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return false;
    const threshold = Math.max(165, Math.min(320, Math.min(window.outerWidth, window.outerHeight) * 0.18));
    const widthGap = Math.abs(window.outerWidth - window.innerWidth);
    const heightGap = Math.abs(window.outerHeight - window.innerHeight);
    return widthGap > threshold || heightGap > threshold;
  }

  function checkDevtoolsViewportGap() {
    if (redirecting || isGatePage()) return;
    if (hasDevtoolsViewportGap()) redirectToGate("viewport-gap");
  }

  window.SofiDevtoolsGate = Object.freeze({
    open: redirectToGate,
    mark: markTriggered,
    isGatePage
  });

  window.addEventListener("resize", checkDevtoolsViewportGap, { passive: true });
  window.addEventListener("focus", checkDevtoolsViewportGap, { passive: true });
  setInterval(checkDevtoolsViewportGap, 1000);
})();
