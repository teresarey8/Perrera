const mongoose = require('mongoose');

const perroSchema = new mongoose.Schema({
    nombre: String,
    edad: Number,
    raza: String,
    color: String
});
const Perro = mongoose.model('Perro', perroSchema, 'perros');
const buscaTodos = () => {
    return Perro.find()
        .then(perros => {
            if (perros.lenght > 0) {
                return perros;
            } else {
                console.log('No se encontró ningún registro');
                return null;
            }
        })
        .catch(err => {
            console.error('Error al obtener los perros', err);
            throw err;
        });
}
const crearNuevoPerro = (n,e,r,c) => {
    const nuevoPerro = new Perro({
        nombre: n,
        edad: e,
        raza: r,
        color: c
    });
    return nuevoPerro.save()
        .then(perro => {
            console.log('Perro guardado: ', perro);
            return perro;
        })
        .catch(err => {
            console.error('Error al guardar el perro:', err);
            throw err;
        });
}
const actualizarPerro = (idPerro, perroActualizar) => {
    return Perro.findByIdAndUpdate(idPerro, perroActualizar, { new: true })
        .then(perroActualizado => {
            if (perroActualizado) {
                console.log('Perro actualizado: ', perroActualizado)
                return perroActualizado;
            } else {
                console.log('No se encontró ningun perro con ese ID');
                return null;
            }
        })
        .catch(err => console.error('Error al actualizar el ordenador:', err));
}
const borrarPerro = (idPerroParaBorrar) => {
    return Perro.findByidAndDelete(idPerroParaBorrar)
        .then(perroEliminado => {
            if (perroEliminado) {
                console.log('Perro eliminado: ', perroEliminado)
                return perroEliminado;
            } else {
                console.log('No se encontro ningun perro con ese id');
                return null;
            }
        })
        .catch(err => {
            console.error('Error al eliminar el ordenador:', err);
            throw err;
        });
}
module.exports = {buscaTodos, borrarPerro, actualizarPerro, crearNuevoPerro, Perro}