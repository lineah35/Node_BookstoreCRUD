const express = require('express');
const app = express();
const port = 3050;
const connection = require('./db');
const bookstoreRoutes = require('./routes/bookstore.routes');

app.use(express.json());

const createDB = async (req, res, next) => {
    const conn = await connection();
    const newDB = await conn.query(`CREATE DATABASE IF NOT EXISTS book_store`);
    next()
}

app.use(createDB);

const newTable = async(req, res, next) => {
    const conn = await connection();
    const tableCreated = await conn.query(`CREATE TABLE IF NOT EXISTS books (book_id INT AUTO_INCREMENT,book_name VARCHAR(255) NOT NULL,customer_name VARCHAR(255) NOT NULL,stock VARCHAR(255) NOT NULL, created_at datetime NOT NULL, updated_at datetime NOT NULL, PRIMARY KEY (book_id))`)
    next();
}

app.use(newTable);

app.use('/books', bookstoreRoutes)

app.get('/', (req, res) => {
    res.send("Hello world!");
})

app.listen(port, () => {
    console.log('This app is running on port ', port);
})