"use client";
import Navbar from "@/components/NavBar/navbar";
import {
  GlobalOutlined,
  LaptopOutlined,
  NotificationOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {
  Button,
  Col,
  Divider,
  Dropdown,
  Form,
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
const { Header, Content, Sider } = Layout;

const { Text } = Typography;
const items1: MenuProps["items"] = [
  {
    key: "1",
    label: "Login",
  },
  {
    key: "2",
    label: "Sign Up",
  },
  {
    key: "3",
    label: "AirBnb your home",
  },
  {
    key: "4",
    label: "Help",
  },
].map((item) => ({
  ...item,
}));

const items2: MenuProps["items"] = [
  UserOutlined,
  LaptopOutlined,
  NotificationOutlined,
].map((icon, index) => {
  const key = String(index + 1);

  return {
    key: `sub${key}`,
    icon: React.createElement(icon),
    label: `subnav ${key}`,

    children: new Array(4).fill(null).map((_, j) => {
      const subKey = index * 4 + j + 1;
      return {
        key: subKey,
        label: `option${subKey}`,
      };
    }),
  };
});

const App: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [openModalAuth, setOpenModalAuth] = useState(false);
  const headerRef = React.useRef<HTMLDivElement>(null);
  const [userFounded, setUserFounded] = useState(null);
  const [authForm] = useForm();
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
    if (!!scrollPosition && scrollPosition >= 600) {
      if (!!headerRef.current) {
        headerRef.current.style.position = "fixed";
        headerRef.current.style.width = "100%";
        headerRef.current.className = "header reveal";
      }
    } else if (!!scrollPosition && scrollPosition < 600) {
      if (!!headerRef.current) {
        headerRef.current.style.position = "relative";
        headerRef.current.className = "header";
      }
    }
  }, [scrollPosition]);
  const verifyEmail = async () => {};
  const handleLogin = () => {};
  const handleSignUp = () => {};
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <div
        style={
          {
            // position: 'fixed',
            // width: '100%',
          }
        }
        className="header  "
        ref={headerRef}
      >
        <Navbar
          openModalAuth={openModalAuth}
          setOpenModalAuth={setOpenModalAuth}
          items={items1}
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
            <div className="h-[2000px] "></div>
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
                <Text className="relative bottom-2">Login or Sign up</Text>
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
                              message: "Password must be at least 6 characters!",
                            },
                          ]}
                          name="password"
                        >
                          <Input size="large" placeholder="Password" />
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
                                console.log(values);
                              } catch (error) {
                                console.log(error);
                              }
                            }}
                            type="primary"
                            className="w-full"
                            size="large"
                          >
                            Continue
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
    </Layout>
  );
};

export default App;
