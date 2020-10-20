import React, { Component } from 'react'
import { Form, Input, Button, Checkbox, Card } from 'antd';
import { connect } from 'react-redux'
import { login } from '../../actions/user'
import { Redirect } from 'react-router-dom'
import './login.less'

const mapState = state => ({
    isLogin: state.user.isLogin,
    isLoading: state.user.isLoading
})

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 16 },
};

const tailLayout = {
    wrapperCol: { offset: 4, span: 16 },
};

@connect(mapState, { login })
class Login extends Component {

    onFinish = values => {
        // console.log('Success:', values);
        this.props.login(values)
    };
    
    onFinishFailed = errorInfo => {
        // console.log('Failed:', errorInfo);
    };

    render() {
        return (
            this.props.isLogin
            ?
            <Redirect to="/admin" />
            :
            <Card title="Login" className="sans-login-wrapper">
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={this.onFinish}
                    onFinishFailed={this.onFinishFailed}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input disabled={this.props.isLoading}/>
                    </Form.Item>
            
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password disabled={this.props.isLoading} />
                    </Form.Item>
            
                    <Form.Item {...tailLayout} name="remember" valuePropName="checked">
                        <Checkbox disabled={this.props.isLoading}>Remember me</Checkbox>
                    </Form.Item>
            
                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" loading={this.props.isLoading}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        )
    }
}

export default Login