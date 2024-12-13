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

//   const formattedForecastWeather = await getWeatherData("onecall", {
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
const API_KEY = "e664f5d3feba085980a2d1a3ea7507ff"; // Your OpenWeatherMap API key

const getWeatherData = async (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }
    return await res.json();
  } catch (error) {
    console.error("Error fetching weather data:", error.message);
    throw error; // Re-throw for higher-level handling
  }
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, temp_min, temp_max },
    name,
    dt,
    sys: { country },
    weather,
  } = data;

  const { main: icon } = weather[0];

  return {
    lat,
    lon,
    temp,
    temp_min,
    temp_max,
    name,
    dt,
    country,
    icon,
  };
};

const formatForecastWeather = (data) => {
  const { timezone, daily = [], hourly = [] } = data;

  if (!daily.length || !hourly.length) {
    console.error("Missing forecast data:", data);
  }

  const formattedDaily = daily.slice(1, 8).map((day) => ({
    title: formatToLocalTime(day.dt, timezone, "cccc"),
    temp: day.temp.day,
    icon: day.weather[0].icon,
  }));

  const formattedHourly = hourly.slice(1, 12).map((hour) => ({
    title: formatToLocalTime(hour.dt, timezone, "hh:mm a"),
    temp: hour.temp,
    icon: hour.weather[0].icon,
  }));

  return { timezone, daily: formattedDaily, hourly: formattedHourly };
};

const getFormattedWeatherData = async (searchParams) => {
  try {
    console.log("Fetching current weather...");
    const formattedCurrentWeather = await getWeatherData(
      "weather",
      searchParams
    ).then(formatCurrentWeather);

    const { lat, lon } = formattedCurrentWeather;

    console.log("Fetching forecast weather...");
    const formattedForecastWeather = await getWeatherData("onecall", {
      lat,
      lon,
      exclude: "current,minutely,alerts",
      units: searchParams.units,
    }).then(formatForecastWeather);

    return { ...formattedCurrentWeather, ...formattedForecastWeather };
  } catch (error) {
    console.error("Error getting formatted weather data:", error.message);
  }
};

const formatToLocalTime = (
  secs,
  zone,
  format = "cccc, dd LLL yyyy' | Local time: 'hh:mm a"
) => DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = (code) =>
  `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;
export { formatToLocalTime, iconUrlFromCode };
