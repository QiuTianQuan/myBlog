import React,{Component} from 'react';
import { Menu, Icon } from 'antd';
import {Link} from 'react-router-dom'
import './Header.less'

export default class Header extends Component {
    state = {
        current: 'home',
    }
    handleClick=(e)=>{ //点击事件
        this.setState({current:e.key});
    }
    render(){
        return (
            <div id="HeadNav">
                <div className="nav-wrap">
                    <div className="nav-list-wrap">
                        <Menu onClick={this.handleClick} selectedKeys={[this.state.current]} mode="horizontal">
                            <Menu.Item key="home">
                                <Link to="/">
                                    首页        
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="aboutme">
                                <Link to="/AboutMe">
                                    关于我        
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="article">
                                <Link to="/Article">
                                    文章        
                                </Link>
                            </Menu.Item>
                            <Menu.Item key="life">
                                <Link to="/Life">
                                    生活        
                                </Link>
                            </Menu.Item>
                        </Menu>
                    </div>
                </div>
                <div className = "head-horizontal">
                </div>
            </div>
        )
    }

} 




