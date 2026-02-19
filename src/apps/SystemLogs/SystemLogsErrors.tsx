import { BreadcrumbGroup, Container, Link } from '@cloudscape-design/components';

import { /*Link,*/ useNavigate } from "react-router-dom";

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'

//import { useOrganization } from '../../hooks';

import * as React from "react";
import Cards from "@cloudscape-design/components/cards";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Header from "@cloudscape-design/components/header";
import { DashboardRoutes, SystemLogsRoutes } from '../../routes';
//import { Dashboard } from '../Dashboard';
import SystemLogsLayout from './SystemLogsLayout';


const queryClient = new QueryClient()

function Content() {
    return <Container
                  header={
                    <Header
                      variant="h1"
                      //description="Organization details"
                    >
                      System Errors
                    </Header>
                  }
                ></Container>
}

function Breadcrumbs() {
    const navigate = useNavigate();
    return <BreadcrumbGroup
                  items={[
                    { text: 'Dashboard', href: DashboardRoutes.path },
                    { text: 'System', href: SystemLogsRoutes.path },
                    { text: 'Errors', href: `${SystemLogsRoutes.path}/errors` },
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

function SystemLogsErrors() {
    return <>
        <QueryClientProvider client={queryClient}>
            <SystemLogsLayout
                content={ <Content /> }
                breadcrumbs = { <Breadcrumbs /> }
            />
        </QueryClientProvider>
    </>
}

export default SystemLogsErrors;