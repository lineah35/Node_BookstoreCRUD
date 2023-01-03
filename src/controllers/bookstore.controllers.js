const connection = require('../db.js');//two dots since it's outside the folder
const moment = require('moment');

const sale = async(req, res) => {
    const{book_name, customer_name, stock} = req.body;
    const conn = await connection();
    const sold = await conn.query(`INSERT INTO books (book_name, customer_name, stock, created_at) VALUES ('${book_name}', '${book_name}', '${book_name}', '${moment().format()}');`);
    console.log('record of book sale:', sold[0]);
    res.send(sold[0]);
};

const deleteSale = async(req, res) => {
    const id = req.params.id;
    const conn = await connection();
    const deleted = await conn.query(`DELETE FROM books WHERE book_id = '${id}';`)
    res.send(deleted[0]);
}

const updateID = async(req, res) => {
    const updatedID = req.body.book_id;//had to access the object
    console.log('id in body', updatedID);
    const id = req.params.id;
    console.log('id to be updated', id);
    const conn = await connection();
    const updated = await conn.query(`UPDATE books SET book_id = '${updatedID}' WHERE book_id = '${id}';`);
    console.log("updated", updated);
    res.send(updated[0]);
}

const updateInfo = async(req, res) => {
    const {book_name, customer_name, stock, role} = req.body;
    console.log("admin", role);
    const id = req.params.id;
    console.log("id in path", id);
    const conn = await connection();
    const updatedInfo = await conn.query(`UPDATE books SET book_name = '${book_name}', customer_name = '${customer_name}', stock = '${stock}', role = '${role}', updated_at = '${moment().format()}' WHERE book_id = ${id};`); //tried adding updated_at and failed.
    console.log("updated", updatedInfo);
    res.send(updatedInfo[0]);
}

const retrieveInfo = async(req, res) => {
    const role = req.body.role;
    let conn = await connection();
    if(role === "admin") {
    const access = await conn.query(`SELECT * FROM book_store.books;`);
    console.log("access", access);
    res.send(access[0])
    } else {
        const cashierAccess = await conn.query(`SELECT book_name, customer_name FROM book_store.books;`);
        console.log("access to cashier", cashierAccess[0]);
        res.send(cashierAccess[0])
    }
    
}

module.exports = {sale, deleteSale, updateID, updateInfo, retrieveInfo};