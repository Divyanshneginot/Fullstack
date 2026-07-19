import { useAnecdotes,useAnecdoteActions } from '../store'
const AnecdotesList = () => {
    const anecdotes = useAnecdotes()
    const { vote } = useAnecdoteActions()
    const sortedAnecdotes = [...anecdotes].sort((a, b) => b.votes - a.votes)
    return (
        <div>
            {sortedAnecdotes.map(anecdote => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            ))}
        </div>
    )
}
export default AnecdotesList