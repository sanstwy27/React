import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import {
    Card,
    Button,
    Form,
    Input,
    DatePicker
} from 'antd'
import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import draftToHtml from 'draftjs-to-html';

const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 18 },
};

const formTailLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 18, offset: 2 },
};

class Edit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            contentState : null,
            contentValid: null
        };
    }
    
    checkContent = (rule, value) => {
        if (!this.emptyContent()) {
            this.setState({
                contentValid: true
            })
            return Promise.resolve();
        }
        
        this.setState({
            contentValid: false
        })
        return Promise.reject('Content is required!');
    };

    emptyContent() {
        if (draftToHtml(this.state.contentState).length > 0) {
            return false;
        }
        return true;
    }

    onContentStateChange = (contentState) => {
        this.setState({
            contentState: draftToHtml(contentState).trim() === "<p></p>" ? null : contentState,
        });
        // console.log('as HTML:', draftToHtml(contentState));
    };

    onFinish = values => {
        console.log('Received values of form: ', values);
    };

    render() {
        const { contentState, contentValid } = this.state
        return (
            <Card 
                title="Article Edit" 
                bordered={false} 
                extra={<Button>Cancel</Button>}
            >
                <Form
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
                        name="createat"
                        rules={[{ required: true, message: 'CreateAt is required!' }]}
                    >
                        <DatePicker showTime />
                    </Form.Item>
                    <Form.Item
                        {...formItemLayout}
                        label="Content"
                        name="content"
                        rules={[
                            // { required: true, message: 'Content is required!' },
                            { validator: this.checkContent }
                        ]}
                    >
                        <Editor
                            wrapperClassName="demo-wrapper"
                            editorClassName="demo-editor"
                            editorContent={contentState}
                            onContentStateChange={this.onContentStateChange}
                            editorStyle={{
                                border: `1px solid ${contentValid || contentValid== null ? "" : "#FF0000"}`,
                                minHeight: "10em",
                                lineHeight: '75%'
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
        )
    }
}

export default withRouter(Edit)