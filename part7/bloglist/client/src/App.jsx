import { useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import NewBlog from './components/NewBlog'
import Notification from './components/Notification'
import BlogDetails from './components/BlogDetails'
import ErrorBoundary from './components/ErrorBoundary'
import useNotificationStore from './store'
import useBlogStore from './blogStore'
import useUserStore from './userStore'
import persistentUser from './services/persistentUser'
import Users from './components/Users'
import useUsersStore from './usersStore'
import User from './components/User'
import userService from './services/users'
import {
  Routes, Route, Link,
  useNavigate, useMatch
} from 'react-router-dom'
import {
  Container, AppBar, Toolbar, Button,
  Table, TableBody, TableCell,
  TableContainer, TableRow, Paper
} from '@mui/material'

const App = () => {
  const blogs = useBlogStore(state => state.blogs)
  const setBlogs = useBlogStore(state => state.setBlogs)
  const users = useUsersStore(state => state.users)
  const appendBlog = useBlogStore(state => state.appendBlog)
  const updateBlog = useBlogStore(state => state.updateBlog)
  const removeBlog = useBlogStore(state => state.removeBlog)
  const user = useUserStore(state => state.user)
  const setUser = useUserStore(state => state.setUser)
  const clearUser = useUserStore(state => state.clearUser)
  const setUsers = useUsersStore(state => state.setUsers)
  const navigate = useNavigate()

  const message = useNotificationStore(state => state.message)
  const notify = useNotificationStore(state => state.notify)
  const userMatchRoute = useMatch('/users/:id')
  const userMatch = userMatchRoute
    ? users.find(u => u.id === userMatchRoute.params.id)
    : null
  const match = useMatch('/blogs/:id')
  const blogMatch = match
    ? blogs.find(b => b.id === match.params.id)
    : null

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort((a, b) => b.likes - a.likes))
    )
    userService.getAll().then(users => {
      setUsers(users)
    })
  }, [setBlogs, setUsers])

  useEffect(() => {
    const user = persistentUser.getUser()
    if (user) {
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [setUser])

  const loginForm = () => (
    <LoginForm handleSubmit={handleLogin} />
  )

  const blogList = () => {
    return (
      <div>
        <h2>Blogs</h2>
        <TableContainer component={Paper}>
          <Table>
            <TableBody>
              {[...blogs].sort((a, b) => b.likes - a.likes).map(blog =>
                <TableRow key={blog.id}>
                  <TableCell>
                    <Link to={`/blogs/${blog.id}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
                      {blog.title}
                    </Link>
                  </TableCell>
                  <TableCell>
                    {blog.author}
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    )
  }

  const handleBlog = async blogObject => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      appendBlog(returnedBlog)
      notify(blogObject.title + ' by ' + blogObject.author)
      navigate('/')
    } catch {
      notify('wrong credentials')
    }
  }

  const handleLogin = async (username, password) => {
    try {
      const user = await loginService.login({ username, password })
      persistentUser.saveUser(user)
      blogService.setToken(user.token)
      setUser(user)
      navigate('/')
    } catch {
      notify('wrong credentials')
    }
  }

  const addLike = async (id, blogObject) => {
    try {
      const returnedBlog = await blogService.update(id, blogObject)
      updateBlog(returnedBlog)
    } catch (error) {
      console.error('Error updating likes:', error)
    }
  }

  const handleRemove = (blog) => {
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      blogService
        .deleteBlog(blog.id)
        .then(() => {
          removeBlog(blog.id)
          navigate('/')
        })
        .catch((error) => {
          console.error('Error removing blog:', error)
        })
    }
  }
  const handleComment = async (id, comment) => {
    try {
      const updatedBlog = await blogService.addComment(id, comment)
      useBlogStore.getState().commentBlog(updatedBlog)
    } catch (error) {
      console.error('Error adding comment:', error)
    }
  }

  return (
    <Container>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">blogs</Button>
          <Button color="inherit" component={Link} to="/users">users</Button>
          {user
            ? <>
              <Button color="inherit" component={Link} to="/create">create new</Button>
              <div style={{ flexGrow: 1 }} />
              <em>{user.name} logged in</em>
              <Button color="inherit" onClick={() => {
                persistentUser.removeUser()
                clearUser()
                navigate('/')
              }}>logout</Button>
            </>
            : <>
              <div style={{ flexGrow: 1 }} />
              <Button color="inherit" component={Link} to="/login">login</Button>
            </>
          }
        </Toolbar>
      </AppBar>
      <Notification message={message} />
      <ErrorBoundary>
        <Routes>
          <Route path="/" element={user ? blogList() : loginForm()} />
          <Route path="/login" element={loginForm()} />
          <Route path="/blogs/:id" element={<BlogDetails blog={blogMatch} addLike={addLike} handleRemove={handleRemove} handleComment={handleComment} user={user} />} />
          <Route path="/create" element={<NewBlog handleBlog={handleBlog} />} />
          <Route path="*" element={<div><h2>Page not found</h2></div>} />
          <Route path="/users" element={user ? <Users /> : loginForm()} />
          <Route path="/users/:id" element={user ? <User user={userMatch} /> : loginForm()} />
        </Routes>
      </ErrorBoundary>
    </Container>
  )
}

export default App