'use strict'
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcrypt');


var usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    avatar: {
        type: String,
        default: 'av-1.png'
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: [true, 'La contraseña es necesaria']
    }
})


usuarioSchema.method('compararPassword', function (password) {
    if (bcrypt.compareSync(password, this.password)) {
        return true;
    } else {
        return false;
    }

});

module.exports = mongoose.model("Usuario",usuarioSchema);
