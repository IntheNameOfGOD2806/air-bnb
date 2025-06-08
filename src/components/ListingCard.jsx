import Image from "next/image";
import React from "react";

export const ListingCard = ({ data }) => {
  return (
    <div className="max-w-xs w-full bg-white border border-green-400 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 cursor-pointer">
      <div className="relative w-full h-48 sm:h-56">
        {data?.photos?.[0] ? (
          <Image
            src={data.photos[0]}
            alt={data?.title ?? "Listing Image"}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="flex items-center justify-center bg-gray-100 w-full h-full">
            <span className="text-gray-400">No Image</span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-900 truncate" title={data?.title}>
          {data?.title ?? "Untitled"}
        </h3>
        <p className="text-gray-600 line-clamp-2">{data?.description ?? "No description available."}</p>

        <div className="mt-auto flex items-center justify-between">
          <span className="text-green-700 font-bold text-lg">
            {data?.price?.toLocaleString()} vnđ
          </span>
          {/* Optional: Add an icon or badge here */}
        </div>
      </div>
    </div>
  );
};
