const ejercicioModel = require('../models/EjerciciosModel')

function buscarTodo(req,res){
    ejercicioModel.find({})
    .then(ejercicios=>{
        if(ejercicios.length){
            return res.status(200).send({ejercicios})
        }
        return res.status(204).send({mensaje: 'No hay información que mostrar'})
    })
    .catch(e=>{return res.status(404).send({mensaje: `Error al buscar la informacion ${e}`})})

}

function guardarEjercicio(req, res) {
    console.log(req.body);
    new ejercicioModel(req.body).save()
    .then(info =>{
        return res.status(200).send({mensaje: 'Incormacion guardad con exito', info})
    })
    .catch(e => {return res.status(404).send({mensaje: "Error al guardar la informacion",e})})
}

function buscarEjercicio(req, res, next){
    let consulta ={}
    consulta[req.params.key] = req.params.value
    ejercicioModel.find(consulta)
    .then(info =>{
        if(!info.length) return next()
        req.body.ejercicios = info
        return next()
    })
    .catch(e => {
        req.body.e = e
        next()
    })
}

function mostrarEjercicio(req, res){
    if(req.body.e) return res.status(404).send
    ({mensaje: "Error al buscar la informacion", 
    error: req.body.e})
    if(!req.body.ejercicios) return res.status(204).send
    ({mensaje: "No hay informacion que mostrar"})
    let ejercicios = req.body.ejercicios
    return res.status(200).send(ejercicios)
}

function eliminarEjercicio(req, res){
    if(req.body.e) {
        return res.status(404).send({
            mensaje: "Error al buscar la informacion", 
            error: req.body.e
        });
    }

    if(!req.body.ejercicios || !req.body.ejercicios.length) {
        return res.status(204).send({
            mensaje: "No hay informacion que mostrar"
        });
    }

    req.body.ejercicios[0].deleteOne()
    .then(info => {
        return res.status(200).send({
            mensaje: "Informacion eliminada con exito", 
            info
        });
    })
    .catch(e => {
        return res.status(404).send({
            mensaje: "Error al eliminar la informacion", 
            e
        });       
    });
}

function actualizarEjercicio(req, res) {
    req.body = req.body || {};

    if (req.body.e) {
        return res.status(404).send({
            mensaje: "Error al buscar la información",
            error: req.body.e
        });
    }

    if (!req.body.ejercicios || !req.body.ejercicios.length) {
        return res.status(204).send({
            mensaje: "No hay información que actualizar"
        });
    }

    let ejercicio = req.body.ejercicios[0];

    Object.assign(ejercicio, req.body);

    ejercicio.save()
        .then(info => {
            return res.status(200).send({
                mensaje: "Información actualizada con éxito",
                info
            });
        })
        .catch(e => {
            return res.status(404).send({
                mensaje: "Error al actualizar la información",
                e
            });
        });
}


module.exports = {
    buscarTodo,
    guardarEjercicio,
    buscarEjercicio,
    mostrarEjercicio,
    eliminarEjercicio,
    actualizarEjercicio
}