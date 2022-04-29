const mongoose = require('mongoose');
const PrecioSchema=new mongoose.schema( {
    fechaDesde:Date,
    valor:Number
})
module.exports = mongoose.model('Precio', PrecioSchema);