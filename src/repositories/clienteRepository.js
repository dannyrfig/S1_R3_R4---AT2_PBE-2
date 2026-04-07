import { connection } from "../configs/Database.js";

const clienteRepository = {
    criar: async (cliente) => {
        try {
            await connection.beginTransaction();
            
            const sqlCliente = 'INSERT INTO clientes (nome, cpf) VALUES (?,?)';
            const valuesCliente = [cliente.nome, cliente.cpf];
            const [rowClientes] = await connection.execute(sqlCliente, valuesCliente);

            const sqlEndereco = 'INSERT INTO enderecos (idCliente, logradouro, complemento, bairro, cidade, uf, cep) VALUES (?,?,?,?,?,?,?)';
            const valuesEndereco = [endereco.logradouro,  ]
            connection.commit();
            return {rowClientes, rowEnderecos, rowTelefones
            }
        } catch (error) {
            connection.rollback()
            throw error
        }
    },

}

export default clienteRepository;