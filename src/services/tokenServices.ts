import LoginService from "./authServices";
import { useStore } from "../app/store";
import { setToLocalStorage, getFromLocalStorage } from "../helpers/localStorage";
import { setAuthHeader, clearAuthHeader } from "../helpers/api";
import * as api from "../helpers/api";

// check if the token is still valid or not
function checkValidToken() {
  const token = getFromLocalStorage("token");
  const expiredAt = getFromLocalStorage("expiredAt");
  const currentDate = new Date();
  if (token && expiredAt && currentDate.toISOString() < expiredAt) {
    return true;
  } else if (!token && !expiredAt) {
    return true;
  } else {
    return false;
  }
}
//Get the new token from the API using refresh token
async function refreshToken() {
  const accessToken = getFromLocalStorage("token");
  const refreshToken = getFromLocalStorage("refreshToken");

  const body = {
    accessToken: accessToken,
    refreshToken: refreshToken,
  };

  try {
    const data = await api.postMethod("/login/renew-token", body);
    if (data.success === true) {
      const { setToken } = useStore((state) => state);
      clearAuthHeader();
      setToLocalStorage("token", data.data.token);
      setToLocalStorage("expiredAt", data.data.refreshToken);
      setToLocalStorage("refreshToken", data.data.expiredAt);
      setAuthHeader(data.data.token);
      setToken(data.data);
      alert("Renew Token successfully");
    } else {
      console.log(data.message);
    }
  } catch (error: any) {
    alert(error.response.data.message);
    LoginService.logout();
  }
}

export { checkValidToken, refreshToken };
