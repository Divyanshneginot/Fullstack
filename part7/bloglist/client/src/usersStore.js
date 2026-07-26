import { create } from 'zustand'

const useUsersStore = create((set) => ({
  users: [],
  setUsers: (users) => set({ users })
}))

export default useUsersStore