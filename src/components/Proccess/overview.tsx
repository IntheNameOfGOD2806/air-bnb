"use client";

import { Image } from "antd";

export default function Overview() {
  const MainTitle1 = "Bắt đầu trải nghiệm";
  const MainTitle2 = " với vietrail";
  const data = [
    {
      title: "Cho chúng tôi biết về điểm lưu trú của bạn",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.lo",
      image: "/overview1.webp",
    },
    {
      title: "Tạo nên sự khác biệt",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.lo",
      image: "/overview2.webp",
    },
    {
      title: "Tạo nên sự khác biệt 1",
      description:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.lo",
      image: "/overview3.webp",
    },
  ];
  return (
    <div className="flex  mt-7 justify-between items-center px-32 ">
      <div>
        <strong className="text-5xl max-w-96 leading-normal text-airbnb-light-black text-black">
          <h1>{MainTitle1}</h1>
          <h1>{MainTitle2}</h1>
        </strong>
      </div>
      <ul className="flex flex-col gap-16">
        {data.map((item, index) => (
          <li
            key={item.title}
            className="flex items-center min-h-32 justify-start gap-6"
          >
            <strong className="text-2xl pt-5 text-black">
              <h3>{index + 1}</h3>
            </strong>
            <div className="pt-5">
              <strong className="text-2xl text-black">
                <h3>{item.title}</h3>
              </strong>
              <p className="text-gray-500">{item.description}</p>
            </div>
            <div className="relative w-48 h-32 object-cover">
              <Image
                src={item.image}
                alt={item.title}
                className="object-cover"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
