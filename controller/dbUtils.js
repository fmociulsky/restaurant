const mysql = require('mysql');

function getConnection(){
    return mysql.createConnection({
        Host     : process.env.DB_HOST,
        user     : process.env.DB_USERNAME,
        password : process.env.DB_PASSWORD,
        database : process.env.DB_DATABASE,
        socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
      });
}

module.exports = getConnection;