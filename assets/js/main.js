document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".cards");
  const searchInput = document.getElementById("searchInput");
  const linksCategoria = document.querySelectorAll("[data-categoria]");

  let receitas = [];
  let receitasFiltradas = [];

  try {
    const response = await fetch("assets/data/receitas.json");
    receitas = await response.json();
    receitasFiltradas = receitas;

    renderizar(receitasFiltradas);
  } catch (error) {
    console.error("Erro ao carregar receitas:", error);
  }

  /* ================= RENDER ================= */
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

      const btnModoPreparo = card.querySelector(".btn");

      btnModoPreparo.addEventListener("click", () => {
        window.location.href = `receita.html?id=${r.id}`;
      });

      container.appendChild(card);
    });
  }

  /* ================= FILTRO POR CATEGORIA ================= */
  linksCategoria.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const categoria = link.dataset.categoria;

      receitasFiltradas = receitas.filter(
        (r) => r.categoria.toLowerCase() === categoria.toLowerCase(),
      );

      renderizar(receitasFiltradas);
    });
  });

  /* ================= BUSCA ================= */
  searchInput.addEventListener("input", () => {
    const termo = searchInput.value.toLowerCase();

    const resultado = receitasFiltradas.filter((r) =>
      r.titulo.toLowerCase().includes(termo),
    );

    renderizar(resultado);
  });

  /* ================= FAVORITOS ================= */
  container.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-fav");
    if (!btn) return;

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
