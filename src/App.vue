<script setup lang="ts">
import * as echarts from "echarts"
import { onMounted, ref } from "vue";
const chartsContainer = ref(null)

onMounted(() => {
  const chartInstance = echarts.init(chartsContainer.value)
  console.log(chartInstance)
  chartInstance.setOption({
    xAxis: {
      type: 'category',
      show: false,
      boundaryGap: false,
    },
    yAxis: {
      show: false,
    },
    series: [
      {
        type: 'line',
        data: [
          620, 432, 220, 534, 790, 430, 220, 320, 532, 320, 834, 690, 530, 220,
          620,
        ],
        areaStyle: {
          color: 'purple',
        },
        lineStyle: {
          width: 0,
        },
        itemStyle: {
          opacity: 0,
        },
        smooth: true,
      },
    ],
    grid: {
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
    },
  })
})

const getWebSocket = () => {
    // 建立websocket连接
    const ws =new WebSocket('ws://localhost:3000')
    console.log(ws)
}

getWebSocket()
</script>

<template>
  <div ref="chartsContainer" style="width: 700px;height: 500px">

  </div>
</template>

<style scoped></style>
