import { Cliente } from "../models/Cliente.js";
import clienteRepository from "../repositories/clienteRepository.js";
import axios from "axios";
const clienteController = {
   criar: async (req, res) => {
      try {
         const { nome, cpf, telefones, cep, numero, complemento } = req.body;

         const cepRegex = /^[0-9]{8}$/;
         if (!cepRegex.test(cep)) {
            return res.status(400).json({ message: 'CEP incorreto, ou inválido digite novamente' });
         }
         const resApi = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

         if (resApi.data.erro) {
            return res.status(400).json({ message: 'O CEP não foi encontrado' });
         }
         const endereco = {
            cep,
            logradouro: resApi.data.logradouro,
            bairro: resApi.data.bairro,
            cidade: resApi.data.localidade,
            uf: resApi.data.uf,
            numero,
            complemento
         };
         const cliente = Cliente.criar({nome,cpf,telefones,endereco });
         const result = await clienteRepository.criar(cliente);

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
         const id = req.params.id;
         const { nome, cpf, telefones, cep, numero, complemento } = req.body;
         let endereco = null;

         if (cep) {
            const cepRegex = /^[0-9]{8}$/;
            if (!cepRegex.test(cep)) {
               return res.status(400).json({ message: 'CEP incorreto, ou inválido digite novamente' });
            }
            const resApi = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

            if (resApi.data.erro) {
               return res.status(400).json({ message: 'O CEP não foi encontrado' });
            }

            endereco = {
               cep,
               logradouro: resApi.data.logradouro,
               bairro: resApi.data.bairro,
               cidade: resApi.data.localidade,
               uf: resApi.data.uf,
               numero,
               complemento
            };
            const cliente = Cliente.alterar({nome,cpf,telefones,endereco}, id);
         }
         const result = await clienteRepository.editar(cliente);

         res.status(201).json({ result });
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
         const id = req.params.id;
         const result = await clienteRepository.deletar(id);

         res.status(201).json({ result });

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
         const result = await clienteRepository.selecionar();

         res.status(201).json({ result });

      } catch (error) {
         console.log(error);
         res.status(500).json({
            message: 'Ocorreu um erro no servidor',
            errorMessage: error.message
         });
      }
   },
};

export default clienteController;
