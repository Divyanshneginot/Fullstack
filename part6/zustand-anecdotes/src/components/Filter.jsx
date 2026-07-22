import { useAnecdoteActions } from '../store'
const Filter = () => {
    const { filter } = useAnecdoteActions()
  const handleChange = (event) => {
    event.preventDefault()
    filter(event.target.value)
  }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

export default Filter