const {response} = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');
const { generarJWT } = require('../helpers/generar-jwt');


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

module.exports = {
    login
}