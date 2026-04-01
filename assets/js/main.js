document.addEventListener("DOMContentLoaded", async () => {

  const container = document.querySelector(".cards");

  /* ================= CARREGAR JSON ================= */
  const response = await fetch("assets/data/receitas.json");
  const receitas = await response.json();

  let favoritos = JSON.parse(localStorage.getItem("favoritos")) || [];

  receitas.forEach(r => {
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

    let favs = JSON.parse(localStorage.getItem("favoritos")) || [];

    const heart = btn.querySelector(".heart");

    if (favs.includes(id)) {
      favs = favs.filter(f => f !== id);
      btn.classList.remove("active");
      btn.innerHTML = `Favoritar <span class="heart">♡</span>`;
    } else {
      favs.push(id);
      btn.classList.add("active");
      btn.innerHTML = `Desfavoritar <span class="heart">❤</span>`;
    }

    localStorage.setItem("favoritos", JSON.stringify(favs));
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