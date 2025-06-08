// src/components/ListingPhoto.jsx
"use client";
import { useAppstore } from "../store/store";
import React, { useState } from "react";
import Image from "next/image"; // ✅ đúng cú pháp

export default function ListingPhoto() {
    const { currentListing } = useAppstore();
    const [currentPhoto, setCurrentPhoto] = useState(0);

    if (!currentListing?.photos?.[currentPhoto]) return null;

    return (
        <div className="flex gap-5 flex-col">
            <div className="relative w-full h-[60vh]">
                <Image
                    src={currentListing.photos[currentPhoto]}
                    alt={currentListing.title}
                    fill
                    className="object-cover"
                />
            </div>
            <ul className="flex gap-5 flex-wrap">
            {   
                currentListing?.photos?.length > 0 && currentListing?.photos?.map((photo, index) => (
                    <li key={photo} className=" relative w-48 h-32 cursor-pointer"
                        onClick={() => setCurrentPhoto(index)}
                    >
                        <Image src={photo} alt={currentListing.title} fill className="object-cover" />
                    </li>
                ))
            }
            </ul>
        </div>
    );
}
