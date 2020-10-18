import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import { withRouter } from 'react-router-dom'
import './frame.less'
import logo from './logo.png'
const { Header, Content, Sider } = Layout;

@withRouter
class Frame extends Component {
    onMenuClick = ({ item, key, keyPath, domEvent }) => {
        this.props.history.push(key)
    }
    render() {
        return (
            <Layout style={{minHeight: '100%'}}>
                <Header className="sans-header">
                    <div>
                        <div className="sans-logo">
                            <img src={logo} alt="SansAdmin" />
                        </div>
                    </div>
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            selectedKeys={[this.props.location.pathname]}
                            onClick={this.onMenuClick}
                            style={{ height: '100%', borderRight: 0 }}
                        >
                            {
                                this.props.menus.map(item => {
                                    return (
                                        <Menu.Item key={item.pathname}>
                                            {item.icon}
                                            {item.title}
                                        </Menu.Item>
                                    )
                                })
                            }
                        </Menu>
                    </Sider>
                    <Layout style={{ padding: '16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                        <Breadcrumb.Item>Home</Breadcrumb.Item>
                        <Breadcrumb.Item>List</Breadcrumb.Item>
                        <Breadcrumb.Item>App</Breadcrumb.Item>
                        </Breadcrumb>
                        <Content
                            className="site-layout-background"
                            style={{
                                background: '#fff',
                                margin: 0
                            }}
                        >
                        {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
          </Layout>
        )
    }
}

export default Frame