import { useAnecdotes } from '../hooks/index'
const AnecdoteList = () => {
  const { anecdotes, deleteAnecdote } = useAnecdotes()
  const handleDelete = (e, id) => {
    e.preventDefault()
    deleteAnecdote(id)
  }
  return (
    <div>
      <h2>Anecdotes</h2>
      <ul>
      {anecdotes.map(anecdote => <li key={anecdote.id}>{anecdote.content}<button onClick={(e) => handleDelete(e, anecdote.id)}>remove</button></li>)}
    </ul>
  </div>
)
}
export default AnecdoteList
