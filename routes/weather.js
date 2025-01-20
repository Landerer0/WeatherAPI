const express = require('express')
const router = express.Router()
const axios = require('axios');
require('dotenv').config();

var WeatherController = require('../controllers/weather');
const apiKey = process.env.API_KEY; // Despues mover esto a un archivo aparte
if (!process.env.API_KEY) {
    throw new Error('API Key no configurada. Verifica el archivo .env');
}

router.get('/', async (req,res) => {
    // res.send("Weather API");

    console.log("GET /weather")

    const { location } = req.query; // Recibe la ubicación como parámetro de consulta

    if (!location) {
        return res.status(400).json({ error: 'Por favor, proporciona una ubicación.' });
    }

    try {
        const response = await axios.get(
            `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=metric&key=${apiKey}`
        );
        res.json(response.data); 
    } catch (error) {
        res.status(500).json({
            error: 'Error al obtener los datos del tiempo.',
            details: error.response?.data || error.message,
        });
    }

})

module.exports = router