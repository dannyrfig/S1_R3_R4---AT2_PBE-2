export class Cliente {
    #idCliente;
    #nome;
    #cpf;
    #dataCad;

    constructor(pNome, pCpf, pIdCliente) {
        this.nome = pNome;
        this.cpf = pCpf;
        this.idCliente = pIdCliente;
    }

    get IdCliente() {
        return this.#idCliente;
    }

    set idCliente(value) {
        this.#validarId(value);
        this.#idCliente = value;
    }

    get Nome() {
        return this.#nome;
    }

    set nome(value) {
        this.#validarNome(value);
        this.#nome = value;
    }

    get Cpf() {
        return this.#cpf;
    }

    set cpf(value) {
        this.#validarCpf(value);
        this.#cpf = value;
    }

    // VALIDAÇÕES
    #validarId(value) {
        if (value && value <= 0) {
            throw new Error('Verifique o IdCliente informado');
        }
    }

    #validarNome(value) {
        if (!value || value.trim().length < 3 || value.trim().length > 45) {
            throw new Error('O nome deve ter entre 3 e 45 caracteres');
        }
    }

    #validarCpf(value) {
        if (!value || value.trim().length !== 11) {
            throw new Error('O CPF deve conter exatamente 11 caracteres');
        }
    }
    static criar(dados) {
        return new Cliente(
            dados.nome,
            dados.cpf,
            null
        );
    }

    static alterar(dados, id) {
        return new Cliente(
            dados.nome,
            dados.cpf,
            id
        );
    }
}