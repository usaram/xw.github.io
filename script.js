function showTab(tabId) {
  document.querySelectorAll(".tab").forEach(tab => {
    tab.classList.remove("active");
  });

  document.getElementById(tabId).classList.add("active");
}

// SIMULA CONTAS
let accounts = [];

function addAccount() {
  const id = Math.floor(Math.random() * 1000);

  accounts.push({
    name: "User_" + id,
    avatar: "https://via.placeholder.com/80"
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

// TEMA
function toggleTheme() {
  document.body.classList.toggle("light");
}
