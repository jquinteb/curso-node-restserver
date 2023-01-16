const {response} = require('express');

const usersGet = (req = request, res = response) =>{

    const {q,nombre="no name",apikey,page=1,limit} = req.query

    res.json({                
        msg:'get API - controlador',
        q,
        nombre,
        apikey,
        page,
        limit
    });
}

    const usersPut = (req, res) =>{
    
    const {id} = req.params;

    res.status(400).json({                
        msg:'put API - controlador',
        id
    });
}

//se recibe los datos del body
const usersPost=(req, res) =>{

    const {nombre, edad} = req.body;

    res.status(201).json({                
        msg:'post API - controlador',
        nombre,
        edad
    });
}

const usersDelete = (req, res) =>{
    res.json({                
        msg:'delete API - controlador'
    });
}

module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete
}