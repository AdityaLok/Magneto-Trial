const mysql = require('mysql2/promise');

async function getConnection(dbName = 'customer_db') {
    return await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: dbName
    });
}

module.exports = {
    getConnection
};