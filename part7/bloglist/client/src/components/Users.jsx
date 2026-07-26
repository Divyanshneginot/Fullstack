import { useEffect } from 'react'
import userService from '../services/users'
import useUsersStore from '../usersStore'
import { Link } from 'react-router-dom'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material'

const Users = () => {
  const users = useUsersStore(state => state.users)
  const setUsers = useUsersStore(state => state.setUsers)

  useEffect(() => {
    userService.getAll().then(users => setUsers(users))
  }, [setUsers])

  return (
    <div>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><strong>User</strong></TableCell>
              <TableCell><strong>blogs created</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map(user => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`} style={{ textDecoration: 'none', color: '#1976d2' }}>
                    {user.name}
                  </Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users