const objeto = require('./controller');

class Usuario extends objeto.Controller {
    constructor(recurso){
        super(recurso);
    }

    obtenerRoles(req, res) {
        return res.send("Roles del Usuario");
    }
}

const usuario = new Usuario("Usuarios");

module.exports = {usuario}