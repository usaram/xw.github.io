const USER_ID = "1469403001671389254";

// CONFIG PADRÃO
let config = {
  color: "#c77dff",
  bg: "",
  links: {
    twitter: "",
    insta: "",
    tiktok: ""
  }
};

// CARREGAR CONFIG
function loadConfig() {
  const saved = JSON.parse(localStorage.getItem("config"));
  if (saved) config = saved;

  applyConfig();
}

// APLICAR
function applyConfig() {
  document.body.style.background = config.bg || "black";

  document.documentElement.style.setProperty(
    "--main-color",
    config.color
  );

  if (twitter) twitter.href = config.links.twitter;
  if (instagram) instagram.href = config.links.insta;
  if (tiktok) tiktok.href = config.links.tiktok;
}

// SALVAR
function saveConfig(newConfig) {
  localStorage.setItem("config", JSON.stringify(newConfig));
}

// DISCORD
async function updateDiscord() {
  const res = await fetch(`https://api.lanyard.rest/v1/users/${USER_ID}`);
  const data = await res.json();

  const user = data.data;

  username.innerText = user.discord_user.username;
  avatar.src =
    `https://cdn.discordapp.com/avatars/${USER_ID}/${user.discord_user.avatar}.png`;

  status.innerText = user.discord_status;
}

setInterval(updateDiscord, 5000);
updateDiscord();

loadConfig();
