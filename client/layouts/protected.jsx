import { observer } from 'mobx-react-lite'
import React from 'react'
import { withRouter, Route, Redirect, Switch } from 'react-router-dom'
import Routes from 'views/routes'

const ProtectedLayout = ({ location }) => {
    return (
        <Switch>
            {Object.keys(Routes.protected).map(key => {
                const route = Routes.protected[key]
                return <Route component={route.view} exact key={key} path={route.path} />
            })}
        </Switch>
    )
}
export default withRouter(observer(ProtectedLayout))
