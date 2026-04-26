/* ================= LOGIN ================= */
const loginForm = document.getElementById("loginForm");

if (loginForm) {
  loginForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // 1. Captura os campos antes do try/catch para evitar erros mascarados
    const campoEmail = document.getElementById("email");
    const campoSenha = document.getElementById("senha");

    // Validação de segurança do HTML
    if (!campoEmail || !campoSenha) {
        alert("Erro interno: Campos de login não encontrados no HTML.");
        return;
    }

    const email = campoEmail.value;
    const senha = campoSenha.value;

    try {
      // 2. Usando 127.0.0.1 para evitar problemas com testes automatizados
      const response = await fetch("http://127.0.0.1:3000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const resultado = await response.json();

      if (response.ok) {
        // Guardamos os dados do usuário (o "crachá") para o sistema ler
        localStorage.setItem("usuarioLogado", JSON.stringify(resultado.usuario));
        window.location.href = "index.html";
      } else {
        alert(resultado.erro || "E-mail ou senha inválidos!");
      }
    } catch (error) {
      console.error("Erro ao realizar login:", error);
      alert(`Falha de conexão com o servidor: ${error.message}`);
    }
  });
}

/* ================= CADASTRO ================= */
const cadastroForm = document.getElementById("cadastroForm");

if (cadastroForm) {
  cadastroForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    // 1. Capturamos os campos ANTES do try/catch
    const campoNome = document.getElementById("nome");
    const campoEmail = document.getElementById("email");
    const campoSenha = document.getElementById("senha");

    // Validação de segurança para evitar o erro fantasma
    if (!campoNome || !campoEmail || !campoSenha) {
        alert("Erro interno: Um dos campos (ID) não foi encontrado no HTML.");
        return;
    }

    const nome = campoNome.value;
    const email = campoEmail.value;
    const senha = campoSenha.value;

    try {
      // 2. Usando o IP direto (127.0.0.1)
      const response = await fetch("http://127.0.0.1:3000/api/cadastro", {
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
      console.error("Erro detalhado no console:", error);
      // Agora, se cair aqui, é porque a internet ou o Node realmente caíram!
      alert(`Falha de conexão: ${error.message}`); 
    }
  });
}

/* ================= RECUPERAÇÃO ================= */
const resetForm = document.getElementById("resetForm");

if (resetForm) {
  resetForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    
    // Boa prática: Verificar o campo antes de ler o valor
    const campoEmail = document.getElementById("email");
    if (!campoEmail) return;

    const email = campoEmail.value;

    // Aqui poderíamos criar uma rota no backend para verificar se o email existe,
    // mas manteremos o alerta simples por enquanto.
    alert(`Se o e-mail ${email} estiver cadastrado, um link de recuperação será enviado.`);
  });
}