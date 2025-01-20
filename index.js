const express = require('express')
const app = express()
const cors = require('cors');

const axios = require('axios'); // Consultas HTTP
const rateLimit = require('express-rate-limit'); // Limitar consultas API

const port = process.env.PORT || 3000;
app.use(cors());

// Configurar el rate limiter para limitar las solicitudes a 100 por hora
const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutos en milisegundos
    max: 10, // Limita a 10 solicitudes por IP por cada 5 minutos
    message: 'Demasiadas solicitudes de esta IP, por favor intente nuevamente pasado cinco minutos.',
    standardHeaders: true, // Retorna el número de solicitudes restantes en los headers de la respuesta
    legacyHeaders: false,
  });

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`App running on port ${port}`);
});

const apiRouter = require('./routes/weather')

app.use('/weather', apiRouter)