const container = document.getElementById("container");

// 🔥 AGORA LÊ TODAS AS CONTAS DO STORAGE
const profiles = JSON.parse(localStorage.getItem("profiles")) || [];

profiles.forEach(profile => {

  const card = document.createElement("div");
  card.className = "card";

  // cor individual
  card.style.boxShadow =
    `0 0 20px ${profile.color}, 0 0 50px ${profile.color}`;

  card.innerHTML = `
    <img class="avatar">
    <h2 class="username"></h2>
    <p class="activity"></p>

    <div class="socials">
      ${profile.links.twitter ? `<a href="${profile.links.twitter}" target="_blank"><i class="fab fa-x-twitter"></i></a>` : ""}
      ${profile.links.insta ? `<a href="${profile.links.insta}" target="_blank"><i class="fab fa-instagram"></i></a>` : ""}
      ${profile.links.tiktok ? `<a href="${profile.links.tiktok}" target="_blank"><i class="fab fa-tiktok"></i></a>` : ""}
      ${profile.links.roblox ? `<a href="${profile.links.roblox}" target="_blank"><i class="fas fa-cube"></i></a>` : ""}
    </div>
  `;

  container.appendChild(card);

  const avatar = card.querySelector(".avatar");
  const username = card.querySelector(".username");
  const activity = card.querySelector(".activity");

  async function update(){
    try{
      const res = await fetch(`https://api.lanyard.rest/v1/users/${profile.id}`);
      const data = await res.json();
      const user = data.data;

      username.innerText = user.discord_user.username;
      avatar.src =
        `https://cdn.discordapp.com/avatars/${profile.id}/${user.discord_user.avatar}.png`;

      activity.innerText =
        user.listening_to_spotify
        ? `${user.spotify.song} - ${user.spotify.artist}`
        : user.activities[0]?.name || "Idle";

    }catch{}
  }

  setInterval(update,5000);
  update();
});
