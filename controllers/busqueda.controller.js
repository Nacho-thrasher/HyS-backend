// get todo
const {response} = require('express');
const Usuario = require('../models/usuario');
const Empresa = require('../models/empresa');
const Extintor = require('../models/extintor');


const getTodo = async(req, res = response) => {
    
    const busqueda = req.params.busqueda;
    const regexp = new RegExp(busqueda, 'i');
    //paginar usar populate!!!
    const [ usuarios, empresas, extintores ] = await Promise.all([
        Usuario.find({ nombre: regexp }),
        Empresa.find({ nombre: regexp }),
        Extintor.find({ numeroSerie: regexp}).populate('empresa', 'nombre')
        // *definir lo q quiero buscar aqui con populate wn
    ]);

    res.json({
        ok: true,
        usuarios,
        empresas,
        extintores
    });
}

const getColeccion = async(req, res = response) => {
    
    const tabla = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regexp = new RegExp(busqueda, 'i');
    
    let data = [];

    switch (tabla) {
        case 'extintores':
            data = await Extintor.find({ numeroSerie: regexp })    
            .populate('empresa', 'nombre')
            .populate('usuario', 'nombre');

            break;
    
        case 'empresas':
            data = await Empresa.find({ nombre: regexp })
            .populate('usuario', 'nombre');

            break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regexp });            
            break;

        default:
            return res.status(400).json({
                ok:false,
                msg: 'la tabla tiene que ser usuarios/empresas/extintores'
            });
    
    }
    res.json({
        ok: true,
        resultados: data
    })
    
}

module.exports = {
    getTodo,
    getColeccion,
}
