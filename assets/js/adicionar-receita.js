document.addEventListener("DOMContentLoaded", () => {
  const inputUpload = document.getElementById("imagemUpload");
  const inputURL = document.getElementById("imagem");
  const preview = document.getElementById("preview");

  let imagemFinal = "";

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

  /* ================= TRANSFORMAR LISTA (MELHORIA UX) ================= */
  function transformarIngredientes(texto) {
    return texto
      .split(/\n|,/)
      .map((item) => item.trim())
      .filter((item) => item);
  }

  function transformarModoPreparo(texto) {
    return texto
      .split("\n")
      .map((item) => item.trim())
      .filter((item) => item);
  }

  /* ================= SUBMIT ================= */
  document
    .getElementById("receitaForm")
    .addEventListener("submit", function (e) {
      e.preventDefault();

      if (!imagemFinal) {
        alert("Adicione uma imagem!");
        return;
      }

      const novaReceita = {
        id: Date.now().toString(),

        titulo: document.getElementById("titulo").value,
        categoria: document.getElementById("categoria").value,

        descricao: document.getElementById("descricao").value,
        descricaoCompleta: document.getElementById("descricaoCompleta").value,

        imagem: imagemFinal,
        video: converterYoutube(document.getElementById("video").value),

        tempo: document.getElementById("tempo").value,
        dificuldade: document.getElementById("dificuldade").value,
        custo: document.getElementById("custo").value,

        ingredientes: {
          Ingredientes: transformarIngredientes(
            document.getElementById("ingredientes").value,
          ),
        },

        modo_preparo: {
          "Modo de preparo": transformarModoPreparo(
            document.getElementById("modo").value,
          ),
        },
      };

      let receitas = JSON.parse(localStorage.getItem("receitas")) || [];

      receitas.push(novaReceita);

      localStorage.setItem("receitas", JSON.stringify(receitas));

      alert("Receita adicionada!");

      window.location.href = "index.html";
    });
});
