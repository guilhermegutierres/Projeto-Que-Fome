const armazenamentoAPI = (() => {
  const CHAVE = "receitas";
  const CHAVE_FAV = "favoritos";

  function seed() {
    if (localStorage.getItem(CHAVE)) return;

    const receitas = [
      {
        id: "1",
        titulo: "Torta de Frango",
        descricao: "Receita prática e deliciosa",
        imagem: "assets/imagens/tortadefrango.jpg",
      },
      {
        id: "2",
        titulo: "Carne Assada",
        descricao: "Suculenta e perfeita",
        imagem: "assets/imagens/carneassada.jpg",
      },
      {
        id: "3",
        titulo: "Macarrão",
        descricao: "Clássico rápido e saboroso",
        imagem: "assets/imagens/macarrao.jpg",
      },
      {
        id: "4",
        titulo: "Mousse de Limão",
        descricao: "Leve, cremoso e refrescante",
        imagem: "assets/imagens/moussedelimao.jpg",
      },
      {
        id: "5",
        titulo: "Bolo de Morango",
        descricao: "Doce e perfeito para sobremesas",
        imagem: "assets/imagens/bolodemorango.jpg",
      },
      {
        id: "6",
        titulo: "Pão Francês",
        descricao: "Clássico crocante do café da manhã",
        imagem: "assets/imagens/paofrances.jpg",
      },
    ];

    localStorage.setItem(CHAVE, JSON.stringify(receitas));
  }

  function getAll() {
    seed();
    return JSON.parse(localStorage.getItem(CHAVE)) || [];
  }

  function getFavoritos() {
    return JSON.parse(localStorage.getItem(CHAVE_FAV)) || [];
  }

  function toggleFavorito(id) {
    const favs = getFavoritos();
    const i = favs.indexOf(id);

    if (i >= 0) favs.splice(i, 1);
    else favs.push(id);

    localStorage.setItem(CHAVE_FAV, JSON.stringify(favs));
    return favs.includes(id);
  }

  function isFavorito(id) {
    return getFavoritos().includes(id);
  }

  return {
    getAll,
    toggleFavorito,
    isFavorito,
  };
})();
