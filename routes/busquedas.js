/// api/todo/: busqueda
const { Router } = require('express');
const {getTodo, getColeccion} = require('../controllers/busqueda.controller');
const { validarJWT } = require('../middlewares/validatJWT');

const router = Router();

router.get('/:busqueda', 
    [
        validarJWT
    ], 
    getTodo
);
router.get('/coleccion/:tabla/:busqueda', 
    [
        validarJWT
    ], 
    getColeccion
);



module.exports = router;
