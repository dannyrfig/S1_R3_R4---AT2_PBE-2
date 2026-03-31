export class Produto {
    #idProduto;
    #idCategoria;
    #nome;
    #valor;
    #vinculoImagem;
    #dataCad;

    constructor(pIdCategoria, pNome, pValor, pVinculoImagem, pIdProduto) {
        this.idCategoria = pIdCategoria;
        this.nome = pNome;
        this.valor = pValor;
        this.vinculoImagem = pVinculoImagem;
        this.idProduto = pIdProduto;
    }

    //Métodos Acessores - GETTERS e SETTERS
    get IdProduto() {
        return this.#idProduto;
    }

    set idProduto(value) {
        this.#validarId(value);
        this.#idProduto = value;
    }

    get IdCategoria() {
        return this.#idCategoria;
    }

    set idCategoria(value) {
        this.#validarIdCategoria(value);
        this.#idCategoria = value;
    }

    get Nome() {
        return this.#nome;
    }

    set nome(value) {
        this.#validarNome(value);
        this.#nome = value;
    }

    get Valor() {
        return this.#valor;
    }

    set valor(value) {
        this.#validarValor(value);
        this.#valor = value;
    }

    get VinculoImagem() {
        return this.#vinculoImagem;
    }
    
    set vinculoImagem(value) {
        this.#validarImagem(value);
        this.#vinculoImagem = value;
    }

    #validarId(value) {
        if (value && value <= 0) {
            throw new Error('Verifique o IdProduto informado');
        }
    }

    #validarIdCategoria(value) {
        if (!value || value <= 0) {
            throw new Error('IdCategoria inválido');
        }
    }

    #validarNome(value) {
        if (!value || value.trim().length < 3 || value.trim().length > 100) {
            throw new Error('O nome deve ter entre 3 e 100 caracteres');
        }
    }
    #validarValor(value) {
        if (!value || Number(value) <= 0) {
            throw new Error('O valor deve ser maior que zero');
        }
    }
    #validarImagem(value) {
        if (value) {
            if(value.trim().length === 0) {
                throw new Error('O caminho da imagem é obrigatório');
            }
        }
    }

    // FACTORY METHODS

    static criar(dados) {
        return new Produto(
            dados.IdCategoria,
            dados.Nome,
            dados.Valor,
            dados.VinculoImagem,
            null
        );
    }

    static alterar(dados, id) {
        console.log(dados.IdCategoria, dados.Nome, dados.Valor, dados.VinculoImagem);
        
        return new Produto(
            dados.IdCategoria,
            dados.Nome,
            dados.Valor,
            dados.VinculoImagem,
            id
        );
    }
}