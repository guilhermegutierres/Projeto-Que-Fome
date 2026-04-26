describe('Jornada Completa do Usuário (Cadastro -> Login -> Home)', () => {

  it('Deve criar uma conta, ser redirecionado para o login, logar e ir para a Home', () => {
    // 1. Gera um usuário único para a jornada
    const emailDaJornada = `teste.jornada${Date.now()}@gmail.com`;
    const senhaDaJornada = 'senhaForte123';

    // 2. Acessa a página de CADASTRO
    cy.visit('http://127.0.0.1:5500/cadastro.html');

    // 3. Preenche o formulário de Cadastro
    cy.get('input[type="text"]').type('Usuário da Jornada'); 
    cy.get('input[type="email"]').type(emailDaJornada);
    cy.get('#senha').type(senhaDaJornada);
    cy.get('#confirmarSenha').type(senhaDaJornada); // Ajuste o ID conforme o seu HTML
    
    // Clica para cadastrar
    cy.get('button[type="submit"]').click();

    // 4. O Cypress aguarda o alerta de sucesso e clica em OK sozinho
    cy.on('window:alert', (texto) => {
      expect(texto).to.contains('sucesso');
    });

    // ================================================================
    // MUDANÇA DE PÁGINA: O Cypress espera o seu site ir para o Login!
    // ================================================================
    cy.url().should('include', 'login.html');

    // 5. Agora o robô já está na página de LOGIN. Vamos preencher!
    cy.get('input[type="email"]').type(emailDaJornada);
    cy.get('input[type="password"]').type(senhaDaJornada);
    
    // Clica para entrar
    cy.get('button[type="submit"]').click();

    // ================================================================
    // MUDANÇA DE PÁGINA: O Cypress espera o site ir para a Home (index)
    // ================================================================
    cy.url().should('include', 'index.html');

    // 6. Validação final: Verifica se o sistema salvou a sessão
    cy.window().its('localStorage.usuarioLogado').should('exist');
  });

});