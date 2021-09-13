const path = require('path');
const fs = require('fs');

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { updateImgCloudinary, updateImgCloudinary2, updateImgCloudinaryPDF } = require("../helpers/updateImg");
//const cloudinary = require('cloudinary');
const cloudinary = require('cloudinary').v2;

//todo SETTING CLOUDINARY
cloudinary.config({ 
    cloud_name: process.env.CLOUD_NAME, 
    api_key: process.env.API_KEY,  
    api_secret: process.env.API_SECRET,  
    shorten: true,
    secure: true
});
const UploadCloud = async(req, res= response) => {
    //*0 EXTRAER PARAMS
    const tipo = req.params.tipo;
    const id = req.params.id;
    //*1 validar tipo
    const tiposValidos = ['empresas', 'extintores', 'usuarios'];
    if(!tiposValidos.includes(tipo)) {
        res.status(400).json({
            ok: false,
            msg: 'no es empresa, extintores, usuarios'
        })
    }
    //*2 existe un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'no hay ningun archivo'
        });
    }
    //*3 procesar archivo o imagen
    const file = req.files.img;
    const nombreCortado = file.name.split('.') // .jpg
    const extensionArchivo = nombreCortado[nombreCortado.length -1];
    //*4 validar extensionArchivo
    const extensionesValidas = ['png', 'jpg', 'jpeg'];
    if(!extensionesValidas.includes(extensionArchivo)){
        return res.status(400).json({
            ok: false,
            msg: 'no hay extension valida'
        });
    }
    //*5 generar nombre
    //const nombreAr = `${uuidv4()}.${extensionArchivo}`;
    //*6 crear path donde guardar img
    //const path = `./uploads/${tipo}/${nombreAr}`;
    //*7 mover la imagen A CLOUDINARY
    let result;
    try {
        if (tipo === 'usuarios') {
            result =  await cloudinary.uploader.upload(file.tempFilePath, 
            {
                folder: tipo,
                public_id: `${Date.now()}`, 
                resource_type: "auto"
            })
        }
        else{
            result =  await cloudinary.uploader.upload(file.tempFilePath, 
            {
                folder: tipo,
                width: 864, height: 576, crop: "scale",
                public_id: `${Date.now()}`, 
                resource_type: "auto"
            })
        }
        //const nombreAr = result.public_id;
        const nombreAr = result.secure_url;
        updateImgCloudinary(tipo, id, nombreAr);
        res.json({
            ok: true,
            nombreAr
        })     
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Algo salio mal' });
    }
    //* end //////////////////////////////////////////////////////////
}
//todo upload cloudinary2
const UploadCloud2 = async(req, res= response) => {
    //*0 EXTRAER PARAMS
    const tipo = req.params.tipo;
    const id = req.params.id;
    //*1 validar tipo
    const tiposValidos = ['empresas', 'extintores', 'usuarios'];
    if(!tiposValidos.includes(tipo)) {
        res.status(400).json({
            ok: false,
            msg: 'no es empresa, extintores, usuarios'
        })
    }
    //*2 existe un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'no hay ningun archivo'
        });
    }

    //*3 procesar archivo o imagen
    const file = req.files.img2;
    const nombreCortado = file.name.split('.') // .jpg
    const extensionArchivo = nombreCortado[nombreCortado.length -1];
    //*4 validar extensionArchivo
    const extensionesValidas = ['png', 'jpg', 'jpeg'];
    if(!extensionesValidas.includes(extensionArchivo)){
        return res.status(400).json({
            ok: false,
            msg: 'no hay extension valida'
        });
    }
    //*5 generar nombre
    //const nombreAr = `${uuidv4()}.${extensionArchivo}`;
    //*6 crear path donde guardar img
    //const path = `./uploads/${tipo}/${nombreAr}`;
    //*7 mover la imagen A CLOUDINARY
    try {
        //console.log(file);
        const result =  await cloudinary.uploader.upload(file.tempFilePath, 
        {
            folder: tipo,
            width: 864, height: 576, crop: "scale",
            public_id: `${Date.now()}`, 
            resource_type: "auto"
        })
        //const nombreAr = result.public_id;
        const nombreAr = result.secure_url;
        updateImgCloudinary2(tipo, id, nombreAr);
        res.json({
            ok: true,
            nombreAr
        })     
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Algo salio mal' });
    }
    //* end //////////////////////////////////////////////////////////
}
//todo PDF INSERT
const UploadCloudPdf = async(req, res= response) => {
    //*0 EXTRAER PARAMS
    const tipo = req.params.tipo;
    const id = req.params.id;
    //*1 validar tipo
    const tiposValidos = ['empresas', 'extintores', 'usuarios'];
    if(!tiposValidos.includes(tipo)) {
        res.status(400).json({
            ok: false,
            msg: 'no es empresa, extintores o usuarios'
        })
    }
    //*2 existe un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'no hay ningun archivo'
        });
    }
    //*3 procesar archivo o imagen
    const file = req.files.pdf;
    const nombreCortado = file.name.split('.') // .jpg
    const extensionArchivo = nombreCortado[nombreCortado.length -1];
    //*4 validar extensionArchivo
    const extensionesValidas = ['png', 'jpg', 'jpeg', 'pdf'];
    if(!extensionesValidas.includes(extensionArchivo)){
        return res.status(400).json({
            ok: false,
            msg: 'no hay extension valida'
        });
    }
    //*5 generar nombre
    //const nombreAr = `${uuidv4()}.${extensionArchivo}`;
    //*6 crear path donde guardar img
    //const path = `./uploads/${tipo}/${nombreAr}`;
    //*7 mover la imagen A CLOUDINARY
    try {
        const result = await cloudinary.uploader.upload(file.tempFilePath, 
        { 
            folder: tipo, 
            public_id: `${Date.now()}`, 
            resource_type: "auto"
        });
        //console.log(result);
        const nombreAr = result.secure_url;
        updateImgCloudinaryPDF(tipo, id, nombreAr);
        res.json({
            ok: true,
            nombreAr
        })     
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Algo salio mal' });
    }
    //* end //////////////////////////////////////////////////////////
}
const retornaImg = (req, res = response) =>{
    const tipo = req.params.tipo;
    const foto = req.params.foto;
    
    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);
    
    //img default
    if(fs.existsSync(pathImg)){
        res.sendFile(pathImg)
    }
    else{
        const pathImg = path.join(__dirname, `../uploads/no_imagen.png`);
        res.sendFile(pathImg)
    }
}
const retornaImgCloudinary = (req, res = response) =>{
    const tipo = req.params.tipo;
    const foto = req.params.foto;
    const public_id = `${tipo}/${foto}`;
    //console.log(public_id);
    cloudinary.search
    .expression(public_id)
    .execute().then(result=>{
        if (result.total_count === 0) {
            const pathImg = path.join(__dirname, `../uploads/no_imagen.png`);
            res.sendFile(pathImg)      
        }
        else{
            //console.log(result.resources[0].url)
            res.json({
                ok: true,
                img: result.resources[0].url
            })
        }
    });        
}
module.exports = {
    retornaImg,
    UploadCloud,
    UploadCloud2,
    retornaImgCloudinary,
    UploadCloudPdf
}
