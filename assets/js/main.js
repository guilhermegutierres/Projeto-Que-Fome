document.addEventListener("DOMContentLoaded", () => {

  const container = document.querySelector(".cards");

  const receitas = armazenamentoAPI.getAll();

  receitas.forEach(r => {
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
            Favoritar
            <i class="ri-heart-${isFav ? "fill" : "line"}"></i>
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  /* FAVORITOS */
  container.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-fav");
    if (!btn) return;

    const card = btn.closest(".card");
    const id = card.dataset.id;

    const ativo = armazenamentoAPI.toggleFavorito(id);

    btn.classList.toggle("active", ativo);

    const icon = btn.querySelector("i");
    icon.className = ativo ? "ri-heart-fill" : "ri-heart-line";
  });

  /* DARK MODE */
  const toggle = document.querySelector(".dark-toggle");
  const icon = toggle.querySelector("i");

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");
    icon.classList.toggle("ri-moon-line");
    icon.classList.toggle("ri-sun-line");
  });

});