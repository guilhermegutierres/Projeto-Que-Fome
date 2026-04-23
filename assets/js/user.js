document.addEventListener("DOMContentLoaded", () => {
  const userArea = document.getElementById("user-area");

  if (!userArea) return;

  let usuario = null;

  try {
    usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
  } catch (e) {
    localStorage.removeItem("usuarioLogado");
  }

  if (usuario && (usuario.nome || usuario.email)) {
    let nome = usuario.nome;

    if (!nome && usuario.email) {
      nome = usuario.email.split("@")[0];
    }

    if (!nome) nome = "Usuário";

    if (nome.length > 12) {
      nome = nome.slice(0, 12) + "...";
    }

    userArea.innerHTML = `Olá, ${nome}`;

    userArea.onclick = () => {
      if (confirm("Deseja sair?")) {
        localStorage.removeItem("usuarioLogado");
        location.reload();
      }
    };
  } else {
    userArea.innerHTML = "Entrar";

    userArea.onclick = () => {
      window.location.href = "login.html";
    };
  }
});
