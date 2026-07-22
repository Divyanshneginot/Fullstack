import AnecdotesList from './components/AnecdotesList'
import AnecdotesForm from './components/AnecdotesForm'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { useEffect } from 'react'
import { useAnecdoteActions } from './store'

const App = () => {
  const { initAnecdotes } = useAnecdoteActions()

  useEffect(() => {
    initAnecdotes()
  }, [initAnecdotes])

  return (
    <div>
      <Notification />
      <Filter />
      <AnecdotesList />
      <AnecdotesForm />
    </div>
  )
}

export default App