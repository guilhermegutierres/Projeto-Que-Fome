function getIdFromURL() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function carregarReceita() {
  const id = getIdFromURL();

  if (!id) {
    document.getElementById("receita-container").innerHTML = "<h1>ID da receita não fornecido</h1>";
    return;
  }

  try {
    // Comunicação direta com o backend solicitando apenas o ID necessário
    const response = await fetch(`http://localhost:3000/api/receitas/${id}`);

    if (!response.ok) {
      throw new Error('Receita não encontrada no banco de dados');
    }

    const receita = await response.json();
    renderizar(receita);

  } catch (error) {
    console.error("Erro na comunicação com a API:", error);
    document.getElementById("receita-container").innerHTML = "<h1>Receita não encontrada</h1>";
  }
}

function renderizar(r) {
  const container = document.getElementById("receita-container");
  const passosArray = r.modo_preparo ? r.modo_preparo.split('\n') : [];

  // Proteção: Se houver link de vídeo, desenha o iframe. Se não houver, deixa vazio.
  const htmlVideo = r.video 
    ? `<div class="video" style="margin-top: 20px;"><iframe src="${r.video}" width="100%" height="315" frameborder="0" allowfullscreen></iframe></div>` 
    : '';

  const htmlImagem = r.imagem 
    ? `<img src="${r.imagem}" alt="Foto de ${r.titulo}" style="width: 100%; max-height: 400px; object-fit: cover; border-radius: 8px;">`
    : '';

  container.innerHTML = `
    ${htmlImagem}
    <h1 style="margin-top: 15px;">${r.titulo}</h1>
    ${htmlVideo}
    
    <p class="descricao" style="margin-top: 15px;">${r.descricao || "Sem descrição disponível."}</p>

    <h2>Modo de Preparo</h2>
    <ol>
      ${passosArray.map((passo) => `<li class="passo">${passo.trim()}</li>`).join("")}
    </ol>
  `;
}

// Garante que o script só rode após o HTML estar carregado
document.addEventListener("DOMContentLoaded", carregarReceita);