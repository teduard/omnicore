import { BreadcrumbGroup, Button, Container, Header, KeyValuePairs} from '@cloudscape-design/components';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Layout from './Layout';

import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";

import {DashboardRoutes} from '../../routes'

const queryClient = new QueryClient()


function GeneralConfig() {
  return <>
  <Container 
    //header={<Header variant="h2">Preferences</Header>}
  >
    <KeyValuePairs
      columns={1}
      items={[
        {
          label: 'Currency',
          value: 'RON',
        },
        {
          label: 'Default theme',
          value: 'dark/light',
        },
        {
          label: 'Layout density',
          value: 'compact/normal',
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
              Preferences
            </Header>
  
          <SpaceBetween direction="vertical" size="l">
            <GeneralConfig/>
          </SpaceBetween>
      </SpaceBetween>
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