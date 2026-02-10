import { createApp, ref } from "vue";
import App from './App.vue'
import router from './router'
import { registerStore } from '@/store'
import FailedAlertComponent from "@/components/FailedAlert.vue"; // 確保路徑正確
// 第三方自定义字体文件
import './assets/fonts/index.css'

import 'bootstrap';
// 自定义指令
import registerDirective from '@/directive'


import Vue3Lottie from 'vue3-lottie'
// import 'vue3-lottie/dist/style.css'

// import './mock'

//全域自訂樣式
import './styles/custom/style.scss'



const app = createApp(App)

const initApp = async () => {

  //錯誤提示彈跳視窗
  function FailedAlert({ Content = "", IsShow = true }) {
    const isShow = ref(IsShow);
    const container = document.createElement("div");
    document.body.appendChild(container);

    const alertApp = createApp(FailedAlertComponent, {
      Content,
      IsShow: isShow.value,
      onClose: () => {
        isShow.value = false;
        setTimeout(() => {
          alertApp.unmount();
          document.body.removeChild(container);
        }, 300);
      },
    });

    alertApp.mount(container);
  }

  // 註冊為全域函式
  window.$FailedAlert = FailedAlert;


  app.use(Vue3Lottie)
  app.use(router)

  registerStore(app)
  registerDirective(app)
  await router.isReady()


  app.mount('#app')


}
initApp()
