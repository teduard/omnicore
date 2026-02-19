import SystemLogsAudit from '../apps/SystemLogs/SystemLogsAudit';
import SystemLogsDashboard from '../apps/SystemLogs/SystemLogsDashboard';
import SystemLogsErrors from '../apps/SystemLogs/SystemLogsErrors';

const teamRouteIndex = '/dashboard/system';

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