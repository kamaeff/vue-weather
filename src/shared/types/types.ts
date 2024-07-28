import type { ToastType } from 'vue3-toastify'

export type notificationType = {
  message: string
  type: ToastType
  time: number
}

export type loaderProps = {
  isLoading: boolean
  title: string
  size: number
  needSub?: boolean
}

export type WeatherData = {
  name?: string
  temp: number
  clouds?: number
  description?: string
  humidity: {
    present: number
    status: 'Dry' | 'Good' | 'Wet'
  }
  wind?: number
  pressure: {
    number: number
    status: 'Low' | 'Normal' | 'High'
  }
}
