const API = "https://server-3i0k.onrender.com/config";

async function loadConfig() {
  try {
    const res = await fetch(API);
    const cfg = await res.json();

    // FUNDO
    document.body.style.background = `url(${cfg.bg}) center/cover`;

    // MÚSICA
    const audio = document.getElementById("music");
    if (cfg.music) {
      audio.src = cfg.music;
    }

    // LINKS
    document.getElementById("twitter").href = cfg.links.twitter;
    document.getElementById("instagram").href = cfg.links.instagram;
    document.getElementById("github").href = cfg.links.github;

  } catch (e) {
    console.log("Erro ao conectar API");
  }
}

// ATUALIZA
setInterval(loadConfig, 5000);
loadConfig();
