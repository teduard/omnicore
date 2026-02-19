import { BreadcrumbGroup, Container, Header} from '@cloudscape-design/components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import SystemsLogsLayout from './SystemLogsLayout';


import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import { useNavigate } from 'react-router-dom';
import { SystemLogsRoutes, DashboardRoutes } from '../../routes';


const queryClient = new QueryClient()

function AppContent() {
     return (
        <Container
              header={
                <Header
                  variant="h1"
                  //description="Organization details"
                >
                  System Audit
                </Header>
              }
            ></Container>
    )
}

function Breadcrumbs() {
    const navigate = useNavigate();
    return <BreadcrumbGroup
                  items={[
                    { text: 'Dashboard', href: DashboardRoutes.path },
                    { text: 'System', href: SystemLogsRoutes.path },
                    { text: 'Audit', href: `${SystemLogsRoutes.path}/audit` },
                  ]}
                  expandAriaLabel="Show path"
                  ariaLabel="Breadcrumbs"
                  onFollow={(event) => {
                    // 1. Check if it's an internal link
                    if (!event.detail.external) {
                      // 2. Stop the browser from reloading the page
                      event.preventDefault();
                      // 3. Let React Router handle the URL change
                      navigate(event.detail.href);
                    }
                  }}
                />
}

function SystemsLogsAudit() {
    return <>
        <QueryClientProvider client={queryClient}>
            <SystemsLogsLayout
                content={ <AppContent /> }
                breadcrumbs = { <Breadcrumbs /> }
            />
        </QueryClientProvider>
    </>
}

export default SystemsLogsAudit;