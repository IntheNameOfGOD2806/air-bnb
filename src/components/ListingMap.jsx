'use client'
import React, { useMemo } from 'react';
import { useAppstore } from '../store/store'; import Map, { Marker, Popup } from "react-map-gl/mapbox";
import Pin from "../components/common/Pin";
const ListingMap = () => {
    const { currentListing } = useAppstore();
    const TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
    const pins = useMemo(() => {

        return (
            <Marker
                longitude={currentListing?.mapData?.longitude}
                latitude={currentListing?.mapData?.latitude}

            >
                <Pin />
            </Marker>

        )
    }, [currentListing]);
    return (
        <div className='h-96 w-full'>
            <Map
                initialViewState={{
                    longitude: currentListing?.mapData?.longitude,
                    latitude: currentListing?.mapData?.latitude,
                    zoom: 11,
                }}
                scrollZoom={false}
                dragPan={false}
                dragRotate={false}
                doubleClickZoom={false}
                touchZoom={false}
                mapStyle="mapbox://styles/mapbox/streets-v12"
                mapboxAccessToken={TOKEN}>
                {pins}

            </Map>
        </div>
    );
};
export default ListingMap;
