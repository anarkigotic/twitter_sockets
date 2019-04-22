var jwt = require('jsonwebtoken');


var seed = 'este-es-el-seed-de-mi-app-secreto';
var caducidad = '30d';


function getJwtToken(payload) {
    return jwt.sign({
        usuario: payload
    }, seed, { expiresIn: caducidad });

}

function comprobarToken(userToken) {
    return new Promise((resolve, reject) => {
        jwt.verify(userToken,seed, (err, decoded) => {
            if (err) {
                reject(err);
            } else {
                resolve(decoded);
            }


        })

    });


}


module.exports = {
    getJwtToken,
    comprobarToken
}