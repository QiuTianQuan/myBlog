import axios from 'axios';
import {getDetail,
        getLastId,
        getNextId,
        getTotal, 
        postArticle,
        getComments,
        postComment,
        getBlog,
        getLife,
        postAnswer,
        getAnswers} from '../../actions'

var qs = require("qs");

const domain = 'http://106.52.172.202:8806'
export const getBlogUrl = domain+'/api/getBlog'
export const getTotalUrl = domain+'/api/getTotal'
export const getLifeUrl = domain+'/api/getLife'
export const getDetailUrl = domain+'/api/getDetail'
export const getLastIdUrl = domain+'/api/getLastId'
export const getNextIdUrl = domain+'/api/getNextId'
export const getCommentsUrl = domain+'/api/getComments'
export const postArticleUrl = domain+'/api/postArticle'
export const postCommentUrl = domain+'/api/postComment'
export const postAnswerUrl = domain+'/api/postAnswer'
export const getAnswersUrl = domain+'/api/getAnswers'
export const postImgUrl = domain+'/api/upload'

export const getBlogData = url=>{
      return dispatch => {
          axios.get(url).then(res => {
              dispatch(getBlog(res.data))
          })
      }
  }

export const getLifeData = url=>{
    return dispatch => {
        axios.get(url).then(res => {
            dispatch(getLife(res.data))
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

  export const getAnswersData =(url)=> {
    return dispatch => {
        axios.get(url).then(res => {
            dispatch(getAnswers(res.data))
        })
    }
}

  export const postAnswerData = (data)=>{
    let a = [];
    a.push(data);
    return dispatch => {
      axios({
        method: 'POST',
        url:postAnswerUrl,
        data:qs.stringify(data),
        headers: {"Content-Type": "application/x-www-form-urlencoded",},
  
      }).then(res => {
        dispatch(postAnswer(res.data))
        dispatch(getAnswersData(getAnswersUrl + "?id="+ data.a_id))
      })
    }
  }

  export const postCommentData = (data)=>{
    return dispatch => {
      axios({
        method: 'POST',
        url:postCommentUrl,
        data:qs.stringify(data),
        headers: {"Content-Type": "application/x-www-form-urlencoded",},
  
      }).then(res => {
        dispatch(postComment(res.data))
        dispatch(getCommentsData(getCommentsUrl + "?id="+ data.id))
      })
    }
  }
  export const postArticleData = (url,data)=>{
    return dispatch => {
        console.log(data)
      axios({
        method: 'POST',
        url,
        data:qs.stringify(data),
        headers: {"Content-Type": "application/x-www-form-urlencoded",},
  
      }).then(res => {
        console.log(res.data.insertId)
      })
    }
  }