import React, {Component} from 'react';
import ContentList from '../../components/ContentList';

export default class Home extends Component{
    render(){
        return (
            <div>
                <ContentList {...this.props} ></ContentList>
            </div>
        )
    }
}