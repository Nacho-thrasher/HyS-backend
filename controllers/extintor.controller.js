const {response} = require('express');
const Extintor = require('../models/extintor');

const getExtintores = async(req, res = response) => {

    const extintores = await Extintor.find()
    .populate('empresa', 'nombre nroExtintores')
    .populate('usuario', 'nombre'); 
    res.json({
        ok: true,
        extintores
    })

}

const crearExtintores = async(req, res = response) => {
    const uid = req.uid;
    const extintor = new Extintor({
        usuario: uid,
        ...req.body,
    })

    
    try {
        const extintorDB = await extintor.save();
        res.json({
            ok: true,
            extintor: extintorDB,
            numS: req.body.numeroSerie
        })   
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'error habla con el admin' + error.message
        })
    }
    
}
const actualizarExtintores = async(req, res = response) => {

    const id = req.params.id;
    const uid = req.uid;

    try {
        const extintorDB = await Extintor.findById(id);
        if(!extintorDB){
            return res.status(404).json({
                ok:false,
                msg: 'extintor no encontrado'
            })    
        }
        const cambiosExtintor = {
            ...req.body,
            usuario:  uid
        }
        
        const extintorActualizado = await Extintor.findByIdAndUpdate(id, cambiosExtintor, {new: true});
        res.json({
            ok: true,
            extintorActualizado
        })
        
    } 
    catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'error en actualizar'
        })
    }
    
}
const borrarExtintores = async(req, res = response) => {

    const id = req.params.id;
    try {
        const extintores = await Extintor.findById(id);
        if(!extintores){
            return res.status(404).json({
                ok: false, 
                msg: 'no existe extintor para este id',
                id
            })
        }

        await Extintor.findByIdAndDelete(id);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            ok: false,
            msg: 'error intentar eliminar'
        })
    }
}

const getExtintorById = async(req, res = response) => {

    const id = req.params.id;

    try {
        
        const extintores = await Extintor.findById(id)
        .populate('empresa usuario', 'nombre img'); 
        res.json({
            ok: true,
            extintores
        })

    } catch (error) {
        res.json({
            ok: false,
            msg: 'error no se encontro Extintor'
        })
    }
    
}

const actualizarInspeccion = async(req, res = response) => {

    const nroSerie = req.params.nroSerie;
    const uid = req.uid;

    try {

        let extintorDB = await Extintor.find({numeroSerie: nroSerie});
        
        //? existe?
        if(!extintorDB){
            return res.status(404).json({
                ok:false,
                msg: 'extintor no encontrado'
            })    
        }

        extintorDB = extintorDB[0];
        let idExt = extintorDB._id;

        const cambiosExtintor = {
            ...req.body,
            usuario:  uid
        }
        
        const extintorActualizado = await Extintor.findByIdAndUpdate(
            idExt,
            cambiosExtintor, 
            {new: true}
        );
        
        res.json({
            ok: true,
            extintorActualizado
        })
        
    } 
    catch (error) {
        res.status(500).json({
            ok:false,
            msg: 'error en actualizar'
        })
    }
    
}

module.exports = {
    getExtintores,
    crearExtintores,
    actualizarExtintores,
    borrarExtintores,
    getExtintorById,
    actualizarInspeccion
}