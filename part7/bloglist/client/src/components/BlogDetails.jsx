import { Button, TextField } from '@mui/material'
import { useField } from '../hooks'

const BlogDetails = ({ blog, addLike, handleRemove, handleComment, user }) => {
  const { reset: resetComment, ...commentField } = useField('text')

  if (!blog) {
    return <p>Blog not found</p>
  }

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    addLike(blog.id, updatedBlog)
  }

  const onSubmitComment = (event) => {
    event.preventDefault()
    handleComment(blog.id, commentField.value)
    resetComment()
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p><a href={blog.url}>{blog.url}</a></p>
      <p>
        likes {blog.likes}{' '}
        {user && <Button variant="contained" color="primary" onClick={handleLike}>like</Button>}
      </p>
      <p>added by {blog.user ? blog.user.name : 'unknown'}</p>
      {user && blog.user && user.username === blog.user.username && (
        <Button variant="outlined" color="error" onClick={() => handleRemove(blog)}>remove</Button>
      )}

      <h3>comments</h3>
      <form onSubmit={onSubmitComment}>
        <TextField size="small" label="add comment" {...commentField} />
        <Button variant="contained" type="submit" style={{ marginLeft: 10 }}>add comment</Button>
      </form>

      <ul style={{ marginTop: 20 }}>
        {blog.comments && blog.comments.length > 0 ? (
          blog.comments.map((comment, index) => (
            <li key={index}>{comment}</li>
          ))
        ) : (
          <p>No comments yet...</p>
        )}
      </ul>
    </div>
  )
}

export default BlogDetails