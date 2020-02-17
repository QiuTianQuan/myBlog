import React, { Component } from 'react'
import E from 'wangeditor'
import { postArticleData, postArticleUrl} from '../../containers/fontEnd'
import {connect} from 'react-redux'
import './PostArticle.less' 

import {Layout, Menu, Breadcrumb, Row, Col} from 'antd'
import {List, Avatar, Icon, Pagination, Alert, Input, Button,Select } from 'antd'
const Option = Select.Option;



class PostArticle extends Component {

    constructor(props) {
        super(props);
        this.state = {
            editorContent:'',
            Typeval:'',
            KindVal:'',
            titleVal:''
         };
    }
    
    onSubmit(){
        let {
            editorContent,
            titleVal,
            Typeval,
            KindVal}=this.state;
            this.props.dispatch(postArticleData(postArticleUrl,{title:titleVal,content:editorContent,type:Typeval,kind:KindVal}))
    }

    handleChangeKind(value) {
        this.setState({
            KindVal:value
        })
    }
    handleChangeTitle(e) {
        this.setState({
            titleVal:e.target.value
        })
    }

    handleChangeType(value) {
        this.setState({
            Typeval:value
        })
    }

    componentDidMount() {
        const elemMenu = this.refs.editorElemMenu;
        const elemBody = this.refs.editorElemBody;
        const editor = new E(elemMenu,elemBody)
        // 使用 onchange 函数监听内容的变化，并实时更新到 state 中
        editor.customConfig.onchange = html => {
            console.log(editor.txt.html())
            this.setState({
                // editorContent: editor.txt.text()
                editorContent: editor.txt.html()
            })
        }
        editor.customConfig.menus = [
            'head',  // 标题
            'bold',  // 粗体
            'fontSize',  // 字号
            'fontName',  // 字体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
            'link',  // 插入链接
            'list',  // 列表
            'justify',  // 对齐方式
            'quote',  // 引用
            'emoticon',  // 表情
            'image',  // 插入图片
            'table',  // 表格
            'video',  // 插入视频
            'code',  // 插入代码
            'undo',  // 撤销
            'redo'  // 重复
        ]
        editor.customConfig.uploadImgServer = 'https://gtacms.gtarcade.com/backend/editor/index?action=uploadimage';  // 上传图片到服务器
        // 3M
        editor.customConfig.uploadImgMaxSize = 3 * 1024 * 1024;
        // 限制一次最多上传 5 张图片
        editor.customConfig.uploadImgMaxLength = 1;
        // 自定义文件名
        editor.customConfig.uploadFileName = 'editor_img';
        // 将 timeout 时间改为 3s
        editor.customConfig.uploadImgTimeout = 5000;
    
        editor.customConfig.uploadImgHooks = {
            before: function (xhr, editor, files) {
                // 图片上传之前触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，files 是选择的图片文件
    
                // 如果返回的结果是 {prevent: true, msg: 'xxxx'} 则表示用户放弃上传
                // return {
                //     prevent: true,
                //     msg: '放弃上传'
                // }
                // alert("前奏");
            },
            success: function (xhr, editor, result) {
                // 图片上传并返回结果，图片插入成功之后触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                // var url = result.data.url;
                // alert(JSON.stringify(url));
                // editor.txt.append(url);
                // alert("成功");
            },
            fail: function (xhr, editor, result) {
                // 图片上传并返回结果，但图片插入错误时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象，result 是服务器端返回的结果
                alert("失败");
            },
            error: function (xhr, editor) {
                // 图片上传出错时触发
                // xhr 是 XMLHttpRequst 对象，editor 是编辑器对象
                // alert("错误");
            },
            // 如果服务器端返回的不是 {errno:0, data: [...]} 这种格式，可使用该配置
            // （但是，服务器端返回的必须是一个 JSON 格式字符串！！！否则会报错）
            customInsert: function (insertImg, result, editor) {
                // 图片上传并返回结果，自定义插入图片的事件（而不是编辑器自动插入图片！！！）
                // insertImg 是插入图片的函数，editor 是编辑器对象，result 是服务器端返回的结果
                // 举例：假如上传图片成功后，服务器端返回的是 {url:'....'} 这种格式，即可这样插入图片：
                var url = result.data[0];
                insertImg(url);
                // result 必须是一个 JSON 格式字符串！！！否则报错
            }
        }

        editor.create()

    };


    render() {
        return (
            <div className="editor">
                <Input  onChange={this.handleChangeTitle.bind(this)} placeholder="文章标题"/>
                <Select defaultValue="文章分类" style={{ width: '100%' }} onChange={this.handleChangeType.bind(this)}>
                    <Option value="life">生活</Option>
                    <Option value="blog">博客</Option>
                </Select>
                <Select defaultValue="文章类型" style={{ width: '100%' }} onChange={this.handleChangeKind.bind(this)}>
                    <Option value="h5">html</Option>
                    <Option value="css">css</Option>
                    <Option value="js">javascript</Option>
                    <Option value="vue">vue</Option>
                    <Option value="react">react</Option>
                    <Option value="angular">angular</Option>
                    <Option value="node">node</Option>
                    <Option value="php">php</Option>
                    <Option value="mysql">mysql</Option>
                    <Option value="server">服务器之类</Option>
                    <Option value="others">其他</Option>
                </Select>
                <div className="text-area" >
                    <div ref="editorElemMenu"
                         style={{backgroundColor:'#f1f1f1',border:"1px solid #ccc"}}
                         className="editorElem-menu">

                    </div>
                    <div
                        style={{
                            padding:"0 10px",
                            overflowY:"scroll",
                            height:300,
                            border:"1px solid #ccc",
                            borderTop:"none"
                        }}
                        ref="editorElemBody" className="editorElem-body">

                    </div>
                </div>
                <div onClick = {this.onSubmit.bind(this)}>
                    upload
                </div>
            </div>
        );
    }
}

export default connect()(PostArticle)
