<script setup lang="ts">
import {
  CloudRainIcon,
  Cloudy,
  Droplet,
  Gauge,
  ServerCrash,
  ThermometerSnowflake,
  ThermometerSun,
  Wind,
  Earth,
  ChevronsLeft
} from 'lucide-vue-next'
import { ref } from 'vue'

import { notificationService } from '@/lib/toastService'
import type { WeatherData } from '@/shared/types/types'
import LoaderTemplate from '@/shared/utils/LoaderTemplate.vue'
import { weatherApi } from '@/stores/weather'

const place = ref('')
const loading = ref(false)
const weatherData = ref<WeatherData | null>(null)
const hideForm = ref(false)
const error = ref<{ message: string; status: boolean }>({
  message: '',
  status: false
})

const shake = ref<boolean>(false)

const showError = (message: string) => {
  error.value = { message, status: true }
  notificationService({
    message,
    type: 'error',
    time: 1500
  })
}

const search = async () => {
  if (place.value.trim() === '') {
    shake.value = true
    notificationService({
      message: 'Enter city name',
      type: 'warning',
      time: 1500
    })

    setTimeout(() => {
      shake.value = false
    }, 500)

    return
  }

  loading.value = true
  weatherData.value = null
  hideForm.value = true

  try {
    const response = await weatherApi(place.value.trim())
    if (!response) {
      showError('Sorry, city not found :(')
    } else {
      weatherData.value = response
      console.log(response)
    }
  } catch (err) {
    console.error(err)
    showError('An error occurred while fetching data.')
  } finally {
    loading.value = false
  }
}

const clear = () => {
  error.value.status = false
  place.value = ''
  weatherData.value = null
  hideForm.value = false
}

const getRainDropStyle = (index: number) => {
  const randomLeft = Math.random() * 100 + '%'
  const randomDelay = Math.random() * -5 + 's'
  const randomDuration = Math.random() * 1.5 + 1.5 + 's'
  return {
    left: randomLeft,
    animationDelay: randomDelay,
    animationDuration: randomDuration
  }
}
</script>

<template>
  <main>
    <div class="rain-container" v-show="weatherData?.description?.includes('rain')">
      <div class="raindrop" v-for="n in 20" :key="n" :style="getRainDropStyle(n)"></div>
    </div>

    <form class="form" @submit.prevent="search" v-show="!hideForm">
      <label class="form-label" for="place"><Earth /> Enter city name</label>
      <input class="form-input" type="text" v-model="place" :maxlength="20" placeholder="Moscow" />

      <button :class="['form-btn', { 'shake error': shake }]" type="submit">Search</button>
    </form>

    <Transition name="fade" mode="out-in">
      <LoaderTemplate v-if="loading" :isLoading="loading" :title="'Searching...'" :size="30" />
    </Transition>

    <div v-if="!loading && weatherData && !error.status" class="weather" @keydown.esc="clear">
      <div class="weather__container">
        <div class="">
          <div class="weather__temp">
            <component
              :is="weatherData.temp > 10 ? ThermometerSun : ThermometerSnowflake"
              :size="90"
              :style="weatherData.colors"
            />
            {{ weatherData.temp }}°C
          </div>

          <h1 class="weather__title">{{ weatherData.name }}</h1>
        </div>
      </div>

      <div class="weather__container">
        <div class="weather__container-item">
          <component
            :is="weatherData?.description?.includes('rain') ? CloudRainIcon : Cloudy"
            :size="35"
            color="#42AAFF"
          />

          <div class="flex-column">
            {{ weatherData.clouds }}%

            <p v-if="weatherData.description">
              {{ weatherData.description }}
            </p>
          </div>
        </div>

        <div class="weather__container-item">
          <Droplet :size="35" color="#42AAFF" /> {{ weatherData.humidity.present }}%<br />
          {{ weatherData.humidity.status }}
        </div>

        <div class="weather__container-item">
          <Wind :size="35" color="#c5c5c5" /> {{ weatherData.wind }} m/s
        </div>

        <div class="weather__container-item">
          <Gauge :size="35" color="#CEC2A8" /> {{ weatherData.pressure.number }}<br />
          {{ weatherData.pressure.status }}
        </div>
      </div>
      <button class="weather__btn" title="Back" @click="clear">
        <ChevronsLeft :size="25" />
      </button>
    </div>

    <div v-if="error.status && weatherData === null" class="flex items-center gap-2">
      <ServerCrash /> {{ error.message }}

      <button class="absolute left-7 top-6" @click="clear">
        <ChevronsLeft :size="25" />
      </button>
    </div>
  </main>
</template>

<style scoped>
@import './main.css';
</style>
