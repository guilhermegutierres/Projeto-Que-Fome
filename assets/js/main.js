document.addEventListener("DOMContentLoaded", async () => {

  const container = document.querySelector(".cards");

  /* ================= CARREGAR JSON ================= */
  const response = await fetch("assets/data/receitas.json");
  const receitas = await response.json();

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
            ${isFav ? "Desfavoritar" : "Favoritar"}
            <span class="heart">${isFav ? "❤" : "♡"}</span>
          </button>
        </div>
      </div>
    `;

    container.appendChild(card);
  });

  /* ================= FAVORITOS ================= */
  container.addEventListener("click", (e) => {
    const btn = e.target.closest(".btn-fav");
    if (!btn) return;

    const card = btn.closest(".card");
    const id = card.dataset.id;

    const isFav = armazenamentoAPI.toggleFavorito(id);

    btn.classList.toggle("active", isFav);

    const heart = btn.querySelector(".heart");

    if (isFav) {
      btn.childNodes[0].nodeValue = "Desfavoritar ";
      heart.textContent = "❤";
    } else {
      btn.childNodes[0].nodeValue = "Favoritar ";
      heart.textContent = "♡";
    }
  });

  /* ================= DARK MODE ================= */
  const toggle = document.querySelector(".dark-toggle");
  const icon = toggle.querySelector("i");

  toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-theme");

    if (document.body.classList.contains("dark-theme")) {
      icon.classList.replace("ri-moon-line", "ri-sun-line");
    } else {
      icon.classList.replace("ri-sun-line", "ri-moon-line");
    }
  });

});