const { Schema, model } = require('mongoose');

const EmpresaSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    img: {
        type: String
    },
    direccion: {
        type: String
    },
    localidad: {
        type: String
    },
    nroExtintores: {
        type: String
    },
    // sucursales agregar
    usuario:{
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    }
}, { collection: 'Empresas'});

EmpresaSchema.method('toJSON', function(){
   const { __v, ...object } = this.toObject();
   return object;

})

module.exports = model('Empresa', EmpresaSchema);
