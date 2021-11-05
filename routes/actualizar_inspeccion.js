const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar.campos');
const { validarJWT } = require('../middlewares/validatJWT');
const {
    actualizarInspeccion } = require('../controllers/extintor.controller');

const router = Router();


// update usuarios
router.put( '/:nroSerie', 
    [
        validarJWT
    ],
    actualizarInspeccion 
);



module.exports = router;