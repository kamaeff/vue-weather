<script setup lang="ts">
import { computed } from 'vue'
import { Loader } from 'lucide-vue-next'
import type { loaderProps } from '../types/types'

// Используем defineProps для определения пропсов
const props = defineProps<loaderProps>()

const loaderClass = computed(() => (props.isLoading ? 'loader' : ''))
</script>

<template>
  <div :class="loaderClass">
    <div class="container" v-if="props.isLoading">
      <Loader :size="props.size" class="item" />
      <div class="text">
        <p class="title">#Weather App</p>
        <p v-show="props.needSub" class="sub">Simple and Fast</p>
      </div>
    </div>
  </div>
</template>
