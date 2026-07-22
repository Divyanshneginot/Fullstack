const baseUrl = 'http://localhost:3001/anecdotes'
const getAll = async () => {
  const response = await fetch(baseUrl)
  return response.json()
}
const create = async (newAnecdote) => {
  const response = await fetch(baseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newAnecdote),
  })
  return response.json()
}
const update = async (id, updatedAnecdote) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'PUT', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedAnecdote),
  })
  return response.json()
}

const remove = async (id) => {
  const response = await fetch(`${baseUrl}/${id}`, {
    method: 'DELETE',
  })
  return response.json()
}

export default { getAll, create, update, remove }