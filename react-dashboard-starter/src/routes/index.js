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
    Notifications,
    NoAuth,
    Profile
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
    icon: <DashboardOutlined />,
    roles: ['001', '002', '003']
}, {
    pathname: '/admin/article',
    component: ArticleList,
    title: 'Articles',
    isNav: true,
    icon: <UnorderedListOutlined />,
    exact: true,
    roles: ['001', '002']
}, {
    pathname: '/admin/article/edit/:id',
    component: ArticleEdit,
    title: 'ArticleEdit',
    isNav: false,
    roles: ['001', '002']
}, {
    pathname: '/admin/settings',
    component: Settings,
    title: 'Settings',
    isNav: true,
    icon: <SettingOutlined />,
    roles: ['001']
}, {
    pathname: '/admin/noauth',
    component: NoAuth,
    title: 'NoAuth',
    isNav: false,
    icon: <SettingOutlined />,
    roles: ['001', '002', '003']
}, {
    pathname: '/admin/notifications',
    component: Notifications,
    title: 'Notifications',
    isNav: false,
    icon: <SettingOutlined />,
    roles: ['001', '002', '003']
}, {
    pathname: '/admin/profile',
    component: Profile,
    title: 'Profile',
    isNav: false,
    icon: <SettingOutlined />,
    roles: ['001', '002', '003']
}]