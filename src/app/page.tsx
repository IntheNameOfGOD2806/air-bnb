"use client";
const { Header, Content, Sider } = Layout;
import ImageCarousel from "@/components/Carousel/landingCarousel";
import { Layout, Spin } from "antd";
import MapView from "@/components/views/MapView";
import ListView from "@/components/views/listView";
import { listingTypes } from "@/data/listingTypes";
import AppWrapper from "./wrapper";
import { useAppSelector } from "@/lib/hooks";
import { selectUserInfo } from "@/lib/features/auth/authSlice";
import { useAppstore } from "@/store/store";

//   LaptopOutlined,
//   NotificationOutlined,
// ].map((icon, index) => {
//   const key = String(index + 1);

//   return {
//     key: `sub${key}`,
//     icon: React.createElement(icon),
//     label: `subnav ${key}`,

//     children: new Array(4).fill(null).map((_, j) => {
//       const subKey = index * 4 + j + 1;
//       return {
//         key: subKey,
//         label: `option${subKey}`,
//       };
//     }),
//   };
// });

const App: React.FC = ({
  colorBgContainer,
  borderRadiusLG,
  isLiatingLoading,
}: any) => {
  const isLoggedIn = useAppSelector(selectUserInfo)?.id;
  const {isMapView, setIsMapView} = useAppstore();
  return (
    <div>
      {/* antd */}
      <AppWrapper>
        <Content
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            background: '#fff',
            borderRadius: borderRadiusLG,
          }}
        >
          <div className="h-[500px] w-[100vw] ">
            <ImageCarousel />
          </div>
          <h3 className="mt-5 text-green-500 text-2xl font-bold text-center">
            Tin tức & Sự kiện
          </h3>
          <div className="w-full max-h-[500px] overflow-auto scroll ">
            <script
              src="https://static.elfsight.com/platform/platform.js"
              async
            ></script>
            <div
              className="elfsight-app-a672d481-e953-4ab4-be13-92d85b6b1ad9"
              data-elfsight-app-lazy
            ></div>
          </div>

          {isMapView ? (
            <div>
              <MapView />
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-bold text-center text-green-500">
                Các điểm lưu trú
              </h1>
              <h1 className="text-2xl font-bold text-center text-red-500">
                {!isLoggedIn ? "Đăng nhập để xem các điểm lưu trú" : ""}
              </h1>
              {isLoggedIn && (
                <div className="flex items-center justify-center">
                  <div className="w-[90vw] overflow-x-auto mt-3 px-5 custom-scroll">
                    <ul className="flex gap-5 h-full">
                      {listingTypes?.map((data, index) => (
                        <li
                          key={index}
                          className="w-max flex flex-col items-center justify-between h-16 cursor-pointer transition-all duration-200 hover:text-green-600 hover:scale-105"
                        >
                          <span className="h-10 w-10 flex items-center justify-center">
                            {data?.svgPath}
                          </span>
                          <div className="text-xs font-semibold text-center">
                            {data?.name}
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              )}
              {isLiatingLoading ? <Spin /> : <ListView />}
            </div>
          )}
        </Content>
      </AppWrapper>
    </div>
  );
};

export default App;
