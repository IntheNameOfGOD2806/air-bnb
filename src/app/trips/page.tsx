"use client";

import React from "react";
import { Button, Space, Table, Modal, Descriptions } from "antd";
import { getTripsAPI,deleteTripByAPI } from "@/lib/trips";
import { useAppSelector } from "@/lib/hooks";
import { selectUserInfo } from "@/lib/features/auth/authSlice";
import { toast } from "react-toastify";
import AppWrapper from "../wrapper";
import { useRouter } from "next/navigation";

const TripTable = () => {
  const userInfo = useAppSelector(selectUserInfo);
  const [data, setData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  const [selectedTrip, setSelectedTrip] = React.useState<any>(null);
  const [isViewModalOpen, setIsViewModalOpen] = React.useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = React.useState(false);

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
        toast.success("Chuyến đi đã được xóa thành công");
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
        const result = await getTripsAPI(
          userInfo?.id
        );
        setData(result);
      } catch (err) {
        toast.error("Không thể tải dữ liệu");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userInfo]);

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
          className="text-blue-600 cursor-pointer"
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
          <Button type="default" >
            Liên hệ
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="bg-white shadow-md rounded-xl p-6">
      <Table
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        columns={columns}
        dataSource={data}
        rowKey="id"
        loading={loading}
        pagination={{ pageSize: 5 }}
        bordered
      />

      {/* Modal chi tiết */}
      <Modal
        title="Chi tiết chuyến đi"
        open={isViewModalOpen}
        onCancel={handleCloseViewModal}
        footer={[
          <Button key="close" onClick={handleCloseViewModal}>
            Đóng
          </Button>,
        ]}
      >
        {selectedTrip && (
          <Descriptions column={1} bordered size="small">
            <Descriptions.Item label="Ngày bắt đầu">
              {new Date(selectedTrip.tripinfo?.startDate).toLocaleDateString(
                "vi-VN"
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Ngày kết thúc">
              {new Date(selectedTrip.tripinfo?.endDate).toLocaleDateString(
                "vi-VN"
              )}
            </Descriptions.Item>
            <Descriptions.Item label="Giá tiền">
              {Number(selectedTrip.tripinfo?.price).toLocaleString()}₫
            </Descriptions.Item>
            <Descriptions.Item label="Ngày đặt phòng">
              {new Date(selectedTrip.createdAt).toLocaleDateString("vi-VN")}
            </Descriptions.Item>
            <Descriptions.Item label="Người dùng đặt">
              {selectedTrip?.user?.firstName} {selectedTrip?.user?.lastName}
            </Descriptions.Item>
            <Descriptions.Item label="Tên phòng">
              {selectedTrip?.listing?.title}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Modal>

      {/* Modal xác nhận xóa */}
      <Modal
        title="Xác nhận xóa chuyến đi"
        open={isDeleteModalOpen}
        onCancel={handleCloseDeleteModal}
        onOk={handleConfirmDelete}
        okText="Xóa"
        okType="danger"
        cancelText="Hủy"
      >
        {selectedTrip && (
          <>
            <p>Bạn có chắc muốn xóa chuyến đi sau?</p>
            <p>
              <strong>Phòng:</strong> {selectedTrip?.listing?.title}
            </p>
            <p>
              <strong>Ngày bắt đầu:</strong>{" "}
              {new Date(selectedTrip.tripinfo?.startDate).toLocaleDateString(
                "vi-VN"
              )}
            </p>
          </>
        )}
      </Modal>
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
