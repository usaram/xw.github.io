const profiles = [
  {
    id: "1466308940634652745",
    nick: "inquieto"
  }
];

const profilesDiv = document.getElementById("profiles");
const discordBox = document.getElementById("discordBox");

profiles.forEach(p=>{

  const card=document.createElement("div");
  card.className="card";

  card.innerHTML=`
    <img class="avatar">
    <div>${p.nick}</div>
    <div class="username"></div>
    <div class="activity"></div>
  `;

  profilesDiv.appendChild(card);

  const avatar=card.querySelector(".avatar");
  const username=card.querySelector(".username");
  const activity=card.querySelector(".activity");

  async function update(){
    const res=await fetch(`https://api.lanyard.rest/v1/users/${p.id}`);
    const data=await res.json();
    const user=data.data;

    username.innerText=user.discord_user.username;

    avatar.src=`https://cdn.discordapp.com/avatars/${p.id}/${user.discord_user.avatar}.png`;

    if(user.listening_to_spotify){
      activity.innerText=`${user.spotify.song} - ${user.spotify.artist}`;
    }else{
      activity.innerText=user.activities[0]?.name || "Idle";
    }

    discordBox.innerHTML = `
      ${user.discord_user.username}<br>
      ${activity.innerText}
    `;
  }

  setInterval(update,5000);
  update();
});
