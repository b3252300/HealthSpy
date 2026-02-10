<template>
  <Loading :IsShow="finishLoading" />
  <FailedAlert ref="Failedref" :IsShow="finishAlert" :Content="messenger" @Close="FailedClose" />
  <div ref="offcanvasBottom" class="offcanvas offcanvas-bottom offcanvas_container" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasBottomLabel">最近五次的風險值</h5>

    </div>

    <div class="offcanvas-body">
      <div class="nav_bar">
        <div v-for="item in navList"
             :key="item.value"
             :class="['nav_bar_li', { active: currentTab === item.value }]"
             @click="currentTab = item.value">
          {{ item.label }}
        </div>
      </div>

      <div class="offcanvas_content">
        <div class="card-content-image">
          <div class="card-content-text">風險機率值</div>
          <LineChat v-if="currentTab && dataList[currentTab]"
                    :Date="dataList[currentTab].map(item => GetDateYYYYMMDD(item.ExamineDate))"
                    :Scale="dataList[currentTab].map(item => item.Value)">
          </LineChat>
        </div>
      </div>

      <button type="button"
              class="btn btn-outline-primaryblue"
              style="width:calc(100% - 40px);"
              data-bs-dismiss="offcanvas"
              aria-label="Close">
        返回
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue';
import { GetRiskHistory } from "@/api/Result";
import LineChat from "@/components/LineChat.vue";

  import Loading from "@/components/Loading.vue";
  import useDate from "@/utils/date.js";
  const { GetDateYYYYMMDD } = useDate();
const currentTab = ref(null); 
const dataList = ref({});
  const navList = ref([]);
  //錯誤提示
  import FailedAlert from "@/components/FailedAlert.vue";
  const finishAlert = ref(false);
  const messenger = ref("");
  const Failedref = ref(null);


  const finishLoading = ref(false);
  const fetchRiskHistory = () => {
    const params = {};
    GetRiskHistory(params)
      .then((res) => {
        const { code, data, message } = res;
        if (finishLoading.value) {
          finishLoading.value = false;
        }
        if (code === 0 && data) {
          dataList.value = data; 
          //dataList.value = {
          //  //糖尿病
          //  "Diabetes": [
          //    { "ExamineDate": "2025-02-14T00:00:00", "Value": 20 },
          //    { "ExamineDate": "2025-02-15T00:00:00", "Value": 1.2 },
          //    { "ExamineDate": "2025-02-03T00:00:00", "Value": 20 },
          //    { "ExamineDate": "2025-02-15T00:00:00", "Value": 100 },
          //  ],
          //  //高血壓
          //  "Hypertension": [
          //    { "ExamineDate": "2025-02-14T00:00:00", "Value": 1.3 },
          //    { "ExamineDate": "2025-02-15T00:00:00", "Value": 1.2 },
          //  ],
          //  //CAD
          //  "CAD": [
          //    { "ExamineDate": "2025-02-13T00:00:00", "Value": 0.15 },
          //  ],
          //  //腦中風
          //  "Stroke": [
          //    { "ExamineDate": "2025-02-17T00:00:00", "Value": 0.05 },
          //  ],
          //  //心血管不良事件
          //  "MACE": [
          //    { "ExamineDate": "2025-02-14T00:00:00", "Value": 0.3 },
          //    { "ExamineDate": "2025-02-15T00:00:00", "Value": 0.3 },
          //    { "ExamineDate": "2025-02-16T00:00:00", "Value": 0.3 },
          //    { "ExamineDate": "2025-02-19T00:00:00", "Value": 0.3 },
          //    { "ExamineDate": "2025-02-12T00:00:00", "Value": 10 },
          //  ]
          //};
          navList.value = Object.keys(dataList.value)
            .filter(key => Array.isArray(dataList.value[key]) && dataList.value[key].length > 0)
            .map(key => ({
              label: key === "Diabetes" ? "糖尿病" :
                key === "Hypertension" ? "高血壓" :
                  key === "CAD" ? "冠心病" :
                    key === "Stroke" ? "腦中風" :
                      key === "MACE" ? "心血管不良事件" : key,
              value: key
            }));

          console.log("navList:", navList.value); 

          if (navList.value.length > 0) {
            currentTab.value = navList.value[0].value; // 設定預設 tab
          }
        } else {
          finishAlert.value = true; //開啟錯誤提示
          messenger.value = message; //錯誤提示文字內容
        }
      })
      .finally(() => {
        finishLoading.value = true;
      });
  };

onMounted(fetchRiskHistory);
</script>





<style lang="scss" scoped>
  .offcanvas_container{
    text-align:center;
  }
  .offcanvas-title {
    font-size: 1rem;
    font-family: 'Noto Sans TC';
    color: #2D2D2D;
    font-weight:400;
  }
  .offcanvas, .offcanvas-lg, .offcanvas-md, .offcanvas-sm, .offcanvas-xl, .offcanvas-xxl {
    --bs-offcanvas-padding-x: 1.25rem;
    --bs-offcanvas-padding-y: 1.25rem;
    --bs-offcanvas-height: initial;
  }
  .offcanvas-header{
    padding-bottom:0;
  }
  .offcanvas-bottom {
    border-radius: 20px 20px 0 0;
  }

  .nav_bar {
    display: flex;
    white-space: nowrap;
    width: 100%;
    overflow-x: auto;
    overflow-y: hidden;

    &_li {
      padding: 8px 18px;
      font-weight: 500;
      font-family: 'Noto Sans TC';
      line-height: 1.4;
      font-size: 15px;
      min-width: 80px;
      height: 40px;

      &.active {
        border-bottom: solid #008CD6 2px;
      }
    }
  }
  .offcanvas_content {
    min-height: 146px;
    margin-top: 20px;
    margin-bottom: 13px;

    .card-content-image {
      position: relative;
    }

    canvas {
      width: 100% !important;
    }

    .card-content-text {
      font-size: 14px;
      width: 14px;
      font-weight: 400;
      line-height: 1.142;
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-68%);
    }
  }
  .offcanvas-body {
    padding-top: 0;
  }


</style>
