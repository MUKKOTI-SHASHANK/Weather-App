import "./App.css";
import Favplaces from "./components/Favplaces";
import InputData from "./components/Inputdata";
import TimeAndLocationDetails from "./components/TimeAndLocationDetails";
import TempDetails from "./components/TempDetails";
import ForecastDetails from "./components/ForecastDetails";
import getFormattedWeatherData from "./components/weatherService";
import { useEffect, useState } from "react";

function App() {
  const [query, setQuery] = useState({ q: "Hyderabad" });
  const [units, setUnits] = useState("Metric");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      await getFormattedWeatherData({ ...query, units }).then((data) => {
        setWeather(data);
      });
    };

    fetchWeather();
  }, [query, units]);

  return (
    <div
      className="bg-black text-white"
    >
      <h1 className="flex justify-center">Welcome to Weather Forecast</h1>
      <Favplaces setQuery={setQuery} />
      <InputData setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
        <div>
          <TimeAndLocationDetails weather={weather} />
          <TempDetails weather={weather} />

          <ForecastDetails title="forecast for next 10 hour" items={weather.hourly} />
          <ForecastDetails title="forecast for next 7 day" items={weather.daily} />
        </div>
      )}

    </div>
  );
}

export default App;
