import React from "react";
import {
  UilSun,
} from "@iconscout/react-unicons";
import {iconUrlFromCode } from "../services/weatherService";

function TempDetails({
  weather: {
    details,
    icon,
    temp,
    temp_min,
    temp_max,
  },
}) {
  return (
    <div>
      <div className="flex items-center justify-center py-6 text-xl text-cyan-300">
        <p>{details}</p>
      </div>

      <div className="flex flex-row justify-center text-white py-3">
        <img src={iconUrlFromCode(icon)} alt="" className="w-20" />
        <p className="text-5xl">{`${temp.toFixed()}°`}</p>
      </div>

      <div className="flex justify-center space-x-5 text-white">
        <UilSun />
        <p className="font-light">
          Highest:{" "}
          <span className="font-medium ml-1">{`${temp_max.toFixed()}°`}</span>
        </p>
        <p className="font-light">||</p>

        <UilSun />
        <p className="font-light">
          Lowest:{" "}
          <span className="font-medium ml-1">{`${temp_min.toFixed()}°`}</span>
        </p>
      </div>
    </div>
  );
}

export default TempDetails;
