// PERFIS BASE (NÃO ALTERA MAIS ISSO)
const baseProfiles = [
  { id: "1466308940634652745" },
  { id: "1462586784067358894" }
];

const container = document.getElementById("container");

// PEGAR CONFIG SALVA
function getConfig(id){
  return JSON.parse(localStorage.getItem("profile_"+id)) || {
    color: "#c77dff",
    links: {
      twitter: "",
      insta: "",
      tiktok: "",
      roblox: ""
    }
  };
}

baseProfiles.forEach(profile => {

  const config = getConfig(profile.id);

  const card = document.createElement("div");
  card.className = "card";

  // COR INDIVIDUAL
  card.style.boxShadow = `0 0 20px ${config.color}, 0 0 50px ${config.color}`;

  card.innerHTML = `
    <img class="cover">
    <img class="avatar">
    <h2 class="username"></h2>
    <p class="activity"></p>

    <div class="socials">
      ${config.links.twitter ? `<a href="${config.links.twitter}" target="_blank"><i class="fab fa-x-twitter"></i></a>` : ""}
      ${config.links.insta ? `<a href="${config.links.insta}" target="_blank"><i class="fab fa-instagram"></i></a>` : ""}
      ${config.links.tiktok ? `<a href="${config.links.tiktok}" target="_blank"><i class="fab fa-tiktok"></i></a>` : ""}
      ${config.links.roblox ? `<a href="${config.links.roblox}" target="_blank"><i class="fas fa-cube"></i></a>` : ""}
    </div>
  `;

  container.appendChild(card);

  const avatar = card.querySelector(".avatar");
  const username = card.querySelector(".username");
  const activity = card.querySelector(".activity");
  const cover = card.querySelector(".cover");

  async function update(){
    try{
      const res = await fetch(`https://api.lanyard.rest/v1/users/${profile.id}`);
      const data = await res.json();
      const user = data.data;

      username.innerText = user.discord_user.username;
      avatar.src = `https://cdn.discordapp.com/avatars/${profile.id}/${user.discord_user.avatar}.png`;

      if(user.listening_to_spotify){
        activity.innerText = `${user.spotify.song} - ${user.spotify.artist}`;
        cover.src = user.spotify.album_art_url;
        cover.style.display = "block";
      } else {
        activity.innerText = user.activities[0]?.name || "Idle";
      }

    }catch{}
  }

  setInterval(update,5000);
  update();
});


// 💜 PARTICLES LED
const canvas = document.createElement("canvas");
document.getElementById("particles").appendChild(canvas);
const ctx = canvas.getContext("2d");

canvas.width = innerWidth;
canvas.height = innerHeight;

let p = [];
for(let i=0;i<70;i++){
  p.push({
    x:Math.random()*canvas.width,
    y:Math.random()*canvas.height,
    s:Math.random()*2,
    v:Math.random()*0.3
  });
}

function anim(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  p.forEach(pt=>{
    pt.y+=pt.v;
    if(pt.y>canvas.height) pt.y=0;
    ctx.fillStyle="#c77dff";
    ctx.fillRect(pt.x,pt.y,pt.s,pt.s);
  });
  requestAnimationFrame(anim);
}

anim();
