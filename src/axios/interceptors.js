import axios from "axios";
import useCryptoJs from "./aesUtils";
import useLogBackEndRecord from "@/composable/useLogBackEndRecord";
import router from "@/router";
import { encryptStorage } from "@/store/EncryptStorage";

const { EncryptInit, DecryptInit } = useCryptoJs();
const { loggerRecord } = useLogBackEndRecord();

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_ROOT,
  headers: {
    "Content-Type": "text/plain",
  },
  // timeout: 5000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const { data } = config;
    const { Function, Data } = data;
    console.log(data);
    const encryptedData = EncryptInit(data);
    loggerRecord(Function, Data);
    config.data = encryptedData;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (res) => {
    const decryptedData = DecryptInit(res.data);
    console.log(decryptedData);
    if (decryptedData.Function === "CheckVersion") {
      if (decryptedData.Code === 2) {
        alert(decryptedData.Message);
        window.location.reload();
      }
    } else {
      if (decryptedData.Code === 2) {
        const data = {
          code: decryptedData.Code,
          status: 200,
        };
        loggerRecord("error", data);
        alert(decryptedData.Message);
      } else {
        if (res.data) {
          const data = {
            code: decryptedData.Code,
            status: 200,
          };
          loggerRecord("success", data);
          return decryptedData;
        }
      }
    }
  },
  (error) => {
    if (error && error.response) {
      switch (error.response.status) {
        case 400:
          console.log(error.response);
          break;
        case 401:
          alert("你的Token失效請重新登入");
          encryptStorage.removeItem("UserAuthStore");
          router.push({ name: "user-login" });
          console.log(error.response);
          break;
        default:
          console.log("攔截錯誤請求", error.response.status);
          return Promise.reject(error);
      }
    }
  }
);

export default axiosInstance;
