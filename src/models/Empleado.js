const mongoose = require('mongoose');
const EmpleadoSchema= new mongoose.schema( {
    idUsuario:String,
    password:String,
    cuil:String,
    email:String,
    fechaNacimiento:String,
    direccion:String,
    telefono:String,
    legajo:String,
    nombre:String,
    apellido:String
})
module.exports = mongoose.model('Empleado', EmpleadoSchema);