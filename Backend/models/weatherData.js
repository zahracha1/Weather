export class WeatherData {
  constructor(
    cityName,
    coordinates,
    temperatures,
    relativeHumidity,
    precipitation,
    wind_speed,
    sd,
    ed,
    weatherCodes,
    maxtemperatures,
    mintemperatures,
    sumprecipitation,
    maxwind_speed,
    dailyweatherCodes,
    probprecipitation,
    visible,
    cloud,
    uvindex,
    soiltemperature,
    waveheight,
    pm,
    carbonmonoxide,
    nitrogendioxide,
    ozones,
    dusts,
  ) {
    this.cityName = cityName;
    this.coordinates = coordinates;
    this.temperatures = temperatures;
    this.relativeHumidity = relativeHumidity;
    this.precipitation = precipitation;
    this.wind_speed = wind_speed;
    this.sd = sd;
    this.ed = ed;
    this.weatherCodes = weatherCodes;
    this.maxtemperatures = maxtemperatures;
    this.mintemperatures = mintemperatures;
    this.sumprecipitation = sumprecipitation;
    this.maxwind_speed = maxwind_speed;
    this.dailyweatherCodes = dailyweatherCodes;
    this.dailyprobprecipitations = dailyprobprecipitations;
    this.probprecipitation = probprecipitation;
    this.visible = visible;
    thid.cloud = cloud;
    this.uvindex = uvindex;
    this.soiltemperature = soiltemperature;
    this.waveheight = waveheight;
    this. pm= pm;
    this. carbonmonoxide= carbonmonoxide;
    this.nitrogendioxide=nitrogendioxide;
    this.ozones=ozones;
    this.dusts=dusts;
  }
}
