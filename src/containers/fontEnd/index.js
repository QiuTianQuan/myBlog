import axios from 'axios';
import {getData, getDetail,getLastId,getNextId, getTotal, postArticle,getComments,postComment} from '../../actions'
var qs = require("qs");

export const getBlogData = url=>{
    console.log(url)
      return dispatch => {
          axios.get(url).then(res => {
              dispatch(getData(res.data))
          })
      }
  }
  export const getTotalData =(url)=> {
      return dispatch => {
          axios.get(url).then(res => {
              dispatch(getTotal(res.data))
          })
      }
  }

  export const getCommentsData =(url)=> {
      return dispatch => {
          axios.get(url).then(res => {
              dispatch(getComments(res.data))
          })
      }
  }
  export const getDetailData= (url)=> {
    return dispatch => {
      axios.get(url).then(res => {
        dispatch(getDetail(res.data))
      })
    }
  }
  export const getLastIdData= (url)=> {
      console.log(url)
    return dispatch => {
      axios.get(url).then(res => {
        dispatch(getLastId(res.data))
      })
    }
  }
  export const getNextIdData= (url)=> {
    return dispatch => {
      axios.get(url).then(res => {
        dispatch(getNextId(res.data))
      })
    }
  }
  export const postCommentData = (data)=>{
    console.log(data)
    return dispatch => {
      axios({
        method: 'POST',
        url:postCommentUrl,
        data:qs.stringify(data),
        headers: {"Content-Type": "application/x-www-form-urlencoded",},
  
      }).then(res => {
        dispatch(postComment(res.data))
      })
    }
  }
  export const postArticleData = (url,data)=>{
    return dispatch => {
      axios({
        method: 'POST',
        url,
        data:qs.stringify(data),
        headers: {"Content-Type": "application/x-www-form-urlencoded",},
  
      }).then(res => {
        dispatch(postArticle(res.data))
      })
    }
  }