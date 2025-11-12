import pool from '../db.js';
//6
export const crearProducto = async (nombre, precio, stock, categoria_id) => {
    const [result] = await pool.query(
        'INSERT INTO productos (nombre, precio, stock, categoria_id) VALUES (?, ?, ?, ?)',
        [nombre, precio, stock, categoria_id]
    );
    return { 
        id: result.insertId, 
        nombre, 
        precio, 
        stock, 
        categoria_id 
    };
};
//7
export const obtenerProductos = async () => {
    const [rows] = await pool.query(
        'SELECT p.*, c.nombre AS nombre_categoria ' +'FROM productos p ' +'JOIN categorias c ON p.categoria_id = c.id'
    );
    return rows;
};
//8
export const obtenerProductoPorId = async (id) => {
    const [rows] = await pool.query(
        'SELECT p.*, c.nombre AS nombre_categoria ' +
        'FROM productos p ' +
        'JOIN categorias c ON p.categoria_id = c.id ' +
        'WHERE p.id = ?',
        [id]
    );
    return rows[0];
};
//9
export const actualizarProducto = async (id, nombre, precio, stock, categoria_id) => {
    const [result] = await pool.query(
        'UPDATE productos SET nombre = ?, precio = ?, stock = ?, categoria_id = ? WHERE id = ?',
        [nombre, precio, stock, categoria_id, id]
    );
    return result;
};
//10
export const actualizarStock = async (id, cantidad) => {
    const [result] = await pool.query(
        'UPDATE productos SET stock = stock + ? WHERE id = ?',
        [cantidad, id]
    );
    return result;
};