import { useAnecdoteActions } from '../store'
import { useNotificationActions } from '../notificationStore'

const AnecdotesForm = () => {
    const { add } = useAnecdoteActions() 
    const { notify } = useNotificationActions()

    return (
        <div>
      <h2>create new</h2>
      <form onSubmit={(e) => {
        e.preventDefault()
        const content = e.target[0].value
        add(content)
        notify(`new anecdote '${content}'`, 5)
        e.target[0].value = ''
      }}>
        <div>
          <input name="note"/>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}
export default AnecdotesForm