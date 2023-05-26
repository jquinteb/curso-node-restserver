const {Router} = require('express');
const { check } = require('express-validator');
const { login, googleSigIn } = require('../controllers/auth.controller');
const { validateFields } = require('../middlewares/validateFields');

const router = Router();

router.post('/login',[
    check('mail','El correo es obligatorio').isEmail(),
    check('password','La contraseña es obligatoria').not().isEmpty(),
    validateFields    
], login);

router.post('/google',[
    check('id_token','El ID token es necesario').not().isEmpty(),
    googleSigIn    
], login);

module.exports = router;