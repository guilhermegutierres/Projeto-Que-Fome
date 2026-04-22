/* ================= LOGIN ================= */
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const usuario = usuarios.find(
      (u) => u.email === email && u.senha === senha
    );

    if (usuario) {
      localStorage.setItem("usuarioLogado", JSON.stringify(usuario));
      window.location.href = "index.html";
    } else {
      alert("E-mail ou senha inválidos!");
    }
  });
}

/* ================= CADASTRO ================= */
const cadastroForm = document.getElementById("cadastroForm");

if (cadastroForm) {
  cadastroForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    const existe = usuarios.find((u) => u.email === email);

    if (existe) {
      alert("Usuário já existe!");
      return;
    }

    const novoUsuario = { nome, email, senha };

    usuarios.push(novoUsuario);

    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("Cadastro realizado!");
    window.location.href = "login.html";
  });
}