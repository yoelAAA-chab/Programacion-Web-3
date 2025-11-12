import pool from '../config/db.js';

//1
export const crearCategoria = async (nombre, descripcion) => {
    const [result] = await pool.query(
        'INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)',
        [nombre, descripcion]
    );
    return { id: result.insertId, nombre, descripcion };
};

//2
export const obtenerCategorias = async () => {
    const [rows] = await pool.query('SELECT * FROM categorias');
    return rows;
};

//3
export const obtenerCategoriaPorId = async (id) => {
    const [rowsCategoria] = await pool.query(
        'SELECT * FROM categorias WHERE id = ?',
        [id]
    );
    if (rowsCategoria.length === 0) {
        return null;
    }
    const categoria = rowsCategoria[0];
    const [rowsProductos] = await pool.query(
        'SELECT * FROM productos WHERE categoria_id = ?',
        [id] 
    );
    return {
        ...categoria, 
        productos: rowsProductos 
    };
};

//4
export const actualizarCategoria = async (id, nombre, descripcion) => {
    const [result] = await pool.query(
        'UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?',
        [nombre, descripcion, id]
    );
    return result;
};

//5
export const eliminarCategoria = async (id) => {
    const [result] = await pool.query(
        'DELETE FROM categorias WHERE id = ?',
        [id]
    );
    return result;
};