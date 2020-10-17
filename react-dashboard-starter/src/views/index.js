import { Loadable, Loading } from '../components'

// lazy loading
const Dashboard = Loadable({
    loader: () => import('./Dashboard'),
    loading: Loading
})

const Login = Loadable({
    loader: () => import('./Login'),
    loading: Loading
})

const NotFound = Loadable({
    loader: () => import('./NotFound'),
    loading: Loading
})

const Settings = Loadable({
    loader: () => import('./Settings'),
    loading: Loading
})

const ArticleEdit = Loadable({
    loader: () => import('./Article/Edit'),
    loading: Loading
})

const ArticleList = Loadable({
    loader: () => import('./Article/List'),
    loading: Loading
})


export {
    Dashboard,
    Login,
    NotFound,
    Settings,
    ArticleEdit,
    ArticleList
}