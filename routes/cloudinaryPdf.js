//UploadCloud
const expressfileUpload = require('express-fileupload');
const { Router } = require('express');
const { UploadCloudPdf } = require('../controllers/upload.controller');
const { validarJWT } = require('../middlewares/validatJWT');

const router = Router();

// default options
router.use(expressfileUpload({useTempFiles: true}));

router.put('/:tipo/:id', 
    [
        validarJWT
    ], 
    UploadCloudPdf
);

module.exports = router;
