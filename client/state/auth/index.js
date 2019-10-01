import {
    action,
    observable,
} from 'mobx'

import User from 'state/prototypes/user'

import rootStore from 'state/singletons'

class AuthStore {
    @observable loading = false
    @observable currentUser = null
    @observable userSubscriptions = []

    @action setUser = user => {
        this.currentUser = user ? new User(user._id, user) : null
        return this.currentUser
    }

    @action
    authenticate = (bool) => new Promise(resolve => {
        if (bool) {
            this.setUser(Meteor.user())
            resolve(this.currentUser)
        } else {
            this.setUser(null)
            this.userSubscriptions = []
            resolve(null)
        }
    })

    @action
    updateUser = (key, value) => {
        const userId = this.currentUser.id
        const payload = { userId, key, value }

        Meteor.call('updateUser', payload, err => {
            if (err) {
                console.error(err) // eslint-disable-line
                rootStore.notificationStore.dispatch('Something went wrong', 'error')
            } else {
                rootStore.notificationStore.dispatch('Profile successfully updated', 'success')
            }
        })
    }

    @action
    logout = () => {
        Meteor.logout(() => {
            this.setUser(null)
            rootStore.routerStore.push('/login')
        })
    }
}

const singleton = new AuthStore()

export default singleton
