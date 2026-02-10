import { encryptStorage } from "@/store/EncryptStorage";

export default function useRequestData(role) {
  // const actionId = encryptStorage.getItem("actionId");
  // const patientToken = encryptStorage.getItem("Token");
  // const { userToken } = JSON.parse(
  //   encryptStorage.getItem("UserAuthStore") || "{}"
  // );

  const version = import.meta.env.VITE_VERSION;

  const requestUnite = (functionName, data, token) => {
    const requestData = {
      Function: functionName,
      ActionId: actionId,
      Token: token,
      Data: data,
      Version: version,
      TestMode: 0,
    };

    return requestData;
  };

  return { requestUnite };
}
