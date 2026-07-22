import { create } from 'zustand'

const useNotificationStore = create((set) => ({
  message: '',
  timeoutId: null,
  actions: {
    notify: (message, timeInSeconds) => {
      set((state) => {
        if (state.timeoutId) {
          clearTimeout(state.timeoutId)
        }
        const timeoutId = setTimeout(() => {
          set({ message: '', timeoutId: null })
        }, timeInSeconds * 1000)
        return { message, timeoutId }
      })
    },
    clearNotification: () => {
      set((state) => {
        if (state.timeoutId) clearTimeout(state.timeoutId)
        return { message: '', timeoutId: null }
      })
    }
  }
}))

export const useNotification = () => useNotificationStore((state) => state.message)
export const useNotificationActions = () => useNotificationStore((state) => state.actions)
