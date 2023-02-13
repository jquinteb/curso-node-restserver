const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validarJWT = async (req = request,res=response,next) => {

    const token = req.header('x-token');

    if (!token){
        return res.status(401).json({
            msg:'No hay token en la petición'
        });
    }

    try {

        const {uid} = jwt.verify(token,process.env.SECRETTOPRIVATEKEY);

        const user = await User.findById(uid);

        if (!user){
            return res,statusd(400).json({
                msg: 'token no valido - usuario no existe en bd'
            });
        }

        if (!user.status){
            return res,statusd(400).json({
                msg: 'token no valido - usuario con estado false'
            });
        }
        
        req.user = user;

        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg:'token no valido'
        });
    }

}

module.exports = {
    validarJWT
}