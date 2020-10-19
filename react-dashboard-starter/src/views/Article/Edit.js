import React, { Component } from 'react'
import { withRouter } from "react-router-dom";
import {
    Card,
    Button,
    Form,
    Input,
    DatePicker
} from 'antd'

const formItemLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 18 },
  };

const formTailLayout = {
    labelCol: { span: 2 },
    wrapperCol: { span: 18, offset: 2 },
  };

class Edit extends Component {
    onFinish = values => {
        // console.log('Received values of form: ', values);
    };

    render() {
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
                        rules={[{ required: true, message: 'Content is required!' }]}
                    >
                        <div>Content</div>
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