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
    ArticleList
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
    pathname: '/admin/settings',
    component: Settings,
    title: 'Settings',
    isNav: true,
    icon: <SettingOutlined />
}, {
    pathname: '/admin/article',
    component: ArticleList,
    title: 'ArticleList',
    isNav: true,
    icon: <UnorderedListOutlined />,
    exact: true
}, {
    pathname: '/admin/article/edit',
    component: ArticleEdit,
    title: 'ArticleEdit',
    isNav: false
}]