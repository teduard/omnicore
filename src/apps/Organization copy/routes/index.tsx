import {OrganizationApplications} from '..';
import {OrganizationDashboard} from '..';
import {OrganizationMembers} from '..';

const teamRouteIndex = '/dashboard/team';

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