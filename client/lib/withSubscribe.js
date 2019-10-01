import React, { useEffect } from 'react'
import { observer } from 'mobx-react-lite'

import { useStore } from 'state'

const withSubscribe = (store, callback = null) => Component => {
    const Subscribe = props => {
        const { subscriptionStore } = useStore()
        useEffect(() => {
            subscriptionStore[store].getData()
            return subscriptionStore[store].unsubscribe
        }, [])
        return <Component {...props}></Component>
    }
    return observer(Subscribe)
}

export default withSubscribe
