const objeto = require('./controller');

class Usuario extends objeto.Controller {
    constructor(recurso){
        super(recurso);
    }

    obtenerRoles(req, res) {
        return res.send("Roles del Usuario");
    }
}

const usuario = new Usuario("Usuario");

module.exports = {
    /*listarUsuarios: usuario.listar, 
    obtenerUsuario: usuario.obtener, 
    crearUsuario: usuario.crear, 
    actualizarUsuario: usuario.actualizar, 
    eliminarUsuario: usuario.eliminar, 
    obtenerRoles: usuario.obtenerRoles*/
    usuario
}