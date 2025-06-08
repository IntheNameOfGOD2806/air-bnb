
import React, { useEffect, useMemo, useState } from "react";
import { useAppstore } from "@/store/store";
import Map, { Marker, Popup } from "react-map-gl/mapbox";
import GeocoderControl from "../Proccess/geocoder-control";
import Pin from "../common/Pin";
import { ListingCard } from "../ListingCard";
const MapView = () => {
    const [initialLongitude, setInitialLongitude] = useState(-79.4512);
    const [initialLatitude, setInitialLatitude] = useState(43.6568);
    const [loadingLocation, setLoadingLocation] = useState(true);
    const { listings } = useAppstore();
    console.log("listings", listings);
    const [selectedCoords, setSelectedCoords] = useState(null);
    const [popupInfo, setPopupInfo] = useState(null);
    // const handleMapClick = useCallback((event) => {
    //     const { lngLat } = event;
    //     const [longitude, latitude] = [lngLat.lng, lngLat.lat];
    //     setSelectedCoords([longitude, latitude]);
    //     setMapData({ longitude, latitude });

    //     // You can use a reverse geocoding API here to set locationData if needed
    //     setLocationData({
    //         landmark: "Selected manually",
    //         neighborhood: "",
    //         city: "",
    //         state: "",
    //         country: "",
    //     });
    // }, []);
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

    const pins = useMemo(() => {
        return listings.map(( data ) => {
            return (
                <Marker
                    key={`marker-${data?.id}`}
                    longitude={data?.mapData?.longitude}
                    latitude={data?.mapData?.latitude}
                    anchor="top"
                    onClick={(e) => {
                        // e.originalEvent.preventDefault();
                        e.originalEvent.stopPropagation();
                        setPopupInfo({
                            ...data,
                        });
                    }}
                >
                    <Pin />
                </Marker>
            );
        });
    }, [listings]);
    const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    return (
        <>
            <div className="h-[80.5vh] max-w-[100vw] pt-2">
                <Map
                    key={`${initialLatitude}-${initialLongitude}`}
                    initialViewState={{
                        longitude: initialLongitude,
                        latitude: initialLatitude,
                        zoom: 13,
                    }}
                    mapStyle="mapbox://styles/mapbox/streets-v12"
                    mapboxAccessToken={TOKEN}
                // onClick={handleMapClick}
                >
                    {pins}
                    {
                        popupInfo && (
                            <Popup
                                anchor="top"
                                longitude={popupInfo?.mapData?.longitude}
                                latitude={popupInfo?.mapData?.latitude}
                                onClose={() => setPopupInfo(null)}
                            >
                                <div className="min-w-[200px]">
                                    <ListingCard data={popupInfo} />
                                </div>
                            </Popup>
                        )
                    }
                </Map>
            </div>
        </>
    );
};

export default MapView;
