const express = require('express')
const app = express()
const cors = require('cors');

const axios = require('axios'); // Consultas HTTP
const rateLimit = require('express-rate-limit'); // Limitar consultas API

const port = process.env.PORT || 3000;
require('dotenv').config();

app.use(cors());

// Configurar el rate limiter para limitar las solicitudes a 100 por hora
const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hora en milisegundos
  max: 100, // Limita a 100 solicitudes por IP por el tiempo indicado
  message: (req, res) => {
    res.status(429).json({
      error: 'Demasiadas solicitudes',
      retryAfter: 'Intenta denuevo en: ' + Math.ceil(req.rateLimit.resetTime.getTime() - Date.now() / 1000) + ' segundos',
    });
  },
  standardHeaders: true, // Retorna el número de solicitudes restantes en los headers de la respuesta
  legacyHeaders: false,
});

app.get('/', (req, res) => {
  res.send('Bienvenido, accede a /weather para indicar una ciudad')
})

app.listen(port, () => {
  console.log(`App running on port ${port}`);
});

const apiRouter = require('./routes/weather')

app.use('/weather', limiter, apiRouter)