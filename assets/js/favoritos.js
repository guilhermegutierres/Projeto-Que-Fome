document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".cards");
  const searchInput = document.getElementById("searchInput");
  const linksCategoria = document.querySelectorAll("[data-categoria]");

  const response = await fetch("assets/data/receitas.json");
  const receitas = await response.json();

  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  let receitasFavoritas = receitas.filter((r) => favoritos.includes(r.id));

  let listaAtual = receitasFavoritas;

  renderizar(listaAtual);

  /* ================= RENDER ================= */
  function renderizar(lista) {
    container.innerHTML = "";

    if (lista.length === 0) {
      container.innerHTML =
        "<h2 style='text-align:center;'>Nenhum resultado encontrado...</h2>";
      return;
    }

    lista.forEach((r) => {
      const card = document.createElement("div");
      card.classList.add("card");
      card.dataset.id = r.id;

      const isFav = favoritos.includes(r.id);

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

  /* ================= FILTRO ================= */
  linksCategoria.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const categoria = link.dataset.categoria;

      listaAtual = receitasFavoritas.filter(
        (r) => r.categoria.toLowerCase() === categoria.toLowerCase(),
      );

      renderizar(listaAtual);
    });
  });

  /* ================= BUSCA ================= */
  searchInput.addEventListener("input", () => {
    const termo = searchInput.value.toLowerCase();

    const resultado = listaAtual.filter((r) =>
      r.titulo.toLowerCase().includes(termo),
    );

    renderizar(resultado);
  });

  /* ================= FAVORITOS ================= */
  container.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-fav");
    if (!btn) return;

    const id = btn.closest(".card").dataset.id;

    favoritos = favoritos.filter((f) => f !== id);
    localStorage.setItem("favoritos", JSON.stringify(favoritos));

    location.reload();
  });
});
