import SystemLogsAudit from '../modules/SystemLogs/SystemLogsAudit';
import SystemLogsDashboard from '../modules/SystemLogs/SystemLogsDashboard';
import SystemLogsErrors from '../modules/SystemLogs/SystemLogsErrors';

const teamRouteIndex = 'dashboard/system';

const AppRoutes = [
    {
    path: teamRouteIndex,
    element: <SystemLogsDashboard />
    },
    {
    path: `${teamRouteIndex}/errors`,
    element: <SystemLogsErrors />
    }
    ,
    {
    path: `${teamRouteIndex}/audit`,
    element: <SystemLogsAudit />
    }
]

const SystemLogsRoutes = {
    routes: AppRoutes,
    path: teamRouteIndex
}

export default SystemLogsRoutes;