import {Dashboard, Profile, Preferences, Documentation} from '../apps/Dashboard/';

const teamRouteIndex = '/dashboard';

const AppRoutes = [
    {
    path: teamRouteIndex,
    element: <Dashboard />
    },
    {
    path: `${teamRouteIndex}/profile`,
    element: <Profile />
    },
    {
    path: `${teamRouteIndex}/preferences`,
    element: <Preferences />
    },
    {
    path: `${teamRouteIndex}/documentation`,
    element: <Documentation />
    }
]

const DashboardRoutes = {
    routes: AppRoutes,
    path: teamRouteIndex
}

export default DashboardRoutes;