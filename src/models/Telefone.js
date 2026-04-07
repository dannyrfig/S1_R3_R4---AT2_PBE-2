export class Telefone {
    #idTelefone;
    #idCliente;
    #telefone;

    constructor(pIdCliente, pTelefone, pIdTelefone) {
        this.idCliente = pIdCliente;
        this.telefone = pTelefone;
        this.idTelefone = pIdTelefone;
    }

    // Métodos Acessores - GETTERS e SETTERS
    get IdTelefone() {
        return this.#idTelefone;
    }

    set idTelefone(value) {
        this.#validarId(value);
        this.#idTelefone = value;
    }

    get IdCliente() {
        return this.#idCliente;
    }

    set idCliente(value) {
        this.#validarIdCliente(value);
        this.#idCliente = value;
    }

    get Telefone() {
        return this.#telefone;
    }

    set telefone(value) {
        this.#validarTelefone(value);
        this.#telefone = value;
    }

    // VALIDAÇÕES
    #validarId(value) {
        if (value && value <= 0) {
            throw new Error('Verifique o IdTelefone informado');
        }
    }

    #validarIdCliente(value) {
        if (!value || value <= 0) {
            throw new Error('IdCliente inválido');
        }
    }

    #validarTelefone(value) {
        if (!value || value.trim().length !== 11) {
            throw new Error('O telefone deve conter exatamente 11 caracteres');
        }
    }

    // FACTORY METHODS
    static criar(dados) {
        return new Telefone(
            dados.IdCliente,
            dados.Telefone,
            null
        );
    }

    static alterar(dados, id) {
        return new Telefone(
            dados.IdCliente,
            dados.Telefone,
            id
        );
    }
}