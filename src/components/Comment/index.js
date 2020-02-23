import React, { Component } from 'react'
import {connect} from 'react-redux'
import {postCommentData} from '../../containers/fontEnd'
import {
    Layout, Menu, Breadcrumb, Row, Col, BackTop, Card, Form,
    Input, Tooltip, Cascader, Select,  Checkbox, Button, AutoComplete
  } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;

 class Comment extends Component {

    handleSubmit = (e) => {
        e.preventDefault();
        let {id} = this.props.match.params;
        this.props.form.validateFieldsAndScroll((err, values) => {
          if (!err) {
            const {comment,email,nickname} = values;
            this.props.dispatch(postCommentData({id,comment,email,nickname}))
          }
        });
      }
    render() {
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
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                span: 24,
                offset: 0,
                },
                sm: {
                span: 16,
                offset: 8,
                },
            },
        };
        return (
            <div>
                <h2>发表评论：</h2>
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
                            <FormItem {...tailFormItemLayout}>
                                <Button type="primary" htmlType="submit">提交评论</Button>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}

const WrappedRegistrationForm = Form.create()(Comment);
export default connect()(WrappedRegistrationForm);
