import { useState } from 'react'
import { useEffect } from 'react'
import { getAll, createNew,remove } from '../services/anecdotes'
export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }
  const reset = () => {
    setValue('')
  }
  return {
    type,
    value,
    onChange,
    reset
  }
}
export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([])
  useEffect(() => {
    const fetchAnecdotes = async () => {
      try {
        const anecdotes = await getAll()
        setAnecdotes(anecdotes)
      } catch (error) {
        console.error('Error fetching anecdotes:', error)
      }
    }
    fetchAnecdotes()
  }, [])
  const addAnecdote = (anecdote) => {
    createNew(anecdote)
      .then((newAnecdote) => {
        setAnecdotes(anecdotes.concat(newAnecdote))
      })
      .catch((error) => {
        console.error('Error creating anecdote:', error)
      }) 
  }
  const deleteAnecdote = (id) => {
    remove(id)
      .then(() => {
        setAnecdotes(anecdotes.filter(anecdote => anecdote.id !== id))
      })
      .catch((error) => {
        console.error('Error deleting anecdote:', error)
      })
  }
  return { anecdotes, addAnecdote, deleteAnecdote }
}
