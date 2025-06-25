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

app.post('/login', async (req, res) => {
    const { email, contraseña } = req.body;
    const user = await pool.query('SELECT * FROM usuarios WHERE email = $1', [email]);

    if (user.rows.length === 0) return res.status(400).json({ error: 'Usuario no encontrado' });

    let validPassword = false
    if (contraseña == user.rows[0].contraseña) {
        validPassword = true
    }
    if (!validPassword) return res.status(400).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: user.rows[0].id }, 'secreto', { expiresIn: '1h' });
    res.json({ token });
});


app.listen(5000, () => {
    console.log('Servidor corriendo en el puerto 5000');
});
