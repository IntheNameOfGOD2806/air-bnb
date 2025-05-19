import axios from "axios";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "https://air-bnb-server.onrender.com/";
const jwtkey = "accessToken";

axios.interceptors.request.use(
  (config: any) => {
    const { origin } = new URL(config.url);
    const allowedOrigins = [apiUrl];
    const accessToken = localStorage.getItem(jwtkey);
    if (!allowedOrigins.includes(origin)) return config;
    if (accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`;
    return config;
  },
  (error) => {
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

export const get = axios.get;
export const post = axios.post;
export const put = axios.put;
export const del = axios.delete;
