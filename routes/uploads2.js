//  api/uploads/usuarios/12

const expressfileUpload = require('express-fileupload');
const { Router } = require('express');
const { fileUpload2, retornaImg } = require('../controllers/upload.controller');
const { validarJWT } = require('../middlewares/validatJWT');

const router = Router();

// default options
router.use(expressfileUpload());

router.put('/:tipo/:id', 
    [
        validarJWT
    ], 
    fileUpload2
);

router.get('/:tipo/:foto',     
    retornaImg
);

module.exports = router;
