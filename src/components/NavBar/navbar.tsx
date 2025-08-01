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

import Logo from "../../assets/images/logo.jpg";
import { useAppstore } from "@/store/store";
import { useEffect, useState } from "react";
import { clearUserInfo, selectUserInfo } from "@/lib/features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { useRouter } from "next/navigation";
import { logout } from "@/lib/auth";
import { toast } from "react-toastify";

const Navbar = ({
  openModalAuth,
  openModalAuthReg,
  setOpenModalAuthReg,
  setOpenModalAuth,
  selectedKey,
  setSelectedKey,
}: {
  openModalAuth: boolean;
  openModalAuthReg: boolean;
  setOpenModalAuth: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenModalAuthReg: React.Dispatch<React.SetStateAction<boolean>>;
  selectedKey: string;
  setSelectedKey: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const router = useRouter();
  const { isAuthModalOpen, setAuthModalOpen } = useAppstore();
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector(selectUserInfo);
  const handleLogout = async () => {
    try {
      const result = await logout();
      dispatch(clearUserInfo());
      toast.success("Đăng xuất thành công");
      //reload page
      window.location.reload();
    } catch (error: any) {
      toast.error(error?.message ?? error);
    }
  };
  const isLoggedIn = !!userInfo?.id;
  // console.log("check logged in", userInfo);
  const defaultAvatar =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ395qcYOPsd3cuhPPIzz871lLgqHr0Di0F5w&s";
  const guestItems: MenuProps["items"] = [
    {
      key: "1",
      label: "Đăng nhập",
    },
    {
      key: "2",
      label: "Đăng ký",
    },
  ];

  const authItems: MenuProps["items"] = [
    {
      key: "5",
      label: (
        <Flex align="center" gap={10}>
          <Image
            preview={false}
            src={userInfo?.userImage ?? defaultAvatar}
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "50%",
            }}
            alt=""
          />
          <Text className="text-sm font-semibold ellipsis">
            {userInfo?.username?.length > 10
              ? userInfo?.username?.slice(0, 10) + "..."
              : userInfo?.username}
          </Text>
        </Flex>
      ),
    },
    {
      key: "55",
      label: "Hộp thư",
    },
    {
      key: "6",
      label: "Điểm lưu trú và tour của tôi",
    },
    {
      key: "7",
      label: "Trip và tour của tôi",
    },
    // {
    //   key: "8",
    //   label: "Phương tiện",
    // },
    {
      key: "3",
      label: "Đăng Bài",
    },
    {
      key: "4",
      label: "Log out",
    },
  ];

  const dropdownItems = isLoggedIn ? authItems : guestItems;
  useEffect(() => {
    console.log("asdad", isAuthModalOpen);
  }, []);
  return (
    <Header
      className="border-b-[1px] border-slate-100 transition-all duration-100 bg-white justify-between z-50 "
      style={{ display: "flex", alignItems: "center", paddingInline: "10" }}
    >
      <div
        onClick={() => router.push("/")}
        className="demo-logo cursor-pointer  flex items-center gap-4 "
      >
        <Image
          className="max-w-20 object-contain"
          src={Logo.src}
          alt="Logo"
        />
        <Text onClick={() => router.push("/")} className="w-[100px]">
          VieTrail
        </Text>
      </div>
      <Menu
        className="justify-center ml-44 border-transparent"
        mode="horizontal"
        defaultSelectedKeys={[selectedKey]}
        items={[
          {
            key: "0",
            label: "Trang Chủ",
          },
          {
            key: "1",
            label: "Điểm Lưu Trú ",
          },
          {
            key: "2",
            label: "Tour",
            // disabled: true,
          },
          {
            key: "8",
            label: "Phương tiện",
          },
          {
            key: "3",
            label: "Blog",
          },
          {
            key: "4",
            label: "Về Chúng Tôi",
          }
        ]}
        onClick={(e) => {
          switch (e.key) {
            case "0":
              router.push("/");
              setSelectedKey("0");
              break;
            case "1":
              router.push("/listings");
              setSelectedKey("1");
              break;
            case "2":
              router.push("/tours");
              setSelectedKey("2");
              break;
            case "3":
              router.push("/blog");
              setSelectedKey("3");
              break;
            case "4":
              router.push("/about-us");
              setSelectedKey("4");
              break;
            case "8":
              router.push("/vehicles");
              setSelectedKey("8");
              break;
            default:
              break;
          }
        }}
        style={{ width: "100%" }}
      />
      <Flex align="center" justify="end" gap={20}>
        <Space align="start">
          <Flex gap={5}>
          <Typography
              onClick={() => {
                if (!isLoggedIn) {
                  toast.error("Vui lòng đăng nhập để đăng bài");
                  return;
                }
                router.push("/vehicle");
              }}
              className="text-center min-w-[120px] text-sm font-semibold cursor-pointer text-gray-800 transition-transform duration-300 hover:scale-105 hover:bg-green-500 px-4 py-2 rounded-xl shadow hover:shadow-lg"
            >
              Đăng Phương tiện
            </Typography>
            <Typography
              onClick={() => {
                if (!isLoggedIn) {
                  toast.error("Vui lòng đăng nhập để đăng bài");
                  return;
                }
                router.push("/new-listings");
              }}
              className="text-center min-w-[120px] text-sm font-semibold cursor-pointer text-gray-800 transition-transform duration-300 hover:scale-105 hover:bg-green-500 px-4 py-2 rounded-xl shadow hover:shadow-lg"
            >
              Đăng Bài
            </Typography>
            <Typography
              onClick={() => {
                if (!isLoggedIn) {
                  toast.error("Vui lòng đăng nhập để đăng bài");
                  return;
                }
                router.push("/tour");
              }}
              className="text-center min-w-[120px] text-sm font-semibold cursor-pointer text-gray-800 transition-transform duration-300 hover:scale-105 hover:bg-green-500 px-4 py-2 rounded-xl shadow hover:shadow-lg"
            >
              Đăng Tour
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
                  overlayStyle={{
                    width: "230px",
                  }}
                  arrow
                  trigger={["click"]}
                  menu={{
                    items: dropdownItems,
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
                          handleLogout();
                          break;
                        case "55":
                          router.push("/Chat");
                          break;
                        case "6":
                          router.push("/my-listings");
                          break;
                        case "7":
                          if (!isLoggedIn) {
                            toast.error(
                              "Vui lòng đăng nhập để xem danh sách trip"
                            );
                            return;
                          }
                          router.push("/trips");
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
