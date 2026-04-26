document.addEventListener("DOMContentLoaded", () => {
  const userArea = document.getElementById("user-area");

  if (!userArea) return;

  let usuario = null;

  // Tenta recuperar os dados da sessão (que serão injetados aqui após o Login real na API)
  try {
    usuario = JSON.parse(localStorage.getItem("usuarioLogado"));
  } catch (e) {
    localStorage.removeItem("usuarioLogado");
  }

  // Verifica se o usuário existe e utiliza a propriedade que vem do seu banco (nome_usuario)
  if (usuario && (usuario.nome_usuario || usuario.email)) {
    
    let nome = usuario.nome_usuario;

    // Se por acaso não tiver nome, usa a primeira parte do email
    if (!nome && usuario.email) {
      nome = usuario.email.split("@")[0];
    }

    if (!nome) nome = "Usuário";

    // Limita o tamanho do nome na tela
    if (nome.length > 12) {
      nome = nome.slice(0, 12) + "...";
    }

    userArea.classList.add('user-dropdown');
    userArea.innerHTML = `
    <span style="cursor: pointer;">Olá, ${nome} ▼</span>
    <div class="dropdown-content">
        <a href="minhas-receitas.html">Minhas Receitas</a>
        <a href="#" id="btn-logout" style="color: red;">Sair da Conta</a>
    </div>
`;

    document.getElementById('btn-logout').addEventListener('click', (e) => {
    e.preventDefault();
    if (confirm("Deseja sair da sua conta?")) {
        localStorage.removeItem("usuarioLogado");
        window.location.href = "index.html";
    }
});

  } else {
    // Se não tiver ninguém no localStorage, mostra a opção de Entrar
    userArea.innerHTML = "Entrar";

    userArea.onclick = () => {
      window.location.href = "login.html";
    };
  }
});