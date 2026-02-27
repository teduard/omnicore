import { Link } from "@cloudscape-design/components";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import OrganizationLayout from "./TaskifierLayout";
import Cards from "@cloudscape-design/components/cards";
import Box from "@cloudscape-design/components/box";
import SpaceBetween from "@cloudscape-design/components/space-between";
import Button from "@cloudscape-design/components/button";
import Header from "@cloudscape-design/components/header";
import { DashboardRoutes, TaskifierRoutes } from "../../routes";
import AppBreadcrumbs from "../../components/AppBreadcrumbs";

const queryClient = new QueryClient();

function Content() {
  const apiUrl = `${import.meta.env.VITE_API_URL}/api/organization`;

  const { isPending, error } = useQuery({
    queryKey: ["organization"],
    queryFn: () =>
      fetch(apiUrl, {
        method: "GET",
        credentials: "include",
      }).then((r) => r.json()),
  });

  if (isPending) return <span>Loading...</span>;
  if (error) return <span>Oops!</span>;

  return (
    <>
      <Cards
        ariaLabels={{
          itemSelectionLabel: (_e, t) => `select ${t.name}`,
          selectionGroupLabel: "Item selection",
        }}
        cardDefinition={{
          header: (item) => (
            <Link href="#" fontSize="heading-m">
              {item.name}
            </Link>
          ),
          sections: [
            {
              id: "description",
              header: "Uses:",
              content: (item) => item.description,
            },
            {
              id: "Image",
              //header: "image",
              content: () => (
                <>
                  <>
                    <Link href="#">Send message</Link>
                  </>
                </>
              ),
            },
          ],
        }}
        cardsPerRow={[{ cards: 1 }, { minWidth: 500, cards: 2 }]}
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
          <Box margin={{ vertical: "xs" }} textAlign="center" color="inherit">
            <SpaceBetween size="m">
              <b>No resources</b>
              <Button>Create resource</Button>
            </SpaceBetween>
          </Box>
        }
        header={<Header>taskifier All members</Header>}
      />
    </>
  );
}

function Breadcrumbs() {
  return (
    <AppBreadcrumbs
      items={[
        { text: "Dashboard", href: DashboardRoutes.path },
        { text: "Taskifier", href: TaskifierRoutes.path },
        { text: "Members", href: `${TaskifierRoutes.path}/members` },
      ]}
    />
  );
}

function TaskifierMembers() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <OrganizationLayout
          content={<Content />}
          breadcrumbs={<Breadcrumbs />}
        />
      </QueryClientProvider>
    </>
  );
}

export default TaskifierMembers;
