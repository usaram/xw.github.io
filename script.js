// 🔥 LISTA DE CONTAS (ADICIONA QUANTAS QUISER)
const profiles = [
  {
    id: "1466308940634652745",
    links: {
      twitter: "https://x.com/...",
      insta: "https://instagram.com/...",
      tiktok: "",
      roblox: ""
    }
  },
  {
    id: "1462586784067358894",
    links: {
      twitter: "",
      insta: "",
      tiktok: "",
      roblox: ""
    }
  }
];

// CRIAR CARDS
const container = document.getElementById("container");

profiles.forEach(profile => {
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <img class="cover">
    <img class="avatar">
    <h2 class="username"></h2>
    <p class="activity"></p>

    <div class="socials">
      <a href="${profile.links.twitter}" target="_blank"><i class="fab fa-x-twitter"></i></a>
      <a href="${profile.links.insta}" target="_blank"><i class="fab fa-instagram"></i></a>
      <a href="${profile.links.tiktok}" target="_blank"><i class="fab fa-tiktok"></i></a>
      <a href="${profile.links.roblox}" target="_blank"><i class="fas fa-cube"></i></a>
    </div>
  `;

  container.appendChild(card);

  const avatar = card.querySelector(".avatar");
  const username = card.querySelector(".username");
  const activity = card.querySelector(".activity");
  const cover = card.querySelector(".cover");

  // DISCORD UPDATE
  async function update() {
    try {
      const res = await fetch(`https://api.lanyard.rest/v1/users/${profile.id}`);
      const data = await res.json();
      const user = data.data;

      username.innerText = user.discord_user.username;
      avatar.src =
        `https://cdn.discordapp.com/avatars/${profile.id}/${user.discord_user.avatar}.png`;

      if (user.listening_to_spotify) {
        activity.innerText =
          `${user.spotify.song} - ${user.spotify.artist}`;

        cover.src = user.spotify.album_art_url;
        cover.style.display = "block";
      } else if (user.activities.length > 0) {
        activity.innerText = user.activities[0].name;
        cover.style.display = "none";
      } else {
        activity.innerText = "Idle";
        cover.style.display = "none";
      }

    } catch {}
  }

  setInterval(update, 5000);
  update();
});

// PARTICLES (flocos LED)
const canvas = document.createElement("canvas");
document.getElementById("particles").appendChild(canvas);
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let flakes = [];

for (let i = 0; i < 80; i++) {
  flakes.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    s: Math.random() * 2,
    v: Math.random() * 0.4
  });
}

function anim() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  flakes.forEach(f => {
    f.y += f.v;
    if (f.y > canvas.height) f.y = 0;

    ctx.fillStyle = "#c77dff";
    ctx.fillRect(f.x, f.y, f.s, f.s);
  });

  requestAnimationFrame(anim);
}

anim();
