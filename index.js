const app = require('./src/app')
const { dbConnection } = require("./src/database/config");

const port = process.env.PORT || 5000;

dbConnection();

app.listen(port, () => {
    console.log('Servidor en el puerto', port)
})