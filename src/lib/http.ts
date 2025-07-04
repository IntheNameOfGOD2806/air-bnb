import axios from "axios";
import { toast } from "react-toastify";
import { isArray } from "util";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
const jwtkey = "accessToken";
export const instance = axios.create({
  baseURL: apiUrl,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});
// Hàm chuẩn hóa dữ liệu: Trim các chuỗi trong request
const trimData = (data: any) => {
  if (!data) return data;
  const tempData: any = Array.isArray(data) ? [] : {};
  Object.entries(data).forEach(([keyName, val]) => {
    if (typeof val === "string") tempData[keyName] = val.trim();
    else if (typeof val === "object") tempData[keyName] = trimData(val);
    else tempData[keyName] = val;
  });
  return tempData;
};
// Interceptor request: Thêm token vào header
instance.interceptors.request.use(
  (config) => {
    config.params = { ...config.params};
    if (config.data && !(config.data instanceof FormData)) {
      config.data = trimData(config.data);
    }
    config.headers.Authorization = `Bearer ${localStorage.getItem(jwtkey)}`;
    return config;
  },
  (error) => Promise.reject(error)
);
// Interceptor response: Xử lý lỗi 401
instance.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.statusCode;
    const message = error.response?.data?.message || "Có lỗi xảy ra";

    if (status === 401) {
      toast.error("Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại.");

      // Xoá token
      removeStoredJwt();

      // Redirect về trang login (nếu đang không ở đó)
      if (typeof window !== "undefined" ) {
        window.location.href = "/";
      }
    }

    return Promise.reject(error);
  }
);
export const createUrl = (endpoint: string) => new URL(endpoint, apiUrl).href;
export const isStoredJwt = () =>
  localStorage.getItem(jwtkey) !== null ||
  localStorage.getItem(jwtkey) !== "" ||
  localStorage.getItem(jwtkey) !== "undefined";
export const setStoredJwt = (accessToken: string) =>
  localStorage.setItem(jwtkey, accessToken);
export const removeStoredJwt = () => localStorage.removeItem(jwtkey);

export const get = instance.get;
export const post = instance.post;
export const put = instance.put;
export const del = instance.delete;
