const STORAGE_KEY = 'loggedBlogappUser'

const getUser = () => {
  const loggedUserJSON = window.localStorage.getItem(STORAGE_KEY)
  return loggedUserJSON ? JSON.parse(loggedUserJSON) : null
}

const saveUser = (user) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(user))
}

const removeUser = () => {
  window.localStorage.removeItem(STORAGE_KEY)
}

export default { getUser, saveUser, removeUser }