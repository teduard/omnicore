import {OrganizationApplications, OrganizationDashboard, OrganizationMembers} from '../modules/Organization';

const teamRouteIndex = 'dashboard/team';

const AppRoutes = [
    {
    path: teamRouteIndex,
    element: <OrganizationDashboard />
    },
    {
    path: `${teamRouteIndex}/apps`,
    element: <OrganizationApplications />
    }
    ,
    {
    path: `${teamRouteIndex}/members`,
    element: <OrganizationMembers />
    }
]

const TeamRoutes = {
    routes: AppRoutes,
    path: teamRouteIndex
}

export default TeamRoutes;