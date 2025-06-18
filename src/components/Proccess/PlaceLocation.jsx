import React, { useState, useEffect, useCallback } from "react";
import GeocoderControl from "./geocoder-control";
import Map, { Marker } from "react-map-gl/mapbox";
import "mapbox-gl/dist/mapbox-gl.css";
import { Spin } from "antd";
import { useAppstore } from "@/store/store";

const PlaceLocation = ({isTour}) => {
  const { setMapData, setLocationData } = useAppstore();
  const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

  const [initialLongitude, setInitialLongitude] = useState(-79.4512);
  const [initialLatitude, setInitialLatitude] = useState(43.6568);
  const [loadingLocation, setLoadingLocation] = useState(true);
  const [selectedCoords, setSelectedCoords] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setInitialLongitude(position.coords.longitude);
          setInitialLatitude(position.coords.latitude);
          setLoadingLocation(false);
        },
        (error) => {
          console.error("Error getting user location:", error);
          setLoadingLocation(false);
        }
      );
    } else {
      console.error("Geolocation is not supported.");
      setLoadingLocation(false);
    }
  }, []);

  const handleSearchResult = ({ result }) => {
    const [longitude, latitude] = result?.geometry?.coordinates;
    const data = {
      landmark: result?.text,
      neighborhood: result?.context?.find((i) => i.id.startsWith("neighborhood"))?.text,
      city: result?.context?.find((i) => i.id.startsWith("place"))?.text,
      state: result?.context?.find((i) => i.id.startsWith("region"))?.text,
      country: result?.context?.find((i) => i.id.startsWith("country"))?.text,
    };

    setSelectedCoords([longitude, latitude]);
    setMapData({ longitude, latitude });
    setLocationData(data);
  };

  const handleMapClick = useCallback((event) => {
    const { lngLat } = event;
    const [longitude, latitude] = [lngLat.lng, lngLat.lat];
    setSelectedCoords([longitude, latitude]);
    setMapData({ longitude, latitude });

    // You can use a reverse geocoding API here to set locationData if needed
    setLocationData({
      landmark: "Selected manually",
      neighborhood: "",
      city: "",
      state: "",
      country: "",
    });
  }, []);

  if (!TOKEN) {
    return <p>Please set your Mapbox access token in NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN.</p>;
  }

  return (
    <div className="flex text-black flex-col items-center justify-center h-full gap-5">
      <h2 className="font-semibold text-4xl">Location Based Map</h2>
      <p className="text-center">
        Search or click the map to pick a location.
      </p>
      <div className="h-[400px] w-[800px] relative">
        {!loadingLocation ? (
          <Map
            key={`${initialLatitude}-${initialLongitude}`}
            initialViewState={{
              longitude: initialLongitude,
              latitude: initialLatitude,
              zoom: 13,
            }}
            mapStyle="mapbox://styles/mapbox/streets-v12"
            mapboxAccessToken={TOKEN}
            onClick={handleMapClick}
          >
            <GeocoderControl
              mapboxAccessToken={TOKEN}
              position="top-left"
              marker={false} // We handle marker separately
              onResult={handleSearchResult}
              language="vi"           // <- Vietnamese language
              countries="vn"          // <- Bias to Vietnam
              onLoading={() => console.log("Loading...")}
              onResults={() => console.log("Results...")}
              onError={() => console.log("Error...")}
            />

            {selectedCoords && (
              <Marker
                longitude={selectedCoords[0]}
                latitude={selectedCoords[1]}
                anchor="bottom"
              >
                <div className="w-4 h-4 bg-red-500 rounded-full border-2 border-white shadow" />
              </Marker>
            )}
          </Map>
        ) : (
          <div className="flex items-center justify-center h-full">
            <Spin size="large" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PlaceLocation;
