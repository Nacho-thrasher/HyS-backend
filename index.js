require('dotenv').config();
const path = require('path');
//express
const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors')
//imgs 
const multer = require('multer');
//crear serv de express
const app = express();

//configurar cors
//midlewer se ejecuta para abajo
app.use(cors());

//lectura y parseo de body
app.use(express.json());

//base de datos de
dbConnection();

//directorio publ
app.use(express.static('public'));

console.log(process.env)

//rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/usuario', require('./routes/usuarios'));
app.use('/api/empresas', require('./routes/empresas'));
app.use('/api/empresa', require('./routes/empresas'));
app.use('/api/extintores', require('./routes/extintores'));
app.use('/api/extintores_excel', require('./routes/extintores'));
app.use('/api/extintor', require('./routes/extintores'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/todo', require('./routes/busquedas'));
//pincipal
app.use('/api/vista-empresas', require('./routes/vista-empresas'));
app.use('/api/vista-extintor', require('./routes/vista-extintor'));
//cloudinary imgs
app.use('/api/cloudinary', require('./routes/cloudinary'));
app.use('/api/cloudinary2', require('./routes/cloudinary2'));

// lo ultimo 
app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
})

app.listen(process.env.PORT, ()=>{
    console.log('servidor corriendo en puerto'+ process.env.PORT)
});
