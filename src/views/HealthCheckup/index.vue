<template>


  <!-- Card -->
  <div class="card card-lg card-shadow">
    <main id="content" role="main">
      <!-- Content -->
      <section class="container p-3 pt-0 pb-0">
        <div class="mx-lg-auto">
          <!-- Nav -->

          <ul class="nav nav-tabs">

            <li class="nav-item">
              <a @click="tabs = 'current'" :class="['nav-link', { 'active' : isActiveHasCurrent }]" href="#">最近健檢行程</a>
            </li>
            <li class="nav-item">
              <a @click="tabs = 'History'" :class="['nav-link', { 'active' : isActiveHasHistory }]" href="#">歷史健檢行程</a>
            </li>
          </ul>
          <!-- End Nav -->
          <!-- Header -->



          <div class="card-bod p-0">
            <div v-if="tableData.length == 0" class="d-flex flex-column justify-content-center align-items-center m-3 noData_container">
              <img src="@/assets/svg/searchNoData.svg" alt="您目前沒有預約紀錄" class="img_noData">
              <div class="mt-3">您目前沒有預約紀錄</div>
            </div>
            <template v-else>
              <div class="py-4">
                <h4 class="card-title text-dark mb-0">{{ title }}</h4>
              </div>
              <!-- ========== 最近健檢行程 ========== -->
              <div v-if="isActiveHasCurrent" class="accordion" id="accordionPanelsStayOpenExample">
                <div v-for="(item, index) in tableData" class="accordion-item">
                  <h2 class="accordion-header" :id="heading(index)">
                    <button class="accordion-button" type="button" data-bs-toggle="collapse"
                            :data-bs-target="collapseItem(index, item)" aria-expanded="true"
                            :aria-controls="collapseItem(index)">
                      <div class="d-flex flex-column">
                        <div>{{ GetDateYYYYMMDD(item.ExamDate) }}</div>
                        <div>{{ item.PackageName }}</div>
                      </div>
                    </button>
                  </h2>

                  <div :id="collapseItem(index)"
                       class="bg-white accordion-collapse collapse"
                       :aria-labelledby="heading(index, item)">
                    <!-- Form -->
                    <div class="row gx-2 gx-md-3 mx-3 my-2 my-md-0">
                      <div class="col-sm-12 col-lg-3 col-md-6 d-grid my-2 my-lg-4 mt-md-6">
                        <!-- :to="{ path:'/Confirm', query:{ ExamCode:000000240800003, Status:1 } }" -->
                        <router-link class="btn btn-outline-primary" :to="{ name:'Confirm', query:{ ExamCode:item.ExamCode, Status:item.Status } }">行前資料確認</router-link>
                      </div>
                      <!-- End Col -->
                      <div class="col-sm-12 col-lg-3 col-md-6 d-grid my-2 my-lg-4 mt-md-6">
                        <button @click="SendExamSurve(item.ExamCode)" type="button" class="btn btn-outline-primary">問卷專區</button>
                      </div>
                      <div class="col-sm-12 col-lg-3 col-md-6 d-grid my-2 my-lg-4 mb-md-6">
                        <button type="button" class="btn btn-outline-primary" @click="openQcodeModal">健檢報到</button>

                      </div>
                      <!-- End Col -->
                      <div class="col-sm-12 col-lg-3 col-md-6 d-grid my-2 my-lg-4 mb-md-6">
                        <router-link type="button" class="btn btn-outline-primary" @click="openQcodeModalStatus(item.Status)" :to="{ name:'CheckItem', query:{ ExamCode:item.ExamCode, Status:item.Status } }">健檢行程總覽</router-link>
                      </div>
                      <!-- End Col -->
                    </div>
                    <!-- End Form -->
                  </div>
                </div>
              </div>

              <!-- ========== 歷史健檢行程 ========== -->
              <div v-if="isActiveHasHistory" class="d-grid gap-3">
                <!-- Card -->
                <a v-for="(item, index) in tableHistory" class="card">
                  <div class="card-body">
                    <div class="row">
                      <div class="col-12 mb-2">
                        <span class="badge btn-soft-info rounded-pill px-3 fs-4">尊爵健檢</span>
                      </div>
                      <div class="row">
                        <!-- End Col -->
                        <div class="col-10 col-md-6">
                          <div class="text-body">{{ GetDateYYYYMMDD(item.ExamDate) }}</div>
                          <div class="text-body">{{ item.PackageName }}</div>
                        </div>

                        <!-- End Col -->
                        <div class="col-auto text-sm-end position-absolute end-0">
                          <template v-if="item.ReportList !== null">
                            <!-- {{ readReportUrl(item.ReportList[0].FileUrl, item.ExamCode, item.ReportList[0].FileName)  }} -->
                            <a v-if="item.ReportList.length > 1" class="btn btn-link link fw-bold" target="_blank" @click.prevent="openModal(item.ReportList)">看報告<i class="bi-chevron-right mx-2"></i></a>

                            <template v-else>

                              <template v-if="item.ReportList[0].FileUrl">
                                <a :href="item.ReportList[0].FileUrl" class="btn btn-link link fw-bold" target="_blank">看報告<i class="bi-chevron-right mx-2"></i></a>
                              </template>

                              <template v-else>
                                <button @click="SendExamReport" class="btn btn-link">
                                  看報告<i class="bi-chevron-right mx-2"></i>
                                  <!-- <template v-for="data in urlView">
                                      <a  v-if="data.ExamCode == item.ExamCode"  :href="data.text"  class="btn btn-link link fw-bold  pe-0 pe-lg-5" target="_blank">看報告<i class="bi-chevron-right mx-2"></i></a>

                                  </template>    -->
                                </button>

                              </template>


                            </template>


                          </template>
                          <!-- <template v-else>
                              <a  target="_blank" class="btn btn-link link fw-bold" @click="readReport(item.ExamCode, item.ReportList[0].FileName)">看報告<i class="bi-chevron-right mx-2"></i></a>

                          </template>
                           -->


                        </div>
                        <!-- End Col -->
                      </div>
                      <!-- End Row -->
                    </div>
                  </div>
                </a>
                <!-- End Card -->

              </div>
            </template>

            <div class="pt-3">
              <div class="alert alert-soft-primary d-flex flex-column flex-md-row align-items-center"
                   role="alert" style="padding-top: 24px;padding-bottom: 24px;">
                <div class="me-md-4 align-self-start align-self-md-center mb-3 mb-md-0"
                     style="font-weight: 900;color: #252525;font-size: 20px;">
                  預約健檢
                </div>
                <div class="align-self-start align-self-md-center"
                     style="color: #252525;font-size: 16px;">
                  <div class="d-flex flex-md-row flex-column">
                    <div>預約諮詢專線：</div>
                    <div>(03)283-1308、(03)283-1266</div>
                  </div>
                  <div>服務時間：週一至週五08:00-17:00</div>
                  <div class="text-indent">週六08:00-12:00(國定假日除外)</div>
                </div>
              </div>
            </div>



          </div>
        </div>
      </section>
    </main>
  </div>



  <!-- <Alert  :IsShow="finishAlert" :Title="messenger"/> -->
  <Model ref="modalRef" :list="ReportList" :ExamReport="urlView" />
  <Qcode ref="QcodeRef" :CodeName="codeName" @Refrush="sendUpdate" />

  <FailedAlert ref="Failedref" :IsShow="finishAlert" :Content="messenger" @Close="FailedClose" />
</template>

<script setup>
import {  onMounted, ref, watch, watchEffect } from 'vue';
import { useRoute } from 'vue-router';
import Qcode from '@/components/Qcode.vue';
import Model from '@/components/Model.vue';
import FailedAlert from '@/components/FailedAlert.vue';
import {  GetDefaultTab, GetReservationList, GetHistoryList, GetExamReport, GetExamSurvey, GetQrCode  } from '@/api/user';
import useDate from '@/utils/date.js';
// import useToken from '@/utils/useToken.js';
const { GetDateYYYYMMDD } = useDate();
const tableData = ref([]);
const tableHistory = ref([]);
const tabs = ref("current");
const isActiveHasCurrent =ref(true);
const isActiveHasHistory = ref(false);
const title = ref("");
const ReportList = ref([]);
const codeName =ref("");


//錯誤提示
const finishAlert = ref(false);
const messenger = ref("");
const Failedref = ref(null);


//彈跳視窗
const modalRef = ref(null);
const openModal = (val) => {
    ReportList.value = val;
  modalRef.value.myModal_show();
};


onMounted(()=>{
    if(tabs.value == "current"){
        title.value = "最新健檢行程";
        isActiveHasCurrent.value = true; 
        isActiveHasHistory.value =false; 
        GetReservationListApi();

    }else if(tabs.value == "History"){
        title.value = "歷史健檢行程";
        isActiveHasCurrent.value = false;
        isActiveHasHistory.value = true;
        GetHistoryListApi();
    }
});

watch(tabs, (value)=>{
    if(value == "current"){
        title.value = "最新健檢行程";
        isActiveHasCurrent.value = true; 
        isActiveHasHistory.value =false; 
        GetReservationListApi();

    }else if(value == "History"){
        title.value = "歷史健檢行程";
        isActiveHasCurrent.value = false;
        isActiveHasHistory.value = true;
        GetHistoryListApi();
    }

});


//取得預設停留頁籤
let paramApi = {};
GetDefaultTab(paramApi)
.then((res) => {
    const {  code, data  } = res;
 
    if(code === 0){
         if(data.HasCurrent && data.HasHistory){
            isActiveHasCurrent.value = true;//優先顯示最新
            title.value = "最新健檢行程";
         }else if(!data.HasCurrent  && data.HasHistory){
            isActiveHasHistory.value = true;//優先顯示歷史
            isActiveHasCurrent.value = false;
            title.value = "歷史健檢行程";
         }else{
            isActiveHasCurrent.value = true;//優先顯示最新
            title.value = "最新健檢行程";
         }

    }
   
});

//取得預約清單
const GetReservationListApi = ()=>{
    GetReservationList(paramApi)
    .then((res) => {
    const {  code, data, message  } = res;
        if(code === 0){     
            if(isActiveHasCurrent.value){
                tableData.value = data.sort((a, b) => new Date(b.ExamDate) - new Date(a.ExamDate));
            }
        }else{
            finishAlert.value = true;  //開啟錯誤提示          
                messenger.value = message; //錯誤提示文字內容
        }  

    });

}

//關掉錯誤提示
function FailedClose(val){
    finishAlert.value = val;
}


//取得問卷
const SendExamSurve = (ExamCode)=>{
  
    let paramSurvey = {
            "ExamCode": ExamCode,
            // "ExamCode": "",
        };
        GetExamSurvey(paramSurvey)
        .then((res) => {
            const {  code, data, message  } = res;
            console.log(paramSurvey, "paramSurvey");
            if(code == 0){              
                // window.location.href = data;
                window.open(data, '_blank');
                
            }else{               
                finishAlert.value = true;  //開啟錯誤提示          
                messenger.value = message; //錯誤提示文字內容
            }

        });
}



const reReportUrl = ref("");
const urlView = ref("");
let paramsReport = {
    "ExamCode": "",
    "FileName": ""
};

//取得歷史清單
const GetHistoryListApi = ()=>{
    GetHistoryList(paramApi)
.then((res) => {
    const {  code, data, message  } = res;
    if(code == 0){
        if(isActiveHasHistory){
            tableHistory.value = data.sort((a, b) => new Date(b.ExamDate) - new Date(a.ExamDate));
            tableHistory.value.forEach((val)=>{  
                console.log(val, val);
             
                //報告是否存在              
                     if(val.ReportList){
                        val.ReportList.forEach((item)=>{     
                                         
                            //連結是否為空
                            if(item.FileUrl){
                                urlView.value = [];
                                urlView.value.push(import.meta.env.VITE_API_ROOT+item.FileUrl);
                               
                            }else{
                                paramsReport = {
                                    "ExamCode": val.ExamCode,
                                    "FileName":item.FileName
                                };
                            
                                
                            }
                            
                        }); 
                    }

                

            });
          
        }
    }else{
        finishAlert.value = true;  //開啟錯誤提示
        messenger.value = message; //錯誤提示文字內容
    }
   
});

}

//看報告
const SendExamReport = ()=>{
    GetExamReport(paramsReport)
        .then((res) => { 
            const {  code, data, message  } = res;
                if(code == 0){                                   
                    window.open(import.meta.env.VITE_API_ROOT+data, '_blank');
                }else{
                    finishAlert.value = true;  //開啟錯誤提示
                    messenger.value = message; //錯誤提示文字內容
                }
            });
}

const collapseItem = (index, target)=>{
  if(target){
    return "#panelsStayOpen-"+index
  }else{
    return "panelsStayOpen-"+index
  }

}

const heading = (index, target)=>{
  if(target){
    return "#heading-"+index
  }else{
    return "heading-"+index
  }

}

//取得報到QrCode
// QrCode Api
const QrCodeApi = ()=>{
    let paramQrCode = {
            "PreQrCode": null,
        };
        GetQrCode(paramQrCode)
        .then((res) => {
            const {  code, data, message  } = res;

            if(code == 0){ 
                codeName.value = data;
                console.log(data, "data");
            }else{
                finishAlert.value = true;  //開啟錯誤提示
                messenger.value = message; //錯誤提示文字內容
            }
        })

}
//彈跳視窗
const QcodeRef = ref(null);
let count  = 0;
const openQcodeModal = (val) => {
    count++;
    QcodeRef.value.myModal_show();
    if(count <= 1 ){
        QrCodeApi();
       
    }

};

const openQcodeModalStatus = (val) => {
    if(val == 1){
        count++;
        QcodeRef.value.myModal_show();
        if(count <= 1 ){
        QrCodeApi();
       
    }

    }

};




//5秒鐘後emit 傳回來事件
function sendUpdate(){
    QrCodeApi();
}


</script>

<style lang="scss" scoped>
.img_noData{
    padding-top: 2rem;
    padding-bottom: 2rem;
}
</style>
