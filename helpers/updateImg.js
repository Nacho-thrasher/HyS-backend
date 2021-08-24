const fs = require('fs');

const Usuario = require('../models/usuario');
const Empresa = require('../models/empresa');
const Extintor = require('../models/extintor');

const borrarImg = (path) => {
    if(fs.existsSync(path)){
        //borrar img anterior 
        fs.unlinkSync(path);
    }
}

const updateImage = async(tipo, id, nombreAr )=>{

    let pathViejo = '';
    switch (tipo) {
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if(!usuario){
                return false;
            }
            pathViejo = `./uploads/usuarios/${usuario.img}`;    
            borrarImg(pathViejo);
            
            usuario.img = nombreAr;
            await usuario.save();
            return true;

            break;
        
        case 'empresas':
            const empresa = await Empresa.findById(id);
            if(!empresa){
                return false;
            }
            pathViejo = `./uploads/empresas/${empresa.img}`;    
            borrarImg(pathViejo);
            
            empresa.img = nombreAr;
            await empresa.save();
            return true;
        
            break;
        
        case 'extintores':
            const extintor = await Extintor.findById(id);
            if(!extintor){
                return false;
            }
            pathViejo = `./uploads/extintores/${extintor.img}`;    
            borrarImg(pathViejo);

            extintor.img = nombreAr;
            
            await extintor.save();
            return true;
        
            break;
    }    

}
const updateImage2 = async(tipo, id, nombreAr )=>{

    let pathViejo = '';
    switch (tipo) {
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if(!usuario){
                return false;
            }
            pathViejo = `./uploads/usuarios/${usuario.img}`;    
            borrarImg(pathViejo);
            
            usuario.img2 = nombreAr;
            await usuario.save();
            return true;

            break;
        
        case 'empresas':
            const empresa = await Empresa.findById(id);
            if(!empresa){
                return false;
            }
            pathViejo = `./uploads/empresas/${empresa.img}`;    
            borrarImg(pathViejo);
            
            empresa.img2 = nombreAr;
            await empresa.save();
            return true;
        
            break;
        
        case 'extintores':
            const extintor = await Extintor.findById(id);
            if(!extintor){
                return false;
            }
            pathViejo = `./uploads/extintores/${extintor.img2}`;    
            borrarImg(pathViejo);

            extintor.img2 = nombreAr;
            
            await extintor.save();
            return true;
        
            break;
    }    

}

module.exports = {
    updateImage,
    updateImage2
}