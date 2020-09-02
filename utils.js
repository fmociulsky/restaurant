const usuarioController = require("./controller/usuariosController");
const Sequelize = require("sequelize");

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
    if(req.method == "GET"){
         next();
     }else{
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
 }

 module.exports = {conectar, checkAdmin}