import React, { Component } from 'react'
import {getTotalData,getTotalUrl} from '../../containers/fontEnd'
import {connect} from 'react-redux'
import {getArticleInfo,getHtml} from '../../util';
import './HeadList.less'
import {
    BrowserRouter as Router,
    Link
} from 'react-router-dom'

class HeadList extends Component {

    componentWillMount(){
        this.props.dispatch(getTotalData(getTotalUrl))
    }

    render() {
        const listData = this.props.total;
        return (
            <div className = "head-content">
                <ul className = "head-list"> 
                    {listData.map(item =>(
                        <li key = {item.id} className = "content-item">
                            <p className = "title">
                                {item.title}
                            </p>
                            <div className = "content">
                                <div className = 'content-part' dangerouslySetInnerHTML = {{ __html: getHtml(item.content)}}>
                                </div>
                                <p>
                                ...
                                </p>
                            </div>
                            
                                <Link to={`/Detail/${item.id}`}>
                                <div className = 'button'> 
                                阅读全文
                                </div>
                                </Link>
                            
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

const select = (state) => {
    return {
       total:state.total
    }
}

export default connect(select)(HeadList)    