const mysql = require('mysql');
require('dotenv').config();
const bcrypt = require("bcrypt");
const getConnection = require('./dbUtils');

class Controller {
    constructor(recurso){
        this.recurso = recurso;
        this.connection = getConnection();
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