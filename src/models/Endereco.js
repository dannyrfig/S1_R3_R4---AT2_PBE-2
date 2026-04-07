export class Endereco {
    #idEndereco;
    #idCliente;
    #logradouro;
    #numero;
    #complemento;
    #bairro;
    #cidade;
    #uf;
    #cep;

    constructor(pIdCliente, pLogradouro, pNumero, pComplemento, pBairro, pCidade, pUf, pCep, pIdEndereco) {
        this.idCliente = pIdCliente;
        this.logradouro = pLogradouro;
        this.numero = pNumero;
        this.complemento = pComplemento;
        this.bairro = pBairro;
        this.cidade = pCidade;
        this.uf = pUf;
        this.cep = pCep;
        this.idEndereco = pIdEndereco;
    }

    // Métodos Acessores - GETTERS e SETTERS
    get IdEndereco() {
        return this.#idEndereco;
    }

    set idEndereco(value) {
        this.#validarId(value);
        this.#idEndereco = value;
    }

    get IdCliente() {
        return this.#idCliente;
    }

    set idCliente(value) {
        this.#validarIdCliente(value);
        this.#idCliente = value;
    }

    get Logradouro() {
        return this.#logradouro;
    }

    set logradouro(value) {
        this.#validarLogradouro(value);
        this.#logradouro = value;
    }

    get Numero() {
        return this.#numero;
    }

    set numero(value) {
        this.#validarNumero(value);
        this.#numero = value;
    }

    get Complemento() {
        return this.#complemento;
    }

    set complemento(value) {
        this.#complemento = value ?? null;
    }

    get Bairro() {
        return this.#bairro;
    }

    set bairro(value) {
        this.#bairro = value ?? null;
    }

    get Cidade() {
        return this.#cidade;
    }

    set cidade(value) {
        this.#validarCidade(value);
        this.#cidade = value;
    }

    get Uf() {
        return this.#uf;
    }

    set uf(value) {
        this.#validarUf(value);
        this.#uf = value;
    }

    get Cep() {
        return this.#cep;
    }

    set cep(value) {
        this.#validarCep(value);
        this.#cep = value;
    }

    // VALIDAÇÕES
    #validarId(value) {
        if (value && value <= 0) {
            throw new Error('Verifique o IdEndereco informado');
        }
    }

    #validarIdCliente(value) {
        if (!value || value <= 0) {
            throw new Error('IdCliente inválido');
        }
    }

    #validarLogradouro(value) {
        if (!value || value.trim().length < 3 || value.trim().length > 100) {
            throw new Error('O logradouro deve ter entre 3 e 100 caracteres');
        }
    }

    #validarNumero(value) {
        if (!value || value.trim().length === 0 || value.trim().length > 10) {
            throw new Error('O número deve ter entre 1 e 10 caracteres');
        }
    }

    #validarCidade(value) {
        if (!value || value.trim().length < 3 || value.trim().length > 50) {
            throw new Error('A cidade deve ter entre 3 e 50 caracteres');
        }
    }

    #validarUf(value) {
        if (!value || value.trim().length !== 2) {
            throw new Error('A UF deve conter exatamente 2 caracteres');
        }
    }

    #validarCep(value) {
        if (!value || value.trim().length !== 8) {
            throw new Error('O CEP deve conter exatamente 8 caracteres');
        }
    }

    // FACTORY METHODS
    static criar(dados) {
        return new Endereco(
            dados.IdCliente,
            dados.Logradouro,
            dados.Numero,
            dados.Complemento,
            dados.Bairro,
            dados.Cidade,
            dados.Uf,
            dados.Cep,
            null
        );
    }

    static alterar(dados, id) {
        return new Endereco(
            dados.IdCliente,
            dados.Logradouro,
            dados.Numero,
            dados.Complemento,
            dados.Bairro,
            dados.Cidade,
            dados.Uf,
            dados.Cep,
            id
        );
    }
}