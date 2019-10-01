import FooStore from './foo'

class SubscriptionStore {
    constructor () {
        this.foo = new FooStore(this)
    }
}

const singleton = new SubscriptionStore()

export default singleton
