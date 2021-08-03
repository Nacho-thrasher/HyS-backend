const mongoose = require('mongoose');
// async retorna una promesa
const dbConnection = async () => {
    //variables de entorno
    try {
        await mongoose.connect
        (process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('db online')
    } catch (error) {
        console.error(error);
        throw new Error('error al iniciar bd');       
    }

}

module.exports = {
    dbConnection
}