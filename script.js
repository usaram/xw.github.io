// LOADING
setTimeout(() => {
  document.getElementById("loading").style.display = "none";
  document.getElementById("login").style.display = "flex";
}, 2000);

// LOGIN FAKE
function enterSite() {
  document.getElementById("login").style.display = "none";
  document.getElementById("site").classList.remove("hidden");
}

// MÚSICA
function toggleMusic() {
  let m = document.getElementById("music");
  m.paused ? m.play() : m.pause();
}

// TEMA
function toggleTheme() {
  document.body.style.filter =
    document.body.style.filter ? "" : "hue-rotate(180deg)";
}

// EDITOR
function toggleEditor() {
  document.getElementById("editor").classList.toggle("hidden");
}

// SALVAR CONFIG
function saveConfig() {
  const data = {
    name: editName.value,
    bio: editBio.value,
    avatar: editAvatar.value,
    links: editLinks.value
  };

  localStorage.setItem("config", JSON.stringify(data));
  loadConfig();
}

// CARREGAR CONFIG
function loadConfig() {
  let data = JSON.parse(localStorage.getItem("config"));
  if (!data) return;

  name.innerText = data.name;
  bio.innerText = data.bio;
  avatar.src = data.avatar;

  links.innerHTML = "";
  data.links.split("\n").forEach(l => {
    let [n, url] = l.split("|");
    links.innerHTML += `<a class="btn" href="${url}">${n}</a>`;
  });
}

loadConfig();

// CONTADOR
let views = localStorage.getItem("views") || 0;
views++;
localStorage.setItem("views", views);
document.getElementById("views").innerText = views;
