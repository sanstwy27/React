import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import {
    Card,
    Button,
    Form,
    Input,
    DatePicker,
    Spin,
    message
} from 'antd'
import { EditorState, ContentState, convertFromHTML, convertToRaw } from 'draft-js'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';
import { getArticleById, saveArticle } from '../../requests';
import moment from 'moment'

const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 18 },
};

const formTailLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 18, offset: 2 },
};

class Edit extends Component {
    formRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id,
            editorState: EditorState.createEmpty(),
            isLoading: false
        };
    }

    componentDidMount() {
        this.setState({
            isLoading: true
        })
        getArticleById(this.props.match.params.id)
            .then(resp => {
                const { id, content, ...data } = resp;
                data.createAt = moment(data.createAt)
                this.formRef.current.setFieldsValue(data);
                this.setState({
                    editorState: EditorState.createWithContent(
                                    ContentState.createFromBlockArray(
                                        convertFromHTML(content)
                                ))
                })
            })
            .finally(() => {
                this.setState({
                    isLoading: false
                })
            })
    }

    onEditorStateChange = (editorState) => {
        this.setState({
            editorState,
        });
    };

    onFinish = values => {
        this.setState({
            isLoading: true
        })
        const data = Object.assign({}, values, {
            createAt: moment(values.createAt).valueOf(),
            content: draftToHtml(convertToRaw(this.state.editorState.getCurrentContent()))
        })
        saveArticle(this.state.id, data)
            .then(resp => {
                message.success(resp.msg)
            })
            .finally(() => {
                this.setState({
                    isLoading: false
                })
                this.props.history.push('/admin/article')
            })
    };

    render() {
        return (
            <Spin spinning={this.state.isLoading}>
                <Card 
                    title="Article Edit" 
                    bordered={false} 
                    extra={<Button onClick={this.props.history.goBack}>Cancel</Button>}
                >
                    <Form
                        ref={this.formRef}
                        name="basic"
                        initialValues={{ remember: true }}
                        onFinish={this.onFinish}
                    >
                        <Form.Item
                            {...formItemLayout}
                            label="Title"
                            name="title"
                            rules={[{ required: true, message: 'Title is required!' }]}
                        >
                            <Input placeholder="Title" />
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            label="Author"
                            name="author"
                            rules={[{ required: true, message: 'Author is required!' }]}
                        >
                            <Input placeholder="Author" />
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            label="Amount"
                            name="amount"
                            rules={[{ required: true, message: 'Amount is required!' }]}
                        >
                            <Input placeholder="0" />
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            label="CreateAt"
                            name="createAt"
                            rules={[{ required: true, message: 'CreateAt is required!' }]}
                        >
                            <DatePicker showTime />
                        </Form.Item>
                        <Form.Item
                            {...formItemLayout}
                            label="Content"
                            name="content"
                        >
                            <Editor
                                wrapperClassName="demo-wrapper"
                                editorClassName="demo-editor"
                                editorState={this.state.editorState}
                                onEditorStateChange={this.onEditorStateChange}
                                editorStyle={{
                                    border: `1px solid`,
                                    minHeight: "10em"
                                }}
                            />
                        </Form.Item>
                        <Form.Item
                            {...formTailLayout}
                        >
                            <Button type="primary" htmlType="submit">
                                Save
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
            </Spin>
        )
    }
}

export default withRouter(Edit)