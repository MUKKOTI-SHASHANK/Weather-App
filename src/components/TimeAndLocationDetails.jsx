import React from "react";
import { formatToLocalTime } from "../services/weatherService";

function TimeAndLocationDetails({ weather: { dt, time, name, country } }) {
  return (
    <div>
      <div className="flex justify-center my-5">
        <p className="text-white my-3">
          {formatToLocalTime(dt, time)}
        </p>
      </div>

      <div className="flex justify-center">
        <p className="text-white text-3xl font-large">{`${name}, ${country}`}</p>
      </div>
    </div>
  );
}

export default TimeAndLocationDetails;
