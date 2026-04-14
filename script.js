// ⚠️ COLOCA SEU ID AQUI
const USER_ID = "SEU_ID_DISCORD";

// API LANYARD
async function updateDiscord() {
  const res = await fetch(`https://api.lanyard.rest/v1/users/${USER_ID}`);
  const data = await res.json();

  const user = data.data;

  // USER
  document.getElementById("username").innerText =
    user.discord_user.username;

  // AVATAR
  document.getElementById("avatar").src =
    `https://cdn.discordapp.com/avatars/${USER_ID}/${user.discord_user.avatar}.png`;

  // STATUS
  const statusEl = document.getElementById("status");
  statusEl.innerText = user.discord_status;
  statusEl.className = user.discord_status;

  // ATIVIDADE
  if (user.activities.length > 0) {
    document.getElementById("activity").innerText =
      user.activities[0].name;
  }
}

// ATUALIZA SEMPRE
setInterval(updateDiscord, 5000);
updateDiscord();
