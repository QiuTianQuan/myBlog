import React, { Component } from 'react'
import AticleTitle from '../../components/AticleTitle'
import {getDetailUrl,getDetailData} from '../../containers/fontEnd'
import {connect} from 'react-redux'
import {getArticleInfo,getHtml} from '../../util';
import './Detail.less'

 class Detail extends Component {

    componentWillMount(){
        this.props.dispatch(getDetailData(getDetailUrl + "?id="+ this.props.match.params.id))
    }

    render() {
        let {content} = getArticleInfo(this.props.detail)
        return (
            <div className = "detail">
                <AticleTitle {...this.props}></AticleTitle>
                <div dangerouslySetInnerHTML = {{ __html: getHtml(content)}}>
                    
                </div>
            </div>
        )
    }
}

const select = (state) =>{
    return {
        detail:state.detail
    }
}

export default connect(select)(Detail)
