import { connection } from "../configs/Database.js";

const clienteRepository = {

    criar: async (cliente, telefone, endereco) => {
        const conn = await connection.getConnection();

        try {
            await conn.beginTransaction();
            const sqlCliente = 'INSERT INTO clientes (Nome, Cpf) VALUES (?,?)';
            const [resultCliente] = await conn.execute(sqlCliente, [cliente.Nome, cliente.Cpf]);
            const idCliente = resultCliente.insertId;

            const sqlTelefone = 'INSERT INTO telefones (IdCliente, Telefone) VALUES (?,?)';

            await conn.execute(sqlTelefone, [idCliente, telefone]);
            const sqlEndereco = `INSERT INTO enderecos (IdCliente, Logradouro, Numero, Complemento, Bairro, Cidade, UF, CEP) VALUES (?,?,?,?,?,?,?,?)`;

            await conn.execute(sqlEndereco, [idCliente, endereco.logradouro, endereco.numero, endereco.complemento, endereco.bairro, endereco.cidade, endereco.uf, endereco.cep]);
            await conn.commit();
            return { idCliente };

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    editar: async (cliente, telefone, endereco) => {
        const conn = await connection.getConnection();

        try {
            await conn.beginTransaction();
            const sqlCliente = 'UPDATE clientes SET Nome=?, Cpf=? WHERE IdCliente=?';
            await conn.execute(sqlCliente, [cliente.Nome, cliente.Cpf, cliente.IdCliente]);
            if (telefone) {
                const sqlTel = 'UPDATE telefones SET Telefone=? WHERE IdCliente=?';
                await conn.execute(sqlTel, [telefone, cliente.IdCliente]);
            }
            if (endereco) {
                const sqlEnd = `UPDATE enderecos SET Logradouro=?, Numero=?, Complemento=?, Bairro=?, Cidade=?, UF=?, CEP=? WHERE IdCliente=?
                `;
                await conn.execute(sqlEnd, [endereco.logradouro, endereco.numero, endereco.complemento, endereco.bairro, endereco.cidade, endereco.uf, endereco.cep, cliente.IdCliente]);
            }

            await conn.commit();
            return { message: 'Cliente atualizado com sucesso' };

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },

    deletar: async (id) => {
        const conn = await connection.getConnection();

        try {
            await conn.beginTransaction();

            await conn.execute('DELETE FROM telefones WHERE IdCliente=?', [id]);
            await conn.execute('DELETE FROM enderecos WHERE IdCliente=?', [id]);
            await conn.execute('DELETE FROM clientes WHERE IdCliente=?', [id]);

            await conn.commit();

            return { message: 'Cliente deletado com sucesso' };

        } catch (error) {
            await conn.rollback();
            throw error;
        } finally {
            conn.release();
        }
    },


    selecionar: async () => {
        const [rows] = await connection.execute(`SELECT * FROM clientes c 
            INNER JOIN telefones t ON c.IdCliente = t.IdCliente
            INNER JOIN enderecos e ON c.IdCliente = e.IdCliente
        `);
        return rows;
    }

    

}
export default clienteRepository;