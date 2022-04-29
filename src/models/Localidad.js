const mongoose = require('mongoose');
const LocalidadSchema = new mongoose.schema({
    idLocalidad:String,
    codPostal:String,
    nombre:String
})
module.exports = mongoose.model('Localidad', LocalidadSchema);