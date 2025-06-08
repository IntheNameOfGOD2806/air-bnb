import { createUrl, post } from "./http";
import { toast } from "react-toastify";

import { get } from "./http";

export const createListingAPI = async (data) => {
  const result = await post(createUrl("api/listings"), {
    ...data,
  });
  console.log("223424424242", result);
  if (!result?.data?.createdAt) {
    toast.error("Điểm lưu trú không thể tạo thành công");
    return null;
  } else {
    toast.success("Điểm lưu trú đã được tạo thành công");
    return result?.data;
  }
};

export const createTripAPI = async (data) => {
  const result = await post(createUrl("api/trips"), {
    ...data,
  });
  console.log("223424424242", result);
  if (!result?.data?.createdAt) {
    toast.error("Trip không thể tạo thành công");
    return null;
  } else {
    toast.success("Trip đã được tạo thành công");
    return result?.data;
  }
};
export const getTripsAPI = async () => {
  const result = await get(createUrl("api/trips"));
  console.log("223424424242", result);
  if (!result?.data?.length) {
    toast.error("Đã xảy ra lỗi khi lấy danh sách trip");
    return null;
  } else {
    // toast.success("Trip đã được tạo thành công");
    return result?.data;
  }
};
//delete
export const deleteTripAPI = async (tripId) => {
  const result = await del(createUrl(`api/trips/${tripId}`));
  console.log("223424424242", result);
  if (!result?.data?.createdAt) {
    toast.error("Trip không thể xóa thành công");
    return null;
  } else {
    toast.success("Trip đã được xóa thành công");
    return result?.data;
  }
};
