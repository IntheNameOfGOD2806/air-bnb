"use client";
import React from "react";
import { motion } from "framer-motion";
import AppWrapper from "../../wrapper";
import chua from '../../../assets/images/chua.jpg'
import lua from '../../../assets/images/lua.jpg'
import Image from "next/image";

const AboutUS = () => {
  return (
    <AppWrapper>
     
      <div className="bg-white">
        {/* Banner Section */}
        <div className="relative h-[400px] bg-cover bg-center bg-[url('https://media.istockphoto.com/id/624183176/vi/anh/ru%E1%BB%99ng-b%E1%BA%ADc-thang-%E1%BB%9F-mu-cang-ch%E1%BA%A3i-vi%E1%BB%87t-nam.jpg?b=1&s=612x612&w=0&k=20&c=0WPuwjgw5xt59S4-2Wf5KslcbLOzFqYKdXSqlvlNgz8=')] flex items-center justify-center">
          <div className="bg-black/50 w-full h-full absolute top-0 left-0 z-0" />
          <h1 className="text-4xl md:text-5xl text-white font-bold z-10 relative text-center px-4">
            Giới thiệu về VieTrail
          </h1>
        </div>

        {/* Content Section */}
        <div className="max-w-6xl mx-auto px-4 py-16 space-y-12">
          <motion.div
            className="grid md:grid-cols-2 gap-8 items-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              width={500}
              height={500}
              src={chua.src}
              alt="Local Experience"
              className="rounded-2xl shadow-lg"
            />
            <div>
              <p className="text-gray-700 text-lg leading-relaxed">
                <strong>VieTrail</strong> là nền tảng du lịch dành riêng cho
                người yêu thích trải nghiệm bản địa và khám phá vẻ đẹp nguyên sơ
                của miền núi phía Bắc Việt Nam. Tìm kiếm thông tin, đặt tour,
                homestay hoặc thuê xe – nhanh chóng, minh bạch và đáng tin cậy.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8 items-center flex-row-reverse"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Image
              width={500}
              height={500}
              src={lua.src}
              alt="Vision"
              className="rounded-2xl shadow-lg"
            />
            <div>
              <h2 className="text-2xl font-semibold text-green-600 mb-2">
                TẦM NHÌN
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Trở thành nền tảng hàng đầu về du lịch cộng đồng tại vùng núi
                phía Bắc, thúc đẩy trải nghiệm đích thực và du lịch bền vững.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="grid md:grid-cols-2 gap-8 items-center"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Image
              width={500}
              height={500}
              src="https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2023/2/18/1149223/6-5.jpg"
              alt="Mission"
              className="rounded-2xl shadow-lg"
            />
            <div>
              <h2 className="text-2xl font-semibold text-green-600 mb-2">
                SỨ MỆNH
              </h2>
              <p className="text-gray-700 text-lg leading-relaxed">
                Kết nối du khách với du lịch cộng đồng và hỗ trợ các homestay,
                doanh nghiệp địa phương phát triển bền vững.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-gray-700 text-lg leading-relaxed"
          >
            <p className="mb-4">
              VieTrail tập trung vào du lịch cộng đồng & trải nghiệm bản địa,
              kết nối bạn với người dân địa phương, văn hóa độc đáo và hành
              trình thực sự khác biệt. Tùy chỉnh lịch trình theo sở thích, thời
              gian và ngân sách – để mỗi chuyến đi mang dấu ấn riêng.
            </p>
            <p className="mb-4">
              Chúng tôi đồng hành cùng các homestay, hướng dẫn viên bản địa và
              doanh nghiệp nhỏ, hỗ trợ phát triển bền vững và quảng bá hiệu quả.
            </p>

            <blockquote className="italic text-green-700 border-l-4 border-green-400 pl-4 mt-6 mb-6 text-xl">
              VieTrail – “Không có bản đồ nào giống nhau, vì mỗi người là một
              hành trình riêng biệt.”
            </blockquote>

            <div className="text-center mt-10">
              <button className="bg-green-600 text-white px-8 py-3 rounded-full shadow-lg hover:bg-green-700 transition duration-300">
                Bắt đầu chuyến đi của bạn ngay hôm nay!
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </AppWrapper>
  );
};

export default AboutUS;
