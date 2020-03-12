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
        postAnswerData,
        postCommentData} from '../../containers/fontEnd'
import {connect} from 'react-redux'
import {getArticleInfo,getHtml,formatTime} from '../../util';
import {
    Link
} from 'react-router-dom'

import {List, Avatar, Icon, Divider} from 'antd';
import { Modal } from 'antd';
import {
    Row, Col,  Form, Button} from 'antd';
import './Detail.less'

 class Detail extends Component {
    constructor() {
        super()
        this.state = {
            visible: false,
            c_id:'',

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
            console.log(values)
            this.props.form.resetFields();
            const {comment,email,nickname} = values;
            this.props.dispatch(postAnswerData({a_id,c_id,comment,email,nickname}));
            this.hideModal();
          }
        });
    }

    handleClick = () =>{
        let id = this.props.match.params.id;
        this.props.form.validateFieldsAndScroll((err, values) => {
            if (!err) {
            this.props.form.resetFields();
            const {comment,email,nickname} = values;
            this.props.dispatch(postCommentData({id,comment,email,nickname}));
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

        return (
            <div className = "detail">
                <AticleTitle {...this.props}></AticleTitle>
                <div className = 'content'> 
                    <div  dangerouslySetInnerHTML = {{ __html: getHtml(detail.content)}}>
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
                </div>
                <div className = 'comment'>
                    <p>发表评论:</p>
                    <Comment className = 'comment_form' wrappedComponentRef={(form) => this.formRef = form} {...this.props} ></Comment>
                    <Button htmlType='submit' onClick={this.handleClick }>发表评论</Button>
                </div>
                <div style={{display: commentData.length ? 'block' : 'none'}} className = 'comment_list'>
                    <p>评论列表:</p>
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
                            <div className = 'comment-time'>
                                {formatTime(item.create_time)}
                            </div>
                            <div className = 'answer-list' style={{display: item.answer.length ? 'block' : 'none'}} >
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
                                        <div className = 'comment-time'>
                                            {formatTime(item.create_time)}
                                        </div>
                                    </List.Item>
                                )}
                                />
                            </div>
                        </List.Item>
                    )}
                />
                </div>
                <div className = 'modal'>
                    <Modal
                    title="Modal"
                    visible={this.state.visible}
                    onCancel={this.hideModal}
                    cancelText="取消"
                    okText="提交"
                    onOk={this.handleOk}
                    >
                        <Comment wrappedComponentRef={(form) => this.formRef = form} {...this.props} ></Comment>
                    </Modal>
                </div>
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


