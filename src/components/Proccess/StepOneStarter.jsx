import React from "react";
import "./step1.css";
const StepOneStarter = () => {
  return (
    <>
      <div className="flex items-center h-full mx-20">
        <div className="grid grid-cols-2 gap-10 items-center">
          <div className="flex flex-col gap-4 text-black">
            <div className="text-2xl">Step 1</div>
            <h1 className="text-4xl">
              <strong>cho tôi biết về điểm lưu trú của bạn</strong>
            </h1>
            <p className="text-xl">
              Trong bước này, chúng tôi sẽ hỏi bạn loại chỗ ở mà bạn có và liệu
              khách sẽ đặt toàn bộ chỗ ở hay chỉ một phòng. Sau đó, hãy cho
              chúng tôi biết vị trí và số lượng khách có thể lưu trú.
            </p>
          </div>
          <div>
            <video
              src="/home.mp4"
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

export default StepOneStarter;
