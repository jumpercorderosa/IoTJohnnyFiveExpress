var express = require('express'); //O Express é um framework para aplicativo da web do Node.js
var five = require('johnny-five'); //plugin para mexer com o arduino
var app = express();

//definir a placa do projeto
var board = new five.Board({port: "COM3"});

var led;
var temp;

board.on("ready", function() {
    led = new five.Led(13);

    var temperature = new five.Thermometer({
        controller: "LM35",
        pin: "A0"
    });

    temperature.on("change", function() {
        temp = this.celsius + "°C";
    });
});

app.post('/api/led/ligar', function(req, res) {
    led.on();
    res.send("Led ligado");
});

app.post('/api/led/desligado', function(req, res) {
        led.off();
        res.send("Led desligado");
});

app.get('/api/temperatura', function(req, res) {
    res.send(temp);
});

app.listen(3000);
console.log('Servidor rodando');