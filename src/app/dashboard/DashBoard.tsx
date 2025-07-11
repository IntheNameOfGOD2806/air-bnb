"use client";

import type { Metadata } from "next";
import Grid from "@mui/material/Grid";
import dayjs from "dayjs";
import "@cometchat/chat-uikit-react/css-variables.css";
import { useState } from "react";
import { Modal, Descriptions, Spin, Tag } from "antd";
import { getAllTripsAPI, deleteTripByAPI } from "@/lib/trips";
import { useAppSelector } from "@/lib/hooks";
import { selectUserInfo } from "@/lib/features/auth/authSlice";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { CometChat } from "@cometchat/chat-sdk-javascript";
import {
  CometChatMessageComposer,
  CometChatMessageHeader,
  CometChatMessageList,
  CometChatUIKit,
} from "@cometchat/chat-uikit-react";
// import "../../CometChat/CometChatNoSSR/CometChatNoSSR.css";
import { createCometChatUser } from "@/lib/cometChat";
import { config } from "@/config";
import { Budget } from "@/components/dashboard/overview/budget";
import { LatestOrders } from "@/components/dashboard/overview/latest-orders";
import { LatestProducts } from "@/components/dashboard/overview/latest-products";
import { BookingsThisWeek, Sales } from "@/components/dashboard/overview/sales";
import { TasksProgress } from "@/components/dashboard/overview/tasks-progress";
import { TotalCustomers } from "@/components/dashboard/overview/total-customers";
import { TotalProfit } from "@/components/dashboard/overview/total-profit";
import { Traffic } from "@/components/dashboard/overview/traffic";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import GlobalStyles from "@mui/material/GlobalStyles";
import { UserProvider } from "@/context/user-context";
import { LocalizationProvider } from "@/components/core/localization-provider";
import { ThemeProvider } from "@/components/core/theme-provider/theme-provider";
import { AuthGuard } from "@/components/auth/auth-guard";
import { MainNav } from "@/components/dashboard/layout/main-nav";
import { SideNav } from "@/components/dashboard/layout/side-nav";
import { Button, Space, Table } from "antd";
import React from "react";
import AppWrapper from "../wrapper";
import { useAppstore } from "@/store/store";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps): React.JSX.Element {
  const columns = [
    {
      title: "Ngày bắt đầu",
      dataIndex: ["tripinfo", "startDate"],
      key: "startDate",
      align: "center",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: ["tripinfo", "endDate"],
      key: "endDate",
      align: "center",
    },
    {
      title: "Giá tiền",
      dataIndex: ["tripinfo", "price"],
      key: "price",
      align: "center",
      render: (price: string) => `${Number(price).toLocaleString()}₫`,
    },
    {
      title: "Ngày đặt phòng",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (date: string) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Tên phòng",
      dataIndex: ["listing", "title"],
      key: "listing.title",
      align: "center",
      render: (title: string, record: any) => (
        <span
          className="text-blue-600 cursor-pointer "
          onClick={() => {
            router.push(`/listing/${record?.listing?.id}`);
          }}
        >
          {title}
        </span>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      align: "center",
      render: (_: string, record: any) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleView(record)}>
            Xem
          </Button>
          <Button danger onClick={() => handleOpenDeleteModal(record)}>
            Xóa
          </Button>
          <Button onClick={() => {}} type="default">
            Liên hệ
          </Button>
        </Space>
      ),
    },
  ];
  const isLoggedIn = useAppSelector(selectUserInfo)?.id;
  const userInfo = useAppSelector(selectUserInfo);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [chatUser, setChatUser] = useState<CometChat.User | null>(null);
  const [selectedTrip, setSelectedTrip] = useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const defaultAvatar =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ395qcYOPsd3cuhPPIzz871lLgqHr0Di0F5w&s";

  const handleCloseContactModal = () => {
    setIsContactModalOpen(false);
    setChatUser(null);
  };

  const handleView = (record: any) => {
    setSelectedTrip(record);
    setIsViewModalOpen(true);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedTrip(null);
  };

  const handleOpenDeleteModal = (record: any) => {
    setSelectedTrip(record);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setSelectedTrip(null);
  };

  const handleConfirmDelete = async () => {
    try {
      const result = await deleteTripByAPI(selectedTrip.id);
      if (result) {
        // toast.success("Chuyến đi đã được xóa thành công");
        const newData = data.filter((item: any) => item.id !== selectedTrip.id);
        setData(newData);
      }
    } catch (err) {
      toast.error("Không thể xóa chuyến đi");
      console.log("err", err);
    } finally {
      handleCloseDeleteModal();
    }
  };

  React.useEffect(() => {
    if (!userInfo?.id) {
      toast.error("Vui lòng đăng nhập để xem danh sách chuyến đi");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getAllTripsAPI();
        setData(result);
      } catch (err) {
        toast.error("Không thể tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userInfo]);

  return (
    <AppWrapper>
      <LocalizationProvider>
        {/* <UserProvider> */}
        <ThemeProvider>
          {/* <AuthGuard> */}
          <GlobalStyles
            styles={{
              body: {
                "--MainNav-height": "56px",
                "--MainNav-zIndex": 1000,
                "--SideNav-width": "280px",
                "--SideNav-zIndex": 1100,
                "--MobileNav-width": "320px",
                "--MobileNav-zIndex": 1100,
              },
            }}
          />
          <Box
            sx={{
              bgcolor: "var(--mui-palette-background-default)",
              display: "flex",
              flexDirection: "column",
              position: "relative",
              minHeight: "100%",
            }}
          >
            {/* <SideNav /> */}
            <Box
              sx={{
                display: "flex",
                flex: "1 1 auto",
                flexDirection: "column",
                pl: { lg: "" },
              }}
            >
              {/* <MainNav /> */}
              <main>
                <Container maxWidth="xl" sx={{ py: "64px" }}>
                  {children}
                </Container>
              </main>
            </Box>
          </Box>
          s{/* </AuthGuard> */}
        </ThemeProvider>
        {/* </UserProvider> */}
      </LocalizationProvider>
    </AppWrapper>
  );
}

export default function DashBoard(): React.JSX.Element {
  const userInfo = useAppSelector(selectUserInfo);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    if (!userInfo?.id) {
      toast.error("Vui lòng đăng nhập để xem danh sách chuyến đi");
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const result = await getAllTripsAPI();
        setData(result);
      } catch (err) {
        toast.error("Không thể tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userInfo]);
  const router = useRouter();
  const isLoggedIn = useAppSelector(selectUserInfo)?.id;
  const columns = [
    {
      title: "Ngày bắt đầu",
      dataIndex: ["tripinfo", "startDate"],
      key: "startDate",
      align: "center",
      render: (date: string) =>
        !date ? (
          <>
            <Tag color="blue">TOUR</Tag>
          </>
        ) : (
          new Date(date).toLocaleDateString("vi-VN")
        ),
    },
    {
      title: "Ngày kết thúc",
      dataIndex: ["tripinfo", "endDate"],
      key: "endDate",
      align: "center",
      render: (date: string) =>
        !date ? (
          <>
            <Tag color="blue">TOUR</Tag>
          </>
        ) : (
          new Date(date).toLocaleDateString("vi-VN")
        ),
    },
    {
      title: "Giá tiền",
      dataIndex: ["tripinfo", "price"],
      key: "price",
      align: "center",
      render: (price: string) => `${Number(price).toLocaleString()}₫`,
    },
    {
      title: "Ngày đặt phòng",
      dataIndex: "createdAt",
      key: "createdAt",
      align: "center",
      render: (date: string) => new Date(date).toLocaleDateString("vi-VN"),
    },
    {
      title: "Tên phòng",
      dataIndex: ["listing", "title"],
      key: "listing.title",
      align: "center",
      render: (title: string, record: any) => (
        <span
          className="text-blue-600 cursor-pointer "
          onClick={() => {
            router.push(`/listing/${record?.listing?.id}`);
          }}
        >
          {title}
        </span>
      ),
    },
    // {
    //   title: "Hành động",
    //   key: "action",
    //   align: "center",
    //   render: (_: string, record: any) => (
    //     <Space size="middle">
    //       <Button type="primary" onClick={() => handleView(record)}>
    //         Xem
    //       </Button>
    //       <Button danger onClick={() => handleOpenDeleteModal(record)}>
    //         Xóa
    //       </Button>
    //       <Button onClick={() => {}} type="default">
    //         Liên hệ
    //       </Button>
    //     </Space>
    //   ),
    // },
  ];
  const {listings} = useAppstore();
  return (
    <Layout>
      <Grid container spacing={3}>
        <Grid
          size={{
            lg: 3,
            sm: 6,
            xs: 12,
          }}
        >
          <Budget diff={12} trend="up" sx={{ height: "100%" }} value="797" />
        </Grid>
        <Grid
          size={{
            lg: 3,
            sm: 6,
            xs: 12,
          }}
        >
          <TotalCustomers
            diff={16}
            trend="down"
            sx={{ height: "100%" }}
            value="65"
          />
        </Grid>
        <Grid
          size={{
            lg: 3,
            sm: 6,
            xs: 12,
          }}
        >
          <TasksProgress
            sx={{ height: "100%" }}
            value="20"
            trend="up"
            diff={16}
          />
        </Grid>
        <Grid
          size={{
            lg: 3,
            sm: 6,
            xs: 12,
          }}
        >
          <TotalProfit sx={{ height: "100%" }} value="50" />
        </Grid>
        <Grid
          size={{
            lg: 8,
            xs: 12,
          }}
        >
          {/* <Sales
            chartSeries={[
              {
                name: "This year",
                data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
              },
              {
                name: "Last year",
                data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
              },
            ]}
            sx={{ height: "100%" }}
          /> */}
          <BookingsThisWeek
            chartSeries={[
              {
                name: "Bookings",
                data: [10, 20, 20, 15], // Thứ 2 -> Chủ nhật
              },
            ]}
          />
        </Grid>
        <Grid
          size={{
            lg: 4,
            md: 6,
            xs: 12,
          }}
        >
          <Traffic
            chartSeries={[502, 103, 175]}
            labels={["Desktop", "Tablet", "Phone"]}
            sx={{ height: "100%" }}
          />
        </Grid>
        <Grid
          size={{
            lg: 4,
            md: 6,
            xs: 12,
          }}
        >
          <LatestProducts
            products={[
             ...listings?.map((listing:any) => ({
              id: listing?.id,
              name: listing?.title,
              image: listing?.photos[0],
              updatedAt: listing?.createdAt,
              isTour: listing?.isTour,
             })) || []
            ]}
          />
        </Grid>
        <Grid
          size={{
            lg: 8,
            md: 12,
            xs: 12,
          }}
        >
          <Table
            title={() => (
              <>
                <h3 className="text-2xl font-bold">Danh sách chuyến đi</h3>
                {/* số lượng chuyến đi */}
                <p className="text-lg font-semibold">
                  Hiện có
                  <span className="text-blue-600 mx-1 text-2xl font-bold">
                    {data?.length}
                  </span>
                  chuyến đi
                </p>
              </>
            )}
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            columns={columns}
            dataSource={data}
            rowKey="id"
            loading={loading}
            pagination={{ pageSize: 6 }}
            bordered
          />
        </Grid>
      </Grid>
    </Layout>
  );
}
