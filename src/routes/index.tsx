//import App from '../App'
import ErrorPage from '../pages/ErrorPage'
import ExpenseRoutes from './ExpenseRoutes'
import TeamRoutes from './OrganizationRoutes'
import DashboardRoutes from './DashboardRoutes'
import TaskifierRoutes from './TaskifierRoutes'
import FitnessRoutes from './FitnessRoutes'
import SystemLogsRoutes from './SystemLogsRoutes'

import Landing from '../Landing'
import About from '../pages/About'
import Blog from '../pages/Blog'
import Login from '../pages/Login'
import Docs from '../pages/Docs'
import SQL from '../pages/tools/SQL'
import RPDF from '../pages/tools/RPDF'
import ShowWebLLM from '../pages/tools/ShowWebLLM.tsx'

import AppLauncher from '../components/AppLauncher'

const AppRoutes = [
    {
        path: '/',
        element: <AppLauncher><Landing /></AppLauncher>
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
        path: '/tools/sql',
        element: <SQL />
    },
    {
        path: '/tools/pdf',
        element: <RPDF content={<>some content</>} />
    },
    {
        path: '/tools/webllm',
        element: <ShowWebLLM />
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