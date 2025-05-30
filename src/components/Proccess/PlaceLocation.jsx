import React, { useState, useEffect } from "react";
import GeocoderControl from "./geocoder-control";

const PlaceLocation = () => {
  const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN; // Set your mapbox token here
  return (
    <div className="flex flex-col items-center justify-center h-full gap-5">
      <h2 className="font-semibold text-4xl">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel sit, ipsa
      </h2>
      <p className="">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod doloremque
      </p>
      <div className="h-[400px] w-[700px]">
        <Map
          initialViewState={{
            longitude: -79.4512,
            latitude: 43.6568,
            zoom: 13,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={TOKEN}
        >
          <GeocoderControl mapboxAccessToken={TOKEN} position="top-left" />
        </Map>
      </div>
    </div>
  );
};

export default PlaceLocation;
