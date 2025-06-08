"use client";

import React from "react";
import { Button, Space, Table } from "antd";
import { getTripsAPI } from "@/lib/trips";
import { useAppSelector } from "@/lib/hooks";
import { selectUserInfo } from "@/lib/features/auth/authSlice";
import { toast } from "react-toastify";
import AppWrapper from "../wrapper";

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
    title: "Hành động",
    key: "action",
    align: "center",
    render: (text: string, record: any) => (
      <Space size="middle">
        <Button type="primary">Xem</Button>
        <Button type="primary">Xóa</Button>
      </Space>
    ),
  },
];

const TripTable = () => {
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
        const result = await getTripsAPI();
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
    <div className="bg-white shadow-md rounded-xl p-6">
      <Table
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //   @ts-ignore
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
        bordered
      />
    </div>
  );
};

export default function Page() {
  return (
    <AppWrapper>
      <div className="min-h-screen bg-gray-50 py-10 px-4 md:px-10">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">
          Danh sách chuyến đi
        </h1>
        <TripTable />
      </div>
    </AppWrapper>
  );
}
