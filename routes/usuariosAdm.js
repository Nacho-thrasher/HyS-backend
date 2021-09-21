/* ruta api/usuarios */
const { Router } = require('express');
const { check } = require('express-validator')
const { getUsuarios, crearUsuarios, actualizarUsuariosAdm, borrarUsuario, getUsuarioById, getAllUsuarios } = require('../controllers/usuario.controller');
const { validarCampos } = require('../middlewares/validar.campos');
const { validarJWT, validarADMIN_ROLE } = require('../middlewares/validatJWT');

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
router.put( '/:uid', [
        validarJWT,
        validarADMIN_ROLE,
        check('nombre', 'el nombre es obligatorio').not().isEmpty(),
        check('email', 'el email es obligatorio').isEmail(),
        check('role', 'el role es obligatorio').not().isEmpty(),
        validarCampos
    ],
    actualizarUsuariosAdm 
);

//obtener 1 usuario
router.get( '/:id',  getUsuarioById);

//todo borrar usuario
router.delete( '/:id', [validarJWT,validarADMIN_ROLE],borrarUsuario);

module.exports = router;