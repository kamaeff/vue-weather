<script setup lang="ts">
import { ref, onMounted } from 'vue'
import MainTemplate from '@/components/MainTemplate.vue'
import LoaderTemplate from '@/shared/utils/LoaderTemplate.vue'

const loader = ref(true)

onMounted(() => {
  const timeout = setTimeout(() => {
    loader.value = false
  }, 1500)

  return () => clearTimeout(timeout)
})
</script>

<template>
  <Transition name="fade" mode="out-in">
    <LoaderTemplate
      v-if="loader"
      :isLoading="loader"
      :title="'#Weather App'"
      :needSub="false"
      :size="30"
    />
  </Transition>

  <div v-show="!loader">
    <MainTemplate />
  </div>

  <footer>
    <div>Created by <a href="https://github.com/kamaeff?tab=repositories">Anton Kamaev</a></div>
  </footer>
</template>
