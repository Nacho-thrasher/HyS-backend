/* /api/vista-empresas */
const { Router } = require('express');
const { check } = require('express-validator')
const { validarCampos } = require('../middlewares/validar.campos');
const { validarJWT } = require('../middlewares/validatJWT');
const { getVistaEmpresas, getExtintoresByEmpresa } = require('../controllers/vista-empresas.controller');

const router = Router();

// devolver usuarios
router.get( '/', getVistaEmpresas )

//obtener extintores por empresa
router.get( '/:id', getExtintoresByEmpresa);


module.exports = router;