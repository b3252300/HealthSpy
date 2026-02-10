<template>



  <div id="chart">
    <!--<apexchart ref="chartRef" type="radar" height="350" :options="chartOptions" :series="series"></apexchart>-->
    <apexchart ref="chartRef" type="polarArea" height="350" :options="chartOptions" :series="series"></apexchart>
  </div>

</template>
<script setup>


  import { ref, nextTick } from 'vue';
  import apexchart from 'vue3-apexcharts';
  const leablea = ref([]);
  const chartRef = ref(null);
  //const series = ref([
  //  {
  //    name: 'Series 1',
  //    data: [20, 100, 40, 30, 50],


  //  }
  //]);

  const series = ref([1.4, 2.0, 3.3, 5.0, 0.8]);

  //const chartOptions = ref({

  //  chart: {
  //    height: 350,
  //    type: 'radar',

  //  },
  //  dataLabels: {
  //    enabled: true,

  //    style: {
  //      fontSize: '14px',
  //      fontFamily: 'Helvetica, Arial, sans-serif',
  //      fontWeight: 'bold',
  //      colors: undefined
  //  },
  //    formatter: function (val, opts) {

  //     return val
  //  },
  //  },
  //  plotOptions: {

  //    radar: {
  //      size: 140,
  //      polygons: {
  //        strokeColors: '#fff', //線的顏色
  //        fill: {
  //          colors: ['#e2f9dd', '#fef9e6', '#fbebb8', '#fbedec', '#ffbcba']
  //        }
  //      }
  //    }
  //  },
  //  markers: {
  //    size:0,
  //    colors: ['#F44336', '#E91E63', '#9C27B0'], // 設定數據點的顏色
  //    strokeColor: '#FF4560',
  //    strokeWidth: 2,

  //  },

  //  title: {
  //    // text: 'Radar with Polygon Fill'
  //  },
  //  colors: ['#FF4560'],
  //  fill: {
  //    opacity: 0.5, //中間呈現顏色透明度
  //  },



  //  tooltip: {

  //    y: {
  //      formatter: (val) => val
  //    }
  //  },
  //  xaxis: {

  //    categories: ['能量系統', '心血管系統', '消化系統', '免疫系統', '心理系統'],
  //    labels: {
  //      style: {
  //        colors: ['#FF0000', '#00FF00', '#0000FF', '#FFA500', '#800080'], // 依序設定每個標籤的顏色
  //        fontSize: '14px', // 設定字體大小
  //        fontWeight: 600, // 設定字體粗細
  //      },
  //      formatter: function (value) {
  //      return value + " "+"100";
  //       }
  //    }
  //  },
  //  yaxis: {
  //    labels: {
  //        formatter: function(val, i) {

  //            //y軸顯示刻度
  //                  if (i % 2 === 0) {
  //                    return val
  //                  } else {
  //                    return ''
  //                  }
  //                }
  //    }
  //  }
  //});

  const chartOptions = ref({
    chart: {
      type: 'polarArea',
    },
    stroke: {
      colors: ['#fff']
    },
    colors: [function ({ value, seriesIndex, w }) {
      if (value <= 2) {
        return '#E44F4F'
      } else if (value <= 4) {
        return '#F2AC1F'
      } else {
        return '#4FCA61'
      }
    }],
    dataLabels: {
      enabled: true,
      formatter: function (val, { seriesIndex, dataPointIndex, w }) {
        return w.config.labels[seriesIndex] + ":  " + w.config.series[seriesIndex]
      },
    },
    labels: ['能量系統', '心血管系統', '消化系統', '免疫系統', '心理系統'],
    legend: {
      show: false,
    },   
    yaxis: {
      show: true,
      min: 0,
      max: 5,
      labels: {
        offsetX: 2,
      },
    },
    tooltip: {
      enabled: false,
    },
  });


</script>
