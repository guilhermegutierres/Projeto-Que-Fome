/* ================= LOGIN ================= */
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const resultado = await response.json();

      if (response.ok) {
        // Guardamos os dados do usuário (o "crachá") para o user.js ler
        localStorage.setItem("usuarioLogado", JSON.stringify(resultado.usuario));
        window.location.href = "index.html";
      } else {
        alert(resultado.erro || "E-mail ou senha inválidos!");
      }
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      alert("Erro ao conectar com o servidor.");
    }
  });
}

/* ================= CADASTRO ================= */
const cadastroForm = document.getElementById("cadastroForm");

if (cadastroForm) {
  cadastroForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    const nome = document.getElementById("nome").value;
    const email = document.getElementById("email").value;
    const senha = document.getElementById("senha").value;

    try {
      const response = await fetch("http://localhost:3000/api/cadastro", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, email, senha }),
      });

      const resultado = await response.json();

      if (response.ok) {
        alert("Cadastro realizado com sucesso!");
        window.location.href = "login.html";
      } else {
        alert(resultado.erro || "Erro ao realizar cadastro.");
      }
    } catch (error) {
      console.error("Erro ao realizar cadastro:", error);
      alert("Erro ao conectar com o servidor.");
    }
  });
}

/* ================= RECUPERAÇÃO ================= */
const resetForm = document.getElementById("resetForm");

if (resetForm) {
  resetForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = document.getElementById("email").value;

    // Aqui poderíamos criar uma rota no backend para verificar se o email existe,
    // mas manteremos o alerta simples por enquanto.
    alert(`Se o e-mail ${email} estiver cadastrado, um link de recuperação será enviado.`);
  });
}