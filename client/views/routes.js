import Dashboard from 'views/dashboard/dashboard'
import Login from 'views/login/login'
import NotFound from 'views/notFound/notFound'
import withAuthentication from '../lib/withAuthentication';

const routes = {
    LOGIN: {
        path: '/',
        view: Login,
    },
    DAHSBOARD: {
        path: '/dashboard',
        view: Dashboard,
        auth: ['protected']
    },
    NOT_FOUND: {
        view: NotFound
    }
}

const enhancedRoutes = Object.keys(routes).reduce((acc, key) => {
    const current = routes[key]
    current.auth && current.auth.forEach(auth => {
        const view = current.view
        current.view = auth === 'protected' ? withAuthentication(view) : view
    })
    acc[key] = current
    return acc
}, {})

export default enhancedRoutes
