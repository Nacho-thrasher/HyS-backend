
/* /api/empresas */

const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar.campos');
const { validarJWT } = require('../middlewares/validatJWT');
const {
    getEmpresas,
    crearEmpresas,
    actualizarEmpresas,
    borrarEmpresas,
    getEmpresaById,
    getEmpresaByNombre } = require('../controllers/empresas.controller');
    
    const router = Router();
    
    router.get( '/:empresaNombre',  getEmpresaByNombre);
    
    
module.exports = router;