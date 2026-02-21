import { BreadcrumbGroup, Container, Header, KeyValuePairs, StatusIndicator} from '@cloudscape-design/components';
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

function GeneralConfig() {
  return <>
  <Container header={<Header variant="h2">General configuration</Header>}>
    <KeyValuePairs
      columns={1}
      items={[
        {
          label: 'First Name',
          value: 'John',
        },
        {
          label: 'Last Name',
          value: 'Doe',
        },
        {
          label: 'Email',
          value: 'john.doe@gmail.com',
        },
         {
          label: 'City/Town',
          value: 'Doe',
        },
          {
          label: 'Phone number',
          value: '(213) 555-1234',
        },
        {
          label: 'Password',
          value: 'None',
        },
        {
          label: '',
          value: <Button>Save</Button>,
        },
      ]}
    />
  </Container>
  </>
}

function ResetPassword() {
  return <>
  <Container header={<Header variant="h2">Reset password</Header>}>
    <KeyValuePairs
      columns={1}
      items={[
        {
          label: 'Password',
          value: 'None',
        },
        {
          label: 'Confirm Password',
          value: 'None',
        },
        {
          label: '',
          value: <Button>Save</Button>,
        },
      ]}
    />
  </Container>
  </>
}

function AppContent() {
    return (
      <SpaceBetween size="m">
            <Header
              variant="h1"
              actions={
                <SpaceBetween direction="horizontal" size="xs">
                  {/* <Button variant='primary'>
                                Save profile
                              </Button> */}
                </SpaceBetween>
              }
              >
              Your profile
            </Header>
  
          <SpaceBetween direction="vertical" size="l">
            <GeneralConfig/>
            <ResetPassword/>
            
          </SpaceBetween>
      </SpaceBetween>
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