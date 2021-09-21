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

const getAllUsuarios = async(req, res = response) => {

    const usuarios = await Usuario.find(); 
    
    res.json({
        ok: true,
        usuarios
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
        //todo realizar cambio de password
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
        //* busco mi usuario por id para comparar
        const usuarioDb = await Usuario.findById(uid)
        //* existe ?
        if(!usuarioDb){
            return res.status(404).json({
                ok: false, 
                msg: 'no existe usuario para este id'
            })
        }
        //todo actualizacion, destructuracion de campos q mande front 
        //* aqui los campos q no quiero mandar antes desp los q mando
        const { google, email, ...campos} = req.body;
        //* si el email no coincide con el q mande no entra        
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
        //* encriptar password
        
        if(campos.password !== undefined){
            const salt = bcrypt.genSaltSync();
            campos.password = bcrypt.hashSync(campos.password, salt);
        }
        //todo realizar cambio de password
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
//actualizarUsuariosAdm
const actualizarUsuariosAdm = async (req, res = response) => {
    
    const uid = req.params.uid;
    try {
        //* busco usuario por id para comparar
        const usuarioDb = await Usuario.findById(uid)
        //* existe ?
        if(!usuarioDb){
            return res.status(404).json({
                ok: false, 
                msg: 'no existe usuario para este id'
            })
        }
        //todo actualizacion, destructuracion de campos q mande front 
        //* aqui los campos q no quiero mandar antes desp los q mando
        const { google, email, ...campos} = req.body;
        
        if (!usuarioDb.google) {    
            campos.email = email;
        }
        else if(usuarioDb.email != email){
            return res.status(400),json({
                ok: false,
                msg: 'usuario de google no puede cambiar su correo'
            })
        }
        //* encriptar password
        console.log(campos.password)
        if(campos.password !== undefined){
            const salt = bcrypt.genSaltSync();
            campos.password = bcrypt.hashSync(campos.password, salt);
        }
        //todo realizar cambio de password
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

const getUsuarioById = async(req, res = response) => {

    const id = req.params.id;
    try {    
        const usuarios = await Usuario.findById(id); 
        res.json({
            ok: true,
            usuarios
        })

    } catch (error) {
        console.error(error);
        res.json({
            ok: true,
            msg: 'error en actualizar'
        })
    }

}

module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuarios,
    borrarUsuario,
    getUsuarioById,
    getAllUsuarios,
    actualizarUsuariosAdm
}