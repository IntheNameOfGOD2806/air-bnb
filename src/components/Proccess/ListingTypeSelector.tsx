"use client";
import { useAppstore } from "@/store/store";
import { useState } from "react";
import { listingTypes } from "../../data/listingTypes";
export default function ListingTypeSelector() {
  const { locationType, setLocationType } = useAppstore();
  return (
    <div className=" mt-12 flex justify-center items-center ">
      <div className="h-full">
        <h2 className="text-center font-semibold text-4xl text-black">
          Mô tả điểm lưu trú của bạn cho chúng tôi
        </h2>
        <div className="text-black grid grid-cols-3 gap-5 h-[50vh] overflow-auto scroll no-scrollbar my-10 pb-5">
          {listingTypes.map((type) => (
            <button
              onClick={() => setLocationType(type.name)}
              key={type.name}
              className={`flex border-2  border-gray-400 rounded-md flex-col items-center justify-center ${
                locationType === type.name ? "bg-green-200 border-green-400" : ""
              }`}
            >
              {type.svgPath}
              <span>{type.name}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
