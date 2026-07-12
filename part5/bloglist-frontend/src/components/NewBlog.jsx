import { useState } from 'react'

const NewBlog = ({ handleBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const onSubmit = (event) => {
    event.preventDefault()
    handleBlog({ title, author, url })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <form onSubmit={onSubmit}>
        <label>title:
          <input type='text' value={title} placeholder='title' onChange={({ target }) => { setTitle(target.value) }} />
        </label>
        <label>author:
          <input type='text' value={author} placeholder='author' onChange={({ target }) => { setAuthor(target.value) }} />
        </label>
        <label>url:
          <input type='text' value={url} placeholder='url' onChange={({ target }) => { setUrl(target.value) }} />
        </label>
        <button type="submit">create</button>
      </form>
    </div>
  )
}
export default NewBlog