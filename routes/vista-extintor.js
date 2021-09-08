/* /api/empresas */

const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar.campos');
const { validarJWT } = require('../middlewares/validatJWT');
const { getExtintorByNumSerie, getExtintorByIdExt } = require('../controllers/vista-extintor.controller');

const router = Router();


//obtener 1 extintor
//router.get( '/:numSerie', validarJWT, getExtintorByNumSerie);
// NUEVO METODO
router.get( '/:id_ext', getExtintorByIdExt);

module.exports = router;