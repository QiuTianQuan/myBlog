import React, {Component} from 'react';
import ContentList from '../../components/ContentList';
import {getLifeData,getLifeUrl} from '../../containers/fontEnd'
import {connect} from 'react-redux'


class Home extends Component{

    componentWillMount(){
        this.props.dispatch(getLifeData(getLifeUrl + '?type=life'))
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
       life:state.life
    }
}

export default connect(select)(Home)           