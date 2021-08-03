const { Schema, model } = require('mongoose');

const ExtintorSchema = Schema({
    //identicacion
    numeroSerie: {
        type: String,
        require: true,
        unique: true,
    },
    marca: {
        type: String,
        require: true
    },
    agenteExtintor: {
        type: String,
        require: true,
        //unique: true
    },
    capacidad: {
        type: String,
        require: true,
    },
    numeroB_Veritas: {
        type: String,
        require: true,
    },
    vtoPh: {
        //fecha
        type: Date,
        require: true,
    },
    fechaFabricacion: {
        type: Date,
        require: true,
    },
    proxRecarga: {
        type: String,
        require: true,
    },
    img: {
        type: String
    },
    //referencia a empresa
    empresa: {
        type: Schema.Types.ObjectId,
        ref: 'Empresa'
    },
    usuario:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
    // + agente extintor
    // + tareas realizadas
    // estampilla
}, { collection: 'Extintores'});

ExtintorSchema.method('toJSON', function(){
   const { __v, ...object } = this.toObject();
   return object;
})

module.exports = model('Extintor', ExtintorSchema);
