const { response} = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const { getMenuFrontEnd } = require('../helpers/menu-frontend')

const login = async (req, res = response) =>{
    
    const {email, password} = req.body;
    try {
        //VERIFICAR EMAIL
        const usuarioDB = await Usuario.findOne({email});

        if(!usuarioDB){
            return res.status(404).json({
                ok: false,
                msg: 'email no validos'
            })
        }
        
        // CONTRASENIA
        const validPassword = bcrypt.compareSync(password, usuarioDB.password)
        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'contrasenia no valida'
            })
        }
        //GENERAR TOKEN
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token,
            menu: getMenuFrontEnd(usuarioDB.role)
        })
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'error en login'
        })
    }
}

const googleSignIn = async(req, res = response)=>{
    
    const googleToken = req.body.token;

    try {
        
        const {name, email, picture} = await googleVerify(googleToken);

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;
        if(!usuarioDB){
            //sino existe user
            usuario = new Usuario({
                nombre: name, 
                email,
                password: '@@@',
                img: picture,
                google: true
            })
        }
        else{
            // existe usuario
            usuario = usuarioDB;
            usuario.google = true;
        }
        //guardar en bd
        await usuario.save();

        //GENERAR TOKEN
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            token,
            menu: getMenuFrontEnd(usuario.role)
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'token no correcto'
        })
    }

}

const renewToken = async(req, res = response) => {
    
    const uid = req.uid;
    //GENERAR TOKEN
    const token = await generarJWT(uid);

    //Devolver usuario
    const usuario = await Usuario.findById(uid);   

    res.json({
        ok : true,
        token,
        usuario,
        menu: getMenuFrontEnd(usuario.role)
    })
}

module.exports = {
    login,
    googleSignIn,
    renewToken
}