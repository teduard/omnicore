import {TaskifierApplications, TaskifierDashboard, TaskifierMembers} from '../modules/Taskifier';

const teamRouteIndex = 'dashboard/taskifier';

const AppRoutes = [
    {
    path: teamRouteIndex,
    element: <TaskifierDashboard />
    },
    {
    path: `${teamRouteIndex}/apps`,
    element: <TaskifierApplications />
    }
    ,
    {
    path: `${teamRouteIndex}/members`,
    element: <TaskifierMembers />
    }
]

const TaskifierRoutes = {
    routes: AppRoutes,
    path: teamRouteIndex
}

export default TaskifierRoutes;