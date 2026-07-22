import blog from './services/blog'
import { create } from 'zustand'
const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filterStr: '',
  actions: {
    initAnecdotes: async () => {
      const anecdotes = await blog.getAll()
      set({ anecdotes })
    },
    vote: async (id) => {
      const anecdoteToVote = useAnecdoteStore.getState().anecdotes.find(a => a.id === id)
      const updatedAnecdote = await blog.update(id, { ...anecdoteToVote, votes: anecdoteToVote.votes + 1 })
      set((state) => ({
        anecdotes: state.anecdotes.map(anecdote => anecdote.id === id ? updatedAnecdote : anecdote)
      }))
    },
    add: async (content) => {
      const newAnecdote = await blog.create({ content, votes: 0 })
      set((state) => ({
        anecdotes: [...state.anecdotes, newAnecdote]
      }))
    },
    remove: async (id) => {
      await blog.remove(id)
      set((state) => ({
        anecdotes: state.anecdotes.filter(a => a.id !== id)
      }))
    },
    filter: (filterStr) => set({ filterStr })
  }
}))
export const useAnecdotes = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filterStr = useAnecdoteStore((state) => state.filterStr)
  
  const filtered = filterStr
    ? anecdotes.filter(a => a.content.toLowerCase().includes(filterStr.toLowerCase()))
    : anecdotes

  return [...filtered].sort((a, b) => b.votes - a.votes)
}
export const useFilter = () => useAnecdoteStore((state) => state.filterStr)
export const useAnecdoteActions = () => useAnecdoteStore((state) => state.actions)
