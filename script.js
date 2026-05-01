const container = document.getElementById("container");

const profiles = JSON.parse(localStorage.getItem("profiles")) || [];

profiles.forEach(profile => {

  const card = document.createElement("div");
  card.className = "card";

  card.style.boxShadow =
    `0 0 20px ${profile.color}, 0 0 50px ${profile.color}`;

  card.innerHTML = `
    <img class="cover">
    <img class="avatar">

    <div class="nick">${profile.nick || "Sem nick"}</div>
    <div class="username"></div>

    <div class="activity"></div>

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
  const cover = card.querySelector(".cover");

  async function update(){
    try{
      const res = await fetch(`https://api.lanyard.rest/v1/users/${profile.id}`);
      const data = await res.json();
      const user = data.data;

      username.innerText = user.discord_user.username;

      avatar.src =
        `https://cdn.discordapp.com/avatars/${profile.id}/${user.discord_user.avatar}.png`;

      // 🎧 MUSICA COM CAPA + ARTISTA
      if(user.listening_to_spotify){
        activity.innerText =
          `${user.spotify.song} - ${user.spotify.artist}`;

        cover.src = user.spotify.album_art_url;
        cover.style.display = "block";
      } else {
        activity.innerText =
          user.activities[0]?.name || "Idle";

        cover.style.display = "none";
      }

    }catch{}
  }

  setInterval(update, 5000);
  update();
});
