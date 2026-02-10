<template>

  <div class="card card-lg card-shadow">
    <main id="content" role="main">
      <!-- Content -->
      <section class="container p-3 pt-0 pb-0">
        <div class="mx-lg-auto">
          <div class="card-bod p-0">

            <div class="pt-3">
              <div v-if="route.query.Status == '1'" class="alert fw-bolder alert-soft-primary d-md-flex flex-md-column align-items-center justify-content-center"
                   role="alert">
                <div class="ItineraryOverviewAlert">
                  健檢當日，請您直接至「聯新國際醫院門診大樓地下一樓」聯新尊爵健康會館報到，諮詢專線:03-2831266
                </div>
              </div>
              <div v-else class="alert fw-bolder alert-soft-primary d-flex flex-md-row flex-column align-items-center justify-content-center"
                   role="alert">

                <div class="col-md-4 col-10">
                  目前還有 <span class="px-2" style="color: #eb4d3d;">{{ tableData.LastCount }} 項</span> 尚未檢查完成
                </div>
                <div class="d-flex align-items-center" style="color: #252525;">
                  <Timer ref="timerComp" />
                  <img src="@/assets/svg/refresh.svg" alt="更新" @click="refresh" style="cursor: pointer;" />
                </div>
              </div>
            </div>

            <div class="d-flex align-items-center justify-content-between mb-1">
              <div style="font-size: 24px;" class="fw-bolder">未完成項目</div>
              <div class="d-flex align-items-center">
                <div class="d-flex align-items-center mx-2">
                  <div style="background-color:#eb4d3d ;" class="m-2 icon_StatusCode">
                  </div>
                  <div>檢查中</div>
                </div>
                <div class="d-flex align-items-center">
                  <div style="background-color:#6cd1c6;" class="m-2 icon_StatusCode">
                  </div>
                  <div>待檢查</div>
                </div>
              </div>
            </div>
            <div v-if="tableData == null" class="d-flex flex-column justify-content-center align-items-center m-3 noData_container">
              <img src="@/assets/svg/searchNoData.svg" alt="您目前沒有預約紀錄" class="img_noData">
              <div class="mt-3">您目前沒有資料</div>
            </div>
            <!-- Table -->
            <table v-else class="table table-align-middle mb-3">
              <thead class="thead-light ">
                <tr>
                  <th scope="col" class="p-2 fw-bolder">站別</th>
                  <th scope="col" class="p-2 fw-bolder">檢查項目</th>
                </tr>
              </thead>
              <tbody v-for="item in tableData.Items" :key="item.Name">
                <tr v-if="item.StatusCode !== 3">
                  <th scope="row" class="p-2 fw-bolder">
                    <div class="d-flex">
                      <div :style="{ 'background-color': Status(item.StatusCode) }" class="m-2 icon_StatusCode"></div>
                      <div>{{item.StationName}}</div>
                    </div>
                  </th>
                  <td class="p-2">


                    <div v-if="item.SurveyType == 0">{{item.Name}}</div>
                    <!-- <a v-else href="#"  @click.prevent="SendExamSurve(item.SurveyType)" target="_blank">{{item.Name}}</a> -->
                    <button type="button" class="btn btn-link p-0" v-else @click="SendExamSurve(item.SurveyType)">{{item.Name}}</button>

                  </td>
                </tr>

              </tbody>
            </table>


            <!-- End Table -->
            <div v-if="DoneTableData.length !== 0" class="d-flex align-items-center justify-content-between">
              <div style="font-size: 24px;" class="fw-bolder">完成項目</div>
            </div>
            <table v-if="DoneTableData.length !== 0" class="table table-align-middle mb-3">
              <thead class="thead-light ">
                <tr>
                  <th scope="col" class="p-2 fw-bolder">站別</th>
                  <th scope="col" class="p-2 fw-bolder">檢查項目</th>
                </tr>
              </thead>
              <tbody v-for="item in DoneTableData" :key="item.StationName">
                <tr>
                  <th scope="row" class="p-2 fw-bolder">
                    <div class="d-flex">
                      <div>{{item.StationName}}</div>
                    </div>
                  </th>
                  <td class="p-2">
                    <div>{{item.Name}}</div>
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      </section>
    </main>

  </div>

  <Loading :IsShow="finishLoading" />
  <FailedAlert ref="Failedref" :IsShow="finishAlert" :Content="messenger" @Close="FailedClose" />
  <!-- <Qcode ref="QcodeRef" :CodeName="codeName" @Refrush="sendUpdate"/> -->
</template>
<script setup>
import { computed,  onMounted,  ref } from 'vue';
import Qcode from '@/components/Qcode.vue';
import { useRoute } from 'vue-router' 
import Timer from '@/components/Timer.vue';
import {  GetExamCheckItem, GetExamSurvey  } from '@/api/user';
import Loading from '@/components/Loading.vue';
const finishLoading = ref(true);
const route = useRoute();
const tableData = ref([]);
const DoneTableData  = ref([]);
const timerComp = ref(null);
const codeName =ref("");
const QcodeRef = ref(null);

//錯誤提示
const finishAlert = ref(false);
const messenger = ref("");
const Failedref = ref(null);


// onMounted(()=>{
   
//     if(route.query.Status == 1){
//         QcodeRef.value.myModal_show();
//     }
 
// });

const Status = (statusCode) => {
  // 狀態代碼 0:未定義 1:檢查中 2:待檢查 3:已完成
  if (statusCode === 1) {
    return "#EB4D3D";
  } else if (statusCode === 2) {
    return "#6CD1C6";
  } else {
    return ""; // 預設顏色，如果未定義狀態代碼
  }
};




//關掉錯誤提示
function FailedClose(val){
    finishAlert.value = val;
}

//取得問卷
const SendExamSurve = (code)=>{
    let paramSurvey = {
            "ExamCode": route.query.ExamCode,
            "SurveyType":code,
        };
        GetExamSurvey(paramSurvey)
        .then((res) => {
            const {  code, data, message  } = res;
            if(code == 0){ 
                // window.location.href = data;
               
                // reportUrl.value ="";
                // reportUrl.value = data;
                 // window.open(data, '_blank');
                 window.open(data, '_blank');
                 console.log(data, "問券");
            
            }else{
                finishAlert.value = true;  //開啟錯誤提示
                messenger.value = message; //錯誤提示文字內容
            }

        });
}


//取得行程總覽
const GetExamCheckItemApi = ()=>{
    let paramApi = {
            "ExamCode": route.query.ExamCode
    };

GetExamCheckItem(paramApi)
.then((res) => {
    const {  code, data, message  } = res;
    if(code === 0){ 
        tableData.value = data;
      
        // data.Items.forEach((col)=>{
        //     // console.log(col.SurveyType, "SurveyType");
        //     SendExamSurve(col.SurveyType);
        
          
        // });


        //過濾已報到
        DoneTableData.value = data.Items.filter((item)=>{
            if(item.StatusCode == 3){
                return item;           
            }            
        });
        finishLoading.value = false;
     }else{
        finishAlert.value = true;  //開啟錯誤提示
        messenger.value = message; //錯誤提示文字內容
     }
}).finally(() => {           
   finishLoading.value = true;
});

}

GetExamCheckItemApi();



const refresh = () => {
    finishLoading.value = false;
    GetExamCheckItemApi();
    timerComp.value.refresh();
};
</script>
<style lang="scss" scoped>
.icon_StatusCode{
    width: 8px ;
    height: 8px;
    border-radius: 50%;
}



</style>
