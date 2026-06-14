import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import userEvent from '@testing-library/user-event'
import { expect, describe, test, vi } from 'vitest'
import Blog from './Blog'
describe('<Blog/>', () => {
  const blog = {
    title: 'Component testing',
    author:'divyansh',
    url:'https://goku.com',
    likes:5,
    user:{
      name:'broly'
    }
  }
  test('renders title and author but not url or likes by default', () => {
    render(<Blog blog={blog}/>)
    const element = screen.getByText('Component testing divyansh')
    expect(element).toBeDefined()
    const url = screen.queryByText('https://goku.com')
    expect(url).toBeNull()
    const likes = screen.queryByText('likes 5')
    expect(likes).toBeNull()
  })
  test('URL and likes are shown when the button controlling the shown details has been clicked', async () => {
    render(<Blog blog={blog}/>)
    const user = userEvent.setup()
    const button = screen.getByText('view')
    await user.click(button)
    const urlElement=screen.getByText('https://goku.com',{ exact:false })
    expect(urlElement).toBeDefined()
    const likesElement=screen.getByText('likes 5',{ exact:false })
    expect(likesElement).toBeDefined()
  })
  test('if the like button is clicked twice, the event handler the component received as props is called twice', async () => {
    const mockHandler = vi.fn()
    render(<Blog blog={blog} addLike={mockHandler}/>)
    const user = userEvent.setup()
    const viewButton=screen.getByText('view')
    await user.click(viewButton)
    const likeButton=screen.getByText('like')
    await user.click(likeButton)
    await user.click(likeButton)
    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})