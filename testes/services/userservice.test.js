const pool = require("../../assets/database/database.js");
const { buscarUsuarioPorId, criarUsuario } = require("./userService.js"); // ← linha 2 corrigida

jest.mock("../../assets/database/database.js", () => ({
  query: jest.fn()
}));

describe("buscarUsuarioPorId", () => {
  test("deve retornar o usuário quando encontrado", async () => {
    pool.query.mockResolvedValue([[{ id: 1, nome: "João", email: "joao@email.com" }]]);

    const usuario = await buscarUsuarioPorId(1);

    expect(usuario).toEqual({ id: 1, nome: "João", email: "joao@email.com" });
    expect(pool.query).toHaveBeenCalledWith(
      "SELECT * FROM usuario WHERE id = ?",
      [1]
    );
  });

  test("deve retornar undefined quando usuário não existir", async () => {
    pool.query.mockResolvedValue([[]]);

    const usuario = await buscarUsuarioPorId(999);

    expect(usuario).toBeUndefined();
  });
});

describe("criarUsuario", () => {
  test("deve retornar o id do novo usuário criado", async () => {
    pool.query.mockResolvedValue([{ insertId: 42 }]);

    const id = await criarUsuario("Maria", "maria@email.com");

    expect(id).toBe(42);
    expect(pool.query).toHaveBeenCalledWith(
      "INSERT INTO usuario (nome, email) VALUES (?, ?)",
      ["Maria", "maria@email.com"]
    );
  });
});