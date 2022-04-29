const mongoose = require('mongoose');
const TipoMascotaSchema= new mongoose.schema( {
    idTipoMascota:String,
    nombre:String,
    tamanoRaza:String,
    edad:Number
})
module.exports = mongoose.model('TipoMascota', TipoMascotaSchema);