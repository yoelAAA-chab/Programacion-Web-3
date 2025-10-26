import express from 'express';
import mysql from 'mysql2/promise';


const app = express();


app.use(express.json());


const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'practicaN2-web3'
});


const puerto = 3000;
app.listen(puerto, () => {
    console.log(`Servidor en http://localhost:${puerto}`);
});

//1
app.post('/categorias', async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const [result] = await pool.query(
            'INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)',
            [nombre, descripcion]
        );
        res.status(201).json({
            id: result.insertId, 
            nombre: nombre,
            descripcion: descripcion
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear la categoría' });
    }
});


//2
app.get('/categorias', async (req, res) => {
    try {
        const [rows] = await pool.query('SELECT * FROM categorias');

        res.status(200).json(rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las categorías' });
    }
});

//3
app.get('/categorias/:id', async (req, res) => {

    
    try {

        const { id } = req.params;

        const [rowsCategoria] = await pool.query(
            'SELECT * FROM categorias WHERE id = ?',
            [id]
        );

        if (rowsCategoria.length === 0) {
            return res.status(404).json({ error: 'Categoría no encontrada' });
        }
        
        const categoria = rowsCategoria[0];

        const [rowsProductos] = await pool.query(
            'SELECT * FROM productos WHERE categoria_id = ?',
            [id] 
        );
        res.status(200).json({
            ...categoria,     
            productos: rowsProductos 
        });

    } catch (error) {
        
        console.error(error);
        res.status(500).json({ error: 'Error al obtener la categoría' });
    }
});


//4
app.put('/categorias/:id', async (req, res) => {

    try {
        const { id } = req.params; 
        const { nombre, descripcion } = req.body;

        const [result] = await pool.query(
            'UPDATE categorias SET nombre = ?, descripcion = ? WHERE id = ?',
            [nombre, descripcion, id]
        );
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
});

//5
app.delete('/categorias/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [result] = await pool.query(
            'DELETE FROM categorias WHERE id = ?',
            [id]
        );
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'categoria no encontrada' });
        }


        res.status(200).json({
            message: 'categoria fue eliminada'
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'erro!!' });
    }
});



//6
app.post('/productos', async (req, res) => {

    try {
        const { nombre, precio, stock, categoria_id } = req.body;

        if (!nombre || !precio || !stock || !categoria_id) {
            return res.status(400).json({ error: 'Faltan datos (nombre, precio, stock, categoria_id)' });
        }
        const [result] = await pool.query(
            'INSERT INTO productos (nombre, precio, stock, categoria_id) VALUES (?, ?, ?, ?)',
            [nombre, precio, stock, categoria_id]
        );

        res.status(201).json({
            id: result.insertId, 
            nombre: nombre,
            precio: precio,
            stock: stock,
            categoria_id: categoria_id
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'no existe' });
    }
});

//7
app.get('/productos', async (req, res) => {
    
    try {
        const [rows] = await pool.query(
            'SELECT p.*, c.nombre AS nombre_categoria ' +
            'FROM productos p ' +
            'JOIN categorias c ON p.categoria_id = c.id'
        );
        res.status(200).json(rows);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'erro!!' });
    }
});

//8
app.get('/productos/:id', async (req, res) => { 
    try {
        const { id } = req.params;
        const [rows] = await pool.query(
            'SELECT p.*, c.nombre AS nombre_categoria ' +
            'FROM productos p ' +
            'JOIN categorias c ON p.categoria_id = c.id ' +
            'WHERE p.id = ?',
            [id]
        );
        if (rows.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }
        res.status(200).json(rows[0]);

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'erro' });
    }
});

//9
app.put('/productos/:id', async (req, res) => {

    
    try {
        const { id } = req.params; 
        const { nombre, precio, stock, categoria_id } = req.body;
        const [result] = await pool.query(
            'UPDATE productos SET nombre = ?, precio = ?, stock = ?, categoria_id = ? WHERE id = ?',
            [nombre, precio, stock, categoria_id, id] 
        );

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
        res.status(500).json({ error: 'no existe  ' });
    }
});

//10
app.patch('/productos/:id/stock', async (req, res) => {
    try {
        const { id } = req.params; 
        const { cantidad } = req.body;

        if (cantidad === undefined || typeof cantidad !== 'number') {
            return res.status(400).json({ error: 'Se requiere una "cantidad" numérica en el body' });
        }

        const [result] = await pool.query(
            'UPDATE productos SET stock = stock + ? WHERE id = ?',
            [cantidad, id] 
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'no encontrado' });
        }
        const [rows] = await pool.query('SELECT * FROM productos WHERE id = ?', [id]);

        res.status(200).json({
            message: 'actualizado',
            producto: rows[0] 
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'error' });
    }
});