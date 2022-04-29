const mongoose = require('mongoose');
const ProductoSchema=new mongoose.schema( {
    idProducto:String,
    marca:String,
    nombre:String,
    descripcion:String,
    precio:String
})
module.exports = mongoose.model('Producto', ProductoSchema);