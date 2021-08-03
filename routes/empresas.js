/* /api/empresas */

const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar.campos');
const { validarJWT } = require('../middlewares/validatJWT');
const {
    getEmpresas,
    crearEmpresas,
    actualizarEmpresas,
    borrarEmpresas } = require('../controllers/empresas.controller');

const router = Router();

// devolver usuarios
router.get( '/', getEmpresas )
// crear getUsuarios
router.post('/', 
    [
        validarJWT,
        check('nombre','El nombre de la empresa es necesario').not().isEmpty(),
        validarCampos,
    ], 
    crearEmpresas
    );
// update usuarios
router.put( '/:id', 
    [
        validarJWT,
        check('nombre','El nombre de la empresa es necesario').not().isEmpty(),
        validarCampos
    ],
    actualizarEmpresas 
);
//borrar usuario
router.delete( '/:id', validarJWT, borrarEmpresas);


module.exports = router;