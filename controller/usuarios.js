const objeto = require('./controller');
const bcrypt = require("bcrypt");

class Usuario extends objeto.Controller {
    constructor(recurso){
        super(recurso);
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
        /*this.connection.connect();

        this.connection.query('SELECT * from ' + this.recurso + " where username='" + body.username +"'", function (err, rows, fields) {
            if (err) throw err
            return res.json(rows[0]);
          });
        */
    }

    obtenerRoles(req, res) {
        return res.send("Roles del Usuario");
    }
}

const usuario = new Usuario("Usuarios");

module.exports = {usuario}