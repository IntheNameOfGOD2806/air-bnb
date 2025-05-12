import {
  get,
  isStoredJwt,
  post,
  del,
  setStoredJwt,
  removeStoredJwt,
} from "./http";
import { createUrl } from "./http";

export const me = async () => {
  return isStoredJwt()
    ? (await get(createUrl("api/me")).catch(() => null))?.data
    : null;
};

export const login = async (email: string, password: string) => {
  const result = (
    await post(createUrl("api/login"), { email, password }).catch(() => null)
  )?.data;
  return result;
};

export const signup = async ({
  email,
  username, 
  password,
  firstName,
  lastName,
}: {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}) => {
  const result = (
    await post(createUrl("api/signup"), {
      email,
      username,
      password,
      firstName,
      lastName,
    })
  )?.data;
  // console.log("adadadada", result);
  if (!!result?.accessToken) {
    setStoredJwt(result.accessToken);
  }
  return result;
};

export const logout = async () => {
  await del(createUrl("/logout")).catch(() => null);
  removeStoredJwt();
};

export const checkUser = async (email: string) => {
  const result = (
    await post(createUrl("/check-user"), { email }).catch(() => null)
  )?.data;
  if (!result) {
    alert("Failed to check user");
    return false;
  }
  return true;
};
