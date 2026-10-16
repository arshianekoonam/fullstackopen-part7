import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import BlogForm from './BlogForm'
import { vi } from 'vitest'

test('<BlogForm /> updates parent state and calls onSubmit', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  // Find the input fields (based on placeholders or labels)
  const inputs = screen.getAllByRole('textbox')
  const sendButton = screen.getByText('create')

  // Type into inputs (title, author, url)
  await user.type(inputs[0], 'Testing React forms with vitest')
  await user.type(inputs[1], 'Arshia Nekoonam')
  await user.type(inputs[2], 'http://testblogurl.com')

  // Click the submit button
  await user.click(sendButton)

  // Check that createBlog was called once with the correct details
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('Testing React forms with vitest')
  expect(createBlog.mock.calls[0][0].author).toBe('Arshia Nekoonam')
  expect(createBlog.mock.calls[0][0].url).toBe('http://testblogurl.com')
})