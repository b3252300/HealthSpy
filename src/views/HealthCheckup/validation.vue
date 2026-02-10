<template>


  <Loading :IsShow="finishLoading" />
  <FailedAlert ref="Failedref" :IsShow="finishAlert" :Content="messenger" @Close="FailedClose" />
</template>

<script setup>
import { ref, watchEffect } from 'vue';

import { encryptStorage } from "@/store/EncryptStorage.js";
import { Validation, GetVersion } from '@/api/user';
import { HaveSurveyResult } from "@/api/HealthSurveyQuestionnaire";
import { HasData } from "@/api/Questionnaire";

import router from '@/router'
import { useRoute } from 'vue-router';
import Loading from '@/components/Loading.vue';
import path from '@/api/path';
const { Logout } = path();
const route = useRoute();
const rowId = ref("");

//錯誤提示
import FailedAlert from "@/components/FailedAlert.vue";
const finishLoading = ref(false);
const Failedref = ref(null);
const finishAlert = ref(false);
const messenger = ref("");


if (finishLoading.value) {
  finishLoading.value = false;
}


watchEffect(() => {
  rowId.value = route.params.rowId;
});
//https://hkt-dm1.landseed.com.tw/HealthMember/Development/NewWebApp/healthspyvue/validation/Nl5NLmvjDRD0/NhmcList
//https://eservice.landseed.com.tw/healthspyvue/validation/SlOwskwpkyGt?id=aaaaa&action=NHmc
// http://192.168.26.194:9528/healthspyvue/validation/Nl5HTmvNAUKY/HealthSurvey
// http://192.168.26.194:9529/member/nhmc/validation/SlOwskwpkyGt
let params = {
  //   RowId: 'SlOowkuM76IV'
  RowId: rowId.value
};
console.log(rowId.value);

const ValidationApi = () => {
  if (finishLoading.value) {
    finishLoading.value = false;
  }
  Validation(params).then((res) => {
    const { code, data } = res;
    if (code == 0) {
      if (route.params.rowId !== undefined) {
        localStorage.setItem('rowId', rowId.value);
      }



      if (data.Token) {
        if (route.params.action === "NhmcList") {
          //尊爵健檢
          router.push({
            path: '/member/nhmc/Schedule'
          });

        } else if (route.params.action === "HealthSurvey") {
          //健康分數
          let params = {};
          HaveSurveyResult(params).then((res) => {
            console.log(res, "HaveSurveyResult");
            const { code, message, data } = res;
            if (code == 0) {
              if (finishLoading.value) {
                finishLoading.value = false;
              }
              if (data.IsSurveyResult) {

                router.push({
                  path: '/member/HealthSurvey/Result'
                });
              } else {
                router.push({
                  path: '/member/HealthSurvey/index'
                });
              }

            } else {
              finishAlert.value = true; //開啟錯誤提示
              messenger.value = message; //錯誤提示文字內容
            }
          });
        } else if (route.params.action === "DiseaseRisk") {
          let params = {};
          HasData(params).then((res) => {
            const { code, message, data } = res;
            console.log(res, "HasData");
            if (code == 0) {

              //是否有疾病風險
              if (data.DataSource == 0) {
                //無資料
                router.push({
                  path: '/member/DiseaseRisk/index'
                });
              } else if (data.DataSource == 1) {
                //僅有健康特務資料
                router.push({
                  path: '/member/DiseaseRisk/Result'
                });
              } else if (data.DataSource == 2) {
                //有國健署資料
                router.push({
                  path: '/member/DiseaseRisk/NationalResult'
                });
              } else {
                router.push({
                  path: '/404'
                });
              }

            } else {
              finishAlert.value = true; //開啟錯誤提示
              messenger.value = message; //錯誤提示文字內容
            }

          });

        } else {
          alert("無法辨識" + route.params.rowId);
          router.push({
            path: '/404'
          });
        }


      } else {
        alert("沒有 Token");
        window.location.href = Logout.path;
      }
    } else {
      alert("Token 失敗" + "(" + code + ")");
      router.push({
        path: '/404'
      });
    }
  })
  //.finally(() => {
  //  finishLoading.value = true;
  //});
}



//if(route.params.action === "NHmc"){

//    //尊爵健檢
//    router.push({
//        path: '/member/nhmc/Schedule'
//    });

//}else if(route.params.action === "HealthSurvey"){
//  //健康分數
//  router.push({
//     path: '/HealthSurvey/inex'
//  });
//}else if(route.params.action === "Risk"){
//  //疾病風險
//  router.push({
//     path: '/DiseaseRisk/inex'
//  });
//}else{
//  alert("無法辨識");
//  router.push({
//          path: '/404'
//        });
//}


//ValidationApi();




const Version = ref("");
const FrontVersion = ref("");
let paramss = {};
let refreshCount = localStorage.getItem('refreshCount') || 0;

GetVersion(paramss)
  .then((res) => {
    const { code, data } = res;
    if (code == 0) {
      Version.value = data.Version;
      FrontVersion.value = import.meta.env.VITE_VERSION;
      console.log(res);
      // finishLoading.value = false;

      if (Version.value !== FrontVersion.value) {

        refreshCount++;  // 每次不相同時，計數增加
        localStorage.setItem('refreshCount', refreshCount);

        // 如果刷新次數小於等於 2，則進行重新整理
        if (refreshCount <= 2) {
          if (finishLoading.value) {
            finishLoading.value = false;
          }
          location.reload(true);
          // window.location.replace(location.href);
        } else {
          ValidationApi();

        }
      } else {
        ValidationApi();
      }
    }
  })
  .finally(() => {
    // finishLoading.value = true;
  });




//關掉錯誤提示
//關掉錯誤提示
function FailedClose(val) {
  finishAlert.value = val;
}
</script>
