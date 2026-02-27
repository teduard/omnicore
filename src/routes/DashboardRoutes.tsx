import { lazy } from "react";

//Dashboard, 
// import {Profile, Preferences, Documentation} from '../apps/Dashboard/';
// import SystemSettings from '../apps/Dashboard/SystemSettings';

const Dashboard = lazy(() => import("../modules/Dashboard/Dashboard"));
const Profile = lazy(() => import("../modules/Dashboard/Profile"));
const Preferences = lazy(() => import("../modules/Dashboard/Preferences"));
const Documentation = lazy(() => import("../modules/Dashboard/Documentation"));
const SystemSettings = lazy(() => import("../modules/Dashboard/SystemSettings"));

const teamRouteIndex = 'dashboard';

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
    path: `${teamRouteIndex}/system`,
    element: <SystemSettings />
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