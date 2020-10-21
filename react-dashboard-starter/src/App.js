import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { adminRoutes } from './routes'
import { Frame } from './components'
import { connect } from 'react-redux'
import './App.less';
const menus = adminRoutes.filter(route => route.isNav === true)

const mapState = state => ({
  isLogin: state.user.isLogin,
  role: state.user.role
})

@connect(mapState)
class App extends Component {
  render() {
    return (
      this.props.isLogin
      ?
      <Frame menus={menus}>
        <Switch>
          {
            adminRoutes.map(route => {
              return <Route
                        key={route.pathname}
                        path={route.pathname}
                        exact={route.exact}
                        render={(routerProps) => {
                          const hasPermissinon = route.roles.includes(this.props.role);
                          return hasPermissinon ? <route.component {...routerProps} /> : <Redirect to="/admin/noauth" />
                        }}
                      />
            })
          }
          <Redirect to={adminRoutes[0].pathname} from='/admin' exact />
          <Redirect to='/404' />
        </Switch>
      </Frame>
      :
      <Redirect to="/login" />
    )
  }
}

export default App;
