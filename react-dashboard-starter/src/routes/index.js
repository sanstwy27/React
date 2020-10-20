import React from 'react'

import { 
    DashboardOutlined,
    SettingOutlined,
    UnorderedListOutlined
} from '@ant-design/icons';

import {
    Dashboard,
    Login,
    NotFound,
    Settings,
    ArticleEdit,
    ArticleList,
    Notifications
} from '../views'

export const mainRoutes = [{
    pathname: '/login',
    component: Login
}, {
    pathname: '/404',
    component: NotFound
}]

export const adminRoutes = [{
    pathname: '/admin/dashboard',
    component: Dashboard,
    title: 'Dashboard',
    isNav: true,
    icon: <DashboardOutlined />
}, {
    pathname: '/admin/article',
    component: ArticleList,
    title: 'Articles',
    isNav: true,
    icon: <UnorderedListOutlined />,
    exact: true
}, {
    pathname: '/admin/article/edit/:id',
    component: ArticleEdit,
    title: 'ArticleEdit',
    isNav: false
}, {
    pathname: '/admin/settings',
    component: Settings,
    title: 'Settings',
    isNav: true,
    icon: <SettingOutlined />
}, {
    pathname: '/admin/notifications',
    component: Notifications,
    title: 'Notifications',
    isNav: false,
    icon: <SettingOutlined />
}]