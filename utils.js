const usuarioController = require("./controller/usuariosController");
const Sequelize = require("sequelize");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const password = process.env.SECRET_TOKEN;

function conectar(req, res, next){
    req.connection = new Sequelize(process.env.DB_DATABASE, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
        host: process.env.DB_HOST,
        dialect: "mysql",
        dialectOptions: {
            socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
        }
    });
    next();
}

function checkAdmin(req, res, next){
    usuarioController.isAdmin(req).then(
        function(usuarios){
            if(usuarios.length > 0){
                return next();
            }else{
                res.status(401);
                res.send("El usuario " + req.body.usuario + " no tiene el rol Administrador");
            }
        }).catch(error => {
            console.log(error);
            res.status(400);
            return res.send(error.original.sqlMessage);
        });
 }

 function checkListar(req, res, next){
        usuarioController.checkListar(res, req).then(
            function(usuarios){
                if(usuarios.length > 0){
                    return next();
                }else{
                    res.status(401);
                    res.send("El usuario no tiene el rol Administrador");
                }
            }).catch(error => {
                res.status(400);
                return res.send(error.original.sqlMessage);
            });
 }

 function generarToken(data){
    const token = jwt.sign(data, password);
    return token;
 }

 function validarToken(req, res, next){
    const auth = req.headers.authorization
    if(!auth) res.status(400).send("Debe enviar el Token");
    const token = auth.split(' ')[1];
    try {
        const decoded = jwt.verify(token, password);
        next();
    } catch (error) {
        res.status(400);
        return res.send("El Token no es valido");
    }
 }

 module.exports = {conectar, checkAdmin, checkListar, generarToken, validarToken}