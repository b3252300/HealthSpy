<template>
  <Loading :IsShow="finishLoading" />
  <FailedAlert ref="Failedref" :IsShow="finishAlert" :Content="messenger" @Close="FailedClose" />
  <div class="bg_HealthSurvey_color">


    <Card>

      <template #title>
        {{ $route.meta.title }}
      </template>
      <template #EvaluateDatetime>
        {{ EvaluateDatetime }}
      </template>
      <div class="container-riskCard">
        <div v-for="(item, key) in riskData" :key="key" class="riskCard">

          <template v-if="item !== null">
            <div class="RiskLevel" v-if="item?.label">{{ item.label }}</div>
            <div class="bar_content">
              <progress :class="['progress_class', labelColor(item?.Risk)]" :max="100" :value="item?.Risk" />
              <span class="bar_content-text">{{ item?.Risk }}%</span>
            </div>
            <Rate style="margin-top:10px" v-if="item?.PopulationAvg !== null" :ratingsNum="item?.PopulationAvg"></Rate>
          </template>
        </div>

      </div>

      <button class="btn btn-outline-primaryblue" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasBottom" aria-controls="offcanvasBottom" @click="historyBtn">歷史數據</button>


    </Card>
    <OffcanvasBottom />
  </div>

</template>

<script setup>
  import { ref, reactive, computed, onMounted } from "vue";

  import Loading from "@/components/Loading.vue";
  import Card from "@/components/Card.vue";
  import OffcanvasBottom from "@/components/OffcanvasBottom.vue";
  import Rate from "@/components/Rate.vue";
  import router from '@/router'
  import { GetAllRisk } from "@/api/Result";
  const finishLoading = ref(false);
  import { useRouter } from "vue-router";


  //錯誤提示
  import FailedAlert from "@/components/FailedAlert.vue";
  const finishAlert = ref(false);
  const messenger = ref("");
  const Failedref = ref(null);


  import useDate from "@/utils/date.js";
  const { GetDateYYYYMMDD } = useDate();

  const riskLabels = {
    Diabetes: "糖尿病",
    Hypertension: "高血壓",
    CAD: "冠心病",
    Stroke: "腦中風",
    MACE: "心血管不良事件",
  };
  const EvaluateDatetime = ref("2025-02-15T00:00:00");
  const RiskValue = ref(null);
  const PopulationAvgValue = ref(null);
  let data = ref([]);
  // let List = ref([]);

  let List = {
   "data": {
     "LastUpdateDateTime": "2025-02-15T00:00:00",
     "Diabetes":null,
     "Hypertension": {
       "RiskLevel": null,
       "Risk": 11,
       "PopulationAvg": 33
     },
     "CAD": {
       "RiskLevel": 3,
       "Risk": null,
       "PopulationAvg": null
     },
     "Stroke": {
       "RiskLevel": 1,
       "Risk": 25,
       "PopulationAvg": 55
     },
     "MACE": {
       "RiskLevel": 2,
       "Risk": 90,
       "PopulationAvg": 31
     },
     "RiskDescription": 3
   },
   "statusCode": 200,
   "code": 0,
   "message": ""
  }

  function labelColor(item) {
    if (item >= 75) {
      return "RiskLevel_3"
    } else if (item >= 50) {
      return "RiskLevel_2"
    }else if (item <= 25) {
      return "RiskLevel_1"
    }
  }

onMounted(()=>{
EvaluateDatetime.value = GetDateYYYYMMDD(EvaluateDatetime.value);
finishAlert.value = true; //開啟錯誤提示


});


  // let params = {};
  // GetAllRisk(params).then((res)=>{
  //   const { code, message, data } = res;
  //   if (finishLoading.value) {
  //     finishLoading.value = false;
  //   }
  //   if (code == 0) {
  //     EvaluateDatetime.value = GetDateYYYYMMDD(data.LastUpdateDateTime);
  //     List.value = data;

  //   } else {
  //     finishAlert.value = true; //開啟錯誤提示
  //     messenger.value = message; //錯誤提示文字內容
  //   }


  // }).finally(() => {
  //   finishLoading.value = true;
  // });



  const riskData = computed(() => {
    if (!List.value) return []; // 避免 List.value 為 undefined 時報錯

    const { Diabetes, Hypertension, CAD, Stroke, MACE } = List.value || {};

    const Data = [];
    if (Diabetes) {
      Diabetes.label = "糖尿病";
      Data.push(Diabetes);
    }
    if (Hypertension) {
      Hypertension.label = "高血壓";
      Data.push(Hypertension);
    }
    if (CAD) {
      CAD.label = "冠心病";
      Data.push(CAD);
    }
    if (Stroke) {
      Stroke.label = "腦中風";
      Data.push(Stroke);
    }
    if (MACE) {
      MACE.label = "心血管不良事件";
      Data.push(MACE);
    }

    return Data;
  });

</script>

<style lang="scss" scoped>
  .container-riskCard {
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    row-gap: 20px;
  }
  .RiskLevel {
    font-size: 16px;
    font-weight: 400;
    line-height: 1.4;
  }
  .bar_content {
    display: flex;
    align-items: center;
    gap: 10px;
    width: 100%;
  }

  .progress_class {
    max-width: 575px;
    width:100%;
    height: 8px;
    // 外部圆角
    overflow: hidden;
    border-radius: 8px 8px 8px 8px;
    /*设置iOS下清除灰色背景*/
    appearance: none;
    -webkit-appearance: none;
  }

  // 進度條的進度样式
  .progress_class {
    /*///*    //&::-webkit-progress-value {
    //  background: transparent;
    //}*/
    &.RiskLevel_1 {
      &::-webkit-progress-value {
        background: linear-gradient(90deg, #4FCA61 0%, #4FCA61 100%);
        }
      }

      &.RiskLevel_2 {
        &::-webkit-progress-value {
          background: linear-gradient(90deg, #4FCA61 0%, #F2AC1F 100%);
          border-radius: 8px; // 内部的圓角
        }
      }

      &.RiskLevel_3 {
        &::-webkit-progress-value {
          background: linear-gradient(90deg, #4FCA61 0%, #F2AC1F 50%, #E44F4F 100%);
          border-radius: 8px; // 内部的圓角
        }
      }
    }
    // 進度條未達到部分
    .progress_class::-webkit-progress-bar {
      background-color: #E3E7EA; // 進度條未進度 部分
    }

  .bar_content-text {
    font-size: 16px;
    font-weight: 500;
    line-height: 1.375;
    font-family: "Noto Sans TC";
  }
</style>
