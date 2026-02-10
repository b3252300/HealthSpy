<template>
  <Loading :IsShow="finishLoading" />
  <FailedAlert ref="Failedref" :IsShow="finishAlert" :Content="messenger" @Close="FailedClose" />

  <div class="bg_DiseaseRisk_color">
    <div class="banner">
      <div>
        <img src="@/assets/img/img_DiseaseRisk.png" alt="疾病風險評估" />
        <a class="btn btn-spy" @click="startTest" style=" max-width: 284px;">開始檢測</a>
      </div>
    </div>
    <div id="DiseaseRisk" ref="DiseaseRisk" style="padding-top: 8px">
      <QuestionCard>
        <template #title>
          疾病風險預測
        </template>


          <form ref="formline" class="form_container" novalidate>
            <div v-for="(val, num) in List"
                 :key="val.Context"
                 class="form_container_div"
                 :id="`question-${num}`">
              <label class="form-label">
                {{ num + 1 < 10 ? "0" + (num + 1) : num + 1 }} {{ val.Context }}
                <div v-if="showError[num]" class="showError-feedback">{{ ErrorTxt[num] }}</div>
              </label>
              <template v-if="val.type == 'radio'">
                <div class="form-check" v-for="(item, index) in val.answerList" :key="item.label">
                  <div class="box-check">
                    <input class="form-check-input"
                           type="radio"
                           :name="`question-${num}`"
                           :id="`inlineRadio-${num}-${index}`"
                           :value="item.val"
                           v-model="userAnswers[num]"
                           @input="validateInput(num)"
                           @change="validateChange(num)"
                           autocomplete="off"
                           :required="val.required" />
                    <label class="form-check-label btn btn-secondar box_check"
                           :for="`inlineRadio-${num}-${index}`">
                      {{ item.label }}
                    </label>
                  </div>
                </div>
              </template>
              <template v-else-if="val.type == 'input'">
                <div></div>
                <input class="form-control form-input shadow-none"
                       type="text"
                       :name="`question-${num}`"
                       :id="`inlineRadio-${num}-${index}`"
                       :placeholder="val.placeholder"
                       v-model="userAnswers[num]"
                       @input="validateInput(num)"
                       @change="validateChange(num)"
                       autocomplete="off"
                       :required="val.required"
                       :inputmode="val.validate == 'int' ? 'numeric' : 'decimal'" />
              </template>

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
      <button
        v-if="progressNum.min >= 8 && formValid"
        class="btn btn_submit"
        type="submit"
        @click="submitForm"
      >
        查看結果
      </button>
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
import { computed, reactive, ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

//錯誤提示
import FailedAlert from "@/components/FailedAlert.vue";
const finishAlert = ref(false);
const messenger = ref("");
  const Failedref = ref(null);

import QuestionCard from "@/components/QuestionCard.vue"
import Loading from "@/components/Loading.vue";
import ArrowsLeft from "@/components/icons/IconArrowsLeft.vue";
import ArrowsRight from "@/components/icons/IconArrowsRight.vue";
import { SaveRiskResult } from "@/api/Questionnaire";
const finishLoading = ref(true);
const List = ref([]);
const DiseaseRisk = ref(null);
const showError = ref({}); // 控制是否顯示「必填項目」錯誤訊息
const ErrorTxt = ref({}); // 控制是否顯示「必填項目」錯誤訊息
const userAnswers = reactive({});
const submitBar = ref(false);
const progressNum = computed(() => ({
  max: List.value.length,
  min: Object.keys(userAnswers).length,
}));

const startTest = () => {
  submitBar.value = true;
  DiseaseRisk.value.scrollIntoView({ behavior: "smooth", block: "start" });
};

//關掉錯誤提示
function FailedClose(val) {
  finishAlert.value = val;
}

List.value = [
  {
    Code: "Q1",
    Context: "年齡",
    type: "input",
    placeholder: "輸入年齡(範圍 30~100 歲)",
    required: true,
    validate: "int",
  },
  {
    Code: "Q2",
    Context: "生理性別",
    type: "radio",
    answerList: [
      {
        label: "男性",
        val: 1,
      },
      {
        label: "女性",
        val: 2,
      },
    ],
    required: true,
    validate: "int",
  },
  {
    Code: "Q3",
    Context: "糖尿病家族史",
    type: "radio",
    answerList: [
      {
        label: "有",
        val: 1,
      },
      {
        label: "沒有",
        val: 0,
      },
    ],
    required: true,
    validate: "int",
  },
  {
    Code: "Q4",
    Context: "抽煙",
    type: "radio",
    answerList: [
      {
        label: "有",
        val: 1,
      },
      {
        label: "沒有",
        val: 0,
      },
    ],
    required: true,
    validate: "int",
  },
  {
    Code: "Q5",
    Context: "身高",
    type: "input",
    placeholder: "輸入身高(範圍 100~220 公分)",
    required: true,
    validate: "double",
  },
  {
    Code: "Q6",
    Context: "體重",
    type: "input",
    placeholder: "輸入體重(範圍 30~200 公斤)",
    required: true,
    validate: "double",
  },
  {
    Code: "Q7",
    Context: "腰圍",
    type: "input",
    placeholder: "輸入腰圍(整數，範圍 40~150)",
    required: true,
    validate: "int",
  },
  {
    Code: "Q8",
    Context: "血壓：收縮壓 systolic_bp",
    type: "input",
    placeholder: "輸入收縮壓(整數，範圍 80~250 mmHg)",
    required: true,
    validate: "int",
  },
  {
    Code: "Q9",
    Context: "白血球 wbc",
    type: "input",
    placeholder: "輸入白血球(範圍 2000~30000 ul)",
    required: false,
    validate: "double",
  },
  {
    Code: "Q10",
    Context: "三酸甘油脂 tg",
    type: "input",
    placeholder: "輸入三酸甘油脂(範圍 0~1000 mg/dL)",
    required: false,
    validate: "double",
  },
  {
    Code: "Q11",
    Context: "高密度脂蛋白 hdl",
    type: "input",
    placeholder: "輸入高密度脂蛋白(範圍 0~100 mg/dL)",
    required: false,
    validate: "double",
  },
  {
    Code: "Q12",
    Context: "飯前血糖 glucose",
    type: "input",
    placeholder: "輸入飯前血糖(範圍 0~500 mg/dL)",
    required: false,
    validate: "double",
  },
];

const formValid = computed(() => {
  let Valid = true;
  List.value.forEach((item, index) => {
    if (userAnswers[index] == undefined) {
      if (item.required) {
        Valid = false;
      }
    }
  });

  return Valid;
});

const validateForm = () => {
  let isValid = true;
  showError.value = {}; // 先清除所有錯誤訊息

  List.value.forEach((item, index) => {
    if (userAnswers[index] == undefined) {
      if (item.required) {
        showError.value[index] = true; // 顯示該題的錯誤訊息
        ErrorTxt.value[index] = "必填項目";

        isValid = false;
      }
    }
  });

  //   if (isValid) {
  //     alert("表單驗證通過，開始處理結果！");
  //   }
};

// 監聽 HealthSurvey 的可見性
const setupIntersectionObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        // console.log(entry);
        if (entry.isIntersecting) {
          submitBar.value = true; // 當 HealthSurvey 底部進入視口時顯示 submit_container
        } else {
          submitBar.value = false; // 當 HealthSurvey 底部離開視口時隱藏 submit_container
        }
      });
    },
    {
      root: null,
      rootMargin: "0px",
      threshold: 0.01, // 當整個 HealthSurvey 的底部進入視口時觸發
    }
  );

  if (DiseaseRisk.value) {
    observer.observe(DiseaseRisk.value);
  }

  onUnmounted(() => {
    if (DiseaseRisk.value) {
      observer.unobserve(DiseaseRisk.value);
    }
  });
};
onMounted(() => {
  setupIntersectionObserver();
});

// 找到下一個未填寫的題目
const goToRight = () => {
  validateForm();

  const nextUnansweredIndex = List.value.findIndex(
    (item, index) => userAnswers[index] === undefined && item.required == true
  );
  console.log(
    nextUnansweredIndex,
    "nextUnansweredIndex 第" + (nextUnansweredIndex + 1) + "題，沒填"
  );
  if (nextUnansweredIndex !== -1) {
    scrollToQuestion(nextUnansweredIndex);
  }
};

// 找到未填寫的第一題並滾動過去
const goToLeft = () => {
  validateForm();

  let prevUnansweredIndex = List.value.findLastIndex(
    (item, index) => userAnswers[index] === undefined && item.required
  );

  console.log(
    prevUnansweredIndex,
    "prevUnansweredIndex 第" + (prevUnansweredIndex + 1) + "題，沒填"
  );
  if (prevUnansweredIndex !== -1) {
    scrollToQuestion(prevUnansweredIndex);
  }
};

// 滾動到指定題目
const scrollToQuestion = (index) => {
  const element = document.getElementById(`question-${index}`);
  if (element) {
    element.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

// 監聽輸入事件，當選擇選項時，清除「必填項目」錯誤訊息
const validateInput = (index) => {
  let validate = List.value[index].validate;
  if (validate == "int") {
    if (!/^\d*$/.test(userAnswers[index])) {
      if (isNaN(parseInt(userAnswers[index]))) {
        delete userAnswers[index];
      } else {
        userAnswers[index] = parseInt(userAnswers[index]);
      }
    }
  } else if (validate == "double") {
    if (!/^[0-9.]+$/.test(userAnswers[index])) {
      delete userAnswers[index];
    }
  }
};

// 監聽輸入事件，當選擇選項時，清除「必填項目」錯誤訊息
const validateChange = (index) => {
  let validate = List.value[index].validate;
  if (validate == "int") {
    if (isNaN(parseInt(userAnswers[index]))) {
      delete userAnswers[index];
    } else {
      userAnswers[index] = parseInt(userAnswers[index]);
    }
  } else if (validate == "double") {
    if (isNaN(parseFloat(userAnswers[index]))) {
      delete userAnswers[index];
    } else {
      userAnswers[index] = parseFloat(userAnswers[index]);
    }
  }

  if (userAnswers[index] != undefined) {
    showError.value[index] = false;
    delete ErrorTxt.value[index];
  }
};

const checkLimitRange = () => {
  showError.value={};
  ErrorTxt.value={};

  let maxLength = 8;
  if (List.value.length == Object.keys(userAnswers).length) {
    maxLength = 12;
  }

  //1-8題檢核
  for (const [key, value] of Object.entries(userAnswers)) {
    if (key < maxLength) {
      console.log(`${key}: ${value}`);
      ValidLimit(key, value);
    }
  }
};

const ValidLimit = (index, data) => {
  switch (+index) {
    case 0:
      if (data < 30 || data > 120) {
        showError.value[index] = true;
        ErrorTxt.value[index] = "年齡不符合，需為30~120歲";
      }
      break;
    case 4:
      if (data < 100 || data > 220) {
        showError.value[index] = true;
        ErrorTxt.value[index] = "身高不符合，需為100~220公分";
      }
      break;
    case 5:
      if (data < 30 || data > 200) {
        showError.value[index] = true;
        ErrorTxt.value[index] = "體重不符合，需為30~200公斤";
      }
      break;
    case 6:
      if (data < 40 || data > 150) {
        showError.value[index] = true;
        ErrorTxt.value[index] = "腰圍不符合，需為40~150";
      }
      break;
    case 7:
      if (data < 80 || data > 250) {
        showError.value[index] = true;
        ErrorTxt.value[index] = "收縮壓不符合，需為80~250mmHg";
      }
      break;
    case 8:
      if (data < 2000 || data > 30000) {
        showError.value[index] = true;
        ErrorTxt.value[index] = "白血球不符合，需為2000~30000ul";
      }
      break;
    case 9:
      if (data < 0 || data > 1000) {
        showError.value[index] = true;
        ErrorTxt.value[index] = "三酸甘油脂不符合，需為0~1000 mg/dL";
      }
      break;
    case 10:
      if (data < 0 || data > 100) {
        showError.value[index] = true;
        ErrorTxt.value[index] = "高密度脂蛋白不符合，需為0~100mg/dL";
      }
      break;
    case 11:
      if (data < 0 || data > 500) {
        showError.value[index] = true;
        ErrorTxt.value[index] = "飯前血糖不符合，需為0~500mg/dL";
      }
      break;
    default:
      break;
  }
};

let params = {};
const submitForm = () => {
  checkLimitRange();

  // 檢查是否有錯誤訊息
  if (Object.keys(ErrorTxt.value).length > 0) {
    let index = Object.keys(ErrorTxt.value)[0];
    scrollToQuestion(index);
    return;
  }

  // 模擬 Loading 效果 (讓使用者覺得正在計算)
  finishLoading.value = false;
  // 整理要傳送的資料
  params = {
    age: userAnswers[0],
    sex: userAnswers[1],
    familyHistory: userAnswers[2] === 1, // 轉為 Boolean
    smoker: userAnswers[3] === 1,        // 轉為 Boolean
    height: userAnswers[4],
    weight: userAnswers[5],
    waist: userAnswers[6],
    systolicBp: userAnswers[7],
    // Optional 欄位處理：如果未填寫給 null 或 0，方便計算
    wbc: userAnswers[8] ?? 0,
    tg: userAnswers[9] ?? 0,
    hdl: userAnswers[10] ?? 0,
    glucose: userAnswers[11] ?? 0,
  };

  // 使用 setTimeout 模擬 API 延遲 (1秒後跳轉)
  setTimeout(() => {
    // 1. 將資料存入 sessionStorage (模擬後端接收資料)
    sessionStorage.setItem("RiskParams", JSON.stringify(params));

    // 2. 關閉 Loading
    finishLoading.value = true;

    // 3. 路由跳轉到結果頁
    router.push({ name: "RiskQuestionnaireResult" });

  }, 1000);
};
</script>
<style lang="scss" scoped>
* {
  font-family: $title-font-family;
  letter-spacing: 1px;
}
.banner {
  width: 100%;
  height: calc(100vh - 2.875rem - 0.75rem);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  position: relative;

  &:before {
    content: "";
    background: url(/src/assets/img/bg_DiseaseRisk.png);
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
    margin-top: 3rem;
  }

  img {
    width: 100%;
    max-height: 100%;
  }
}
/*//.container-Questionnaire {
//  background: #fff;
//  padding: 1.25rem;
//  border-radius: 10px;
//  min-height: calc(100vh - 16px);
//  margin-bottom:60px;

//  &-title {
//    font-size: 18px;
//    font-weight: 500;
//    line-height: 1.38;
//    padding-bottom: 10px;
//    margin-bottom: 20px;
//    text-align: center;
//    border-bottom: solid #a3d47c 2px;
//  }
//}*/

  form {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    color: #2d2d2d;

    .form_container_div {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      gap: 4px;

      .form-label {
        font-weight: 500;
        font-family: $title-font-family;
        width: 100%;
        font-size: 0.937rem;

        ~ div {
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
            color: #057aff;
            outline: 1px solid #057aff;
            background-image: none;
            border: solid #fff 3px;

            + .form-check-label {
              background: #bee9ff;
            }
          }
        }

        .form-check-label {
          font-weight: 400;
          background: #ebf8ff;
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
            background: #bee9ff;
          }
        }
      }

      .form-input {
        background: #ebf8ff;
        border-color: transparent;
        padding: 8px 0.7rem;
      }
    }
  }

//.submit_container {
//  background: #fff;
//  position: fixed;
//  bottom: 0;
//  left: 0;
//  z-index: 5;
//  width: 100%;
//  box-shadow: 0 -1px 4px rgba(0, 0, 0, 0.1);
//  display: flex;
//  justify-content: space-between;
//  padding-left: 16px;
//  align-items: center;

//  .btn_submit {
//    width: 7.125rem;
//    border-radius: 0;
//  }
//}

//.progress_class {
//  max-width: 150px;
//  height: 8px;
  // 外部圆角
//  overflow: hidden;
//  border-radius: 8px 8px 8px 8px;
//  /*设置iOS下清除灰色背景*/
//  appearance: none;
//  -webkit-appearance: none;
//}

// 进度条的进度样式
//.progress_class::-webkit-progress-value {
//  background: linear-gradient(90deg, #d1e9ff 0%, #057aff 100%);
//  border-radius: 8px; // 内部的圆角
//}

// 进度条未达到部分
//.progress_class::-webkit-progress-bar {
//  background-color: #e3e7ea; // 进度条未进度 部分
//}
//.bar_content {
//  &-text {
//    color: #2d2d2d;
//    font-size: 15px;
//    margin-left: 10px;
//  }
//}
//.showError-feedback {
//  width: 100%;
//  color: #eb4d3d;
//  font-size: 11px;
//  font-weight: 500;
//  line-height: 1;
//  margin-top: 4px;
//}
//.arrows_content {
//  display: flex;
//  gap: 4px;
//  padding-top: 6px;
//  padding-bottom: 6px;
//  padding-right: 16px;
//}
//.btn_arrows {
//  width: 32px;
//  height: 32px;
//  background: #ebf8ff;
//  border: none;
//  border-radius: 4px;

//  &:hover,
//  &:focus,
//  &:active {
//    background: #bee9ff;
//  }
//}





</style>
