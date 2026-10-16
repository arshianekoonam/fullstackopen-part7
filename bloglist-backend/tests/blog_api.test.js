const { test, describe, beforeEach, before, after } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

const api = supertest(app)

let token = ''
let testUserId = null

before(async () => {
  if (mongoose.connection.readyState !== 1) {
    await mongoose.connection.asPromise()
  }

  // Clear users and create a test user for authentication
  await User.deleteMany({})
  const passwordHash = await bcrypt.hash('sekret', 10)
  const user = new User({ username: 'testuser', name: 'Test User', passwordHash })
  const savedUser = await user.save()
  testUserId = savedUser._id

  // Log in to get the token
  const response = await api
    .post('/api/login')
    .send({ username: 'testuser', password: 'sekret' })

  token = response.body.token
})

const initialBlogs = [
  {
    title: 'HTML is easy',
    author: 'John Doe',
    url: 'https://example.com/html',
    likes: 2
  },
  {
    title: 'Browser can execute JavaScript',
    author: 'Jane Doe',
    url: 'https://example.com/js',
    likes: 5
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})
  
  let blogObject = new Blog({ ...initialBlogs[0], user: testUserId })
  await blogObject.save()

  blogObject = new Blog({ ...initialBlogs[1], user: testUserId })
  await blogObject.save()
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('blog posts have unique identifier named id', async () => {
  const response = await api.get('/api/blogs')
  response.body.forEach(blog => {
    assert(blog.id)
    assert.strictEqual(blog._id, undefined)
  })
})

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Async/await simplifies asynchronous code',
    author: 'Mikael Vesavuori',
    url: 'https://fullstackopen.com/',
    likes: 10
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  const titles = response.body.map(r => r.title)

  assert.strictEqual(response.body.length, initialBlogs.length + 1)
  assert(titles.includes('Async/await simplifies asynchronous code'))
})

test('blog without likes defaults to 0', async () => {
  const newBlog = {
    title: 'Blog without likes property',
    author: 'Test Author',
    url: 'https://example.com/no-likes'
  }

  const response = await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  assert.strictEqual(response.body.likes, 0)
})

test('blog without title or url is not added', async () => {
  const blogWithoutTitle = {
    author: 'Test Author',
    url: 'https://example.com/no-title',
    likes: 3
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(blogWithoutTitle)
    .expect(400)

  const blogWithoutUrl = {
    title: 'Blog without url',
    author: 'Test Author',
    likes: 3
  }

  await api
    .post('/api/blogs')
    .set('Authorization', `Bearer ${token}`)
    .send(blogWithoutUrl)
    .expect(400)

  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, initialBlogs.length)
})

test('a blog can be deleted', async () => {
  const blogsAtStart = await api.get('/api/blogs')
  const blogToDelete = blogsAtStart.body[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .set('Authorization', `Bearer ${token}`)
    .expect(204)

  const blogsAtEnd = await api.get('/api/blogs')
  assert.strictEqual(blogsAtEnd.body.length, initialBlogs.length - 1)

  const titles = blogsAtEnd.body.map(r => r.title)
  assert(!titles.includes(blogToDelete.title))
})

test('a blog likes can be updated', async () => {
  const blogsAtStart = await api.get('/api/blogs')
  const blogToUpdate = blogsAtStart.body[0]

  const updatedData = { likes: blogToUpdate.likes + 5 }

  const response = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(updatedData)
    .expect(200)

  assert.strictEqual(response.body.likes, blogToUpdate.likes + 5)
})

after(async () => {
  await mongoose.connection.close()
})