document.addEventListener("DOMContentLoaded", () => {
  const inputUpload = document.getElementById("imagemUpload");
  const inputURL = document.getElementById("imagem");
  const preview = document.getElementById("preview");
  const containerPassos = document.getElementById("passos-container");
  const btnAddPasso = document.getElementById("add-passo");

  let contadorPassos = 1;
  let imagemFinal = "";

  btnAddPasso.addEventListener("click", () => {
    contadorPassos++;
    const div = document.createElement("div");
    div.classList.add("passo-item");
    div.innerHTML = `
    <input type="text" placeholder="Passo ${contadorPassos}" class="passo-input" />
  `;
    containerPassos.appendChild(div);
  });

  /* ================= PREVIEW UPLOAD ================= */
  inputUpload.addEventListener("change", () => {
    const file = inputUpload.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        imagemFinal = e.target.result;
        preview.src = imagemFinal;
        preview.style.display = "block";
      };
      reader.readAsDataURL(file);
    }
  });

  /* ================= PREVIEW URL ================= */
  inputURL.addEventListener("input", () => {
    if (inputURL.value) {
      imagemFinal = inputURL.value;
      preview.src = imagemFinal;
      preview.style.display = "block";
    }
  });

  /* ================= CONVERTE YOUTUBE ================= */
  function converterYoutube(url) {
    if (!url) return "";
    if (url.includes("watch?v=")) {
      const id = url.split("watch?v=")[1].split("&")[0];
      return `https://www.youtube.com/embed/${id}`;
    }
    if (url.includes("youtu.be/")) {
      const id = url.split("youtu.be/")[1];
      return `https://www.youtube.com/embed/${id}`;
    }
    return url;
  }

  /* ================= TRANSFORMAR LISTA ================= */
  function transformarIngredientes(texto) {
    return texto
      .split(/\n|,/)
      .map((item) => item.trim())
      .filter((item) => item);
  }

  // ATENÇÃO: Adicionado o termo 'async' na função para permitir a comunicação com a API
  document.getElementById("receitaForm").addEventListener("submit", async function (e) {
      e.preventDefault();

      if (!imagemFinal) {
        alert("Adicione uma imagem!");
        return;
      }

      const passos = Array.from(document.querySelectorAll(".passo-input"))
        .map((input) => input.value.trim())
        .filter((p) => p);

      if (passos.length === 0) {
        alert("Adicione pelo menos um passo!");
        return;
      }

      // CORREÇÃO 1: Formatação dos dados para o padrão do Banco de Dados
      // A tabela 'receita' espera um texto corrido (TEXT) para o modo_preparo, não um Array/Objeto.
      const modoPreparoString = passos.map((passo, index) => `${index + 1}. ${passo}`).join('\n');
      
      const descricaoCurta = document.getElementById("descricao").value;
      const descricaoCompleta = document.getElementById("descricaoCompleta").value;
      const descricaoFinal = descricaoCompleta ? descricaoCompleta : descricaoCurta;

      // 1. Recupera os dados do usuário real que fez o login
      const usuarioString = localStorage.getItem("usuarioLogado");
      
      if (!usuarioString) {
          alert("Sessão expirada. Faça login novamente para salvar receitas.");
          window.location.href = "login.html";
          return;
      }

      const usuarioLogado = JSON.parse(usuarioString);

      const dadosDaReceita = {
        titulo: document.getElementById("titulo").value,
        descricao: descricaoFinal,
        modo_preparo: modoPreparoString,
        imagem: imagemFinal, // Base64 gerado pelo seu FileReader ou URL
        video: converterYoutube(document.getElementById("video").value), // URL tratada para iframe
        id_usuario_autor: usuarioLogado.id_usuario 
      };

      // CORREÇÃO 2: Substituição do LocalStorage pela requisição HTTP (Fetch API)
      try {
          const response = await fetch('http://localhost:3000/api/receitas', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json'
              },
              body: JSON.stringify(dadosDaReceita)
          });

          if (!response.ok) {
              throw new Error(`Erro HTTP: ${response.status}`);
          }

          alert("✅ Receita salva com sucesso no Banco de Dados!");
          window.location.href = "index.html";

      } catch (error) {
          console.error("Erro ao conectar com o servidor Node.js:", error);
          alert("❌ Erro ao salvar. O servidor backend está ligado?");
      }
    });
});