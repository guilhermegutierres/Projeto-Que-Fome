document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".cards");
  const searchInput = document.getElementById("searchInput");
  const linksCategoria = document.querySelectorAll("[data-categoria]");

  /* ================= VERIFICAÇÃO DE SESSÃO ================= */
  const usuarioString = localStorage.getItem("usuarioLogado");
  
  if (!usuarioString) {
    container.classList.add("empty");
    container.innerHTML = `
      <div class="empty-state">
        <h2>Faça login para ver seus favoritos ❤️</h2>
        <p>Apenas usuários logados possuem uma lista de favoritos.</p>
        <button onclick="window.location.href='login.html'" style="padding: 10px 20px; cursor: pointer; margin-top: 10px;">Entrar</button>
      </div>
    `;
    return;
  }

  const usuario = JSON.parse(usuarioString);
  let receitasFavoritas = [];
  let listaAtual = [];

  /* ================= CARREGA RECEITAS DO BANCO ================= */
  try {
    // Faz a requisição enviando o ID do usuário para a nova rota do backend
    const response = await fetch(`http://localhost:3000/api/favoritos/usuario/${usuario.id_usuario}`);
    
    if (!response.ok) throw new Error("Erro ao buscar favoritos do servidor.");
    
    receitasFavoritas = await response.json();
    listaAtual = receitasFavoritas;
    
    renderizar(listaAtual);
  } catch (error) {
    console.error("Erro ao carregar favoritos:", error);
    container.innerHTML = "<div class='empty-state'><h2>Erro ao carregar favoritos. Verifique a conexão com o servidor.</h2></div>";
  }

  /* ================= RENDERIZAÇÃO ================= */
  function renderizar(lista) {
    container.innerHTML = "";

    if (lista.length === 0) {
      container.classList.add("empty");
      container.innerHTML = `
        <div class="empty-state">
          <h2>Nenhum favorito ainda 😢</h2>
          <p>Adicione receitas aos favoritos para vê-las aqui.</p>
        </div>
      `;
      return;
    }

    container.classList.remove("empty");

    lista.forEach((r) => {
      const card = document.createElement("div");
      card.classList.add("card");
      
      const idReceita = r.id_receita;
      card.dataset.id = idReceita;

      const imagemSrc = r.imagem || 'assets/imagens/placeholder.jpg';

      card.innerHTML = `
        <img src="${imagemSrc}" alt="Imagem da receita">
        <div>
          <h2>${r.titulo}</h2>
          <p>${r.descricao || "Sem descrição"}</p>

          <div class="card-actions">
            <button class="btn btn-preparo">Modo de preparo</button>

            <button class="btn btn-fav active">
              Desfavoritar
              <span class="heart">
                <i class="ri-heart-line" style="color: #fff;"></i>
              </span>
            </button>
          </div>
        </div>
      `;

      card.querySelector(".btn-preparo").addEventListener("click", () => {
        window.location.href = `receita.html?id=${idReceita}`;
      });

      container.appendChild(card);
    });
  }

  /* ================= FILTROS ================= */
  linksCategoria.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const categoria = link.dataset.categoria;

      listaAtual = receitasFavoritas.filter(
        (r) => r.categoria && r.categoria.toLowerCase() === categoria.toLowerCase()
      );

      renderizar(listaAtual);
    });
  });

  /* ================= BUSCA ================= */
  searchInput.addEventListener("input", () => {
    const termo = searchInput.value.toLowerCase();
    const resultado = listaAtual.filter((r) =>
      r.titulo.toLowerCase().includes(termo)
    );
    renderizar(resultado);
  });

  /* ================= REMOVER FAVORITO ================= */
  container.addEventListener("click", async (e) => {
    const btn = e.target.closest(".btn-fav");
    if (!btn) return;

    const card = btn.closest(".card");
    const idReceita = card.dataset.id;

    // 1. Dispara o DELETE na API usando a função que construímos no armazenamento.js
    await armazenamentoAPI.toggleFavorito(idReceita);

    // 2. Remove a receita da memória do frontend
    receitasFavoritas = receitasFavoritas.filter((r) => r.id_receita != idReceita);
    listaAtual = listaAtual.filter((r) => r.id_receita != idReceita);

    // 3. Atualiza a tela instantaneamente
    renderizar(listaAtual);
  });
});