// import { DateTime } from "luxon";
// const BASE_URL = "https://api.openweathermap.org/data/2.5";
// const getWeatherData = (infoType, searchParams) => {
//   const url = new URL(BASE_URL + "/" + infoType);
//   url.search = new URLSearchParams({ ...searchParams, appid: 'e664f5d3feba085980a2d1a3ea7507ff' });
//   //e664f5d3feba085980a2d1a3ea7507ff
//   //1fa9ff4126d95b8db54f3897a208e91c (Old)

//   return fetch(url).then((res) => res.json());
// };

// const formatCurrentWeather = (data) => {
//   const {
//     coord: { lat, lon },
//     main: { temp, temp_min, temp_max },
//     name,
//     dt,
//     sys: { country},
//     weather,
//   } = data;

//   const { main: icon } = weather[0];

//   return {
//     lat,
//     lon,
//     temp,
//     temp_min,
//     temp_max,
//     name,
//     dt,
//     country,
//     icon,
//   };
// };

// const formatForecastWeather = (data) => {
//   let { time, daily, hourly } = data;
//   daily = daily.slice(1, 8).map((day) => {
//     return {
//       title: formatToLocalTime(day.dt, time, "cccc"),
//       temp: day.temp.day,
//       icon: day.weather[0].icon,
//     };
//   });

//   hourly = hourly.slice(1, 12).map((day) => {
//     return {
//       title: formatToLocalTime(day.dt, time, "hh:mm a"),
//       temp: day.temp,
//       icon: day.weather[0].icon,
//     };
//   });

//   return { time, daily, hourly };
// };

// const getFormattedWeatherData = async (searchParams) => {
//   const formattedCurrentWeather = await getWeatherData(
//     "weather",
//     searchParams
//   ).then(formatCurrentWeather);

//   const { lat, lon } = formattedCurrentWeather;

//   const formattedForecastWeather = await getWeatherData("forecast", {
//     lat,
//     lon,
//     exclude: "current,minutely,alerts",
//     units: searchParams.units,
//   }).then(formatForecastWeather);

//   return { ...formattedCurrentWeather, ...formattedForecastWeather };
// };

// const formatToLocalTime = (
//   secs,
//   zone,
//   format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
// ) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

// const iconUrlFromCode = (code) =>
//   `http://openweathermap.org/img/wn/${code}@2x.png`;

// export default getFormattedWeatherData;

// export { formatToLocalTime, iconUrlFromCode };












import { DateTime } from "luxon";

const BASE_URL = "https://api.openweathermap.org/data/2.5";

// Function to fetch weather data based on the type of info (e.g., 'weather' or 'forecast')
const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: 'e664f5d3feba085980a2d1a3ea7507ff' });
  return fetch(url).then((res) => res.json());
};

// Format the forecast data
const formatForecastWeather = (data) => {
  if (!data || !data.daily || !data.hourly) {
    console.error("Forecast data is missing daily or hourly fields", data);
    return { daily: [], hourly: [] };  // Return empty arrays if no data available
  }

  let { daily, hourly } = data;

  // Slice daily data (only if available)
  daily = Array.isArray(daily) ? daily.slice(1, 8).map((day) => {
    return {
      title: formatToLocalTime(day.dt, data.timezone, "cccc"),
      temp: day.temp.day,
      icon: day.weather[0].icon,
    };
  }) : [];

  // Slice hourly data (only if available)
  hourly = Array.isArray(hourly) ? hourly.slice(1, 12).map((day) => {
    return {
      title: formatToLocalTime(day.dt, data.timezone, "hh:mm a"),
      temp: day.temp,
      icon: day.weather[0].icon,
    };
  }) : [];

  return { daily, hourly };
};

// Main function to get forecast weather data
const getFormattedForecastData = async (searchParams) => {
  const { lat, lon } = searchParams;

  const formattedForecastWeather = await getWeatherData("forecast", {
    lat,
    lon,
    exclude: "current,minutely,alerts", // You can adjust the `exclude` parameter as needed
    units: searchParams.units,
  }).then(formatForecastWeather);

  return formattedForecastWeather;
};

// Helper function to format time
const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a") =>
  DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

// Icon URL generator
const iconUrlFromCode = (code) => `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedForecastData;
export { formatToLocalTime, iconUrlFromCode };
