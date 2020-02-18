import React, {Component} from 'react';
import ContentList from '../../components/ContentList';
import {getBlogData,getBlogUrl} from '../../containers/fontEnd'
import {connect} from 'react-redux'


class Aticle extends Component{

    componentWillMount(){
        this.props.dispatch(getBlogData(getBlogUrl + '?type=blog'))
    }


    render(){
        return (
            <div>
                <ContentList {...this.props} ></ContentList>
            </div>
        )
    }
}

const select = (state) => {
    return {
       blog:state.blog
    }
}

export default connect(select)(Aticle) 