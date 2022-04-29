const mongoose = require('mongoose');
const ProveedorSchema=new mongoose.schema({
    idProveedor:String,
    cuil:String,
    cuit:String,
    razonSocial:String,
    email: String,
    telefono:String
});
module.exports = mongoose.model('Proveedor', ProveedorSchema);
