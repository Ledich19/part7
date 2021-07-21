import blogsService from '../services/blogs'

const blogReducer = (state = [], action) => {

  switch (action.type) {

  case 'DELETE_BLOG': {
    return  state.filter(b => b.id !== action.data)
  }

  case 'LIKE_BLOG': {
    const id = action.data.id
    const blogToChange = state.find((a) => a.id === id)
    const changeBlog = { ...blogToChange, likes: action.data.likes }
    return state.map(a => a.id !== id ? a : changeBlog)
  }

  case 'INIT_BLOGS': {
    return action.data
  }

  case 'ADD_BLOG': {
    return state.concat(action.data)
  }

  case 'ADD_COMENT': {
    const id = action.id
    const blogToChange = state.find((a) => a.id === id)
    const changeBlog = { ...blogToChange, comments: [...blogToChange.comments].concat({ text: action.data.text,id: action.data.id, }) }
    console.log(changeBlog)
    return state.map(a => a.id !== id ? a : changeBlog)
  }

  default:
    return state
  }

}

export const addBlog = (data, name, username) => {
  return async (dispatch) => {
    const returnedBlog = await blogsService.create(data)
    console.log(returnedBlog)
    dispatch({
      type: 'ADD_BLOG',
      data: { ...returnedBlog, user: { name: name, username: username } },
    })
  }
}

export const deleteBlog = ({ id }) => {
  return async (dispatch) => {
    await blogsService.remove(id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id
    })
  }
}

export const likeBlog = (data) => {
  return async (dispatch) => {
    const apdateBlog = await blogsService.update(data.id,{ ...data,likes: data.likes + 1 })
    dispatch({
      type: 'LIKE_BLOG',
      data: apdateBlog,
    })
  }
}

export const initialBlogs = (data) => {
  return {
    type: 'INIT_BLOGS',
    data,
  }
}

export const createComent = (id,data) => {
  return async (dispatch) => {
    const returnecoment = await blogsService.addComent(id,data)
    dispatch({
      type: 'ADD_COMENT',
      data: returnecoment,
      id,
    })
  }
}
export default blogReducer