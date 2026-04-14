const USER_ID = "1469403001671389254";

// CONFIG PADRÃO
let config = {
  color: "#c77dff",
  bg: "",
  links: {
    twitter: "",
    insta: "",
    tiktok: ""
  }
};

// CARREGAR CONFIG
function loadConfig() {
  const saved = JSON.parse(localStorage.getItem("config"));
  if (saved) config = saved;

  applyConfig();
}

// APLICAR CONFIG
function applyConfig() {
  if (config.bg) {
    document.body.style.background = config.bg;
  }

  document.documentElement.style.setProperty(
    "--main-color",
    config.color || "#c77dff"
  );

  document.getElementById("twitter").href = config.links.twitter || "#";
  document.getElementById("instagram").href = config.links.insta || "#";
  document.getElementById("tiktok").href = config.links.tiktok || "#";
}

// DISCORD
async function updateDiscord() {
  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${USER_ID}`);
    const data = await res.json();

    const user = data.data;

    document.getElementById("username").innerText =
      user.discord_user.username;

    document.getElementById("avatar").src =
      `https://cdn.discordapp.com/avatars/${USER_ID}/${user.discord_user.avatar}.png`;

    const status = document.getElementById("status");
    status.innerText = user.discord_status;
    status.className = user.discord_status;

    if (user.activities.length > 0) {
      document.getElementById("activity").innerText =
        user.activities[0].name;
    }
  } catch (e) {
    console.log("Erro Discord");
  }
}

setInterval(updateDiscord, 5000);
updateDiscord();

// PARTICLES
const canvas = document.createElement("canvas");
document.getElementById("particles").appendChild(canvas);
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let p = [];

for (let i = 0; i < 80; i++) {
  p.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    s: Math.random() * 2
  });
}

function anim() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  p.forEach(pt => {
    pt.y += 0.3;
    if (pt.y > canvas.height) pt.y = 0;
    ctx.fillStyle = "purple";
    ctx.fillRect(pt.x, pt.y, pt.s, pt.s);
  });
  requestAnimationFrame(anim);
}

anim();

loadConfig();
