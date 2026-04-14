function showTab(tabId, btn) {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.remove("active");
  });

  document.querySelectorAll(".sidebar button").forEach(b => {
    b.classList.remove("active");
  });

  document.getElementById(tabId).classList.add("active");
  btn.classList.add("active");
}

/* CONTAS */
let accounts = [];

function addAccount() {
  const id = Math.floor(Math.random() * 9999);

  accounts.push({
    name: "User_" + id,
    avatar: "https://i.pravatar.cc/100?img=" + id
  });

  renderAccounts();
}

function renderAccounts() {
  const div = document.getElementById("accounts");
  div.innerHTML = "";

  accounts.forEach(acc => {
    div.innerHTML += `
      <div class="card">
        <img src="${acc.avatar}">
        <h3>${acc.name}</h3>
      </div>
    `;
  });
}

/* TEMA */
function toggleTheme() {
  document.body.classList.toggle("light");
}
