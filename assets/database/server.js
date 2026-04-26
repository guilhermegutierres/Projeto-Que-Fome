// server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const db = require('./database');

const app = express();

app.use(cors()); // Permite requisições do frontend
// Aumentando o limite para aceitar imagens em Base64
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Endpoint para buscar todas as receitas (Página Principal)
app.get('/api/receitas', async (req, res) => {
    try {
        // A correção está aqui: Adicionamos a coluna 'imagem' no SELECT
        const [rows] = await db.query('SELECT id_receita, titulo, descricao, imagem FROM receita');
        
        res.status(200).json(rows);
    } catch (error) {
        console.error("Erro ao buscar receitas:", error.message);
        res.status(500).json({ erro: "Erro interno no servidor ao acessar o banco de dados." });
    }
});

const PORT = process.env.PORT || 3000;

// Endpoint para verificar se uma receita é favorita
app.get('/api/favoritos/check/:id_usuario/:id_receita', async (req, res) => {
    try {
        const { id_usuario, id_receita } = req.params;
        
        // Procura na tabela se existe uma linha ligando este usuário a esta receita
        const [rows] = await db.query(
            'SELECT * FROM favorito WHERE id_usuario = ? AND id_receita = ?',
            [id_usuario, id_receita]
        );
        
        // Se a quantidade de linhas for maior que 0, significa que é favorito (true)
        res.status(200).json({ isFavorito: rows.length > 0 });
    } catch (error) {
        console.error("Erro na verificação de favorito:", error.message);
        res.status(500).json({ erro: "Erro ao verificar favorito no banco." });
    }
});

// Endpoint para alternar (marcar/desmarcar) favorito
app.post('/api/favoritos/toggle', async (req, res) => {
    try {
        const { id_usuario, id_receita } = req.body;

        // 1. Primeiro verificamos se o registro já existe
        const [rows] = await db.query(
            'SELECT * FROM favorito WHERE id_usuario = ? AND id_receita = ?',
            [id_usuario, id_receita]
        );

        if (rows.length > 0) {
            // 2. Se já existe, o usuário está clicando para remover o favorito
            await db.query(
                'DELETE FROM favorito WHERE id_usuario = ? AND id_receita = ?', 
                [id_usuario, id_receita]
            );
            res.status(200).json({ isFavorito: false, mensagem: "Removido dos favoritos" });
        } else {
            // 3. Se não existe, o usuário está clicando para adicionar
            await db.query(
                'INSERT INTO favorito (id_usuario, id_receita, data_marcacao) VALUES (?, ?, CURRENT_DATE)', 
                [id_usuario, id_receita]
            );
            res.status(200).json({ isFavorito: true, mensagem: "Adicionado aos favoritos" });
        }
    } catch (error) {
        console.error("Erro ao alterar favorito:", error.message);
        res.status(500).json({ erro: "Erro ao atualizar a tabela de favoritos." });
    }
});

// Endpoint para buscar UMA receita específica pelo ID
app.get('/api/receitas/:id', async (req, res) => {
    try {
        const { id } = req.params;
        
        // Executa a busca baseada na Primary Key
        const [rows] = await db.query('SELECT * FROM receita WHERE id_receita = ?', [id]);

        if (rows.length === 0) {
            return res.status(404).json({ erro: "Receita não encontrada." });
        }

        // Como o ID é único, retornamos o primeiro (e único) objeto do array
        res.status(200).json(rows[0]);

    } catch (error) {
        console.error("Erro ao buscar a receita detalhada:", error.message);
        res.status(500).json({ erro: "Erro interno ao acessar o banco de dados." });
    }
});

// Endpoint de LOGIN
app.post('/api/login', async (req, res) => {
    const { email, senha } = req.body;

    try {
        const [usuarios] = await db.query(
            'SELECT id_usuario, nome_usuario, email FROM usuario WHERE email = ? AND senha = ?',
            [email, senha]
        );

        if (usuarios.length > 0) {
            res.status(200).json({ 
                mensagem: "Login bem-sucedido", 
                usuario: usuarios[0] 
            });
        } else {
            res.status(401).json({ erro: "E-mail ou senha incorretos." });
        }
    } catch (error) {
        console.error("Erro no login:", error.message);
        res.status(500).json({ erro: "Erro interno no servidor." });
    }
});

// Endpoint de CADASTRO
app.post('/api/cadastro', async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        // Verifica se o email já está em uso
        const [existe] = await db.query('SELECT id_usuario FROM usuario WHERE email = ?', [email]);
        
        if (existe.length > 0) {
            return res.status(400).json({ erro: "Este e-mail já está cadastrado." });
        }

        // Insere o novo usuário
        await db.query(
            'INSERT INTO usuario (nome_usuario, email, senha) VALUES (?, ?, ?)',
            [nome, email, senha]
        );

        res.status(201).json({ mensagem: "Usuário cadastrado com sucesso!" });
    } catch (error) {
        console.error("Erro no cadastro:", error.message);
        res.status(500).json({ erro: "Erro ao realizar cadastro no banco de dados." });
    }
});

// Endpoint para listar os detalhes das receitas que um usuário favoritou
app.get('/api/favoritos/usuario/:id_usuario', async (req, res) => {
    try {
        const { id_usuario } = req.params;

        // O INNER JOIN cruza as duas tabelas: pega todos os dados da Receita (r.*)
        // ONDE o ID da receita for igual na tabela Favorito (f.id_receita)
        // E o ID do usuário na tabela Favorito for o mesmo passado na URL.
        const query = `
            SELECT r.* FROM receita r
            INNER JOIN favorito f ON r.id_receita = f.id_receita
            WHERE f.id_usuario = ?
        `;

        const [receitasFavoritas] = await db.query(query, [id_usuario]);
        
        res.status(200).json(receitasFavoritas);

    } catch (error) {
        console.error("Erro ao buscar a lista de favoritos:", error.message);
        res.status(500).json({ erro: "Erro ao consultar favoritos no banco de dados." });
    }
});

app.post('/api/receitas', async (req, res) => {
    // 1. Agora extraímos imagem e video do pacote
    const { titulo, descricao, modo_preparo, imagem, video, id_usuario_autor } = req.body;

    if (!titulo || !modo_preparo) {
        return res.status(400).json({ erro: "Título e modo de preparo são obrigatórios." });
    }

    try {
        // 2. Atualizamos o INSERT para incluir as novas colunas
        const query = `
            INSERT INTO receita (titulo, descricao, modo_preparo, imagem, video, id_usuario_autor) 
            VALUES (?, ?, ?, ?, ?, ?)
        `;
        
        // 3. Passamos as variáveis na mesma ordem dos pontos de interrogação
        const [resultado] = await db.query(query, [titulo, descricao, modo_preparo, imagem, video, id_usuario_autor]);

        res.status(201).json({ 
            mensagem: "Receita criada com sucesso!", 
            id_nova_receita: resultado.insertId 
        });

    } catch (error) {
        console.error("Erro ao inserir receita no banco:", error.message);
        res.status(500).json({ erro: "Erro interno ao salvar no banco de dados." });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

// GET: Buscar receitas postadas por um usuário
app.get('/api/receitas/autor/:id_usuario', async (req, res) => {
    try {
        const { id_usuario } = req.params;
        const [rows] = await db.query('SELECT * FROM receita WHERE id_usuario_autor = ?', [id_usuario]);
        res.status(200).json(rows);
    } catch (error) {
        res.status(500).json({ erro: "Erro ao buscar receitas do autor." });
    }
});

// DELETE: Excluir uma receita
app.delete('/api/receitas/:id_receita', async (req, res) => {
    try {
        const { id_receita } = req.params;
        await db.query('DELETE FROM receita WHERE id_receita = ?', [id_receita]);
        res.status(200).json({ mensagem: "Receita excluída com sucesso!" });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao excluir a receita." });
    }
});

// PUT: Atualizar receita existente
app.put('/api/receitas/:id_receita', async (req, res) => {
    const { id_receita } = req.params;
    const { titulo, descricao, modo_preparo, imagem, video } = req.body;

    try {
        const query = `
            UPDATE receita 
            SET titulo = ?, descricao = ?, modo_preparo = ?, imagem = ?, video = ?
            WHERE id_receita = ?
        `;
        await db.query(query, [titulo, descricao, modo_preparo, imagem, video, id_receita]);
        res.status(200).json({ mensagem: "Receita atualizada!" });
    } catch (error) {
        res.status(500).json({ erro: "Erro ao atualizar receita." });
    }
});

// Endpoint para ATUALIZAR uma receita (Método PUT)
app.put('/api/receitas/:id_receita', async (req, res) => {
    const { id_receita } = req.params;
    const { titulo, descricao, modo_preparo, imagem, video } = req.body;

    // Proteção de integridade de dados
    if (!titulo || !modo_preparo) {
        return res.status(400).json({ erro: "Título e modo de preparo são obrigatórios." });
    }

    try {
        const query = `
            UPDATE receita 
            SET titulo = ?, descricao = ?, modo_preparo = ?, imagem = ?, video = ?
            WHERE id_receita = ?
        `;
        
        await db.query(query, [titulo, descricao, modo_preparo, imagem, video, id_receita]);
        
        res.status(200).json({ mensagem: "Receita atualizada com sucesso!" });

    } catch (error) {
        console.error("Erro ao executar UPDATE:", error.message);
        res.status(500).json({ erro: "Erro ao atualizar o registro no banco de dados." });
    }
});