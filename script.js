const profilesDiv = document.getElementById("profiles");

/* 🔥 EDITA AQUI */
const profiles = [
  {
    id: "SEU_ID_AQUI",
    nick: "Seu Nick"
  }
];

profiles.forEach(p => {

  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML = `
    <img class="avatar">
    <div class="nick">${p.nick}</div>
    <div class="username"></div>
    <div class="activity"></div>
  `;

  profilesDiv.appendChild(card);

  const avatar = card.querySelector(".avatar");
  const username = card.querySelector(".username");
  const activity = card.querySelector(".activity");

  async function update(){
    try{
      const res = await fetch(`https://api.lanyard.rest/v1/users/${p.id}`);
      const data = await res.json();
      const user = data.data;

      username.innerText = user.discord_user.username;

      avatar.src =
        `https://cdn.discordapp.com/avatars/${p.id}/${user.discord_user.avatar}.png`;

      if(user.listening_to_spotify){
        activity.innerText =
          `${user.spotify.song} - ${user.spotify.artist}`;
      } else {
        activity.innerText =
          user.activities[0]?.name || "Idle";
      }

    }catch{}
  }

  setInterval(update, 5000);
  update();
});
