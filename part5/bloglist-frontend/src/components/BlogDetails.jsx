import { useState } from 'react'

const BlogDetails = ({ blog, addLike, handleRemove, user }) => {
  const [blogdetail, setBlogDetail] = useState(false)

  const handleLike = () => {
    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
    }
    addLike(blog.id, updatedBlog)
  }

  return (
    <div>
      <button onClick={() => setBlogDetail(!blogdetail)}>
        {blogdetail ? 'hide' : 'view'}
      </button>
      {blogdetail && (
        <div className="blog-details">
          <p>{blog.url}</p>
          <p>
            likes {blog.likes} <button onClick={handleLike}>like</button>
          </p>
          <p>{blog.user ? blog.user.name : ''}</p>
          {user && blog.user && user.username === blog.user.username && (
            <button onClick={() => handleRemove(blog)}>remove</button>
          )}
        </div>
      )}
    </div>
  )
}

export default BlogDetails