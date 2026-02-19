import { BreadcrumbGroup, ColumnLayout, Container, Header, Spinner } from '@cloudscape-design/components';
import { MainLayout } from '../../layouts';

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import OrganizationLayout from './FitnessLayout';

import { useOrganization } from '../../hooks';
import { useNavigate } from 'react-router-dom';
import { DashboardRoutes, FitnessRoutes } from '../../routes';

function Content2() {
    const {organizationData} = useOrganization();   

    return <>
        <Container
      header={
        <Header
          variant="h1"
          //description="Organization details"
        >
          Fitness
        </Header>
      }
    >
            {/* {organizationData.fetched &&
            <>
             <ColumnLayout columns={2} variant="text-grid">
      <div><h3>You are a member of <b>{organizationData?.name}</b></h3></div>
      <div><h3>Since: 2026-02-10</h3></div>
      <div><h3>Organization Id: {organizationData?.organizationId}</h3></div>
      <div><h3>Status: {organizationData?.active && "Active"} {!organizationData?.active && "Inactive"}</h3></div>
      
    </ColumnLayout>

            
            
            
            
            </>
        }

        {!organizationData.fetched && <Spinner />} */}
    </Container>
    </>
}

function Breadcrumbs() {
    const navigate = useNavigate();
    return <BreadcrumbGroup
                  items={[
                    { text: 'Dashboard', href: DashboardRoutes.path },
                    { text: 'Fitness', href: FitnessRoutes.path },
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

function FitnessDashboard() {
    return <>
            <OrganizationLayout
                content={ <Content2 /> }
                breadcrumbs = { <Breadcrumbs /> }
            />
    </>
}

export default FitnessDashboard;