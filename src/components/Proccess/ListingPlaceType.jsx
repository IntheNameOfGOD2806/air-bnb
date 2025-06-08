import React from "react";
import House from "../../svg/lisitngTypes/house";
import Room from "../../svg/lisitngTypes/room";
import SharedRoom from "../../svg/lisitngTypes/shared-room";
import { useAppstore } from "@/store/store";
const ListingPlaceType = () => {

  const { placeType, setPlaceType } = useAppstore();
  const data = [
    {
      title: "Nhà ở nguyên căn",
      subTitle: "Khách có thể sử dụng toàn bộ căn nhà",
      svg: <House />,
    },
    {
      title: "Phòng riêng",
      subTitle: "Khách có thể sử dụng phòng riêng,có chung phòng khách",
      svg: <Room />,
    },
    {
      title: "Phòng chia sẻ",
      subTitle: "Khách có thể sử dụng phòng chung nhiều người",
      svg: <SharedRoom />,
    },
  ];
  return (
    <div className="flex text-black items-center justify-center flex-col h-full gap-10">
      <h2 className="font-semibold text-4xl">Chọn loại nơi ở</h2>

      <ul className="flex flex-col gap-5 w-[800px]">
        {data.map((item, index) => (
          <li
            onClick={() => setPlaceType(item)}
            className={`flex cursor-pointer p-2 border-gray-100 border-2 rounded-md items-center justify-between ${placeType?.title === item?.title ? "bg-gray-100" : ""
              }`}
            key={index?.title}
          >
            <div className="">
              <h4 className="font-semibold">{item?.title}</h4>
              <p>{item?.subTitle}</p>
            </div>
            <div className="flex items-center justify-center">
              {item?.svg}
            </div>
          </li>))}
      </ul>
    </div>
  );
};

export default ListingPlaceType;
