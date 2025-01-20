
var path = require('path');
var fs = require('fs');

var weatherController = {
    getWeather: function(req, res){
        fs.readFile('assets/historical.json', 'utf8', (err, data) => {
            if(err)
                return res.status(500).send({message: 'Error al leer el archivo historical.json'});
            const json = JSON.parse(data);
            res.status(200).json(json).historicalStockList;
        });
    },

    getHistorical: function(req, res){
        var symbol = req.params.symbol;

        fs.readFile('assets/historical.json', 'utf8', (err, data) => {
            if(err)
                return res.status(500).send({message: 'Error al leer el archivo historical.json'});

            const json = JSON.parse(data);
            const simbolo_escogido = json.historicalStockList.find((elem) => elem.symbol === symbol);
            if(simbolo_escogido)
                return res.status(200).json(simbolo_escogido);
            else
                return res.status(404).json({message: 'No se ha encontrado el symbol'});
        });
    }
}

module.exports = weatherController;