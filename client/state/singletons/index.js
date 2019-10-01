import RouterStore from './router'
import AppStore from './app'
import NotificationStore from './notifications'

class RootStore {
    constructor() {
        this.router = new RouterStore(this)
        this.app = new AppStore(this)
        this.notifications = new NotificationStore(this)
    }
}

const singleton = new RootStore()

export default singleton
