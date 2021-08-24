/* /api/empresas */

const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar.campos');
const { validarJWT } = require('../middlewares/validatJWT');
const {
    getExtintores,
    crearExtintores,
    actualizarExtintores,
    borrarExtintores,
    getExtintorById } = require('../controllers/extintor.controller');

const router = Router();

// devolver usuarios
router.get( '/', validarJWT, getExtintores )
// crear getUsuarios
router.post('/', 
    [
        validarJWT,
        check('numeroSerie','El numero de Serie es necesario').not().isEmpty(),
        check('empresa','El id de empresa debe ser valido').isMongoId(),
        validarCampos,
    ], 
    crearExtintores
);

// update usuarios
router.put( '/:id', 
    [
        validarJWT,
        check('numeroSerie','El numero de Serie es necesario').not().isEmpty(),
        check('empresa','El id de empresa debe ser valido').isMongoId(),
        validarCampos
    ],
    actualizarExtintores 
);

//borrar usuario
router.delete( '/:id', validarJWT, borrarExtintores);

//obtener 1 extintor
router.get( '/:id', validarJWT, getExtintorById);




module.exports = router;