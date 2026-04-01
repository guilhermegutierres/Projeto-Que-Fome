# Que fome! - Sistema de Publicação Gastronômica

## Universidade Católica de Brasília Pró-Reitoria Acadêmica Curso de Engenharia de Software
## Revisão de Documento de visão

| Data | Versão | Descrição | Autor |
| :--- | :--- | :--- | :--- |
| 13/03/2026 | 1.1 | Criação de Documento | Gustav Victor Silva Ribeiro |
| 18/03/2026 | 1.2 | Atualização de Arquitetura e Banco de dados | Gustav Victor Silva Ribeiro |
| 26/03/2026 | 1.3 | - Atualização de Arquitetura e Banco de dados<br>- Inserção de tabelas para Regras e Requisitos<br>- Atualização de Tecnologias para Desenvolvimento | Gustav Victor, João Pedro Gonçalves, João Pedro Natividade |

---

## Documento Visão Blog de Receitas

### 1. Introdução
O documento de visão tem como finalidade registrar os requisitos de alto nível e as principais restrições de projeto de um sistema de software. Seu propósito é apresentar ao cliente uma perspectiva geral do produto que será desenvolvido, facilitando a compreensão sobre a proposta do sistema. Dessa forma, o documento oferece uma visão abrangente do que se pretende construir, sem entrar em detalhes técnicos ou especificações aprofundadas.

### 1.1 Objetivo de Visão
O projeto busca oferecer um ambiente intuitivo no qual os usuários possam publicar suas próprias receitas, consultá-las de maneira organizada e interagir com o conteúdo produzido por outros participantes por meio de avaliações e comentários. Essas interações visam garantir maior credibilidade às receitas disponibilizadas, auxiliando os usuários na escolha de pratos bem avaliados e testados pela comunidade.

### 1.2. Escopo
A visão deste projeto é criar uma plataforma digital colaborativa dedicada à gastronomia, que permita a qualquer pessoa compartilhar, descobrir e avaliar receitas de forma simples, acessível e confiável. O sistema tem como propósito central conectar usuários por meio da troca de experiências culinárias, valorizando o conhecimento coletivo e incentivando a criatividade na cozinha. A plataforma pretende consolidar-se como um repositório dinâmico de receitas, em constante evolução, impulsionado pela participação ativa dos usuários. A longo prazo, a visão do projeto é tornar-se uma referência online para entusiastas da culinária, promovendo colaboração, aprendizado contínuo e o fortalecimento de uma comunidade engajada.

### 1.3. Justificativa
A proposta do projeto surge a partir da identificação dos seguintes problemas raízes:
* Dificuldade em encontrar receitas confiáveis e bem avaliadas em um único ambiente.
* Falta de interação e feedback real em muitas plataformas tradicionais de receitas.
* Conteúdos dispersos, desorganizados ou sem padronização clara.
* Pouco espaço para que usuários compartilhem experiências práticas, dicas e variações das receitas.
* Ausência de um sistema colaborativo que valorize a avaliação da comunidade.

Esses fatores dificultam a tomada de decisão do usuário e reduzem a confiança no conteúdo disponível atualmente na internet.

---

### 2. Descrição de segmentos e públicos-alvo

### 2.1. Usuários Alvos
O usuário alvo do sistema é composto por pessoas interessadas em culinária, independentemente do nível de experiência. Isso inclui:
* Cozinheiros amadores que buscam receitas práticas para o dia a dia.
* Entusiastas da gastronomia que gostam de testar e compartilhar novas receitas.
* Pessoas que desejam aprender a cozinhar ou aprimorar suas habilidades culinárias.
* Usuários que valorizam recomendações e avaliações antes de experimentar uma receita.

Esses usuários possuem familiaridade básica com tecnologia e acesso frequente à internet, utilizando dispositivos como computadores, tablets ou smartphones.

### 2.2. Segmento do mercado alvo
O projeto está inserido no segmento de plataformas digitais de conteúdo colaborativo, com foco no mercado de gastronomia e culinária online, abrangendo comunidades virtuais, redes de compartilhamento de conhecimento e sites e aplicativos voltados a receitas e lifestyle. Esse segmento apresenta crescimento contínuo, impulsionado pelo aumento do consumo de conteúdo digital, pela popularização da culinária como hobby e pela crescente busca por soluções práticas e confiáveis para o preparo de alimentos.

### 2.3. Ambientes alvos dos usuários
Os usuários do sistema estão presentes principalmente em ambientes digitais, como redes sociais voltadas a conteúdo gastronômico, onde consomem vídeos, imagens e dicas culinárias, além de sites e blogs de receitas tradicionais e plataformas de vídeos e tutoriais especializados em culinária. Também participam de fóruns e comunidades online relacionadas à gastronomia, alimentação saudável e lifestyle. Esses usuários, em sua maioria, acessam esse conteúdo a partir de ambientes domésticos, durante o preparo das receitas, utilizando dispositivos conectados à internet. Esse contexto evidencia a necessidade de uma plataforma centralizada, intuitiva e colaborativa, capaz de integrar o consumo de conteúdo, a interação social e o compartilhamento de conhecimento culinário.

---

### 3. Declaração da Visão
A declaração de visão tem como objetivo estabelecer uma compreensão clara e alinhada sobre o propósito, o escopo e os direcionamentos estratégicos do sistema a ser desenvolvido. Este tópico apresenta uma visão geral da solução, descrevendo de forma sintetizada o problema que se pretende resolver, os objetivos do projeto e o valor que a aplicação entrega aos seus usuários e stakeholders. 

Além disso, a declaração de visão atua como um ponto de referência ao longo de todo o ciclo de desenvolvimento, orientando decisões técnicas, funcionais e arquiteturais. Ao definir de maneira objetiva o que o sistema deve ser e qual necessidade ele atende, torna-se possível reduzir ambiguidades, alinhar expectativas entre as partes envolvidas e garantir maior coerência na evolução do projeto. 

Dessa forma, este documento não apenas contextualiza a aplicação dentro de um cenário de uso, mas também estabelece as bases para as demais etapas da documentação, como requisitos, modelagem e implementação, assegurando consistência e direcionamento ao desenvolvimento do sistema.

### 3.1. Tecnologias a serem usadas

#### 3.1.1 TypeScript
O TypeScript é um superset do JavaScript que adiciona tipagem estática opcional ao código, permitindo maior previsibilidade, segurança e organização no desenvolvimento de aplicações. Neste projeto, o TypeScript foi adotado como linguagem principal, contribuindo diretamente para a redução de erros em tempo de desenvolvimento e melhoria na legibilidade do código. A tipagem forte permite definir contratos claros entre diferentes partes da aplicação, especialmente entre controllers, services e camadas de acesso a dados. Além disso, o TypeScript melhora significativamente a experiência de desenvolvimento ao oferecer autocompletar avançado, refatoração segura e melhor integração com IDEs, tornando o processo mais eficiente e confiável.

#### 3.1.2 Backend com NestJS
O NestJS é um framework progressivo para construção de aplicações backend em Node.js, baseado em TypeScript e inspirado nos conceitos de arquitetura do Angular. Ele promove uma estrutura altamente organizada, modular e escalável, sendo especialmente adequado para o desenvolvimento de APIs robustas e sistemas corporativos. No contexto deste projeto, o NestJS foi utilizado como camada central da aplicação, sendo responsável pela gestão de requisições HTTP, organização dos módulos de negócio e orquestração das regras da aplicação. Sua arquitetura baseada em módulos permite a separação clara de responsabilidades, facilitando a manutenção e evolução do sistema. A utilização de controllers, services e providers garante uma divisão consistente entre as camadas de entrada, lógica de negócio e acesso a dados. Além disso, o sistema se beneficia de recursos nativos do framework, como injeção de dependência, pipes de validação, guards de autenticação e interceptors, que contribuem para um código mais limpo, testável e reutilizável. Outro ponto relevante é a compatibilidade nativa do NestJS com ferramentas modernas, como Swagger para documentação automática de APIs e integração com ORMs, o que fortalece a padronização e a produtividade no desenvolvimento.

#### 3.1.3 MYSql
O MySQL é um sistema de gerenciamento de bancos de dados relacionais (RDBMS) baseado na linguagem SQL, que atua como um intermediário eficiente para armazenar, organizar e recuperar dados de forma estruturada. Entre suas principais vantagens, destacam-se a alta performance em operações de leitura, a robustez em termos de segurança e o fato de ser uma solução de código aberto com uma comunidade vasta, o que facilita o suporte e a integração com diversas linguagens de programação. Por outro lado, apresenta desvantagens como limitações em lidar com volumes massivos de dados que exigem escalabilidade horizontal complexa e uma performance que pode oscilar em operações de escrita muito intensas ou consultas extremamente intrincadas quando comparado a outros sistemas proprietários ou bancos de dados NoSQL.

#### 3.1.4 TypeORM
Para intermediar a comunicação entre a aplicação e o banco de dados, foi utilizado um ORM (Object Relational Mapping), responsável por mapear objetos da aplicação para tabelas do banco relacional. O uso do ORM permite abstrair consultas SQL complexas, possibilitando que operações de banco sejam realizadas por meio de código orientado a objetos. Isso reduz a complexidade do desenvolvimento e melhora a legibilidade do código, além de facilitar manutenção e refatorações. 

No projeto, o ORM é responsável por:
* Definir entidades que representam tabelas no banco;
* Gerenciar relações entre entidades;
* Executar operações CRUD de forma segura;
* Controlar migrations e versionamento do banco.

Essa abordagem também contribui para a portabilidade do sistema, permitindo adaptações futuras para outros bancos com menor impacto na lógica da aplicação.

#### 3.1.5 JWT (JSON Web Token)
O JWT (JSON Web Token) foi utilizado como mecanismo de autenticação e autorização da aplicação, garantindo que apenas usuários autenticados possam acessar rotas protegidas. O fluxo de autenticação consiste na validação das credenciais do usuário e na geração de um token assinado digitalmente, que é enviado ao cliente e utilizado nas requisições subsequentes. Esse token contém informações codificadas sobre o usuário e é validado pelo backend a cada requisição. A utilização de JWT permite uma abordagem stateless, onde o servidor não precisa armazenar sessões, aumentando a escalabilidade da aplicação. Além disso, o uso de guards no NestJS garante proteção eficiente das rotas, enquanto boas práticas como expiração de token e uso de segredo seguro aumentam a robustez da segurança.

#### 3.1.6 Arquitetura MVC (Adaptado)
A arquitetura MVC (Model-View-Controller) é um padrão de projeto que organiza a aplicação em três camadas distintas, separando responsabilidades entre dados, interface e controle. O Model é responsável pela lógica de negócio e manipulação dos dados, a View pela apresentação ao usuário, e o Controller atua como intermediário entre essas camadas. Essa estrutura facilita a manutenção, o reaproveitamento de código e o desenvolvimento em equipe, embora possa aumentar a complexidade em sistemas menores. No contexto do NestJS, esse padrão é aplicado de forma adaptada. A camada Model não é centralizada, sendo dividida entre entities, responsáveis pela estrutura dos dados, repositories/ORM, que fazem a comunicação com o banco, e services, que concentram a lógica de negócio. Os controllers mantêm o papel de receber e responder às requisições, enquanto a camada View não é implementada diretamente, já que o NestJS atua como API backend, delegando a apresentação para aplicações externas. Além disso, o framework introduz o conceito de providers, que permite a injeção de dependência e o compartilhamento de funcionalidades entre os componentes. Dessa forma, o NestJS se aproxima do MVC, porém com uma abordagem mais modular e alinhada a arquiteturas modernas, oferecendo maior organização, escalabilidade e desacoplamento.

#### 3.1.7 Modo de Deploy em Vercel
O deploy no Vercel é focado em simplicidade e automação. A plataforma é amplamente utilizada para hospedar aplicações web modernas e oferece integração direta com repositórios Git. Após conectar o projeto ao Vercel, cada push para o repositório dispara automaticamente um processo de build e deploy. O Vercel trabalha com o conceito de deploy contínuo, criando ambientes de produção e pré-visualização de forma automática. Além disso, a infraestrutura é baseada em serverless, o que garante escalabilidade automática, alta disponibilidade e otimização de desempenho sem necessidade de configuração manual de servidores.

#### 3.1.8 Controle de versão com Github
O GitHub é uma plataforma de hospedagem de código-fonte baseada no sistema de controle de versão Git. Ele permite que desenvolvedores acompanhem o histórico de alterações do projeto, trabalhem de forma colaborativa e mantenham diferentes versões do código por meio de branches. O versionamento no GitHub facilita o controle de mudanças, a identificação de erros, a revisão de código e a integração contínua com ferramentas de deploy, como o Vercel. Além disso, recursos como pull requests, issues e actions contribuem para uma gestão organizada e profissional do ciclo de vida do software.

### 3.2. Modelagem, Regras de negócio e Requisitos
A integração entre modelagem de dados, regras de negócio e requisitos funcionais e não funcionais assegura que o software seja bem estruturado, correto do ponto de vista técnico e eficaz do ponto de vista do negócio. Juntos, esses elementos reduzem riscos, custos e retrabalho, além de aumentar a qualidade e o sucesso do sistema desenvolvido.

#### 3.2.1 Tabela de Regras de negócio

| Funcionalidade | Regra de Negócio | Descrição/Restrição |
| :--- | :--- | :--- |
| Criar receitas | Validação de campos obrigatórios | A receita deve conter obrigatoriamente título, lista de ingredientes com quantidade e modo de Preparo. |
| Criar receitas | Propriedade de conteúdo | Cada receita deve estar vinculada a um perfil de usuário criador para permitir edições futuras. |
| Apagar receitas | Restrição de Autoria | Um usuário só pode excluir receitas que ele mesmo tenha publicado no sistema. |
| Calcular calorias | Integração dos Dados | O cálculo deve ser realizado somando o valor energético de cada ingrediente individual, baseado em uma tabela nutricional de referência. |
| Calcular calorias | Atualização automática | Sempre que um ingrediente ou quantidade for alterado na edição da receita, o total de calorias deve ser recalculado. |
| Favoritar receitas | Unicidade de favorito | O sistema deve impedir que um usuário favoreça a mesma receita mais de uma vez (relação única). |
| Favoritar receitas | Persistência de Login | A funcionalidade de favoritar exige que o usuário esteja autenticado para que a lista seja salva em seu perfil. |
| Buscar receitas | Filtro de Abrangência | A busca deve considerar termos presentes no título, categoria ou ingredientes para retornar resultados relevantes. |
| Buscar receitas | Tratamento de Nulos | Caso nenhum termo seja encontrado, o sistema deve exibir uma mensagem amigável e sugerir receitas populares. |

#### 3.2.2 Tabela de Requisitos Funcionais

| ID | Requisito | Descrição |
| :--- | :--- | :--- |
| RF01 | Cadastro de Receitas | O sistema deve permitir que o usuário insira título, ingredientes, quantidades e modo de preparo. |
| RF02 | Exclusão de Conteúdo | O sistema deve permitir que o autor da receita a remova permanentemente do banco de dados. |
| RF03 | Cálculo Nutricional | O sistema deve processar a soma calórica total da receita com base nos ingredientes informados. |
| RF04 | Gerenciamento de Favoritos | O sistema deve permitir salvar e remover receitas de uma lista personalizada do usuário. |
| RF05 | Motor de Busca | O sistema deve oferecer um campo de pesquisa para filtrar receitas por nome ou ingrediente. |

#### 3.2.3 Tabela de Requisitos não funcionais

| ID | Requisito | Categoria | Descrição |
| :--- | :--- | :--- | :--- |
| RNF01 | Integridade de Dados | Segurança | O sistema deve garantir que apenas o criador da receita ou um administrador tenha permissão de exclusão. |
| RNF02 | Tempo de Resposta | Desempenho | O cálculo de calorias e a busca de receitas devem ser processados em menos de 2 segundos. |
| RNF03 | Disponibilidade | Operação | O sistema deve estar operacional e acessível 99,9% do tempo (SLA). |
| RNF04 | Interface Responsiva | Usabilidade | A interface deve ser adaptável para visualização em dispositivos móveis e desktops. |
| RNF05 | Conformidade Legal | Segurança | O armazenamento de dados dos usuários deve seguir as diretrizes da LGPD (Lei Geral de Proteção de Dados). |

### 3.3 Design e Interfaces protótipos

#### 3.3.1 Interface Objetivo
Tela principal do sistema onde são exibidas as receitas disponíveis. Nessa interface, o usuário pode visualizar informações básicas como título, imagem e uma breve descrição de cada receita, servindo como ponto inicial para navegação e interação com o blog. 

![Interface Objetivo](https://private-user-images.githubusercontent.com/134294462/572672038-7a3da728-cb0f-45f1-9b96-47bf9ec4c1b5.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzUwNjYxODcsIm5iZiI6MTc3NTA2NTg4NywicGF0aCI6Ii8xMzQyOTQ0NjIvNTcyNjcyMDM4LTdhM2RhNzI4LWNiMGYtNDVmMS05Yjk2LTQ3YmY5ZWM0YzFiNS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwNDAxJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDQwMVQxNzUxMjdaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1iYmNmMjFiNzgxZGU1ZWE4NDE1NmIxYzgwOWJiYjA0NTBhZjlkMmI5MDJiZWZlOGMxN2EzYzVkYmYxNjliZDU5JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.2HYazFvsoMeL8kbuCTY3mV8UBcxXio4Dyg5NJNtn8Is)

#### 3.3.2 Visualização de Receitas
Permite ao usuário visualizar as receitas disponíveis na plataforma, incluindo título, imagem, ingredientes e modo de preparo.

![Visualização de Receita](https://private-user-images.githubusercontent.com/134294462/572674107-94ae46c2-97ac-4928-952b-27b2b0e998a3.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzUwNjY0NDcsIm5iZiI6MTc3NTA2NjE0NywicGF0aCI6Ii8xMzQyOTQ0NjIvNTcyNjc0MTA3LTk0YWU0NmMyLTk3YWMtNDkyOC05NTJiLTI3YjJiMGU5OThhMy5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwNDAxJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDQwMVQxNzU1NDdaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT1mMzM3ODlkYmY3NmVkZmJiMGMwODYyYWQ5ZjQ3ZDU2MGIwMDAxMTliZWFiNzE5MjIxMjEyYzJiMDg3N2U2MzMzJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.EZAcgfALk80LmRsqkUrtrW4xHZ_QCR1kEDJbjUgW98g)

#### 3.3.3 Marcar receitas favoritas
Funcionalidade que permite alternar entre temas claros e escuros durante o uso da aplicação baseado no código abaixo

```
'use strict';

document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.querySelector('.dark-toggle');   // novo botão
    const icon   = toggle.querySelector('i');                // ícone dentro do botão

    toggle.addEventListener('click', function() {
        if (document.body.classList.contains('light-theme')) {
            document.body.classList.remove('light-theme');
            document.body.classList.add('dark-theme');
            // troca ícone para sol
            icon.classList.replace('ri-moon-line', 'ri-sun-line');
        } else {
            document.body.classList.remove('dark-theme');
            document.body.classList.add('light-theme');
            // troca ícone para lua
            icon.classList.replace('ri-sun-line', 'ri-moon-line');
        }
    });
});

```
![Dark Mode](https://private-user-images.githubusercontent.com/134294462/572679162-29712871-5e8d-424d-b6b0-4b5c0932db42.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzUwNjcyMDgsIm5iZiI6MTc3NTA2NjkwOCwicGF0aCI6Ii8xMzQyOTQ0NjIvNTcyNjc5MTYyLTI5NzEyODcxLTVlOGQtNDI0ZC1iNmIwLTRiNWMwOTMyZGI0Mi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwNDAxJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDQwMVQxODA4MjhaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT04Zjg2NTI0MWI0MzY2YzUwZjVlYTM1YTE3MjgwMzY0YTQ2YjIyNjZhNzY4YjQ2YWE2NzVhZDRlOTExNjA4NmY4JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.JKUWNoA5AWGSlTBfQYjsGQenUVSoQt1SjLBz8kc2nbU)

#### 3.3.3 Marcar receitas favoritas
Funcionalidade que permite ao usuário marcar receitas como favoritas, facilitando o acesso rápido posteriormente.

![Marcação de favorito](https://private-user-images.githubusercontent.com/134294462/572672037-d0360c47-08ce-4b03-b008-d4c4b6d8f779.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzUwNjY0NDcsIm5iZiI6MTc3NTA2NjE0NywicGF0aCI6Ii8xMzQyOTQ0NjIvNTcyNjcyMDM3LWQwMzYwYzQ3LTA4Y2UtNGIwMy1iMDA4LWQ0YzRiNmQ4Zjc3OS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwNDAxJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDQwMVQxNzU1NDdaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT05YWNlZmU1ZjY1ZjZhZjA2MzdkOGY0ODdjYzc3N2U3ZjVhNGM2NGMyOTliNTgzNzc4ZjAyNGNlYzBkYmYwMjdmJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.OMFTwzqOta2JoSr-RFlpG0cNE1qd85hCSugxESSlNIY)

#### 3.3.4 Guia de receitas marcadas como favorita
Seção onde são exibidas todas as receitas que o usuário marcou como favoritas, organizadas para fácil consulta.

![Aba de favoritos](https://private-user-images.githubusercontent.com/134294462/572672039-15d1d1b4-b47e-4810-9b17-b323a1e10d46.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzUwNjY0NDcsIm5iZiI6MTc3NTA2NjE0NywicGF0aCI6Ii8xMzQyOTQ0NjIvNTcyNjcyMDM5LTE1ZDFkMWI0LWI0N2UtNDgxMC05YjE3LWIzMjNhMWUxMGQ0Ni5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwNDAxJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDQwMVQxNzU1NDdaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT05MTc3NGUyNWMyMjNkNWQ3OGVjYjg5YjZlZGZhYTQyMzBkMzRkMGMzMzVhMDYzNDI5OWExMThjOTZjNTMzY2FlJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.y5YJ7NWy8TFWYMpCL44ECbDv9lQNk4FtRCsMyxcu8mc)

#### 3.3.5 Consulta de Receitas
Permite ao usuário buscar receitas específicas por meio de palavras-chave, tornando a navegação mais rápida e eficiente.

![Consultas por caixa de pesquisa](https://private-user-images.githubusercontent.com/134294462/572672041-e12e3586-d282-44d2-a924-94757b76640a.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzUwNjY0NDcsIm5iZiI6MTc3NTA2NjE0NywicGF0aCI6Ii8xMzQyOTQ0NjIvNTcyNjcyMDQxLWUxMmUzNTg2LWQyODItNDRkMi1hOTI0LTk0NzU3Yjc2NjQwYS5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwNDAxJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDQwMVQxNzU1NDdaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT04OWFjN2I4YzY1NDhhNzg0MzA4OTY2MDg3ZGY1YzEzNTEyZjQzYzU1MWYwOGViMDk2ZGI3MjcxM2Q5Y2Y5Zjg1JlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.UioHnAtG2XrH7-qC3lVE9AI-dQGrUq-oHELLcsA3KYY)

#### 3.3.6 Adição de Receitas
Funcionalidade que possibilita ao usuário cadastrar uma nova receita, informando título, ingredientes e modo de preparo.

![Consultas por caixa de pesquisa](https://private-user-images.githubusercontent.com/134294462/572672040-abf7d388-c28c-4bcf-ba96-7b696a965e3b.png?jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3NzUwNjY3OTUsIm5iZiI6MTc3NTA2NjQ5NSwicGF0aCI6Ii8xMzQyOTQ0NjIvNTcyNjcyMDQwLWFiZjdkMzg4LWMyOGMtNGJjZi1iYTk2LTdiNjk2YTk2NWUzYi5wbmc_WC1BbXotQWxnb3JpdGhtPUFXUzQtSE1BQy1TSEEyNTYmWC1BbXotQ3JlZGVudGlhbD1BS0lBVkNPRFlMU0E1M1BRSzRaQSUyRjIwMjYwNDAxJTJGdXMtZWFzdC0xJTJGczMlMkZhd3M0X3JlcXVlc3QmWC1BbXotRGF0ZT0yMDI2MDQwMVQxODAxMzVaJlgtQW16LUV4cGlyZXM9MzAwJlgtQW16LVNpZ25hdHVyZT02M2JkMzUxYWNiMzdjN2I2M2Q4NTliZTEyNWRiMjdkNjJlMTI1ZDhkMDc2YWFmYTZlYjRiYzVmMjc3YjZkYmNhJlgtQW16LVNpZ25lZEhlYWRlcnM9aG9zdCJ9.y5BFdJicrTZnjeF3cfxhq2dpmyfwI3dEJHhW9AILmAo)

 ---

## Autores do Projeto
* Gustav Victor Silva Ribeiro
* Guilherme Gutierres da Silva Guimarães
* João Pedro Gonçalves Oliveira
* João Pedro Natividade Ferreira
* Juan Pablo Ferraz Torres Valladas
* **Orientador:** Alexandre S. D. Santos
