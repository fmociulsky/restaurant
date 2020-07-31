class Controller {
    constructor(recurso){
        this.recurso = recurso;
    }

    listar  = (req, res) => {
        return res.send("Lista de " + this.recurso);
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