const mysql = require('mysql');
// Need to get from .env

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'back1234',
    database: 'test_backend'
})
connection.connect();

module.exports = connection;