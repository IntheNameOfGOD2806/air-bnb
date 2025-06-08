import React from "react";
import "./step1.css";
const StepThreeStarter = () => {
  return (
    <>
      <div className="flex items-center h-full mx-20">
        <div className="grid grid-cols-2 gap-10 items-center">
          <div className="flex flex-col gap-4 text-black">
            <div className="text-2xl">Step 3</div>
            <h1 className="text-4xl">
              <strong>Hoàn thiện thông tin</strong>
            </h1>
            <p className="text-xl">
              Hãy hoàn thiện các thông tin của bạn để khách hàng có thể tìm thấy điểm lưu trú của bạn.
            </p>
          </div>
          <div>
            <video
              src="/home3.mp4"
              autoPlay
              controls={false}
              loop
              className="w-full h-full object-cover"
            ></video>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepThreeStarter;
