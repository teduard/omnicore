import { BreadcrumbGroup, Link } from '@cloudscape-design/components';
import { MainLayout } from '../../layouts';

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import Layout from './Layout';

import { useOrganization } from '../../hooks';

import * as React from "react";
import Cards from "@cloudscape-design/components/cards";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Header from "@cloudscape-design/components/header";

import taskifyLogo from './assets/taskify2.png';
import expenseLogo from './assets/expense.jpg';
import fitnessLogo from './assets/fitness.svg';
import teamLogo from './assets/team.svg';
import systemLogo from './assets/logs.svg';


import {DashboardRoutes, ExpenseRoutes, TeamRoutes, TaskifierRoutes, FitnessRoutes, SystemLogsRoutes} from '../../routes'

const queryClient = new QueryClient()

function Content() {
    const apiUrl = "http://localhost:9080/api/organization";

    const { data, isPending, error } = useQuery({
        queryKey: ['organization'],
        queryFn: () => fetch(apiUrl,
            {
          method: "GET",
          credentials: "include",
            }
        )
        .then(r => r.json())
    })

    if (isPending) return <span>Loading...</span>
    if (error) return <span>Oops!</span>

    return <>
        <h1>Organization Applications</h1>
        {isPending && <span>Loading...</span>}
        {error && <span>Error</span>}
            <br/>

        Data:{JSON.stringify(data)}
    </>
}

function AppContent() {
    const imgs = [expenseLogo, fitnessLogo, taskifyLogo, teamLogo, systemLogo];

    return (
      <>
        <Cards
      ariaLabels={{
        itemSelectionLabel: (e, t) => `select ${t.name}`,
        selectionGroupLabel: "Item selection"
      }}
      //selectionType="single"
      cardDefinition={{
        header: item => (
          <Link href={item.href} fontSize="heading-m">
            {item.name}
          </Link>
        ),
        sections: [
          {
            id: "description",
            //header: "Description",
            content: item => item.description
          },
          {
            id: "Image",
            //header: "image",
            content: item => <>
                
                <img src={imgs[parseInt(item.type)]} alt="Vite logo" height={120}/>
            </>
          },
          {
            id: "size",
            header: "",
            content: item => item.notes
          }
        ]
      }}
      cardsPerRow={[
        { cards: 1 },
        { minWidth: 500, cards: 2 }
      ]}
      // isItemDisabled={item => item.alt == "First"}
      items={[
        {
          name: "Expense",
          alt: "First",
          description: "Expense tracker application",
          type: "0",
          size: "Small",
          href: ExpenseRoutes.path
        },
        {
          name: "Fitness",
          alt: "Second",
          description: "Essential for your health levels",
          type: "1",
          size: "Small",
          notes: "development in progress",
          href: FitnessRoutes.path
        },
        {
          name: "Taskifier",
          alt: "Third",
          description: "Keeps your day on track",
          type: "2",
          size: "Large",
          notes: "development in progress",
          href: TaskifierRoutes.path
        },
      ]}
      loadingText="Loading resources"
      empty={
        <Box
          margin={{ vertical: "xs" }}
          textAlign="center"
          color="inherit"
        >
          <SpaceBetween size="m">
            <b>No resources</b>
            <Button>Create resource</Button>
          </SpaceBetween>
        </Box>
      }
      header={<Header>Your applications</Header>}
    />
      <Cards
      ariaLabels={{
        itemSelectionLabel: (e, t) => `select ${t.name}`,
        selectionGroupLabel: "Item selection"
      }}
      cardDefinition={{
        header: item => (
          <Link href={item.href} fontSize="heading-m">
            {item.name}
          </Link>
        ),
        sections: [
          {
            id: "description",
            //header: "Description",
            content: item => item.description
          },
          {
            id: "Image",
            //header: "image",
            content: item => <>
                
                <img src={imgs[parseInt(item.type)]} alt="Vite logo" height={120}/>
            </>
          }
        ]
      }}
      cardsPerRow={[
        { cards: 1 },
        { minWidth: 500, cards: 2 }
      ]}
      items={[
        {
          name: "Team",
          alt: "Third",
          description: "View your team",
          type: "3",
          size: "Large",
          href: TeamRoutes.path
        },
        {
          name: "System",
          alt: "Third",
          description: "System logs & audit",
          type: "4",
          size: "Large",
          href: SystemLogsRoutes.path
        },
      ]}
      loadingText="Loading resources"
      empty={
        <Box
          margin={{ vertical: "xs" }}
          textAlign="center"
          color="inherit"
        >
          <SpaceBetween size="m">
            <b>No resources</b>
            <Button>Create resource</Button>
          </SpaceBetween>
        </Box>
      }
      header={<Header>Admin</Header>}
    />
    </>
    )
}

function Breadcrumbs() {
    return <BreadcrumbGroup
                  items={[
                    { text: 'Dashboard', href: DashboardRoutes.path },
                    //{ text: 'Organization', href: '/organization' },
                    //{ text: 'Your applications', href: '/organization/applications' },
                  ]}
                  expandAriaLabel="Show path"
                  ariaLabel="Breadcrumbs"
                />
}

function Dashboard() {
    return <>
        <QueryClientProvider client={queryClient}>
            <Layout
                content={ <AppContent /> }
                breadcrumbs = { <Breadcrumbs /> }
            />
        </QueryClientProvider>
    </>
}

export default Dashboard;