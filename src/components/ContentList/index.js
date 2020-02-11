import React, { Component } from 'react'
import {Layout, Menu, Breadcrumb, Row, Col} from 'antd'
import {List, Avatar, Icon, Pagination, Alert, Input, Button, Radio, Tooltip} from 'antd'
import {
    BrowserRouter as Router,
    HashRouter,
    Route,
    Link
} from 'react-router-dom'

export default class ContentList extends Component {
    render() {
        const listData = [{title:"今天真开心",like:"2",visitor:"10",avatar:"",id:1}];
        const pathname = "";
        const IconText = ({type, text}) => (
            <span>
                <Icon type={type} style={{marginRight: 8}}/>
                {text}
            </span>
        )
        return (
            <div>
                <List
                itemLayout="vertical"
                size="large"
                dataSource={listData}
                renderItem={item => (
                    <List.Item
                        key={item.title}
                        actions={[
                            //formatTime(item.createTime),
                            <IconText type="like-o" text={item.like}/>,
                            <IconText type="message" text="2"/>,
                            <IconText type="eye-o" text={item.visitor}/>,
                        ]}
                        extra={pathname===''?'':<img width={272} alt="logo" src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png" />}
                    >
                        <List.Item.Meta
                            title={
                                <Link to={`/Detail/${item.id}`}>
                                    {item.title}
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