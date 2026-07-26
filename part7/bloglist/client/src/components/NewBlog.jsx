import { TextField, Button } from '@mui/material'
import { useField } from '../hooks'

const NewBlog = ({ handleBlog }) => {
  const { reset: resetTitle, ...title } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetUrl, ...url } = useField('text')

  const onSubmit = (event) => {
    event.preventDefault()
    handleBlog({ title: title.value, author: author.value, url: url.value })
    resetTitle()
    resetAuthor()
    resetUrl()
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={onSubmit}>
        <div>
          <TextField label="title" placeholder="title" {...title} />
        </div>
        <div>
          <TextField label="author" placeholder="author" {...author} />
        </div>
        <div>
          <TextField label="url" placeholder="url" {...url} />
        </div>
        <div>
          <Button variant="contained" color="primary" type="submit">create</Button>
        </div>
      </form>
    </div>
  )
}

export default NewBlog