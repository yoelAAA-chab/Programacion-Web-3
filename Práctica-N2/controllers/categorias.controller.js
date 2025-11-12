import { crearCategoria, obtenerCategorias, obtenerCategoriaPorId, actualizarCategoria, eliminarCategoria } from '../models/categorias.model.js';

//1
export const postCategoria = async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;

        if (!nombre || !descripcion) {
            return res.status(400).json({ error: 'Nombre y descripción son obligatorios' });
        }

        const nuevaCategoria = await crearCategoria(nombre, descripcion);
        
        res.status(201).json(nuevaCategoria);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la categoría' });
    }
};

//2
export const getCategorias = async (req, res) => {
    try {
        const categorias = await obtenerCategorias();
        res.status(200).json(categorias);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las categorías' });
    }
};

//3
export const getCategoriaPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const categoria = await obtenerCategoriaPorId(id);
        if (categoria === null) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        res.status(200).json(categoria);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la categoría' });
    }
};
//4
export const putCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, descripcion } = req.body;
        if (!nombre || !descripcion) {
            return res.status(400).json({ error: 'Nombre y descripción son obligatorios' });
        }
        const result = await actualizarCategoria(id, nombre, descripcion);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        res.status(200).json({
            id: id,
            nombre: nombre,
            descripcion: descripcion
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar la categoría' });
    }
};

//5
export const deleteCategoria = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await eliminarCategoria(id);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        res.status(200).json({ message: 'Categoría eliminada exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar la categoría' });
    }
};
