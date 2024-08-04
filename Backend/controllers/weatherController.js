import { influx } from '../services/weatherService.js';
import { getCoordinates, fetchWeatherData, fetchDailyhWeatherData,
  fetchAirqualityData, fetchDailyhMarineData, fetchAllCities,queryApi, writeApi} from '../services/weatherService.js';
import { jwtDecode } from "jwt-decode";
import { mapWeatherCodeToCondition } from "../models/weatherCodeMapping.js"
import {messaging} from '../services/FirebaseService.js'
import { Point } from '@influxdata/influxdb-client';

export async function fetchWeather(req, res) {
  const cityName = req.params.cityName;
  try {
    const coordinates = await getCoordinates(cityName);
    if (coordinates) {
      await fetchWeatherData(coordinates.lat, coordinates.lon, cityName);
      res.send(`Weather data fetched and stored for ${cityName}`);
    } else {
      res.status(404).send(`Failed to fetch weather data for ${cityName}`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export async function fetchAirData(req, res) {
  const cityName = req.params.cityName;
  try {
    const coordinates = await getCoordinates(cityName);
    if (coordinates) {
      await fetchAirqualityData(coordinates.lat, coordinates.lon, cityName);
      res.send(`Weather Air data fetched and stored for ${cityName}`);
    } else {
      res.status(404).send(`Failed to fetch weather Air data for ${cityName}`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export async function fetchMarineData(req, res) {
  const cityName = req.params.cityName;
  try {
    const coordinates = await getCoordinates(cityName);
    if (coordinates) {
      await fetchDailyhMarineData(coordinates.lat, coordinates.lon, cityName);
      res.send(`Marine data fetched and stored for ${cityName}`);
    } else {
      res.status(404).send(`Failed to fetch Marine data for ${cityName}`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export async function fetchDailyData(req, res) {
  const cityName = req.params.cityName;
  try {
    const coordinates = await getCoordinates(cityName);
    if (coordinates) {
      await fetchDailyhWeatherData(coordinates.lat, coordinates.lon, cityName);
      res.send(`Weather data fetched and stored for ${cityName}`);
    } else {
      res.status(404).send(`Failed to fetch weather data for ${cityName}`);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export async function fetchTemperature(req, res) {
  const cityName = req.params.cityName;
  const sd = req.params.sd;
  const ed = req.params.ed;
  const fluxQuery = `
  from(bucket: "MyWeather")
  |> range(start: today(), stop: 7d)
  |> filter(fn: (r) => r["_measurement"] == "weather_hourly")
  |> filter(fn: (r) => r["city"] == "${cityName}")
  |> filter(fn: (r) => r["_field"] == "temperature")
`;
  try {
    const queryClient = influx.getQueryApi('Proxym');
    const result = [];
    await new Promise((resolve, reject) => {
      queryClient.queryRows(fluxQuery, {
        next: (row, tableMeta) => {
          const tableObject = tableMeta.toObject(row);
          console.log(tableObject);
          resolve(tableObject);
          result.push(tableObject);
        },
        error: (error) => {
          console.error('Error', error);
          reject(error);
        },
        complete: () => {
          console.log('Query complete.');
        },
      })
    });
    res.json(result);
  } catch (error) {
    console.log("Error executing query:", error.message);
    res.status(500).json({ error: error.message });
  }
};


//weather_forcast//
/* export async function fetchmeanTemperature(req, res0) {
  const cityName = req.params.cityName;
  const sd = req.params.sd;
  const ed = req.params.ed;
  const fluxQuery = `
  from(bucket: "weather")
  |> range(start: ${sd}, stop: ${ed})
  |> filter(fn: (r) => r._measurement == "temperature" and r.city == "${cityName}")
  
`;
  try {
    const queryClient0 = influx.getQueryApi('Proxym');
    const result0 = [];
    await new Promise((resolve, reject) => {
      queryClient0.queryRows(fluxQuery, {
        next: (row, tableMeta) => {
          const tableObject = tableMeta.toObject(row);
          console.log(tableObject);
          resolve(tableObject);
          const formattedStart = new Date(tableObject._start).toISOString().split('T')[0];

          // Push the formatted result into the array
          result0.push({ ...tableObject, formattedStart });
        },
        error: (error) => {
          console.error('Error', error);
          reject(error);
        },
        complete: () => {
          console.log('Query complete.');
        },
      })
    });
    res0.json(result0);
  } catch (error) {
    console.log("Error executing query:", error.message);
    res0.status(500).json({ error: error.message });
  }
};

 */
export async function fetchRelativeHumidity(req, res1) {
  const cityName1 = req.params.cityName;
  const sd = req.params.sd;
  const ed = req.params.ed;
  const fluxQuery1 = `
  from(bucket: "MyWeather")
  |> range(start: today(), stop: 7d)
  |> filter(fn: (r) => r["_measurement"] == "weather_hourly")
  |> filter(fn: (r) => r["city"] == "${cityName1}")
  |> filter(fn: (r) => r["_field"] == "relative_humidity")
`;
  try {
    const queryClient1 = influx.getQueryApi('Proxym');
    const result1 = [];
    await new Promise((resolve, reject) => {
      queryClient1.queryRows(fluxQuery1, {
        next: (row, tableMeta) => {
          const tableObject = tableMeta.toObject(row);
          console.log(tableObject);
          resolve(tableObject);
          result1.push(tableObject);
        },
        error: (error) => {
          console.error('Error', error);
          reject(error);
        },
        complete: () => {
          console.log('Query complete.');
        },
      })
    });
    res1.json(result1);
  } catch (error) {
    console.log("Error executing query:", error.message);
    res1.status(500).json({ error: error.message });
  }
};


export async function fetchWind_speed(req, res2) {

  //console.log("!!!!!!!!!",req.headers.authorization);
  //const JWT_KEY_Token = req.headers.authorization;

  //  const decoded = jwtDecode(JWT_KEY_Token);
  //const preferred_username = "decoded.preferred_username";

  //console.log(preferred_username);

  const cityName2 = req.params.cityName;
  const sd = req.params.sd;
  const ed = req.params.ed;
  const fluxQuery2 = `
  from(bucket: "MyWeather")
  |> range(start: today(), stop: 7d)
  |> filter(fn: (r) => r["_measurement"] == "weather_hourly")
  |> filter(fn: (r) => r["city"] == "${cityName2}")
  |> filter(fn: (r) => r["_field"] == "wind_speed")
`;

  try {
    const queryClient2 = influx.getQueryApi('Proxym');
    const result2 = [];
    await new Promise((resolve, reject) => {
      queryClient2.queryRows(fluxQuery2, {
        next: (row, tableMeta) => {
          const tableObject = tableMeta.toObject(row);
          // console.log(tableObject); 
          resolve(tableObject);
          result2.push(tableObject);
        },
        error: (error) => {
          console.error('Error', error);
          reject(error);
        },
        complete: () => {
          console.log('Query complete.');
        },
      })
    });
    res2.json(result2);
  } catch (error) {
    console.log("Error executing query:", error.message);
    res2.status(500).json({ error: error.message });
  }
};


export async function fetchPrecipitation(req, res3) {
  const cityName3 = req.params.cityName;
  const sd = req.params.sd;
  const ed = req.params.ed;
  const fluxQuery3 = `
  from(bucket: "MyWeather")
  |> range(start: today(), stop: 7d)
  |> filter(fn: (r) => r["_measurement"] == "weather_hourly")
  |> filter(fn: (r) => r["city"] == "${cityName3}")
  |> filter(fn: (r) => r["_field"] == "precipitation")
`;

  try {
    const queryClient3 = influx.getQueryApi('Proxym');
    const result3 = [];
    await new Promise((resolve, reject) => {
      queryClient3.queryRows(fluxQuery3, {
        next: (row, tableMeta) => {
          const tableObject = tableMeta.toObject(row);
          // console.log(tableObject); 
          resolve(tableObject);
          result3.push(tableObject);
        },
        error: (error) => {
          console.error('Error', error);
          reject(error);
        },
        complete: () => {
          console.log('Query complete.');
        },
      })
    });
    res3.json(result3);
  } catch (error) {
    console.log("Error executing query:", error.message);
    res3.status(500).json({ error: error.message });
  }
};



export async function fetchweatherCodes(req, res4) {
 // console.log("iam not protected");
  const cityName4 = req.params.cityName;
  const sd = req.params.sd;
  const ed = req.params.ed;
  const fluxQuery4 = `
  from(bucket: "MyWeather")
  |> range(start: today(), stop: 7d)
  |> filter(fn: (r) => r["_measurement"] == "weather_hourly")
  |> filter(fn: (r) => r["city"] == "${cityName4}")
  |> filter(fn: (r) => r["_field"] == "weatherCodes")
`;
  try {
    const queryClient4 = influx.getQueryApi('Proxym');
    const result4 = [];

    await new Promise((resolve, reject) => {
      queryClient4.queryRows(fluxQuery4, {
        next: (row, tableMeta) => {
          const tableObject = tableMeta.toObject(row);
          console.log(tableObject);
          // Add the condition field based on the weather code
          tableObject.condition = mapWeatherCodeToCondition(tableObject._value.toString());
          result4.push(tableObject);
        },
        error: (error) => {
          console.error('Error', error);
          reject(error);
        },
        complete: () => {
          console.log('Query complete.');
          // Send the response with the modified result array
          res4.json(result4);
          resolve();
        },
      })
    });
  } catch (error) {
    console.log("Error executing query:", error.message);
    res4.status(500).json({ error: error.message });
  }
};
export async function publicEndpoint(req, res4) {
  res4.json("Iam not protected");
};




export async function fetchprobPrecipitation(req, res5) {
  const cityName5 = req.params.cityName;
  const sd = req.params.sd;
  const ed = req.params.ed;
  const fluxQuery5 = `
  from(bucket: "MyWeather")
  |> range(start: today(), stop: 7d)
  |> filter(fn: (r) => r["_measurement"] == "weather_hourly")
  |> filter(fn: (r) => r["city"] == "${cityName5}")
  |> filter(fn: (r) => r["_field"] == "precipitation_prob")
`;
  try {
    const queryClient5 = influx.getQueryApi('Proxym');
    const result5 = [];
    await new Promise((resolve, reject) => {
      queryClient5.queryRows(fluxQuery5, {
        next: (row, tableMeta) => {
          const tableObject = tableMeta.toObject(row);
          // console.log(tableObject); 
          resolve(tableObject);
          result5.push(tableObject);
        },
        error: (error) => {
          console.error('Error', error);
          reject(error);
        },
        complete: () => {
          console.log('Query complete.');
        },
      })
    });
    res5.json(result5);
  } catch (error) {
    console.log("Error executing query:", error.message);
    res5.status(500).json({ error: error.message });
  }
};


export async function fetchvisibility(req, res10) {
  const cityName10 = req.params.cityName;
  const sd = req.params.sd;
  const ed = req.params.ed;
  const fluxQuery10 = `
  from(bucket: "MyWeather")
  |> range(start: today(), stop: 7d)
  |> filter(fn: (r) => r["_measurement"] == "weather_hourly")
  |> filter(fn: (r) => r["city"] == "${cityName10}")
  |> filter(fn: (r) => r["_field"] == "visibility")
`;
  try {
    const queryClient10 = influx.getQueryApi('Proxym');
    const result10 = [];
    await new Promise((resolve, reject) => {
      queryClient10.queryRows(fluxQuery10, {
        next: (row, tableMeta) => {
          const tableObject = tableMeta.toObject(row);
          // console.log(tableObject); 
          resolve(tableObject);
          result10.push(tableObject);
        },
        error: (error) => {
          console.error('Error', error);
          reject(error);
        },
        complete: () => {
          console.log('Query complete.');
        },
      })
    });
    res10.json(result10);
  } catch (error) {
    console.log("Error executing query:", error.message);
    res10.status(500).json({ error: error.message });
  }
};


export async function fetchcloud(req, res11) {
  const cityName11 = req.params.cityName;
  const sd = req.params.sd;
  const ed = req.params.ed;
  const fluxQuery1 = `
  from(bucket: "MyWeather")
  |> range(start: today(), stop: 7d)
  |> filter(fn: (r) => r["_measurement"] == "weather_hourly")
  |> filter(fn: (r) => r["city"] == "${cityName11}")
  |> filter(fn: (r) => r["_field"] == "cloud")
`;
  try {
    const queryClient11 = influx.getQueryApi('Proxym');
    const result11 = [];
    await new Promise((resolve, reject) => {
      queryClient11.queryRows(fluxQuery1, {
        next: (row, tableMeta) => {
          const tableObject = tableMeta.toObject(row);
          // Format the _time field manually to "10 May, Fri" format
          const date = new Date(tableObject._time);
          const options = { weekday: 'short', day: 'numeric', month: 'short' };
          const formattedDate = date.toLocaleString('en-US', options);
          const dayOptions = { weekday: 'short' };
          const dayOfWeek = date.toLocaleDateString('en-US', dayOptions);
          tableObject.days = dayOfWeek;
        
          tableObject._time = formattedDate;
          result11.push(tableObject);
        },
        error: (error) => {
          console.error('Error', error);
          reject(error);
        },
        complete: () => {
          console.log('Query complete.');
          resolve();
        },
      })
    });
    res11.json(result11);
  } catch (error) {
    console.log("Error executing query:", error.message);
    res11.status(500).json({ error: error.message });
  }
}


export async function fetchtemperaturesol(req, res12) {
  const cityName12 = req.params.cityName;
  //const sd = req.params.sd;
  //const ed = req.params.ed;
  const fluxQuery12 = `
  from(bucket: "MyWeather")
  |> range(start: today(), stop: 1d)
  |> filter(fn: (r) => r["_measurement"] == "weather_hourly")
  |> filter(fn: (r) => r["city"] == "${cityName12}")
  |> filter(fn: (r) => r["_field"] == "soil_temperature")
  |> mean()
`;
  try {
    const queryClient12 = influx.getQueryApi('Proxym');
    const result12 = [];
    await new Promise((resolve, reject) => {
      queryClient12.queryRows(fluxQuery12, {
        next: (row, tableMeta) => {
          const tableObject = tableMeta.toObject(row);
          console.log(tableObject);
          resolve(tableObject);
          result12.push(tableObject);
        },
        error: (error) => {
          console.error('Error', error);
          reject(error);
        },
        complete: () => {
          console.log('Query complete.');
        },
      })
    });
    res12.json(result12);
  } catch (error) {
    console.log("Error executing query:", error.message);
    res12.status(500).json({ error: error.message });
  }
}

//**************************Daily_weather_forcast*****************************//

export async function fetchDailymaxtemperatures(req, res5) {
  const cityName5 = req.params.cityName;

  const fluxQuery = `
    from(bucket: "weatherdaily1")
    |> range(start: today(), stop: 7d)
    |> filter(fn: (r) => r["_measurement"] == "daily_weather")
    |> filter(fn: (r) => r["city"] == "${cityName5}")
    |> filter(fn: (r) => r["_field"] == "max_temperature")
  `;
  try {
    const queryClient5 = influx.getQueryApi('Proxym');
    const result5 = [];

    await new Promise((resolve, reject) => {
      queryClient5.queryRows(fluxQuery, {
        next: (row, tableMeta) => {
          const tableObject = tableMeta.toObject(row);
          // Format the _time field manually to "10 May, Fri" format
          const date = new Date(tableObject._time);
          const options = { weekday: 'short', day: 'numeric', month: 'short' };
          const formattedDate = date.toLocaleString('en-US', options);
          const dayOptions = { weekday: 'short' };
          const dayOfWeek = date.toLocaleDateString('en-US', dayOptions);
          tableObject.days = dayOfWeek;
        
          tableObject._time = formattedDate;
          result5.push(tableObject);
        },
        error: (error) => {
          console.error('Error', error);
          reject(error);
        },
        complete: () => {
          console.log('Query complete.');
          resolve();
        },
      });
    });

    res5.json(result5);
  } catch (error) {
    console.error('Error fetching daily max temperatures:', error);
    res5.status(500).json({ error: 'Internal server error' });
  }
}



export async function fetchDailymintemperatures(req, res6) {
  const cityName6 = req.params.cityName;

  const fluxQuery = `
    from(bucket: "weatherdaily1")
    |> range(start: -7d, stop: 7d)
    |> filter(fn: (r) => r["_measurement"] == "daily_weather")
    |> filter(fn: (r) => r["city"] == "${cityName6}")
    |> filter(fn: (r) => r["_field"] == "min_temperature")
  `;
  try {
    const queryClient6 = influx.getQueryApi('Proxym');
    const result6 = [];

    await new Promise((resolve, reject) => {
      queryClient6.queryRows(fluxQuery, {
        next: (row, tableMeta) => {
          const tableObject = tableMeta.toObject(row);
          // Format the _time field manually to "10 May, Fri" format
          const date = new Date(tableObject._time);
          const options = { weekday: 'short', day: 'numeric', month: 'short' };
          const formattedDate = date.toLocaleString('en-US', options);
          tableObject._time = formattedDate;
          result6.push(tableObject);
        },
        error: (error) => {
          console.error('Error', error);
          reject(error);
        },
        complete: () => {
          console.log('Query complete.');
          resolve();
        },
      });
    });
    res6.json(result6);
  } catch (error) {
    console.log("Error executing query:", error.message);
    res6.status(500).json({ error: error.message });
  }
};


export async function fetchDailysumprecipitation(req, res7) {
  const cityName7 = req.params.cityName;

  const fluxQuery = `
  from(bucket: "weatherdaily1")
  |> range(start: -7d, stop: 7d)
  |> filter(fn: (r) => r["_measurement"] == "daily_weather")
  |> filter(fn: (r) => r["city"] == "${cityName7}")
  |> filter(fn: (r) => r["_field"] == "precipitation_sum")
`;
  try {
    const queryClient7 = influx.getQueryApi('Proxym');
    const result7 = [];

    await new Promise((resolve, reject) => {
      queryClient7.queryRows(fluxQuery, {
        next: (row, tableMeta) => {
          const tableObject = tableMeta.toObject(row);
          // Format the _time field manually to "10 May, Fri" format
          const date = new Date(tableObject._time);
          const options = { weekday: 'short', day: 'numeric', month: 'short' };
          const formattedDate = date.toLocaleString('en-US', options);
          tableObject._time = formattedDate;
          result7.push(tableObject);
        },
        error: (error) => {
          console.error('Error', error);
          reject(error);
        },
        complete: () => {
          console.log('Query complete.');
          resolve();
        },
      });
    });
    res7.json(result7);
  } catch (error) {
    console.log("Error executing query:", error.message);
    res7.status(500).json({ error: error.message });
  }
};


export async function fetchDailymaxwind_speed(req, res8) {
  const cityName8 = req.params.cityName;
  const fluxQuery = `
  from(bucket: "weatherdaily1")
  |> range(start: -7d, stop: 7d)
  |> filter(fn: (r) => r["_measurement"] == "daily_weather")
  |> filter(fn: (r) => r["city"] == "${cityName8}")
  |> filter(fn: (r) => r["_field"] == "max_wind_speed")
`;
  try {
    const queryClient8 = influx.getQueryApi('Proxym');
    const result8 = [];
    await new Promise((resolve, reject) => {
      queryClient8.queryRows(fluxQuery, {
        next: (row, tableMeta) => {
          const tableObject = tableMeta.toObject(row);
          // Format the _time field manually to "10 May, Fri" format
          const date = new Date(tableObject._time);
          const options = { weekday: 'short', day: 'numeric', month: 'short' };
          const formattedDate = date.toLocaleString('en-US', options);
          tableObject._time = formattedDate;
          result8.push(tableObject);
        },
        error: (error) => {
          console.error('Error', error);
          reject(error);
        },
        complete: () => {
          console.log('Query complete.');
          resolve();
        },
      });
    });
    res8.json(result8);
  } catch (error) {
    console.log("Error executing query:", error.message);
    res8.status(500).json({ error: error.message });
  }
};


export async function fetchDailydailyweatherCodes(req, res9) {
  const cityName9 = req.params.cityName;

  const fluxQuery = `
  from(bucket: "MyWeather")
  |> range(start: -1h)
  |> filter(fn: (r) => r["_measurement"] == "weather_hourly")
  |> filter(fn: (r) => r["city"] == "${cityName9}")
  |> filter(fn: (r) => r["_field"] == "weatherCodes")
`;
  try {
    const queryClient9 = influx.getQueryApi('Proxym');
    const result9 = [];
    await new Promise((resolve, reject) => {
      queryClient9.queryRows(fluxQuery, {
        next: (row, tableMeta) => {
          const tableObject = tableMeta.toObject(row);
          tableObject.condition = mapWeatherCodeToCondition(tableObject._value.toString());
          // Format the _time field manually to "10 May, Fri" format
          const date = new Date(tableObject._time);
          const options = { weekday: 'short', day: 'numeric', month: 'short' };
          const formattedDate = date.toLocaleString('en-US', options);
          tableObject._time = formattedDate;
          result9.push(tableObject);
        },
        error: (error) => {
          console.error('Error', error);
          reject(error);
        },
        complete: () => {
          console.log('Query complete.');
          resolve();
        },
      });
    });
    return result9;
  } catch (error) {
    console.log("Error executing query:", error.message);
    res9.status(500).json({ error: error.message });
  }
};

export async function fetchdailyprobprecipitations(req, res9) {
  const cityName9 = req.params.cityName;
  const fluxQuery = `
  from(bucket: "weatherdaily1")
  |> range(start:today(), stop: 7d)
  |> filter(fn: (r) => r["_measurement"] == "daily_weather")
  |> filter(fn: (r) => r["city"] == "${cityName9}")
  |> filter(fn: (r) => r["_field"] == "probab_precipitation")
`;
  try {
    const queryClient9 = influx.getQueryApi('Proxym');
    const result9 = [];
    await new Promise((resolve, reject) => {
      queryClient9.queryRows(fluxQuery, {
        next: (row, tableMeta) => {
          const tableObject = tableMeta.toObject(row);
          // Format the _time field manually to "10 May, Fri" format
          const date = new Date(tableObject._time);
          const options = { weekday: 'short' };
          const formattedDate = date.toLocaleString('en-US', options);
          tableObject._time = formattedDate;
          result9.push(tableObject);
        },
        error: (error) => {
          console.error('Error', error);
          reject(error);
        },
        complete: () => {
          console.log('Query complete.');
          resolve();
        },
      });
    });
    res9.json(result9);
  } catch (error) {
    console.log("Error executing query:", error.message);
    res9.status(500).json({ error: error.message });
  }
};

//**************************Air_Quality_Forcast*****************************//

export async function fetchuvindex(req, res10) {
  const cityName10 = req.params.cityName;
  const sd = req.params.sd;
  const ed = req.params.ed;
  const fluxQuery10 = `
  from(bucket: "weatherAirquality")
  |> range(start: today(), stop: 3d)
  |> filter(fn: (r) => r["_measurement"] == "daily_Airquality")
  |> filter(fn: (r) => r["city"] == "${cityName10}")
  |> filter(fn: (r) => r["_field"] == "uv_index")

  
`;
  try {
    const queryClient10 = influx.getQueryApi('Proxym');
    const result10 = [];
    await new Promise((resolve, reject) => {
      queryClient10.queryRows(fluxQuery10, {
        next: (row, tableMeta) => {
          const tableObject = tableMeta.toObject(row);
          // Format the _time field manually to "10 May, Fri" format
          const date = new Date(tableObject._time);
          const options = { weekday: 'short', day: 'numeric', month: 'short' };
          const formattedDate = date.toLocaleString('en-US', options);
          tableObject._time = formattedDate;
          resolve(tableObject);
          result10.push(tableObject);
        },
        error: (error) => {
          console.error('Error', error);
          reject(error);
        },
        complete: () => {
          console.log('Query complete.');
        },
      })
    });
    res10.json(result10);
  } catch (error) {
    console.log("Error executing query:", error.message);
    res10.status(500).json({ error: error.message });
  }
};


export async function fetchpm(req, res14) {
  const cityName14 = req.params.cityName;
  const sd = req.params.sd;
  const ed = req.params.ed;
  const fluxQuery14 = `
  from(bucket: "weatherAirquality")
  |> range(start: -7d, stop: 7d)
  |> filter(fn: (r) => r["_measurement"] == "daily_Airquality")
  |> filter(fn: (r) => r["city"] == "${cityName14}")
  |> filter(fn: (r) => r["_field"] == "pm10")

`;
  try {
    const queryClient14 = influx.getQueryApi('Proxym');
    const result14 = [];
    await new Promise((resolve, reject) => {
      queryClient14.queryRows(fluxQuery14, {
        next: (row, tableMeta) => {
          const tableObject = tableMeta.toObject(row);
          // console.log(tableObject); 
          resolve(tableObject);
          result14.push(tableObject);
        },
        error: (error) => {
          console.error('Error', error);
          reject(error);
        },
        complete: () => {
          console.log('Query complete.');
        },
      })
    });
    res14.json(result14);
  } catch (error) {
    console.log("Error executing query:", error.message);
    res14.status(500).json({ error: error.message });
  }
};


export async function fetchcarbonmonoxide(req, res15) {
  const cityName15 = req.params.cityName;
  const sd = req.params.sd;
  const ed = req.params.ed;
  const fluxQuery15 = `
  from(bucket: "weatherAirquality")
  |> range(start: -7d, stop: 7d)
  |> filter(fn: (r) => r["_measurement"] == "daily_Airquality")
  |> filter(fn: (r) => r["city"] == "${cityName15}")
  |> filter(fn: (r) => r["_field"] == "carbon_monoxide")
  |>mean()
`;
  try {
    const queryClient15 = influx.getQueryApi('Proxym');
    const result15 = [];
    await new Promise((resolve, reject) => {
      queryClient15.queryRows(fluxQuery15, {
        next: (row, tableMeta) => {
          const tableObject = tableMeta.toObject(row);
          // console.log(tableObject); 
          resolve(tableObject);
          result15.push(tableObject);
        },
        error: (error) => {
          console.error('Error', error);
          reject(error);
        },
        complete: () => {
          console.log('Query complete.');
        },
      })
    });
    res15.json(result15);
  } catch (error) {
    console.log("Error executing query:", error.message);
    res15.status(500).json({ error: error.message });
  }
};

export async function fetchnitrogendioxide(req, res16) {
  const cityName16 = req.params.cityName;
  const sd = req.params.sd;
  const ed = req.params.ed;
  const fluxQuery16 = `
  from(bucket: "weatherAirquality")
  |> range(start: -7d, stop: 7d)
  |> filter(fn: (r) => r["_measurement"] == "daily_Airquality")
  |> filter(fn: (r) => r["city"] == "${cityName16}")
  |> filter(fn: (r) => r["_field"] == "nitrogen_dioxide")
`;
  try {
    const queryClient16 = influx.getQueryApi('Proxym');
    const result16 = [];
    await new Promise((resolve, reject) => {
      queryClient16.queryRows(fluxQuery16, {
        next: (row, tableMeta) => {
          const tableObject = tableMeta.toObject(row);
          // console.log(tableObject); 
          resolve(tableObject);
          result16.push(tableObject);
        },
        error: (error) => {
          console.error('Error', error);
          reject(error);
        },
        complete: () => {
          console.log('Query complete.');
        },
      })
    });
    res16.json(result16);
  } catch (error) {
    console.log("Error executing query:", error.message);
    res16.status(500).json({ error: error.message });
  }
};


export async function fetchozone(req, res17) {
  const cityName17 = req.params.cityName;
  const sd = req.params.sd;
  const ed = req.params.ed;
  const fluxQuery17 = `
  from(bucket: "weatherAirquality")
  |> range(start: -7d, stop: 7d)
  |> filter(fn: (r) => r["_measurement"] == "daily_Airquality")
  |> filter(fn: (r) => r["city"] == "${cityName17}")
  |> filter(fn: (r) => r["_field"] == "ozone")
`;
  try {
    const queryClient17 = influx.getQueryApi('Proxym');
    const result17 = [];
    await new Promise((resolve, reject) => {
      queryClient17.queryRows(fluxQuery17, {
        next: (row, tableMeta) => {
          const tableObject = tableMeta.toObject(row);
          // console.log(tableObject); 
          resolve(tableObject);
          result17.push(tableObject);
        },
        error: (error) => {
          console.error('Error', error);
          reject(error);
        },
        complete: () => {
          console.log('Query complete.');
        },
      })
    });
    res17.json(result17);
  } catch (error) {
    console.log("Error executing query:", error.message);
    res17.status(500).json({ error: error.message });
  }
};

export async function fetchdust(req, res18) {
  const cityName18 = req.params.cityName;
  const sd = req.params.sd;
  const ed = req.params.ed;
  const fluxQuery18 = `
  from(bucket: "weatherAirquality")
  |> range(start: -7d, stop: 7d)
  |> filter(fn: (r) => r["_measurement"] == "daily_Airquality")
  |> filter(fn: (r) => r["city"] == "${cityName18}")
  |> filter(fn: (r) => r["_field"] == "dust")
`;
  try {
    const queryClient18 = influx.getQueryApi('Proxym');
    const result18 = [];
    await new Promise((resolve, reject) => {
      queryClient18.queryRows(fluxQuery18, {
        next: (row, tableMeta) => {
          const tableObject = tableMeta.toObject(row);
          // console.log(tableObject); 
          resolve(tableObject);
          result18.push(tableObject);
        },
        error: (error) => {
          console.error('Error', error);
          reject(error);
        },
        complete: () => {
          console.log('Query complete.');
        },
      })
    });
    res18.json(result18);
  } catch (error) {
    console.log("Error executing query:", error.message);
    res18.status(500).json({ error: error.message });
  }
};
//**************************Marine_Forcast*****************************//
export async function fetchDailymax_wave_height(req, res11) {
  const cityName11 = req.params.cityName;

  const fluxQuery11 = `
    from(bucket: "weatherMarine1")
    |> range(start: -1h, stop: 1d)
    |> filter(fn: (r) => r["_measurement"] == "weatherMarine")
    |> filter(fn: (r) => r["city"] == "${cityName11}")
    |> filter(fn: (r) => r["_field"] == "wave_height")
    |>mean()
    
  `;
  try {
    const queryClient11 = influx.getQueryApi('Proxym');
    const result11 = [];

    await new Promise((resolve, reject) => {
      queryClient11.queryRows(fluxQuery11, {
        next: (row, tableMeta) => {
          const tableObject = tableMeta.toObject(row);
          // Format the _time field manually to "10 May, Fri" format
          const date = new Date(tableObject._time);
          const options = { weekday: 'short', day: 'numeric', month: 'short' };
          const formattedDate = date.toLocaleString('en-US', options);
          tableObject._time = formattedDate;
          result11.push(tableObject);
        },
        error: (error) => {
          console.error('Error', error);
          reject(error);
        },
        complete: () => {
          console.log('Query complete.');
          resolve();
        },
      });
    });
    res11.json(result11);
  } catch (error) {
    console.log("Error executing query:", error.message);
    res11.status(500).json({ error: error.message });
  }
};


export async function fetchDailymax_wave_direction(req, res12) {
  const cityName12 = req.params.cityName;
  const fluxQuery12 = `
    from(bucket: "weatherMarine1")
    |> range(start: -1h, stop: 1d)
    |> filter(fn: (r) => r["_measurement"] == "weatherMarine")
    |> filter(fn: (r) => r["city"] == "${cityName12}")
    |> filter(fn: (r) => r["_field"] == "wave_direction")
    |>mean()
  `;
  try {
    const queryClient12 = influx.getQueryApi('Proxym');
    const result12 = [];

    await new Promise((resolve, reject) => {
      queryClient12.queryRows(fluxQuery12, {
        next: (row, tableMeta) => {
          const tableObject = tableMeta.toObject(row);
          // Format the _time field manually to "10 May, Fri" format
          const date = new Date(tableObject._time);
          const options = { weekday: 'short', day: 'numeric', month: 'short' };
          const formattedDate = date.toLocaleString('en-US', options);
          tableObject._time = formattedDate;
          result12.push(tableObject);
        },
        error: (error) => {
          console.error('Error', error);
          reject(error);
        },
        complete: () => {
          console.log('Query complete.');
          resolve();
        },
      });
    });
    res12.json(result12);
  } catch (error) {
    console.log("Error executing query:", error.message);
    res12.status(500).json({ error: error.message });
  }
};


export async function fetchDailymax_wave_period(req, res13) {
  const cityName13 = req.params.cityName;
  const fluxQuery13 = `
    from(bucket: "weatherMarine1")
    |> range(start: -1h, stop: 1d)
    |> filter(fn: (r) => r["_measurement"] == "weatherMarine")
    |> filter(fn: (r) => r["city"] == "${cityName13}")
    |> filter(fn: (r) => r["_field"] == "pave_period")
    |>mean()
  `;
  try {
    const queryClient13 = influx.getQueryApi('Proxym');
    const result13 = [];
   

    await new Promise((resolve, reject) => {
      queryClient13.queryRows(fluxQuery13, {
        next: (row, tableMeta) => {
          const tableObject = tableMeta.toObject(row);
          // Format the _time field manually to "10 May, Fri" format
          const date = new Date(tableObject._time);
          const options = { weekday: 'short', day: 'numeric', month: 'short' };
          const formattedDate = date.toLocaleString('en-US', options);
          tableObject._time = formattedDate;
          result13.push(tableObject);
        },
        error: (error) => {
          console.error('Error', error);
          reject(error);
        },
        complete: () => {
          console.log('Query complete.');
          resolve();
        },
      });
    });
    //return result13
    res13.json(result13);
  } catch (error) {
    console.log("Error executing query:", error.message);
    res13.status(500).json({ error: error.message });
  }
};
///////////////////////////////////

export async function getHourlyTemperature(req, res) {

  const cityName = req.params.cityName;
  if (!cityName) {
    return res.status(400).json({ error: "City name is required." });
  }

  try {
    const query = `from(bucket: "dailyMean")
      |> range(start: -1h)
      |> filter(fn: (r) => r["_measurement"] == "hourly_weather")
      |> filter(fn: (r) => r["_field"] == "temperature")
      |> filter(fn: (r) => r["city"] == "${cityName}")
      `
      ;

    const result = await queryApi.collectRows(query);
    if (result.length === 0) {
      return res.status(404).json({ error: "No temperature data found for the specified city." });
    }

    return res.json(result);
  } catch (error) {
    console.error("Error fetching temperature data:", error.message);
    return res.status(500).json({ error: "Internal server error." });
  }
}

export async function getHourlyHumidity(req, res) {
  const cityName = req.params.cityName;
  if (!cityName) {
    return res.status(400).json({ error: "City name is required." });
  }

  try {
    const query = `from(bucket: "dailyMean")
      |> range(start: -1h)
      |> filter(fn: (r) => r["_measurement"] == "hourly_weather")
      |> filter(fn: (r) => r["_field"] == "humidity")
      |> filter(fn: (r) => r["city"] == "${cityName}")
      `
      ;

    const result = await queryApi.collectRows(query);
    if (result.length === 0) {
      return res.status(404).json({ error: "No humidity data found for the specified city." });
    }

    return res.json(result);
  } catch (error) {
    console.error("Error fetching humidity data:", error.message);
    return res.status(500).json({ error: "Internal server error." });
  }
}

export async function getHourlyPrecipitation(req, res) {
  const cityName = req.params.cityName;
  if (!cityName) {
    return res.status(400).json({ error: "City name is required." });
  }

  try {
    const query = `from(bucket: "dailyMean")
      |> range(start: -1h)
      |> filter(fn: (r) => r["_measurement"] == "hourly_weather")
      |> filter(fn: (r) => r["_field"] == "precipitation")
      |> filter(fn: (r) => r["city"] == "${cityName}")
     `
      ;

    const result = await queryApi.collectRows(query);
    if (result.length === 0) {
      return res.status(404).json({ error: "No precipitation data found for the specified city." });
    }

    return res.json(result);
  } catch (error) {
    console.error("Error fetching precipitation data:", error.message);
    return res.status(500).json({ error: "Internal server error." });
  }
}

export async function getHourlyWindSpeed(req, res) {
  const cityName = req.params.cityName;
  if (!cityName) {
    return res.status(400).json({ error: "City name is required." });
  }

  try {
    const query = `from(bucket: "dailyMean")
      |> range(start: -1h)
      |> filter(fn: (r) => r["_measurement"] == "hourly_weather")
      |> filter(fn: (r) => r["_field"] == "wind_speed")
      |> filter(fn: (r) => r["city"] == "${cityName}")
      `
      ;

    const result = await queryApi.collectRows(query);
    if (result.length === 0) {
      return res.status(404).json({ error: "No wind speed data found for the specified city." });
    }

    return res.json(result);
  } catch (error) {
    console.error("Error fetching wind speed data:", error.message);
    return res.status(500).json({ error: "Internal server error." });
  }
}


async function getAllCities(req, res) {
  try {
      const searchTerm = req.query.searchTerm || '';
      const cities = await fetchAllCities();
      const filteredCities = cities.filter(city => city.toLowerCase().startsWith(searchTerm.toLowerCase()));
      res.status(200).json(filteredCities);
  } catch (error) {
      res.status(500).json({ error: 'An error occurred while fetching cities' });
  }
}

export { getAllCities };


////////////
async function decodeToken(req, res) {
  const JWT_KEY_Token = req.headers.authorization;
  if (!JWT_KEY_Token) {
    return res.status(400).send('No JWT token provided');
  }

  try {
    const decoded = jwtDecode(JWT_KEY_Token);
    const preferred_username = decoded.preferred_username;
    res.send(preferred_username);
    console.log(decoded);
  } catch (error) {
    res.status(400).send('Invalid JWT token');
  }
}

async function addToFavorites(req, res) {
  const JWT_KEY_Token = req.headers.authorization;
  const { city } = req.params;

  if (!JWT_KEY_Token) {
    return res.status(400).send('No JWT token provided');
  }

  try {
    const decoded = jwtDecode(JWT_KEY_Token);
    const preferred_username = decoded.preferred_username;

    await addCityToFavorites(preferred_username, city);
    res.send(`Favorite city ${city} added for user ${preferred_username}`);
  } catch (error) {
    console.error('Error adding city to favorites:', error);
    res.status(500).send('Error adding city to favorites');
  }
}
async function deleteFromFavorites(req, res) {
  const JWT_KEY_Token = req.headers.authorization;
  const { city } = req.params;

  if (!JWT_KEY_Token) {
    return res.status(400).send('No JWT token provided');
  }

  try {
    const decoded = jwtDecode(JWT_KEY_Token);
    const preferred_username = decoded.preferred_username;

    await removeCityFromFavorites(preferred_username, city);
    res.send(`Favorite city ${city} removed for user ${preferred_username}`);
  } catch (error) {
    console.error('Error removing city from favorites:', error);
    res.status(500).send('Error removing city from favorites');
  }
}

async function getFavorites(req, res) {
  const JWT_KEY_Token = req.headers.authorization;

  if (!JWT_KEY_Token) {
    return res.status(400).send('No JWT token provided');
  }

  try {
    const decoded = jwtDecode(JWT_KEY_Token);
    const preferred_username = decoded.preferred_username;

    const favorites = await getFavoriteCities(preferred_username);
    res.json(favorites);
  } catch (error) {
    console.error('Error getting favorite cities:', error);
    res.status(500).send('Error getting favorite cities');
  }
}
const registerTokenController = async (req, res) => {
  const { token } = req.body;
  console.log('Received token: ', req.body);

  if (!token) {
    return res.status(400).send('Token is required');
  }

  try {
    // Construct the data point
    const point = new Point('token_measurement') // Name of the measurement
      .tag('source', 'app') // You can add tags if needed
      .stringField('token', token);

    // Write the point to the fcmTokens bucket
    writeApi.writePoint(point);
    await writeApi.flush(); // Ensure the data is written

    return res.status(200).send('Token registered successfully');
  } catch (err) {
    console.error('Error while registering token:', err);
    return res.status(500).send('Error while registering token');
  }
}
export { decodeToken, addToFavorites,getFavorites,deleteFromFavorites ,registerTokenController};
