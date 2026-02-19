//import App from '../App'
import ErrorPage from '../ErrorPage'
import ExpenseRoutes from './ExpenseRoutes'
import TeamRoutes from './OrganizationRoutes'
import DashboardRoutes from './DashboardRoutes'
import TaskifierRoutes from './TaskifierRoutes'
import FitnessRoutes from './FitnessRoutes'
import SystemLogsRoutes from './SystemLogsRoutes'
import About from '../About'
import AppNew from '../AppNew'
import Blog from '../Blog'
import Login from '../Login'
import Docs from '../Docs'
import SQL from '../SQL'

const AppRoutes = [
    {
        path: '/',
        element: <AppNew />
    },
    {
        path: '/about',
        element: <About />
    },
    {
        path: '/blog',
        element: <Blog />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/docs',
        element: <Docs />
    },
    {
        path: '/sql',
        element: <SQL />
    },
    ...ExpenseRoutes.routes,
    ...TeamRoutes.routes,
    ...DashboardRoutes.routes,
    ...TaskifierRoutes.routes,
    ...FitnessRoutes.routes,
    ...SystemLogsRoutes.routes,
    {
        path: '*',
        element: <ErrorPage />
    },
]

export { AppRoutes, DashboardRoutes, ExpenseRoutes, TeamRoutes, TaskifierRoutes, FitnessRoutes, SystemLogsRoutes };