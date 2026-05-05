const discordId = "1466308940634652745";

const activityEl = document.getElementById("activity");
const discordBox = document.getElementById("discordInfo");

async function update(){
  try{
    const res = await fetch(`https://api.lanyard.rest/v1/users/${discordId}`);
    const data = await res.json();
    const user = data.data;

    if(user.listening_to_spotify){
      activityEl.innerText =
        `${user.spotify.song} - ${user.spotify.artist}`;
    } else {
      activityEl.innerText =
        user.activities[0]?.name || "Idle";
    }

    discordBox.innerHTML = `
      ${user.discord_user.username}<br>
      ${activityEl.innerText}
    `;

  }catch{}
}

setInterval(update,5000);
update();
