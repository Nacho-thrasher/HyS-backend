const { response } = require('express');
const bcrypt = require('bcryptjs')
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req,res)=>{
    
    const desde = Number(req.query.desde) || 0;
    // destructuracion investigar
    const [ usuarios, total ] = await Promise.all([
        Usuario.find({}, 'nombre email google role img')
        .skip(desde)
        .limit(5),

        Usuario.countDocuments()
    ]);

    res.json({
        ok: true,
        usuarios,
        total
        //uid: req.uid
    })
}

const crearUsuarios = async (req, res = response)=>{

    const {
        email, password, nombre
    } = req.body;

    try {
        const existeEmail = await Usuario.findOne({email})
        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'este correo ya existe'
            })
        }
        const usuario = new Usuario( req.body );
        //encriptar password
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // guardar usuario
        await usuario.save();

        //GENERAR TOKEN
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        })

    } catch (error) {

        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado'
        })

    }

    
}

const actualizarUsuarios = async (req, res = response) => {
    
    const uid = req.params.id;
    try {
        //todo validar token y comprobars si es usuario corr
       
        const usuarioDb = await Usuario.findById(uid)

        if(!usuarioDb){
            return res.status(404).json({
                ok: false, 
                msg: 'no existe usuario para este id'
            })
        }
        //actualizacion, destructuracion
        const { password, google, email, ...campos} = req.body;
        
        if(usuarioDb.email !== email){
           
            const existeEmail = await Usuario.findOne({email})
            if(existeEmail){
                return res.status(400).json({
                    ok: false, 
                    msg: 'ya existe usuario con ese email'
                })
            }
        }

        if (!usuarioDb.google) {    
            campos.email = email;
        }
        else if(usuarioDb.email != email){
            return res.status(400),json({
                ok: false,
                msg: 'usuario de google no puede cambiar su correo'
            })
        }
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new: true });
        
        res.json({
            ok: true,
            usuarioActualizado
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado upd'
        })
    }
}

const borrarUsuario = async(req, res = response) =>{
    const uid = req.params.id;
    try {
        const usuarios = await Usuario.findById(uid);
        if(!usuarios){
            return res.status(404).json({
                ok: false, 
                msg: 'no existe usuario para este id',
                uid
            })
        }
        await Usuario.findByIdAndDelete(uid);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'error inesperado'
        })
    }
    
}

module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuarios,
    borrarUsuario,
}