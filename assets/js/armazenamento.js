// armazenamento.js adaptado para consumir a API
const armazenamentoAPI = (() => {
  const BASE_URL = 'http://localhost:3000/api';
  const ID_USUARIO_ATUAL = 1; // Fixo como 1 até você ter um sistema de login real

  // Busca todas as receitas do MySQL
  async function getAll() {
    try {
      const response = await fetch(`${BASE_URL}/receitas`);
      if (!response.ok) throw new Error('Erro ao buscar receitas do servidor');
      return await response.json();
    } catch (error) {
      console.error("Erro no getAll:", error);
      return []; 
    }
  }

  // Consulta se o usuário atual curtiu uma receita específica
  async function isFavorito(id_receita) {
    try {
      const response = await fetch(`${BASE_URL}/favoritos/check/${ID_USUARIO_ATUAL}/${id_receita}`);
      if (!response.ok) return false;
      const data = await response.json();
      return data.isFavorito;
    } catch (error) {
      console.error("Erro ao verificar favorito:", error);
      return false;
    }
  }

  // Envia comando para favoritar (ou desfavoritar se já tiver favoritado)
  async function toggleFavorito(id_receita) {
    try {
      const response = await fetch(`${BASE_URL}/favoritos/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            id_usuario: ID_USUARIO_ATUAL, 
            id_receita: id_receita 
        })
      });
      const data = await response.json();
      return data.isFavorito; // O servidor responde se a receita ficou favoritada (true) ou não (false)
    } catch (error) {
      console.error("Erro ao alterar favorito:", error);
      return false;
    }
  }

  // Deixa essas funções disponíveis para as outras telas do seu HTML usarem
  return {
    getAll,
    toggleFavorito,
    isFavorito,
  };
})();