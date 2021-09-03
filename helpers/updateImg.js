const fs = require('fs');

const Usuario = require('../models/usuario');
const Empresa = require('../models/empresa');
const Extintor = require('../models/extintor');

const cloudinary = require('cloudinary').v2;

//todo SETTING CLOUDINARY
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY,  
    api_secret: process.env.API_SECRET,  
    shorten: true,
    secure: true
});

const deleteImgCloudinary = (path) => {

    const myArr = path.split("/");
    const imagen = myArr[myArr.length -1];
    const nombreImg = imagen.split(".", 1);
    const carpeta = myArr[myArr.length -2];
    const public_id = `${carpeta}/${nombreImg}`

    cloudinary.uploader.destroy(public_id, function(error,result) {
        //console.log(result, error);
    });
}
const updateImgCloudinary = async(tipo, id, nombreAr)=>{
    let pathViejo = '';
    //*0 Buscar imagen en database para el usuario
    switch (tipo) {
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if(!usuario){
                return false;
            }
            if(usuario.img != undefined){
                pathViejo = `${usuario.img}`;    
                deleteImgCloudinary(pathViejo);
            }
            usuario.img = nombreAr;
            await usuario.save();
            return true;

            break;
        
        case 'empresas':
            const empresa = await Empresa.findById(id);
            if(!empresa){
                return false;
            }
            if(empresa.img != undefined){
                pathViejo = `${empresa.img}`;    
                deleteImgCloudinary(pathViejo);
            }
            empresa.img = nombreAr;
            await empresa.save();
            return true;
        
            break;
        
        case 'extintores':
            const extintor = await Extintor.findById(id);
            if(!extintor){
                return false;
            }
            if(extintor.img != undefined){
                pathViejo = `${extintor.img}`;    
                deleteImgCloudinary(pathViejo);
            }
            extintor.img = nombreAr;
            await extintor.save();
            return true;
        
            break;
    }    
}
const updateImgCloudinary2 = async(tipo, id, nombreAr)=>{
    let pathViejo = '';
    //*0 Buscar imagen en database para el usuario
    switch (tipo) {
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if(!usuario){
                return false;
            }
            if(usuario.img2 != undefined){
                pathViejo = `${usuario.img2}`;    
                deleteImgCloudinary(pathViejo);
            }

            usuario.img2 = nombreAr;
            await usuario.save();
            return true;

            break; 
        
        case 'empresas':
            const empresa = await Empresa.findById(id);
            if(!empresa){
                return false;
            }
            if(empresa.img2 != undefined){
                pathViejo = `${empresa.img2}`;    
                deleteImgCloudinary(pathViejo);
            }
            empresa.img2 = nombreAr;
            await empresa.save();
            return true;
        
            break;
        
        case 'extintores':
            const extintor = await Extintor.findById(id);
            if(!extintor){
                return false;
            }
            if(extintor.img2 != undefined){
                pathViejo = `${extintor.img2}`;    
                deleteImgCloudinary(pathViejo);
            }
            extintor.img2 = nombreAr;
            await extintor.save();
            return true;
        
            break;
    }    
}
//updateImgCloudinaryPDF
const updateImgCloudinaryPDF = async(tipo, id, nombreAr)=>{
    let pathViejo = '';
    //*0 Buscar imagen en database para el usuario
    switch (tipo) {
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if(!usuario){
                return false;
            }
            if(usuario.pdf != undefined){
                pathViejo = `${usuario.pdf}`;    
                deleteImgCloudinary(pathViejo);
            }

            usuario.pdf = nombreAr;
            await usuario.save();
            return true;

            break; 
        
        case 'empresas':
            const empresa = await Empresa.findById(id);
            if(!empresa){
                return false;
            }
            if(empresa.pdf != undefined){
                pathViejo = `${empresa.pdf}`;    
                deleteImgCloudinary(pathViejo);
            }
            empresa.pdf = nombreAr;
            await empresa.save();
            return true;
        
            break;
        
        case 'extintores':
            const extintor = await Extintor.findById(id);
            if(!extintor){
                return false;
            }
            if(extintor.pdf != undefined){
                pathViejo = `${extintor.pdf}`;    
                deleteImgCloudinary(pathViejo);
            }
            extintor.pdf = nombreAr;
            await extintor.save();
            return true;
        
            break;
    }    
}
module.exports = {
    updateImgCloudinary,
    updateImgCloudinary2,
    updateImgCloudinaryPDF
}