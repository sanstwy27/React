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
    component: Dashboard
}, {
    pathname: '/admin/settings',
    component: Settings
}, {
    pathname: '/admin/article',
    component: ArticleList,
    exact: true
}, {
    pathname: '/admin/article/edit',
    component: ArticleEdit
}]