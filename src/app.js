const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 3050;
const app = express();

app.use(bodyParser.json());

// MySql
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'ejercicio_backend'
});

// Check connection
connection.connect(error => {
    if (error) throw error;
    console.log('Database server running!');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Route
app.get('/', (req, res) => {
    res.send('Welcome to my API!');
});

app.get('/products', (req, res) => {
    const sql = 'SELECT * FROM products';
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('Not results');
        }
    })
});

app.get('/products/:id', (req, res) => {
    const {id} = req.params
    const sql = `SELECT * FROM products WHERE id = ${id}`;
    connection.query(sql, (error, results) => {
        if (error) throw error;
        if (results.length > 0) {
            res.json(results);
        } else {
            res.send('Not results');
        }
    })
});

app.post('/add', (req, res) => {
    const sql = 'INSERT INTO products SET ?';
    const productObj = {
        name: req.body.name,
        type: req.body.type
    };
    connection.query(sql, productObj, error => {
        if (error) throw error;
        res.send('Product created!');
    });
});

app.put('/update/:id', (req, res) => {
    const {id} = req.params;
    const {name, type} = req.body;
    const sql = `UPDATE products SET name = '${name}', type = '${type}' WHERE id = ${id}`;
    connection.query(sql, error => {
        if (error) throw error;
        res.send('Product updated!');
    });
})

app.delete('/delete/:id', (req, res) => {
    const {id} = req.params;
    const sql = `DELETE FROM products WHERE id = ${id}`;
    connection.query(sql, error => {
        if (error) throw error;
        res.send('Product deleted!');
    });
})
