const mysql = require('mysql')
const pool = mysql.createPool({
    host: 'localhost',
    port:'3306',
    user: 'root',
    database: 'myblog',
    password: '210026',
})



let querySql = ( sql )=> {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if (err) {
                reject(err)
              }else{
                // Use the connection
                connection.query(sql, (error, results, fields) => {
                // And done with the connection.
                resolve(JSON.stringify(results))
                connection.release()
                // Handle error after the release.
                if (error) throw error
            })
            }
        })
    })
}

const postArticleSql = (title , content, type, kind) => {
    let createTime = Date.now() / 1000 | 0;
    return "insert into article(title,content,create_time,`type`,kind) " +
    "values('" + title + "','" + content + "','" + createTime + "','" + type + "','" + kind + "')";
  }

  const postCommentSql = (id,comment,email,nickname) => {
    let createTime = Date.now() / 1000 | 0;
    return "insert into comment(a_id,msg,create_time,email,user) " +
    "values('" + id + "','" + comment + "','" + createTime + "','" + email + "','" + nickname + "')";
  }

  const postAnswerSql = (a_id,c_id,comment,email,nickname) => {
    let createTime = Date.now() / 1000 | 0;
    return "insert into comment(a_id,c_id,msg,create_time,email,user) " +
    "values('" + a_id + "','" + c_id + "','" + comment + "','" + createTime + "','" + email + "','" + nickname + "')";
  }
 

  const getTotalSql = (type) => {
    return "select *  from article where type='" + type + "'";
  }

  const getDetailSql = (id) => {
    return "select * from article where id=" + id + " limit 1 ";
  }

  const getLastIdSql = (currentId) => {
    return 'select * from article  where id < ' + currentId + ' order by id desc limit 1 '
  }
  // 下一篇文章id
  const getNextIdSql = (currentId) => {
    return 'select * from article  where id > ' + currentId + ' order by id asc limit 1 '
  }

  const getCommentsSql = (a_id) => {
    return "select * from comment where a_id = " + a_id + " and c_id = 0";
  }

  const getAnswersSql = (a_id) => {
    return "select * from comment where a_id = " + a_id + " and c_id <> 0";
  }


  module.exports = {
    querySql,
    postArticleSql,
    getTotalSql,
    getDetailSql,
    getLastIdSql,
    getNextIdSql,
    postCommentSql,
    getCommentsSql,
    getAnswersSql,
    postAnswerSql
  }