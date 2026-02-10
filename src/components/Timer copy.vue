<template>

<div>{{ timerNum }}</div>



</template>
<script setup>
import {   onMounted, ref, watchEffect } from 'vue';




const emit = defineEmits(['Update']);
const timerNum = ref(); // 一個反應式變數，用來儲存與更新計時器的顯示值
const timerOn = ref(false);// 控制計時器是否繼續運行的旗標

function timer(remaining) {
    // 計算剩餘時間中的分鐘和秒數
    var m = Math.floor(remaining / 60);
    var s = remaining % 60;

    // 格式化分鐘和秒數，確保顯示兩位數字
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    // 使用格式化後的時間字串更新反應式變數 timerNum
    timerNum.value = `${m} : ${s} 更新`;

    // 將剩餘時間減少 1 秒
    remaining -= 1;

    // 如果還有剩餘時間並且計時器開啟，繼續倒數
    if (remaining >= 0 && timerOn.value) {
        setTimeout(function () {
            timer(remaining); // 以更新後的剩餘時間遞迴調用計時器函式
        }, 1000); // 設置 1 秒後再次調用函式
        return;
    }

    if (remaining < 0 && timerOn.value) {
        emit('Update'); 
        // timer(300);
    }

    //如果計時器被關閉，停止倒數
    if (!timerOn.value) {
        return;
    }
}

// 以 300 秒（5 分鐘）的初始值啟動計時器
timer(300);

defineExpose({
    timer,
    timerOn
});
</script>