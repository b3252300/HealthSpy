//AES 加解密設定

import CryptoJS from "crypto-js";

export default function useCryptoJs() {
  const AesKey = import.meta.env.VITE_AES_KEY;
  const AesIv = import.meta.env.VITE_AES_IV;
 // 加密
  const EncryptInit = (data) => {
    const Encrypt = CryptoJS.AES.encrypt(
      JSON.stringify(data),
      CryptoJS.enc.Latin1.parse(AesKey),
      {
        iv: CryptoJS.enc.Latin1.parse(AesIv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }
    ).toString();

    return Encrypt;
  };
  // 解密
  const DecryptInit = (data) => {

    const Decrypt = JSON.parse(
      CryptoJS.AES.decrypt(data, CryptoJS.enc.Latin1.parse(AesKey), {
        iv: CryptoJS.enc.Latin1.parse(AesIv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      }).toString(CryptoJS.enc.Utf8)
    );

    return Decrypt;
  };

  return { EncryptInit, DecryptInit };
}
