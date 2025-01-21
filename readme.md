# Weather API

Esta es una API construida en ExpressJS que permite obtener información meteorológica desde la API de **VisualCrossing**. Proporciona un servicio rápido y eficiente gracias al uso de **Redis** como caché para optimizar las consultas.

## Cómo usar la API

Para realizar una consulta, se debe proporcionar una ubicación mediante un parámetro de consulta

### Ejemplo de uso:

http://localhost:8080/weather?location=Santiago,CL

location: Especifica la ciudad y el país en formato Ciudad,CC (código de país ISO).
En este caso, se está solicitando el clima para Santiago, Chile.

## Limitaciones:

- Cada usuario puede realizar hasta 100 consultas por hora para prevenir una sobrecarga del sistema.

## Tecnologías utilizadas

### Backend:

- **ExpressJS**: Framework para construir aplicaciones web y APIs con Node.js.
    - **Axios**: Librería para manejar y realizar solicitudes HTTP.
    - **Dotenv**: Para gestionar variables de entorno como la API Key de VisualCrossing.
### Caché:
- **Redis**: Base de datos NoSQL utilizada como sistema de caché para almacenar respuestas temporales, mejorando el rendimiento y reduciendo llamadas innecesarias a la API externa.
### Datos meteorológicos:
- **VisualCrossing API**: Fuente de los datos meteorológicos. Visita [VisualCrossing](https://www.visualcrossing.com).

## Configuración

1. Clona este repositorio:
```
git clone https://github.com/Landerer0/WeatherAPI.git
```

2. Instala las dependencias:
```
npm install
```

3. Configura las variables de entorno en un archivo `.env` en la raíz del proyecto
```
API_KEY=tu_clave_de_visualcrossing
REDIS_USERNAME=tu_usuario_redis
REDIS_PASSWORD=tu_contraseña_redis
PORT=8080
```

4. Inicia el servidor:
```
npm start
```

5. El servidor estará disponible en:
```
http://localhost:8080
```

