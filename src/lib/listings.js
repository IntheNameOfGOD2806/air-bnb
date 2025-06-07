import { createUrl, post } from "./http";
import { toast } from "react-toastify";
import qs from "querystring";
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

export const getAllListingsAPI = async () => {
  try {
    const query = qs.stringify({
      orderBy:{
        createdAt:"asc"
      },
    },{
     
    });
    const result = await get(createUrl(`api/listings?${query}`));

    if (!result?.data) {
      toast.error("Không có điểm lưu trú");
      return null;
    }
    return result?.data;
  } catch (error) {
    console.log(error?.message ?? error);
    return null;
  }
};
