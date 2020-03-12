import React, { Component } from 'react'
import {Layout, Menu, Breadcrumb, Row, Col} from 'antd'
import {List, Avatar, Icon, Pagination, Alert, Input, Button, Radio, Tooltip} from 'antd'
import {
    BrowserRouter as Router,
    HashRouter,
    Route,
    Link
} from 'react-router-dom'
import {getPathName,formatTime} from '../../util';
import './ContentList.less'


export default class ContentList extends Component {
    render() {
        const pathname = getPathName(this.props);
        let listData = pathname==='Life'? this.props.life: this.props.blog;
        const IconText = ({type, text}) => (
            <span>
                <Icon type={type} style={{marginRight: 8}}/>
                {text}
            </span>
        )
        return (
            <div className = 'content-list'>
                <List
                itemLayout="vertical"
                size="large"
                dataSource={listData}
                renderItem={item => (
                    <List.Item
                        key={item.title}
                        actions={[
                            formatTime(item.create_time),
                            <IconText type="message" text={item.comment_num}/>,
                            <IconText type="eye-o" text={item.visitor_num}/>,
                        ]}
                        /* extra={pathname===''?'':<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />} */
                    >
                        <List.Item.Meta
                            title={
                                <Link to={`/Detail/${item.id}`}>
                                    <div className = 'title'>{item.title}</div>
                                    <span className ='tag'>{item.kind}</span>
                                </Link>
                            }

                            description={item.short}
                        />
                    </List.Item>
                )}
                />
            </div>
        )
    }
}
