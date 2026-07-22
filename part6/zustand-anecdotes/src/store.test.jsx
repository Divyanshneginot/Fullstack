import { describe, it, expect, beforeEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import blogService from './services/blog'
import { useAnecdotes, useAnecdoteActions } from './store'

vi.mock('./services/blog')

const initialAnecdotes = [
  { id: '1', content: 'First anecdote', votes: 1 },
  { id: '2', content: 'Second anecdote', votes: 3 },
  { id: '3', content: 'Third anecdote', votes: 0 },
]

describe('store hooks', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    blogService.getAll.mockResolvedValue([...initialAnecdotes])
    blogService.update.mockImplementation(async (id, obj) => obj)
  })
  it('initializes the state with anecdotes returned by the backend', async () => {
    const { result: actionsResult } = renderHook(() => useAnecdoteActions())
    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    
    await act(async () => {
      await actionsResult.current.initAnecdotes()
    })

    expect(anecdotesResult.current).toHaveLength(3)
    expect(anecdotesResult.current[0].content).toBe('Second anecdote')
    expect(anecdotesResult.current[1].content).toBe('First anecdote')
    expect(anecdotesResult.current[2].content).toBe('Third anecdote')
  })

  it('returns anecdotes from the store sorted by votes', async () => {
    const { result: actionsResult } = renderHook(() => useAnecdoteActions())
    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    
    await act(async () => {
      await actionsResult.current.initAnecdotes()
    })
    
    expect(anecdotesResult.current[0].votes).toBe(3)
    expect(anecdotesResult.current[1].votes).toBe(1)
    expect(anecdotesResult.current[2].votes).toBe(0)
  })
  it('returns a properly filtered list of anecdotes', async () => {
    const { result: actionsResult } = renderHook(() => useAnecdoteActions())
    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    
    await act(async () => {
      await actionsResult.current.initAnecdotes()
    })

    act(() => {
      actionsResult.current.filter('Second')
    })
    
    expect(anecdotesResult.current).toHaveLength(1)
    expect(anecdotesResult.current[0].content).toBe('Second anecdote')
    act(() => {
      actionsResult.current.filter('')
    })
  })
  it('voting increases the number of votes for an anecdote', async () => {
    const { result: actionsResult } = renderHook(() => useAnecdoteActions())
    const { result: anecdotesResult } = renderHook(() => useAnecdotes())
    
    await act(async () => {
      await actionsResult.current.initAnecdotes()
    })
    
    await act(async () => {
      await actionsResult.current.vote('3')
    })

    expect(blogService.update).toHaveBeenCalledTimes(1)
    expect(blogService.update).toHaveBeenCalledWith('3', { ...initialAnecdotes[2], votes: 1 })
    
    const votedAnecdote = anecdotesResult.current.find(a => a.id === '3')
    expect(votedAnecdote.votes).toBe(1)
  })
})
