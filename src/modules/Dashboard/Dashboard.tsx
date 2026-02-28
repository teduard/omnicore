import { Link } from "@cloudscape-design/components";
import Layout from "./Layout";
import Cards from "@cloudscape-design/components/cards";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Header from "@cloudscape-design/components/header";

import taskifyLogo from "/assets/taskify.png";
import expenseLogo from "/assets/expense.jpg";
import fitnessLogo from "/assets/fitness.svg";
import teamLogo from "/assets/team.svg";
import systemLogo from "/assets/logs.svg";
import { useNavigate } from "react-router-dom";
import { DashboardRoutes } from "../../routes";

import {
  ExpenseRoutes,
  TeamRoutes,
  TaskifierRoutes,
  FitnessRoutes,
  SystemLogsRoutes,
} from "../../routes";
import AppBreadcrumbs from "../../components/AppBreadcrumbs";
import { UserContext } from "../../contexts/UserContext";
import { useContext } from "react";

function AppContent() {
  const imgs = [expenseLogo, fitnessLogo, taskifyLogo, teamLogo, systemLogo];
  const navigate = useNavigate();
  return (
    <>
      <Cards
        ariaLabels={{
          itemSelectionLabel: (e, t) => `select ${t.name}`,
          selectionGroupLabel: "Item selection",
        }}
        cardDefinition={{
          header: (item) => (
            <>
              {item.active && (
                <Button
                  variant="primary"
                  href={item.href}
                  disabledReason="Unavailable for current demo"
                  onFollow={(event) => {
                    // 1. Check if it's an internal link
                    if (!event.detail.external) {
                      // 2. Stop the browser from reloading the page
                      event.preventDefault();
                      // 3. Let React Router handle the URL change

                      navigate(event.detail.href);
                    }
                  }}
                >
                  {item.name}
                </Button>
              )}

              {!item.active && (
                <Button
                  disabled
                  variant="primary"
                  disabledReason="Unavailable for current demo"
                >
                  {item.name}
                </Button>
              )}
            </>
          ),
          sections: [
            {
              id: "description",
              content: (item) => item.description,
            },
            {
              id: "Image",
              content: (item) => (
                <>
                  <img
                    src={imgs[parseInt(item.type)]}
                    alt="Vite logo"
                    height={120}
                  />
                </>
              ),
            },
            // {
            //   id: "size",
            //   header: "",
            //   content: item => item.notes
            // }
          ],
        }}
        cardsPerRow={[{ cards: 1 }, { minWidth: 500, cards: 2 }]}
        items={[
          {
            name: "Expense",
            alt: "First",
            description: "Expense tracker application",
            type: "0",
            size: "Small",
            href: `/${ExpenseRoutes.path}`,
            active: true,
          },
          {
            name: "Taskify",
            alt: "Third",
            description: "Keeps your day on track",
            type: "2",
            size: "Large",
            notes: "development in progress",
            href: `/${TaskifierRoutes.path}`,
            active: false,
          },
          {
            name: "Fitness",
            alt: "Second",
            description: "Essential for your health levels",
            type: "1",
            size: "Small",
            notes: "development in progress",
            href: `/${FitnessRoutes.path}`,
            active: false,
          },
        ]}
        loadingText="Loading resources"
        empty={
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No applications</b>
            </SpaceBetween>
          </Box>
        }
        header={<Header>Your applications</Header>}
      />
      {false && (
        <Cards
          ariaLabels={{
            itemSelectionLabel: (e, t) => `select ${t.name}`,
            selectionGroupLabel: "Item selection",
          }}
          cardDefinition={{
            header: (item) => (
              <Link
                href={item.href}
                fontSize="heading-m"
                onFollow={(event) => {
                  // 1. Check if it's an internal link
                  if (!event.detail.external) {
                    // 2. Stop the browser from reloading the page
                    event.preventDefault();
                    // 3. Let React Router handle the URL change

                    navigate(event.detail.href);
                  }
                }}
              >
                {item.name}
              </Link>
            ),
            sections: [
              {
                id: "description",
                //header: "Description",
                content: (item) => item.description,
              },
              {
                id: "Image",
                //header: "image",
                content: (item) => (
                  <>
                    <img
                      src={imgs[parseInt(item.type)]}
                      alt="Vite logo"
                      height={120}
                    />
                  </>
                ),
              },
            ],
          }}
          cardsPerRow={[{ cards: 1 }, { minWidth: 500, cards: 2 }]}
          items={[
            {
              name: "Team",
              alt: "Third",
              description: "View your team",
              type: "3",
              size: "Large",
              href: `/${TeamRoutes.path}`,
            },
            {
              name: "System",
              alt: "Third",
              description: "System logs & audit",
              type: "4",
              size: "Large",
              href: `/${SystemLogsRoutes.path}`,
            },
          ]}
          loadingText="Loading resources"
          empty={
            <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
              <SpaceBetween size="m">
                <b>No resources</b>
                <Button>Create resource</Button>
              </SpaceBetween>
            </Box>
          }
          header={<Header>Admin</Header>}
        />
      )}
    </>
  );
}

function Breadcrumbs() {
  return (
    <AppBreadcrumbs
      items={[{ text: "Dashboard", href: DashboardRoutes.path }]}
    />
  );
}

function Dashboard() {
const userContext = useContext(UserContext);
  if (!userContext) {
    throw new Error("UserContext context is not present");
  }
  const { user } = userContext;
  return (
    <>
        <Layout
          content={
            <>
              <h1 className="greeting">Welcome, {user.FirstName}</h1>
              <AppContent />{" "}
            </>
          }
          breadcrumbs={<Breadcrumbs />}
        />
    </>
  );
}

export default Dashboard;
