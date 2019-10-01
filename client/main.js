import React from 'react'
import ReactDOM from 'react-dom'
import autorun from 'meteor/space:tracker-mobx-autorun'

import Main from 'views/main.jsx'
import isNull from 'lodash.isnull'

import AuthStore from 'state/auth'
import RootStore from 'state/singletons'

import promiseFinally from 'promise.prototype.finally'
promiseFinally.shim()

/**
 * Set global application loading state when user is logging in
 */
const LoggingIn = autorun(() => {
    const userIsLoggingIn = Meteor.loggingIn()
    const authStoreIsLoading = AuthStore.loading

    RootStore.app.setAppLoading(
        userIsLoggingIn ||
        authStoreIsLoading
    )
})

/**
 * Always keep an updated copy of the user in the store
 */
const ReactiveUser = autorun(() => {
    const activeUser = !isNull(Meteor.user())
    AuthStore.authenticate(activeUser)
})

if (Meteor.isClient) {
    Accounts.onLogin(() => {
        AuthStore.setUser(Meteor.user())
    })

    Accounts.onLogout(() => {
        AuthStore.setUser(null)
        AuthStore.userSubscriptions === null
    })

    Meteor.startup(() => {
        LoggingIn.start()
        ReactiveUser.start()
        ReactDOM.render(<Main />, document.getElementById('render-target'))
    })
}
