<template>

  <canvas ref="chartRef" style="width:100%"></canvas>
</template>
<script setup>
  import { ref, reactive, onMounted, watch } from 'vue';
  import Chart from "chart.js/auto";
  import useDate from "@/utils/date.js";

  const { GetDateYYYYMMDD } = useDate();
  const chartRef = ref(null);
  let chartInstance = null;

  const props = defineProps({
    Date: {
      type: Array,
      default: () => []
    },
    Scale: {
      type: Array,
      default: () => []
    }
  });

  // 初始化 dataObj
  const dataObj = reactive({
    labels: props.Date,
    datasets: [{
      data: props.Scale,
      borderColor: '#057AFF',
      backgroundColor: 'rgba(5, 122, 255, 0.4)',
      pointStyle: 'circle',
      borderWidth: 1,
      pointRadius: 4,
      pointHoverRadius: 4,
      height: 146,
    }]
  });

  // 建立圖表的方法
  const renderChart = () => {
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

  // 監聽 `props.Date` 和 `props.Scale` 變化
  watch(() => [props.Date, props.Scale], ([newDates, newScales]) => {
    dataObj.labels = newDates;
    dataObj.datasets[0].data = newScales;
    renderChart(); // 重新渲染圖表
  }, { deep: true });

  onMounted(() => {
    renderChart();
  });
</script>
