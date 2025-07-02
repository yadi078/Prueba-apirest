const ejercicioModel = require('../models/ejerciciosModel');

function buscarTodo(req, res) {
    ejercicioModel.find({})
        .then(ejercicios => {
            if (ejercicios.length) {
                return res.status(200).send({ejercicios});
            }
        res.status(204).send({mensaje: 'No hay ejercicios registrados'});
        })
     .catch(e => {return res.status(404).send({mensaje: 'Error al solicitar informacion ${e}'})});   
}

module.exports = {
    buscarTodo
}