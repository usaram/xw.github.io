const USER_ID = "1469403001671389254";

// CONFIG
let config = {
  color: "#c77dff",
  bg: "",
  links: {
    twitter: "",
    insta: "",
    tiktok: "",
    roblox: ""
  }
};

// CONFIG
function loadConfig() {
  const saved = JSON.parse(localStorage.getItem("config"));
  if (saved) config = saved;
  applyConfig();
}

function applyConfig() {
  if (config.bg) {
    document.body.style.background = config.bg;
  }

  document.documentElement.style.setProperty("--main-color", config.color);

  twitter.href = config.links.twitter || "#";
  instagram.href = config.links.insta || "#";
  tiktok.href = config.links.tiktok || "#";
  roblox.href = config.links.roblox || "#";
}

// DISCORD (ATIVIDADE REAL)
async function updateDiscord() {
  try {
    const res = await fetch(`https://api.lanyard.rest/v1/users/${USER_ID}`);
    const data = await res.json();
    const user = data.data;

    username.innerText = user.discord_user.username;
    avatar.src =
      `https://cdn.discordapp.com/avatars/${USER_ID}/${user.discord_user.avatar}.png`;

    // 🔥 ATIVIDADE
    let text = "Idle...";

    if (user.listening_to_spotify) {
      text = `🎧 ${user.spotify.song} - ${user.spotify.artist}`;
    } else if (user.activities.length > 0) {
      text = `🎮 ${user.activities[0].name}`;
    }

    activity.innerText = text;

  } catch (e) {
    console.log("Erro Discord");
  }
}

setInterval(updateDiscord, 5000);
updateDiscord();

// 🖱️ EFEITO 3D (FOLLOW MOUSE)
const card = document.getElementById("card");

document.addEventListener("mousemove", (e) => {
  const x = (window.innerWidth / 2 - e.clientX) / 25;
  const y = (window.innerHeight / 2 - e.clientY) / 25;

  card.style.transform = `rotateY(${x}deg) rotateX(${y}deg)`;
});

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
