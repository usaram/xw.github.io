// LOADING
setTimeout(() => {
  loading.style.display = "none";
  login.style.display = "flex";
}, 2000);

// ENTRAR
function enterSite() {
  login.style.display = "none";
  site.classList.remove("hidden");
  sendWebhook();
}

// MÚSICA
function toggleMusic() {
  music.paused ? music.play() : music.pause();
}

// TEMA
function toggleTheme() {
  document.body.style.filter =
    document.body.style.filter ? "" : "invert(1)";
}

// EDITOR
function toggleEditor() {
  editor.classList.toggle("hidden");
}

// SALVAR
function saveConfig() {
  const data = {
    name: editName.value,
    bio: editBio.value,
    avatar: editAvatar.value,
    links: editLinks.value
  };

  localStorage.setItem("cfg", JSON.stringify(data));
  loadConfig();
}

// LOAD
function loadConfig() {
  let d = JSON.parse(localStorage.getItem("cfg"));
  if (!d) return;

  name.innerText = d.name;
  bio.innerText = d.bio;
  avatar.src = d.avatar;

  links.innerHTML = "";
  d.links.split("\n").forEach(l => {
    let [n,u] = l.split("|");
    links.innerHTML += `<a class="btn" href="${u}">${n}</a>`;
  });
}

loadConfig();

// VIEWS
let v = localStorage.getItem("v") || 0;
v++;
localStorage.setItem("v", v);
views.innerText = v;

// 🔥 WEBHOOK DISCORD
function sendWebhook() {
  const url = "COLE_SEU_WEBHOOK_AQUI";

  fetch(url, {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({
      content: "👁️ Alguém entrou no seu site V4 ULTRA"
    })
  });
}
