const mysql = require('mysql');
require('dotenv').config();

class Controller {
    constructor(recurso){
        this.recurso = recurso;
        this.connection = mysql.createConnection({
            Host     : process.env.DB_HOST,
            user     : process.env.DB_USERNAME,
            password : process.env.DB_PASSWORD,
            database : process.env.DB_DATABASE,
            socketPath: '/Applications/MAMP/tmp/mysql/mysql.sock'
          });
          this.connection.connect();
    }

    listar  = (req, res) => {
        
        this.connection.query('SELECT * from ' + this.recurso , function (err, rows, fields) {
            if (err) throw err
            return res.json(rows);
          });
        this.connection.end();
    }
    
    obtener = (req, res) => {
        this.connection.query('SELECT * from ' + this.recurso + " where id='1'" , function (err, rows, fields) {
            if (err) throw err
            return res.json(rows[0]);
          });
        this.connection.end();
    }
    
    crear = (req, res) => {
        return res.send("Crear " + this.recurso);
    }
    
    actualizar = (req, res) =>{
        return res.send("Actualizar " + this.recurso);
    }
    
    eliminar = (req, res) =>{
        return res.send("Eliminar " + this.recurso);
    }
}

module.exports = {Controller};