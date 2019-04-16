'use strict'
const app = require("./app.js")
const mongoose = require('mongoose');
const configdatabase = require('./configuration/database');
// app.set("port", process.env.PORT || 3002);


mongoose.connect(`mongodb://${configdatabase.databaseTwitter.serverdb}:${configdatabase.databaseTwitterportdb}/${configdatabase.databaseTwitter.database}`,
    {
        useNewUrlParser: true
    })
    .then((doc) => {
        // app.listen(app.get('port'), () => {
         app.listen(3200, () => {
            console.log("OK");
        });

    })
    .catch(err => {
        console.log("error");
        app.server.get(err)
    }
    )