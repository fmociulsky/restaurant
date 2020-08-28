class PedidoController{
    listar  = (req, res) => {
        req.connection.query('SELECT * from PEDIDOS',{type: req.connection.QueryTypes.SELECT}).then(
            function(pedidos){
                return res.json(pedidos);
            }
        ).catch(error => {
            console.log(error);
            res.status(400);
            return res.send(error.original.sqlMessage);
        });
    }

    crear = (req, res) => {
        const body = req.body;
        const sql = "INSERT INTO PEDIDOS (username, idProducto) VALUES (?, ?)";
        req.connection.query(sql, {replacements: [body.username, body.idProducto]}).then(
            function (result) {
                return res.send("Pedido insertado: " + body.idProducto + " - " + body.username);
        }).catch(error => {
            console.log(error);
            res.status(500);
            return res.send(error.original.sqlMessage);
        });
    }

    obtener  = (req, res) => {
        req.connection.query('SELECT * from PEDIDOS where id = ?',
        {type: req.connection.QueryTypes.SELECT,
        replacements: [req.params.idPedido] }
        ).then(
            function(pedidos){
                return res.json(pedidos);
            }
        )
    }

    actualizar = (req, res) => {
        const body = req.body;
        const sql = "UPDATE PEDIDOS SET username = ?,  idProducto = ?, estado = ? where id = ?";
        req.connection.query(sql, {replacements: [body.username, body.idProducto, body.estado, body.id]}).then(
            function (result) {
                return res.send("Pedido actualizado: " + body.idProducto + " - " + body.username);
        }).catch(error => {
            console.log(error);
            res.status(500);
            return res.send(error.original.sqlMessage);
        });
    }

    eliminar = (req, res) => {
        const body = req.body;
        const sql = "DELETE from PEDIDOS where id = ?";
        req.connection.query(sql, {replacements: [req.params.idPedido]}).then(
            function (result) {
                return res.send("Pedido eliminado: " + req.params.idPedido);
        }).catch(error => {
            console.log(error);
            res.status(500);
            return res.send(error.original.sqlMessage);
        });
    }

    obtenerPedidosCliente  = (req, res) => {
        const query = "SELECT * from PEDIDOS where username = ?";
        req.connection.query(query,{type: req.connection.QueryTypes.SELECT, replacements: [req.params.username]}).then(
            function(pedidos){
                return res.json(pedidos);
            }
        ).catch(error => {
            console.log(error);
            res.status(400);
            return res.send(error.original.sqlMessage);
        });
    }
}

const pedido = new PedidoController();

module.exports = {pedido}