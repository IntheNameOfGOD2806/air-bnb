"use client";

import { Button, Image, message, theme, Steps, Typography } from "antd";
import { useState } from "react";
import FavICon from "../../assets/images/airbnb.png";
import Overview from "@/components/Proccess/overview";
import ButtonB1 from "@/components/Button/CustomButtons/ButtonB1";
import ButtonStart from "@/components/Button/CustomButtons/ButtonStart";
import BackButton from "@/components/Button/CustomButtons/BackButton";
import StepOneStarter from "@/components/Proccess/StepOneStarter";
export default function NewListings() {
  const [current, setCurrent] = useState(0);
  const next = () => {
    setCurrent(current + 1);
  };

  const prev = () => {
    setCurrent(current - 1);
  };
  const steps = [
    {
      title: "First",
      content: <Overview />,
    },
    {
      title: "Second",
      content: <StepOneStarter />,
    },
    {
      title: "Last",
      content: <>dsfsfsf</>,
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
    <div className="flex px-3 flex-col gap-16 grid-rows-new-listing h-[100vh]">
      <header className="flex mt-4 px-20 justify-between max-h-3">
        <div className=" flex gap-2 cursor-pointer">
          <Image
            className="max-w-[25px] object-contain"
            src={FavICon.src}
            alt="FavIcon"
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
      <footer className="px-9 align-top">
        <Steps current={current} items={items} />
        <div
        //  style={contentStyle}
        >{steps[current].content}</div>
        <div style={{ marginTop: 24 }}>
          {current < steps.length - 1 && (
            <div className="flex justify-between">
              <ButtonStart onClick={() => next()} />
              {current > 0 && <BackButton onClick={() => prev()} />}
            </div>
            )}
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
