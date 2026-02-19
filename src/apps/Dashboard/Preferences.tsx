import { BreadcrumbGroup} from '@cloudscape-design/components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from './Layout';

import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";

import {DashboardRoutes} from '../../routes'

const queryClient = new QueryClient()


function AppContent() {
    return (
      <Box
          margin={{ vertical: "xs" }}
          textAlign="center"
          color="inherit"
        >
          <SpaceBetween size="m">
            <b>Preferences</b>
          </SpaceBetween>
        </Box>
    )
}

function Breadcrumbs() {
    return <BreadcrumbGroup
                  items={[
                    { text: 'Dashboard', href: DashboardRoutes.path },
                    { text: 'Preferences', href: `${DashboardRoutes.path}/preferences` },
                  ]}
                  expandAriaLabel="Show path"
                  ariaLabel="Breadcrumbs"
                />
}

function Preferences() {
    return <>
        <QueryClientProvider client={queryClient}>
            {/* <Layout
                content={ <AppContent /> }
                breadcrumbs = { <Breadcrumbs /> }
            /> */}
            <Layout
                content={ <AppContent/> }
                breadcrumbs = { <Breadcrumbs /> }
                />
        </QueryClientProvider>
    </>
}

export default Preferences;