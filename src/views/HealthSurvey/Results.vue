<template>
  <Loading :IsShow="finishLoading" />
  <FailedAlert ref="Failedref" :IsShow="finishAlert" :Content="messenger" @Close="FailedClose" />

  <div class="bg_HealthSurvey_color">
    <Card>
      <template #title>
        健康評估結果
      </template>
      <template #EvaluateDatetime>
        評估時間：{{ EvaluateDatetime }}
      </template>

      <div id="chart" style="margin-bottom: 10px; min-height: 350px;">
        <apexchart v-if="renderChart"
                   ref="chartRef"
                   type="polarArea"
                   height="350"
                   :options="chartOptions"
                   :series="ChartScoreList"></apexchart>
      </div>

      <div v-if="HealthLevel == null"></div>

      <div v-else-if="HealthLevel === 2"
           class="alert d-flex flex-md-row justify-content-center align-items-center text-bold health-card"
           role="alert"
           style="background-color: #fff8e4; border: 1px solid #ffeeba; color: #856404;">
        <img src="@/assets/svg/face_orange.svg"
             alt="亞健康"
             class="img_SubHealth"
             style="width: 36px; height: 36px; margin-right: 20px" />
        <div>
          <span style="font-size: 1.2rem;">健康分數 {{ HealthScore }} 分</span>
          <div style="font-size: 0.9rem; font-weight: normal;">您的狀態：亞健康，請多加留意</div>
        </div>
      </div>

      <div v-else-if="HealthLevel === 3"
           class="alert d-flex flex-md-row justify-content-center align-items-center text-bold health-card"
           role="alert"
           style="background-color: #e3ffe2; border: 1px solid #b7ebb5; color: #2e5c2b;">
        <img src="@/assets/svg/face_green.svg"
             alt="健康"
             class="img_Health"
             style="width: 36px; height: 36px; margin-right: 20px" />
        <div>
          <span style="font-size: 1.2rem;">健康分數 {{ HealthScore }} 分</span>
          <div style="font-size: 0.9rem; font-weight: normal;">您的狀態：良好，請繼續保持</div>
        </div>
      </div>

      <div v-else
           class="alert d-flex flex-md-row justify-content-center align-items-center text-bold health-card"
           role="alert"
           style="background-color: #ffecec; border: 1px solid #f5c6cb; color: #721c24;">
        <img src="@/assets/svg/face_red.svg"
             alt="需改善"
             class="img_Health"
             style="width: 36px; height: 36px; margin-right: 20px" />
        <div>
           <span style="font-size: 1.2rem;">健康分數 {{ HealthScore }} 分</span>
           <div style="font-size: 0.9rem; font-weight: normal;">您的狀態：需改善，建議諮詢專家</div>
        </div>
      </div>

      <div style="line-height: 21px; font-size: 15px; margin-top: 20px;">
        <div v-html="Description" style="line-height: 21px; margin-bottom: 15px;"></div>

        <div style="font-weight: bold; margin-bottom: 10px;">透過專業雷達圖分析，您可以清楚掌握身體五大系統的功能狀態：</div>

        <div class="pt-3">
          <div class="d-flex flex-md-row align-items-center text-bold description-card"
               style="background-color: #e3ffe2; color: #2e5c2b;">
            <div class="dot" style="background-color: #4FCA61; margin-right: 10px"></div>
            繼續保持良好狀態 (4.0 - 5.0分)
          </div>
          <div class="d-flex flex-md-row align-items-center text-bold description-card"
               style="background-color: #fff8e4; color: #856404;">
            <div class="dot" style="background-color: #F2AC1F; margin-right: 10px"></div>
            需要留意的系統 (3.0 - 3.9分)
          </div>
          <div class="d-flex flex-md-row align-items-center text-bold description-card"
               style="background-color: #ffecec; color: #721c24;">
            <div class="dot" style="background-color: #E44F4F; margin-right: 10px"></div>
            功能較弱的系統 (3.0分以下)
          </div>
        </div>
      </div>

      <div v-if="HealthLevel == 3" style="line-height: 18.8px; font-size: 15px; margin-top: 20px">
         <div style="color: #008cd6; font-weight: 600">恭喜您！</div>
         <div>您的健康狀況維持得相當不錯，歡迎定期回來檢測以追蹤健康趨勢。</div>
      </div>
      <div v-else style="line-height: 18.8px; font-size: 15px; margin-top: 20px">
        <div style="color: #008cd6; font-weight: 600">想知道如何改善亞健康狀態？</div>
        <div>歡迎於LINE@對話框諮詢健康特務，量身打造您的專屬保健方案，讓您重拾活力！</div>
      </div>

      <div class="d-grid" style="margin-top: 20px">
        <button type="button" class="btn btn-spy" @click="HandleRetest">再測一次</button>
      </div>
    </Card>
  </div>
</template>

<script setup>
import { ref, onMounted, reactive } from "vue";
import { useRouter } from "vue-router";
import Loading from "@/components/Loading.vue";
import Card from "@/components/Card.vue";
import FailedAlert from "@/components/FailedAlert.vue";
import apexchart from "vue3-apexcharts";

const router = useRouter();

// 狀態變數
const finishLoading = ref(false); // 載入中
const finishAlert = ref(false);
const messenger = ref("");
const Failedref = ref(null);
const renderChart = ref(false); // 控制圖表渲染時機

// 資料變數
const EvaluateDatetime = ref(null);
const ChartScoreList = ref([0, 0, 0, 0, 0]); // 預設值
const ChartRankList = ref([1, 1, 1, 1, 1]);  // 1:紅, 2:橘, 3:綠
const Description = ref("");
const HealthScore = ref(0);
const HealthLevel = ref(null); // 1:差, 2:中, 3:好

// 圖表設定
const chartOptions = ref({
  chart: {
    type: "polarArea",
    toolbar: { show: false }
  },
  stroke: {
    colors: ["#fff"],
  },
  fill: {
    opacity: 0.9
  },
  // 動態顏色邏輯：根據 ChartRankList 決定顏色
  colors: [
    function ({ value, seriesIndex, w }) {
      // 注意：ApexCharts 初始化時可能數據還沒好，做個防呆
      if (ChartRankList.value && ChartRankList.value.length > seriesIndex) {
        let level = ChartRankList.value[seriesIndex];
        if (level == 1) return "#E44F4F"; // 紅 (差)
        if (level == 2) return "#F2AC1F"; // 橘 (中)
        if (level == 3) return "#4FCA61"; // 綠 (好)
      }
      return "#E6E6E6";
    },
  ],
  dataLabels: {
    enabled: true,
    style: {
        fontSize: '14px',
        fontWeight: 'bold',
        colors: ['#333']
    },
    formatter: function (val, { seriesIndex, w }) {
      // 顯示格式： 系統名: 分數
      return w.config.labels[seriesIndex] + ": " + val;
    },
  },
  labels: ["能量系統", "心血管系統", "消化系統", "免疫系統", "心理系統"],
  legend: {
    show: true,
    position: 'bottom'
  },
  yaxis: {
    show: false, // polarArea 通常隱藏 y 軸比較好看
    min: 0,
    max: 5,
  },
  tooltip: {
    enabled: true,
    y: {
        formatter: function(val) {
            return val + " 分";
        }
    }
  },
  plotOptions: {
      polarArea: {
          rings: {
              strokeWidth: 1,
              strokeColor: '#e8e8e8'
          },
          spokes: {
              strokeWidth: 1,
              connectorColors: '#e8e8e8'
          }
      }
  }
});

// 關閉錯誤提示
function FailedClose(val) {
  finishAlert.value = val;
}

// 獲取當前時間字串
const getCurrentTime = () => {
    const now = new Date();
    return `${now.getFullYear()}-${(now.getMonth()+1).toString().padStart(2,'0')}-${now.getDate().toString().padStart(2,'0')} ${now.getHours().toString().padStart(2,'0')}:${now.getMinutes().toString().padStart(2,'0')}`;
}

// 模擬計算邏輯
const calculateMockResults = () => {
    const storedData = sessionStorage.getItem("SurveyResult");

    if (!storedData) {
        finishLoading.value = true;
        messenger.value = "查無檢測資料，請重新填寫";
        finishAlert.value = true;
        setTimeout(() => router.push({ name: "HealthSurveyQuestionnaire" }), 2000);
        return;
    }

    const parsedData = JSON.parse(storedData);
    const ans = parsedData.answers; // {0: 3, 1: 5, ...}

    // 防呆：如果答案不完整
    if(!ans) return;

    // 定義題目對應到哪個系統 (0-based index)
    // 假設問卷有10題，每兩題對應一個系統
    // Q1(0), Q4(3) -> 能量 (Energy)
    // Q2(1), Q6(5) -> 心血管 (Cardio)
    // Q3(2), Q8(7) -> 消化 (Digestive)
    // Q5(4), Q10(9)-> 免疫 (Immune)
    // Q7(6), Q9(8) -> 心理 (Mental)

    // 計算平均分 (1-5分)
    const getScore = (idx1, idx2) => {
        let val1 = ans[idx1] ? parseInt(ans[idx1]) : 0;
        let val2 = ans[idx2] ? parseInt(ans[idx2]) : 0;
        return parseFloat(((val1 + val2) / 2).toFixed(1));
    };

    const energyScore = getScore(0, 3);
    const cardioScore = getScore(1, 5);
    const digestiveScore = getScore(2, 7);
    const immuneScore = getScore(4, 9);
    const mentalScore = getScore(6, 8);

    // 更新圖表數據
    ChartScoreList.value = [energyScore, cardioScore, digestiveScore, immuneScore, mentalScore];

    // 計算等級 Rank (1:差(<3), 2:中(3-3.9), 3:好(>=4))
    const getRank = (score) => {
        if (score >= 4) return 3;
        if (score >= 3) return 2;
        return 1;
    };

    ChartRankList.value = ChartScoreList.value.map(s => getRank(s));

    // 計算總分 (滿分100)
    // 5個系統平均分(最高5) * 20 = 100
    const avgScore = (energyScore + cardioScore + digestiveScore + immuneScore + mentalScore) / 5;
    HealthScore.value = Math.round(avgScore * 20);

    // 決定總體健康等級
    if (HealthScore.value >= 80) HealthLevel.value = 3;      // 綠
    else if (HealthScore.value >= 60) HealthLevel.value = 2; // 橘
    else HealthLevel.value = 1;                              // 紅

    // 生成描述文字
    let weakSystems = [];
    if (getRank(energyScore) < 3) weakSystems.push("能量系統");
    if (getRank(cardioScore) < 3) weakSystems.push("心血管系統");
    if (getRank(digestiveScore) < 3) weakSystems.push("消化系統");
    if (getRank(mentalScore) < 3) weakSystems.push("心理系統");
    if (getRank(immuneScore) < 3) weakSystems.push("免疫系統");

    if (HealthLevel.value === 3) {
        Description.value = "您的身體狀況運作良好，各大系統功能平衡，請繼續保持健康的生活習慣！";
    } else {
        Description.value = `檢測顯示您的<b>${weakSystems.join("、")}</b>指數稍低。建議您調整作息與飲食，並適度補充相關營養素。`;
    }

    EvaluateDatetime.value = getCurrentTime();

    // 資料準備好後，顯示 Loading 結束並渲染圖表
    renderChart.value = true;
    finishLoading.value = true;
};

const HandleRetest = () => {
  router.push({ name: "HealthSurveyQuestionnaire" }); // 確保路由名稱正確
};

onMounted(() => {
    // 模擬網路延遲
    setTimeout(() => {
        calculateMockResults();
    }, 500);
});
</script>

<style scoped>

.health-card {
    border-radius: 12px;
    padding: 15px;
    margin-bottom: 20px;
}
.description-card {
    border-radius: 8px;
    padding: 10px;
    margin-bottom: 8px;
    font-size: 14px;
}
.dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    display: inline-block;
}
.btn-spy {
    background-color: #333;
    color: #fff;
    padding: 10px;
    border: none;
    border-radius: 5px;
}
</style>
