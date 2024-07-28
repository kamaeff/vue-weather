import type { notificationType } from '@/shared/types/types'
import { toast, type ToastTheme } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export const isDark = (): boolean => {
  return window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches ?? false
}

export const notificationService = (params: notificationType) => {
  const { message, type, time } = params
  const theme: ToastTheme = isDark() ? 'dark' : 'light'

  toast(message, {
    theme,
    type,
    autoClose: time,
    dangerouslyHTMLString: true,
    position: 'bottom-right'
  })
}
