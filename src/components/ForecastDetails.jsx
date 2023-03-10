import React from "react";
import { iconUrlFromCode } from "./weatherforcast";

function ForecastDetails({ title, items }) {
  console.log(items);
  return (
    <div>
      <div className="flex items-center justify-start mt-12">
        <p className="text-white uppercase">{title}</p>
      </div>
      <hr className="my-12" />

      <div className="flex flex-row justify-between text-white">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex flex-col items-center justify-center"
          >
            <p>{item.title}</p>
            <img
              src={iconUrlFromCode(item.icon)}
              className="w-12 my-3"
              alt=""
            />
            <p className="font-medium">{`${item.temp.toFixed()}°`}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ForecastDetails;
