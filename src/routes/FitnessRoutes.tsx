import {FitnessApplications, FitnessDashboard, FitnessMembers} from '../apps/Fitness';

const teamRouteIndex = '/dashboard/fitness';

const AppRoutes = [
    {
    path: teamRouteIndex,
    element: <FitnessDashboard />
    },
    {
    path: `${teamRouteIndex}/apps`,
    element: <FitnessApplications />
    }
    ,
    {
    path: `${teamRouteIndex}/members`,
    element: <FitnessMembers />
    }
]

const FitnessRoutes = {
    routes: AppRoutes,
    path: teamRouteIndex
}

export default FitnessRoutes;