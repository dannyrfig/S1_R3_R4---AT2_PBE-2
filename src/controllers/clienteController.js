import { Cliente } from "../models/Cliente.js";
import clienteRepository from "../repositories/clienteRepository.js";
import axios from "axios";
import { limparNumero } from "../utils/limparNumero.js";
import { validarCPF } from "../utils/validarCpf.js";

const clienteController = {

   criar: async (req, res) => {
      try {
         const { nome, cpf, telefone, cep, numero, complemento } = req.body;
         cpf = limparNumero(cpf);
         telefone = limparNumero(telefone);
         cep = limparNumero(cep);
         const cepRegex = /^[0-9]{8}$/;
         
         if (!cepRegex.test(cep)) {
            return res.status(400).json({
               message: 'Verifique o CEP informado'
            });
         }

         if (!validarCPF(cpf)) {
            return res.status(400).json({
               message: 'CPF inválido'
            });
         }
         
         const resApi = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

         if (resApi.data.erro) {
            return res.status(400).json({ message: 'CEP não encontrado' });
         }

         const endereco = {cep,logradouro: resApi.data.logradouro, bairro: resApi.data.bairro,cidade: resApi.data.localidade,uf: resApi.data.uf,numero, complemento };
         const cliente = Cliente.criar({ nome, cpf });
         const result = await clienteRepository.criar(cliente, telefone, endereco);

         res.status(201).json(result);

      } catch (error) {
         console.log(error);
         res.status(500).json({ message: error.message });
      }
   },

   editar: async (req, res) => {
      try {
         const id = req.params.id;
         const { nome, cpf, telefone, cep, numero, complemento } = req.body;

         let endereco = null;

         if (cep) {
            const resApi = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);

            endereco = {
               cep,
               logradouro: resApi.data.logradouro,
               bairro: resApi.data.bairro,
               cidade: resApi.data.localidade,
               uf: resApi.data.uf,
               numero,
               complemento
            };
         }

         const cliente = Cliente.alterar({ nome, cpf }, id);

         const result = await clienteRepository.editar(cliente, telefone, endereco);

         res.status(200).json(result);

      } catch (error) {
         console.log(error);
         res.status(500).json({ message: error.message });
      }
   },

   deletar: async (req, res) => {
      try {
         const id = req.params.id;

         const result = await clienteRepository.deletar(id);

         res.status(200).json(result);

      } catch (error) {
         console.log(error);
         res.status(500).json({ message: error.message });
      }
   },

   selecionar: async (req, res) => {
      try {
         const result = await clienteRepository.selecionar();

         res.status(200).json(result);

      } catch (error) {
         console.log(error);
         res.status(500).json({ message: error.message });
      }
   }
};

export default clienteController;