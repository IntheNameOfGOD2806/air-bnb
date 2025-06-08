"use client";
import Navbar from "@/components/NavBar/navbar";
import {
  GlobalOutlined,
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import ViewSwitchBag from "@/components/views/ViewSwitchBag";
import {
  Button,
  Col,
  Divider,
  Dropdown,
  Form,
  Image,
  Input,
  Layout,
  Row,
  Space,
  theme,
  Typography,
} from "antd";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import "./page.scss";
import CommonModal from "@/components/Modals";
import { useForm } from "antd/es/form/Form";
import { signInWithGoogle } from "./auth/components/auth";
import { toast } from "react-toastify";
import { showValidationErrors } from "@/lib/helper";
import { login, logout, signup } from "@/lib/auth";
import {
  setUserInfo,
  selectUserInfo,
  UserInfo,
  clearUserInfo,
} from "@/lib/features/auth/authSlice";
const { Header, Content, Sider } = Layout;
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { Spin } from "antd";
import CustomCarousel from "@/components/common/Modal";
import { getStorage } from "@/lib/storage/storage";
import { STORAGE } from "@/lib/storage/storage";
import { useRouter } from "next/navigation";
import BacKanImage from "../assets/images/backan.png";
const { Text } = Typography;
import Slider from "@/components/Carousel/landingCarousel";
// core version + navigation, pagination modules:
import Swiper from "swiper";
import { Navigation, Pagination } from "swiper/modules";
import ListView from "@/components/views/listView";
import Script from "next/script";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import MapView from "@/components/views/MapView";
import SwiperCarousel from "@/components/Carousel/landingCarousel";
import Carousel from "@/components/Carousel/landingCarousel";
import ImageCarousel from "@/components/Carousel/landingCarousel";
import { getAllListingsAPI } from "@/lib/listings";
import { useAppstore } from "@/store/store";
const swiper = new Swiper(".swiper", {
  // configure Swiper to use modules
  modules: [Navigation, Pagination],
  // ...
});
//   UserOutlined,
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

const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { setListings, isMapView, setIsMapView } = useAppstore();
  const [scrollPosition, setScrollPosition] = useState(0);
  const [openModalAuth, setOpenModalAuth] = useState(false);
  const [openModalAuthReg, setOpenModalAuthReg] = useState(false);
  const [isAuthLoading, setIsAuthLoading] = useState(false);
  const headerRef = React.useRef<HTMLDivElement>(null);
  const [userFounded, setUserFounded] = useState(null);
  const [authForm] = useForm();
  const [authFormReg] = useForm();
  const isLoggedIn = !!useAppSelector(selectUserInfo)?.id;
  const router = useRouter();
  const [selectedKey, setSelectedKey] = useState("0");
  const handleScroll = () => {
    const position = window.scrollY;
    setScrollPosition(position);
  };
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    const getData = async () => {
      const result = await getAllListingsAPI();
      console.log("result", result);
      setListings(result);
    };

    getData();
  }, []);
  // scroll header
  useEffect(() => {
    if (!!scrollPosition && scrollPosition >= 300) {
      // alert(1313)
      if (!!headerRef.current) {
        headerRef.current.style.position = "fixed";
        headerRef.current.style.width = "100%";
        headerRef.current.className = "header reveal";
      }
    } else if (!!scrollPosition && scrollPosition < 300) {
      if (!!headerRef.current) {
        headerRef.current.style.position = "relative";
        headerRef.current.className = "header";
      }
    }
  }, [scrollPosition]);
  useEffect(() => {
    if (!isLoggedIn) {
      setOpenModalAuthReg(true);
    }
  }, [isLoggedIn]);
  const verifyEmail = async () => {};
  const handleLogin = async (values: any) => {
    try {
      // alert(1313)
      // console.log('sadadd',values)
      setIsAuthLoading(true);
      const result = await login(values.email, values.password);
      if (!result?.accessToken) {
        toast.error(result?.message);
        setIsAuthLoading(false);
      } else {
        toast.success("Đăng nhập thành công");
        dispatch(setUserInfo(result));
        setOpenModalAuthReg(false);
        setIsAuthLoading(false);
      }
    } catch (error: any) {
      toast.error(error?.message ?? error);
      setIsAuthLoading(false);
    }
  };
  const handleSignUp = async (values: any) => {
    try {
      // alert(1313)
      // console.log('sadadd',values)
      setIsAuthLoading(true);

      const result = await signup(values);
      console.log("result", result);
      if (!result?.accessToken) {
        toast.error(result?.message);
        setIsAuthLoading(false);
      } else if (result?.accessToken) {
        toast.success("Đăng kí tài khoản thành công");
        setIsAuthLoading(false);
        dispatch(setUserInfo(result));
        setOpenModalAuth(false);
        setOpenModalAuthReg(true);
      }
    } catch (error: any) {
      toast.error(error?.message ?? error);
      setIsAuthLoading(false);
    }
  };
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
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <div
        style={
          {
            // position: 'fixed',
            // width: '100%',
          }
        }
        className="header"
        ref={headerRef}
      >
        <Navbar
          openModalAuth={openModalAuth}
          setOpenModalAuth={setOpenModalAuth}
          openModalAuthReg={openModalAuthReg}
          setOpenModalAuthReg={setOpenModalAuthReg}
          selectedKey={selectedKey}
          setSelectedKey={setSelectedKey}
        />
      </div>
      <Layout>
        <Layout>
          <Content
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            <div className="h-[500px] w-[100vw] ">
              {/* <CustomCarousel
                slides={[
                  <Image
                    key="1"
                    preview={false}
                    className="w-full h-full object-cover"
                    src={'https://ichef.bbci.co.uk/ace/standard/976/cpsprodpb/14235/production/_100058428_mediaitem100058424.jpg'}
                    alt="Logo"
                  />,
                  <Image
                    key="2"
                    preview={false}
                    className="w-full h-full object-contain"
                    src={BacKanImage.src}
                    alt="Logo"
                  />,
                  <Image
                    key="3"
                    preview={false}
                    className="w-full h-full object-cover"
                    src={BacKanImage.src}
                    alt="Logo"
                  />,
                ]}
              /> */}

              {/* <Slider /> */}
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
                <ListView />
              </div>
            )}
          </Content>
        </Layout>
      </Layout>
      <Layout.Footer className="flex justify-between">
        <Space direction="horizontal" size={24}>
          <Typography.Text className="font-semibold opacity-50">
            @VieTrail
          </Typography.Text>
          <Link className="opacity-50 hover:text-blue-300" href={""}>
            ho tro
          </Link>
          <Link className="opacity-50 hover:text-blue-300" href={""}>
            lien he
          </Link>
          <Link className="opacity-50 hover:text-blue-300" href={""}>
            dich vu
          </Link>
        </Space>
        <Space size={24}>
          <Space size={12}>
            <GlobalOutlined />
            <Dropdown
              overlay={
                <Space direction="vertical">
                  <Typography.Text className="opacity-50 hover:text-blue-300">
                    Vietnamese
                  </Typography.Text>
                  <Typography.Text className="opacity-50 hover:text-blue-300">
                    English
                  </Typography.Text>
                </Space>
              }
            >
              <Typography.Text className="opacity-50 hover:text-blue-300">
                English
              </Typography.Text>
            </Dropdown>
          </Space>
          <Link className="opacity-50 hover:text-blue-300" href={""}>
            tiktok
          </Link>
          <Link className="opacity-50 hover:text-blue-300" href={""}>
            instagram
          </Link>
          <Button onClick={() => setOpenModalAuth(true)}>Login</Button>
        </Space>
      </Layout.Footer>
      <CommonModal
        title=""
        style={{
          overflowY: "hidden",
        }}
        // title='Login or Sign up'
        visible={openModalAuth}
        onCancel={() => {
          setOpenModalAuth(false);
        }}
        onOk={() => {
          setOpenModalAuth(false);
        }}
        okText="Login"
        cancelText="Cancel"
        width={700}
      >
        <>
          <div className="w-full min-h-[480px] ">
            <div className="auth-form-wrapper">
              <div className="header w-full text-center text-2xl font-bold border-b-[1px]  border-b-gray-300">
                <Text className="relative bottom-2">Sign up</Text>
              </div>
              <div className="body w-full p-3 flex flex-col pt-[20px]">
                <div className="title">
                  <Text className="text-2xl ">Welcome to VieTrail</Text>
                </div>
                <div className="input-group w-full flex flex-col mt-2">
                  <Form form={authForm}>
                    <Row>
                      <Col span={24}>
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Please input your email!",
                            },
                            {
                              type: "email",
                              message: "Please input a valid email!",
                            },
                          ]}
                          name="email"
                        >
                          <Input
                            className=""
                            size="large"
                            placeholder="Email"
                          />
                        </Form.Item>
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Please input your username!",
                            },
                          ]}
                          name="username"
                        >
                          <Input
                            className=""
                            size="large"
                            placeholder="Username"
                          />
                        </Form.Item>
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Please input your first name!",
                            },
                          ]}
                          name="firstName"
                        >
                          <Input
                            className=""
                            size="large"
                            placeholder="First Name"
                          />
                        </Form.Item>
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Please input your last name!",
                            },
                          ]}
                          name="lastName"
                        >
                          <Input
                            className=""
                            size="large"
                            placeholder="Last Name"
                          />
                        </Form.Item>
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Please input your password!",
                            },
                            {
                              min: 6,
                              message:
                                "Password must be at least 6 characters!",
                            },
                          ]}
                          name="password"
                        >
                          <Input size="large" placeholder="Password" />
                        </Form.Item>
                        {/* confirm passwo rd */}
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Please confirm your password!",
                            },
                            ({ getFieldValue }) => ({
                              validator(_, value) {
                                if (!value || !getFieldValue("password")) {
                                  return Promise.resolve();
                                }
                                if (value !== getFieldValue("password")) {
                                  return Promise.reject(
                                    new Error("Passwords do not match!")
                                  );
                                }
                                return Promise.resolve();
                              },
                            }),
                          ]}
                          name="confirmPassword"
                        >
                          <Input size="large" placeholder="Confirm Password" />
                        </Form.Item>
                        <Form.Item>
                          <Button
                            onClick={async () => {
                              // userFounded
                              //   === null ? verifyEmail : userFounded ? handleLogin : handleSignUp
                              // console.log("values", authForm.getFieldsValue());
                              try {
                                await authForm.validateFields();
                                const values = authForm.getFieldsValue();
                                if (openModalAuth) {
                                  await handleSignUp(values);
                                } else {
                                  // await handleLogin(values);
                                }
                                // console.log(values);
                              } catch (error) {
                                showValidationErrors(error);
                                console.log(error);
                              }
                            }}
                            type={!isAuthLoading ? "primary" : "default"}
                            className="w-full"
                            size="large"
                          >
                            {isAuthLoading ? <Spin /> : "Continue"}
                          </Button>
                        </Form.Item>
                        <Divider>
                          <Text className="text-sm font-semibold opacity-50">
                            Or continue with
                          </Text>
                        </Divider>
                        <Form.Item>
                          <Button
                            onClick={() => {
                              signInWithGoogle();
                              // userFounded
                              //   === null ? verifyEmail : userFounded ? handleLogin : handleSignUp
                            }}
                            type="primary"
                            className="w-full bg-[#4285F4]"
                            size="large"
                          >
                            Google
                          </Button>
                        </Form.Item>
                        <Form.Item>
                          <Button
                            onClick={() => {
                              // userFounded
                              //   === null ? verifyEmail : userFounded ? handleLogin : handleSignUp
                            }}
                            type="primary"
                            className="w-full bg-[#3B5998]"
                            size="large"
                          >
                            Facebook
                          </Button>
                        </Form.Item>
                      </Col>
                      {/* <Col span={12} className='pl-2'>
                       
                       
                      </Col> */}
                    </Row>
                  </Form>
                </div>
              </div>
              <div className="footer"></div>
            </div>
          </div>
        </>
      </CommonModal>
      <CommonModal
        title=""
        style={{
          overflowY: "hidden",
        }}
        // title='Login or Sign up'
        visible={openModalAuthReg}
        onCancel={() => {
          setOpenModalAuthReg(false);
        }}
        onOk={() => {
          setOpenModalAuthReg(false);
        }}
        okText="Login"
        cancelText="Cancel"
        width={700}
      >
        <>
          <div className="w-full min-h-[480px] ">
            <div className="auth-form-wrapper">
              <div className="header w-full text-center text-2xl font-bold border-b-[1px]  border-b-gray-300">
                <Text className="relative bottom-2">Sign In</Text>
              </div>
              <div className="body w-full p-3 flex flex-col pt-[20px]">
                <div className="title">
                  <Text className="text-2xl ">Welcome to VieTrail</Text>
                </div>
                <div className="input-group w-full flex flex-col mt-2">
                  <Form form={authFormReg}>
                    <Row>
                      <Col span={24}>
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Please input your email!",
                            },
                            {
                              type: "email",
                              message: "Please input a valid email!",
                            },
                          ]}
                          name="email"
                        >
                          <Input
                            className=""
                            size="large"
                            placeholder="Email"
                          />
                        </Form.Item>
                        <Form.Item
                          rules={[
                            {
                              required: true,
                              message: "Please input your password!",
                            },
                            {
                              min: 6,
                              message:
                                "Password must be at least 6 characters!",
                            },
                          ]}
                          name="password"
                        >
                          <Input size="large" placeholder="Password" />
                        </Form.Item>
                        {/* confirm passwo rd */}
                        <Form.Item>
                          <Button
                            onClick={async () => {
                              // userFounded
                              //   === null ? verifyEmail : userFounded ? handleLogin : handleSignUp
                              // console.log("values", authForm.getFieldsValue());
                              try {
                                await authFormReg.validateFields();
                                const values = authFormReg.getFieldsValue();
                                await handleLogin(values);
                                // toast.info(JSON.stringify(values));
                                // console.log(values);
                              } catch (error) {
                                showValidationErrors(error);
                                console.log(error);
                              }
                            }}
                            type={!isAuthLoading ? "primary" : "default"}
                            className="w-full"
                            size="large"
                          >
                            {isAuthLoading ? <Spin /> : "Continue"}
                          </Button>
                        </Form.Item>
                        <Divider>
                          <Text className="text-sm font-semibold opacity-50">
                            Or continue with
                          </Text>
                        </Divider>
                        <Form.Item>
                          <Button
                            onClick={() => {
                              signInWithGoogle();
                              // userFounded
                              //   === null ? verifyEmail : userFounded ? handleLogin : handleSignUp
                            }}
                            type="primary"
                            className="w-full bg-[#4285F4]"
                            size="large"
                          >
                            Google
                          </Button>
                        </Form.Item>
                        <Form.Item>
                          <Button
                            onClick={() => {
                              // userFounded
                              //   === null ? verifyEmail : userFounded ? handleLogin : handleSignUp
                            }}
                            type="primary"
                            className="w-full bg-[#3B5998]"
                            size="large"
                          >
                            Facebook
                          </Button>
                        </Form.Item>
                      </Col>
                      {/* <Col span={12} className='pl-2'>
                      </Col> */}
                    </Row>
                  </Form>
                </div>
              </div>
              <div className="footer"></div>
            </div>
          </div>
        </>
      </CommonModal>
      <ViewSwitchBag />
    </Layout>
  );
};

export default App;
