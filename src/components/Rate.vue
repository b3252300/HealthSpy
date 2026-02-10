<template>
  <div>
    <!-- 顯示每個產品的星形評分 -->
    <div v-for="(ratingValue, product) in ratings" :key="product" class="rating-container">
      <div class="stars-outer" ref="outerIcon">
        <!-- 灰色星星（底層） -->
        <svg v-for="star in starsTotal"  :key="`outer-${star}`"
             class="star"  xmlns="http://www.w3.org/2000/svg"  viewBox="0 0 33 33" fill="#D9D9D9"
             width="33" height="33">
          <path d="M19.7556 5.40802C19.7556 7.2503 18.2988 8.74377 16.5018 8.74377C14.7048 8.74377 13.2481 7.2503 13.2481 5.40802C13.2481 3.56573 14.7048 2.07227 16.5018 2.07227C18.2988 2.07227 19.7556 3.56573 19.7556 5.40802Z" fill="#D9D9D9" />
          <path d="M12.3785 15.2235C12.3785 14.0567 13.3013 13.1107 14.4397 13.1107C15.5781 13.1107 16.501 14.0567 16.501 15.2235V30.2152C16.501 31.3821 15.5781 32.328 14.4397 32.328C13.3013 32.328 12.3785 31.3821 12.3785 30.2152V15.2235Z" fill="#D9D9D9" />
          <path d="M16.7753 15.2235C16.7753 14.0567 17.6982 13.1107 18.8366 13.1107C19.975 13.1107 20.8979 14.0567 20.8979 15.2235V30.2152C20.8979 31.3821 19.975 32.328 18.8366 32.328C17.6982 32.328 16.7753 31.3821 16.7753 30.2152V15.2235Z" fill="#D9D9D9" />
          <path d="M10.5084 11.9867C10.7407 11.0704 11.6538 10.5207 12.5477 10.759C13.4417 10.9972 13.978 11.9332 13.7457 12.8495L11.9004 20.1266C11.668 21.0429 10.755 21.5926 9.86101 21.3543C8.96705 21.1161 8.43072 20.1801 8.66308 19.2637L10.5084 11.9867Z" fill="#D9D9D9" />
          <path d="M22.4941 11.9867C22.2617 11.0704 21.3487 10.5207 20.4547 10.759C19.5608 10.9972 19.0244 11.9332 19.2568 12.8495L21.1021 20.1266C21.3344 21.0429 22.2475 21.5926 23.1415 21.3543C24.0354 21.1161 24.5718 20.1801 24.3394 19.2637L22.4941 11.9867Z" fill="#D9D9D9" />
          <path d="M10.5559 12.2735C10.5559 10.7545 11.7572 9.5231 13.2392 9.5231H19.7694C21.2513 9.5231 22.4527 10.7545 22.4527 12.2735V15.0136C22.4527 16.5326 21.2513 17.764 19.7694 17.764H13.2392C11.7572 17.764 10.5559 16.5326 10.5559 15.0136V12.2735Z" fill="#D9D9D9" />
          <path d="M15.1825 16.0527H18.1702V21.4845H15.1825V16.0527Z"  />
        </svg>
      </div>
      <div class="stars-position"  :style="{ width: getStarPercentage(ratingValue) }">
        <div class="stars-inner" :style="{ width: innerWidth }">
          <!-- 黃色星星（上層） -->
          <svg v-for="star in starsTotal"
               :key="`inner-${star}`"
               class="star"
               width="33" height="33"
               viewBox="0 0 33 33"
               fill="#008CD6"
               xmlns="http://www.w3.org/2000/svg">
          
            <path d="M19.5559 5.40802C19.5559 7.2503 18.0991 8.74377 16.3021 8.74377C14.5051 8.74377 13.0484 7.2503 13.0484 5.40802C13.0484 3.56573 14.5051 2.07227 16.3021 2.07227C18.0991 2.07227 19.5559 3.56573 19.5559 5.40802Z" fill="#008CD6" />
            <path d="M12.1787 15.2235C12.1787 14.0567 13.1016 13.1107 14.24 13.1107C15.3784 13.1107 16.3013 14.0567 16.3013 15.2235V30.2152C16.3013 31.3821 15.3784 32.328 14.24 32.328C13.1016 32.328 12.1787 31.3821 12.1787 30.2152V15.2235Z" fill="#008CD6" />
            <path d="M16.5756 15.2235C16.5756 14.0567 17.4985 13.1107 18.6369 13.1107C19.7753 13.1107 20.6982 14.0567 20.6982 15.2235V30.2152C20.6982 31.3821 19.7753 32.328 18.6369 32.328C17.4985 32.328 16.5756 31.3821 16.5756 30.2152V15.2235Z" fill="#008CD6" />
            <path d="M10.3087 11.9867C10.541 11.0704 11.4541 10.5207 12.348 10.759C13.242 10.9972 13.7783 11.9332 13.546 12.8495L11.7007 20.1266C11.4683 21.0429 10.5553 21.5926 9.6613 21.3543C8.76734 21.1161 8.23101 20.1801 8.46337 19.2637L10.3087 11.9867Z" fill="#008CD6" />
            <path d="M22.2944 11.9867C22.062 11.0704 21.149 10.5207 20.255 10.759C19.3611 10.9972 18.8247 11.9332 19.0571 12.8495L20.9024 20.1266C21.1347 21.0429 22.0478 21.5926 22.9418 21.3543C23.8357 21.1161 24.372 20.1801 24.1397 19.2637L22.2944 11.9867Z" fill="#008CD6" />
            <path d="M10.3562 12.2735C10.3562 10.7545 11.5575 9.5231 13.0395 9.5231H19.5696C21.0516 9.5231 22.253 10.7545 22.253 12.2735V15.0136C22.253 16.5326 21.0516 17.764 19.5696 17.764H13.0395C11.5575 17.764 10.3562 16.5326 10.3562 15.0136V12.2735Z" fill="#008CD6" />
            <path d="M14.9828 16.0527H17.9705V21.4845H14.9828V16.0527Z"  />
          </svg>


        </div>
      </div>
      <!-- 顯示評分數字 -->
      <!--<span class="number-rating">{{ ratingValue }}</span>-->
    </div>
  </div>





</template>

<script setup>
  import { ref, onMounted, nextTick } from 'vue';
  const outerIcon = ref(null);
  const innerWidth = ref('0px');

  const props = defineProps({
    ratingsNum: {
      type: String,
      default:0
    }
  });

  // 初始評分數據
  const ratings = ref({
    sony: props.ratingsNum,
  });

  // 總星數
  const starsTotal = 10;

  // 選擇的產品
  const selectedProduct = ref(null);

  // 評分控制值
  const rating = ref(null);

  // 監聽選擇的產品變化
  //watch(selectedProduct, (newProduct) => {
  //  if (newProduct) {
  //    rating.value = ratings.value[newProduct];
  //  }
  //});

  // 監聽評分變化
  //watch(rating, (newRating) => {
  //  if (newRating > 5) {
  //    //alert('請輸入 1 到 5 之間的評分');
  //    return;
  //  }

  //  if (selectedProduct.value) {
  //    ratings.value[selectedProduct.value] = newRating;
  //  }
  //});

  // 計算星形百分比
  function getStarPercentage(ratingValue) {
    //const starPercentage = (ratingValue / starsTotal) * 100;
 
    return `${ratingValue}%`;
  }

  onMounted(() => {
    nextTick(() => {
      if (outerIcon.value) {
        innerWidth.value = outerIcon.value.map(el => el?.offsetWidth + "px" || 0);
        if (window.innerWidth <= 767) {
          window.addEventListener('resize', () => {
            innerWidth.value = outerIcon.value.map(el => el?.offsetWidth + "px" || 0);
          })
        }   
      }
    });
  });
</script>

<style lang="scss" scoped>
  .rating-container {
    position:relative;
  }
  .stars-position {
    width: 100%;
    overflow: hidden;
    position: absolute;
    height: 100%;
    top: 0;
    left: 0;
  }
  .stars-outer,
  .stars-inner {
    display: flex;
    position: relative;
    justify-content: space-between;
    width:100%;

  
  }

  .stars-inner {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    white-space: nowrap;
    
  }
  

  .star {
    width: 33px; /* 調整星形大小 */
    height:33px; /* 調整星形大小 */
    
  }

  .number-rating {
    margin-left: 10px;
    font-size: 16px;
  }
</style>
