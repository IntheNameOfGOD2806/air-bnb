"use client";
import { GlobalOutlined, MenuOutlined, UserOutlined } from "@ant-design/icons";
import {
  Avatar,
  Badge,
  Dropdown,
  Flex,
  Image,
  Layout,
  Menu,
  MenuProps,
  Space,
  Typography,
} from "antd";
const { Header } = Layout;
const { Text } = Typography;
import FavICon from "../../assets/images/airbnb.png";
import { useAppstore } from "@/store/store";
import { useEffect } from "react";
import { selectUserInfo } from "@/lib/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
const Navbar = ({
  items,
  openModalAuth,
  openModalAuthReg,
  setOpenModalAuthReg,
  setOpenModalAuth,
}: {
  items: MenuProps["items"];
  openModalAuth: boolean;
  openModalAuthReg: boolean;
  setOpenModalAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModalAuthReg: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { isAuthModalOpen, setAuthModalOpen } = useAppstore();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectUserInfo);
  useEffect(() => {
    console.log("asdad", isAuthModalOpen);
  }, []);
  return (
    <Header
      className="border-b-[1px] border-slate-100 transition-all duration-100 bg-white justify-between  "
      style={{ display: "flex", alignItems: "center", paddingInline: "10" }}
    >
      <div className="demo-logo  flex items-center gap-4 ">
        <Image
          className="max-w-[25px] object-contain"
          src={FavICon.src}
          alt="FavIcon"
        />
        <Text className="w-[100px]">VieTrail</Text>
      </div>
      <Menu
        className="justify-center ml-44 border-transparent"
        mode="horizontal"
        defaultSelectedKeys={["2"]}
        items={items}
        style={{ width: "100%" }}
      />
      <Flex align="center" justify="end" gap={20}>
        <Space align="start">
          <Flex gap={5}>
            <Typography className="min-w-[150px] text-sm font-semibold">
              AirBnb Your Home
            </Typography>
            <GlobalOutlined />
          </Flex>
        </Space>
        <Space size={14}>
          <div
            className="min-w-[80px]  flex items-center justify-center rounded-full transition-all hover:shadow-md duration-200  p-1 cursor-pointer"
            style={{
              border: "1px #E1E1E1 solid",
            }}
          >
            <Badge count={1}>
              <Space
                size="middle"
                style={{
                  display: "flex",
                  gap: "10px",
                }}
              >
                <Dropdown
                  arrow
                  trigger={["click"]}
                  menu={{
                    items,
                    onClick: (e) => {
                      switch (e.key) {
                        case "1":
                          setOpenModalAuthReg(true);
                          break;
                        case "2":
                          setOpenModalAuth(true);
                          break;
                        case "3":
                          alert("3");
                          break;
                        case "4":
                          alert("4");
                          break;
                        default:
                          break;
                      }
                    },
                  }}
                  placement="bottom"
                >
                  <div className="flex gap-2">
                    <MenuOutlined />
                    <Avatar
                      style={{ backgroundColor: "#000000" }}
                      shape="circle"
                      icon={
                        !!userInfo?.userImage ? (
                          <Image src={userInfo?.userImage} alt="" />
                        ) : (
                          <UserOutlined />
                          // <Image 
                          // preview={false}
                          // src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ395qcYOPsd3cuhPPIzz871lLgqHr0Di0F5w&s'} alt="" />
                        )
                      }
                    />
                  </div>
                </Dropdown>
              </Space>
            </Badge>
          </div>
        </Space>
      </Flex>
    </Header>
  );
};

export default Navbar;
