import React, { Component } from 'react'
import { Layout, Menu, Breadcrumb, Dropdown, Avatar, Badge } from 'antd';
import { withRouter } from 'react-router-dom'
import './frame.less'
import logo from './logo.png'
import { connect } from 'react-redux'
import { getNotificationsList } from '../../actions/notifications'
import { logout } from '../../actions/user'

import { DownOutlined, UserOutlined } from '@ant-design/icons';
import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
const { SubMenu } = Menu;

const { Header, Content, Sider } = Layout;

const mapState = state => {
    return {
        notificationsCount: state.notifications.list.filter(item => item.hasRead === false).length,
        avatar: state.user.avatar,
        displayName: state.user.displayName
    }
}

@connect(mapState, { getNotificationsList, logout })
@withRouter
class Frame extends Component {
    componentDidMount() {
        this.props.getNotificationsList()
    }

    onDropdownClick = ({ key }) => {
        if(key === '/login') {
            this.props.logout()
        } else {
            this.props.history.push(key)
        }
    }

    renderDropdown = () => (
        <Menu onClick={this.onDropdownClick}>
          <Menu.Item key="/admin/notifications">
            <Badge dot={this.props.notificationsCount > 0}>
                Notifications
            </Badge>
          </Menu.Item>
          <Menu.Item key="/admin/settings">
            Settings
          </Menu.Item>
          <Menu.Item key="/login">
            Logout
          </Menu.Item>
        </Menu>
    );   

    state = {
        current: 'mail',
    };

    onSideMenuClick = ({ item, key, keyPath, domEvent }) => {
        this.props.history.push(key)
    }

    onNavMenuClick = e => {
        console.log('click ', e);
        this.setState({ current: e.key });
    };

    render() {
        const { current } = this.state;
        const selectedKeyArr = this.props.location.pathname.split('/')
        selectedKeyArr.length = 3
        return (
            <Layout style={{minHeight: '100%'}}>
                <Header className="header sans-header">
                    <div className="sans-header-left">
                        <div>
                            <div className="sans-logo">
                                <img src={logo} alt="SansAdmin" />
                            </div>
                        </div>
                        <div>
                            <Menu className="menu" onClick={this.onNavMenuClick} selectedKeys={[current]} mode="horizontal">
                                <Menu.Item key="mail" icon={<MailOutlined />}>
                                    Navigation One
                                </Menu.Item>
                                <Menu.Item key="app" disabled icon={<AppstoreOutlined />}>
                                    Navigation Two
                                </Menu.Item>
                                <SubMenu key="SubMenu" icon={<SettingOutlined />} title="Navigation Three - Submenu">
                                    <Menu.ItemGroup title="Item 1">
                                        <Menu.Item key="setting:1">Option 1</Menu.Item>
                                        <Menu.Item key="setting:2">Option 2</Menu.Item>
                                    </Menu.ItemGroup>
                                    <Menu.ItemGroup title="Item 2">
                                        <Menu.Item key="setting:3">Option 3</Menu.Item>
                                        <Menu.Item key="setting:4">Option 4</Menu.Item>
                                    </Menu.ItemGroup>
                                </SubMenu>
                                <Menu.Item key="alipay">
                                    <a href="https://ant.design" target="_blank" rel="noopener noreferrer">
                                        Navigation Four - Link
                                    </a>
                                </Menu.Item>
                            </Menu>
                        </div>
                    </div>
                    <div className="sans-header-right">
                        <Dropdown overlay={this.renderDropdown()} placement="bottomRight">
                            <div className="dropmenu" style={{display: 'flex'}}>
                                <div>
                                    <Avatar style={{ backgroundColor: '#d63d78' }} icon={<UserOutlined />} src={ this.props.avatar } />
                                </div>
                                <div>
                                    Welcome, { this.props.displayName } !
                                </div>
                                <div>
                                    <Badge count={this.props.notificationsCount} offset={[-20, -8]}>
                                        <DownOutlined />
                                    </Badge>
                                </div>
                            </div>
                        </Dropdown>
                    </div>
                </Header>
                <Layout>
                    <Sider width={200} className="site-layout-background">
                        <Menu
                            mode="inline"
                            selectedKeys={[selectedKeyArr.join('/')]}
                            onClick={this.onSideMenuClick}
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