import { useCreateAnecdote } from '../hooks/hooks'
import { useNotify } from '../NotificationContext'

const AnecdoteForm = () => {
  const createAnecdoteMutation = useCreateAnecdote()
  const notify = useNotify()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.reset()
    createAnecdoteMutation.mutate(content, {
      onSuccess: () => {
        notify(`anecdote '${content}' created`)
      },
      onError: (error) => {
        notify(error.message)
      }
    })
  }
  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm