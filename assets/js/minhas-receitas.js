document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector(".cards");

  /* ================= VERIFICAÇÃO DE SESSÃO ================= */
  const usuarioString = localStorage.getItem("usuarioLogado");
  
  if (!usuarioString) {
    alert("Você precisa estar logado para ver suas receitas.");
    window.location.href = "login.html";
    return;
  }

  const usuario = JSON.parse(usuarioString);

  /* ================= BUSCAR RECEITAS DO USUÁRIO ================= */
  try {
    // Faz a requisição para a rota que busca por autor
    const response = await fetch(`http://localhost:3000/api/receitas/autor/${usuario.id_usuario}`);
    
    if (!response.ok) throw new Error("Erro ao buscar receitas do servidor.");
    
    const minhasReceitas = await response.json();
    renderizar(minhasReceitas);

  } catch (error) {
    console.error("Erro ao carregar suas receitas:", error);
    container.innerHTML = "<div class='empty-state'><h2>Erro ao carregar receitas.</h2></div>";
  }

  /* ================= RENDERIZAÇÃO ================= */
  function renderizar(lista) {
    container.innerHTML = "";

    if (lista.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1; width: 100%; padding: 60px 20px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
          
          <h2 style="color: #333; margin-bottom: 25px; font-size: 1.8rem; text-align: center; line-height: 1.4;">
            Você ainda não publicou<br>nenhuma receita 🍳
          </h2>
          
          <button onclick="window.location.href='adicionar-receita.html'" 
                  onmouseover="this.style.backgroundColor='#218838'" 
                  onmouseout="this.style.backgroundColor='#28a745'"
                  style="background-color: #28a745; color: white; border: none; padding: 12px 28px; font-size: 1.1rem; font-weight: bold; cursor: pointer; border-radius: 8px; transition: 0.3s; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
            Criar minha primeira receita
          </button>
        </div>
      `;
      return;
    }

    lista.forEach((r) => {
      const card = document.createElement("div");
      card.classList.add("card");
      const idReceita = r.id_receita;
      
      const imagemSrc = r.imagem || 'assets/imagens/placeholder.jpg';

      card.innerHTML = `
        <img src="${imagemSrc}" alt="Imagem da receita">
        <div>
          <h2>${r.titulo}</h2>
          <p>${r.descricao || "Sem descrição"}</p>

          <div class="card-actions" style="margin-top: 15px; display: flex; gap: 10px;">
            <button class="btn btn-editar" style="background-color: #ffc107; color: #000; border: none; font-weight: bold; cursor: pointer; flex: 1;">Editar</button>
            <button class="btn btn-excluir" data-id="${idReceita}" style="background-color: #dc3545; color: #fff; border: none; font-weight: bold; cursor: pointer; flex: 1;">Excluir</button>
          </div>
        </div>
      `;

      /* ================= AÇÃO DE EDITAR ================= */
      card.querySelector(".btn-editar").addEventListener("click", () => {
        // Envia o usuário para a página de edição passando o ID na URL
        window.location.href = `editar-receita.html?id=${idReceita}`;
      });

      /* ================= AÇÃO DE EXCLUIR ================= */
      card.querySelector(".btn-excluir").addEventListener("click", async (e) => {
        // Pedido de confirmação antes de apagar
        const confirmacao = confirm("Tem certeza absoluta que deseja excluir esta receita? Esta ação apagará ela do banco de dados definitivamente.");
        
        if (confirmacao) {
          try {
            const deleteResponse = await fetch(`http://localhost:3000/api/receitas/${idReceita}`, { 
                method: 'DELETE' 
            });
            
            if (deleteResponse.ok) {
              alert("Receita excluída com sucesso!");
              window.location.reload(); // Recarrega a página para atualizar a lista limpa
            } else {
              alert("Erro ao excluir receita. Tente novamente.");
            }
          } catch (error) {
            console.error("Erro na requisição de exclusão:", error);
            alert("Erro ao comunicar com o servidor.");
          }
        }
      });

      container.appendChild(card);
    });
  }
});