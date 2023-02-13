const jwt = require('jsonwebtoken');

const generarJWT = (uid='') => {
    
    return new Promise ((resolve, reject) => {
        
        const payload = {uid};

        jwt.sign(payload,process.env.SECRETTOPRIVATEKEY,
            {expiresIn: '4h'
        },(err, token) => {
            if (err){
                console.log(err);
                reject ('nos e pudo generar el token');
            }else{
                resolve(token);
            }
        });

    })
}


module.exports = {
    generarJWT
}