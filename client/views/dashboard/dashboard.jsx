import React from 'react'
import { observer } from 'mobx-react-lite'

import withSubscribe from 'lib/withSubscribe'

const Dashboard = () => {
    return <h1>Dashboard</h1>
}

export default withSubscribe('foo')(observer(Dashboard))
