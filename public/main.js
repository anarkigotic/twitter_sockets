var socket = io.connect('http://localhost:3200', {
        'forceNew': true
})

var messages = [];

async function render(data, validate) {
        let html = data.map((element, index) => {
                return (
                        `<div>
                                <h2>${element.user}</h2>
                                <strong>${element.message}</strong>
                                <hr>
                        </div>`
                );
        }).join(" ");

        let objectMap = []
        for (let valu in validate) {
                let ser = {
                        user: valu,
                        negativo: validate[valu]['negativo'],
                        positivo: validate[valu]['positivo'],
                        neutro: validate[valu]['neutro']
                }

                objectMap.unshift(ser);
        }

        let html2 = await objectMap.map((element, index) => {
                return (
                        `<div>
                                <strong>${element.user}</strong>
                               negativo: ${element.negativo}
                               positivo : ${element.positivo}
                              neutro : ${element.neutro}
                        </div>`
                );
        }).join(" ");


        document.getElementById("validate").innerHTML = html2;
        document.getElementById("messages").innerHTML = html;
}




socket.on('messages', data => {
        messages.unshift(data);
        render(messages, data.calculate);
})