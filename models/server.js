const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config.db');
require('dotenv').config();

class Server{

    constructor(){
        this.app = express();
        this.port = process.env.PORT
        this.usersPath = '/api/users';

        //conexion a la base de datos
        this.conectarDB();


        //Middlewares
        this.middleware();

        //Rutas de mi aplicación

        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middleware(){

        //CORS
        this.app.use(cors());

        //Parseo y lectura del body
        this.app.use(express.json());

        //directorio publico
        this.app.use(express.static('public'));        

    }

    routes(){
        this.app.use(this.usersPath,require('../routes/user.routes'));
    }

    listen(){
        this.app.listen(this.port, () =>{
            console.log(`Servidor corriendo en el puerto ${this.port}`);
        })
    }

}

module.exports = Server;