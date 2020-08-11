const objeto = require('./controller');
const bcrypt = require("bcrypt");
const Usuario = require("../views/usuarioview")
const Rol = require("../views/rolview")

class UsuarioController extends objeto.Controller{
    constructor(tabla){
        super();
        this.recurso = tabla;
    }

    listar  = (req, res) => {
        this.connection.query('SELECT * from ' + this.recurso , function (err, rows, fields) {
            if (err) throw err
            let usuarios = [];
            for(let i = 0; i < rows.length; i++){
                let usuario = new Usuario(rows[i]);
                usuarios.push(usuario);
            }
            return res.json(usuarios);
          });
        this.connection.end();
    }

    crear = (req, res) => {
        const body = req.body;

        bcrypt.hash(body.password, 10).then(hash =>{
            body.password = hash;
            const sql = "INSERT INTO usuarios SET ?";
            this.connection.query(sql, body,function (err, result) {
                if (err) throw err;
                return res.send("Usuario insertado: " + body.username);
            });
        });
    }

    obtener = (req, res) => {
        this.connection.query("SELECT * from usuarios where username = '" + req.params.idUsuario + "'", function (err, rows, fields) {
            if (err) throw err
            let usuario = new Usuario(rows[0]);
            return res.json(usuario);
          });
        this.connection.end();
    }

    actualizar = (req, res) => {
        const body = req.body;
        this.connection.query("UPDATE usuarios SET ? where username = '" + body.username + "'", req.body , function (err, rows, fields) {
            if (err) throw err
            return res.send("Se actualizaron " + rows.affectedRows + " registros");
          });
        this.connection.end();
    }

    eliminar = (req, res) =>{
        this.connection.query("UPDATE usuarios SET activo = 0 where username = '" + req.params.idUsuario + "'" , function (err, rows, fields) {
            if (err) throw err
            return res.send("Se depreco el usuario " + req.params.idUsuario);
          });
        this.connection.end();
    }

    obtenerRoles = (req, res) => {
        this.connection.query("SELECT * from usuarios_roles where username = '" + req.params.idUsuario + "'", function (err, rows, fields) {
            if (err) throw err
            let roles = [];
            for(let i = 0; i < rows.length; i++){
                let rol = new Rol(rows[i]);
                roles.push(rol);
            }
            return res.json(roles);
          });
        this.connection.end();
    }
}

const usuario = new UsuarioController("Usuarios");

module.exports = {usuario}