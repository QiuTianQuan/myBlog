import React, { Component } from 'react'
import './HeadList.less'

export default class HeadList extends Component {
    render() {
        const listData = [{title:"今天真开心",content:"哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",like:"2",visitor:"10",avatar:"",id:1},{title:"今天不开心",content:"哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈哈",like:"2",visitor:"10",avatar:"",id:2}];
        return (
            <div className = "head-content">
                <ul className = "head-list"> 
                    {listData.map(item =>(
                        <li key = {item.id} className = "content-item">
                            <p className = "title">
                                {item.title}
                            </p>
                            <p className = "content">
                                {item.content}
                            </p>
                            <div className = 'button'> 
                                阅读全文
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}
