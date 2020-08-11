class Usuario{
    constructor(recurso){
        this.username = recurso.username;
        this.nombre = recurso.nombre;
        this.apellido = recurso.apellido;
        this.activo = recurso.activo == 1;
        this.nombre = recurso.nombre;
    }

    setRoles = (roles) =>{
        this.roles = roles;
    }

    getRoles = () =>{
        return this.roles;
    }
}

module.exports = Usuario;