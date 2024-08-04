import axios from 'axios';
import { InfluxDB, Point } from '@influxdata/influxdb-client';


const influx = new InfluxDB({
  url: 'http://localhost:8086',
  token: 'FV_VkUGOh9YonuMbERARiD0_OYU8m6t6iEP0Y3srqckAlqG3fOO74Ec4PNoqPMHbDXafBQefe_FahYlOtp0WuQ==',
});
export const writeApi = influx.getWriteApi('Proxym', 'MyWeather');
export const writeApi1 = influx.getWriteApi('Proxym', 'dailyMean');
export const writeApi2 = influx.getWriteApi('Proxym', 'weatherdaily1');
export const writeApi3 = influx.getWriteApi('Proxym', 'weatherAirquality');
export const writeApi4 = influx.getWriteApi('Proxym', 'weatherMarine1');
export const queryApi = influx.getQueryApi('Proxym');
export { influx };



export async function getCoordinates(cityName) {
  try {
    const response = await axios.get(`https://geocoding-api.open-meteo.com/v1/search?name=${cityName}&count=1&language=en&format=json`);
    const data = response.data;

    const results = data.results;
    if (!results || results.length === 0) {
      console.log("Error: No results received from the geocoding API.");
      return null;
    }

    const firstResult = results[0];
    const lat = parseFloat(firstResult.latitude).toFixed(4);
    const lon = parseFloat(firstResult.longitude).toFixed(4);
    return { lat, lon };
  } catch (error) {
    console.log("Error fetching coordinates:", error.message);
    return null;
  }
}


//**************************weather_Forcast*****************************//

export async function fetchWeatherData(lat, lon, cityName, sd, ed) {
  try {
    const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,weather_code,precipitation,wind_speed_10m,precipitation_probability,visibility,cloud_cover,soil_temperature_0cm&start_date=${sd}&end_date=${ed}`);
    const data = response.data;
    const hourlyForecast = data.hourly;
    const timestamps = hourlyForecast.time;
    const temperatures = hourlyForecast.temperature_2m;
    const relative_humidity = hourlyForecast.relative_humidity_2m;
    const precipitation = hourlyForecast.precipitation;
    const wind_speed = hourlyForecast.wind_speed_10m;
    const weatherCodes = hourlyForecast.weather_code;
    const probprecipitation = hourlyForecast.precipitation_probability;
    const visible = hourlyForecast.visibility;
    const cloud = hourlyForecast.cloud_cover;
    const soiltemperature = hourlyForecast.soil_temperature_0cm;

    // Write temperature data to InfluxDB
    timestamps.forEach((timestamp, index) => {
      const point = new Point('weather_hourly')
        .tag('city', cityName)
        .floatField('temperature', temperatures[index])
        .floatField('relative_humidity', relative_humidity[index])
        .floatField('precipitation', precipitation[index])
        .floatField('wind_speed', wind_speed[index])
        .floatField('weatherCodes', weatherCodes[index])
        .floatField('precipitation_prob', probprecipitation[index])
        .floatField('visibility', visible [index])
        .floatField('cloud', cloud[index])
        .timestamp(new Date(timestamp));
        //.floatField('soil_temperature',  soiltemperature[index])
        if (soiltemperature !== null &&soiltemperature !== undefined) {
          point.floatField('soil_temperature', soiltemperature);
        } else {
          console.warn(`Skipping null or undefined ozone at index ${index} for city ${cityName}`);
        }
        

      writeApi.writePoint(point);
    });
    console.log(`Successfully wrote weather data for ${cityName} to InfluxDB.`);
  } catch (error) {
    console.log("Error fetching weather data:", error.message);
  }
  process.on('SIGINT', () => {
    console.log('Closing writeApi...');
    writeApi.close();
    process.exit();
});
}

   

//**************************Daily_weather_forcast*****************************//

export async function fetchDailyhWeatherData(lat, lon, cityName) {
  try {
    const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_sum,wind_speed_10m_max,precipitation_probability_max`);
    const data = response.data;
    const dailyForecast = data.daily;
    const timestamps1 = dailyForecast.time;
    const maxtemperatures = dailyForecast.temperature_2m_max;
    const mintemperatures = dailyForecast.temperature_2m_min;
    const sumprecipitation = dailyForecast.precipitation_sum
    const maxwind_speed = dailyForecast.wind_speed_10m_max;
    const dailyweatherCodes = dailyForecast.weather_code;
    const dailyprobprecipitations = dailyForecast.precipitation_probability_max;

    //
    for (let i = 0; i < timestamps1.length; i++) {
      const timestamps = timestamps1[i];
      const point = new Point('daily_weather')
          .tag('city', cityName)
          .floatField('max_temperature', maxtemperatures[i])
          .floatField('min_temperature', mintemperatures [i])
          .floatField('precipitation_sum', sumprecipitation[i])
          .floatField('max_wind_speed', maxwind_speed[i])
          .intField('weather_code', dailyweatherCodes[i])
          .intField('probab_precipitation', dailyprobprecipitations[i])
          .timestamp(new Date(timestamps));

      writeApi2.writePoint(point);
  
  }

  console.log(`Successfully wrote daily weather data for ${cityName} to InfluxDB.`);
} catch (error) {
  console.error("Error fetching daily weather data:", error.message);
  throw error; // Rethrow the error for handling higher up the call stack
}   
process.on('SIGINT', () => {
  console.log('Closing writeApi...');
  writeApi2.close();
  process.exit();
});
}

//**************************Air_Quality_Forcast*****************************//
export async function fetchAirqualityData(lat, lon, cityName) {
  try {
    const response = await axios.get(`https://air-quality-api.open-meteo.com/v1/air-quality?latitude=${lat}&longitude=${lon}&hourly=uv_index,pm10,carbon_monoxide,nitrogen_dioxide,ozone,dust`);
    const data = response.data;
    const hourlyForecast = data.hourly;
    const timestamps= hourlyForecast.time;
    const uvindex = hourlyForecast.uv_index;
    const pm= hourlyForecast.pm10;
    const carbonmonoxide = hourlyForecast.carbon_monoxide;
    const nitrogendioxide = hourlyForecast.nitrogen_dioxide;
    const ozones = hourlyForecast.ozone;
    const dusts = hourlyForecast.dust;
  
  
    timestamps.forEach((timestamp, index) => {
      const UVindex = uvindex[index];
      const pm_10 = pm[index];
      const carbon_Monoxide = carbonmonoxide[index];
      const nitroge_Dioxide = nitrogendioxide[index];
      const Ozone = ozones[index];
      const Dust = dusts[index];

      const point = new Point('daily_Airquality')
        .tag('city', cityName)
        .timestamp(new Date(timestamp));

      if (UVindex !== null && UVindex !== undefined) {
        point.floatField('uv_index', UVindex);
      } else {
        console.warn(`Skipping null or undefined UV index at index ${index} for city ${cityName}`);
      }

      if (pm_10 !== null && pm_10 !== undefined) {
        point.floatField('pm10', pm_10);
      } else {
        console.warn(`Skipping null or undefined PM10 at index ${index} for city ${cityName}`);
      }

      if (carbon_Monoxide !== null && carbon_Monoxide !== undefined) {
        point.floatField('carbon_monoxide', carbon_Monoxide);
      } else {
        console.warn(`Skipping null or undefined carbon monoxide at index ${index} for city ${cityName}`);
      }

      if (nitroge_Dioxide !== null && nitroge_Dioxide !== undefined) {
        point.floatField('nitrogen_dioxide', nitroge_Dioxide);
      } else {
        console.warn(`Skipping null or undefined nitrogen dioxide at index ${index} for city ${cityName}`);
      }

      if (Ozone !== null && Ozone !== undefined) {
        point.floatField('ozone', Ozone);
      } else {
        console.warn(`Skipping null or undefined ozone at index ${index} for city ${cityName}`);
      }

      if (Dust !== null && Dust !== undefined) {
        point.floatField('dust', Dust);
      } else {
        console.warn(`Skipping null or undefined dust at index ${index} for city ${cityName}`);
      }

      writeApi3.writePoint(point);
    });
    console.log(`Successfully wrote Air quality data for ${cityName} to InfluxDB.`);
  } catch (error) {
    console.log("Error fetching Air quality:", error.message);
  }
  process.on('SIGINT', () => {
    console.log('Closing writeApi...');
    writeApi1.close();
    process.exit();
  });
}


//**************************Marine_Forcast*****************************//
export async function fetchDailyhMarineData(lat, lon, cityName) {
  try {
    const response = await axios.get(`https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&hourly=wave_height,wave_direction,wave_period&forecast_days=3`);
    const data = response.data;
    const dailyForecast = data.hourly;
    const timestamps1 = dailyForecast.time;
    const waveheight = dailyForecast.wave_height;
    const wavedirection = dailyForecast.wave_direction;
    const waveperiod = dailyForecast.wave_period;

    timestamps1.forEach((timestamp, index) => {
     
      const Wave_Direction = wavedirection[index]
      const Wave_Height = waveheight[index]
      const Wave_Period = waveperiod[index]
      const point = new Point('weatherMarine')
        .tag('city', cityName)
        .timestamp(new Date(timestamp));
        if (Wave_Direction !== null && Wave_Direction !== undefined) {
          point.floatField('wave_direction', Wave_Direction);
        } else {
          console.warn(`Skipping null or undefined wave_direction at index ${index} for city ${cityName}`);
        }
  
      if ( Wave_Height !== null &&  Wave_Height !== undefined) {
        point.floatField('wave_height', Wave_Height);
      } else {
        console.warn(`Skipping null or undefined wave_height at index ${index} for city ${cityName}`);
      }
      if (Wave_Period!== null &&  Wave_Period !== undefined) {
        point.floatField('pave_period', Wave_Period);
      } else {
        console.warn(`Skipping null or undefined pave_period at index ${index} for city ${cityName}`);
      }


      writeApi4.writePoint(point);
  
    });

  console.log(`Successfully wrote Marine data for ${cityName} to InfluxDB.`);
} catch (error) {
  console.error("Error fetching Marine weather data:", error.message);
  throw error; // Rethrow the error for handling higher up the call stack
} 

}

/////////////

const fluxQuery = `
from(bucket: "weatherdaily1")
|> range(start: -7d, stop: 7d)
|> distinct(column: "city")
|> sort(columns: ["city"], desc: false)
`;
async function fetchAllCities() {
  try {
      const queryApi = influx.getQueryApi('Proxym');
      const result = await queryApi.collectRows(fluxQuery);
 // Filter out any entries where the city is undefined or null
 const filteredResult = result.filter(
  (item) => item.city !== undefined && item.city !== null
);
      const citiesSet = new Set(filteredResult.map(item => item.city));
      const uniqueCities = Array.from(citiesSet);
      uniqueCities.sort((a, b) => a.localeCompare(b, 'en', { sensitivity: 'base' }));
     
      return uniqueCities;
  } catch (error) {
      console.error("Error fetching cities:", error);
      throw error;
  }
}

export { fetchAllCities };









////////////////////////////////
async function addCityToFavorites(username, city) {
  try {
    const point = new Point('users')
      .tag('username', username)
      .stringField('favorite_city', city)

    const writeApi = influx.getWriteApi('Proxym', 'weather');
    writeApi.writePoint(point);
    await writeApi.close();
  } catch (error) {
    console.error("Error adding city to favorites:", error);
    throw error;
  }
}
async function deleteCityFromFavorites(username, city) {
  try {
    const point = new Point('users')
      .tag('username', username)
      .stringField('favorite_city', city)
      .booleanField('deleted', true); // Mark as deleted

    const writeApi = influx.getWriteApi('Proxym', 'weather');
    writeApi.writePoint(point);
    await writeApi.flush(); // Ensure the data is written before closing
    await writeApi.close();
  } catch (error) {
    console.error("Error deleting city from favorites:", error);
    throw error;
  }
}

async function getCityFromFavorites(username) {
  try {
    const queryApi = influx.getQueryApi('Proxym');

    const fluxQuery = `
    from(bucket: "weather")
    |> range(start: -1d)  // Adjust time range to cover a wider period
    |> filter(fn: (r) => r._measurement == "users" and r.username == "${username}")
    |> filter(fn: (r) => r._field == "favorite_city")
    |> filter(fn: (r) => r.deleted != true or not exists r.deleted)
    |> keep(columns: ["_value"])
    |> group(columns: ["_value"]) 
    |> sort(columns: ["_time"], desc: true)`;

    //console.log('Flux Query:', fluxQuery);  // Debug: Log the query

    const result = await queryApi.collectRows(fluxQuery);

    console.log('Query Result:', result);  // Debug: Log the query result

    if (result.length > 0) {
      // Extract unique city names
      const uniqueCities = [...new Set(result.map(row => row._value))];
      return uniqueCities;
    } else {
      throw new Error(`No favorite cities found for user: ${username}`);
    }
  } catch (error) {
    console.error("Error getting cities from favorites:", error);
    throw error;
  }
}



export { addCityToFavorites ,deleteCityFromFavorites ,getCityFromFavorites };





//////////////////dailyMean///////////////////////////////
export async function fetchDailyMeanWeatherData(lat, lon, cityName) {
  try {
    const response = await axios.get(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&hourly=temperature_2m,relative_humidity_2m,precipitation,wind_speed_10m&forecast_days=2`);
    const data = response.data;
    const hourlyForecast = data.hourly;

    const timestamps = hourlyForecast.time;
    const temperatures = hourlyForecast.temperature_2m;
    const humidities = hourlyForecast.relative_humidity_2m;
    const precipitations = hourlyForecast.precipitation;
    const windSpeeds = hourlyForecast.wind_speed_10m;

    timestamps.forEach((timestamp, index) => {
      const point = new Point('hourly_weather')
        .tag('city', cityName)
        .timestamp(new Date(timestamp))
        .floatField('temperature', temperatures[index])
        .floatField('humidity', humidities[index])
        .floatField('precipitation', precipitations[index])
        .floatField('wind_speed', windSpeeds[index]);

      writeApi1.writePoint(point);
    });

    console.log(`Successfully wrote Mean hourly weather data for ${cityName} to InfluxDB.`);
  } catch (error) {
    console.error("Error fetching and writing  Mean hourly weather data:", error.message);
  }
  process.on('SIGINT', () => {
    console.log('Closing writeApi...');
    writeApi1.close();
    process.exit();
  });
}
/***********************Firebase***********************/
