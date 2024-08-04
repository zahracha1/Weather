import express from "express";
import {
  fetchWeather,
  fetchTemperature,
  fetchRelativeHumidity,
  fetchWind_speed,
  fetchPrecipitation,
  fetchweatherCodes,
  publicEndpoint,
  fetchDailymaxtemperatures,
  fetchDailymintemperatures,
  fetchDailysumprecipitation,
  fetchDailymaxwind_speed,
  fetchcloud,
  fetchDailydailyweatherCodes,
  //fetchmeanTemperature,
  fetchdailyprobprecipitations,
  fetchprobPrecipitation,
  fetchvisibility,
  fetchtemperaturesol,
  fetchuvindex,
  fetchDailymax_wave_height,
  fetchDailymax_wave_direction,
  fetchDailymax_wave_period,
  fetchpm,
  fetchcarbonmonoxide,
  fetchnitrogendioxide,
  fetchozone,
  fetchdust,
  getAllCities,
  decodeToken,
  addToFavorites,
  getHourlyTemperature,
  getHourlyHumidity,
  getHourlyPrecipitation,
  getHourlyWindSpeed,
  registerTokenController
} from "../controllers/weatherController.js";
import { fetchWeatherData } from "../services/weatherService.js";
//import jwtDecode from 'jwt-decode';
import { protectRoute } from "../keycloak-config/keycloakController.js";

//public
const router = express.Router();
router.get("/:sd", fetchWeatherData);
router.get("/:ed",fetchWeatherData);
//router.get("/:cityName", fetchWeather);
router.get("/:cityName/temperature", fetchTemperature);
router.get("/:cityName/relative_humidity", fetchRelativeHumidity);
router.get("/:cityName/wind_speed", fetchWind_speed);
router.get(
  "/:cityName/weatherCodes/:sd/:ed/protected/secure",
 
  fetchweatherCodes
);
router.post(
  "/registerToken",registerTokenController
);
//**************************weather_Forcast*****************************//
router.get("/protected/:cityName", fetchWeather);
router.get("/protected/temperature/:cityName/:sd/:ed",protectRoute, fetchTemperature);
router.get("/protected/wind_speed/:cityName/:sd/:ed",protectRoute,fetchWind_speed);
router.get("/protected/relative_humidity/:cityName/:sd/:ed",protectRoute,fetchRelativeHumidity);
router.get("/protected/Precipitation/:cityName/:sd/:ed",protectRoute,fetchPrecipitation);
router.get("/protected/weatherCodes/:cityName/:sd/:ed",protectRoute,fetchweatherCodes);
router.get("/protected/prob-precipitation/:cityName/:sd/:ed",protectRoute, fetchprobPrecipitation);
/*router.get(
  "/protected/meantemperature/:cityName/:sd/:ed",
 
  fetchmeanTemperature
);*/
router.get("/protected/visible/:cityName/:sd/:ed",fetchvisibility);
router.get("/protected/cloud/:cityName/:sd/:ed", fetchcloud);
router.get("/protected/Temperaturesol/:cityName",protectRoute, fetchtemperaturesol);

router.get("/protected/Allcity", getAllCities);


///////////////////////////////////
router.get("/api/auth",protectRoute,  function (req, res) {
  try {
    res.redirect(`http://localhost:5173`);
  } catch (err) {
    res.json(err);
  }
});


//**************************Air_Quality_Forcast*****************************//
router.get("/protected/Uv_index/:cityName",protectRoute, fetchuvindex);
router.get("/protected/uvindex/:cityName",protectRoute, async (req, res) => {
  try {
    const result = await fetchuvindex(req, res);
    res.json(result);
  } catch (error) {
    console.error("Error fetching uv index:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/protected/pm_10/:cityName",  async (req, res) => {
  try {
    const result = await fetchpm(req, res);
    res.json(result);
  } catch (error) {
    console.error("Error fetching pm10:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get(
  "/protected/carbon_monoxide/:cityName",
  
  async (req, res) => {
    try {
      const result = await fetchcarbonmonoxide(req, res);
      res.json(result);
    } catch (error) {
      console.error("Error fetching carbon monoxide:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get(
  "/protected/nitrogen_dioxide/:cityName",
  
  async (req, res) => {
    try {
      const result = await fetchnitrogendioxide(req, res);
      res.json(result);
    } catch (error) {
      console.error("Error fetching nitrogendioxide:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get("/protected/ozone/:cityName", async (req, res) => {
  try {
    const result = await fetchozone(req, res);
    res.json(result);
  } catch (error) {
    console.error("Error fetching nitrogendioxide:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/protected/dust/:cityName",protectRoute,  async (req, res) => {
  try {
    const result = await fetchdust(req, res);
    res.json(result);
  } catch (error) {
    console.error("Error fetching nitrogendioxide:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//**************************Daily_weather_forcast*****************************//
router.get( "/protected/daily-max-temperatures/:cityName",
  async (req, res) => {
    try {
      const result = await fetchDailymaxtemperatures(req, res);
      res.json(result);
    } catch (error) {
      console.error("Error fetching daily max temperatures:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get(
  "/protected/daily-min-temperatures/:cityName",
 
  async (req, res) => {
    try {
      const result = await fetchDailymintemperatures(req, res);
      res.json(result);
    } catch (error) {
      console.error("Error fetching daily min temperatures:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get(
  "/protected/daily-sum-precipitation/:cityName",protectRoute,
 
  async (req, res) => {
    try {
      const result = await fetchDailysumprecipitation(req, res);
      res.json(result);
    } catch (error) {
      console.error("Error fetching daily sum precipitation:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get(
  "/protected/daily-max-wind_speed/:cityName",protectRoute,

  async (req, res) => {
    try {
      const result = await fetchDailymaxwind_speed(req, res);
      res.json(result);
    } catch (error) {
      console.error("Error fetching daily max-wind:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get("/protected/daily-weatherCodes/:cityName",protectRoute,
  async (req, res) => {
    try {
      const result = await fetchDailydailyweatherCodes(req, res);
      res.json(result);
    } catch (error) {
      console.error("Error fetching daily weather codes:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get(
  "/protected/daily-probab-precipitation/:cityName",
  
  async (req, res) => {
    try {
      const result = await fetchdailyprobprecipitations(req, res);
      res.json(result);
    } catch (error) {
      console.error("Error fetching daily probab_precipitation:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

//**************************Marine_Forcast*****************************//

router.get(
  "/protected/daily-max-wave-height/:cityName",
  
  async (req, res) => {
    try {
      const result = await fetchDailymax_wave_height(req, res);
      res.json(result);
    } catch (error) {
      console.error("Error fetching daily max wave_height:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get(
  "/protected/daily-max-wave-direction/:cityName",
  
  async (req, res) => {
    try {
      const result = await fetchDailymax_wave_direction(req, res);
      res.json(result);
    } catch (error) {
      console.error("Error fetching daily max wave_direction:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get(
  "/protected/daily-max-wave-period/:cityName",
  
  async (req, res) => {
    try {
      const result = await fetchDailymax_wave_period(req, res);
      res.json(result);
    } catch (error) {
      console.error("Error fetching daily max wave_period:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

router.get("/decode_token", decodeToken);
router.get("/allcities", getAllCities);

////////////////////////////////////
router.get("/temperature_hourly/:cityName",protectRoute ,getHourlyTemperature);
router.get("/protected/humidity_hourly/:cityName",protectRoute , getHourlyHumidity);
router.get("/protected/precipitation_hourly/:cityName",protectRoute,getHourlyPrecipitation);
router.get("/protected/windspeed_hourly/:cityName",protectRoute, getHourlyWindSpeed);
export default router;

//prtotacted_endpoints//

//router.get('/:jwtdecoder',fetchuserDetails);
/*router.get('/protected/:cityName',protectRoute, fetchWeather);
router.get('/protected/wind_speed/:cityName/:sd/:ed',protectRoute,fetchWind_speed);
router.get('/protected/temperature/:cityName/:sd/:ed',protectRoute,fetchTemperature);
router.get('/protected/relative_humidity/:cityName/:sd/:ed',protectRoute,fetchRelativeHumidity);
router.get('/protected/Precipitation/:cityName/:sd/:ed',protectRoute,fetchPrecipitation);
router.get('/protected/weatherCodes/:cityName/:sd/:ed',protectRoute,fetchweatherCodes);
router.get('/test/public',publicEndpoint);
*/
