export const GET_DATA = 'GET_DATA';
export const GET_TOTAL = 'GET_TOTAL';
export const GET_DETAIL = 'GET_DETAIL';
export const GET_COMMENTS = 'GET_COMMENTS';
export const GET_LAST_ID = 'GET_LAST_ID';
export const GET_NEXT_ID = 'GET_NEXT_ID';
export const POST_ARTICLE = 'POST_ARTICLE';
export const POST_COMMENT = 'POST_COMMENT';


export const getData = data =>{
    return {
        type : GET_DATA,
        data
    }
}

export const getTotal = data => {
    return {
        type :GET_TOTAL,
        data
    }
}

export const getDetail = data => {
    return {
        type :GET_DETAIL,
        data
    }
}

export const getComments = data => {
    return {
        type :GET_COMMENTS,
        data
    }
}

export const getLastId = data =>{
    return {
      type:GET_LAST_ID,
      data
    }
  };

  export const getNextId = data =>{
    return {
      type:GET_NEXT_ID,
      data
    }
  };

  export const postArticle = data =>{
    return {
      type:POST_ARTICLE,
      data
    }
  };

  export const postComment = data =>{
    return {
      type:POST_COMMENT,
      data
    }
  };

