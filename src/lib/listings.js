import { createUrl, del, post } from "./http";
import { toast } from "react-toastify";
import qs from "qs";
import { get } from "./http";

export const createListingAPI = async (data) => {
  const result = await post(createUrl("api/listings"), {
    ...data,
    // isTour : true
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
    const query = qs.stringify(
      {
        orderBy: {
          createdAt: "desc",
        },
        where: {
          isTour: {
            equals: '',
          },
        },
      },
      {
        encodeValuesOnly: true,
      }
    );
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
export const getUserListings = async (userId) => {
  try {
    const query = qs.stringify(
      {
        where: {
          listingCreatedBy: {
            id: userId,
          },
        },
      },
      {
        encodeValuesOnly: true,
      }
    );
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
export const getTourListings = async () => {
  try {
    const query = qs.stringify(
      {
        where: {
          isTour: {
            equals: 1,
          },
        },
      },
      {
        encodeValuesOnly: true,
      }
    );
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
export const deleteListing = async (listingId) => {
  try {
    const result = await del(createUrl(`api/listings/${listingId}`));
    if (!result?.data) {
      toast.error("Không thể xóa điểm lưu trú");
      return null;
    }
    toast.success("Điểm lưu trú đã được xóa thành công");
    return result?.data;
  } catch (error) {
    console.log(error?.message ?? error);
    return null;
  }
};
export const addToWishList = async (listingId) => {
  try {
    const result = await post(createUrl(`api/listings/${listingId}/wishlist`));
    if (!result?.data) {
      toast.error("Không thể thêm vào danh sách yêu thích");
      return null;
    }
    toast.success("Điểm lưu trú đã được thêm vào danh sách yêu thích");
    return result?.data;
  } catch (error) {
    console.log(error?.message ?? error);
    return null;
  }
};
export const getListing = async (listingId) => {
  try {
    const result = await get(createUrl(`api/listings/${listingId}`));
    if (!result?.data) {
      toast.error("Không thể lấy thông tin điểm lưu trú");
      return null;
    }
    return result?.data;
  } catch (error) {
    console.log(error?.message ?? error);
    return null;
  }
};
export const getTripByListingId = async (listingId) => {
  try {
    const result = await get(createUrl(`api/listings/${listingId}/trips`));
    if (!result?.data) {
      toast.error("Không thể lấy thông tin chuyến đi");
      return null;
    }
    return result?.data;
  } catch (error) {
    console.log(error?.message ?? error);
    return null;
  }
};
export const disconnectTripByListingId = async (listingId, body) => {
  try {
    const result = await del(
      createUrl(`api/listings/${listingId}/trips`),
      body
    );
    if (!result?.data) {
      toast.error("Không thể gỡ thông tin chuyến đi");
      return null;
    }
    toast.success("Chuyến đi đã được gỡ thành công");
    return result?.data;
  } catch (error) {
    console.log(error?.message ?? error);
    return null;
  }
};
