import Image from "next/image";
import React from "react";
export const ListingCard = ({ data }) => {
    return <>

        <div className="flex border border-green-400 items-center justify-center flex-col gap-1">
            <div className="flex items-center justify-center cursor-pointer w-full">
                <div className="flex flex-col gap-2">
                    <div className="relative w-64 h-56">
                        <Image src={data?.photos[0]} alt={data?.title} fill className="rounded-lg object-cover" />
                    </div>
                    <div className="">
                        <h3 className="">{data?.title}</h3>
                        <span className="flex items-center gap-1">
                            <span>{data?.price}</span>

                            <span className="text-sm text-gray-500">vnđ</span>
                        </span>

                    </div>

                </div>
            </div>
        </div>
    </>
}