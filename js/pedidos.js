const objeto = require('./controller');

class Pedido extends objeto.Controller {
    constructor(recurso){
        super(recurso);
    }
}

const pedido = new Pedido("Pedidos");

module.exports = {pedido}