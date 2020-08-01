const objeto = require('./controller');

class Rol extends objeto.Controller {
    constructor(recurso){
        super(recurso);
    }

    asignar = (req, res) => {
        res.send("Asignar un rol");
    }
}

const rol = new Rol("roles");

module.exports = {rol}