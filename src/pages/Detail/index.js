import React, { Component } from 'react'
import AticleTitle from '../../components/AticleTitle'
import Comment from '../../components/Comment'
import {getDetailUrl,
        getDetailData,
        getLastIdUrl,
        getNextIdUrl,
        getLastIdData,
        getNextIdData,
        getCommentsData,
        getCommentsUrl,
        getAnswersUrl,
        getAnswersData,
        postAnswerData} from '../../containers/fontEnd'
import {connect} from 'react-redux'
import {getArticleInfo,getHtml} from '../../util';
import {
    Link
} from 'react-router-dom'

import {List, Avatar, Icon, Divider} from 'antd';
import { Modal } from 'antd';
import {
    Layout, Menu, Breadcrumb, Row, Col, BackTop, Card, Form,
    Input, Tooltip, Cascader, Select,  Checkbox, Button, AutoComplete
  } from 'antd';
import './Detail.less'
const FormItem = Form.Item;
const { TextArea } = Input;



 class Detail extends Component {
    constructor() {
        super()
        this.state = {
            visible: false,
            c_id:''
        }
    }
    //params.id是以props存储的，检测不到变化无法自动更新
    componentWillReceiveProps(newProps) {
        let id = newProps.match.params.id;
        if (typeof(id) !== 'undefined' && id !== null && id !== this.props.match.params.id) {
            this.getData(id);
        }
    }

    getData(id){
        this.props.dispatch(getDetailData(getDetailUrl + "?id="+ id))
        this.props.dispatch(getLastIdData(getLastIdUrl + "?id="+ id))
        this.props.dispatch(getNextIdData(getNextIdUrl + "?id="+ id))
        this.props.dispatch(getCommentsData(getCommentsUrl + "?id="+ id))
        this.props.dispatch(getAnswersData(getAnswersUrl + "?id="+ id))
    }

    componentDidMount() {
        let id = this.props.match.params.id;
        this.getData(id);
    }

    showModal = (id) => {
        this.setState({
          visible: true,
          c_id: id,
        });
    };
    
    hideModal = () => {
        this.setState({
            visible: false,
        });
    };


    handleOk = () => {
        let a_id = this.props.match.params.id;
        let {c_id} = this.state;
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            const {comment,email,nickname} = values;
            this.props.dispatch(postAnswerData({a_id,c_id,comment,email,nickname}))
          }
        });
    }

    render() {
        let detail = getArticleInfo(this.props.detail);
        let nextId = this.props.nextId;
        let lastId = this.props.lastId;
        let commentData = this.props.comments;
        let answerData = this.props.answer;
        commentData.map(item =>{
            item.answer = [];
        })
        commentData.map( comment =>{
            answerData.map( answer =>{
                if(comment.id === answer.c_id){
                    comment.answer.push(answer)
                }
            })
        })
        console.log(commentData)
        const {getFieldDecorator} = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: {span: 24},
                sm: {span: 8},
            },
            wrapperCol: {
                xs: {span: 24},
                sm: {span: 16},
            },
        };

        return (
            <div className = "detail">
                <AticleTitle {...this.props}></AticleTitle>
                <div className = 'content' dangerouslySetInnerHTML = {{ __html: getHtml(detail.content)}}>
                </div>
                <div className = 'nav_to'>
                {
                    lastId && lastId.map(v =>
                        <div key={v.id}>
                            <Link to={`/Detail/${v.id}`}>
                                上一篇：
                                {v.title}
                            </Link>
                        </div>
                    )
                }
                {
                    nextId && nextId.map(v =>
                    <div key={v.id}>
                        <Link to={`/Detail/${v.id}`}>
                        下一篇：
                        {v.title}
                        </Link>
                    </div>
                    )
                }
                </div>
                <div>
                    <Comment {...this.props} ></Comment>
                </div>
                <div className = 'comment_list'>
                    <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={commentData}
                    renderItem={item => (
                        <List.Item
                            key={item.id}
                            actions={[
                                //formatTime(item.createTime),
                                <span>
                                    {/* this对象的指向是可变的，但是在箭头函数中，它是固定的 */}
                                    <Icon type="message"  style={{marginRight: 8}} onClick = {()=>this.showModal(item.id)} />
                                </span>
                            ]}
                        >
                            <List.Item.Meta
                                title={item.user}
                            />
                            {item.msg}
                            <div>
                                <List
                                itemLayout="vertical"
                                size="large"
                                dataSource={item.answer}
                                renderItem={i => (
                                    <List.Item
                                        key={i.id}
                                    >
                                        <List.Item.Meta
                                            title={i.user}
                                        />
                                        {i.msg}
                                    </List.Item>
                                )}
                                />
                            </div>
                        </List.Item>
                    )}
                />
                </div>
                <Modal
                title="Modal"
                visible={this.state.visible}
                onCancel={this.hideModal}
                cancelText="取消"
                okText="提交"
                onOk={this.handleOk}
                >
                    <Row>
                        <Col span={8}>
                            <Form onSubmit={this.handleSubmit}>
                                <FormItem
                                {...formItemLayout}
                                label={(
                                    <span>
                                    Nickname&nbsp;
                                    </span>
                                )}
                                >
                                {getFieldDecorator('nickname', {
                                    rules: [{ required: true, message: 'Please input your nickname!', whitespace: true }],
                                })(
                                    <Input />
                                )}
                                </FormItem>
                                <FormItem
                                {...formItemLayout}
                                label="E-mail"
                                >
                                {getFieldDecorator('email', {
                                    rules: [{
                                    type: 'email', message: 'The input is not valid E-mail!',
                                    }, {
                                    required: false, message: 'Please input your E-mail!',
                                    }],
                                })(
                                    <Input/>
                                )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayout}
                                    label="comment"
                                    >
                                    {getFieldDecorator('comment', {
                                        rules: [ {
                                        required: true, message: 'Please input your E-mail!',
                                        }],
                                    })(
                                        <TextArea/>
                                    )}
                                </FormItem>
                            </Form>
                        </Col>
                    </Row>
                </Modal>
            </div>
        )
    }
}

const select = (state) =>{
    return {
        detail:state.detail,
        lastId:state.lastId,
        nextId:state.nextId,
        comments:state.comments,
        answer:state.answer
    }
}

const WrappedRegistrationForm = Form.create()(Detail);
export default connect(select)(WrappedRegistrationForm);


