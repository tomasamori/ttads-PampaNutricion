const mongoose = require('mongoose');
const SucursalSchema = new mongoose.schema( {
    idSucursal:String,
    nombre:String,
    direccion:String
})
module.exports = mongoose.model('Sucursal', SucursalSchema);