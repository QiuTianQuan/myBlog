import {combineReducers} from 'redux'

import {
    GET_DATA,
    GET_TOTAL,
    GET_DETAIL,
    GET_COMMENTS,
    GET_LAST_ID,
    GET_NEXT_ID,
    POST_ARTICLE,
    POST_COMMENT
  } from './actions'

  const data = (state = [], action) => {
    switch (action.type) {
      case GET_DATA:
        return action.data
      default:
        return state
    }
  }

  const total = (state = [], action) => {
    switch (action.type) {
      case GET_TOTAL:
        return action.data
      default:
        return state
    }
  }

  const detail = (state = [], action) => {
    switch (action.type) {
      case GET_DETAIL:
        return action.data
      default:
        return state
    }
  }

  const comments = (state = [], action) => {
    switch (action.type) {
      case GET_COMMENTS:
        return action.data
      default:
        return state
    }
  }

  const lastId = (state = [], action) => {
    switch (action.type) {
      case GET_LAST_ID:
        return action.data
      default:
        return state
    }
  }

  const nextId = (state = [], action) => {
    switch (action.type) {
      case GET_NEXT_ID:
        return action.data
      default:
        return state
    }
  }

  const article = (state = [], action) => {
    switch (action.type) {
      case POST_ARTICLE:
        return action.data
      default:
        return state
    }
  }

  const comment = (state = [], action) => {
    switch (action.type) {
      case POST_COMMENT:
        return action.data
      default:
        return state
    }
  }

  // 不同响应合并成一个reducer
const myBlog = combineReducers({
    data,
    total,
    detail,
    article,
    comment,
    comments,
    lastId,
    nextId,
  })
  
  export default myBlog