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
        return (
            <div>
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
                            required: true, message: 'Please input comment!',
                            }],
                        })(
                            <TextArea/>
                        )}
                    </FormItem>
                </Form> 
    
            </div>
        )
    }
}

const WrappedRegistrationForm = Form.create()(Comment);
export default connect()(WrappedRegistrationForm);
