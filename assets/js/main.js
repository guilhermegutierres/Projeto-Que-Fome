document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".cards");
  const searchInput = document.getElementById("searchInput");
  const linksCategoria = document.querySelectorAll("[data-categoria]");
  const fab = document.getElementById("fab-add");

  let receitas = [];
  let receitasFiltradas = [];

  try {
    const response = await fetch("assets/data/receitas.json");
    const receitasJson = await response.json();

    const receitasLocal =
      JSON.parse(localStorage.getItem("receitas")) || [];

    receitas = [...receitasJson, ...receitasLocal];

    receitasFiltradas = receitas;

    renderizar(receitasFiltradas);
  } catch (error) {
    console.error("Erro ao carregar receitas:", error);
  }

  /* FAB */
  if (fab) {
    fab.addEventListener("click", () => {
      const usuario = localStorage.getItem("usuarioLogado");

      if (usuario) {
        window.location.href = "adicionar-receita.html";
      } else {
        alert("Você precisa estar logado!");
        window.location.href = "login.html";
      }
    });
  }

  function renderizar(lista) {
    container.innerHTML = "";

    lista.forEach((r) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.dataset.id = r.id;

      const isFav = armazenamentoAPI.isFavorito(r.id);

      card.innerHTML = `
        <img src="${r.imagem}">
        <div>
          <h2>${r.titulo}</h2>
          <p>${r.descricao}</p>

          <div class="card-actions">
            <button class="btn">Modo de preparo</button>

            <button class="btn btn-fav ${isFav ? "active" : ""}">
              ${isFav ? "Desfavoritar" : "Favoritar"}
              <span class="heart">
                <i class="ri-heart-line"></i>
              </span>
            </button>
          </div>
        </div>
      `;

      card.querySelector(".btn").addEventListener("click", () => {
        window.location.href = `receita.html?id=${r.id}`;
      });

      container.appendChild(card);
    });
  }

  linksCategoria.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const categoria = link.dataset.categoria;

      receitasFiltradas = receitas.filter(
        (r) =>
          r.categoria &&
          r.categoria.toLowerCase() === categoria.toLowerCase()
      );

      renderizar(receitasFiltradas);
    });
  });

  searchInput.addEventListener("input", () => {
    const termo = searchInput.value.toLowerCase();

    const resultado = receitasFiltradas.filter((r) =>
      r.titulo.toLowerCase().includes(termo)
    );

    renderizar(resultado);
  });

  /* ================= FAVORITAR COM VALIDAÇÃO ================= */
  container.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-fav");
    if (!btn) return;

    const usuario = localStorage.getItem("usuarioLogado");

    // 🔥 BLOQUEIO
    if (!usuario) {
      alert("Faça login para favoritar receitas ❤️");
      window.location.href = "login.html";
      return;
    }

    const card = btn.closest(".card");
    const id = card.dataset.id;

    const isFav = armazenamentoAPI.toggleFavorito(id);

    btn.classList.toggle("active", isFav);

    const icon = btn.querySelector(".heart i");

    if (isFav) {
      btn.childNodes[0].nodeValue = "Desfavoritar ";
      icon.style.color = "#fff";
    } else {
      btn.childNodes[0].nodeValue = "Favoritar ";
      icon.style.color = "#ff6b6b";
    }
  });
});