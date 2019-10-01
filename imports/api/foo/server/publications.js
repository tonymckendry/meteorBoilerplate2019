import isUndefined from 'lodash.isundefined'

import { Foo } from '../'

Meteor.publish('foo', function (options) {
    const self = this
    let autorunHandler
    this.autorun(function (comp) {
        if (isUndefined(autorunHandler)) {
            autorunHandler = comp
        }
        console.log('get some foo')
        let foo = Foo.find({})
        return [foo]
    })
    self.onStop(() => {
        if (!isUndefined(autorunHandler)) {
            autorunHandler.stop()
        }
    })
})
