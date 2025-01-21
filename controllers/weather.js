const axios = require('axios');
const Redis = require('redis');
const DEFAULT_EXPIRATION = 3600*12; // 12 horas

// Validación de la API Key
const redisUsername = process.env.REDIS_USERNAME;
const redisPassword = process.env.REDIS_PASSWORD;
if (!redisPassword || !redisUsername) {
    throw new Error('ERROR: Redis Username y/o Redis Password no configurada. Verifica el archivo .env');
}

// Configuración del cliente Redis
const redisClient = Redis.createClient({
    url: 'redis://'+redisUsername+':'+redisPassword+'@localhost:6379',
});
redisClient.on('error', (err) => console.error('Redis Client Error:', err));

(async () => {
    try {
        await redisClient.connect();
        console.log('Conectado a Redis');
    } catch (err) {
        console.error('Error al conectar con Redis:', err);
    }
})();

// Validación de la API Key
const apiKey = process.env.API_KEY;
if (!apiKey) {
    throw new Error('ERROR: API Key no configurada. Verifica el archivo .env');
}

const weatherController = {
    getWeather: async function (req, res) {
        const { location } = req.query;
        console.log('Haciendo solicitud a Visual Crossing para la ubicación: '+location);

        if (!location) {
            return res.status(400).json({ error: 'Por favor, proporciona una ubicación.' });
        }

        const cacheKey = `weather_${location}`;

        try {
            // Intentar obtener los datos del caché
            const cachedData = await redisClient.get(cacheKey);

            if (cachedData) {
                console.log('Datos obtenidos del caché');
                return res.json(JSON.parse(cachedData));
            }

            // Si no están en el caché, hacer la solicitud a la API
            const response = await axios.get(
                `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(
                    location
                )}?unitGroup=metric&key=${apiKey}`
            );

            // Guardar en caché los datos obtenidos
            await redisClient.setEx(cacheKey, DEFAULT_EXPIRATION, JSON.stringify(response.data));

            res.json(response.data);
        } catch (error) {
            res.status(500).json({
                error: 'Error al obtener los datos del clima.',
                details: error.response?.data || error.message,
            });
        }
    },
};

module.exports = weatherController;
