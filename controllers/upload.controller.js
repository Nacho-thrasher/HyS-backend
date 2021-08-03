const path = require('path');
const fs = require('fs');

const { response } = require("express");
const { v4: uuidv4 } = require('uuid');
const { updateImage } = require("../helpers/updateImg");


const fileUpload = (req, res= response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    const tiposValidos = ['empresas', 'extintores', 'usuarios'];
    if(!tiposValidos.includes(tipo)) {
        res.status(400).json({
            ok: false,
            msg: 'no es empresa, extintores, usuarios'
        })
    }

    //existe un archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            msg: 'no hay ningun archivo'
        });
    }

    //procesar archivo o imagen
    const file = req.files.img;
    const nombreCortado = file.name.split('.') // .jpg
    const extensionArchivo = nombreCortado[nombreCortado.length -1];

    //validar extensionArchivo
    const extensionesValidas = ['png', 'jpg', 'jpeg'];
    if(!extensionesValidas.includes(extensionArchivo)){
        return res.status(400).json({
            ok: false,
            msg: 'no hay extension valida'
        });
    }

    //generar nombre
    const nombreAr = `${uuidv4()}.${extensionArchivo}`;

    //crear path donde guardar img
    const path = `./uploads/${tipo}/${nombreAr}`;

    //mover la imagen
    file.mv(path, (err) =>{
        if (err){
            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'error al mover img'
            })
        }

        // actualizar base de datos
        updateImage(tipo, id, nombreAr );

        res.json({
            ok: true,
            msg: 'archivos subido',
            nombreAr
        })
    });

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

module.exports = {
    fileUpload,
    retornaImg
}
