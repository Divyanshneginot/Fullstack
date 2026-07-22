import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useAnecdotes, useUpdateAnecdote } from './hooks/hooks'
import { useNotify } from './NotificationContext'

const App = () => {
  const updateAnecdoteMutation = useUpdateAnecdote()
  const notify = useNotify()

  const handleVote = (anecdote) => {
    updateAnecdoteMutation.mutate(anecdote, {
      onSuccess: () => {
        notify(`anecdote '${anecdote.content}' voted`)
      }
    })
  }

  const anecdotes = useAnecdotes()
  if (anecdotes.isLoading) {
    return <div>loading data...</div>
  }
  if(anecdotes.error){
    return <div>anecdote service not available due to problems in server</div>
  }
  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.data?.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App