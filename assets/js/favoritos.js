document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".cards");

  /* ================= CARREGAR JSON ================= */
  const response = await fetch("assets/data/receitas.json");
  const receitas = await response.json();

  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  /* ================= FILTRAR FAVORITOS ================= */
  const receitasFavoritas = receitas.filter((r) => favoritos.includes(r.id));

  container.innerHTML = "";

  if (receitasFavoritas.length === 0) {
    container.innerHTML =
      "<h2 style='text-align:center;'>Nenhum favorito ainda...</h2>";
    return;
  }

  receitasFavoritas.forEach((r) => {
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
    const btnModoPreparo = card.querySelector(".btn");

    btnModoPreparo.addEventListener("click", () => {
      window.location.href = `receita.html?id=${r.id}`;
    });

    container.appendChild(card);
  });

  /* ================= FAVORITOS (CLIQUE) ================= */
  container.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-fav");
    if (!btn) return;

    const card = btn.closest(".card");
    const id = card.dataset.id;

    let favs = JSON.parse(localStorage.getItem("favoritos")) || [];

    if (favs.includes(id)) {
      favs = favs.filter((f) => f !== id);
    } else {
      favs.push(id);
    }

    localStorage.setItem("favoritos", JSON.stringify(favs));

    // Re-renderiza a tela
    location.reload();
  });
});
