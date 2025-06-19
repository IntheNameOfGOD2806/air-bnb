"use client";

import { Button, Image, message, theme, Steps, Typography } from "antd";
import { useEffect, useState } from "react";
import Logo from "../../assets/images/logo.jpg";
import Overview from "@/components/Proccess/overview";
import ButtonB1 from "@/components/Button/CustomButtons/ButtonB1";
import ButtonStart from "@/components/Button/CustomButtons/ButtonStart";
import BackButton from "@/components/Button/CustomButtons/BackButton";
import StepOneStarter from "@/components/Proccess/StepOneStarter";
import ListingTypeSelector from "@/components/Proccess/ListingTypeSelector";
import ListingPlaceType from "@/components/Proccess/ListingPlaceType";
import PlaceLocation from "@/components/Proccess/PlaceLocation";
import PlaceDetails from "@/components/Proccess/PlaceDetail";
import FloorPlan from "@/components/Proccess/FloorPlan";
import StepTwoStarter from "@/components/Proccess/StepTwoStarter";
import StepThreeStarter from "@/components/Proccess/StepThreeStarter";
import ProccessAmenities from "@/components/Proccess/ProccessAmenities";
import Photo from "@/components/Proccess/Photo";
import Title from "@/components/Proccess/Title";
import Description from "@/components/Proccess/Description";
import { useRouter } from "next/navigation";
import Price from "@/components/Proccess/Price";
import ListingCreated from "@/components/Proccess/listingCreated";
import { useAppstore } from "@/store/store";
import { toast } from "react-toastify";
export default function NewListings() {
  const router = useRouter();
  const proccess = useAppstore();
  const [current, setCurrent] = useState(0);
  const next = () => {

    if (current === steps.length - 2) {
      //check if all fields are filled
      if (
        proccess.locationType &&
        proccess.placeType &&
        proccess.mapData &&
        proccess.locationData &&
        proccess.placeSpace &&
        proccess.price &&
        proccess.title &&
        proccess.description &&
        proccess.placeAmenities &&
        proccess.photos
      ) {
        setCurrent(current + 1);
      }
      else{
        toast.error("Vui lòng điền đầy đủ thông tin");
      }
    }
    else{
      setCurrent(current + 1);
    }
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const steps = [
    {
      title: "",
      content: <Overview isTour={false} />,
    },
    {
      title: "",
      content: <StepOneStarter />,
    },
    {
      title: "",
      content: <ListingTypeSelector />,
    },
    {
      title: "",
      content: <ListingPlaceType />,
    },
    {
      title: "",
      content: <PlaceLocation isTour={false} />,
    },
    {
      title: "",
      content: <PlaceDetails isTour={false} />,
    },
    {
      title: "",
      content: <FloorPlan />,
    },
    {
      title: "",
      content: <StepTwoStarter />,
    },
    {
      title: "",
      content: <ProccessAmenities />,
    },
    {
      title: "",
      content: <Photo isTour={false} />,
    },
    {
      title: "",
      content: <Title isTour={false}  />,
    },
    {
      title: "",
      content: <Description isTour={false} isView={false} />,
    },
    {
      title: "",
      content: <StepThreeStarter />,
    },
    //price
    {
      title: "",
      content: <Price />,
    },
    //listingCreated
    {
      title: "",
      content: <ListingCreated isTour={false} />,
    },
  ];

  const items = steps.map((item) => ({ key: item.title, title: item.title }));
  const { token } = theme.useToken();
  // const contentStyle: React.CSSProperties = {
  //   lineHeight: "260px",
  //   textAlign: "center",
  //   color: token.colorTextTertiary,
  //   backgroundColor: token.colorFillAlter,
  //   borderRadius: token.borderRadiusLG,
  //   border: `1px dashed ${token.colorBorder}`,
  //   marginTop: 16,
  // };
  return (
    <div className="flex bg-white px-3 flex-col gap-16 grid-rows-new-listing h-[100vh]">
      <header className="flex mt-4 px-20 justify-between max-h-3">
        <div
          onClick={() => router.push("/")}
          className=" flex gap-2 cursor-pointer"
        >
          <Image
            className="max-w-[25px] object-contain"
            src={Logo.src}
            alt="Logo"
          />
          <strong className="text-2xl text-airbnb-light-black text-gray-500">
            <h3>Vietrail</h3>
          </strong>
        </div>
        {current <= 13 && (
          //   <Button
          //     style={{
          //       minHeight: "60px",
          //       minWidth: "220px",
          //     }}
          //     // className="border border-gray-300 px-5 py-2 rounded-full font-semibold hover:border-gray-50"
          //     // type="primary"
          //     shape="round"
          //   >
          //     <p className="text-xl  font-semibold">
          //       Save & Exit
          //     </p>
          //   </Button>
          <ButtonB1 />
        )}
      </header>
      <footer className="px-20 align-top">
        <Steps current={current} items={items} />
        <div
          className="min-h-[70vh]"
          //  style={contentStyle}
        >
          {steps[current].content}
        </div>
        <div style={{ marginTop: -20 }}>
          <div className="flex justify-between">
            {current < steps.length - 1 && (
              <ButtonStart
                text={current === 0 ? "Bắt đầu" : "Tiếp tục"}
                onClick={() => next()}
              />
            )}
            {current > 0 && <BackButton onClick={() => prev()} />}
          </div>
          {/* {current === steps.length - 1 && (
            <Button
              type="primary"
              onClick={() => message.success("Processing complete!")}
            >
              Done
            </Button>
          )} */}
        </div>
      </footer>
    </div>
  );
}
