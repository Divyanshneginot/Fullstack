import { create } from 'zustand'
const useNotificationStore = create((set) => ({
  message: null,
  notify: (text) => {
    set({ message: text })
    setTimeout(() => {
      set({ message: null })
    }, 5000)
  }
}))

export default useNotificationStore