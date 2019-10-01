import React, { Fragment, useEffect } from 'react'
import { observer } from 'mobx-react-lite'
import { withRouter } from 'react-router-dom'

import compose from 'lib/compose'

import { useStore } from 'state'

import { Route, Switch } from 'react-router-dom'

import CircularProgress from '@material-ui/core/CircularProgress'

import routes from 'views/routes'

const withAppLoader = Component => {
    const AppLoader = props => {
        const { rootStore } = useStore()

        return (
            <Fragment>
                {rootStore.app.appLoading && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100vw',
                        height: '100vh',
                        position: 'fixed',
                        background: '#fff',
                        zIndex: 9999,
                    }}>
                        <CircularProgress />
                    </div>
                )}
                <Component {...props} />
            </Fragment>

        )
    }

    return observer(AppLoader)
}

const Routes = props => {
    const { rootStore } = useStore()

    useEffect(() => {
        rootStore.router.setRoute(props.location, props.history, props.match)
    }, [
        JSON.stringify(props.location),
        JSON.stringify(props.history),
        JSON.stringify(props.match),
    ])

    return (
        <Switch>
            {Object.keys(routes)
                .map(key => {
                    const route = routes[key]
                    return <Route component={route.view} exact key={key} path={route.path} />
                })}
        </Switch>
    )
}

export default compose(
    withAppLoader,
    withRouter,
    observer
)(Routes)
