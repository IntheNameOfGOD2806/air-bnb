// src/components/ListingPhoto.jsx
"use client";
import { useAppstore } from "../store/store";
import React, { useState } from "react";
import Image from "next/image"; // ✅ đúng cú pháp

import { Carousel } from 'antd';


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
                {currentListing?.photos?.length > 0 &&
                    currentListing.photos.map((photo, index) => (
                        <li
                        key={photo}
                        onClick={() => setCurrentPhoto(index)}
                        className={`relative w-48 h-32 cursor-pointer rounded-md p-[2px] group
                          ${index === currentPhoto
                            ? "bg-gradient-to-r from-purple-500 via-pink-500 to-red-500"
                            : "bg-transparent"
                          }
                        `}
                      >
                        {/* Gradient shadow on hover */}
                        <span
                          className="pointer-events-none absolute inset-0 rounded-md
                            opacity-0 group-hover:opacity-100 transition-opacity
                            bg-gradient-to-r from-purple-500 via-pink-500 to-red-500
                            blur-lg"
                          style={{ filter: "blur(10px)" }}
                        ></span>
                      
                        <div
                          className={`relative w-full h-full rounded-md overflow-hidden transition-transform duration-300 ease-in-out
                            ${index === currentPhoto ? "scale-110" : "scale-100"}
                          `}
                        >
                          <Image
                            src={photo}
                            alt={currentListing.title}
                            fill
                            className="object-cover rounded-md relative z-10"
                          />
                        </div>
                      </li>
                      

                    ))}
            </ul>


        </div>
    );
}
