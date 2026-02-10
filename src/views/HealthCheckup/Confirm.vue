<template>


  <!-- Card -->
  <div class="card card-lg card-shadow form_card">

    <!-- Alert -->
    <div v-if="isDisabled" class="px-3 pt-3">
      <div class="alert alert-soft-success d-flex flex-column align-items-center" role="alert">
        <div style="font-weight: 900;">您已報到成功!</div>
        <div style="font-weight: 900;">若要修改資料，請洽尊爵健檢服務人員!</div>
      </div>
    </div>
    <!-- Alert -->
    <!-- Header -->
    <div class="card-header pt-4 pb-0 ps-3">
      <h1 class="card-title h3 text-dark mb-0">行前資料確認</h1>
      <!-- <p class="form-text m-0">加入此功能描述說明文字</p> -->
    </div>
    <!-- End Header -->
    <!-- Card Body -->
    <div class="d-grid gap-4 p-3">

      <!-- Form -->
      <form class="row form_row" @change="formChange">
        <!-- 身分證欄位 -->
        <div class="col-sm-6 mb-4 mb-sm-2">
          <label class="form-label" for="IdNo">身分證/居留證/護照號碼</label>
          <input type="text" class="form-control" name="IdNo" id="IdNo" aria-label="Id"
                 disabled v-model="formTableValue.IdNo">
        </div>
        <!-- 身分證欄位 -->
        <!-- 連絡電話欄位 -->
        <div class="col-sm-6 mb-4 mb-sm-2">
          <label class="form-label" for="Phone">連絡電話</label>
          <input type="text" class="form-control" name="Phone" id="Phone" aria-label="Phone" placeholder="(外縣市請加上區域碼，如：02-12345678)"
                 disabled v-model="formTableValue.Phone">
        </div>
        <!-- 連絡電話欄位 -->
        <!-- 戶籍地址欄位 -->
        <div class="d-grid mb-4 mb-sm-2">
          <label class="form-label" for="ResidenceAddress">戶籍地址</label>
          <div class="row">
            <div class="col-6 col-lg-2 mb-2">
              <select class="form-select" :disabled="isDisabled" @change="selectCity" id="ResidentCity" v-model="formTableValue.ResidentCity">
                <option selected="請選擇">{{ formTableValue.ResidentCity }}</option>
                <option v-for="item in cityTw" :key="item"  :value="item">{{ item }}</option>
              </select>
            </div>
            <div class="col-6 col-lg-2 mb-2">
              <select class="form-select" :disabled="isDisabled" v-model="formTableValue.ResidentArea">
                <option selected="請選擇">{{ formTableValue.ResidentArea }}</option>
                <option v-for="item in Area" :key="item" :value="item">{{ item }}</option>
              </select>
            </div>
            <div class="col-12 col-lg-8">
              <input type="text" class="form-control" name="Phone" id="Phone"
                     aria-label="Last name" :disabled="isDisabled" v-model="formTableValue.ResidentAddress">
            </div>
          </div>
        </div>
        <!-- 戶籍地址欄位 -->
        <!-- 通訊地址欄位 -->
        <div class="d-grid mb-4 mb-sm-2">
          <label class="form-label" for="ResidentAddress">通訊地址</label>
          <div class="form-check mb-2">
            <input class="form-check-input" type="checkbox" id="flexCheckChecked" v-model="registrationAddress"
                   :disabled="isDisabled" @change="changeCommunication">
            <label class="form-check-label" for="flexCheckChecked">
              同戶籍地址
            </label>
          </div>
          <div class="row">
            <div class="col-6 col-lg-2 mb-2">
              <select class="form-select" :disabled="isDisabled" @change="selectCity" id="CommunicationCity" v-model="formTableValue.CommunicationCity">
                <option selected>{{ formTableValue.CommunicationCity }}</option>
                <option v-for="item in cityTw" :key="item" :value="item">{{ item }}</option>

              </select>
            </div>
            <div class="col-6 col-lg-2 mb-2">
              <select class="form-select " :disabled="isDisabled" v-model="formTableValue.CommunicationArea">
                <option selected>{{ formTableValue.CommunicationArea }}</option>
                <option v-for="item in Area" :key="item"  :value="item">{{ item }}</option>

              </select>
            </div>
            <div class="col-12 col-lg-8">
              <input type="text" class="form-control" name="Phone" id="Phone"
                     aria-label="Last name" :disabled="isDisabled" v-model="formTableValue.CommunicationAddress">
            </div>
          </div>
        </div>
        <!-- 通訊地址欄位 -->
        <!-- 報告領取方式欄位 -->
        <div class="d-grid mb-4 mb-sm-2">
          <label class="form-label" for="ReportGetType">報告領取方式</label>
          <div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="collectionMethod" id="self" @change="selectReportGetType" v-model="formTableValue.ReportGetType"
                     value="1" :disabled="isDisabled">
              <label class="form-check-label" for="self">自取</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="collectionMethod" id="send" @change="selectReportGetType" v-model="formTableValue.ReportGetType"
                     value="2" checked :disabled="isDisabled">
              <label class="form-check-label" for="send">郵寄</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="collectionMethod" @change="selectReportGetType" v-model="formTableValue.ReportGetType"
                     id="entrust" value="3" :disabled="isDisabled">
              <label class="form-check-label" for="entrust">委託領取</label>
            </div>
          </div>
          <div v-show="formTableValue.ReportGetType == 3" class="row">
            <div class="col-12 col-lg-6 mb-2">
              <label class="form-label" for="AgentName">受託者姓名</label>
              <input type="text" class="form-control" id="AgentName" aria-label="受託者姓名" v-model="formTableValue.AgentName" :disabled="isDisabled">
            </div>
            <div class="col-12 col-lg-6 mb-2">
              <label class="form-label" for="AgentPhone">受託者電話</label>
              <input type="text" class="form-control" name="Phone" id="AgentPhone" aria-label="Phone" placeholder="(外縣市請加上區域碼，如：02-12345678)"
                     v-model="formTableValue.AgentPhone" :disabled="isDisabled">
            </div>

          </div>

        </div>
        <!-- 報告領取方式欄位 -->
        <!-- 郵寄地址 -->
        <div v-if="formTableValue.ReportGetType == 2" class="d-grid mb-4 mb-sm-2">
          <label class="form-label" for="mailingAddress">郵寄地址</label>
          <div>
            <div class="form-check form-check-inline">

              <input class="form-check-input" type="radio" name="mailResidentCity"
                     id="residenceAddress" value="1" :disabled="isDisabled" v-model="formTableValue.PostalOptions" @change="changemailingAddress">
              <label class="form-check-label" for="residenceAddress">同戶籍地址</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="mailCommunicationCity"
                     id="mailingAddress" value="2" checked :disabled="isDisabled" v-model="formTableValue.PostalOptions" @change="changemailingAddress">
              <label class="form-check-label" for="mailingAddress">同通訊地址</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="mailOther"
                     id="otherAddress" value="3" :disabled="isDisabled" v-model="formTableValue.PostalOptions" @change="changemailingAddress">
              <label class="form-check-label" for="otherAddress">另填</label>
            </div>
          </div>
          <div v-show="formTableValue.PostalOptions == '3'" class="row">
            <div class="col-6 col-lg-2 mb-2">
              <select class="form-select" :disabled="isDisabled" @change="selectCity" v-model="formTableValue.PostalCity">
                <option selected="請選擇">{{ formTableValue.PostalCity }}</option>
                <option v-for="item in cityTw" :key="item" :value="item">{{ item }}</option>

              </select>
            </div>
            <div class="col-6 col-lg-2 mb-2">
              <select class="form-select " :disabled="isDisabled" v-model="formTableValue.PostalArea">
                <option selected="請選擇">{{ formTableValue.PostalArea }}</option>
                <option v-for="item in Area"  :key="item"  :value="item">{{ item }}</option>
              </select>
            </div>
            <div class="col-12 col-lg-8">
              <input type="text" class="form-control" name="Phone" id="Phone" v-model="formTableValue.PostalAddress"
                     aria-label="Last name" :disabled="isDisabled">
            </div>
          </div>
        </div>
        <!-- 郵寄地址 -->
      </form>
      <!-- End Form -->
    </div>
  </div>
  <!-- End Card Body -->
  <!-- End Card -->


  <Teleport to="body">
    <!-- LS 浮動按鈕 -->
    <div class="sticky-bottom bg-white  d-flex justify-content-center align-items-center"
         style="box-shadow: 0px -3px 3px #eeeeee;">
      <template v-if="isDisabled">
        <router-link class="col-10 col-sm-4 btn-sm btn btn-primary" style="width: 300px;" :to="{ name: 'schedule'}">
          返回
        </router-link>
      </template>
      <template v-else>
        <button type="button" class="col-10 col-sm-4 btn-sm btn btn-primary" style="width: 300px;" @click.prevent="handleSubmit">
          確認
        </button>

      </template>
    </div>
  </Teleport>

  <Loading :IsShow="finishLoading" />
  <Alert :IsShow="finishAlert" Title="送出成功" />
  <FailedAlert ref="Failedref" :IsShow="FailedShow" :Content="messenger" @Close="FailedClose" />
</template>
<script setup>
import { computed, reactive, ref } from 'vue';
import { useRoute } from 'vue-router' 
import {  GetConfirmData, GetCities, SetConfirmData  } from '@/api/user';
import   cityTw   from '@/api/TWcity';
import FailedAlert from '@/components/FailedAlert.vue';
import Loading from '@/components/Loading.vue';
import Alert from '@/components/Alert.vue';



const finishLoading = ref(true);
const finishAlert = ref(false);
const FailedShow = ref(false);
const route = useRoute();
const formTable = reactive([]);
let formTableValue = ref({});

//錯誤提示
const messenger = ref("");
const Failedref = ref(null);


const isDisabled = computed(()=>{
    if(route.query.Status == 1){
         return false
    }else{
        return true
    }
});



const props = defineProps(
    {  
        ExamCode: {
        type: String,
        default: "" },
    });






//取得行前確認資料
const GetConfirmDataApi = ()=>{
    let paramApi = {
            "ExamCode": route.query.ExamCode
    };
GetConfirmData(paramApi)
.then((res) => {
    const {  code, data  } = res;
    if(code === 0){  
        // formTable.push(data);
        formTableValue.value = {
            ExamCode: route.query.ExamCode,//檢查碼
            Name: data.Name,//姓名
            IdNo: data.IdNo,//身分證字號
            Phone:data.Phone,//電話
            BirthDate:data.BirthDate,
            ResidentCity:data.ResidentCity,//戶籍地址-城市
            ResidentArea:data.ResidentArea,//戶籍地址-區域
            ResidentAddress:data.ResidentAddress,//戶籍地址-地址
            CommunicationCity:data.CommunicationCity,//通訊地址-城市
            CommunicationArea:data.CommunicationArea,//通訊地址-區域
            CommunicationAddress:data.CommunicationAddress,//通訊地址-地址
            ReportGetType:data.ReportGetType,//0:未定義 1:自取 2:郵寄 3:委託                  
            PostalCity:data.PostalCity,//報告郵寄地址-城市
            PostalArea:data.PostalArea,//報告郵寄地址-區域
            PostalAddress:data.PostalAddress,//報告郵寄地址
            PostalOptions:data.PostalOptions, //0:未定義 1:同戶籍地址 2:同通訊地址 3:另填
            AgentName:data.AgentName,//受託者姓名
            AgentPhone:data.AgentPhone,//受託者電話   
            Version:data.Version
        }

 


    }
   
});
}

GetConfirmDataApi();


//選擇城市.縣市
let city = ref("");
const Area = ref([]);
let param = {};
function selectCity(event) {
    // console.log(event.target.id);
    city.value = event.target.value;
    if(event.target.id == "ResidentCity"){
        formTableValue.value.ResidentArea = "";
    }else if(event.target.id == "CommunicationCity"){
        formTableValue.value.CommunicationArea = "";
    }
 


//取得縣市區域
GetCities(param)
    .then((res) => {
        const { code, data } = res;
        if (code == 0) {     
            Area.value = [];
            // console.log(data, "地址");

            let result = data.List.filter((item, index) => {                
                if (city.value == item.City) {
                    Area.value.push(item.Area);                    
                    // console.log(index, item.City, item.Area, "地址");
                    return true; 
                }
                return false; 
                 
            });
            // console.log(Area.value, "地址");
            return result;
        }
    });
}


//郵寄方式
const changemailingAddress = (val)=>{   

 //0:未定義 1:同戶籍地址 2:同通訊地址 3:另填   
if(val.target.value == 1){

    formTableValue.value.PostalOptions = 1;
    //同戶籍地址
    formTableValue.value.PostalCity = formTableValue.value.ResidentCity;
    formTableValue.value.PostalArea = formTableValue.value.ResidentArea;
    formTableValue.value.PostalAddress = formTableValue.value.ResidentAddress;     
}else if(val.target.value == 2){
    formTableValue.value.PostalOptions = 2;
    //同通訊地址
    formTableValue.value.PostalCity = formTableValue.value.CommunicationCity;
    formTableValue.value.PostalArea = formTableValue.value.CommunicationArea;
    formTableValue.value.PostalAddress = formTableValue.value.CommunicationAddress;   
}else if(val.target.value == 3){
    formTableValue.value.PostalOptions = 3;
    formTableValue.value.PostalCity = "";
    formTableValue.value.PostalArea = "";
    formTableValue.value.PostalAddress = "";   
    
}
}


//報告領取方式
const selectReportGetType = (val)=>{
    // console.log(val.target.value);
     //0:未定義 1:自取 2:郵寄 3:委託
    if(val.target.value == 1){
        formTableValue.value.ReportGetType = 1;
    }else if(val.target.value == 2){
        formTableValue.value.ReportGetType = 2;
    }else if(val.target.value == 3){
        formTableValue.value.ReportGetType = 3;
    }
}


// const formChange = (val)=>{
// console.log(val.target.name, "form");
// if(val.target.name == "Phone"){
//     formTableValue.value.Phone = "123";
// }
// }



//勾選-同戶籍地址
const registrationAddress = ref(false);
const changeCommunication = ()=>{
    if(registrationAddress.value){
        formTableValue.value.CommunicationCity = formTableValue.value.ResidentCity;
        formTableValue.value.CommunicationArea = formTableValue.value.ResidentArea;
        formTableValue.value.CommunicationAddress = formTableValue.value.ResidentAddress;        
    }
    
}

//關掉錯誤提示
function FailedClose(val){
    FailedShow.value = val;
}


//送出資料變更
const handleSubmit = () =>{

        const paramConfirmData = formTableValue.value;
        console.log(paramConfirmData);
        SetConfirmData(paramConfirmData)
        .then((res) => {
            const {  code, message } = res;
            // console.log(res, "成功");
            if(code == 0){
                finishLoading.value = false;                
                GetConfirmDataApi();
                finishAlert.value = true;
                setTimeout(()=>{
                    finishAlert.value = false;
                }, 1000);
            }else{
                FailedShow.value = true;  //開啟錯誤提示          
                messenger.value = message; //錯誤提示文字內容
            }
        })
        .finally(() => {
           
                finishLoading.value = true;
                
        
          
        });

}

</script>
