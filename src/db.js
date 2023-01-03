const {createPool} = require('mysql2/promise');
function connection() {
    const connect = createPool({
        host: "localhost",
        user: "root",
        password: "5757",
        database: "book_store" //added this after err msg "no database selected"
    })
   return connect;
}

module.exports = connection;