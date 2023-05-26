const {response} = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');


const login = async (req, res = response) =>{

    const {mail,password} = req.body;

    try {

        //verificar si email existe
        const user = await User.findOne({mail});

        if (!user){
            return res.status(400).json({
                msg:'Usuario / Password no con correctos - correo'
            });
        }
        
        //verificar si el usuario esta activo en la bd

        if (!user.status){
            return res.status(400).json({
                msg:'Usuario / Password no con correctos - status:false'
            });
        }

        //verificar la contraseña
        const validPassword = bcryptjs.compareSync(password, user.password);

        if (!validPassword){
            return res.status(400).json({
                msg:'Usuario / Password no con correctos - password'
            }); 
        }

        //generar el jwt
        const token = await generarJWT(user.id)

        res.json({
            user,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:'Hable con el aldministrador'
        })
    }

}

const googleSigIn = async(req, res = response) =>{
    
    const {id_token} = req.body;

    try {
        const {name, picture, email} = await googleVerify(id_token);

        let mail = email;

         let user = await User.findOne({mail});

        if (!user){

            const data = {
                name,
                mail: email,
                password: ':P', //carita que saca la lengua
                img:picture,
                role:"ADMIN_ROLE",
                status:true,
                google: true
            };

             user = new User(data);
             await user.save();
        }


        //si el usuario en db 
        if (!user.status){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        const token = await generarJWT(user.id);

      res.json({
        user,
        token
    })

    } catch (error) {
        res.status(400).json({
            ok:false,
            msg:'El token no se pudo modificar',
            error
        })
    }

   
}

module.exports = {
    login,
    googleSigIn
}