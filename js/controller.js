const config = require("../config");
const mysql = require('mysql');

class Controller {
    constructor(recurso){
        this.recurso = recurso;
        this.connection = mysql.createConnection({
            Host     : config.Host,
            user     : config.user,
            password : config.password,
            database : config.database,
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
        return res.send("Obtener " + this.recurso);
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