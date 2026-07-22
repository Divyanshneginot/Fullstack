import { useAnecdoteActions, useAnecdotes } from '../store'
import { useNotificationActions } from '../notificationStore'

const AnecdotesList = () => {
    const anecdotes = useAnecdotes()
    const { vote, remove }  = useAnecdoteActions()
    const { notify } = useNotificationActions()

    const handleVote = (anecdote) => {
        vote(anecdote.id)
        notify(`you voted '${anecdote.content}'`, 5)
    }

    const handleRemove = (anecdote) => {
        remove(anecdote.id)
        notify(`deleted anecdote '${anecdote.content}'`, 5)
    }

    return (
        <div>
            {anecdotes.map(anecdote => (
                <div key={anecdote.id}>
                    <div>{anecdote.content}</div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => handleVote(anecdote)}>vote</button>
                        {anecdote.votes === 0 && (
                            <button onClick={() => handleRemove(anecdote)}>delete</button>
                        )}
                    </div>
                </div>
            ))}
        </div>
    )
}
export default AnecdotesList