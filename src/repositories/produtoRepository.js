import { connection } from "../configs/Database.js";

const produtoRepository = {
    criar: async (produto) => {
        const sql = `INSERT INTO produtos (IdCategoria, Nome, Valor, VinculoImagem) VALUES (?,?,?,?) `;
        const values = [ produto.IdCategoria, produto.Nome, produto.Valor,produto.VinculoImagem ];
        const [rows] = await connection.execute(sql, values);
        return rows;
    },

    editar: async (produto) => {
        const sql = `UPDATE produtos SET IdCategoria=?, Nome=?, Valor=? WHERE IdProduto = ?`;
        const values = [produto.IdCategoria,produto.Nome,produto.Valor,produto.IdProduto ];
        const [rows] = await connection.execute(sql, values);
        return rows;
    },

    deletar: async (id) => {
        const sql = 'DELETE FROM produtos WHERE IdProduto = ?;';
        const values = [id];
        const [rows] = await connection.execute(sql, values);
        return rows;
    },

    selecionar: async () => {
        const sql = 'SELECT * FROM produtos';
        const [rows] = await connection.execute(sql);
        return rows;
    }
};

export default produtoRepository;