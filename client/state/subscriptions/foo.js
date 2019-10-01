import { observable, action } from 'mobx'
import autorun from 'meteor/space:tracker-mobx-autorun'

import { Foo } from 'api/foo'

import observe from 'lib/observe-cursor'

class FooSubStore {
    constructor (root) {
        this.rootStore = root
    }

    @observable
    handle = {}

    @observable
    tracker = {}

    getFoo = autorun(() => {
        this.tracker = Tracker.autorun(() => {
            if (this.handle.ready()) {
                let fooCursor = Foo.find({})
                observe(
                    'Properties',
                    FooState.allFoo,
                    this.handle,
                    fooCursor,
                    this.loading
                )
            }
        })
    })

    getData = () => {
        this.handle = Meteor.subscribe('foo')
        this.getFoo.start()
    }

    @action unsubscribe = () => {
        this.handle.stop()
        this.tracker.stop()
        this.getFoo.stop()
    }
}

export default FooSubStore

class Fooz {
    @observable allFoo = []
}

const FooState = new Fooz()
