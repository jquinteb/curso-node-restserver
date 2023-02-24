const {Router} = require('express');
const {check}= require('express-validator');

const { validateFields } = require('../middlewares/validateFields');
const { validarJWT } = require('../middlewares/validar-jwt');
const { isAdminRole, hasRole } = require('../middlewares/validar-roles');

const { isValidRole,mailExists,existUserById} = require('../helpers/db-validators');
const { usersGet, 
        usersPut, 
        usersPost, 
        usersDelete } = require('../controllers/users.controller');


const router = Router();


router.get('/', usersGet);

router.put('/:id', [
        check('id','No es un id válido').isMongoId(),
        check('id').custom(existUserById),
        check('role').custom((role) => isValidRole(role)),
        validateFields
],usersPut);

router.post('/', [
    check('name','El nombre es obligatorio').not().isEmpty(),
    check('mail','Mail no esta correcto').isEmail(),
    check('mail').custom((mail) => mailExists(mail)),
    check('password','El password es obligatorio y mas de 6 letras').isLength({min:6}),    
    check('role').custom((role) => isValidRole(role)),
    validateFields
],usersPost)

router.delete('/:id',[    
    validarJWT,
    //isAdminRole,
    hasRole('ADMIN_ROLE','VENTAS_ROLE'),
    check('id','No es un id válido').isMongoId(),
    check('id').custom(existUserById),
    validateFields
],usersDelete);

module.exports = router;