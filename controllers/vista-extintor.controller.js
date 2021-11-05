const { response } = require("express");
const Empresa = require("../models/empresa");
const Extintor = require("../models/extintor");

const getExtintorByNumSerie = async(req, res = response) => {

    const numS = req.params.numSerie;
    try {
        const extintores = await Extintor.find({ numeroSerie: numS })
        .populate('empresa', 'nombre nroExtintores direccion localidad img')
        .populate('usuario', 'nombre img'); 
        
        const extintor = extintores[0];

        res.json({
            ok: true,
            extintor
        })

    }  catch (error) {
        res.json({
          ok: false,
          msg: "no existe extintor",
        });
    }
}
const getExtintorByIdExt = async(req, res = response) => {

    const id = req.params.id_ext;
    //split obtener id
    try {
        let extintor = await Extintor.find({ identificadorSysExt: id })
        .populate('empresa', 'nombre nroExtintores direccion localidad img')
        .populate('usuario', 'nombre img'); 
        extintor = extintor[0];
        //console.log(extintor._id)
        res.json({
            ok: true,
            extintor
        })
        
        
    } catch (error) {
        res.json({
            ok: false,
            msg: 'error no existe extintor'
        })
    }    
}

const verificar_repetido = async(req, res = response) => {

    const id = req.params.id_ext;
    try {
        let extintor = await Extintor.find({ identificadorSysExt: id });
        extintor = extintor[0].identificadorSysExt;
        res.json({
            ok: true,
            extintor
        })
    } catch (error) {
        res.json({
            ok: false,
            msg: 'error no existe extintor'
        })
    }    
}

module.exports = {
    getExtintorByNumSerie,
    getExtintorByIdExt,
    verificar_repetido
};
