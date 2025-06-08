"use client";
import { useAppSelector } from "@/lib/hooks";
import { selectUserInfo } from "@/lib/features/auth/authSlice";
import { listingTypes } from "@/data/listingTypes";
import ListView from "@/components/views/listView";
import AppWrapper from "../wrapper";
import { useState } from "react";
const Page = () => {
  const isLoggedIn = useAppSelector(selectUserInfo);
  const [selectedType, setSelectedType] = useState('');
  return (
    <AppWrapper>
      <div className="bg-white">
        <div>
          <h1 className=" mt-6 text-2xl font-bold text-center text-green-500">
            Các điểm lưu trú
          </h1>
          <h1 className="text-2xl font-bold text-center text-red-500">
            {!isLoggedIn ? "Đăng nhập để xem các điểm lưu trú" : ""}
          </h1>
          <div className="flex items-center justify-center">
            <div className="w-[90vw] overflow-x-auto mt-3 px-5 custom-scroll">
              <ul className="flex gap-5 h-full">
                {listingTypes?.map((data, index) => (
                  <li
                    key={index}
                    className={`${
                      selectedType === data?.name ? "bg-green-200" : ""
                    } w-max hover:bg-green-200 rounded-lg hover:scale-95 flex flex-col items-center justify-between h-16 cursor-pointer transition-all duration-200 hover:text-green-600 hover:scale-105`}
                    onClick={() => setSelectedType(data?.name)}
                  >
                    <span className="h-10 w-10 flex items-center justify-center">
                      {data?.svgPath}
                    </span>
                    <div className="text-gray-500 text-xs font-semibold text-center">
                      {data?.name}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <ListView type={selectedType} />
        </div>
      </div>
    </AppWrapper>
  );
};

export default Page;
