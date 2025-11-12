import { Router } from 'express';

import { 
    postProducto, 
    getProductos, 
    getProductoPorId, 
    putProducto,
    patchProductoStock
} from '../controllers/productos.controller.js';


const router = Router();

//6
router.post('/productos', postProducto);
//7
router.get('/productos', getProductos);
//8
router.get('/productos/:id', getProductoPorId);
//9
router.put('/productos/:id', putProducto);
//10
router.patch('/productos/:id/stock', patchProductoStock);
export default router;