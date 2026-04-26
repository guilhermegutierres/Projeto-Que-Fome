describe('Jornada de Gestão de Receitas', () => {

  const tituloReceita = `Bolo de Teste ${Date.now()}`;

  beforeEach(() => {
    // 1. Visitamos a Home para entrar no domínio
    cy.visit('http://127.0.0.1:5500/index.html');

    // 2. Injetamos o usuário simulado para não precisar logar
    cy.window().then((win) => {
      const usuarioSimulado = { id_usuario: 1, nome_usuario: 'Testador' };
      win.localStorage.setItem('usuarioLogado', JSON.stringify(usuarioSimulado));
    });

    cy.reload();
  });

  it('Deve criar uma receita simples e excluí-la em seguida', () => {
    
    // --- PASSO 1: Ir direto para a página de criação ---
    cy.visit('http://127.0.0.1:5500/adicionar-receita.html');

    // --- PASSO 2: Preencher e Salvar ---
    cy.get('#titulo').type(tituloReceita);
    
    // Preenche o campo de ingredientes manual
    cy.get('textarea').first().type('Arroz, alho e sal a gosto.');
    
    // Preenche o primeiro passo do modo de preparo
    cy.get('.passo-input').first().type('Passo único de teste');

    // 👇 A MUDANÇA ESTÁ AQUI 👇
    // Confirma a adição do passo na lista para o frontend permitir o salvamento
    cy.contains('+ Adicionar passo').click();

    // Intercepta o alerta de sucesso do navegador para o teste não quebrar
    cy.on('window:alert', (texto) => {
      expect(texto).to.contains('sucesso');
    });

    // -------------------------------------------------------------------
    // A MÁGICA AQUI: Avisamos o Cypress para monitorar o seu backend
    // -------------------------------------------------------------------
    cy.intercept('POST', '**/api/receitas').as('salvarReceita');

    // Clica no botão verde da sua tela
    cy.contains('Salvar Receita').click();

    // Congela o robô até o Node.js e o MySQL confirmarem que deu certo!
    cy.wait('@salvarReceita');
    // -------------------------------------------------------------------

    // --- PASSO 3: Verificar na página Minhas Receitas ---
    cy.visit('http://127.0.0.1:5500/minhas-receitas.html'); 
    
    // Verifica se a receita que acabamos de criar apareceu na tela
    cy.contains(tituloReceita).should('be.visible');

    // --- PASSO 4: Excluir a receita ---
    // Encontra o card da receita específica e clica no botão com o texto "Excluir"
    cy.contains(tituloReceita)
      .parents('.recipe-card') // Verifique se essa é a classe principal do seu card
      .contains('Excluir')     // Procura a palavra exata que vimos na imagem
      .click();

    // O Cypress aceita popups de confirmação (se houver) automaticamente
    cy.on('window:confirm', () => true);

    // Validação Final: A receita desapareceu da tela
    cy.contains(tituloReceita).should('not.exist');
  });

});