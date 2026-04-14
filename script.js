// 🔥 COLOCA SEU ID DISCORD
const USER_ID = "1469403001671389254";

// LANYARD API (DISCORD)
async function updateDiscord() {
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
}

setInterval(updateDiscord, 5000);
updateDiscord();

// EDITOR
function toggleEditor() {
  const ed = document.getElementById("editor");
  ed.style.display = ed.style.display === "block" ? "none" : "block";
}

// SALVAR LINKS
function saveLinks() {
  const links = {
    twitter: editTwitter.value,
    insta: editInsta.value,
    github: editGithub.value
  };

  localStorage.setItem("links", JSON.stringify(links));
  loadLinks();
}

// CARREGAR LINKS
function loadLinks() {
  const data = JSON.parse(localStorage.getItem("links"));
  if (!data) return;

  twitter.href = data.twitter;
  instagram.href = data.insta;
  github.href = data.github;
}

loadLinks();

// PARTICLES SIMPLES
const canvas = document.createElement("canvas");
document.getElementById("particles").appendChild(canvas);
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let p = [];

for (let i = 0; i < 80; i++) {
  p.push({
    x: Math.random()*canvas.width,
    y: Math.random()*canvas.height,
    s: Math.random()*2
  });
}

function anim() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  p.forEach(pt => {
    pt.y += 0.3;
    if (pt.y > canvas.height) pt.y = 0;
    ctx.fillStyle = "purple";
    ctx.fillRect(pt.x, pt.y, pt.s, pt.s);
  });
  requestAnimationFrame(anim);
}

anim();
