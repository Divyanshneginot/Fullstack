import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)
  const [blogVisible, setBlogVisible] = useState(false)

  const notify = (text) => {
    setMessage(text)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    )
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
  const loginForm = () => (
    <Togglable buttonLabel="login">
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleSubmit={handleLogin}
      />
    </Togglable>
  )
  const blog = () => {
    const hideWhenVisible = { display: blogVisible ? 'none' : '' }
    const showWhenVisible = { display: blogVisible ? '' : 'none' }
    return (
      <div >
        <div style={hideWhenVisible}>
          <button onClick={() => setBlogVisible(true)}>new blog</button>
        </div>
        <div style={showWhenVisible}>
          <NewBlog handleBlog={handleBlog} />
          <button onClick={() => setBlogVisible(false)}>cancel</button>
        </div>
        {[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} addLike={addLike} handleRemove={handleRemove} user={user} />
        )}
      </div>
    )
  }
  const handleBlog = async blogObject => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setBlogVisible(false)
      notify(blogObject.title + ' by ' + blogObject.author)
    } catch {
      notify('wrong credentials')
    }
  }
  const handleLogin = async event => {
    event.preventDefault()
    console.log('Logging in with', { username, password })
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch {
      notify('wrong credentials')
    }
  }
  const addLike = async (id, blogObject) => {
    try {
      const returnedBlog = await blogService.update(id, blogObject)
      setBlogs(blogs.map(blog => blog.id !== id ? blog : returnedBlog))
    } catch (error) {
      console.error('Error updating likes:', error)
    }
  }
  const handleRemove = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService
        .deleteBlog(blog.id)
        .then(() => {
          setBlogs(blogs.filter((b) => b.id !== blog.id))
        })
        .catch((error) => {
          console.error('Error removing blog:', error)
        })
    }
  }
  return (
    <div>
      {user && <div>
        <h2>blogs</h2>
        <p>{user.name} logged in</p><button onClick={() => {
          window.localStorage.removeItem('loggedBlogappUser')
          setUser(null)
        }}>logout</button>
      </div>}
      <Notification message={message} />
      {!user && loginForm()}
      {user && blog()}
    </div>
  )
}

export default App