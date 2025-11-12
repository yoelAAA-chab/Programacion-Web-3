import { Router } from 'express';

import { 
    postCategoria, 
    getCategorias, 
    getCategoriaPorId, 
    putCategoria,
    deleteCategoria
} from '../controllers/categorias.controller.js';
const router = Router();
//1
router.post('/categorias', postCategoria);
//2
router.get('/categorias', getCategorias);
//3
router.get('/categorias/:id', getCategoriaPorId);
//4
router.put('/categorias/:id', putCategoria);
//5
router.delete('/categorias/:id', deleteCategoria);

export default router;