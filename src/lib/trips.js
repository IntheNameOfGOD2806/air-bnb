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
    toast.error("Trip không thể tạo thành công");
    return null;
  } else {
    toast.success("Trip đã được tạo thành công");
    return result?.data;
  }
};