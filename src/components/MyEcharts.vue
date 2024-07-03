<script setup lang="ts">
import { nextTick, onMounted, onUnmounted, ref, shallowRef, watch, watchEffect } from 'vue';
import * as echarts from 'echarts'
const props = defineOptions({
  option: {
    type: [Object, null],
    require: true
  },
  width: {
    type: String,
    require: true
  },
  height: {
    type: String,
    require: true
  },
  loading: {
    type: Boolean,
    default: false
  },
  className: {
    type: String
  },
  onClick: {
    type: Function
  }
})



// 容器元素
const container = ref()
// 实例
const chartsInstance = shallowRef()
// 初始化
const init = () => {
  if (!container.value) return  // 如果获取不到容器 那直接返回
  //查看容器上是否已经挂载了echarts实例，如果已挂载就获取并使用该实例,如果未挂载就进行初始化
  chartsInstance.value = echarts.getInstanceByDom(container.value)

  // 如果获取不到实例，则就获取实例
  if (!chartsInstance.value) {
    chartsInstance.value = echarts.init(container.value)
  }
  draw()
  // 侦听图表事件
  addListeningChartEvent()
}

const addListeningChartEvent = () => {

  //点击事件
  props.onClick &&
    chartsInstance.value.on('click', 'series', (e: any) => {
      props.onClick(e, chartsInstance.value, props.option)
    })
}

// 绘制图表
const draw = () => {
  if (!props.option || !chartsInstance.value) return
  chartsInstance.value.setOption(props.option, {
    notMerge: true  // notMerge 设置为true setOption改变 会自动重新绘制图表
  })
}

watch(props.option, () => {
  draw()
})

watchEffect(() => {
  props.loading ? chartsInstance.value.showLoading() : chartsInstance.value.hidenLoading()
})

const resizeObserver = shallowRef()

const debounceTimer = ref()

//重置图表尺寸

const resize = () => {

  clearTimeout(debounceTimer.value)

  debounceTimer.value = setTimeout(() => {

    chartsInstance.value.resize({
      animation: {
        duration: 300
      }
    })
    debounceTimer.value = null

  }, 300)

}

resizeObserver.value = new ResizeObserver(resize)

onMounted(() => {
  nextTick(() => {
    init()
    resizeObserver.value.observe(container.value)
  })
})

onUnmounted(() => {
  resizeObserver.value.discounnect()
  resizeObserver.value = null
  clearTimeout(debounceTimer.value)
  debounceTimer.value = null
  chartsInstance.value.dispose()  //组件卸载时要用dispose摧毁实例
})
defineExpose({
  getInstance: () => chartsInstance.value,
  resize,
  draw
})
</script>

<template>
  <div ref="container" :class="props.className" :style="{ width: props.width, height: props.height }"></div>
</template>

<style scoped></style>
