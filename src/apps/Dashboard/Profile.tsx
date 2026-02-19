import { BreadcrumbGroup} from '@cloudscape-design/components';
// import { MainLayout } from '../../layouts';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from './Layout';

// import { useOrganization } from '../../hooks';

// import * as React from "react";
// import Cards from "@cloudscape-design/components/cards";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
// import Header from "@cloudscape-design/components/header";

// import taskifyLogo from './assets/taskify2.png';
// import expenseLogo from './assets/expense.jpg';
// import fitnessLogo from './assets/fitness.svg';
// import teamLogo from './assets/team.svg';


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
            <b>Your profile</b>
          </SpaceBetween>
        </Box>
    )
}

function Breadcrumbs() {
    return <BreadcrumbGroup
                  items={[
                    { text: 'Dashboard', href: DashboardRoutes.path },
                    { text: 'Profile', href: `${DashboardRoutes.path}/profile` },
                  ]}
                  expandAriaLabel="Show path"
                  ariaLabel="Breadcrumbs"
                />
}

function Profile() {
    return <>
        <QueryClientProvider client={queryClient}>
            <Layout
                content={ <AppContent /> }
                breadcrumbs = { <Breadcrumbs /> }
            />
        </QueryClientProvider>
    </>
}

export default Profile;