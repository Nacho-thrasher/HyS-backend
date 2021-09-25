const { response } = require('express');
const Empresa = require('../models/empresa');

const getEmpresas = async(req, res = response) => {

    const empresas = await Empresa.find()
    .populate('usuario', 'nombre') ;
    res.json({
        ok: true,
        empresas
    })

}
const crearEmpresas = async(req, res = response) => {

    const uid = req.uid;
    const empresa = new Empresa(
    {
        usuario: uid,
        ...req.body
    });
    // req para extraer
    try {
        const empresaDB = await empresa.save();

        res.json({
            ok: true,
            empresa: empresaDB,
        })
                
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el admin'
        })
        
    }

}
const actualizarEmpresas = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {
        const empresaDB = await Empresa.findById(id);
        if(!empresaDB){
            return res.status(404).json({
                ok:false,
                msg: 'empresa no encontrada'
            })    
        }
        const cambiosEmpresa = {
            ...req.body,
            usuario:  uid
        }
        
        const empresaActualizado = await Empresa.findByIdAndUpdate(id, cambiosEmpresa, {new: true});
        res.json({
            ok: true,
            empresaActualizado
        })
    } 
    catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'error en actualizar'
        })
    }
    
}
const borrarEmpresas = async(req, res = response) => {

    const id = req.params.id;
    try {
        const empresaDB = await Empresa.findById(id);
        if(!empresaDB){
            return res.status(404).json({
                ok:false,
                msg: 'empresa no encontrada'
            })    
        } 
        await Empresa.findByIdAndDelete(id);
    } 
    catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'error en eliminar empresa'
        })
    }
}

const getEmpresaById = async(req, res = response) => {

    const id = req.params.id;
    try {    
        const empresas = await Empresa.findById(id); 
        res.json({
            ok: true,
            empresas
        })

    } catch (error) {
        console.error(error);
        res.json({
            ok: false,
            msg: 'error en actualizar'
        })
    }

}

const getEmpresaByNombre = async(req, res = response) => {

    const nombreEmp = req.params.empresaNombre;
    const empresaNoSpace = nombreEmp.replace(/_/g, " ");
    try {    
        const empresas = await Empresa.find({ nombre: empresaNoSpace });
        const empresaId = empresas[0]._id;
        res.json({
            ok: true,
            empresaId
        })

    } catch (error) {
        console.error(error);
        res.json({
            ok: false,
            msg: 'error en buscar empresa'
        })
    }

}

module.exports = {
    getEmpresas,
    crearEmpresas,
    actualizarEmpresas,
    borrarEmpresas,
    getEmpresaById,
    getEmpresaByNombre
}