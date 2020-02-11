import React, {Component} from 'react';
import HeadList from '../../components/HeadList';
import './Home.less'
export default class Home extends Component{
    render(){
        return (
            <div className = 'head-background'>
                <HeadList></HeadList>
            </div>
        )
    }
}