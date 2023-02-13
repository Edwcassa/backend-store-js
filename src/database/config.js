const mongoose = require('mongoose')
require('dotenv').config()

mongoose.set('strictQuery', true);
const dbConnection = async () => {
    await mongoose.connect(process.env.MONGO_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log('conectado a base de datos')
    }).catch(err => {
        console.log(err)
        console.log('error al conectar con la base de datos')
    })
}
module.exports = {
    dbConnection
}