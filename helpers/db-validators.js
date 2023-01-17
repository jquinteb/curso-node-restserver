const Rol = require('../models/rol');
const User = require('../models/user');

const isValidRole = async (role='') => {
    const existRol = await Rol.findOne({role});
    if (!existRol){
        throw new Error(`El rol ${role} no esta registrado en la BD`);
    }
}

const mailExists = async (mail='') =>{
    const existeMail = await User.findOne({mail});
    if (existeMail){        
        throw new Error(`El correo ${mail} ya esta registrado`);        
    }
}

const existUserById= async (id) =>{
    
    const existUser = await User.findById(id);
    if (!existUser){
        throw new Error(`El id no existe: ${id}`);
    }
}


module.exports = {
    isValidRole,
    mailExists,
    existUserById
}