/* api/login */
const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn, renewToken } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar.campos');
const { validarJWT } = require('../middlewares/validatJWT');


const router = Router();

router.post('/', 
        [
          check('email', 'el email es obligatorio').isEmail(),
          check('password', 'password es obligatorio').not().isEmpty(),
          validarCampos
        ],
        login
);

router.post('/google', 
        [
          check('token', 'token es obligatorio').not().isEmpty(),
          validarCampos
        ],
        googleSignIn
);

router.get('/renew', 
        validarJWT,
        renewToken
)


module.exports = router;