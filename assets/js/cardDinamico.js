document.addEventListener("DOMContentLoaded", () => {
  carregarCards();
});

function carregarCards() {
  const container = document.querySelector(".cards");
  const receitas = armazenamentoAPI.getAll();

  container.innerHTML = "";

  receitas.forEach(r => {
    const card = document.createElement("div");
    card.className = "card";
    card.dataset.id = r.id;

    const isFav = armazenamentoAPI.isFavorito(r.id);

    card.innerHTML = `
      <div class="card-image">
        <img src="${r.imagem}">
      </div>

      <div class="card_info">
        <h1>${r.titulo}</h1>
        <h3>${r.descricao}</h3>

        <div class="btn_card">
          <button class="btn_esquerda">Modo de preparo</button>

          <button class="btn_direita">
            ${isFav ? "Desfavoritar" : "Favoritar"}
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
              fill="${isFav ? "red" : "#ccc"}"
              viewBox="0 0 24 24">
              <path d="M12 21s-6-4.35-9-7.5S-1 4.5 4 3s8 4 8 4 3-5 8-4 7 6.5 1 10.5S12 21 12 21z"/>
            </svg>
          </button>
        </div>
      </div>
    `;

    const btnFav = card.querySelector(".btn_direita");

    btnFav.addEventListener("click", () => {
      const ativo = armazenamentoAPI.toggleFavorito(r.id);

      btnFav.innerHTML = `
        ${ativo ? "Desfavoritar" : "Favoritar"}
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20"
          fill="${ativo ? "red" : "#ccc"}"
          viewBox="0 0 24 24">
          <path d="M12 21s-6-4.35-9-7.5S-1 4.5 4 3s8 4 8 4 3-5 8-4 7 6.5 1 10.5S12 21 12 21z"/>
        </svg>
      `;
    });

    container.appendChild(card);
  });
}