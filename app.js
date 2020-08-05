const express = require('express');
const usuariosRouter = require("./routes/usuariosRouter");
const rolesRouter = require("./routes/rolesRouter");
const productosRouter = require("./routes/productosRouter");
const pedidosRouter = require("./routes/pedidosRouter");
require('dotenv').config();

var app = express();
const port = process.env.PORT;

app.use(express.json());

app.use('/usuarios', usuariosRouter);
app.use('/roles', rolesRouter);
app.use('/productos', productosRouter);
app.use('/pedidos', pedidosRouter);



app.listen(port, () =>  {
    console.log('Servidor escuchando en el puerto ' + port)
})

