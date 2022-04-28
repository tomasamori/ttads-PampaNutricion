const mongoose = require('mongoose');

const ClienteSchema = new mongoose.Schema({
    idUsuario: String,
    usuario: String,
    password: String,
    cuil: String,
    cuit: String,
    email: String,
    fechaNacimiento: Date,
    direccion: String,
    telefono: String,
    razonSocial: String
});

module.exports = mongoose.model('Cliente', ClienteSchema);