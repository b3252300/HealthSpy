<template>

<div>{{ timerNum }}</div>

                                                



</template>
<script setup>
import { ref } from 'vue';

const emit = defineEmits(['Update']);
const timerNum = ref(); // 儲存與更新計時器的顯示值
const timerOn = ref(true); // 控制計時器是否繼續運行的旗標
let timerId = null; // 儲存 setTimeout 的 ID

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
        timerId = setTimeout(function () {
            timer(remaining); // 以更新後的剩餘時間遞迴調用計時器函式
        }, 1000); // 設置 1 秒後再次調用函式
        return;
    }

    // 當剩餘時間小於 0 時，觸發 'Update' 事件
    if (remaining < 0 && timerOn.value) {
        emit('Update'); 
    }

    // 如果計時器被關閉，停止倒數
    if (!timerOn.value) {
        clearTimeout(timerId); // 清除計時器
        return;
    }
}

// 以 300 秒（5 分鐘）的初始值啟動計時器
timer(300);

// 定義 refresh 函數，重新倒數計時
const refresh = () => {
    clearTimeout(timerId); // 清除任何現有的計時器
    timer(300); // 重新啟動計時器並重置剩餘時間為 300 秒
};

defineExpose({
    timer,
    timerOn,
    refresh // 將 refresh 函數暴露給外部
});
</script>
