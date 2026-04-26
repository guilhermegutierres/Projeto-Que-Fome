document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".cards");
  const searchInput = document.getElementById("searchInput");
  const linksCategoria = document.querySelectorAll("[data-categoria]");
  const fab = document.getElementById("fab-add");

  let receitas = [];
  let receitasFiltradas = [];

  try {
    // A fonte de dados agora é exclusivamente a sua API conectada ao MySQL
    receitas = await armazenamentoAPI.getAll();
    receitasFiltradas = receitas;
    
    await renderizar(receitasFiltradas);
  } catch (error) {
    console.error("Erro ao carregar receitas do banco:", error);
  }

  /* ================= FAB (Botão Flutuante) ================= */
  if (fab) {
    fab.addEventListener("click", () => {
      const usuario = localStorage.getItem("usuarioLogado");

      if (usuario) {
        window.location.href = "adicionar-receita.html";
      } else {
        alert("Você precisa estar logado para adicionar receitas!");
        window.location.href = "login.html";
      }
    });
  }

  /* ================= RENDERIZAÇÃO ================= */
  // Transformado em assíncrono para permitir a requisição do status de favorito
  async function renderizar(lista) {
    container.innerHTML = "";

    // Uso do for...of no lugar do forEach para respeitar o fluxo do await
    for (const r of lista) {
      const card = document.createElement("div");
      card.classList.add("card");
      
      // Mapeamento corrigido para a Primary Key do banco de dados
      const idReceita = r.id_receita;
      card.dataset.id = idReceita;

      // Requisição HTTP para saber se o usuário curtiu a receita
      const isFav = await armazenamentoAPI.isFavorito(idReceita);

      // Tratamento para evitar quebra de layout caso a imagem seja nula no BD
      const imagemSrc = r.imagem || 'assets/imagens/placeholder.jpg'; 

      card.innerHTML = `
        <img src="${imagemSrc}" alt="Imagem da receita">
        <div>
          <h2>${r.titulo}</h2>
          <p>${r.descricao || "Sem descrição."}</p>

          <div class="card-actions">
            <button class="btn btn-preparo">Modo de preparo</button>

            <button class="btn btn-fav ${isFav ? "active" : ""}">
              ${isFav ? "Desfavoritar" : "Favoritar"}
              <span class="heart">
                <i class="ri-heart-line" style="${isFav ? 'color: #fff;' : ''}"></i>
              </span>
            </button>
          </div>
        </div>
      `;

      card.querySelector(".btn-preparo").addEventListener("click", () => {
        window.location.href = `receita.html?id=${idReceita}`;
      });

      container.appendChild(card);
    }
  }

  /* ================= FILTROS ================= */
  linksCategoria.forEach((link) => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();
      const categoria = link.dataset.categoria;

      receitasFiltradas = receitas.filter(
        (r) => r.categoria && r.categoria.toLowerCase() === categoria.toLowerCase()
      );

      await renderizar(receitasFiltradas);
    });
  });

  searchInput.addEventListener("input", async () => {
    const termo = searchInput.value.toLowerCase();
    const resultado = receitasFiltradas.filter((r) =>
      r.titulo.toLowerCase().includes(termo)
    );
    await renderizar(resultado);
  });

  /* ================= FAVORITAR ================= */
  container.addEventListener("click", async (e) => {
    const btn = e.target.closest(".btn-fav");
    if (!btn) return;

    const usuario = localStorage.getItem("usuarioLogado");

    if (!usuario) {
      alert("Faça login para favoritar receitas ❤️");
      window.location.href = "login.html";
      return;
    }

    const card = btn.closest(".card");
    const idReceita = card.dataset.id;

    // Ação assíncrona que dispara o INSERT/DELETE no backend
    const isFav = await armazenamentoAPI.toggleFavorito(idReceita);

    btn.classList.toggle("active", isFav);
    const icon = btn.querySelector(".heart i");

    if (isFav) {
      btn.childNodes[0].nodeValue = "Desfavoritar ";
      icon.style.color = "#fff";
    } else {
      btn.childNodes[0].nodeValue = "Favoritar ";
      icon.style.color = "#ff6b6b"; // Cor primária do coração desmarcado
    }
  });
});