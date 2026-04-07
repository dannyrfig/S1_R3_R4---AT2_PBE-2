import { Router } from "express";
import produtoRoutes from "./produtoRoutes.js";
import categoriaRoutes from "./categoriaRoutes.js";
import clienteRoutes from "./clienteRoutes.js"

const routes = Router();

routes.use('/produtos', produtoRoutes);
routes.use('/categorias', categoriaRoutes);
routes.use('/clientes', clienteRoutes)

export default routes;