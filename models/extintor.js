const { Schema, model } = require('mongoose');

const ExtintorSchema = Schema({
    //todo importante
    numeroSerie: {
        type: String,
        require: true
    },
    //? id ext sigex para el qr y modificar crudd
    identificadorSysExt: {
        //elemento id
        type: String,
        require: true
    },
    agenteExtintor: {
        type: String,
        require: true,
    },
    capacidad: {
        type: String,
        require: true,
    },
    //todo fin importante
    marca: {
        type: String,
        require: true
    },
    fechaFabricacion: {
        type: String,
        require: true,
    },
    proxRecarga: {
        //vto carga
        type: String,
        require: true,
    },
    //* otros inicio
    fuph:{
        type: String,
        require: true,
    },
    vtoCarga:{
        type: String,
        require: true,
    },
    vtoPh: {
        //fecha
        type: String,
        require: true,
    },
    ff: {
        type: String,
        require: true,
    },
    sucursal: {
        type: String,
        require: true,
    },
    //* fin otros
    reposiciones: {
        //fecha
        type: String,
        require: true,
    },
    cambio: {
        type: String,
        require: true,
    },
    cantidadKg: {
        //agente ext
        type: String,
        require: true,
    },    
    discoSeg: {
        type: String,
        require: true,
    },
    manija: {
        type: String,
        require: true,
    },
    calco: {
        type: String,
        require: true,
    },
    ruedas: {
        type: String,
        require: true,
    },
    manguera: {
        type: String,
        require: true,
    },
    tobera: {
        type: String,
        require: true,
    },
    trabaS: {
        type: String,
        require: true,
    },
    oring: {
        type: String,
        require: true,
    },
    valvula: {
        type: String,
        require: true,
    },
    vastago: {
        type: String,
        require: true,
    },
    manometro: {
        type: String,
        require: true,
    },
    canioP: {
        type: String,
        require: true,
    },
    pintura: {
        type: String,
        require: true,
    },
    soporte: {
        type: String,
        require: true,
    },
    //*==
    ph: {
        type: String,
        require: true,
    },
    estampilla: {
        //estampilla
        type: String,
        require: true,
    },
    img: {
        type: String
    },
    img2: {
        type: String
    },
    //* planilla de control
    zona: {
        type: String
    },
    numInterno:{
        type: String,
    },
    acceso:{
        type: String,
    },
    demarcado:{
        type: String,
    },
    estadoManometro:{
        type: String,
    },
    estadoPintura:{
        type: String,
    },
    estadoChapaBaliza:{
        type: String,
    },
    estadoManija:{
        type: String,
    },
    retiroPorMant:{
        type: String,
    },
    sustituto:{
        type: String,
    },
    numeroSustituto:{
        type: String,
    },
    observacion:{
        type: String,
    },
    cliente:{
        type: String,
    },
    pdf:{
        type: String,
    },
    //todo NUEVAS VARIABLES
    fecha:{
        //fecha inspeccion
        type: String,
    },
    cumple:{
        //estado de inspeccion si cumple o no
        type: String,
    },

    equipo_usado:{
        type: String,
    },
    equipo_despresurizado:{
        type: String,
    },
    falta_tarjeta:{
        type: String,
    },
    precinto:{
        type: String,
    },
    altura:{
        type: String,
    },
    senializacion_altura:{
        type: String,
    },
    senializacion_chapa:{
        type: String,
    },
    carro_defectuoso:{
        type: String,
    },
    ruptura:{
        type: String,
    },
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

//----------------------------------------------------------------
