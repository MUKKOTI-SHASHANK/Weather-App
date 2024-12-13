import { DateTime } from "luxon";
const BASE_URL = "https://api.openweathermap.org/data/2.5";
const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + "/" + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: 'e664f5d3feba085980a2d1a3ea7507ff' });
  //e664f5d3feba085980a2d1a3ea7507ff
  //1fa9ff4126d95b8db54f3897a208e91c (Old)

  return fetch(url).then((res) => res.json());
};

const formatCurrentWeather = (data) => {
  const {
    coord: { lat, lon },
    main: { temp, temp_min, temp_max },
    name,
    dt,
    sys: { country},
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
  let { time, daily, hourly } = data;
  daily = daily.slice(1, 8).map((day) => {
    return {
      title: formatToLocalTime(day.dt, time, "cccc"),
      temp: day.temp.day,
      icon: day.weather[0].icon,
    };
  });

  hourly = hourly.slice(1, 12).map((day) => {
    return {
      title: formatToLocalTime(day.dt, time, "hh:mm a"),
      temp: day.temp,
      icon: day.weather[0].icon,
    };
  });

  return { time, daily, hourly };
};

const getFormattedWeatherData = async (searchParams) => {
  const formattedCurrentWeather = await getWeatherData(
    "weather",
    searchParams
  ).then(formatCurrentWeather);

  const { lat, lon } = formattedCurrentWeather;

  const formattedForecastWeather = await getWeatherData("onecall", {
    lat,
    lon,
    exclude: "current,minutely,alerts",
    units: searchParams.units,
  }).then(formatForecastWeather);

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
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
