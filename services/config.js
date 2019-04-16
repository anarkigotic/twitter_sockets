'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ConfigSchema = new Schema({
    descripcion :  String,
    nombre: String,
    nombre_concatenado : String,
    codigo_cc :String,
    id_cliente : {type:Schema.Types.ObjectId,required:"id del cliente es requerido"},
    direccion : String,
    id_padre : {type:Schema.Types.ObjectId,ref:'centros'}
})

module.exports = mongoose.model("configurations",ConfigSchema);
