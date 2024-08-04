export function mapWeatherCodeToCondition(weatherCode) {
    // Mapping of weather codes to conditions
    const conditionMappings = {
      "0": "Sunny",
      "1": "Mainly Sunny",
      "2": "Partly Cloudy",
      "3": "Cloudy",
      "45": "Foggy",
      "48": "Rime Fog",
      "51": "Light Drizzle",
      "53": "Drizzle",
      "55": "Heavy Drizzle",
      "56": "Light Freezing Drizzle",
      "57": "Freezing Drizzle",
      "61": "Light Rain",
      "63": "Rain",
      "65": "Heavy Rain",
      "66": "Light Freezing Rain",
      "67": "Freezing Rain",
      "71": "Light Snow",
      "73": "Snow",
      "75": "Heavy Snow",
      "77": "Snow Grains",
      "80": "Light Showers",
      "81": "Showers",
      "82": "Heavy Showers",
      "85": "Light Snow Showers",
      "86": "Snow Showers",
      "95": "Thunderstorm",
      "96": "Light Thunderstorms With Hail",
      "99": "Thunderstorm With Hail"
    };
  
    return conditionMappings[weatherCode] || `Weather code ${weatherCode}`;
  }
  
