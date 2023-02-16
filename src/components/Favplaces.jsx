import React from "react";

function Favplaces({ setQuery }) {
  const Indiancities = [
    {
      id: 1,
      title: "Delhi",
    },
    {
      id: 2,
      title: "Mumbai",
    },
    {
      id: 3,
      title: "Kolkata",
    },
    {
      id: 4,
      title: "Pune",
    },
    {
      id: 5,
      title: "Bengaluru",
    },
    {
      id: 6,
      title: "Adoni",
    },
  ];

  return (
    <div className="flex items-center justify-around my-12">
      {Indiancities.map((place) => (
        <button
          key={place.id}
          className="text-white font-large hover:scale-150 "
          onClick={() => setQuery({ q: place.title })}
        >
          {place.title}
        </button>
      ))}
    </div>
  );
}

export default Favplaces;
