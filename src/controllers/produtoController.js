import { Produto } from "../models/Produto.js";
import produtoRepository from "../repositories/produtoRepository.js";

const produtoController = {
    criar: async (req, res) => {
        try {
            if (!req.file) {
                return res.status(400).json({ message: 'Imagem não foi enviada' });
            }
            const { IdCategoria, Nome, Valor } = req.body;
            const VinculoImagem = `/uploads/imagens/${req.file.filename}`;

            const produto = Produto.criar({
                IdCategoria,Nome,Valor, VinculoImagem
            });

            const result = await produtoRepository.criar(produto);

            res.status(201).json({ result });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },

    editar: async (req, res) => {
        try {
            const IdProduto = req.params.id; 
            const { IdCategoria, Nome, Valor } = req.body;

            let VinculoImagem = null;

            const produto = Produto.alterar(
                { IdCategoria, Nome, Valor, VinculoImagem },
                IdProduto
            );

            const result = await produtoRepository.editar(produto);

            res.status(200).json({ result });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },

    deletar: async (req, res) => {
        try {

            const IdProduto = req.params.id;

            const result = await produtoRepository.deletar(IdProduto);

            res.status(200).json({ result });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },

    selecionar: async (req, res) => {
        try {

            const result = await produtoRepository.selecionar();

            res.status(200).json({ result });

        } catch (error) {
            console.log(error);
            res.status(500).json({
                message: 'Ocorreu um erro no servidor',
                errorMessage: error.message
            });
        }
    },
};

export default produtoController;