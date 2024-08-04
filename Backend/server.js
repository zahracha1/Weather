import express from 'express';
import cron from 'node-cron';
import bodyParser from 'body-parser';
import cors from 'cors';
import weatherRoutes from './routes/weatherRoutes.js';
import { getCoordinates, fetchWeatherData, writeApi ,writeApi2,fetchDailyhWeatherData,fetchAirqualityData,writeApi3,writeApi4,fetchDailyhMarineData, fetchDailyMeanWeatherData} from './services/weatherService.js';
import  keycloak  from './keycloak-config/keycloakService.js';
import { protectRoute } from './keycloak-config/keycloakController.js'; // Adjust the import path as necessary
import session from 'express-session';
import { favoritesRoutes } from './routes/favoritesRoutes.js';
import { checkTemperature, checkPrecipitation, checkWaveHeight, checkUVIndex } from './services/FirebaseService.js';
import FirebaseController  from './controllers/FirebaseController.js';



const memoryStore = new session.MemoryStore();

const app = express();
const PORT = process.env.PORT || 8000; // Utilisation du port 8000


app.use(session({
  secret: 'sPQ9GYpUYHCmPRp4qRZimfK0x8dGrzoI',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));



app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Middleware pour protéger les routes avec Keycloak
app.use(keycloak.middleware());

// Utilisation des routes pour la météo
app.use('/weather', weatherRoutes);
app.use('/favorites',favoritesRoutes)

// Gestion des erreurs 404
app.use((req, res, next) => {
  res.status(404).send("Page introuvable");
});
app.use(cors({
  origin: 'http://localhost:5173', // Specify your frontend origin here
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify the methods you want to allow
  allowedHeaders: ['Content-Type', 'Authorization'] // Specify the headers you want to allow
}));

// Gestion des erreurs 500
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Erreur serveur');
});

// Example usage
const cityName = "Sousse";  // Example city name
const sd = "2024-06-16"; // Define your start date here
const ed = "2024-07-02";  

 (async () => {
  const coordinates = await getCoordinates(cityName);
  if (coordinates) {
    //console.log(`City: ${cityName}`);
    //console.log(`Latitude: ${coordinates.lat}, Longitude: ${coordinates.lon}start_date:${sd},end_date:${ed},`);
   // await fetchWeatherData(coordinates.lat, coordinates.lon, cityName,sd,ed);
    //await fetchDailyhWeatherData(coordinates.lat, coordinates.lon, cityName);
    //await fetchAirqualityData(coordinates.lat, coordinates.lon, cityName); 
    await  fetchDailyhMarineData(coordinates.lat, coordinates.lon, cityName); 
    //writeApi2.close();
    //writeApi.close();
    //writeApi3.close();
    writeApi4.close();
 
  } else {
    console.log("Failed to fetch coordinates.");
  }
})(); 

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const citiesToUpdate = [
  'Tunis',
  'Djerba',
  'Ariana',
  'Ben Arous',
  'Manouba',
  'Nabeul',
  'Zaghouan',
  'Bizerte',
  'Béja',
  'Jendouba',
  'Le Kef',
  'Siliana',
  'Kairouan',
  'Kasserine',
  'Sidi Bouzid',
  'Sousse',
  'Monastir',
  'Mahdia',
  'Sfax',
  'Gafsa',
  'Tozeur',
  'Kebili',
  'Gabès',
  'Medenine',
  'Tataouine'
];

// Schedule a cron job for each city
citiesToUpdate.forEach((cityName) => {
  cron.schedule('0 0 * * *', () => {
    console.log(`Running data update process for ${cityName}...`);
    getCoordinates(cityName).then((coordinates) => {
      if (coordinates) {
        fetchDailyhWeatherData(coordinates.lat, coordinates.lon, cityName); 
        fetchDailyMeanWeatherData(coordinates.lat, coordinates.lon, cityName);
        fetchAirqualityData(coordinates.lat, coordinates.lon, cityName); 
     
        fetchWeatherData(coordinates.lat, coordinates.lon, cityName,sd,ed);
        
      } else {
        console.log(`Failed to fetch coordinates for ${cityName}.`);
      }
    });
  });
});

// Routes

// Schedule temperature check every minute
const temperatureTask = cron.schedule('* * * * *', () => {
  console.log('Checking temperature...');
  checkTemperature();
});

// Schedule precipitation check every 1 minute and 30 seconds :*/30 * * * * *
const precipitationTask = cron.schedule('0 0 * * *', () => {
  console.log('Checking precipitation...');
  checkPrecipitation();
});

// Schedule checkWaveHeight check every 1 minute and 30 seconds :*/30 * * * * *
const checkWaveHeightTask = cron.schedule('0 0 * * *', () => {
  console.log('Checking checkWaveHeight...');
  checkWaveHeight();
});
// Schedule checkUVIndex check every 3 minute and 30 seconds :*/30 * * * * *
const checkUVIndexTask = cron.schedule('0 0 * * *', () => {
  console.log('Checking checkUVIndex...');
  checkUVIndex();
});


// Handle server shutdown
process.on('SIGINT', () => {
  console.log('Server is shutting down...');
  temperatureTask.stop();
  precipitationTask.stop();
  checkWaveHeightTask.stop();
  checkUVIndexTask.stop();
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});