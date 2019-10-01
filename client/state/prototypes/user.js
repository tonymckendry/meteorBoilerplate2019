import { observable, action, computed } from 'mobx'

class User {
    constructor (id, user) {
        this._user = user
    }

    @action updateState = user => {
        this._user = user
    }

    @observable _user

    @computed get fullName () {
        return this._user.profile.firstName + ' ' + this._user.profile.lastName
    }
}

export default User
