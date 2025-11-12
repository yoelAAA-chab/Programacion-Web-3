import { 
    crearProducto, 
    obtenerProductos, 
    obtenerProductoPorId, 
    actualizarProducto, 
    actualizarStock 
} from '../models/productos.model.js';
//6
export const postProducto = async (req, res) => {
    try {
        const { nombre, precio, stock, categoria_id } = req.body;
        if (nombre === undefined || precio === undefined || stock === undefined || categoria_id === undefined) {
            return res.status(400).json({ error: 'Faltan datos (nombre, precio, stock, categoria_id)' });
        }
        const nuevoProducto = await crearProducto(nombre, precio, stock, categoria_id);
        res.status(201).json(nuevoProducto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el producto (posiblemente categoria_id no existe)' });
    }
};

//7
export const getProductos = async (req, res) => {
    try {
        const productos = await obtenerProductos();
        res.status(200).json(productos);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
};
//8
export const getProductoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const producto = await obtenerProductoPorId(id);
        if (!producto) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(200).json(producto);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
};
//9
export const putProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, precio, stock, categoria_id } = req.body;
        if (nombre === undefined || precio === undefined || stock === undefined || categoria_id === undefined) {
            return res.status(400).json({ error: 'Faltan datos (nombre, precio, stock, categoria_id)' });
        }
        const result = await actualizarProducto(id, nombre, precio, stock, categoria_id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(200).json({
            id: id,
            nombre: nombre,
            precio: precio,
            stock: stock,
            categoria_id: categoria_id
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el producto (posiblemente categoria_id no existe)' });
    }
};
//10
export const patchProductoStock = async (req, res) => {
    try {
        const { id } = req.params;
        const { cantidad } = req.body;
        if (cantidad === undefined || typeof cantidad !== 'number') {
            return res.status(400).json({ error: 'Se requiere una "cantidad" numérica en el body' });
        }
        const result = await actualizarStock(id, cantidad);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        const productoActualizado = await obtenerProductoPorId(id);
        res.status(200).json({
            message: 'Stock actualizado exitosamente',
            producto: productoActualizado
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el stock' });
    }
};