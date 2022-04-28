const mongoose = require('mongoose');
const Cliente = require('./models/Cliente');

mongoose.connect('mongodb://localhost/pampadb');

async function guardarCliente(c) {
    const cliente = c;
    await cliente.save();
    console.log('Cliente guardado satisfactoriamente');
}

const cliente = new Cliente({ idUsuario: '0', usuario: 'tomasamori', password: '1234', cuil: '20-38667362-5', cuit: '', email: 'tomasamori15@gmail.com', fechaNacimiento: '2001-05-26', direccion: 'Corrientes 1489', telefono: '3329646549', razonSocial: 'Tomás Amori' });
guardarCliente(cliente);