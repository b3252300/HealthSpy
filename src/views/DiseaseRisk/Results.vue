<template>
  <Loading :IsShow="finishLoading" />
  <FailedAlert ref="Failedref" :IsShow="finishAlert" :Content="messenger" @Close="FailedClose" />
  <div class="bg_DiseaseRisk_color">
    <Card>

      <template #title>
        {{ $route.meta.title }}
      </template>
      <template #EvaluateDatetime>
        {{ EvaluateDatetime }}
      </template>

      <div v-if="RiskLevel == null"></div>
      <div v-else-if="RiskLevel == 1"
           class="alert d-flex flex-md-row justify-content-center align-items-center text-bold health-card"
           role="alert"
           style="background-color: #e3ffe2">
        <img src="@/assets/svg/face_green.svg"
             alt="低風險"
             class="img_Low"
             style="width: 36px; height: 36px; margin-right: 20px" />糖尿病低風險
      </div>
      <div v-else-if="RiskLevel == 2"
           class="alert d-flex flex-md-row justify-content-center align-items-center text-bold health-card"
           role="alert"
           style="background-color: #fff8e4">
        <img src="@/assets/svg/face_orange.svg"
             alt="中風險"
             class="img_Middle"
             style="width: 36px; height: 36px; margin-right: 20px" />
        糖尿病中風險
      </div>
      <div v-else
           class="alert d-flex flex-md-row justify-content-center align-items-center text-bold health-card"
           role="alert"
           style="background-color: #ffecec">
        <img src="@/assets/svg/face_red.svg"
             alt="高風險"
             class="img_High"
             style="width: 36px; height: 36px; margin-right: 20px" />糖尿病高風險
      </div>

      <div style="line-height: 18.75px; font-size: 15px">
        <div v-html="Description"></div>
      </div>
      <div v-if="RiskLevel == null" class="description-txt"></div>
      <div v-else-if="RiskLevel == 1" class="description-txt">
        <div style="color: #008cd6; font-weight: 600">
          想知道如何透過飲食調整、運動規劃來強化體能與健康嗎？
        </div>
        <div>可於LINE@對話框諮詢健康特務。</div>
      </div>
      <div v-else-if="RiskLevel == 2" class="description-txt">
        <div style="color: #008cd6; font-weight: 600">想要了解更多健康相關資訊</div>
        <div>您可以點選門診掛號，若想要了解更多健康相關資訊，可於LINE@對話框諮詢健康特務。</div>
      </div>
      <div v-else class="description-txt">
        <div style="color: #008cd6; font-weight: 600">想要了解更多健康相關資訊</div>
        <div>您可以點選門診掛號，若想要了解更多健康相關資訊，可於LINE@對話框諮詢健康特務。</div>
      </div>

      <div v-if="RiskLevel == 1" class="d-grid" style="margin-top: 20px">
        <div class="row px-2">
          <button type="button" class="col-12 btn-sm btn btn-primary" @click="HandleRetest">
            再測一次
          </button>
        </div>
      </div>
      <div v-else style="margin-top: 20px">
        <div class="row px-2">
          <div class="col-6 col-sm-6 px-1">
            <button type="button" class="col-12 btn btn-green" @click="HandleOpdRegister">
              門診掛號
            </button>
          </div>
          <div class="col-6 col-sm-6 px-1">
            <button type="button" class="col-12 btn btn-spy" @click="HandleRetest">
              再測一次
            </button>
          </div>
        </div>
      </div>
      </Card>
    </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import Loading from "@/components/Loading.vue";
import Card from "@/components/Card.vue";
import FailedAlert from "@/components/FailedAlert.vue";

const router = useRouter();

// 狀態變數
const finishLoading = ref(false); // 初始為 false (顯示 Loading)
const finishAlert = ref(false);
const messenger = ref("");
const EvaluateDatetime = ref("");
const Description = ref("");
const RiskLevel = ref(null); // 1, 2, 3
const ResultData = ref(null);

// 關閉錯誤提示
function FailedClose(val) {
  finishAlert.value = val;
}

// 獲取當前格式化時間 (替代後端時間)
const getCurrentTime = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const day = now.getDate().toString().padStart(2, '0');
  const hour = now.getHours().toString().padStart(2, '0');
  const minute = now.getMinutes().toString().padStart(2, '0');
  return `${year}-${month}-${day} ${hour}:${minute}`;
};

onMounted(() => {
  // 1. 模擬讀取資料延遲
  setTimeout(() => {
    const storedData = sessionStorage.getItem("RiskParams");

    if (storedData) {
      ResultData.value = JSON.parse(storedData);
      EvaluateDatetime.value = getCurrentTime();

      // 2. 執行前端計算邏輯
      calculateResults();

      // 3. 關閉 Loading
      finishLoading.value = true;
    } else {
      // 若沒有資料，導回問卷頁
      finishLoading.value = true;
      messenger.value = "查無檢測資料，請重新填寫";
      finishAlert.value = true;
      setTimeout(() => {
        router.push({ name: "RiskQuestionnaire" });
      }, 2000);
    }
  }, 800);
});

const HandleRetest = () => {
  router.push({ name: "RiskQuestionnaire" });
};

const HandleOpdRegister = () => {
  // 模擬跳轉外部連結
  window.location.href = import.meta.env.VITE_API_MEMBER + "OpdRegister/ReserveDivision";
};


function calculateResults() {
  const data = ResultData.value;
  let score = 0;
  let adviceList = [];

  // 1. BMI 計算
  const heightM = data.height / 100;
  const bmi = data.weight / (heightM * heightM);
  const bmiFormatted = bmi.toFixed(1);

  // 2. 評分邏輯 (Mock Logic)

  // A. BMI 權重
  if (bmi >= 27) {
    score += 3;
    adviceList.push(`您的 BMI 為 <b>${bmiFormatted}</b>，屬於肥胖範圍，建議減重。`);
  } else if (bmi >= 24) {
    score += 1;
    adviceList.push(`您的 BMI 為 <b>${bmiFormatted}</b>，屬於過重範圍，需注意飲食控制。`);
  } else {
    adviceList.push(`您的 BMI 為 <b>${bmiFormatted}</b>，體位維持良好。`);
  }

  // B. 腰圍 (男性>=90, 女性>=80 風險高)
  const isHighWaist = (data.sex === 1 && data.waist >= 90) || (data.sex === 2 && data.waist >= 80);
  if (isHighWaist) {
    score += 2;
    adviceList.push(`腰圍超標（${data.waist}cm），腹部肥胖是代謝症候群的重要指標。`);
  }

  // C. 血壓 (收縮壓 >= 130)
  if (data.systolicBp >= 140) {
    score += 3;
    adviceList.push(`收縮壓偏高（${data.systolicBp} mmHg），建議每日測量並諮詢醫師。`);
  } else if (data.systolicBp >= 130) {
    score += 1;
    adviceList.push(`收縮壓稍微偏高（${data.systolicBp} mmHg），請注意鹽分攝取。`);
  }

  // D. 血糖 (如果有填寫，這是強指標)
  if (data.glucose > 0) {
    if (data.glucose >= 126) {
      score += 5; // 直接變高風險
      adviceList.push(`飯前血糖（${data.glucose} mg/dL）已達糖尿病診斷標準範圍，請務必就醫。`);
    } else if (data.glucose >= 100) {
      score += 2;
      adviceList.push(`飯前血糖（${data.glucose} mg/dL）偏高，屬於糖尿病前期。`);
    }
  }

  // E. 家族史
  if (data.familyHistory) {
    score += 2;
    adviceList.push("您有糖尿病家族史，遺傳風險較一般人高。");
  }

  // F. 抽菸
  if (data.smoker) {
    score += 2;
    adviceList.push("抽菸會大幅增加心血管疾病與糖尿病併發症風險，建議戒菸。");
  }

  // G. 年齡
  if (data.age >= 65) score += 2;
  else if (data.age >= 45) score += 1;

  // 3. 判定風險等級
  // 分數 0-2: 低風險 (Level 1)
  // 分數 3-5: 中風險 (Level 2)
  // 分數 > 5 : 高風險 (Level 3)

  if (score <= 2) {
    RiskLevel.value = 1;
  } else if (score <= 5) {
    RiskLevel.value = 2;
  } else {
    RiskLevel.value = 3;
  }

  // 4. 組合建議文字
  let summary = `<p>根據您的填寫資料，綜合評估分數為：${score} 分。</p>`;
  summary += `<ul style="text-align: left; padding-left: 20px;">`;
  adviceList.forEach(item => {
    summary += `<li style="margin-bottom: 5px;">${item}</li>`;
  });
  summary += `</ul>`;

  Description.value = summary;
}
</script>

<style lang="scss" scoped>
.text-bold {
  line-height: 25.2px;
  font-weight: 600;
  font-size: 18px;
}
.health-card {
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 10px;
}
.description-txt {
  line-height: 18.8px;
  font-size: 15px;
  margin-top: 20px;
}


  .bg_DiseaseRisk_color {
    &:before {
      content: "";
      width: 100vw;
      height: 100vh;
      position: absolute;
      top: 0;
      left: 0;
      background: url(/src/assets/img/bg_DiseaseRisk.png);
      z-index: -1;
      background-size: cover;
    }
  }
</style>
