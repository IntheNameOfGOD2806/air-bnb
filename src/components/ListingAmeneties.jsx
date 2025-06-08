'use client'
import React from 'react';
import { useAppstore } from '../store/store';
import { AmenitiesType } from '../data/Amenities';
import { AmenitiesTypeVi } from '../data/Amenities';
const ListingAmeneties = () => {
    const { currentListing } = useAppstore();
    function getSvgPathByName(name) {
        for (const ameneties of AmenitiesType) {
            for (const amenety of ameneties.data) {
                if (amenety.name === name) {
                    return amenety.svgPath;
                }
            }
        }
        return null;
    }
    return (
        <div className='flex flex-col gap-2'>
            <h4 className='text-xl font-bold '>Các tiện ích</h4>
            <ul className='grid grid-cols-5 gap-2'>
                {
                    currentListing?.placeAmeneties?.map((amenity) => (
                        <li className='border border-gray-300 p-3 rounded-lg flex flex-col justify-start items-start' key={amenity}>
                            {getSvgPathByName(amenity)}
                            <span>{AmenitiesTypeVi[amenity]}</span>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
};
export default ListingAmeneties;
