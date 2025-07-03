require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_NAME
});

// Obtener contactos
app.get('/contactos', async (req, res) => {
    const result = await pool.query('SELECT * FROM contactos');
    res.json(result.rows);
});

// Agregar contacto
app.post('/contactos', async (req, res) => {
    const { nombre, telefono } = req.body;
    const result = await pool.query('INSERT INTO contactos (nombre, telefono) VALUES ($1, $2) RETURNING *', [nombre, telefono]);
    res.json(result.rows[0]);
});

// Eliminar contacto
app.delete('/contactos/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM contactos WHERE id = $1', [id]);
    res.sendStatus(204);
});

// Obtener lineas
app.get('/lineas', async (req, res) => {
    const result = await pool.query('SELECT * FROM linea');
    res.json(result.rows);
});

// Obtener articulos
app.get('/articulos', async (req, res) => {
    const result = await pool.query('SELECT * FROM articulo');
    res.json(result.rows);
});

// Agregar articulos
app.post('/articulos', async (req, res) => {
    const { idArticulo, descripcion, idLinea, unidad, stock, precioCosto, precioVenta, descuento } = req.body;
    const result = await pool.query('INSERT INTO articulo (idarticulo, descripcion, idlinea, unidad, stock, preciocosto, precioventa, descuento) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',
        [idArticulo, descripcion, idLinea, unidad, stock, precioCosto, precioVenta, descuento]);
    res.json(result.rows[0]);
});

// Editar articulos
app.put('/articulos/:id', async (req, res) => {
    const { descripcion, idLinea, unidad, stock, precioCosto, precioVenta, descuento } = req.body;
    const { id } = req.params;
    const result = await pool.query(
    `UPDATE articulo 
     SET 
        descripcion = $1,
        idlinea = $2,
        unidad = $3,
        stock = $4,
        preciocosto = $5,
        precioventa = $6,
        descuento = $7
     WHERE idarticulo = $8
     RETURNING *`,
    [descripcion, idLinea, unidad, stock, precioCosto, precioVenta, descuento, id]
);
res.json(result.rows[0]);
});

// Eliminar articulos
app.delete('/articulos/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM articulo WHERE idarticulo = $1', [id]);
    res.sendStatus(204);
});

// Obtener empleados
app.get('/empleados', async (req, res) => {
    const result = await pool.query('SELECT * FROM empleado');
    res.json(result.rows);
});

// Agregar empleados
app.post('/empleados', async (req, res) => {
    const { idEmpleado, paterno, materno, nombres, direccion, telefono, clave } = req.body;
    const result = await pool.query(
        'INSERT INTO empleado (idempleado, paterno, materno, nombres, direccion, telefono, clave) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
        [idEmpleado, paterno, materno, nombres, direccion, telefono, clave]
    );
    res.json(result.rows[0]);
});

// Editar empleados
app.put('/empleados/:id', async (req, res) => {
    const { paterno, materno, nombres, direccion, telefono, clave } = req.body;
    const { id } = req.params;
    const result = await pool.query(
        `UPDATE empleado 
         SET 
            paterno = $1,
            materno = $2,
            nombres = $3,
            direccion = $4,
            telefono = $5,
            clave = $6
         WHERE idempleado = $7
         RETURNING *`,
        [paterno, materno, nombres, direccion, telefono, clave, id]
    );
    res.json(result.rows[0]);
});

// Eliminar empleados
app.delete('/empleados/:id', async (req, res) => {
    const { id } = req.params;
    await pool.query('DELETE FROM empleado WHERE idempleado = $1', [id]);
    res.sendStatus(204);
});


app.post('/login', async (req, res) => {
    const { email, contraseña } = req.body;
    const user = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

    if (user.rows.length === 0) return res.status(400).json({ error: 'Usuario no encontrado' });

    const validPassword = await bcrypt.compare(contraseña, user.rows[0].contraseña);
    if (!validPassword) return res.status(400).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.rows[0].id }, 'secreto', { expiresIn: '1h' });
    res.json({ token });
});



app.listen(5000, () => {
    console.log('Servidor corriendo en el puerto 5000');
});
