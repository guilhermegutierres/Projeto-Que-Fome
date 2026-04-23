document.addEventListener("DOMContentLoaded", async () => {
  /* ================= CARDS ================= */
  const container = document.querySelector(".cards");

  if (container) {
    try {
      const response = await fetch("assets/data/receitas.json");
      const receitas = await response.json();

      receitas.forEach((r) => {
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
    } catch (error) {
      console.error("Erro ao carregar receitas:", error);
    }

    /* FAVORITOS */
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
  }
});
