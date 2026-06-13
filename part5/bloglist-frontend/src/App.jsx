import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')
  const [user,setUser]=useState(null)
  const [message,setMessage]=useState(null)
  const [title,setTitle]=useState('')
  const [author,setAuthor]=useState('')
  const [url,setUrl]=useState('')

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
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
    <form onSubmit={handleLogin}>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )
  const blog = () => (
  <div>
    <p>{user.name} logged in</p><button onClick={() => {
  window.localStorage.removeItem('loggedBlogappUser')
  setUser(null)
}}>logout</button>
    <h2>blogs</h2>
    {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
  </div>
)
  const Notification = () => {
  if (message === null) {
    return null
  }
  const notificationStyle={
    display:'inline-block',
    padding:'5px',
    color:'green',
    fontStyle:'Bold',
    border:'4px green',
    backgroundColor:'gray'
  }
  return (
    <div className="error" style={notificationStyle}>
      {message}
    </div>
  )
}
const NewBlog=()=>{
  return (
    <form onSubmit={handleBlog}>
      <label>title:
        <input type='text' value={title} onChange={({target})=>{setTitle(target.value)}} />
      </label>
      <label>author:
        <input type='text' value={author} onChange={({target})=>{setAuthor(target.value)}} />
      </label>
      <label>url:
        <input type='text' value={url} onChange={({target})=>{setUrl(target.value)}} />
      </label>
      {/* Change onClick to type="submit" */}
      <button type="submit">create</button>
    </form>
  )
}
 const handleBlog = async event => {    
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }

    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setMessage(title+' by '+author)
      setTimeout(() => {
      setMessage(null)
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
    } catch {
      setMessage('wrong credentials')
      setTimeout(() => {
      setMessage(null)
      }, 5000)
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
      setMessage('wrong credentials')
      setTimeout(() => {
      setMessage(null)
      }, 5000)
    }  
}
  return (
    
    <div>
      {Notification()}
      {!user && loginForm()}
      {user && blog()}
      {user && NewBlog()}
    </div>
  )
}

export default App