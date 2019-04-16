'use strict'

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var DataSchema = new Schema({
    top:{},
    device:{}
})

module.exports = mongoose.model("datos",DataSchema);
