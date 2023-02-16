import React, { useState } from "react";
import { UilSearch, UilLocationPoint } from "@iconscout/react-unicons";

function InputData({ setQuery}) {
  const [Place, setPlace] = useState("");


  const handleSearch = () => {
    if (Place !== "") setQuery({ q: Place });
  };

  const handleLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        let latitude = position.coords.latitude;
        let longitude = position.coords.longitude;
        setQuery({
          latitude,
          longitude,
        });
      });
    }
  };

  return (
    <div className="flex flex-row justify-center my-12">
      <div className="flex space-x-5 ">
        <input
          className="text-black"
          value={Place}
          onChange={(e) => setPlace(e.target.value)}
          type="text"
          placeholder="Your destination"
        />
        <UilSearch
          size={25}
          className="text-white hover:scale-150"
          onClick={handleSearch}
        />
        <UilLocationPoint
          size={25}
          className="text-white hover:scale-150"
          onClick={handleLocation}
        />
      </div>

      <div className="text-white"> in °C
      </div>
    </div>
  );
}

export default InputData;
