import { useNavigate } from 'react-router-dom'
import { useField } from '../hooks/index'
import { useAnecdotes } from '../hooks/index'
const CreateNew = () => {
  const { reset: resetContent, ...contentField } = useField('text')
  const { reset: resetAuthor, ...authorField } = useField('text')
  const { reset: resetInfo, ...infoField } = useField('text')
  const { addAnecdote } = useAnecdotes()
  const navigate = useNavigate()
  const handleSubmit = () => {
    addAnecdote({ content: contentField.value, author: authorField.value, info: infoField.value, votes: 0 })
    navigate('/')
  }
  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input {...contentField} />
        </div>
        <div>
          author
          <input {...authorField} />
        </div>
        <div>
          url for more info
          <input {...infoField} />
        </div>
        <button>create</button>
        <button type="button" onClick={() => { resetContent(); resetAuthor(); resetInfo(); }}>reset</button>
      </form>
    </div>
  )
}

export default CreateNew
