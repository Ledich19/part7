const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const Comment = require('../models/comment')
const { userExtractor } = require('../utils/middlewere')

blogsRouter.post('/:id/comments', async (request, response) => {
  const { body } = request
  const { id } = request.params
  const blog = await Blog.findById(id)
  const comment = {
    ...body,
    blog: blog._id,
  }
  const newComment = new Comment(comment)
  const saveComment = await newComment.save()
  blog.comments = blog.comments.concat(saveComment._id)
  await blog.save()
  response.json(saveComment)
})

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1,
  }).populate('comments', {
    text: 1,
  })
  response.json(blogs)
})

blogsRouter.post('/', userExtractor, async (request, response) => {
  const {
    body,
  } = request
  const { user } = request

  const blog = {
    ...body,
    likes: body.likes || 0,
    user: user.id,
  }
  const newBlog = new Blog(blog)
  const saveBlog = await newBlog.save()
  user.blogs = user.blogs.concat(saveBlog._id)
  await user.save()
  response.json(saveBlog)
})

blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const { user } = request
  const {
    id,
  } = request.params
  const blog = await Blog.findById(id)
  console.log('user')
  console.log(user)
  const blogUserId = blog.user.toString()
  const userId = user.id.toString()
  if (blogUserId !== userId) {
    return response.status(400).json({ error: 'it is impossible to delete the wrong user' })
  }
  await Blog.findByIdAndRemove(id)
  user.blogs = user.blogs.filter((b) => b.toString() !== id)
  console.log(user)

  await user.save()
  return response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const {
    id,
  } = request.params
  const {
    body,
  } = request
  const updateBlog = {
    ...body,
  }
  await Blog.findByIdAndUpdate(id, updateBlog, {
    new: true,
  })
  response.json(updateBlog)
})

module.exports = blogsRouter
