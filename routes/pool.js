var mysql =require('mysql');

var pool = mysql.createPool({
    host: 'localhost',
    port:3306,
    database: 'tbf',
    password: '123',
    user: 'root',
    connectionLimit: 100,
    multipleStatements: true
})

module.exports = pool;