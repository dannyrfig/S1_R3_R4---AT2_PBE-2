import { Router } from "express";
import produtoRoutes from "./produtoRoutes.js";
import categoriaRoutes from "./categoriaRoutes.js";

const routes = Router();

routes.use('/produtos', produtoRoutes);
routes.use('/categorias', categoriaRoutes);

export default routes;