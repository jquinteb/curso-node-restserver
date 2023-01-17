const {response} = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');


const usersGet = async (req = request, res = response) =>{

    //const {q,nombre="no name",apikey,page=1,limit} = req.query
    const {limit = 5,from = 0} = req.query

    // const users =User.find({status:true})
    //     .skip(Number(from))
    //     .limit(Number(limit))
   
    //const total = User.countDocuments({status:true});

    const [total,users] = await Promise.all([
        User.countDocuments({status:true}),
        User.find({status:true})
        .skip(Number(from))
        .limit(Number(limit))
    ]);


    res.json({             
        total:total,
        users:users
    });
}

    const usersPut = async (req, res) =>{
    
    const {id} = req.params;
    const {_id,password, google,mail, ...resto} = req.body;

    //validar contra BD
    if (password){
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password,salt);
    }

    const user = await User.findByIdAndUpdate(id, resto);

    res.json({        
        user
    });
}


//se recibe los datos del body
const usersPost= async (req, res) =>{   

    const {name, mail,password,role} = req.body;
    const user = new User({name, mail,password,role});   

    //encriptar la contraseña
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync(password,salt);

    
    //guardar en la base de datos
    await user.save(); 
    
    res.status(201).json({        
        user
    });

}

const usersDelete = async (req, res) =>{

const {id} = req.params;

//fisicamente borrado
//const user = await User.findByIdAndDelete(id);

const user = await User.findByIdAndUpdate(id,{status:false});

    res.json({        
        user
    });
}

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete
}