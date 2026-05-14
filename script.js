const SOFI_ID = "1485425543087128676";
const DISCORD_API_BASE = String(window.SOFI_API_BASE || "").replace(/\/$/, "");
const USE_DISCORD_AVATAR_API = window.SOFI_USE_DISCORD_API === true || Boolean(DISCORD_API_BASE);
const DISCORD_AVATAR_FALLBACK = "./public/sofi2.jpeg";
const DISCORD_AVATAR_REFRESH_MS = 5 * 60 * 1000;

const introStage = document.getElementById("intro-stage");
const introOpening = document.getElementById("opening");
const introWorld = document.getElementById("world");
const introHint = document.getElementById("hint");
const loadingScreen = document.getElementById("loading-screen");
const finalBlack = document.getElementById("final-black");
const terminalLines = document.getElementById("terminal-lines");
const avatar = document.getElementById("discord-avatar");
const avatarDecoration = document.getElementById("discord-avatar-decoration");
const avatarFallback = document.getElementById("avatar-fallback");
const loadingProfileName = document.getElementById("loading-profile-name");
const loadingProfileUser = document.getElementById("loading-profile-user");
const bgAudio = document.getElementById("bg-audio");
const storyStage = document.getElementById("story-stage");
const letterScene = document.getElementById("letter-scene");
const letterButton = document.getElementById("letter-button");
const winxStage = document.getElementById("winx-stage");
const winxIntro = document.getElementById("winx-intro");
const winxCarta = document.getElementById("winx-carta");
const winxIntroWarning = document.getElementById("winx-intro-warning");
const winxBlink = document.getElementById("winx-blink");
const winxFoco = document.getElementById("winx-foco");
const winxBoot = document.getElementById("winx-boot");
const winxBootCanvas = document.getElementById("winx-boot-canvas");
const winxDesktop = document.getElementById("winx-desktop");
const winxVmHeader = document.getElementById("winx-vm-header");
const winxClock = document.getElementById("winx-clock");
const winxGoHome = document.getElementById("winx-go-home");
const winxOpenLetter = document.getElementById("winx-open-letter");
const winxOpenGame = document.getElementById("winx-open-game");
const winxMinGame = document.getElementById("winx-min-game");
const winxCloseGame = document.getElementById("winx-close-game");
const winxGameWindow = document.getElementById("winx-game-window");
const winxLetterWindow = document.getElementById("winx-letter-window");
const winxMinLetter = document.getElementById("winx-min-letter");
const winxCloseLetter = document.getElementById("winx-close-letter");
const winxLetterContent = document.getElementById("winx-letter-content");
const winxLetterImage = document.getElementById("winx-letter-image");
const winxLetterWarning = document.getElementById("winx-letter-warning");
const winxGameStage = document.getElementById("winx-game-stage");
const winxCatcher = document.getElementById("winx-catcher");
const winxScore = document.getElementById("winx-score");
const winxStartGame = document.getElementById("winx-start-game");
const winxRestartGame = document.getElementById("winx-restart-game");
const winxGameMessage = document.getElementById("winx-game-message");
const winxIconHome = document.getElementById("winx-icon-home");
const winxIconLetter = document.getElementById("winx-icon-letter");
const winxTitleLetterCanvas = document.getElementById("winx-title-letter-canvas");
const winxTitleGameCanvas = document.getElementById("winx-title-game-canvas");
const winxGameCanvas = document.getElementById("winx-game-canvas");

const root = document.getElementById("contentRoot");
const pageWrap = document.getElementById("pageWrap");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dots = document.getElementById("dots");
const heartsContainer = document.getElementById("floatingHearts");

let audioUnlocked = false;

let binaryCanvas = null;
let binaryCtx = null;
let binaryDrops = [];
let binaryAnimationId = null;

let introReadyForContinue = false;
let introDestroyed = false;
let introStarsFrameId = null;
let introParallaxFrameId = null;
let introShootIntervalId = null;
let introScooterStartTimeoutId = null;
let introScooterIntervalId = null;
let introTimers = [];
let introMouseX = 0;
let introMouseY = 0;
let introCamX = 0;
let introCamY = 0;
let introHasFinePointer = false;

let page = 0;
let pfp = null;
let discordFrame = null;
let discordDisplayName = "sofi";
let discordUsername = "i4pup";
let heartId = 0;
let heartsInterval = null;
let loadingStarted = false;
let letterOpened = false;
let winxSceneShown = false;
let winxTransitionStarted = false;
let winxVmInterval = null;
let winxClockInterval = null;
let winxBootCtx = null;
let winxBootFrameId = null;
let winxBootStartAt = 0;
let winxTopZ = 20;
let winxIntroDismissed = false;
let winxLetterWarningTimeoutId = null;
let discordInfoPromise = null;
let discordAvatarRefreshInterval = null;

const cuteLines = [
  "sofi@heart:~$ ./load-soft-love.sh",
  "[ ok ] collecting tiny pink stars...",
  "[ ok ] packing warm hugs in pixels...",
  "[ .. ] whispering: 47 luv sofi",
  "[ ok ] saving her smile as favorite.exe",
  "[ ok ] sending moonlight and sweet dreams...",
  "[ done ] you are someone special ♡"
];

const PAGES = [
  { type: "profile" },
  {
    type: "text",
    title: "♡",
    highlight: "impecável",
    text: "Às vezes eu me pego admirando a forma como o seu cabelo loiro consegue ser tão radiante. Ele possui um brilho impecável, algo que parece ter sido feito sob medida para você. É uma beleza muito autêntica e cheia de luz, que me lembra o quanto você é única e como a sua presença se destaca de uma forma leve e encantadora.",
    imgSrc: "./public/cabelo.jpg"
  },
  {
    type: "text",
    title: "♡",
    highlight: "detalhe da sua alma",
    text: "Ver você magoada me machuca de verdade, porque sinto que alguém tão especial merecia apenas motivos para sorrir. Eu consigo sentir a intensidade do que você está passando, e isso me faz querer ser o seu abrigo. Eu quero descobrir cada detalhe da sua alma, inclusive as partes que você guarda no silêncio do seu choro, para poder te lembrar o quanto você é incrível e que eu nunca vou deixar você enfrentar nenhum momento difícil sozinha.",
    imgSrc: "./public/chorar.png"
  },
  {
    type: "text",
    title: "♡",
    highlight: "completamente ela mesma",
    text: "Você é a única pessoa que eu conheço que consegue ser completamente ela mesma sem querer. Não tem afetação, não tem performance. Você simplesmente existe e isso já é mais do que suficiente.",
    imgSrc: "./public/mesma.png"
  },
  {
    type: "text",
    title: "♡",
    highlight: "sentir mais fundo",
    text: "Ser sensível não é fraqueza, é você sentindo o mundo de um jeito mais profundo do que a maioria consegue. Eu sei que às vezes dói mais. Mas é exatamente essa intensidade que te faz tão real, tão incrível, tão você.",
    imgSrc: "./public/nos.png"
  },
  {
    type: "text",
    title: "♡",
    highlight: "é por amor",
    text: "Às vezes eu surto. Às vezes eu exagero e sei que não deveria. Mas você tem que entender que eu surto porque você importa tanto que qualquer coisa que te magoa me afeta de um jeito que eu ainda tô aprendendo a lidar. É por amor e sempre foi.",
    imgSrc: "./public/nos.png"
  },
  {
    type: "text",
    title: "♡",
    highlight: "minha princesa",
    text: "Você é minha princesa. Não porque preciso de uma, mas porque você simplesmente é. Esse site existe pra que você nunca esqueça disso, nos dias em que o mundo for pesado demais pra lembrar sozinha. Eu te amo infinitamente, minha princesinha. Agora e pra sempre.",
    imgSrc: "./public/nos.png"
  }
];

function playBackgroundAudio() {
  if (!bgAudio || audioUnlocked) return;
  bgAudio.loop = true;
  bgAudio.volume = 0.7;
  const p = bgAudio.play();
  if (p && typeof p.catch === "function") {
    p.then(() => {
      audioUnlocked = true;
    }).catch(() => {});
  }
}

function unlockAndPlay() {
  playBackgroundAudio();
  if (!audioUnlocked && bgAudio) {
    bgAudio.play().then(() => {
      audioUnlocked = true;
    }).catch(() => {});
  }
}

window.addEventListener("DOMContentLoaded", playBackgroundAudio);
window.addEventListener("load", playBackgroundAudio);
document.addEventListener("click", unlockAndPlay, { once: true });
document.addEventListener("touchstart", unlockAndPlay, { once: true });
document.addEventListener("keydown", unlockAndPlay, { once: true });

function protectImagesFromSaving() {
  document.querySelectorAll("img").forEach((img) => {
    if (img.dataset && img.dataset.fallbackBound !== "true") {
      img.dataset.fallbackBound = "true";
      if (img.classList.contains("profile-badge-avatar")) {
        img.addEventListener("error", () => {
          if (img.getAttribute("src") !== "./public/bow-pink.png") img.src = "./public/bow-pink.png";
        });
      }
      if (img.classList.contains("profile-badge-frame") || img.classList.contains("slot-image")) {
        img.addEventListener("error", () => img.remove());
      }
    }
    if (img.dataset && img.dataset.protected === "true") return;
    if (img.dataset) img.dataset.protected = "true";
    img.setAttribute("draggable", "false");
    img.addEventListener("contextmenu", (e) => e.preventDefault());
    img.addEventListener("dragstart", (e) => e.preventDefault());
    img.addEventListener("selectstart", (e) => e.preventDefault());
  });
}

function lockPageAgainstCopyAndDrag() {
  const block = (e) => e.preventDefault();

  document.addEventListener("contextmenu", block);
  document.addEventListener("dragstart", block);
  document.addEventListener("drop", block);
  document.addEventListener("selectstart", block);
  document.addEventListener("copy", block);
  document.addEventListener("cut", block);

  document.addEventListener("keydown", (e) => {
    const key = String(e.key || "").toLowerCase();
    const ctrlOrCmd = e.ctrlKey || e.metaKey;
    const blockedShortcuts = ["a", "c", "x", "s", "u", "p"];
    const blockedDevtools = ["i", "j", "c"];

    if (e.key === "F12") {
      e.preventDefault();
      return;
    }

    if (ctrlOrCmd && blockedShortcuts.includes(key)) {
      e.preventDefault();
      return;
    }

    if (ctrlOrCmd && e.shiftKey && blockedDevtools.includes(key)) {
      e.preventDefault();
    }
  });
}

if (avatar && avatarFallback) {
  avatar.addEventListener("error", () => {
    const current = String(avatar.getAttribute("src") || "");
    const defaultAvatar = DISCORD_AVATAR_FALLBACK;
    if (current && current !== defaultAvatar) {
      avatar.style.display = "";
      avatar.src = defaultAvatar;
      avatarFallback.classList.remove("show");
      return;
    }
    avatar.style.display = "none";
    avatarFallback.classList.add("show");
    if (avatarDecoration) avatarDecoration.hidden = true;
  });
}

function setupCustomCursor() {
  const cursor = document.getElementById("cursor");
  if (!cursor) return;

  const hasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!hasFinePointer) {
    cursor.style.display = "none";
    return;
  }

  const interactiveSelector = [
    "button",
    "a[href]",
    "[role='button']",
    ".molang",
    "#winx-carta",
    "#winx-letter-content",
    "#winx-letter-image",
    ".page-dot",
    ".close-button"
  ].join(", ");

  let cursorX = -9999;
  let cursorY = -9999;
  let cursorFrame = 0;

  function paintCursor() {
    cursorFrame = 0;
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
  }

  function scheduleCursorPaint(event) {
    cursorX = event.clientX;
    cursorY = event.clientY;
    if (!cursorFrame) cursorFrame = requestAnimationFrame(paintCursor);
  }

  document.addEventListener("pointermove", scheduleCursorPaint, { passive: true });

  document.addEventListener("pointerover", (event) => {
    const targetEl = event.target instanceof HTMLElement ? event.target : null;
    if (targetEl?.closest(interactiveSelector)) cursor.classList.add("hovering");
  }, { passive: true });

  document.addEventListener("pointerout", (event) => {
    const targetEl = event.target instanceof HTMLElement ? event.target : null;
    if (!targetEl?.closest(interactiveSelector)) return;

    const relatedEl = event.relatedTarget instanceof HTMLElement ? event.relatedTarget : null;
    if (!relatedEl?.closest(interactiveSelector)) cursor.classList.remove("hovering");
  }, { passive: true });

  document.addEventListener("pointerdown", () => {
    cursor.classList.add("pressing");
  }, { passive: true });

  document.addEventListener("pointerup", () => {
    cursor.classList.remove("pressing");
  }, { passive: true });

  document.addEventListener("mouseleave", () => {
    cursorX = -9999;
    cursorY = -9999;
    if (!cursorFrame) cursorFrame = requestAnimationFrame(paintCursor);
    cursor.classList.remove("hovering", "pressing");
  });
}

function scheduleIntroTimer(fn, delay) {
  const id = setTimeout(fn, delay);
  introTimers.push(id);
  return id;
}

function clearIntroTimers() {
  introTimers.forEach((id) => clearTimeout(id));
  introTimers = [];
}

function initWorldIntro() {
  if (!introStage || !introWorld) return;

  const canvas = document.getElementById("canvas");
  const cursor = document.getElementById("cursor");
  const layerFar = document.getElementById("layer-far");
  const layerMid = document.getElementById("layer-mid");
  const layerNear = document.getElementById("layer-near");
  const openingLine1 = document.getElementById("ol1");
  const openingLine2 = document.getElementById("ol2");
  const poem1 = document.getElementById("p1");
  const poem2 = document.getElementById("p2");
  const poem3 = document.getElementById("p3");
  const scooterWrap = document.getElementById("scooter-wrap");

  if (!canvas || !layerFar || !layerMid || !layerNear || !openingLine1 || !openingLine2 || !poem1 || !poem2 || !poem3 || !scooterWrap) {
    introReadyForContinue = true;
    return;
  }

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    introReadyForContinue = true;
    return;
  }

  introHasFinePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  let width = 0;
  let height = 0;
  let stars = [];
  let shoots = [];
  let scooterPortalTimers = [];

  const COLORS = ["#ffffff", "#ffcce0", "#ffd166", "#c8b6ff", "#b3e8ff"];

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function createStars() {
    stars = Array.from({ length: 260 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.35 + 0.25,
      alpha: 0.2 + Math.random() * 0.34,
      twinkle: 0.05 + Math.random() * 0.16,
      speed: 0.00045 + Math.random() * 0.001,
      phase: Math.random() * Math.PI * 2,
      driftX: (Math.random() - 0.5) * 11,
      driftY: (Math.random() - 0.5) * 7,
      glow: Math.random() < 0.16,
      col: COLORS[Math.floor(Math.random() * COLORS.length)]
    }));
  }

  function spawnShootingStar() {
    shoots.push({
      x: Math.random() * width * 0.72,
      y: height * 0.08 + Math.random() * height * 0.36,
      len: 135 + Math.random() * 115,
      spd: 10 + Math.random() * 7,
      life: 1,
      fade: 0.016 + Math.random() * 0.008,
      width: 1.8 + Math.random() * 1.1,
      a: Math.PI / 4 + (Math.random() - 0.5) * 0.28
    });
  }

  function drawIntro(t) {
    if (introDestroyed) return;
    ctx.clearRect(0, 0, width, height);

    stars.forEach((star) => {
      const pulse = Math.sin((t * star.speed) + star.phase);
      const x = star.x + Math.sin((t * 0.00008) + star.phase) * star.driftX;
      const y = star.y + Math.cos((t * 0.00007) + star.phase) * star.driftY;
      const alpha = Math.max(0.08, star.alpha + pulse * star.twinkle);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = star.col;
      ctx.beginPath();
      ctx.arc(x, y, star.r, 0, Math.PI * 2);
      ctx.fill();

      if (star.glow && alpha > 0.28) {
        ctx.globalAlpha = alpha * 0.22;
        ctx.beginPath();
        ctx.arc(x, y, star.r * 3.3, 0, Math.PI * 2);
        ctx.fill();
      }
    });

    shoots = shoots.filter((shoot) => shoot.life > 0);
    shoots.forEach((shoot) => {
      const fade = Math.max(0, Math.min(1, shoot.life));
      const gradient = ctx.createLinearGradient(
        shoot.x,
        shoot.y,
        shoot.x - Math.cos(shoot.a) * shoot.len,
        shoot.y - Math.sin(shoot.a) * shoot.len
      );
      gradient.addColorStop(0, `rgba(255,248,252,${fade})`);
      gradient.addColorStop(0.35, `rgba(255,179,210,${fade * 0.72})`);
      gradient.addColorStop(1, "rgba(255,220,235,0)");

      ctx.globalAlpha = 1;
      ctx.strokeStyle = gradient;
      ctx.lineWidth = shoot.width;
      ctx.lineCap = "round";
      ctx.shadowColor = `rgba(255,179,210,${fade * 0.8})`;
      ctx.shadowBlur = 12 * fade;
      ctx.beginPath();
      ctx.moveTo(shoot.x, shoot.y);
      ctx.lineTo(shoot.x - Math.cos(shoot.a) * shoot.len, shoot.y - Math.sin(shoot.a) * shoot.len);
      ctx.stroke();

      ctx.globalAlpha = fade;
      ctx.fillStyle = "#fff8fc";
      ctx.beginPath();
      ctx.arc(shoot.x, shoot.y, shoot.width * 1.15, 0, Math.PI * 2);
      ctx.fill();
      ctx.shadowBlur = 0;

      shoot.x += Math.cos(shoot.a) * shoot.spd;
      shoot.y += Math.sin(shoot.a) * shoot.spd;
      shoot.life -= shoot.fade;
    });

    ctx.globalAlpha = 1;
    introStarsFrameId = requestAnimationFrame(drawIntro);
  }

  function animateParallax(t) {
    if (introDestroyed) return;
    const ambientX = Math.sin(t * 0.00022) * 0.36;
    const ambientY = Math.cos(t * 0.00018) * 0.28;
    introCamX += (introMouseX + ambientX - introCamX) * 0.035;
    introCamY += (introMouseY + ambientY - introCamY) * 0.035;

    layerFar.style.transform = `translate(${introCamX * -5}px,${introCamY * -5}px)`;
    layerMid.style.transform = `translate(${introCamX * -13}px,${introCamY * -9}px)`;
    layerNear.style.transform = `translate(${introCamX * -21}px,${introCamY * -15}px)`;

    introParallaxFrameId = requestAnimationFrame(animateParallax);
  }

  function onMouseMove(e) {
    introMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    introMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
  }

  function toggleCursorHover(state) {
    if (!introHasFinePointer || !cursor) return;
    cursor.classList.toggle("hovering", state);
  }

  function clearScooterPortals() {
    scooterPortalTimers.forEach((id) => clearTimeout(id));
    scooterPortalTimers = [];
    if (!introHint) return;
    introHint.classList.remove("portal-left-open", "portal-left-suck", "portal-right-open", "portal-right-release");
  }

  function scheduleScooterPortalCue(fn, delay) {
    const id = setTimeout(() => {
      scooterPortalTimers = scooterPortalTimers.filter((timerId) => timerId !== id);
      if (introDestroyed) return;
      fn();
    }, delay);
    scooterPortalTimers.push(id);
  }

  function updateScooterPortalPath() {
    const leftPortal = introHint?.querySelector(".hint-portal-left");
    const rightPortal = introHint?.querySelector(".hint-portal-right");
    if (!leftPortal || !rightPortal || !scooterWrap) return;

    const leftRect = leftPortal.getBoundingClientRect();
    const rightRect = rightPortal.getBoundingClientRect();
    const hintRect = introHint.getBoundingClientRect();
    const scooterRect = scooterWrap.getBoundingClientRect();
    const scooterWidth = scooterRect.width || 96;
    const scooterHeight = scooterRect.height || 72;
    const lineCenterY = hintRect.top + hintRect.height * 0.5;
    const scooterY = Math.min(
      window.innerHeight - scooterHeight - 6,
      Math.max(6, lineCenterY - scooterHeight * 0.52)
    );

    scooterWrap.style.setProperty("--scooter-y", `${Math.round(scooterY)}px`);
    scooterWrap.style.setProperty("--scooter-start-x", `${Math.round(-scooterWidth - 32)}px`);
    scooterWrap.style.setProperty("--scooter-portal-in-x", `${Math.round(leftRect.left + leftRect.width * 0.5 - scooterWidth * 0.56)}px`);
    scooterWrap.style.setProperty("--scooter-portal-out-x", `${Math.round(rightRect.left + rightRect.width * 0.5 - scooterWidth * 0.42)}px`);
    scooterWrap.style.setProperty("--scooter-end-x", `${Math.round(window.innerWidth + 44)}px`);
  }

  function rideScooter() {
    if (!scooterWrap || scooterWrap.classList.contains("riding")) return;
    clearScooterPortals();
    updateScooterPortalPath();
    scooterWrap.classList.add("riding");

    scheduleScooterPortalCue(() => introHint?.classList.add("portal-left-open"), 1940);
    scheduleScooterPortalCue(() => introHint?.classList.add("portal-left-suck"), 2260);
    scheduleScooterPortalCue(() => introHint?.classList.remove("portal-left-open", "portal-left-suck"), 2760);
    scheduleScooterPortalCue(() => introHint?.classList.add("portal-right-open", "portal-right-release"), 2860);
    scheduleScooterPortalCue(() => introHint?.classList.remove("portal-right-release"), 3400);
    scheduleScooterPortalCue(() => introHint?.classList.remove("portal-right-open"), 3660);

    scooterWrap.addEventListener("animationend", () => {
      scooterWrap.classList.remove("riding");
      clearScooterPortals();
    }, { once: true });
  }

  function startScooterLoop() {
    if (introScooterIntervalId) return;
    introScooterIntervalId = setInterval(rideScooter, 12500);
  }

  resizeCanvas();
  createStars();

  window.addEventListener("resize", () => {
    resizeCanvas();
    createStars();
    updateScooterPortalPath();
  });
  document.addEventListener("mousemove", onMouseMove);

  const molangs = Array.from(document.querySelectorAll(".molang"));
  if (introHasFinePointer && cursor) {
    molangs.forEach((molang) => {
      molang.addEventListener("mouseenter", () => toggleCursorHover(true));
      molang.addEventListener("mouseleave", () => toggleCursorHover(false));
    });
  }

  introShootIntervalId = setInterval(() => {
    if (Math.random() < 0.62) spawnShootingStar();
  }, 2600);

  scheduleIntroTimer(spawnShootingStar, 1700);

  introStarsFrameId = requestAnimationFrame(drawIntro);
  introParallaxFrameId = requestAnimationFrame(animateParallax);

  const openingStartDelay = 450;
  scheduleIntroTimer(() => {
    if (introOpening) introOpening.hidden = false;
  }, openingStartDelay);

  scheduleIntroTimer(() => openingLine1.classList.add("vis"), openingStartDelay + 700);
  scheduleIntroTimer(() => openingLine2.classList.add("vis"), openingStartDelay + 2300);
  scheduleIntroTimer(() => {
    openingLine1.classList.add("gone");
    openingLine2.classList.add("gone");
  }, openingStartDelay + 4300);

  scheduleIntroTimer(() => {
    if (introOpening) introOpening.style.display = "none";
    introWorld.classList.add("alive");

    scheduleIntroTimer(() => poem1.classList.add("lit"), 600);
    scheduleIntroTimer(() => poem2.classList.add("lit"), 1700);
    scheduleIntroTimer(() => poem3.classList.add("lit"), 2900);
    scheduleIntroTimer(() => {
      if (introHint) introHint.classList.add("show");
      requestAnimationFrame(() => {
        rideScooter();
        startScooterLoop();
      });
      introScooterStartTimeoutId = scheduleIntroTimer(() => {
        introReadyForContinue = true;
      }, 3600);
    }, 3800);
  }, openingStartDelay + 5300);
}

function destroyWorldIntro() {
  if (introDestroyed) return;
  introDestroyed = true;

  clearIntroTimers();

  if (introStarsFrameId) {
    cancelAnimationFrame(introStarsFrameId);
    introStarsFrameId = null;
  }

  if (introParallaxFrameId) {
    cancelAnimationFrame(introParallaxFrameId);
    introParallaxFrameId = null;
  }

  if (introShootIntervalId) {
    clearInterval(introShootIntervalId);
    introShootIntervalId = null;
  }

  if (introScooterStartTimeoutId) {
    clearTimeout(introScooterStartTimeoutId);
    introScooterStartTimeoutId = null;
  }

  if (introScooterIntervalId) {
    clearInterval(introScooterIntervalId);
    introScooterIntervalId = null;
  }

  if (introStage) {
    introStage.classList.add("hidden");
    scheduleIntroTimer(() => {
      introStage.style.display = "none";
    }, 460);
  }

  document.body.classList.remove("intro-world-active");
}

const binaryFontSize = 18;

function injectBinaryRainStyles() {
  if (document.getElementById("binary-rain-style")) return;
  const style = document.createElement("style");
  style.id = "binary-rain-style";
  style.textContent = `
    #loading-screen { overflow: hidden; position: fixed; }
    #binary-rain-canvas {
      position: absolute; inset: 0; width: 100%; height: 100%;
      z-index: 1; opacity: 0.72; pointer-events: none;
      mix-blend-mode: screen;
    }
    #sofi-card { position: relative; z-index: 2; }
  `;
  document.head.appendChild(style);
}

function createBinaryRainCanvas() {
  if (!loadingScreen) return null;
  injectBinaryRainStyles();
  if (binaryCanvas) return binaryCanvas;

  binaryCanvas = document.createElement("canvas");
  binaryCanvas.id = "binary-rain-canvas";
  loadingScreen.prepend(binaryCanvas);
  binaryCtx = binaryCanvas.getContext("2d", { alpha: true });
  resizeBinaryRainCanvas();
  return binaryCanvas;
}

function resizeBinaryRainCanvas() {
  if (!binaryCanvas) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  binaryCanvas.width = Math.floor(window.innerWidth * dpr);
  binaryCanvas.height = Math.floor(window.innerHeight * dpr);
  binaryCanvas.style.width = `${window.innerWidth}px`;
  binaryCanvas.style.height = `${window.innerHeight}px`;
  if (binaryCtx) binaryCtx.setTransform(dpr, 0, 0, dpr, 0, 0);

  const columns = Math.ceil(window.innerWidth / binaryFontSize);
  binaryDrops = Array.from({ length: columns }, () => Math.floor(Math.random() * -40));
}

function drawBinaryRain() {
  if (!binaryCtx || !binaryCanvas) return;

  binaryCtx.fillStyle = "rgba(0, 0, 0, 0.18)";
  binaryCtx.fillRect(0, 0, window.innerWidth, window.innerHeight);
  binaryCtx.font = `700 ${binaryFontSize}px Source Code Pro, monospace`;
  binaryCtx.textAlign = "center";
  binaryCtx.textBaseline = "top";
  binaryCtx.shadowColor = "rgba(255, 55, 185, 0.95)";
  binaryCtx.shadowBlur = 12;

  for (let i = 0; i < binaryDrops.length; i++) {
    const number = Math.random() > 0.5 ? "1" : "0";
    const x = i * binaryFontSize + binaryFontSize / 2;
    const y = binaryDrops[i] * binaryFontSize;

    binaryCtx.fillStyle = Math.random() > 0.88
      ? "rgba(255, 240, 250, 0.95)"
      : "rgba(255, 92, 190, 0.86)";

    binaryCtx.fillText(number, x, y);

    if (y > window.innerHeight && Math.random() > 0.955) {
      binaryDrops[i] = Math.floor(Math.random() * -20);
    }
    binaryDrops[i] += 1;
  }

  binaryAnimationId = requestAnimationFrame(drawBinaryRain);
}

function startBinaryRain() {
  createBinaryRainCanvas();
  if (!binaryCanvas || !binaryCtx) return;

  if (binaryAnimationId) {
    cancelAnimationFrame(binaryAnimationId);
    binaryAnimationId = null;
  }

  resizeBinaryRainCanvas();
  binaryCtx.clearRect(0, 0, binaryCanvas.width, binaryCanvas.height);
  drawBinaryRain();
}

function stopBinaryRain() {
  if (binaryAnimationId) {
    cancelAnimationFrame(binaryAnimationId);
    binaryAnimationId = null;
  }

  if (binaryCtx && binaryCanvas) {
    binaryCtx.clearRect(0, 0, binaryCanvas.width, binaryCanvas.height);
  }

  if (binaryCanvas) {
    binaryCanvas.remove();
    binaryCanvas = null;
    binaryCtx = null;
    binaryDrops = [];
  }
}

window.addEventListener("resize", resizeBinaryRainCanvas);

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function highlightText(text, highlight) {
  if (!highlight || !text.includes(highlight)) return escapeHtml(text);
  return text.split(highlight).map(escapeHtml).join(`<span class="highlight-text">${escapeHtml(highlight)}</span>`);
}

function firstString(...candidates) {
  for (const value of candidates) {
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return null;
}

function applyLoadingDiscordIdentity() {
  const fallbackAvatar = DISCORD_AVATAR_FALLBACK;
  const loadingAvatar = firstString(pfp, fallbackAvatar) || fallbackAvatar;
  if (avatar) {
    avatar.style.display = "";
    if (avatar.getAttribute("src") !== loadingAvatar) avatar.src = loadingAvatar;
  }
  if (avatarFallback) {
    avatarFallback.classList.remove("show");
  }
  if (avatarDecoration) {
    if (discordFrame) {
      avatarDecoration.hidden = false;
      avatarDecoration.src = discordFrame;
    } else {
      avatarDecoration.hidden = true;
      avatarDecoration.removeAttribute("src");
    }
  }
  if (loadingProfileName) {
    loadingProfileName.textContent = discordDisplayName;
  }
  if (loadingProfileUser) {
    loadingProfileUser.textContent = `@${discordUsername}`;
  }
}

function renderProfileBadge(size = "sm") {
  const avatarSrc = escapeHtml(pfp || "./public/bow-pink.png");
  const frameHtml = discordFrame
    ? `<img class="profile-badge-frame" src="${escapeHtml(discordFrame)}" alt="" decoding="async" loading="lazy">`
    : "";
  return `
    <span class="profile-badge profile-badge-${escapeHtml(size)}">
      <img class="profile-badge-avatar" src="${avatarSrc}" alt="" decoding="async" loading="lazy">
      ${frameHtml}
    </span>
  `;
}

function createDots(activePage = page) {
  if (!dots) return;
  dots.innerHTML = "";
  PAGES.forEach((_, index) => {
    const dot = document.createElement("div");
    dot.className = index === activePage ? "page-dot active" : "page-dot";
    dots.appendChild(dot);
  });
}

function renderProfilePage() {
  const swipeHint = `<div class="swipe-hint">← deslize →</div>`;

  return `
    <div class="profile-layout profile-layout-single">
      <div class="letter-card">
        <div class="letter-title-row">
          ${renderProfileBadge("sm")}
          <div class="letter-title">my little princess</div>
        </div>
        <p>você é <span class="pink">a coisa mais especial</span> que já aconteceu comigo. seu sorriso ilumina até os dias mais cinzas, e sua presença faz tudo fazer <span class="pink">sentido</span>.</p>
        <p>você não precisa de nenhum castelo pra ser princesa <span class="pink">você já nasceu uma</span>. Cada detalhe seu é perfeito, do jeitinho que você ri até o jeito que você cuida das pessoas.</p>
        <p>eu te amo <span class="pink">infinitamente, minha princesinha</span>. agora e sempre.</p>
      </div>
    </div>
    ${swipeHint}
  `;
}

function renderTextPage(current, pageIndex = page) {
  const imageHtml = current.imgSrc && current.imgSrc !== "LINK AQUI"
    ? `<img class="slot-image" src="${escapeHtml(current.imgSrc)}" alt="" loading="lazy" decoding="async">`
    : "";

  const closeButton = pageIndex === PAGES.length - 1
    ? `<button class="close-button" id="closeButton">fechar a carta</button>`
    : "";

  return `
    <div class="text-layout">
      <div class="text-card">
        <div class="section-label-row">
          ${renderProfileBadge("xs")}
          <div class="section-label">${escapeHtml(current.title)}</div>
        </div>
        <div class="page-number">${pageIndex > 0 ? `${pageIndex} / ${PAGES.length - 1}` : ""}</div>
        <p>${highlightText(current.text, current.highlight)}</p>
        ${closeButton}
      </div>
      ${imageHtml}
    </div>
  `;
}

function bindRenderedPageActions(scope = document) {
  const closeButton = scope.querySelector("#closeButton");
  if (closeButton) closeButton.addEventListener("click", handleClose);
}

function renderPage() {
  if (!pageWrap) return;
  const current = PAGES[page];
  if (!current) return;

  if (prevBtn) prevBtn.style.display = page > 0 ? "grid" : "none";
  if (nextBtn) nextBtn.style.display = page < PAGES.length - 1 ? "grid" : "none";

  createDots();
  pageWrap.className = "page-wrap";
  pageWrap.innerHTML = current.type === "profile" ? renderProfilePage() : renderTextPage(current, page);
  protectImagesFromSaving();
  bindRenderedPageActions(pageWrap);
}

function burstHearts(x, y, count = 5) {
  for (let i = 0; i < count; i++) {
    const el = document.createElement("div");
    el.className = "heart-burst";
    const size = Math.random() * 18 + 10;

    el.style.cssText = `
      left: ${x - size / 2}px;
      top: ${y - size / 2}px;
      width: ${size}px;
      height: ${size}px;
      font-size: ${size}px;
      animation-delay: ${i * 0.06}s;
    `;

    el.textContent = "♡";
    el.style.color = `rgba(255, ${Math.floor(Math.random() * 80 + 100)}, ${Math.floor(Math.random() * 100 + 150)}, 0.85)`;
    document.body.appendChild(el);
    setTimeout(() => el.remove(), 900);
  }
}

function goTo(nextPage, nextDirection, arrowEl) {
  if (nextPage === page || nextPage < 0 || nextPage >= PAGES.length) return;

  if (arrowEl) {
    const rect = arrowEl.getBoundingClientRect();
    burstHearts(rect.left + rect.width / 2, rect.top + rect.height / 2, 3);
  }

  page = nextPage;
  renderPage();
}

function handleClose() {
  if (!root) return;
  root.classList.add("closing");
  winxShowScene(true);
  setTimeout(() => {
    root.style.display = "none";
    window.dispatchEvent(new CustomEvent("contentPagesComplete"));
  }, 420);
}

function createHeart() {
  if (!heartsContainer) return;

  const img = document.createElement("img");
  const size = Math.random() * 16 + 12;
  const x = Math.random() * 88 + 6;
  const duration = Math.random() * 4 + 5;
  const delay = Math.random() * 2;

  img.className = "floating-heart";
  img.src = "./public/heart-draw.gif";
  img.alt = "";
  img.decoding = "async";
  img.style.left = `${x}%`;
  img.style.width = `${size}px`;
  img.style.height = `${size}px`;
  img.style.animationDuration = `${duration}s`;
  img.style.animationDelay = `${delay}s`;
  img.dataset.id = String(heartId++);

  heartsContainer.appendChild(img);
  protectImagesFromSaving();

  setTimeout(() => img.remove(), (duration + delay + 0.5) * 1000);
}

function initHearts() {
  if (!heartsContainer || heartsInterval) return;

  for (let i = 0; i < 8; i++) createHeart();

  heartsInterval = setInterval(() => {
    const existing = Array.from(heartsContainer.querySelectorAll(".floating-heart"));
    if (existing.length > 12) {
      existing.slice(0, existing.length - 12).forEach((heart) => heart.remove());
    }
    createHeart();
  }, 1600);
}

const winxKeys = new Set();
const winxGame = {
  score: 0,
  catcherX: 0.5,
  targetX: 0.5,
  pointerId: null,
  items: [],
  lastTime: 0,
  spawnTimer: 0,
  running: false,
  started: false,
  rafId: null
};

function winxDeviceProfile() {
  const nav = window.navigator || {};
  const userAgent = String(nav.userAgent || "").toLowerCase();
  const isTouchMac = userAgent.includes("macintosh") && Number(nav.maxTouchPoints || 0) > 1;
  const looksMobile = /android|iphone|ipad|ipod|mobile|tablet/.test(userAgent) || isTouchMac;
  const hasTouchUi = window.matchMedia("(hover: none), (pointer: coarse)").matches;
  const viewportWidth = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const viewportHeight = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  const shortSide = Math.min(viewportWidth, viewportHeight);
  const longSide = Math.max(viewportWidth, viewportHeight);
  const tabletLike = (hasTouchUi || looksMobile) && shortSide >= 600 && longSide >= 820;
  const phoneLike = (hasTouchUi || looksMobile) && !tabletLike;

  return {
    useMobileUi: looksMobile || hasTouchUi || viewportWidth <= 760,
    phoneLike,
    tabletLike,
    compactHeight: viewportHeight < 680,
    compactWidth: viewportWidth < 380,
    landscape: viewportWidth > viewportHeight
  };
}

function winxIsMobileUiActive() {
  return Boolean(winxStage?.classList.contains("winx-mobile"));
}

function winxApplyDeviceMode() {
  if (!winxStage) return;
  const profile = winxDeviceProfile();
  const useMobileUi = profile.useMobileUi;
  winxStage.classList.toggle("winx-mobile", useMobileUi);
  winxStage.classList.toggle("winx-device-phone", useMobileUi && profile.phoneLike);
  winxStage.classList.toggle("winx-device-tablet", useMobileUi && profile.tabletLike);
  winxStage.classList.toggle("winx-compact-height", useMobileUi && profile.compactHeight);
  winxStage.classList.toggle("winx-compact-width", useMobileUi && profile.compactWidth);
  winxStage.classList.toggle("winx-landscape", useMobileUi && profile.landscape);
  winxStage.dataset.deviceUi = useMobileUi ? (profile.tabletLike ? "tablet" : "phone") : "desktop";
  winxStage.setAttribute(
    "aria-label",
    useMobileUi ? "SofiPhone adaptive transition" : "Windows 7 pink transition"
  );
  winxUpdateVmHeader();
}

function winxRandomIpEnding() {
  return Math.floor(Math.random() * 234) + 21;
}

function winxUpdateVmHeader() {
  if (!winxVmHeader) return;
  if (winxIsMobileUiActive()) {
    winxVmHeader.textContent = "SofiPhone";
    return;
  }
  winxVmHeader.textContent = `[Running] - 192.168.1.${winxRandomIpEnding()}`;
}

function winxUpdateClock() {
  if (!winxClock) return;
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, "0");
  const mm = String(now.getMinutes()).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  winxClock.innerHTML = `${hh}:${mm}<br>${day}/${month}`;
}

function winxStartSystemInfoLoops() {
  winxUpdateClock();
  winxUpdateVmHeader();

  if (!winxClockInterval) {
    winxClockInterval = setInterval(winxUpdateClock, 20000);
  }

  if (!winxVmInterval) {
    winxVmInterval = setInterval(winxUpdateVmHeader, 8000);
  }
}

function winxEnsureBootContext() {
  if (!winxBootCanvas) return null;
  if (!winxBootCtx) {
    winxBootCtx = winxBootCanvas.getContext("2d");
  }
  return winxBootCtx;
}

function winxResizeBootCanvas() {
  const ctx = winxEnsureBootContext();
  if (!ctx || !winxBootCanvas) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const width = window.innerWidth;
  const height = window.innerHeight;
  winxBootCanvas.width = Math.floor(width * dpr);
  winxBootCanvas.height = Math.floor(height * dpr);
  winxBootCanvas.style.width = `${width}px`;
  winxBootCanvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function winxDrawAppleLogo(ctx, cx, cy, size, color, bgColor) {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.scale(size / 118, size / 118);
  ctx.shadowColor = "rgba(255, 113, 185, 0.62)";
  ctx.shadowBlur = 24;

  const glass = ctx.createLinearGradient(-44, -46, 42, 48);
  glass.addColorStop(0, "rgba(255, 248, 253, 0.96)");
  glass.addColorStop(0.46, "rgba(255, 186, 221, 0.92)");
  glass.addColorStop(1, "rgba(255, 114, 180, 0.95)");
  ctx.fillStyle = glass;
  winxRoundedRect(ctx, -42, -42, 84, 84, 24);
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.strokeStyle = "rgba(255, 255, 255, 0.66)";
  ctx.lineWidth = 2.2;
  winxRoundedRect(ctx, -42, -42, 84, 84, 24);
  ctx.stroke();

  ctx.fillStyle = "rgba(255, 255, 255, 0.74)";
  ctx.beginPath();
  ctx.ellipse(-18, -26, 20, 15, -0.34, 0, Math.PI * 2);
  ctx.ellipse(18, -26, 20, 15, 0.34, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "rgba(255, 112, 176, 0.96)";
  ctx.beginPath();
  ctx.arc(0, -26, 8, 0, Math.PI * 2);
  ctx.fill();

  ctx.shadowColor = color;
  ctx.shadowBlur = 16;
  ctx.fillStyle = "rgba(255, 255, 255, 0.98)";
  ctx.beginPath();
  ctx.moveTo(0, 31);
  ctx.bezierCurveTo(-34, 10, -27, -12, -8, -3);
  ctx.bezierCurveTo(-2, 0, 0, 6, 0, 6);
  ctx.bezierCurveTo(0, 6, 2, 0, 8, -3);
  ctx.bezierCurveTo(27, -12, 34, 10, 0, 31);
  ctx.fill();

  ctx.shadowBlur = 0;
  ctx.strokeStyle = "rgba(255, 107, 172, 0.70)";
  ctx.lineWidth = 2.6;
  ctx.stroke();

  ctx.fillStyle = bgColor;
  ctx.globalAlpha = .16;
  ctx.beginPath();
  ctx.arc(24, 21, 18, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function winxDrawAppleBootFrame(now) {
  if (!winxBootCtx || !winxBootCanvas) return;

  const w = window.innerWidth;
  const h = window.innerHeight;
  const elapsed = now - winxBootStartAt;
  const cx = w * 0.5;
  const cy = h * 0.39;
  const pulse = 0.88 + 0.12 * Math.sin(elapsed * 0.003);
  const logoSize = Math.max(82, Math.min(142, Math.min(w, h) * 0.24));
  const bgColor = "#090108";
  const loadingMix = (Math.sin(elapsed * 0.0016) + 1) * .5;

  winxBootCtx.clearRect(0, 0, w, h);
  winxBootCtx.fillStyle = bgColor;
  winxBootCtx.fillRect(0, 0, w, h);

  const bg = winxBootCtx.createRadialGradient(cx, h * 0.40, 12, cx, h * 0.50, Math.max(w, h) * 0.70);
  bg.addColorStop(0, `rgba(255, 176, 220, ${0.30 * pulse})`);
  bg.addColorStop(0.42, "rgba(92, 12, 54, 0.20)");
  bg.addColorStop(1, "rgba(0, 0, 0, 0.98)");
  winxBootCtx.fillStyle = bg;
  winxBootCtx.fillRect(0, 0, w, h);

  winxBootCtx.save();
  winxBootCtx.globalCompositeOperation = "screen";
  for (let i = 0; i < 18; i++) {
    const angle = i * 0.82 + elapsed * 0.00055;
    const radius = Math.min(w, h) * (0.22 + (i % 5) * 0.032);
    const x = cx + Math.cos(angle) * radius;
    const y = h * 0.42 + Math.sin(angle * 1.2) * radius * 0.42;
    winxBootCtx.fillStyle = `rgba(255, ${160 + (i % 4) * 18}, ${206 + (i % 3) * 12}, 0.08)`;
    winxBootCtx.beginPath();
    winxBootCtx.arc(x, y, 2.2 + (i % 3), 0, Math.PI * 2);
    winxBootCtx.fill();
  }
  winxBootCtx.restore();

  winxDrawAppleLogo(winxBootCtx, cx, cy, logoSize * pulse, "rgba(255, 118, 190, 0.96)", bgColor);

  const textY = h * 0.62;
  const textSize = Math.max(24, Math.min(38, w * 0.082));
  winxBootCtx.font = `700 ${textSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
  winxBootCtx.textAlign = "center";
  winxBootCtx.textBaseline = "middle";
  winxBootCtx.fillStyle = "rgba(255, 232, 244, 0.96)";
  winxBootCtx.shadowColor = "rgba(255, 113, 185, 0.55)";
  winxBootCtx.shadowBlur = 14;
  winxBootCtx.fillText("SofiOS", cx, textY);
  winxBootCtx.shadowBlur = 0;

  const subTextSize = Math.max(11, Math.min(15, w * 0.034));
  winxBootCtx.font = `600 ${subTextSize}px -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`;
  winxBootCtx.fillStyle = "rgba(255, 214, 235, 0.68)";
  winxBootCtx.fillText("preparando seu cantinho", cx, textY + textSize * 0.78);

  const barW = Math.min(190, w * 0.48);
  const barH = 6;
  const barX = cx - barW * 0.5;
  const barY = h * 0.74;
  winxBootCtx.fillStyle = "rgba(255, 255, 255, 0.16)";
  winxRoundedRect(winxBootCtx, barX, barY, barW, barH, barH * .5);
  winxBootCtx.fill();

  const fillW = barW * (0.20 + loadingMix * 0.76);
  const fill = winxBootCtx.createLinearGradient(barX, barY, barX + barW, barY);
  fill.addColorStop(0, "rgba(255, 238, 248, 0.92)");
  fill.addColorStop(1, "rgba(255, 117, 184, 0.96)");
  winxBootCtx.fillStyle = fill;
  winxRoundedRect(winxBootCtx, barX, barY, fillW, barH, barH * .5);
  winxBootCtx.fill();
}

function winxDrawBootFrame(now) {
  if (!winxBootCtx || !winxBootCanvas) return;
  if (winxIsMobileUiActive()) {
    winxDrawAppleBootFrame(now);
    if (winxBoot && winxBoot.classList.contains("show")) {
      winxBootFrameId = requestAnimationFrame(winxDrawBootFrame);
    }
    return;
  }

  const w = window.innerWidth;
  const h = window.innerHeight;
  const elapsed = now - winxBootStartAt;
  const pulse = 0.78 + 0.22 * Math.sin(elapsed * 0.0032);
  const cx = w * 0.5;
  const cy = h * 0.42;
  const paneW = Math.max(34, Math.min(92, w * 0.11));
  const paneH = paneW * 0.78;
  const paneGap = Math.max(5, paneW * 0.08);

  winxBootCtx.clearRect(0, 0, w, h);
  winxBootCtx.fillStyle = "#000";
  winxBootCtx.fillRect(0, 0, w, h);

  const vignette = winxBootCtx.createRadialGradient(cx, h * 0.5, 20, cx, h * 0.5, Math.max(w, h) * 0.65);
  vignette.addColorStop(0, "rgba(35, 0, 24, 0.15)");
  vignette.addColorStop(1, "rgba(0, 0, 0, 0.96)");
  winxBootCtx.fillStyle = vignette;
  winxBootCtx.fillRect(0, 0, w, h);

  const glow = winxBootCtx.createRadialGradient(cx, cy, 4, cx, cy, paneW * 2.5);
  glow.addColorStop(0, `rgba(255, 166, 220, ${0.42 * pulse})`);
  glow.addColorStop(0.4, `rgba(255, 110, 195, ${0.22 * pulse})`);
  glow.addColorStop(1, "rgba(0, 0, 0, 0)");
  winxBootCtx.fillStyle = glow;
  winxBootCtx.fillRect(cx - paneW * 3, cy - paneW * 3, paneW * 6, paneW * 6);

  winxBootCtx.save();
  winxBootCtx.translate(cx, cy);
  winxBootCtx.rotate(-0.19 + Math.sin(elapsed * 0.0012) * 0.01);

  const panes = [
    { x: -paneGap * 0.5 - paneW, y: -paneGap * 0.5 - paneH, color: "rgba(255, 122, 194, 0.96)" },
    { x: paneGap * 0.5, y: -paneGap * 0.5 - paneH, color: "rgba(255, 183, 226, 0.95)" },
    { x: -paneGap * 0.5 - paneW, y: paneGap * 0.5, color: "rgba(255, 96, 214, 0.96)" },
    { x: paneGap * 0.5, y: paneGap * 0.5, color: "rgba(255, 226, 243, 0.96)" }
  ];

  panes.forEach((pane) => {
    winxBootCtx.save();
    winxBootCtx.shadowColor = pane.color;
    winxBootCtx.shadowBlur = paneW * 0.55;
    winxBootCtx.fillStyle = pane.color;
    winxBootCtx.fillRect(pane.x, pane.y, paneW, paneH);
    winxBootCtx.restore();
  });
  winxBootCtx.restore();

  const dots = 8;
  const orbitY = h * 0.64;
  const orbitR = Math.max(16, Math.min(34, w * 0.03));
  const lead = elapsed * 0.0064;

  for (let i = 0; i < dots; i++) {
    const trail = (dots - i) / dots;
    const theta = lead - i * 0.44;
    const x = cx + Math.cos(theta) * orbitR * 1.24;
    const y = orbitY + Math.sin(theta) * orbitR * 0.66;
    const size = 2.6 + trail * 2.8;
    const alpha = 0.2 + trail * 0.72;
    const g = Math.floor(162 + 90 * trail);
    const b = Math.floor(209 + 42 * trail);
    winxBootCtx.beginPath();
    winxBootCtx.fillStyle = `rgba(255, ${g}, ${b}, ${alpha.toFixed(3)})`;
    winxBootCtx.arc(x, y, size, 0, Math.PI * 2);
    winxBootCtx.fill();
  }

  const textY = h * 0.76;
  const textSize = Math.max(20, Math.min(42, w * 0.042));
  winxBootCtx.font = `500 ${textSize}px "Segoe UI", "Trebuchet MS", sans-serif`;
  winxBootCtx.textAlign = "center";
  winxBootCtx.textBaseline = "middle";
  winxBootCtx.fillStyle = "rgba(255, 230, 242, 0.95)";
  winxBootCtx.shadowColor = "rgba(255, 141, 206, 0.55)";
  winxBootCtx.shadowBlur = 12;
  winxBootCtx.fillText("Starting Windows", cx, textY);
  winxBootCtx.shadowBlur = 0;

  if (winxBoot && winxBoot.classList.contains("show")) {
    winxBootFrameId = requestAnimationFrame(winxDrawBootFrame);
  }
}

function winxStartBootAnimation() {
  if (!winxBoot || !winxBootCanvas) return;
  winxEnsureBootContext();
  winxResizeBootCanvas();
  winxBootStartAt = performance.now();

  if (winxBootFrameId) {
    cancelAnimationFrame(winxBootFrameId);
    winxBootFrameId = null;
  }

  winxBootFrameId = requestAnimationFrame(winxDrawBootFrame);
}

function winxStopBootAnimation() {
  if (winxBootFrameId) {
    cancelAnimationFrame(winxBootFrameId);
    winxBootFrameId = null;
  }
  if (winxBootCtx && winxBootCanvas) {
    winxBootCtx.clearRect(0, 0, winxBootCanvas.width, winxBootCanvas.height);
  }
}

function winxCanvasCtx(canvas) {
  if (!canvas) return null;
  return canvas.getContext("2d");
}

function winxRoundedRect(ctx, x, y, w, h, r) {
  if (w <= 0 || h <= 0) return;
  const radius = Math.max(0, Math.min(r, w * 0.5, h * 0.5));
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.arcTo(x + w, y, x + w, y + h, radius);
  ctx.arcTo(x + w, y + h, x, y + h, radius);
  ctx.arcTo(x, y + h, x, y, radius);
  ctx.arcTo(x, y, x + w, y, radius);
  ctx.closePath();
}

function winxDrawHomeIcon(canvas) {
  const ctx = winxCanvasCtx(canvas);
  if (!ctx) return;
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  const bg = ctx.createLinearGradient(0, 0, 0, h);
  bg.addColorStop(0, "#ffd9ec");
  bg.addColorStop(1, "#ffb7d9");
  ctx.fillStyle = bg;
  winxRoundedRect(ctx, 6, 9, w - 12, h - 14, 9);
  ctx.fill();

  ctx.fillStyle = "#ff5da7";
  ctx.fillRect(14, 23, 20, 14);
  ctx.beginPath();
  ctx.moveTo(11, 24);
  ctx.lineTo(24, 13);
  ctx.lineTo(37, 24);
  ctx.closePath();
  ctx.fill();

  ctx.fillStyle = "#ffe7f3";
  ctx.fillRect(21, 29, 5, 8);
}

function winxDrawLetterIcon(canvas) {
  const ctx = winxCanvasCtx(canvas);
  if (!ctx) return;
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  ctx.fillStyle = "#ffd0e6";
  winxRoundedRect(ctx, 5, 8, w - 10, h - 13, 8);
  ctx.fill();

  ctx.fillStyle = "#fff5fa";
  winxRoundedRect(ctx, 11, 18, w - 22, 21, 5);
  ctx.fill();

  ctx.strokeStyle = "#ff7ab8";
  ctx.lineWidth = 2.2;
  ctx.beginPath();
  ctx.moveTo(11, 18);
  ctx.lineTo(w * 0.5, 30);
  ctx.lineTo(w - 11, 18);
  ctx.stroke();

  ctx.fillStyle = "#ff4f9d";
  ctx.beginPath();
  ctx.arc(w * 0.5, 30, 3.4, 0, Math.PI * 2);
  ctx.fill();
}

function winxDrawGameIcon(canvas) {
  const ctx = winxCanvasCtx(canvas);
  if (!ctx) return;
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  const headX = w * 0.5;
  const headY = h * 0.58;
  const earW = w * 0.18;
  const earH = h * 0.36;
  const innerEarW = Math.max(2, earW - 6);
  const innerEarH = Math.max(4, earH - 12);

  ctx.fillStyle = "#fff8fb";
  winxRoundedRect(ctx, headX - earW - 4, 4, earW, earH, 8);
  ctx.fill();
  winxRoundedRect(ctx, headX + 4, 4, earW, earH, 8);
  ctx.fill();

  ctx.fillStyle = "#ffe0ef";
  winxRoundedRect(ctx, headX - earW, 9, innerEarW, innerEarH, 6);
  ctx.fill();
  winxRoundedRect(ctx, headX + 10, 9, innerEarW, innerEarH, 6);
  ctx.fill();

  ctx.fillStyle = "#ffffff";
  ctx.beginPath();
  ctx.arc(headX, headY, w * 0.25, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#3e2540";
  ctx.beginPath();
  ctx.arc(headX - 6, headY - 2, 1.9, 0, Math.PI * 2);
  ctx.arc(headX + 6, headY - 2, 1.9, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(headX - 1.4, headY + 2.2, 2.8, 1.8);
}

function winxDrawTitleLetterIcon(canvas) {
  const ctx = winxCanvasCtx(canvas);
  if (!ctx) return;
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#ff8dc2";
  winxRoundedRect(ctx, 1.5, 3, w - 3, h - 6, 3);
  ctx.fill();
  ctx.fillStyle = "#fff5fa";
  winxRoundedRect(ctx, 3.5, 5.5, w - 7, h - 10, 2.8);
  ctx.fill();
  ctx.strokeStyle = "#ff6cad";
  ctx.lineWidth = 1.4;
  ctx.beginPath();
  ctx.moveTo(3.5, 5.8);
  ctx.lineTo(w * 0.5, h * 0.58);
  ctx.lineTo(w - 3.5, 5.8);
  ctx.stroke();
}

function winxDrawTitleGameIcon(canvas) {
  const ctx = winxCanvasCtx(canvas);
  if (!ctx) return;
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);
  ctx.fillStyle = "#fff8fb";
  ctx.beginPath();
  ctx.arc(w * 0.5, h * 0.58, 5.3, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = "#3e2540";
  ctx.beginPath();
  ctx.arc(w * 0.5 - 2.3, h * 0.54, 0.8, 0, Math.PI * 2);
  ctx.arc(w * 0.5 + 2.3, h * 0.54, 0.8, 0, Math.PI * 2);
  ctx.fill();
}

function winxPaintUiCanvases() {
  winxDrawHomeIcon(winxIconHome);
  winxDrawLetterIcon(winxIconLetter);
  winxDrawTitleLetterIcon(winxTitleLetterCanvas);
  winxDrawTitleGameIcon(winxTitleGameCanvas);
  winxDrawGameIcon(winxGameCanvas);
}

function winxDrawTreatOnCanvas(canvas, type) {
  const ctx = winxCanvasCtx(canvas);
  if (!ctx) return;
  const w = canvas.width;
  const h = canvas.height;
  ctx.clearRect(0, 0, w, h);

  if (type === "marshmallow") {
    const body = ctx.createLinearGradient(0, h * 0.18, 0, h * 0.88);
    body.addColorStop(0, "#fffafc");
    body.addColorStop(1, "#ffd9ea");
    ctx.fillStyle = body;
    winxRoundedRect(ctx, w * 0.18, h * 0.26, w * 0.64, h * 0.48, h * 0.2);
    ctx.fill();

    ctx.fillStyle = "rgba(255, 140, 190, 0.45)";
    ctx.beginPath();
    ctx.ellipse(w * 0.36, h * 0.53, w * 0.08, h * 0.05, 0, 0, Math.PI * 2);
    ctx.ellipse(w * 0.64, h * 0.53, w * 0.08, h * 0.05, 0, 0, Math.PI * 2);
    ctx.fill();
    return;
  }

  if (type === "banana") {
    ctx.strokeStyle = "#ffd74e";
    ctx.lineWidth = h * 0.14;
    ctx.lineCap = "round";
    ctx.beginPath();
    ctx.moveTo(w * 0.24, h * 0.66);
    ctx.quadraticCurveTo(w * 0.52, h * 0.86, w * 0.78, h * 0.38);
    ctx.stroke();

    ctx.strokeStyle = "#ffbf1f";
    ctx.lineWidth = h * 0.08;
    ctx.beginPath();
    ctx.moveTo(w * 0.27, h * 0.63);
    ctx.quadraticCurveTo(w * 0.52, h * 0.79, w * 0.74, h * 0.41);
    ctx.stroke();

    ctx.fillStyle = "#8b5b2a";
    ctx.beginPath();
    ctx.arc(w * 0.79, h * 0.38, h * 0.03, 0, Math.PI * 2);
    ctx.arc(w * 0.24, h * 0.66, h * 0.03, 0, Math.PI * 2);
    ctx.fill();
    return;
  }

  if (type === "bomb") {
    const shell = ctx.createRadialGradient(w * 0.42, h * 0.36, h * 0.04, w * 0.5, h * 0.55, h * 0.32);
    shell.addColorStop(0, "#6d6f79");
    shell.addColorStop(1, "#282a33");
    ctx.fillStyle = shell;
    ctx.beginPath();
    ctx.arc(w * 0.5, h * 0.56, h * 0.28, 0, Math.PI * 2);
    ctx.fill();

    ctx.fillStyle = "#9aa0ad";
    ctx.beginPath();
    ctx.arc(w * 0.42, h * 0.46, h * 0.06, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = "#4a3e2e";
    ctx.lineWidth = h * 0.06;
    ctx.beginPath();
    ctx.moveTo(w * 0.64, h * 0.38);
    ctx.quadraticCurveTo(w * 0.76, h * 0.22, w * 0.86, h * 0.16);
    ctx.stroke();

    ctx.fillStyle = "#ffb84d";
    ctx.beginPath();
    ctx.moveTo(w * 0.88, h * 0.16);
    ctx.lineTo(w * 0.94, h * 0.13);
    ctx.lineTo(w * 0.91, h * 0.20);
    ctx.lineTo(w * 0.97, h * 0.22);
    ctx.lineTo(w * 0.90, h * 0.24);
    ctx.lineTo(w * 0.88, h * 0.31);
    ctx.lineTo(w * 0.85, h * 0.24);
    ctx.lineTo(w * 0.79, h * 0.22);
    ctx.lineTo(w * 0.85, h * 0.20);
    ctx.lineTo(w * 0.82, h * 0.13);
    ctx.closePath();
    ctx.fill();
    return;
  }

  const wrapper = ctx.createLinearGradient(0, h * 0.58, 0, h * 0.95);
  wrapper.addColorStop(0, "#ff8fc2");
  wrapper.addColorStop(1, "#ff5da7");
  ctx.fillStyle = wrapper;
  ctx.beginPath();
  ctx.moveTo(w * 0.30, h * 0.60);
  ctx.lineTo(w * 0.70, h * 0.60);
  ctx.lineTo(w * 0.62, h * 0.92);
  ctx.lineTo(w * 0.38, h * 0.92);
  ctx.closePath();
  ctx.fill();

  const cream = ctx.createRadialGradient(w * 0.5, h * 0.46, h * 0.05, w * 0.5, h * 0.46, h * 0.33);
  cream.addColorStop(0, "#fff9fd");
  cream.addColorStop(1, "#ffd9ea");
  ctx.fillStyle = cream;
  ctx.beginPath();
  ctx.arc(w * 0.5, h * 0.45, h * 0.26, Math.PI * 0.95, Math.PI * 2.05);
  ctx.fill();
  ctx.beginPath();
  ctx.arc(w * 0.37, h * 0.50, h * 0.16, Math.PI, Math.PI * 2);
  ctx.arc(w * 0.63, h * 0.50, h * 0.16, Math.PI, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#ff4f9d";
  ctx.beginPath();
  ctx.arc(w * 0.5, h * 0.33, h * 0.06, 0, Math.PI * 2);
  ctx.fill();
}

function winxBringWindowToFront(windowEl) {
  if (!windowEl) return;
  winxTopZ += 1;
  windowEl.style.zIndex = String(winxTopZ);
}

function winxOpenWindow(windowEl) {
  if (!windowEl) return;
  windowEl.classList.add("aberta");
  winxBringWindowToFront(windowEl);
}

function winxCloseWindow(windowEl, pauseGame = false) {
  if (!windowEl) return;
  windowEl.classList.remove("aberta");
  if (pauseGame) {
    winxPauseGame();
  }
}

function winxRestartFromDesktop() {
  window.location.reload();
}

function winxOpenGameWindow() {
  winxOpenWindow(winxGameWindow);
}

function winxCloseGameWindow() {
  winxCloseWindow(winxGameWindow, true);
}

function winxMinimizeGameWindow() {
  winxCloseWindow(winxGameWindow, true);
}

function winxOpenLetterWindow() {
  if (winxLetterWarning) winxLetterWarning.classList.remove("show");
  winxOpenWindow(winxLetterWindow);
}

function winxCloseLetterWindow() {
  if (winxLetterWarning) winxLetterWarning.classList.remove("show");
  if (winxLetterWarningTimeoutId) {
    clearTimeout(winxLetterWarningTimeoutId);
    winxLetterWarningTimeoutId = null;
  }
  winxCloseWindow(winxLetterWindow, false);
}

function winxMinimizeLetterWindow() {
  if (winxLetterWarning) winxLetterWarning.classList.remove("show");
  if (winxLetterWarningTimeoutId) {
    clearTimeout(winxLetterWarningTimeoutId);
    winxLetterWarningTimeoutId = null;
  }
  winxCloseWindow(winxLetterWindow, false);
}

function winxShowLetterWarning() {
  if (!winxLetterWarning) return;
  winxLetterWarning.classList.add("show");
  if (winxLetterWarningTimeoutId) {
    clearTimeout(winxLetterWarningTimeoutId);
  }
  winxLetterWarningTimeoutId = setTimeout(() => {
    if (winxLetterWarning) winxLetterWarning.classList.remove("show");
    winxLetterWarningTimeoutId = null;
  }, 1700);
}

function winxHandleIntroCartaClick(autoStart = false) {
  if (winxIntroDismissed || winxTransitionStarted) return;
  winxIntroDismissed = true;
  if (autoStart) {
    if (winxIntroWarning) winxIntroWarning.classList.remove("show");
    winxStartDesktopTransition();
    return;
  }
  if (winxIntroWarning) winxIntroWarning.classList.add("show");

  setTimeout(() => {
    if (winxIntroWarning) winxIntroWarning.classList.remove("show");
    winxStartDesktopTransition();
  }, 1150);
}

function winxStartDesktopTransition() {
  if (winxTransitionStarted || !winxCarta) return;
  winxTransitionStarted = true;
  winxCarta.classList.add("dobrando");
  const planeDuration = 1750;
  const blinkDuration = 1080;
  const bootDuration = 2800;

  const showDesktop = () => {
    if (winxBoot) {
      winxBoot.classList.remove("show");
    }
    if (winxBlink) {
      winxBlink.classList.remove("ativo");
    }
    if (winxFoco) {
      winxFoco.classList.remove("ativo");
    }
    winxStopBootAnimation();
    if (winxDesktop) {
      winxDesktop.classList.add("visivel");
    }
  };

  setTimeout(() => {
    if (winxBlink) winxBlink.classList.add("ativo");
    if (winxFoco) winxFoco.classList.add("ativo");
  }, planeDuration);

  setTimeout(() => {
    if (winxIntro) winxIntro.style.display = "none";

    if (winxBoot && winxBootCanvas) {
      winxBoot.classList.add("show");
      winxStartBootAnimation();
      setTimeout(showDesktop, bootDuration);
      return;
    }

    showDesktop();
  }, planeDuration + blinkDuration);
}

function winxShowScene(autoStartTransition = false) {
  if (!winxStage || winxSceneShown) return;
  winxSceneShown = true;
  winxIntroDismissed = false;
  winxApplyDeviceMode();

  if (storyStage) storyStage.classList.remove("show");
  if (finalBlack) finalBlack.classList.remove("show");

  winxStage.classList.add("show");
  winxStartSystemInfoLoops();
  if (autoStartTransition) {
    requestAnimationFrame(() => winxHandleIntroCartaClick(true));
  }
}

function winxStageRect() {
  return winxGameStage ? winxGameStage.getBoundingClientRect() : { width: 0, height: 0, left: 0, top: 0 };
}

function winxClamp01(value) {
  return Math.max(0.06, Math.min(0.94, value));
}

function winxSetTargetFromPointer(clientX, immediate = false) {
  const rect = winxStageRect();
  if (!rect.width) return;
  winxGame.targetX = winxClamp01((clientX - rect.left) / rect.width);
  if (immediate || !winxGame.running) {
    winxGame.catcherX = winxGame.targetX;
    winxUpdateCatcherPosition();
  }
}

function winxCanDragGame() {
  return Boolean(winxIsDesktopReady() && winxGame.running && winxGameWindow?.classList.contains("aberta"));
}

function winxHandleGamePointerDown(event) {
  if (!winxCanDragGame()) return;
  event.preventDefault();
  winxGame.pointerId = event.pointerId;
  winxGameStage?.classList.add("dragging");
  if (event.currentTarget instanceof HTMLElement && event.currentTarget.setPointerCapture) {
    event.currentTarget.setPointerCapture(event.pointerId);
  }
  winxSetTargetFromPointer(event.clientX, true);
}

function winxHandleGamePointerMove(event) {
  if (!winxCanDragGame()) return;
  if (winxGame.pointerId !== null && event.pointerId !== winxGame.pointerId) return;
  if (winxGame.pointerId !== null || event.pointerType !== "mouse") {
    event.preventDefault();
  }
  winxSetTargetFromPointer(event.clientX, true);
}

function winxHandleGamePointerUp(event) {
  if (winxGame.pointerId !== event.pointerId) return;
  if (event.currentTarget instanceof HTMLElement && event.currentTarget.releasePointerCapture) {
    event.currentTarget.releasePointerCapture(event.pointerId);
  }
  winxGame.pointerId = null;
  winxGameStage?.classList.remove("dragging");
}

function winxIsDesktopReady() {
  return Boolean(winxStage?.classList.contains("show") && winxDesktop?.classList.contains("visivel"));
}

function winxSetScore(value) {
  winxGame.score = value;
  if (winxScore) winxScore.textContent = String(winxGame.score);
}

function winxSetGameStarted(started) {
  winxGame.started = started;
  if (winxGameStage) winxGameStage.classList.toggle("playing", started);
}

function winxUpdateCatcherPosition() {
  if (!winxGameStage || !winxCatcher) return;
  const rect = winxStageRect();
  winxCatcher.style.left = `${winxGame.catcherX * rect.width}px`;
}

function winxRandomTreatType() {
  const roll = Math.random();
  if (roll < 0.08) return "bomb";
  if (roll < 0.18) return "banana";
  if (roll < 0.60) return "marshmallow";
  return "cupcake";
}

function winxTreatPoints(type) {
  if (type === "banana") return 5;
  if (type === "bomb") return -5;
  return 1;
}

function winxSpawnItem() {
  if (!winxGameStage) return;
  const type = winxRandomTreatType();
  const sizeRange = type === "cupcake"
    ? { min: 34, max: 48 }
    : type === "banana"
      ? { min: 34, max: 50 }
      : type === "bomb"
        ? { min: 34, max: 46 }
        : { min: 30, max: 44 };

  const el = document.createElement("div");
  el.className = "winx-falling";
  const treatCanvas = document.createElement("canvas");
  treatCanvas.width = 72;
  treatCanvas.height = 72;
  treatCanvas.className = "winx-treat-canvas";
  winxDrawTreatOnCanvas(treatCanvas, type);
  el.appendChild(treatCanvas);

  const rect = winxStageRect();
  const size = sizeRange.min + Math.random() * Math.max(1, sizeRange.max - sizeRange.min);
  const x = 20 + Math.random() * Math.max(1, rect.width - (size + 40));
  const speed = 110 + Math.random() * 105 + Math.min(winxGame.score * 2, 70);
  const rotate = (Math.random() * 80) - 40;

  el.style.left = `${x}px`;
  el.style.top = "-40px";
  el.style.width = `${size}px`;
  el.style.height = `${size}px`;
  winxGameStage.appendChild(el);

  winxGame.items.push({ el, y: -40, speed, rotate, size, type, points: winxTreatPoints(type) });
}

function winxCollectBurst(x, y, points) {
  if (!winxGameStage) return;
  const burst = document.createElement("div");
  burst.className = "winx-falling";
  burst.textContent = points >= 0 ? `+${points}` : String(points);
  burst.style.width = "auto";
  burst.style.height = "auto";
  burst.style.pointerEvents = "none";
  burst.style.color = points >= 0 ? "#ff4f9d" : "#8a243f";
  burst.style.fontWeight = "900";
  burst.style.left = `${x}px`;
  burst.style.top = `${y}px`;
  burst.style.fontSize = "18px";
  burst.style.transition = "transform .55s ease, opacity .55s ease";
  winxGameStage.appendChild(burst);
  requestAnimationFrame(() => {
    burst.style.transform = "translateY(-24px) scale(1.15)";
    burst.style.opacity = "0";
  });
  setTimeout(() => burst.remove(), 620);
}

function winxBombExplosion() {
  if (!winxGameStage || !winxCatcher) return;
  winxCatcher.classList.remove("explodindo");
  requestAnimationFrame(() => winxCatcher.classList.add("explodindo"));
  setTimeout(() => winxCatcher.classList.remove("explodindo"), 300);

  const catcherRect = winxCatcher.getBoundingClientRect();
  const stageRect = winxGameStage.getBoundingClientRect();
  const cx = catcherRect.left - stageRect.left + catcherRect.width * 0.5;
  const cy = catcherRect.top - stageRect.top + catcherRect.height * 0.4;

  for (let i = 0; i < 10; i++) {
    const p = document.createElement("div");
    p.className = "winx-boom-particle";
    p.style.left = `${cx}px`;
    p.style.top = `${cy}px`;
    p.style.background = i % 2 === 0 ? "#ff9ecf" : "#ff5fa6";
    const angle = (Math.PI * 2 * i) / 10 + Math.random() * 0.24;
    const dist = 12 + Math.random() * 16;
    p.style.setProperty("--dx", `${Math.cos(angle) * dist}px`);
    p.style.setProperty("--dy", `${Math.sin(angle) * dist}px`);
    winxGameStage.appendChild(p);
    setTimeout(() => p.remove(), 360);
  }
}

function winxResetGame() {
  winxGame.items.forEach((item) => item.el.remove());
  winxGame.items = [];
  winxSetScore(0);
  winxGame.catcherX = 0.5;
  winxGame.targetX = 0.5;
  winxGame.spawnTimer = 0;
  winxUpdateCatcherPosition();
}

function winxPauseGame() {
  winxGame.running = false;
  winxGame.pointerId = null;
  if (winxGame.rafId) {
    cancelAnimationFrame(winxGame.rafId);
    winxGame.rafId = null;
  }
  winxKeys.clear();
}

function winxLoop(time) {
  if (!winxGame.running || !winxGameStage || !winxCatcher) return;

  const dt = Math.min(0.033, (time - winxGame.lastTime) / 1000 || 0.016);
  winxGame.lastTime = time;
  const rect = winxStageRect();

  if (winxKeys.has("ArrowLeft") || winxKeys.has("a") || winxKeys.has("A")) winxGame.targetX -= dt * 1.35;
  if (winxKeys.has("ArrowRight") || winxKeys.has("d") || winxKeys.has("D")) winxGame.targetX += dt * 1.35;
  winxGame.targetX = winxClamp01(winxGame.targetX);
  winxGame.catcherX += (winxGame.targetX - winxGame.catcherX) * Math.min(1, dt * 14);
  winxUpdateCatcherPosition();

  winxGame.spawnTimer -= dt;
  if (winxGame.spawnTimer <= 0) {
    winxSpawnItem();
    winxGame.spawnTimer = Math.max(0.42, 1.05 - winxGame.score * 0.018) + Math.random() * 0.34;
  }

  const catcherRect = winxCatcher.getBoundingClientRect();
  const stageBox = winxGameStage.getBoundingClientRect();

  winxGame.items = winxGame.items.filter((item) => {
    item.y += item.speed * dt;
    item.rotate += 40 * dt;
    item.el.style.transform = `translateY(${item.y}px) rotate(${item.rotate}deg)`;

    const itemRect = item.el.getBoundingClientRect();
    const caught = (
      itemRect.left <= catcherRect.right &&
      itemRect.right >= catcherRect.left &&
      itemRect.top <= catcherRect.bottom &&
      itemRect.bottom >= catcherRect.top
    );

    if (caught) {
      winxSetScore(winxGame.score + item.points);
      winxCollectBurst(itemRect.left - stageBox.left, itemRect.top - stageBox.top, item.points);
      if (item.type === "bomb") {
        winxBombExplosion();
      }
      item.el.remove();
      return false;
    }

    if (item.y > rect.height + 56) {
      item.el.remove();
      return false;
    }
    return true;
  });

  winxGame.rafId = requestAnimationFrame(winxLoop);
}

function winxStartGameLoop() {
  winxResetGame();
  if (winxGameMessage) winxGameMessage.classList.add("hidden");
  winxSetGameStarted(true);
  winxKeys.clear();
  winxGame.running = true;
  winxGame.lastTime = performance.now();
  if (winxGame.rafId) cancelAnimationFrame(winxGame.rafId);
  winxGame.rafId = requestAnimationFrame(winxLoop);
}

function setupWinxScene() {
  if (!winxStage) return;

  winxApplyDeviceMode();
  winxPaintUiCanvases();

  if (winxGoHome) {
    winxGoHome.addEventListener("click", winxRestartFromDesktop);
  }
  if (winxOpenLetter) {
    winxOpenLetter.addEventListener("click", winxOpenLetterWindow);
  }
  if (winxMinLetter) {
    winxMinLetter.addEventListener("click", winxMinimizeLetterWindow);
  }
  if (winxCloseLetter) {
    winxCloseLetter.addEventListener("click", winxCloseLetterWindow);
  }
  if (winxOpenGame) {
    winxOpenGame.addEventListener("click", winxOpenGameWindow);
  }
  if (winxMinGame) {
    winxMinGame.addEventListener("click", winxMinimizeGameWindow);
  }
  if (winxCloseGame) {
    winxCloseGame.addEventListener("click", winxCloseGameWindow);
  }
  if (winxCarta) {
    winxCarta.addEventListener("click", winxHandleIntroCartaClick);
  }
  if (winxLetterImage) {
    winxLetterImage.addEventListener("click", winxShowLetterWarning);
  }
  if (winxLetterContent) {
    winxLetterContent.addEventListener("click", (event) => {
      if (!(event.target instanceof HTMLElement)) return;
      if (event.target.closest("#winx-letter-image")) return;
      if (!event.target.closest("p")) return;
      winxShowLetterWarning();
    });
  }

  if (winxGameStage) {
    winxGameStage.addEventListener("pointerdown", winxHandleGamePointerDown);
    winxGameStage.addEventListener("pointermove", winxHandleGamePointerMove);
    winxGameStage.addEventListener("pointerup", winxHandleGamePointerUp);
    winxGameStage.addEventListener("pointercancel", winxHandleGamePointerUp);
    winxGameStage.addEventListener("lostpointercapture", () => {
      winxGame.pointerId = null;
      winxGameStage.classList.remove("dragging");
    });
  }

  if (winxStartGame) winxStartGame.addEventListener("click", winxStartGameLoop);
  if (winxRestartGame) winxRestartGame.addEventListener("click", winxStartGameLoop);

  document.addEventListener("keydown", (event) => {
    if (!winxIsDesktopReady() || !winxGame.running) return;
    winxKeys.add(event.key);
    if (["ArrowLeft", "ArrowRight", "a", "A", "d", "D", " "].includes(event.key)) {
      event.preventDefault();
    }
  }, true);

  document.addEventListener("keyup", (event) => {
    winxKeys.delete(event.key);
  }, true);

  window.addEventListener("mousemove", (event) => {
    if (!winxIsDesktopReady() || !winxGame.running || !winxGameWindow?.classList.contains("aberta")) return;
    const rect = winxStageRect();
    const insideX = event.clientX >= rect.left && event.clientX <= rect.right;
    const insideY = event.clientY >= rect.top && event.clientY <= rect.bottom;
    if (!insideX || !insideY) return;
    winxSetTargetFromPointer(event.clientX, true);
  });

  window.addEventListener("resize", () => {
    winxApplyDeviceMode();
    winxUpdateCatcherPosition();
    winxPaintUiCanvases();
  });
  window.addEventListener("resize", winxResizeBootCanvas);
  winxUpdateCatcherPosition();
}

let touchStartX = 0;
let touchStartY = 0;

document.addEventListener("touchstart", (e) => {
  touchStartX = e.touches[0].clientX;
  touchStartY = e.touches[0].clientY;
}, { passive: true });

document.addEventListener("touchend", (e) => {
  if (!root || !root.classList.contains("active")) return;

  const dx = e.changedTouches[0].clientX - touchStartX;
  const dy = e.changedTouches[0].clientY - touchStartY;

  if (Math.abs(dx) < Math.abs(dy) * 1.5) return;
  if (Math.abs(dx) < 40) return;

  if (dx < 0 && page < PAGES.length - 1) goTo(page + 1, "right");
  else if (dx > 0 && page > 0) goTo(page - 1, "left");
}, { passive: true });

document.addEventListener("keydown", (e) => {
  if (winxIsDesktopReady()) return;

  if (root && root.classList.contains("active")) {
    if (e.key === "ArrowLeft" && page > 0) goTo(page - 1, "left");
    if (e.key === "ArrowRight" && page < PAGES.length - 1) goTo(page + 1, "right");
    return;
  }

  if (!introReadyForContinue || loadingStarted) return;
  if (["Shift", "Control", "Alt", "Meta"].includes(e.key)) return;

  e.preventDefault();
  startLoadingSequence();
});

async function loadDiscordInfo() {
  if (discordInfoPromise) return discordInfoPromise;

  discordInfoPromise = (async () => {
    const fallbackAvatar = DISCORD_AVATAR_FALLBACK;
    if (!USE_DISCORD_AVATAR_API) {
      pfp = pfp || fallbackAvatar;
      applyLoadingDiscordIdentity();
      renderPage();
      return;
    }

    try {
      const apiPath = `/api/avatar/${encodeURIComponent(SOFI_ID)}`;
      const avatarRes = await fetch(`${DISCORD_API_BASE}${apiPath}`, { cache: "no-store" });
      if (!avatarRes.ok) throw new Error("Avatar request failed");

      const avatarData = await avatarRes.json();
      const resolvedAvatar = firstString(avatarData?.avatarUrl, avatarData?.url);
      if (!resolvedAvatar) throw new Error("Avatar URL missing");

      pfp = resolvedAvatar;
    } catch (error) {
      pfp = pfp || fallbackAvatar;
    }

    applyLoadingDiscordIdentity();
    renderPage();
  })().finally(() => {
    discordInfoPromise = null;
  });

  return discordInfoPromise;
}

function startDiscordAvatarRefresh() {
  loadDiscordInfo();
  if (discordAvatarRefreshInterval) return;
  discordAvatarRefreshInterval = setInterval(loadDiscordInfo, DISCORD_AVATAR_REFRESH_MS);
}

function startInteractivePages() {
  if (!root) return;

  root.classList.add("active");
  root.style.display = "flex";
  renderPage();
  protectImagesFromSaving();

  if (!window.__heartsStarted) {
    window.__heartsStarted = true;
    initHearts();
  }

  startDiscordAvatarRefresh();
}

window.startInteractivePages = startInteractivePages;
window.addEventListener("contentPagesComplete", winxShowScene);

function startLoadingSequence() {
  if (loadingStarted || !introReadyForContinue) return;

  loadingStarted = true;
  unlockAndPlay();

  destroyWorldIntro();

  setTimeout(() => {
    if (loadingScreen) {
      loadingScreen.classList.add("show");
      startBinaryRain();
    }
    typeTerminalLines();
  }, 380);

  setTimeout(() => {
    stopBinaryRain();
    if (loadingScreen) loadingScreen.classList.remove("show");
    if (finalBlack) finalBlack.classList.add("show");
    beginFinalStorySequence();
  }, 3520);
}

function typeTerminalLines() {
  if (!terminalLines) return;

  terminalLines.textContent = "";
  cuteLines.forEach((line, index) => {
    setTimeout(() => {
      terminalLines.textContent += (index === 0 ? "" : "\n") + line;
    }, index * 350);
  });
}

function beginFinalStorySequence() {
  if (storyStage) storyStage.classList.add("show");
  setTimeout(() => {
    if (letterScene) letterScene.classList.add("show");
  }, 900);
}

if (letterButton) {
  letterButton.addEventListener("click", () => {
    if (letterOpened) return;

    letterOpened = true;
    letterButton.classList.add("opening");
    burstHearts(window.innerWidth / 2, window.innerHeight / 2, 6);

    setTimeout(() => {
      if (letterScene) letterScene.classList.remove("show");
      setTimeout(() => {
        if (typeof window.startInteractivePages === "function") {
          window.startInteractivePages();
        }
      }, 350);
    }, 480);
  });
}

if (prevBtn) {
  prevBtn.addEventListener("click", () => {
    if (page > 0) goTo(page - 1, "left", prevBtn);
  });
}

if (nextBtn) {
  nextBtn.addEventListener("click", () => {
    if (page < PAGES.length - 1) goTo(page + 1, "right", nextBtn);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  lockPageAgainstCopyAndDrag();
  protectImagesFromSaving();
  setupCustomCursor();
  applyLoadingDiscordIdentity();
  startDiscordAvatarRefresh();

  initWorldIntro();
  setupWinxScene();

  if (introStage) {
    introStage.addEventListener("click", () => {
      if (!introReadyForContinue || loadingStarted) return;
      startLoadingSequence();
    }, { capture: true });
  }
});

window.__heartsStarted = window.__heartsStarted || false;
