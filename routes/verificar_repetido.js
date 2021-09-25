/* /api/empresas */

const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar.campos');
const { validarJWT } = require('../middlewares/validatJWT');
const { verificar_repetido } = require('../controllers/vista-extintor.controller');

const router = Router();

router.get( '/:id_ext', verificar_repetido);

module.exports = router;