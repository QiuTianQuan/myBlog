import React, { Component } from 'react'
import {getArticleInfo,formatTime} from '../../util';
import './AticleTitle.less'

export default class AticleTitle extends Component {
    render() {
        let {title,create_time} = getArticleInfo(this.props.detail)
        return (
            <div className = 'article_title'>
                <div className = 'title'>
                    {title}
                </div>
                <div className = 'time'>
                    {formatTime(create_time)}
                </div>
            </div>
        )
    }
}
