const express = require('express');
const usuariosRouter = require("./routes/usuariosRouter");
const rolesRouter = require("./routes/rolesRouter");
const productosRouter = require("./routes/productosRouter");
const pedidosRouter = require("./routes/pedidosRouter");
const utils = require("./utils");
require('dotenv').config();

var app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use(utils.conectar);

app.use('/usuarios', usuariosRouter);
app.use('/roles', rolesRouter);
app.use('/productos', utils.validarToken, productosRouter);
app.use('/pedidos', utils.validarToken, pedidosRouter);

app.listen(port, () =>  {
    console.log('Servidor escuchando en el puerto ' + port)
})

