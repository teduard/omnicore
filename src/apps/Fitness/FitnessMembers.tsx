import { BreadcrumbGroup, Link } from '@cloudscape-design/components';
import { MainLayout } from '../../layouts';
import { /*Link,*/ useNavigate } from "react-router-dom";

import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import OrganizationLayout from './FitnessLayout';

import { useOrganization } from '../../hooks';

import * as React from "react";
import Cards from "@cloudscape-design/components/cards";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Header from "@cloudscape-design/components/header";
import { DashboardRoutes, FitnessRoutes } from '../../routes';
import { Dashboard } from '../Dashboard';


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
        {/* <h1>Organization Members</h1>
        {isPending && <span>Loading...</span>}
        {error && <span>Error</span>}
            <br/>

        Data:{JSON.stringify(data)} */}
        <Cards
      ariaLabels={{
        itemSelectionLabel: (e, t) => `select ${t.name}`,
        selectionGroupLabel: "Item selection"
      }}
      cardDefinition={{
        header: item => (
          <Link href="#" fontSize="heading-m">
            {item.name}
          </Link>
        ),
        sections: [
          {
            id: "description",
            header: "Uses:",
            content: item => item.description
          },
          {
            id: "Image",
            //header: "image",
            content: () => <>
                <><Link href="#">Send message</Link></>
            </>
          }
        //   {
        //     id: "size",
        //     header: "Size",
        //     content: item => item.size
        //   }
        ]
      }}
      cardsPerRow={[
        { cards: 1 },
        { minWidth: 500, cards: 2 }
      ]}
      items={[
        {
          name: "Alina",
          alt: "First",
          description: "Expense, Taskify",
          type: "0",
          size: "Small",
        },
        {
          name: "Admin",
          alt: "Second",
          description: "Expense, Fitness, Taskify",
          type: "1",
          size: "Large",
        },
        // {
        //   name: "Taskifier",
        //   alt: "Third",
        //   description: "Keeps your day on track",
        //   type: "2",
        //   size: "Large",
        // },
        // {
        //   name: "Item 4",
        //   alt: "Fourth",
        //   description: "This is the fourth item",
        //   type: "2A",
        //   size: "Small"
        // },
        // {
        //   name: "Item 5",
        //   alt: "Fifth",
        //   description: "This is the fifth item",
        //   type: "2A",
        //   size: "Large"
        // },
        // {
        //   name: "Item 6",
        //   alt: "Sixth",
        //   description: "This is the sixth item",
        //   type: "1A",
        //   size: "Small"
        // }
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
      header={<Header>fitness All members</Header>}
    />
    </>
}

function Breadcrumbs() {
    const navigate = useNavigate();
    return <BreadcrumbGroup
                  items={[
                    { text: 'Dashboard', href: DashboardRoutes.path },
                    { text: 'Fitness', href: FitnessRoutes.path },
                    { text: 'Members', href: `${FitnessRoutes.path}/members` },
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

function FitnessMembers() {
    return <>
        <QueryClientProvider client={queryClient}>
            <OrganizationLayout
                content={ <Content /> }
                breadcrumbs = { <Breadcrumbs /> }
            />
        </QueryClientProvider>
    </>
}

export default FitnessMembers;