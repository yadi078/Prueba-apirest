const mongoose = require('mongoose')
const config = require('./configuracion')

module.exports = {
    connection: null,
    connect: function() {
        if(this.connection) return this.connection
        return mongoose.connect(config.DB)
        .then(connection => {
            this.connection = connection
            console.log('la conexion se realizo de manera correcta')
        })
        .catch(e => {console.log('error en la conexion ' ,e)})
    }
}