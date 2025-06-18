const app = require('./app/app')
const config = require('./app/config/configuracion')

app.listen(config.port, () => {
    console.log("aplicacion corriendo en el puerto ",
         config.port);
});