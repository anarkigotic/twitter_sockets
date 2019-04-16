'use strict'
var Twitter = require('twitter');
var toker_twitter = require('../configuration/configtwitter');
var DecisionTree = require('decision-tree');
var server = require("../app.js");
var io = require('socket.io')(server);


var training_data = [
    { "nombre": "@petrogustavo", "tendencia": "izquierda", "partido": "colombia humana", "contreversia": "paz", "favorabilidad": "positivo" },
    { "nombre": "@petrogustavo", "tendencia": "izquierda", "partido": "colombia humana", "contreversia": "guerra", "favorabilidad": "negativo" },
    { "nombre": "@IvanDuque", "tendencia": "derecha", "partido": "centro democratico", "contreversia": "guerra", "favorabilidad": "positivo" },
    { "nombre": "@German_Vargas", "tendencia": "derecha", "partido": "cambio radical", "contreversia": "regimen", "favorabilidad": "negativo" },
    { "nombre": "@sergio_fajardo", "tendencia": "derecha", "partido": "alianza verde", "contreversia": "educacion", "favorabilidad": "neutro" }
];

var class_name = "favorabilidad";
var features = ["nombre", "tendencia", "partido", "contreversia"];

async function splitText() {
    let keys = await Object.keys(training_data[0]);
    let values = {};
    for (let key of keys) {
        values[key] = training_data.map(element => {
            return element[key];
        });
    }
    return values
}

async function validateText(text) {
    let objects = await splitText();
    let objectf = {};
    let ob, word;
    let words = text.split(" ");
    for (let i = 0; i < words.length; i++) {
        word = words[i];
        for (let key in objects) {
            for (let index = 0; index < objects[key].length; index++) {
                ob = objects[key][index].split(" ");
                if (ob.length > 1) {
                    let word2 = words[i];
                    for (let index3 = 1; index3 < ob.length; index3++) {
                        word2 = word2 + " " + words[i + index3];
                    }
                    if (objects[key][index].toLowerCase() === word2.toLowerCase()) {
                        objectf[key] = objects[key][index]
                    }
                } else if (objects[key][index].toLowerCase() == word.toLowerCase()) {
                    objectf[key] = word;
                }
            }
        }
    }
    return objectf;
}

let analisis = {
    "@IvanDuque": {
        positivo: 0,
        negativo: 0,
        neutro: 0
    },
    "@petrogustavo": {
        positivo: 0,
        negativo: 0,
        neutro: 0
    },
    "@sergio_fajardo": {
        positivo: 0,
        negativo: 0,
        neutro: 0
    },
    "@German_Vargas": {
        positivo: 0,
        negativo: 0,
        neutro: 0
    }
}



async function userValidateCalculate(event, validate) {
    let user = ["@IvanDuque", "@petrogustavo", "@sergio_fajardo", "@German_Vargas"]

    let validateusers = event.text.split(" ");
    for (let usert of validateusers) {
        if (user.includes(usert)) {
            analisis[usert][validate] = analisis[usert][validate] + 1;
        }
    }
    return analisis
}


async function analyticalData(req, res) {

    // var texto = await validateText("@petrogustavo izquierda guerra informatica colombia Humana prueba");
    var client = new Twitter(toker_twitter.api_twitter);
    var stream = client.stream('statuses/filter', { track: '@IvanDuque,@petrogustavo,@sergio_fajardo,@German_Vargas' });
    // var dt = new DecisionTree(training_data, class_name, features);
    // var predicted_class = await dt.predict(texto);


    // io.on('connection', (socket) => {
    //     console.log("conectado");

    //     socket.emit('messages', {
    //         id: 1,
    //         text: "Hola mundo",
    //         author: "juan"
    //     })

    // })
    io.on('connection');

    // console.log(io);

    // io.emit("messages","sasa");



    stream.on('data', async function (event) {
        console.log(event.text);
        // socket.emit('message', event.text)
    })

    // var texto = await validateText(event.text);
    // var predicted_class = await dt.predict(texto);
    // var validate = await userValidateCalculate(event, predicted_class);






}
async function evaluateData(socket) {
    var client = new Twitter(toker_twitter.api_twitter);
    var stream = await client.stream('statuses/filter', { track: '@IvanDuque,@petrogustavo,@sergio_fajardo,@German_Vargas' });
    var dt = new DecisionTree(training_data, class_name, features);
    await stream.on('data', async function (event) {
        var texto = await validateText(event.text);
        var predicted_class = await dt.predict(texto);
        var validate = await userValidateCalculate(event, predicted_class);
        socket.emit('messages', {
            message: event.text,
            user: event.user.name,
            calculate: validate
        });
    })
}
module.exports = {
    analyticalData,
    evaluateData
}