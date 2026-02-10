import axios from 'axios'
import router from '@/router'
import { useRoute } from 'vue-router';
import { getBaseUrl } from "@/utils/explain"
import { useUserStore, useAppStore } from '@/store'
import useCryptoJs from "@/axios/aesUtils.js";
import { encryptStorage } from "@/store/EncryptStorage.js";
import path from '@/api/path';


const { Logout } = path();

class HttpRequest {

  // 構造方法，用於初始化基本 URL 及其他默認設置
  constructor() {
    this.baseUrl = getBaseUrl()  // 從工具函數獲取基本 URL
    this.withCredentials = false // 設置是否攜帶憑證
  }

  // 獲取請求的配置
  getConfig() {
    var baseUrl = import.meta.env.VITE_API_ROOT;
    const appStore = useAppStore();

    // 如果配置文件中設定了讀取本地配置，則使用本地 API 根目錄
    if (import.meta.env.VITE_READ_LOCAL_CONFIG == "true") {
      var apiRootUrl = appStore.ApiRootUrl;

      // 如果本地 API 根目錄未定義，則使用默認的根目錄
      if (apiRootUrl == undefined || apiRootUrl == "" || apiRootUrl == "undefined") {
        baseUrl = import.meta.env.VITE_API_ROOT;
      } else {
        baseUrl = apiRootUrl;
      }
    }

    // 更新應用商店中的 API 根目錄
    appStore.SET_ApiRootUrl(baseUrl);

    // 返回 Axios 請求的配置
    const config = {
      baseURL: baseUrl,
      headers: {
        'Content-Type': 'text/plain'
      },
    }
    return config
  }

  // 根據 HTTP 方法設置請求的參數
  getParams(payload) {
    const { method, data } = payload

    // 如果是這些方法之一，則將數據作為請求體發送
    if (['post', 'put', 'patch', 'delete'].indexOf(method) >= 0) {
      payload.Data = JSON.stringify(data)
    } else {
      // 否則將數據作為 URL 參數發送
      payload.params = JSON.stringify(data)
      delete payload.Data
    }

    return payload
  }

  // 根據 HTTP 狀態碼檢查響應狀態
  checkStatus(status) {
    let errMessage = ''
    const userStore = useUserStore();

    // 根據不同的狀態碼設置錯誤訊息
    switch (status) {
      case 400:
        errMessage = '錯誤請求'
        break
      case 401:
        errMessage = '未授權，請重新登入';
        userStore.SET_TOKEN();  // 清除用戶 token
        // router.push({ name: 'Login' })  // 導航到登入頁面
        break
      case 403:
        errMessage = '拒絕訪問'
        break
      case 404:
        errMessage = '請求錯誤，未找到該資源'
        break
      case 405:
        errMessage = '請求方法未允許'
        break
      case 408:
        errMessage = '請求超時'
        break
      case 500:
        errMessage = '服務器端出錯'
        break
      case 501:
        errMessage = '網絡未實現'
        break
      case 502:
        errMessage = '網絡錯誤'
        break
      case 503:
        errMessage = '服務不可用'
        break
      case 504:
        errMessage = '網絡超時'
        break
      case 505:
        errMessage = 'HTTP 版本不支持該請求'
        break
      default:
        errMessage = '連接錯誤'
    }
    return errMessage
  }

  // 設置請求與響應攔截器
  setInterceptors(instance) {
    const { EncryptInit, DecryptInit } = useCryptoJs();
    const that = this;
    // 請求攔截器
    instance.interceptors.request.use(
      config => {
        
        const token = encryptStorage.getItem("Token"); // 獲取加密存儲中的 token
        console.log(token, "有", router.currentRoute.value.meta.typeName);
        if (!token && !router.currentRoute.value.name) {
          window.location.href = Logout.path;
          localStorage.removeItem('refreshCount');
          localStorage.removeItem('rowId');
        }
        //if (!token && router.currentRoute.value.meta.typeName == "Spy") {
          
        //  if (window.$FailedAlert) {
        //    window.$FailedAlert({
        //      Content: "沒有 token",
        //      IsShow: true,
        //    });
        //  }
        //  router.push({
        //    path: '/404'
        //  });
        //}

        const { data } = config;
        const list = {          
            "token":token,
            "data": data,
        }

        // 加密請求數據
        const encryptedData = EncryptInit(list);
        config.data = encryptedData;
         const decryptedData = DecryptInit(encryptedData);
         // console.log(config, "送出(解密) request");
         console.log(decryptedData, "送出(解密) request2");
       
        console.log(config);
        return config
      },
      error => {
        router.push({
          path: '/404'
        });
        return Promise.reject(new Error(error))
      }
    )

    // 響應攔截器
    instance.interceptors.response.use(
      res => {

        //判斷是否為Mock 模式，如果是Mock 不用解密
        try {
                  // 解密響應數據
          const decryptedData = DecryptInit(res.data);
          const { code, message, statusCode } = decryptedData;
     
          //if (code !== 0) {
       
          //  if (window.$FailedAlert) {
          //    window.$FailedAlert({
          //      Content: that.checkStatus(statusCode),
          //      IsShow: true,
          //    });
          //  }
          //        router.push({
          //          path: '/404'
          //        });

          //      }

               
          if (decryptedData?.data?.Token) {
            // 如果響應中有 Token，則更新加密存儲中的 Token
            encryptStorage.setItem("Token", decryptedData.data.Token);
          }

               let result = decryptedData;
               console.log(result, "response");



              return result

          } catch (error) {
          router.push({
            path: '/404'
          });
            if(error == "SyntaxError: Unexpected end of JSON input"){
                let result = res.data;
                return result
            }
        }
        

      },
      error => {
        if (error && error.response) {

          error.message = that.checkStatus(error.status);
          if (window.$FailedAlert) {
            window.$FailedAlert({
              Content: error.message + " "+error.status,
              IsShow: true,
            });
          }
        }
 
          router.push({
                    path: '/404'
          });
        
        console.log(error, "error");

        // 如果需要，可以在這裡檢查錯誤狀態碼並顯示錯誤訊息
         return Promise.reject(new Error(error.message))
      }
    )
  }

  // 發送請求的方法
  request(options) {
    const instance = axios.create()  // 創建 Axios 實例
    const baseOpt = this.getConfig()  // 獲取基礎配置
    const params = Object.assign({}, baseOpt, this.getParams(options))  // 合併配置與參數

    this.setInterceptors(instance)  // 設置攔截器

    return instance(params)  // 發送請求
  }
}

const http = new HttpRequest()
export default http
