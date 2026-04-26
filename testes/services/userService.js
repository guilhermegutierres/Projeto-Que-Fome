// testes/services/userService.js

const pool = require("../../assets/database/database.js"); // ← caminho relativo

async function buscarUsuarioPorId(id) {
  const [rows] = await pool.query("SELECT * FROM usuario WHERE id = ?", [id]);
  return rows[0];
}

async function criarUsuario(nome, email) {
  const [result] = await pool.query(
    "INSERT INTO usuario (nome, email) VALUES (?, ?)",
    [nome, email]
  );
  return result.insertId;
}

module.exports = { buscarUsuarioPorId, criarUsuario };