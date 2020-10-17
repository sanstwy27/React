import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { adminRoutes } from './routes'

import './App.less';

class App extends Component {
  render() {
    return (
      <div>
        <div>Common</div>
        <Switch>
          {
            adminRoutes.map(route => {
              return <Route
                        key={route.pathname}
                        path={route.pathname}
                        exact={route.exact}
                        render={(routerProps) => {
                          return <route.component {...routerProps} />
                        }}
                      />
            })
          }
          <Redirect to={adminRoutes[0].pathname} from='/admin' exact />
          <Redirect to='/404' />
        </Switch>
      </div>
    )
  }
}

export default App;
