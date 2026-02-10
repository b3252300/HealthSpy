<template>
  <div ref="offcanvasBottom" class="offcanvas offcanvas-bottom offcanvas_container" tabindex="-1" id="offcanvasBottom" aria-labelledby="offcanvasBottomLabel">
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="offcanvasBottomLabel">最近五次的風險值</h5>    {{currentTab }}

    </div>

    <div class="offcanvas-body">
      <div class="nav_bar">
        <div v-for="item in navList"
             :key="item.value"
             :class="['nav_bar_li', { active: currentTab === item.value }]"
             @click="changeNav(item.value)">
          {{ item.label }}
        </div>
      </div>
      <div class="offcanvas_content">
        <div class="card-content-image">
          <div class="card-content-text">風險機率值</div>
          <canvas ref="chartRef" style="width:100%"></canvas>
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
import Chart from "chart.js/auto";
import { GetRiskHistory } from "@/api/Result";
import useDate from "@/utils/date.js";

const { GetDateYYYYMMDD } = useDate();
const chartRef = ref(null);
const offcanvasBottom = ref(null);
const currentTab = ref(null); // 設定初始值
    let dataList = reactive([]);

const navList = ref([]);
const dataObj = reactive({
  labels: [],
  datasets: [{
    data: [],
    borderColor: '#057AFF',
    backgroundColor: 'rgba(5, 122, 255, 0.4)',
    pointStyle: 'circle',
    borderWidth: 1,
    pointRadius: 4,
    pointHoverRadius: 4,
    height: 146,
  }]
});

let chartInstance = null;

const changeNav = (navName) => {
  currentTab.value = navName;
  getRiskHistoryApi(navName);
};

    const updateChartData = (navName) => {
      dataObj.labels = [];
      dataObj.datasets[0].data = [];

      if (dataList[navName] && Array.isArray(dataList[navName])) {
        dataList[navName].forEach((item) => {
          dataObj.labels.push(GetDateYYYYMMDD(item.ExamineDate));
          dataObj.datasets[0].data.push(item.Value);
        });
        createLineChart(dataObj);
      } else if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
      }
    };


const getRiskHistoryApi = (navName) => {
  const params = {};
  GetRiskHistory(params)
    .then((res) => {
      const { code, data } = res;
      
      if (code === 0) {
        //dataObj.labels = [];
        //dataObj.datasets[0].data = [];      
        //dataList = data;
        dataList = {
          //糖尿病
          "Diabetes": [
            { "ExamineDate": "2025-02-14T00:00:00", "Value": 20 },
            { "ExamineDate": "2025-02-15T00:00:00", "Value": 1.2 },
            { "ExamineDate": "2025-02-03T00:00:00", "Value": 20 },
            { "ExamineDate": "2025-02-15T00:00:00", "Value": 100 },
          ],
          //高血壓
          "Hypertension": [
            { "ExamineDate": "2025-02-14T00:00:00", "Value": 1.3 },
            { "ExamineDate": "2025-02-15T00:00:00", "Value": 1.2 },
          ],
          //CAD
          "CAD": [
            { "ExamineDate": "2025-02-13T00:00:00", "Value": 0.15 },
          ],
          //腦中風
          "Stroke": [
            { "ExamineDate": "2025-02-17T00:00:00", "Value": 0.05 },
          ],
          //心血管不良事件
          "MACE": [
            { "ExamineDate": "2025-02-14T00:00:00", "Value": 0.3 },
            { "ExamineDate": "2025-02-15T00:00:00", "Value": 0.3 },
            { "ExamineDate": "2025-02-16T00:00:00", "Value": 0.3 },
            { "ExamineDate": "2025-02-19T00:00:00", "Value": 0.3 },
            { "ExamineDate": "2025-02-12T00:00:00", "Value": 10 },
          ]
        };
        navList.value = [];
        Object.entries(dataList).forEach(([key, value]) => {
          if (value && Array.isArray(value) && value.length > 0) {
            if (key === "Diabetes") {
              navList.value.push({ label: "糖尿病", value: key });
              currentTab.value = "Diabetes";
              updateChartData("Diabetes");
            } else if (key === "Hypertension") {
              navList.value.push({ label: "高血壓", value: key });
              currentTab.value = "Hypertension";
              updateChartData("Hypertension");
            } else if (key === "CAD") {
              navList.value.push({ label: "冠心病", value: key });
              currentTab.value = "CAD";
              updateChartData(currentTab.value);
            } else if (key === "Stroke") {
              navList.value.push({ label: "腦中風", value: key });
              currentTab.value = "Stroke";
              updateChartData(currentTab.value);
            } else if (key === "MACE") {
              navList.value.push({ label: "心血管不良事件", value: key });
              currentTab.value = "MACE";
              updateChartData(currentTab.value);
            }
            // Add other conditions as needed
            // else if (key === "OtherCondition") {
            //   navList.value.push({ label: "其他疾病", value: key });
            // }
          }
        });
        currentTab.value = navName;
        if (currentTab.value) {
          updateChartData(currentTab.value);
        }
      
        //if (dataList[navName]) {
        //  dataList[navName].forEach((item) => {
            
        //    dataObj.labels.push(GetDateYYYYMMDD(item.ExamineDate));
        //    dataObj.datasets[0].data.push(item.Value);
        //  });
        //  createLineChart(dataObj);
        //}
      }
    })
    .catch((error) => {
      console.error('Error fetching risk history:', error);
    });
};

const createLineChart = (dataObj) => {
  if (!chartRef.value) return;

  if (chartInstance) {
    chartInstance.destroy();
  }

  const ctx = chartRef.value.getContext('2d');
  chartInstance = new Chart(ctx, {
    type: "line",
    data: dataObj,
    options: {
      responsive: true,
      scales: {
        x: {
          ticks: {
            align: "center",
            font: {
              size: 11,
              weight: 400,
              family: "Noto Sans TC"
            },
            color: "#969696",
            padding: 8,
            maxRotation: 0,
            minRotation: 0
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: '',
            rotation: -90,
          },
          ticks: {
            font: {
              size: 11,
              weight: 500,
              family: "Noto Sans TC"
            },
            color: "#2D2D2D"
          },
          suggestedMin: 0,
          suggestedMax: 100
        }
      },
      plugins: {
        legend: { display: false },
        title: { display: false }
      }
    }
  });
};


onMounted(() => {
      getRiskHistoryApi();
});
</script>




<style lang="scss" scoped>
  .offcanvas_container{
    text-align:center;
  }
  .offcanvas-title {
    font-size: 1rem;
    font-family: 'Noto Sans TC';
    color: #2D2D2D;
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
      padding: 9px 18px;
      font-weight: 400;
      font-family: 'Noto Sans TC';

      &.active {
        border-bottom: solid #008CD6 2px;
      }
    }
  }
  .offcanvas_content {
    min-height: 146px;
    margin-top: 20px;
    margin-bottom: 20px;

    .card-content-image {
      position: relative;
    }

    canvas {
      width: 100% !important;
    }

    .card-content-text {
      font-size: 14px;
      width: 14px;
      font-weight:400;
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
