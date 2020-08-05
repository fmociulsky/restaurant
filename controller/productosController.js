const objeto = require('./controller');

class Producto extends objeto.Controller {
    constructor(recurso){
        super(recurso);
    }
}

const producto = new Producto("Producto");

module.exports = {producto}