/* ruta api/usuarios */
const { Router } = require('express');
const { check } = require('express-validator')
const { getUsuarios, crearUsuarios, actualizarUsuarios, borrarUsuario, getUsuarioById, getAllUsuarios } = require('../controllers/usuario.controller');
const { validarCampos } = require('../middlewares/validar.campos');
const { validarJWT, validarADMIN_ROLE, validarADMIN_ROLE_o_MiUsuario } = require('../middlewares/validatJWT');

const router = Router();

//? devolver usuarios
//router.get( '/', validarJWT, getUsuarios )

//* todos los usuarios
router.get( '/', validarJWT, getAllUsuarios )

// crear Usuarios
router.post('/', 
    [
        check('nombre', 'el nombre es obligatorio').not().isEmpty(),
        check('password', 'el password es obligatorio').not().isEmpty(),
        check('email', 'el email es obligatorio').isEmail(),
        validarCampos
    ], 
    crearUsuarios
    );
// update usuarios
router.put( '/:id', [
        validarJWT,
        validarADMIN_ROLE_o_MiUsuario,
        check('nombre', 'el nombre es obligatorio').not().isEmpty(),
        check('email', 'el email es obligatorio').isEmail(),
        check('role', 'el role es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarUsuarios 
);

//obtener 1 usuario
router.get( '/:id',  getUsuarioById);

//todo borrar usuario
router.delete( '/:id', [validarJWT,validarADMIN_ROLE],borrarUsuario);

module.exports = router;