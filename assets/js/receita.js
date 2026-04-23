function getIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function carregarReceita() {
  const id = getIdFromURL();

  const response = await fetch("assets/data/receitas.json");
  const receitas = await response.json();

  const receita = receitas.find((r) => r.id === id);

  if (!receita) {
    document.getElementById("receita-container").innerHTML =
      "<h1>Receita não encontrada</h1>";
    return;
  }

  renderizar(receita);
}

function renderizar(r) {
  const container = document.getElementById("receita-container");

  container.innerHTML = `
    <h1>${r.titulo}</h1>

    <div class="video">
      <iframe src="${r.video}" allowfullscreen></iframe>
    </div>

    <div class="info">
      <p><strong>⏱ Tempo:</strong> ${r.tempo}</p>
      <p><strong>🔥 Dificuldade:</strong> ${r.dificuldade}</p>
      <p><strong>💰 Custo:</strong> ${r.custo}</p>
    </div>

    <p class="descricao">${r.descricaoCompleta || r.descricao}</p>

    <div class="ingredientes-container">
      ${Object.entries(r.ingredientes)
        .map(
          ([titulo, lista]) => `
        <div class="coluna">
          <h3>${titulo}</h3>
          <ul>
            ${lista.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </div>
      `,
        )
        .join("")}
    </div>

    <h2>Modo de Preparo</h2>

    ${Object.entries(r.modo_preparo)
      .map(
        ([titulo, passos]) => `
      <h3>${titulo}</h3>
      <ol>
        ${passos.map((p) => `<li class="passo">${p}</li>`).join("")}
      </ol>
    `,
      )
      .join("")}
  `;
}

carregarReceita();
