import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { vi } from 'vitest'

test('renders content (title and author), but does not render url or likes by default', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5,
    user: {
      name: 'Arshia Nekoonam',
      username: 'arshia'
    }
  }

  const mockUpdateLikes = vi.fn()
  const mockRemoveBlog = vi.fn()
  const loggedUser = { username: 'arshia' }

  const { container } = render(
    <Blog 
      blog={blog} 
      updateLikes={mockUpdateLikes} 
      removeBlog={mockRemoveBlog} 
      user={loggedUser} 
    />
  )

  // Check that title and author are rendered
  const element = screen.getByText('Component testing is done with react-testing-library Test Author')
  expect(element).toBeDefined()

  // Check that url and likes are NOT rendered by default
  const div = container.querySelector('.blog')
  expect(div).not.toHaveTextContent('http://testurl.com')
  expect(div).not.toHaveTextContent('likes 5')
})

test('at the start the url and likes are not displayed, but after clicking the button they are shown', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5,
    user: {
      name: 'Arshia Nekoonam',
      username: 'arshia'
    }
  }

  const mockUpdateLikes = vi.fn()
  const mockRemoveBlog = vi.fn()
  const loggedUser = { username: 'arshia' }

  render(
    <Blog 
      blog={blog} 
      updateLikes={mockUpdateLikes} 
      removeBlog={mockRemoveBlog} 
      user={loggedUser} 
    />
  )

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  expect(screen.getByText('http://testurl.com')).toBeDefined()
  expect(screen.getByText('likes 5')).toBeDefined()
})


test('if the like button is clicked twice, the event handler is received twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Test Author',
    url: 'http://testurl.com',
    likes: 5,
    user: {
      name: 'Arshia Nekoonam',
      username: 'arshia'
    }
  }

  const mockUpdateLikes = vi.fn()
  const mockRemoveBlog = vi.fn()
  const loggedUser = { username: 'arshia' }

  render(
    <Blog 
      blog={blog} 
      updateLikes={mockUpdateLikes} 
      removeBlog={mockRemoveBlog} 
      user={loggedUser} 
    />
  )

  const user = userEvent.setup()
  
  // First click view to show details
  const viewButton = screen.getByText('view')
  await user.click(viewButton)

  // Click the like button twice
  const likeButton = screen.getByText('like')
  await user.click(likeButton)
  await user.click(likeButton)

  expect(mockUpdateLikes.mock.calls.length).toBe(2)
})