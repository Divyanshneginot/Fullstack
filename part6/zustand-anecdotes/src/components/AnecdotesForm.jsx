import {useAnecdoteActions} from '../store'
const AnecdotesForm = () => {
    const { add } = useAnecdoteActions() 
    return (
        <div>
      <h2>create new</h2>
      <form onSubmit={(e) => {
        e.preventDefault()
        add(e.target[0].value)
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