<template>
  <Loading :IsShow="finishLoading" />
  <FailedAlert ref="Failedref" :IsShow="finishAlert" :Content="messenger" @Close="FailedClose" />
  <div class="bg_HealthSurvey_color">
    <div class="banner">
      <div>
        <img src="@/assets/img/img_HealthSurvey.png" alt="健康分數評估" />
        <a class="btn btn-spy" @click="startTest" style=" max-width: 284px;">開始檢測</a>
      </div>
    </div>
    <div id="HealthSurvey" ref="HealthSurvey" style="padding-top:8px">
      <QuestionCard>
        <template #title>
          健康分數問卷
        </template>
        <div v-if="noData" class="d-flex flex-column justify-content-center align-items-center m-3 noData_container">
          <!--<img src="@/assets/svg/searchNoData.svg" alt="您目前沒有預約紀錄" class="img_noData">-->
          <div class="mt-3">沒有資料</div>
        </div>



        <form ref="formline" class="form_container" novalidate>

          <div v-for="(val, num) in List" :key="num" class="form_container_div" :id="`question-${num}`">
            <label class="form-label">
              {{ num + 1 < 10 ? "0" + (num + 1) : num + 1 }} {{ val.Context }} <div v-if="showError[num]"
                class="showError-feedback">必填項目
          </div>
          </label>

          <div class="form-check" v-for="(item, index) in answerList" :key="index">
            <div class="box-check">
              <input class="form-check-input" type="radio" :name="`question-${num}`" :id="`inlineRadio-${num}-${index}`"
                :value="item.val" v-model="userAnswers[num]" @change="validateInput(num)" autocomplete="off" required />
              <label class="form-check-label btn btn-secondar box_check" :for="`inlineRadio-${num}-${index}`">
                {{ item.label }}
              </label>
            </div>
          </div>
    </div>
    </form>

    </QuestionCard>

  </div>
  <div class="submit_container" v-show="submitBar">
    <div class="bar_content">
      <progress class="progress_class" :max="progressNum.max" :value="progressNum.min" />
      <span class="bar_content-text">{{ progressNum.min }} / {{ progressNum.max }}</span>
    </div>
    <!--v-if="progressNum.min == progressNum.max"-->
    <button v-if="progressNum.min == progressNum.max" class="btn btn_submit" type="submit"
      @click="submitForm">查看結果</button>
    <div v-else class="arrows_content">
      <button class="btn_arrows" type="button" @click="goToLeft">
        <ArrowsLeft></ArrowsLeft>
      </button>
      <button class="btn_arrows" type="button" @click="goToRight">
        <ArrowsRight></ArrowsRight>
      </button>
    </div>

  </div>
  </div>
</template>
<script setup>
import { computed, reactive, ref, onMounted, onUnmounted, nextTick } from 'vue';
import Loading from '@/components/Loading.vue';
import ArrowsLeft from '@/components/icons/IconArrowsLeft.vue';
import ArrowsRight from '@/components/icons/IconArrowsRight.vue';
// import { GetSurveyList, SaveSurvey } from "@/api/HealthSurveyQuestionnaire"; // 先註解掉 API
import { useRoute, useRouter } from 'vue-router'; // 修正: 確保引入 useRouter
import QuestionCard from "@/components/QuestionCard.vue"

const route = useRoute();
const router = useRouter();

//錯誤提示
import FailedAlert from "@/components/FailedAlert.vue";
const finishLoading = ref(true); // 初始狀態設為 true (根據你的 Loading 邏輯)
const Failedref = ref(null);
const finishAlert = ref(false);
const messenger = ref("");
const noData = ref(false);
const List = ref([]);
const HealthSurvey = ref(null);
const showError = ref({});
const userAnswers = reactive({});
const submitBar = ref(false);

const progressNum = computed(() => ({
  max: List.value.length,
  min: Object.keys(userAnswers).length
}));

const startTest = () => {
  submitBar.value = true;
  if(HealthSurvey.value) {
      HealthSurvey.value.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

const answerList = reactive([
  { label: "從來沒有", val: 1 },
  { label: "偶爾", val: 2 },
  { label: "經常", val: 3 },
  { label: "很常", val: 4 },
  { label: "總是", val: 5 }
]);

// === 模擬 GetSurveyList (產生問卷題目) ===
// 這裡設計了 10 題通用的健康習慣題目，搭配 1-5 分的頻率選項很合理
const initMockData = () => {
  finishLoading.value = false; // 開啟 Loading

  setTimeout(() => {
    List.value = [
      { Code: "Q1", Context: "我每天都有固定吃早餐的習慣" },
      { Code: "Q2", Context: "我每週至少會運動 3 次，每次 30 分鐘以上" },
      { Code: "Q3", Context: "我每天喝水量有達到 2000cc 以上" },
      { Code: "Q4", Context: "我每天睡眠時間有達到 7 至 8 小時" },
      { Code: "Q5", Context: "我會攝取足夠的蔬菜與水果（天天五蔬果）" },
      { Code: "Q6", Context: "我會避免攝取含糖飲料或高熱量零食" },
      { Code: "Q7", Context: "我感到心情愉悅，能有效排解壓力" },
      { Code: "Q8", Context: "我有良好的排便習慣（每天或每兩天一次）" },
      { Code: "Q9", Context: "我避免在睡前一小時使用手機或電子產品" },
      { Code: "Q10", Context: "我會定期進行身體健康檢查" }
    ];

    if (List.value.length === 0) {
      noData.value = true;
    }

    finishLoading.value = true; // 關閉 Loading
  }, 800); // 模擬 0.8秒 的網路延遲
};

// 執行模擬資料載入
initMockData();

// === 原本的 API 呼叫區塊 (已註解保留參考) ===
/*
let params = {}
GetSurveyList(params)
  .then((res) => {
     // ...
  }).finally(() => {
    finishLoading.value = true;
  });
*/

const validateForm = () => {
  let isValid = true;
  showError.value = {};

  List.value.forEach((_, index) => {
    if (!userAnswers[index] || userAnswers[index] == undefined) {
      showError.value[index] = true;
      isValid = false;
    }
  });
  return isValid; // 建議回傳 boolean
};

// 監聽 HealthSurvey 的可見性
const setupIntersectionObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          submitBar.value = true;
        } else {
          submitBar.value = false;
        }
      });
    },
    {
      root: null,
      rootMargin: '0px',
      threshold: 0.01,
    }
  );

  if (HealthSurvey.value) {
    observer.observe(HealthSurvey.value);
  }

  onUnmounted(() => {
    if (HealthSurvey.value) {
      observer.unobserve(HealthSurvey.value);
    }
  });
};

onMounted(() => {
  setupIntersectionObserver();
});

// 找到下一個未填寫的題目
const goToRight = () => {
  validateForm();
  const nextUnansweredIndex = List.value.findIndex((_, index) =>
    (userAnswers[index] === undefined)
  );
  if (nextUnansweredIndex !== -1) {
    scrollToQuestion(nextUnansweredIndex);
  }
};

// 找到未填寫的第一題並滾動過去
const goToLeft = () => {
  validateForm();
  nextTick(() => {
    let prevUnansweredIndex = [...List.value]
      .findIndex((_, index) => {
        return (userAnswers[List.value.length - 1 - index] === undefined)
      });

    if (prevUnansweredIndex !== -1) {
      prevUnansweredIndex = List.value.length - 1 - prevUnansweredIndex;
      scrollToQuestion(prevUnansweredIndex);
    }
  });
};

// === 模擬 SaveSurvey (送出表單) ===
const submitForm = () => {
  // 1. 驗證
  if (!validateForm()) {
    // 如果有未填寫的，定位到第一題未填寫的
    goToRight();
    return;
  }

  finishLoading.value = false; // 開啟 Loading

  const ListAnswer = ref([]);
  Object.entries(userAnswers).forEach((obj) => {
    let text = {
      Code: "Q" + (parseInt(obj[0]) + 1),
      Answer: obj[1]
    }
    ListAnswer.value.push((text));
  });

  // 模擬送出資料並跳轉
  setTimeout(() => {
    console.log("模擬送出資料:", ListAnswer.value);

    // 將結果暫存到 sessionStorage，以便在結果頁讀取 (模擬後端)
    // 這裡我們簡單計算總分存起來，或者直接存詳細答案
    let totalScore = 0;
    Object.values(userAnswers).forEach(val => totalScore += val);

    const resultData = {
        answers: userAnswers,
        totalScore: totalScore,
        date: new Date().toISOString()
    };
    sessionStorage.setItem('SurveyResult', JSON.stringify(resultData));

    // 跳轉
    finishLoading.value = true;
    router.push({ path: '/member/HealthSurvey/Result' }); // 確保此路由存在
  }, 1000);

  /* 原本的 API 呼叫
  SaveSurvey(params).then((res) => {
      // ...
  });
  */
}

// 滾動到指定題目
const scrollToQuestion = (index) => {
  const element = document.getElementById(`question-${index}`);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

// 監聽輸入事件
const validateInput = (index) => {
  if (userAnswers[index]) {
    showError.value[index] = false;
  }
};

function FailedClose(val) {
  finishAlert.value = val;
}
</script>
<style lang="scss" scoped>
* {
  font-family: $title-font-family;
  letter-spacing: 1px;

}

.banner {
  width: 100%;
  height: calc(100vh - 8px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  position: relative;

  &:before {
    content: "";
    background: url(@/assets/img/bg_HealthSurvey.png);
    position: absolute;
    top: 0;
    left: 0;
    width: calc(100% + 32px);
    height: 100%;
    background-size: cover;
    pointer-events: none;
    z-index: -1;
    margin-left: -16px;
    margin-right: -16px;
  }

  .btn-spy {
    margin-top: 4.93rem;
  }

  img {

    width: 100%;
    max-height: 100%;
  }
}

/*  //.container-Questionnaire {
  //  background: #fff;
  //  padding: 1.25rem;
  //  border-radius: 10px;
  //  min-height: calc(100vh - 16px);
  //  margin-bottom: 60px;


  //  &-title {
  //    font-size: 18px;
  //    font-weight: 500;
  //    line-height: 1.38;
  //    padding-bottom: 10px;
  //    margin-bottom: 20px;
  //    text-align: center;
  //    border-bottom: solid #A3D47C 2px;
  //  }
  //}
*/
form {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  color: #2D2D2D;

  .form_container_div {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;

    .form-label {
      font-weight: 500;
      font-family: $title-font-family;
      width: 100%;
      font-size: 0.937rem;

      ~div {
        margin-bottom: 0;
      }
    }

    .form-check {
      width: calc(50% - 4px);
      display: flex;
      align-items: center;
      justify-content: flex-start;
      padding-left: 0;

      .box-check {
        position: relative;
        width: 100%;
      }

      .form-check-input {
        float: none;
        margin-left: 0;
        position: absolute;
        left: 19px;
        top: 8px;
        width: 14px;
        height: 14px;

        &:active,
        &:checked {
          color: #057AFF;
          outline: 1px solid #057AFF;
          background-image: none;
          border: solid #fff 3px;

          +.form-check-label {
            background: #BEE9FF
          }
        }
      }

      .form-check-label {
        font-weight: 400;
        background: #EBF8FF;
        padding-top: 8px;
        padding-bottom: 8px;
        padding-left: 44px;
        border-radius: 4px;
        overflow: hidden;
        width: 100%;
        text-align: left;
        border: none;

        &:hover,
        &:focus,
        &:active {
          background: #BEE9FF;
        }
      }
    }
  }
}
</style>
